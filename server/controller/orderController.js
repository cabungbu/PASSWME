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
} = require("firebase/firestore");

const OrderController = {
  // Thêm một đơn hàng mới
  addOrder: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const data = req.body;

    const newOrderData = {
      buyerId: data.buyerId,
      sellerId: data.sellerId,
      postIds: data.postIds || [],
      note: data.note,
      from: data.from,
      to: data.to,
      status: data.status,
      orderDate: new Date(), // Thời gian hiện tại
    };

    try {
      // Kiểm tra xem có trường nào bị thiếu không
      if (!data.buyerId || !data.sellerId || !data.postIds || !data.from || !data.to || !data.status || !data.products || data.products.length === 0) {
          return res.status(400).json({ error: "Thiếu thông tin bắt buộc, bao gồm ít nhất một sản phẩm." });
      }

      // Tạo đơn hàng mới
      const newOrderRef = await addDoc(collection(firestoreDb, "orders"), newOrderData);

      // Tạo subcollection 'products' cho đơn hàng mới
      const productsCollectionRef = collection(newOrderRef, "products");

      // Thêm từng sản phẩm vào subcollection 'products' với ID tùy chỉnh
      const batch = writeBatch(firestoreDb);
      data.products.forEach(product => {
          const productRef = doc(productsCollectionRef, product.id); // Sử dụng ID tùy chỉnh từ body
          batch.set(productRef, {
              name: product.name,
              price: product.price,
              quantity: product.quantity,
              image: product.image
          }); // Set dữ liệu sản phẩm
      });

      await batch.commit(); // Cam kết tất cả các thay đổi

      res.status(201).json({
          message: "Order added successfully.",
          orderId: newOrderRef.id,
      });
    } catch (error) {
      console.error("Error adding order:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Lấy tất cả đơn hàng
  getAllOrders: async (req, res) => {
    const firestoreDb = getFirestoreDb();

    try {
      const snapshot = await getDocs(collection(firestoreDb, "orders"));
      const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      res.status(200).json(orders);
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
      const orderDoc = await getDoc(orderDocRef);

      if (!orderDoc.exists()) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.status(200).json({ id: orderId, ...orderDoc.data() });
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

        // Nếu không có cập nhật nào cho to hoặc note, trả về lỗi
        if (Object.keys(allowedUpdates).length === 0) {
            return res.status(400).json({ error: "Cần cung cấp ít nhất một trong các trường 'to' hoặc 'note' để cập nhật." });
        }

        await updateDoc(orderDocRef, allowedUpdates);
      } else {
        return res.status(400).json({ error: "Chỉ cho phép cập nhật status hoặc 'to/note' nếu status là 'Chưa xử lý'." });
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