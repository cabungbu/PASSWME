const { getFirestoreDb } = require("../config/firebase.js");
const {
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} = require("firebase/firestore");
const { getAuth } = require("firebase-admin/auth");
const bcrypt = require("bcrypt");
const user = require("../model/user.js");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const data = req.body;
  const { email, password, phone, username } = req.body;

  if (!email || !password || !phone || !username) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = {
      username: data.username || "", // Default to empty string if not provided
      email: data.email || "",
      password: hashedPassword,
      phone: data.phone || "",
      avatar: data.avatar || "",
      gender: data.gender || "",
      refreshToken: "", // Set refreshToken to an empty string initially
    };

    const userCollection = collection(firestoreDb, "user");
    const docRef = await addDoc(userCollection, newUser);

    // Create tokens after user is successfully registered
    const accessToken = jwt.sign(
      { id: docRef.id }, // Use the document reference ID
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30min" }
    );
    const refreshToken = jwt.sign(
      { id: docRef.id },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "30d" }
    );

    // Update refreshToken in Firestore
    await updateDoc(docRef, { refreshToken: refreshToken });

    res.status(200).json({
      message: "User registered successfully.",
      user: {
        id: docRef.id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        avatar: newUser.avatar,
        gender: newUser.gender,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email và mật khẩu không được để trống.",
    });
  }

  try {
    // Tìm người dùng theo email
    const userCollection = collection(firestoreDb, "user");
    const q = query(userCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(401).json({ error: "Invalid email" });
    }

    // Có người dùng
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // Tạo token JWT
    const accessToken = jwt.sign(
      { id: userData.id },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30min" }
    );
    const refreshToken = jwt.sign(
      { id: userData.id },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "30d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // Cập nhật refreshToken trong Firestore
    await updateDoc(userDoc.ref, { refreshToken: refreshToken });

    // Kiểm tra dữ liệu trong Firestore sau khi cập nhật
    const updatedUserDoc = await getDoc(userDoc.ref);
    const updatedUserData = updatedUserDoc.data();

    res.status(200).json({
      message: "Login successful.",
      user: updatedUserData, // Trả về userData đã được cập nhật
      accessToken: accessToken,
      refreshToken: refreshToken, // Trả về refreshToken mới
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: error.message });
  }
};
const generateAccessToken = async (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "30min" }
  );
};

const updatedAccessTokenInDatabase = async (user, refreshToken) => {
  const firestoreDb = getFirestoreDb();
  try {
    const userDoc = doc(firestoreDb, "user", user.id);
    if (!user || !user.id) {
      console.error("User or user.id is undefined.");
      return;
    }
    await updateDoc(userDoc, { refreshToken: refreshToken }); // Cập nhật refreshToken
    return refreshToken;
  } catch (error) {
    console.error("Error resetting refreshToken:", error);
  }
};

const takeRefreshToken = async (req, res) => {
  //const refreshToken = req.cookies.refreshToken;
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: "You are not authenicated-chua co refreshToken" });
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      console.log(err);
    }
    const newAccessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30min" }
    );
    const newRefreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "30days" }
    );
    updatedAccessTokenInDatabase(user, newRefreshToken);
    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  });
};
const resetPassword = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const userId = req.params.userId; // Lấy userId từ tham số đường dẫn
  const data = req.body;

  if (!data.password || Object.keys(data).length === 0) {
    return res.status(400).json({ error: "Password is required." });
  }

  try {
    // Tạo salt và băm mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const userDoc = doc(firestoreDb, "user", userId);
    await updateDoc(userDoc, { password: hashedPassword }); // Cập nhật mật khẩu

    res.status(200).json({
      message: "Password reset successfully.",
      user: userDoc,
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  const auth = getAuth();
  const id = req.params.id;
  const db = getFirestoreDb();
  try {
    // Cập nhật document user trong Firestore
    const userRef = db.collection("user").doc(id);
    await userRef.update({
      refreshToken: null, // hoặc firebase.firestore.FieldValue.delete() nếu bạn muốn xóa trường này
    });

    // Vô hiệu hóa tất cả refreshToken của user
    await auth.revokeRefreshTokens(id);

    return res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi server khi đăng xuất" });
  }
};

module.exports = {
  login,
  register,
  takeRefreshToken,
  logout,
};
