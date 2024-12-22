const { getFirestoreDb } = require("../config/firebase.js");
const {
  collection,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
  arrayUnion,
  arrayRemove,
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
      // Duyệt qua từng sản phẩm trong đơn hàng
      for (const item of data.items) {
        const postRef = doc(db, "posts", item.postId);
        const productRef = doc(postRef, "products", item.productId);

        // Lấy dữ liệu từ Firestore
        const postData = await getDoc(postRef);
        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
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

          const updatedSold = postData.data().sold
            ? postData.data().sold + item.quantity
            : item.quantity;

          // Cập nhật thông tin sản phẩm (số lượng bán và kho)
          await updateDoc(postRef, { sold: updatedSold });
          await updateDoc(productRef, { quantity: updatedStock });
        } else {
          // Nếu sản phẩm không tồn tại
          console.log(`Product not found: ${item.productId}`);
        }
      }

      // Thêm đơn hàng vào collection 'orders'
      const orderRef = doc(collection(db, "orders"));
      await setDoc(orderRef, newOrderData);

      // Thêm tham chiếu đến đơn hàng trong trường 'ordersReceived' của người bán
      const sellerRef = doc(db, "users", data.sellerId);
      await updateDoc(sellerRef, {
        ordersReceived: arrayUnion(orderRef),
      });

      // Thêm tham chiếu đến đơn hàng trong trường 'myOrders' của người mua
      const buyerRef = doc(db, "users", data.buyerId);
      await updateDoc(buyerRef, {
        myOrders: arrayUnion(orderRef),
      });

      if (data.coin > 0) {
        // Cập nhật xu của người bán
        const sellerDoc = await getDoc(sellerRef);
        const sellerCoin =
          sellerDoc.exists() && sellerDoc.data().coin
            ? sellerDoc.data().coin
            : 0;
        await updateDoc(sellerRef, { coin: sellerCoin + data.coin });

        // Cập nhật xu của người mua
        const buyerDoc = await getDoc(buyerRef);
        const buyerCoin =
          buyerDoc.exists() && buyerDoc.data().coin ? buyerDoc.data().coin : 0;
        await updateDoc(buyerRef, { coin: buyerCoin - data.coin });
      }

      if (data.deleteShopCart) {
        const shopcartDocRef = doc(
          db,
          "users",
          data.buyerId,
          "shopcart",
          data.sellerId
        );

        // Lấy dữ liệu của document này
        const shopcartDoc = await getDoc(shopcartDocRef);
        if (shopcartDoc.exists()) {
          const shopcartData = shopcartDoc.data();

          // Duyệt qua mảng items trong request để xóa từng phần tử trong shopcart
          const updatedListItems = shopcartData.listItem.filter((item) => {
            // Kiểm tra nếu productId không có trong data.items
            return !data.items.some(
              (deleteItem) =>
                deleteItem.productId === item.productId &&
                deleteItem.postId === item.postId
            );
          });
          await updateDoc(shopcartDocRef, {
            listItem: updatedListItems,
          });
        }
      }

      // Trả về response thành công
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
          // const buyerDoc = await getDoc(orderData.buyerId);
          // const buyerData = buyerDoc.data();

          // const sellerDoc = await getDoc(orderData.sellerId);
          // const sellerData = sellerDoc.data();

          // const feedbacksData = await Promise.all(
          //   orderData.feedbacks.map(async (feedbackId) => {
          //     const feedbackDoc = await getDoc(feedbackId);
          //     return { id: feedbackDoc.id, ...feedbackDoc.data() };
          //   })
          // );

          // const postsData = await Promise.all(
          //   orderData.postIds.map(async (postId) => {
          //     const postDoc = await getDoc(postId);
          //     return { id: postDoc.id, ...postDoc.data() };
          //   })
          // );

          // Return order với đầy đủ dữ liệu
          return {
            id: doc.id,
            ...orderData,
          };
        })
      );

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
        const updatedData = { status: updateData.status };

        // Kiểm tra nếu status là "sold" thì thêm trường completeDate
        if (updateData.status === "sold") {
          updatedData.completeDate = new Date().toISOString(); // Thêm thời gian hiện tại ở định dạng ISO
        }

        // Cập nhật tài liệu với các trường mới
        await updateDoc(orderDocRef, updatedData);
      }

      if (updateData.buyerAddress) {
        if (currentOrderData.status === "pending")
          await updateDoc(orderDocRef, {
            buyerAddress: updateData.buyerAddress,
          });
      }

      if (updateData.note) {
        if (currentOrderData.status === "pending")
          await updateDoc(orderDocRef, { note: updateData.note });
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
        return res
          .status(404)
          .json({ message: "Đơn hàng đã bị hủy hoặc không tồn tại" });
      }

      const orderData = orderSnapshot.data();

      // Khởi tạo batch để thực hiện nhiều tác vụ cùng một lúc
      const batch = writeBatch(firestoreDb);

      // Cập nhật post và product (song song)
      const productUpdates = orderData.items.map(async (item) => {
        const postRef = doc(firestoreDb, "posts", item.postId);
        const productRef = doc(postRef, "products", item.productId);

        const [postDoc, productDoc] = await Promise.all([
          getDoc(postRef),
          getDoc(productRef),
        ]);

        if (productDoc.exists() && postDoc.exists()) {
          batch.update(postRef, {
            sold: postDoc.data().sold - item.quantity,
          });
          batch.update(productRef, {
            quantity: productDoc.data().quantity + item.quantity,
          });
        } else {
          // Nếu không tìm thấy bài viết hoặc sản phẩm
          console.log(
            `Không tìm thấy bài viết hoặc sản phẩm: ${item.productId}`
          );
        }
      });

      // Thực hiện song song các cập nhật post/product
      await Promise.all(productUpdates);

      // Cập nhật thông tin seller (song song)
      const sellerSnapShot = await getDoc(orderData.seller);
      if (sellerSnapShot.exists()) {
        const sellerData = sellerSnapShot.data();
        const currentCoin = sellerData.coin || 0;
        let coinAfter = currentCoin - orderData.coin;
        if (coinAfter < 0) coinAfter = 0;

        batch.update(sellerSnapShot.ref, {
          ordersReceived: arrayRemove(orderDocRef),
          coin: coinAfter,
        });
      } else {
        console.log("Không tìm thấy seller.");
      }

      // Cập nhật thông tin buyer (song song)
      const buyerSnapShot = await getDoc(orderData.buyer);
      if (buyerSnapShot.exists()) {
        batch.update(buyerSnapShot.ref, {
          myOrders: arrayRemove(orderDocRef),
        });
      } else {
        console.log("Không tìm thấy buyer.");
      }

      // Xóa đơn hàng
      batch.delete(orderDocRef);

      // Commit tất cả các thay đổi trong một batch
      await batch.commit();

      res.status(200).json({ message: "Đơn hàng đã được xóa thành công." });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(400).json({ error: "Có lỗi xảy ra khi xóa đơn hàng." });
    }
  },

  getUserOrder: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const userId = req.params.id;
    const userDoc = doc(firestoreDb, "users", userId);
    const userSnapshot = await getDoc(userDoc);

    const listOrderRef = userSnapshot.data().myOrders;

    try {
      const orderPromises = listOrderRef.map(async (orderRef) => {
        const orderSnapshot = await getDoc(orderRef); // Lấy snapshot của từng document
        if (orderSnapshot.exists) {
          return { id: orderSnapshot.id, ...orderSnapshot.data() }; // Trả về dữ liệu nếu document tồn tại
        } else {
          console.log(`Order not found for reference: ${orderRef.id}`);
          return null; // Trả về null nếu không tìm thấy order
        }
      });
      const orders = await Promise.all(orderPromises);

      // Trả về dữ liệu
      res.status(200).json({ orders });
    } catch (error) {
      console.error("Error getting orders:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  },

  getUserOrderReceived: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const userId = req.params.id;
    const userDoc = doc(firestoreDb, "users", userId);
    const userSnapshot = await getDoc(userDoc);

    const listOrderRef = userSnapshot.data().ordersReceived;

    try {
      const orderPromises = listOrderRef.map(async (orderRef) => {
        const orderSnapshot = await getDoc(orderRef); // Lấy snapshot của từng document
        if (orderSnapshot.exists) {
          return { id: orderSnapshot.id, ...orderSnapshot.data() }; // Trả về dữ liệu nếu document tồn tại
        } else {
          console.log(`Order not found for reference: ${orderRef.id}`);
          return null; // Trả về null nếu không tìm thấy order
        }
      });
      const orders = await Promise.all(orderPromises);

      // Trả về dữ liệu
      res.status(200).json({ orders });
    } catch (error) {
      console.error("Error getting orders:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  },
};

module.exports = OrderController;
