const { getFirestoreDb } = require("../config/firebase.js");
const {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  writeBatch,
  arrayUnion,
} = require("firebase/firestore");
const Feedback = require("../model/feedback.js");

const feedbackController = {
  addFeedback: async (req, res) => {
    const db = getFirestoreDb();
    const { orderId, rating, comment, images = [], video = "" } = req.body;

    try {
      // 1. Validate order
      const orderRef = doc(db, "orders", orderId);
      const orderDoc = await getDoc(orderRef);

      if (!orderDoc.exists()) {
        return res.status(404).json({ message: "Đơn hàng không tồn tại" });
      }

      const orderData = orderDoc.data();

      if (orderData.status !== "sold") {
        return res
          .status(400)
          .json({ message: "Đơn hàng chưa được hoàn thành" });
      }

      if (orderData.feedbacks && orderData.feedbacks.length > 0) {
        return res.status(400).json({ message: "Đơn hàng đã được đánh giá" });
      }

      // 2. Check review time limit (7 days)
      const orderDate = new Date(orderData.orderDate);
      const now = new Date();
      const diffTime = Math.abs(now - orderDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 7) {
        return res
          .status(400)
          .json({ message: "Đã quá thời hạn đánh giá (7 ngày)" });
      }

      // 3. Create feedback using model
      const feedback = new Feedback(rating, comment, images, video);
      const batch = writeBatch(db);

      // 4. Update order with feedback
      batch.update(orderRef, {
        feedbacks: arrayUnion(feedback.toFirestore()),
      });

      // 5. Update feedbackCache in each post
      for (const item of orderData.items) {
        const postRef = doc(db, "posts", item.postId);
        const postDoc = await getDoc(postRef);
        const postData = postDoc.data();

        // Tạo feedback cache mới
        const feedbackCache = {
          orderId,
          ...feedback.toFirestore(),
          buyerName: orderData.buyerName,
          buyerAvatar: orderData.buyerAvatar || "",
          buyerId: orderData.buyerId,
          productName: item.name,
          productTitle: item.title,
        };

        // Tính toán rating mới
        const currentFeedbacks = postData.feedbackCache || [];
        const newFeedbacks = [...currentFeedbacks, feedbackCache];
        const newRating =
          newFeedbacks.reduce((sum, fb) => sum + fb.rating, 0) /
          newFeedbacks.length;

        // Update post với feedback cache và rating mới
        batch.update(postRef, {
          feedbackCache: arrayUnion(feedbackCache),
          rating: parseFloat(newRating.toFixed(1)), // Làm tròn 1 chữ số thập phân
        });
      }

      await batch.commit();

      res.status(201).json({
        message: "Đánh giá thành công",
        feedback: feedback.toFirestore(),
      });
    } catch (error) {
      console.error("Error adding feedback:", error);
      res.status(500).json({ message: error.message });
    }
  },

  getPostFeedbacks: async (req, res) => {
    const db = getFirestoreDb();
    const { postId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    try {
      const postRef = doc(db, "posts", postId);
      const postDoc = await getDoc(postRef);

      if (!postDoc.exists()) {
        return res.status(404).json({ message: "Bài đăng không tồn tại" });
      }

      const feedbackCache = postDoc.data().feedbackCache || [];

      // Calculate statistics
      const totalFeedbacks = feedbackCache.length;
      const averageRating =
        totalFeedbacks > 0
          ? feedbackCache.reduce((sum, fb) => sum + fb.rating, 0) /
            totalFeedbacks
          : 0;
      const ratingCounts = feedbackCache.reduce((acc, fb) => {
        acc[fb.rating] = (acc[fb.rating] || 0) + 1;
        return acc;
      }, {});

      // Pagination
      const startIndex = (page - 1) * limit;
      const paginatedFeedbacks = feedbackCache
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(startIndex, startIndex + limit);

      res.status(200).json({
        feedbacks: paginatedFeedbacks,
        stats: {
          total: totalFeedbacks,
          averageRating: parseFloat(averageRating.toFixed(1)),
          ratingCounts,
        },
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalFeedbacks / limit),
          hasMore: startIndex + limit < totalFeedbacks,
        },
      });
    } catch (error) {
      console.error("Error getting post feedbacks:", error);
      res.status(500).json({ message: error.message });
    }
  },

  getUserFeedbacks: async (req, res) => {
    const db = getFirestoreDb();
    const { userId } = req.params;
    const { type = "buyer", page = 1, limit = 10 } = req.query;

    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      const userData = userDoc.data();
      const myOrders = userData.myOrders || [];

      // Lấy tất cả đơn hàng có phản hồi
      const feedbackOrders = await Promise.all(
        myOrders.map(async (orderRef) => {
          const orderDoc = await getDoc(orderRef);

          if (orderDoc.exists()) {
            const orderData = orderDoc.data();
            if (orderData.feedbacks && orderData.feedbacks.length > 0) {
              return {
                orderId: orderDoc.id,
                ...orderData.feedbacks[0], // Lấy phản hồi đầu tiên
                items: orderData.items,
                orderDate: orderData.orderDate,
                sellerName: orderData.sellerName,
                status: orderData.status,
              };
            }
          }
          return null;
        })
      );

      // Lọc ra các giá trị hợp lệ và phân trang
      const validFeedbacks = feedbackOrders
        .filter((order) => order !== null)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const startIndex = (page - 1) * limit;
      const paginatedFeedbacks = validFeedbacks.slice(
        startIndex,
        startIndex + limit
      );

      res.status(200).json({
        feedbacks: paginatedFeedbacks,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(validFeedbacks.length / limit),
          hasMore: startIndex + limit < validFeedbacks.length,
        },
      });
    } catch (error) {
      console.error("Error getting user feedbacks:", error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = feedbackController;
