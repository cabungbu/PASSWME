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
  getDocs,
} = require("firebase/firestore");

const addUser = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  try {
    const data = req.body;
    const newUser = new user({
      username: data.username, // Nếu không có username thì để rỗng
      email: data.email, // Nếu không có email thì để rỗng
      password: data.password, // Nếu không có password thì để rỗng
      phone: data.phone, // Nếu không có phone thì để rỗng
      avatar: data.avatar, // Nếu không có avatar thì để rỗng
      gender: data.gender, // Nếu không có gender thì để rỗng
    });
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "Data is required." });
    }
    const userCollection = collection(firestoreDb, "user");
    const docRef = await addDoc(userCollection, newUser.toPlainObject());
    res.status(200).json({
      message: "User added successfully.",
      user: docRef.id,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(400).json({ error: error.message });
  }
};
const getAllUsers = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  try {
    const userCollection = collection(firestoreDb, "user"); // Lấy collection "user"
    const snapshot = await getDocs(userCollection); // Lấy tất cả document trong collection

    // Chuyển đổi snapshot thành mảng người dùng
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), // Kết hợp ID với dữ liệu người dùng
    }));

    res.status(200).json(users); // Trả về danh sách người dùng
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  try {
    const userId = req.params.id;
    const userDoc = doc(firestoreDb, "user", userId);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      id: userSnapshot.id,
      ...userSnapshot.data(),
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(400).json({ error: error.message });
  }
};
const getUserShopCart = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  try {
    const userId = req.params.id;
    const userDoc = doc(firestoreDb, "user", userId);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      id: userSnapshot.id,
      shopcart: {
        ...userSnapshot.data().shopcart,
      },
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  try {
    const userId = req.params.id;
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "Update data is required." });
    }

    const userDoc = doc(firestoreDb, "user", userId);
    await updateDoc(userDoc, updateData);

    res.status(200).json({
      message: "User updated successfully.",
      userId: userId,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  try {
    const userId = req.params.id;
    const userDoc = doc(firestoreDb, "user", userId);
    await deleteDoc(userDoc);

    res.status(200).json({
      message: "User deleted successfully.",
      userId: userId,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserShopCart,
};
