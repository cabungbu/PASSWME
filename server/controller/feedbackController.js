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

const feedbackController = {
  // Thêm feedback mới
  addFeedback: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const {
      buyerId,
      sellerId,
      orderId,
      postId,
      productId,
      comment,
      rating,
      reply,
      image,
      quantity,
    } = req.body;

    try {
      const newFeedback = {
        // References
        buyer: doc(firestoreDb, "users", buyerId),
        seller: doc(firestoreDb, "users", sellerId),
        order: doc(firestoreDb, "orders", orderId),
        post: doc(firestoreDb, "posts", postId),
        product: doc(firestoreDb, "posts", postId, "products", productId),
        comment,
        rating,
        reply,
        image: image || [],
        quantity: quantity,
        createdAt: new Date(),
      };

      // Tạo ID mới cho post
      const newFeedbackId = doc(collection(firestoreDb, "feedbacks")).id;
      const feedbackDocRef = doc(firestoreDb, "feedbacks", newFeedbackId);
      // Khởi tạo batch write
      const batch = writeBatch(firestoreDb);

      // Set dữ liệu cho feedback mới
      batch.set(feedbackDocRef, newFeedback);

      //Tạo reference bên order
      const orderRef = doc(firestoreDb, "orders", orderId);
      const orderDoc = await getDoc(orderRef);
      if (!orderDoc.exists()) {
        return res.status(404).json({ error: "order not found" });
      }
      batch.update(orderRef, {
        feedbacks: arrayUnion(feedbackDocRef), // Thêm reference thay vì ID
      });

      //Tạo reference bên posts
      const postRef = doc(firestoreDb, "posts", postId);
      const postDoc = await getDoc(postRef);
      if (!postDoc.exists()) {
        return res.status(404).json({ error: "post not found" });
      }
      batch.update(postRef, {
        feedbacks: arrayUnion(feedbackDocRef), // Thêm reference thay vì ID
      });

      await batch.commit();

      res.status(201).json({
        id: newFeedbackId,
        buyerId: buyerId,
        sellerId: sellerId,
        orderId: orderId,
        postId: postId,
        productId: productId,
        comment: comment,
        rating: rating,
        reply: reply,
        image: image || [],
        quantity: quantity,
        createdAt: newFeedback.createdAt, // Hoặc bạn có thể dùng new Date() nếu cần
      });
    } catch (error) {
      console.error("Error adding feedback:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Lấy tất cả feedback - giờ nhanh hơn vì không cần fetch nhiều
  getAllFeedback: async (req, res) => {
    const firestoreDb = getFirestoreDb();

    try {
      const snapshot = await getDocs(collection(firestoreDb, "feedbacks"));
      const feedbacks = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const feedbackData = doc.data();

          // Fetch buyer data
          const buyerDoc = await getDoc(feedbackData.buyer);
          const buyerData = buyerDoc.data();

          // Fetch seller data
          const sellerDoc = await getDoc(feedbackData.seller);
          const sellerData = sellerDoc.data();

          const postDoc = await getDoc(feedbackData.post);
          const postData = postDoc.data();

          const productDoc = await getDoc(feedbackData.product);
          const productData = productDoc.data();

          const orderDoc = await getDoc(feedbackData.order);
          const orderData = orderDoc.data();

          // Return order với đầy đủ dữ liệu
          return {
            id: doc.id,
            ...feedbackData,
            buyer: { id: buyerDoc.id, ...buyerData },
            seller: { id: sellerDoc.id, ...sellerData },
            order: { id: orderDoc.id, ...orderData },
            post: { id: postDoc.id, ...postData },
            product: { id: productDoc.id, ...productData },
          };
        })
      );
      return res.status(200).json(feedbacks);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(400).json({ error: error.message });
    }
  },
  // Lấy feedback theo ID
  getFeedbackById: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const { id } = req.params;

    try {
      const feedbackDoc = await getDoc(doc(firestoreDb, "feedbacks", id));

      const feedbackData = feedbackDoc.data();

      // Fetch buyer data
      const buyerDoc = await getDoc(feedbackData.buyer);
      const buyerData = buyerDoc.data();

      // Fetch seller data
      const sellerDoc = await getDoc(feedbackData.seller);
      const sellerData = sellerDoc.data();

      const postDoc = await getDoc(feedbackData.post);
      const postData = postDoc.data();

      const productDoc = await getDoc(feedbackData.product);
      const productData = productDoc.data();

      const orderDoc = await getDoc(feedbackData.order);
      const orderData = orderDoc.data();

      return res.status(200).json({
        id: doc.id,
        ...feedbackData,
        buyer: { id: buyerDoc.id, ...buyerData },
        seller: { id: sellerDoc.id, ...sellerData },
        order: { id: orderDoc.id, ...orderData },
        post: { id: postDoc.id, ...postData },
        product: { id: productDoc.id, ...productData },
      });
    } catch (error) {
      console.error("Error getting feedback:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Cập nhật feedback
  updateFeedback: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const { id } = req.params;
    const { buyerId, sellerId, orderId, postId, productId, ...updateData } =
      req.body;

    try {
      const feedbackRef = doc(firestoreDb, "feedbacks", id);
      const feedbackDoc = await getDoc(feedbackRef);

      if (!feedbackDoc.exists()) {
        return res.status(404).json({ message: "Feedback not found" });
      }

      const updates = {
        ...updateData,
        updatedAt: new Date(),
      };

      // Nếu có thay đổi về references, cập nhật cả denormalized data
      if (buyerId) {
        const buyerDoc = await getDoc(doc(firestoreDb, "users", buyerId));
        updates.buyer = doc(firestoreDb, "users", buyerId);
        updates.buyerInfo = {
          id: buyerId,
          name: buyerDoc.data().name,
          avatar: buyerDoc.data().avatar,
        };
      }

      if (sellerId) {
        const sellerDoc = await getDoc(doc(firestoreDb, "users", sellerId));
        updates.seller = doc(firestoreDb, "users", sellerId);
        updates.sellerInfo = {
          id: sellerId,
          name: sellerDoc.data().name,
          avatar: sellerDoc.data().avatar,
        };
      }

      if (postId && productId) {
        const productDoc = await getDoc(
          doc(firestoreDb, "posts", postId, "products", productId)
        );
        updates.post = doc(firestoreDb, "posts", postId);
        updates.product = doc(
          firestoreDb,
          "posts",
          postId,
          "products",
          productId
        );
        updates.productInfo = {
          id: productId,
          name: productDoc.data().name,
          image: productDoc.data().image,
        };
      }

      await updateDoc(feedbackRef, updates);
      const updatedDoc = await getDoc(feedbackRef);

      res.status(200).json({
        id: updatedDoc.id,
        ...updatedDoc.data(),
      });
    } catch (error) {
      console.error("Error updating feedback:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Lấy feedback theo seller - giờ nhanh hơn
  getFeedbackByPost: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const { postId } = req.params;
    const postRef = doc(firestoreDb, "posts", postId);

    try {
      const q = query(
        collection(firestoreDb, "feedbacks"),
        where("post", "==", postRef)
      );

      const snapshot = await getDocs(q);
      const feedbacks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(feedbacks);
    } catch (error) {
      console.error("Error getting seller feedbacks:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Lấy feedback theo product - giờ nhanh hơn
  getFeedbackByProduct: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const { postId, productId } = req.params;
    const productRef = doc(firestoreDb, "posts", postId, "products", productId);

    try {
      const q = query(
        collection(firestoreDb, "feedbacks"),
        where("product", "==", productRef)
      );

      const snapshot = await getDocs(q);
      const feedbacks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Tính rating trung bình
      const averageRating =
        feedbacks.reduce((acc, curr) => acc + curr.rating, 0) /
        feedbacks.length;

      res.status(200).json({
        feedbacks,
        averageRating: averageRating || 0,
        totalFeedback: feedbacks.length,
      });
    } catch (error) {
      console.error("Error getting product feedbacks:", error);
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = feedbackController;
