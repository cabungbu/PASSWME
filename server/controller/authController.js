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

  const userRef = doc(firestoreDb, "users", data.email);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return res.status(405).json({ message: "Email đã được đăng ký" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = {
      username: data.username || "", // Default to empty string if not provided
      email: data.email || "",
      password: hashedPassword,
      phone: data.phone || "",
      coin: 0,
      lastTimeCheckIn: new Date().toISOString,
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/passwme-ec9f7.appspot.com/o/5ee082781b8c41406a2a50a0f32d6aa6.jpg?alt=media&token=6f5c44d6-60eb-487a-b3dd-4dce39316dbc",
      refreshToken: "", // Set refreshToken to an empty string initially
    };

    const userCollection = collection(firestoreDb, "users");
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
        coin: newUser.coin,
        lastTimeCheckIn: newUser.lastTimeCheckIn,
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

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      error: "Email và mật khẩu không được để trống.",
    });
  }

  try {
    // Find the user by email
    const userCollection = collection(firestoreDb, "users");
    const q = query(userCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    // Check if the user exists
    if (querySnapshot.empty) {
      return res.status(401).json({ message: "Email không tồn tại" });
    }

    // User found
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // Compare passwords
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(402).json({ message: "Sai mật khẩu" });
    }

    // Create JWT tokens
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

    // Set refresh token in a cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // Update refreshToken in Firestore
    await updateDoc(userDoc.ref, { refreshToken: refreshToken });

    // Check updated user data in Firestore
    const updatedUserDoc = await getDoc(userDoc.ref);
    const updatedUserData = {
      id: updatedUserDoc.id, // Get the document ID
      ...updatedUserDoc.data(), // Include the rest of the user data
    };

    // Respond with success
    res.status(200).json({
      message: "Login successful.",
      user: updatedUserData, // Return updated user data
      accessToken: accessToken,
      refreshToken: refreshToken, // Return the new refresh token
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
    const userDoc = doc(firestoreDb, "users", user.id);
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
  const userId = req.params.id;
  const data = req.body;

  if (!data.currentPassword || !data.newPassword) {
    return res
      .status(400)
      .json({ error: "Current and new passwords are required." });
  }

  try {
    const userDoc = doc(firestoreDb, "users", userId);
    const userData = await getDoc(userDoc); // Lấy thông tin người dùng

    if (!userData.exists()) {
      return res.status(404).json({ error: "User not found." });
    }

    // So sánh mật khẩu hiện tại
    const isMatch = await bcrypt.compare(
      data.currentPassword,
      userData.data().password
    );
    if (!isMatch) {
      return res.status(402).json({ message: "Sai mật khẩu hiện tại." });
    }

    // Tạo salt và băm mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(data.newPassword, salt);

    // Cập nhật mật khẩu mới
    await updateDoc(userDoc, { password: hashedNewPassword });

    const updatedUserData = await getDoc(userDoc);

    res.status(200).json({
      message: "Password changed successfully.",
      user: {
        id: userId,
        ...updatedUserData.data(), // Spread toàn bộ dữ liệu người dùng
      },
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const id = req.params.id;
  try {
    // Truy cập collection users và document với id
    const userRef = doc(firestoreDb, "users", id);
    if (!userRef || !id) {
      return res.status(401).json({ message: "User không tồn tại" });
    }
    // Cập nhật document để xóa refreshToken
    await updateDoc(userRef, {
      refreshToken: null,
    });
    return res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi server khi đăng xuất",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  register,
  takeRefreshToken,
  logout,
  resetPassword,
};
