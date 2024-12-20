// userController.js
const { getFirestoreDb } = require("../config/firebase.js");

const user = require("../model/user.js");
const {
  collection,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  getDocs,
  writeBatch,
  arrayUnion,
  query,
  Timestamp,
  orderBy,
  transaction,
  runTransaction,
} = require("firebase/firestore");

const checkAllBoxTrue = async (req, res) => {
  const db = getFirestoreDb();
  const userId = req.params.id;

  try {
    await runTransaction(db, async (transaction) => {
      const shopcartRef = collection(db, "users", userId, "shopcart");

      // Lấy tất cả các documents trong shopcart
      const shopcartSnapshot = await getDocs(shopcartRef);

      // Duyệt qua từng document và cập nhật isCheck
      for (const docSnapshot of shopcartSnapshot.docs) {
        const docRef = doc(shopcartRef, docSnapshot.id);
        const docData = docSnapshot.data();

        if (docData.listItem && Array.isArray(docData.listItem)) {
          const updatedListItem = docData.listItem.map((item) => ({
            ...item,
            isCheck: true,
          }));

          transaction.update(docRef, { listItem: updatedListItem });
        }
      }
    });

    return res.status(200).json({
      message: "Cập nhật tất cả giỏ hàng thành công",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Lỗi khi cập nhật giỏ hàng",
      error: err.message,
    });
  }
};

const checkAllBoxFalse = async (req, res) => {
  const db = getFirestoreDb();
  const userId = req.params.id;

  try {
    await runTransaction(db, async (transaction) => {
      const shopcartRef = collection(db, "users", userId, "shopcart");

      // Lấy tất cả các documents trong shopcart
      const shopcartSnapshot = await getDocs(shopcartRef);

      // Duyệt qua từng document và cập nhật isCheck
      for (const docSnapshot of shopcartSnapshot.docs) {
        const docRef = doc(shopcartRef, docSnapshot.id);
        const docData = docSnapshot.data();

        if (docData.listItem && Array.isArray(docData.listItem)) {
          const updatedListItem = docData.listItem.map((item) => ({
            ...item,
            isCheck: false,
          }));

          transaction.update(docRef, { listItem: updatedListItem });
        }
      }
    });

    return res.status(200).json({
      message: "Cập nhật tất cả giỏ hàng thành công",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Lỗi khi cập nhật giỏ hàng",
      error: err.message,
    });
  }
};

const deleteCheckedItems = async (req, res) => {
  const db = getFirestoreDb();
  const userId = req.params.id;

  try {
    await runTransaction(db, async (transaction) => {
      const shopcartRef = collection(db, "users", userId, "shopcart");

      // Lấy tất cả các documents trong shopcart
      const shopcartSnapshot = await getDocs(shopcartRef);

      // Duyệt qua từng document trong shopcart
      for (const docSnapshot of shopcartSnapshot.docs) {
        const docRef = doc(shopcartRef, docSnapshot.id);
        const docData = docSnapshot.data();

        if (docData.listItem && Array.isArray(docData.listItem)) {
          // Lọc các phần tử trong listItem có isCheck = true
          const updatedListItem = docData.listItem.filter(
            (item) => item.isCheck !== true
          );

          // Nếu listItem còn phần tử, cập nhật lại
          if (updatedListItem.length > 0) {
            transaction.update(docRef, { listItem: updatedListItem });
          } else {
            // Nếu listItem không còn phần tử nào, xóa document
            transaction.delete(docRef);
          }
        }
      }
    });

    return res.status(200).json({
      message: "Xóa các sản phẩm đã chọn thành công, và xóa các giỏ hàng trống",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Lỗi khi xóa sản phẩm trong giỏ hàng",
      error: err.message,
    });
  }
};
const updateQuantity = async (req, res) => {
  const db = getFirestoreDb();
  const userId = req.params.id;
  const { sellerId, postId, productId, quantity } = req.body;

  try {
    await runTransaction(db, async (transaction) => {
      const shopcartRef = doc(db, "users", userId, "shopcart", sellerId);
      const shopcartDoc = await transaction.get(shopcartRef);

      if (!shopcartDoc.exists()) {
        throw new Error("Giỏ hàng không tồn tại");
      }

      const shopcartData = shopcartDoc.data();
      const listItem = shopcartData.listItem || [];
      const itemIndex = listItem.findIndex(
        (item) => item.productId === productId && item.postId === postId
      );

      if (itemIndex === -1) {
        throw new Error("Sản phẩm không tồn tại trong giỏ hàng");
      }

      // Tìm thông tin bài đăng và sản phẩm cùng lúc
      const [postDoc, productDoc] = await Promise.all([
        transaction.get(doc(db, "posts", postId)),
        transaction.get(doc(db, "posts", postId, "products", productId)),
      ]);

      // Kiểm tra trạng thái bài viết và số lượng sản phẩm
      if (postDoc.data().status === "closed") {
        throw new Error("Bài đăng đã ngừng bán");
      }

      const stockQuantity = productDoc.data().quantity;

      if (quantity > stockQuantity) {
        throw new Error(
          "Đã vượt quá số lượng còn lại trong kho: " + stockQuantity
        );
      }

      // Cập nhật số lượng sản phẩm trong giỏ hàng
      if (listItem[itemIndex].quantity !== quantity) {
        listItem[itemIndex].quantity = quantity; // Chỉ cập nhật phần tử cần thay đổi
        transaction.update(shopcartRef, { listItem: [...listItem] }); // Cập nhật giỏ hàng
      }
    });

    return res.status(200).json({
      message: "Cập nhật số lượng sản phẩm thành công",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng",
      error: err.message,
    });
  }
};

module.exports = {
  checkAllBoxTrue,
  checkAllBoxFalse,
  deleteCheckedItems,
  updateQuantity,
};
