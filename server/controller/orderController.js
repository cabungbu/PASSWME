const { getFirestoreDb } = require("../config/firebase.js");
const {
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
  arrayUnion,
} = require("firebase/firestore");

const OrderController = {
  // Thêm một đơn hàng mới
  addOrder: async (req, res) => {
    const db = getFirestoreDb();
    const data = req.body;

    const newOrderData = {
      buyer: doc(db, "users", data.buyerId),
      buyerId: data.buyerId,
      buyerName: data.buyerName,
      buyerPhone: data.buyerPhone,
      buyerAddress: data.buyerAddress,
      seller: doc(db, "users", data.sellerId),
      sellerId: data.sellerId,
      sellerName: data.sellerName,
      sellerPhone: data.sellerPhone,
      sellerAddress: data.sellerAddress,
      items: data.items || [],
      note: data.note,
      orderPrice: data.orderPrice,
      coin: data.coin,
      totalPrice: data.totalPrice,
      status: data.status,
      orderDate: new Date().toISOString(),
      feedbacks: [],
    };
    try {
      for (const item of data.items) {
        const postRef = db.collection("posts").doc(item.postId);
        const productRef = postRef.collection("products").doc(item.productId);
        const postData = await postRef.get();
        const productDoc = await productRef.get();

        if (productDoc.exists) {
          const productData = productDoc.data();
          const updatedStock = productData.quantity - item.quantity;
          if (updatedStock < 0)
            return res.status(500).json({
              message:
                "Đã vượt quá số lượng kho của sản phẩm " +
                item.title +
                " (" +
                item.name +
                ") : " +
                productData.quantity,
            });
          const updatedSold = postData.sold + item.quantity;

          // Update product stock and sold count
          await postRef.update({ sold: updatedSold });
          await productRef.update({
            stock: updatedStock,
          });
        } else {
          // Handle case where the product doesn't exist (optional, depending on your use case)
          console.log(`Product not found: ${item.productId}`);
        }
      }

      const orderRef = await db.collection("orders").add(newOrderData);

      // 2. Add the reference of the order to the seller's 'ordersReceived' field
      const sellerRef = db.collection("users").doc(data.sellerId);
      await sellerRef.update({
        ordersReceived: arrayUnion(orderRef),
      });

      const buyerRef = db.collection("users").doc(data.buyerId);
      await buyerRef.update({
        myOrders: arrayUnion(orderRef),
      });

      if (data.coin > 0) {
        // Update the seller's coin balance
        const sellerDoc = await sellerRef.get();
        const sellerCoin =
          sellerDoc.exists && sellerDoc.data().coin ? sellerDoc.data().coin : 0;
        await sellerRef.update({ coin: sellerCoin + data.coin });

        // Update the buyer's coin balance
        const buyerRef = db.collection("users").doc(data.buyerId);
        const buyerDoc = await buyerRef.get();
        const buyerCoin =
          buyerDoc.exists && buyerDoc.data().coin ? buyerDoc.data().coin : 0;
        await buyerRef.update({ coin: buyerCoin - data.coin });
      }

      res
        .status(200)
        .json({ message: "Order created successfully", orderId: orderRef.id });
    } catch (err) {
      console.error("Error creating order:", err);
      res.status(500).json({ message: err.message });
    }
  },

  // Lấy tất cả đơn hàng
  getAllOrders: async (req, res) => {
    const firestoreDb = getFirestoreDb();

    try {
      const snapshot = await getDocs(collection(firestoreDb, "orders"));

      // Fetch data từ tất cả references
      const orders = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const orderData = doc.data();

          // Fetch buyer data
          const buyerDoc = await getDoc(orderData.buyerId);
          const buyerData = buyerDoc.data();

          // Fetch seller data
          const sellerDoc = await getDoc(orderData.sellerId);
          const sellerData = sellerDoc.data();

          const feedbacksData = await Promise.all(
            orderData.feedbacks.map(async (feedbackId) => {
              const feedbackDoc = await getDoc(feedbackId);
              return { id: feedbackDoc.id, ...feedbackDoc.data() };
            })
          );

          // Fetch all posts data
          const postsData = await Promise.all(
            orderData.postIds.map(async (postId) => {
              const postDoc = await getDoc(postId);
              return { id: postDoc.id, ...postDoc.data() };
            })
          );

          // Return order với đầy đủ dữ liệu
          return {
            id: doc.id,
            ...orderData,
            buyer: { id: buyerDoc.id, ...buyerData },
            seller: { id: sellerDoc.id, ...sellerData },
            posts: postsData,
            feedbacks: feedbacksData,
          };
        })
      );

      // Trả về tất cả orders
      return res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Lấy đơn hàng theo ID
  getOrderById: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const orderId = req.params.id;

    try {
      const orderDocRef = doc(firestoreDb, "orders", orderId);
      const orderDoc = (await getDoc(orderDocRef)).data();

      if (!orderDoc.exists()) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Fetch buyer data
      const buyerDoc = await getDoc(orderDoc.buyerId);
      const buyerData = buyerDoc.data();

      // Fetch seller data
      const sellerDoc = await getDoc(orderDoc.sellerId);
      const sellerData = sellerDoc.data();

      // Fetch all posts data
      const postsData = await Promise.all(
        orderDoc.postIds.map(async (postRef) => {
          const postDoc = await getDoc(postRef);
          return { id: postDoc.id, ...postDoc.data() };
        })
      );

      const feedbacksData = await Promise.all(
        orderDoc.feedbacks.map(async (feedbackId) => {
          const feedbackDoc = await getDoc(feedbackId);
          return { id: feedbackDoc.id, ...feedbackDoc.data() };
        })
      );
      res.status(200).json({
        id: orderId,
        buyer: { id: buyerDoc.id, ...buyerData },
        seller: { id: sellerDoc.id, ...sellerData },
        posts: postsData,
        feedbacks: feedbacksData,
        ...orderDoc.data(),
      });
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Cập nhật đơn hàng
  updateOrder: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const orderId = req.params.id;
    const updateData = req.body;

    try {
      const orderDocRef = doc(firestoreDb, "orders", orderId);
      const orderSnapshot = await getDoc(orderDocRef);

      if (!orderSnapshot.exists()) {
        return res.status(404).json({ error: "Order not found" });
      }

      const currentOrderData = orderSnapshot.data();

      // Chỉ cho phép cập nhật status hoặc (to và note nếu status là "Chưa xử lý")
      if (updateData.status) {
        // Cập nhật trạng thái
        await updateDoc(orderDocRef, { status: updateData.status });
      } else if (currentOrderData.status === "Chưa xử lý") {
        // Nếu status là "Chưa xử lý", cho phép cập nhật to và note
        const allowedUpdates = {};
        if (updateData.to) allowedUpdates.to = updateData.to;
        if (updateData.note) allowedUpdates.note = updateData.note;

        if (Object.keys(allowedUpdates).length === 0) {
          return res.status(400).json({
            error:
              "Cần cung cấp ít nhất một trong các trường 'to' hoặc 'note' để cập nhật.",
          });
        }

        await updateDoc(orderDocRef, allowedUpdates);
      } else {
        return res.status(400).json({
          error:
            "Chỉ cho phép cập nhật status hoặc 'to/note' nếu status là 'Chưa xử lý'.",
        });
      }

      res.status(200).json({ message: "Order updated successfully." });
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Xóa đơn hàng
  deleteOrder: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const orderId = req.params.id;

    try {
      const orderDocRef = doc(firestoreDb, "orders", orderId);
      const orderSnapshot = await getDoc(orderDocRef);

      if (!orderSnapshot.exists()) {
        return res.status(404).json({ error: "Order not found" });
      }

      const batch = writeBatch(firestoreDb);
      batch.delete(orderDocRef);

      // Xóa tất cả các sản phẩm trong đơn hàng
      const productsCollection = collection(orderDocRef, "products");
      const productsSnapshot = await getDocs(productsCollection);
      productsSnapshot.docs.forEach((productDoc) => {
        batch.delete(doc(productsCollection, productDoc.id));
      });

      await batch.commit();
      res.status(200).json({ message: "Order deleted successfully." });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = OrderController;
