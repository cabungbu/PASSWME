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
      const userDocRef = doc(db, "users", userId);
      const shopcartRef = collection(userDocRef, "shopcart");

      // Lấy tất cả các documents trong shopcart
      const shopcartSnapshot = await getDocs(shopcartRef);

      // Duyệt qua từng document và cập nhật isCheck
      for (const docSnapshot of shopcartSnapshot.docs) {
        const docRef = doc(db, "users", userId, "shopcart", docSnapshot.id);
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
      const userDocRef = doc(db, "users", userId);
      const shopcartRef = collection(userDocRef, "shopcart");

      // Lấy tất cả các documents trong shopcart
      const shopcartSnapshot = await getDocs(shopcartRef);

      // Duyệt qua từng document và cập nhật isCheck
      for (const docSnapshot of shopcartSnapshot.docs) {
        const docRef = doc(db, "users", userId, "shopcart", docSnapshot.id);
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

module.exports = {
  checkAllBoxTrue,
  checkAllBoxFalse,
};
