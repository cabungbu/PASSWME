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

const addToShopCart = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const userId = req.params.id;
  const input = req.body;
  try {
    const postRef = doc(firestoreDb, "post", input.postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      return res.status(404).json({ error: "Post not found" });
    }

    const postData = postDoc.data();
    const productsRef = collection(postRef, "product");
    const productsSnapshot = await getDocs(productsRef);

    const product = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Find the selected product
    const selectedProduct = product.find((p) => p.id === input.productId);

    if (!selectedProduct) {
      return res.status(404).json({ error: "Product not found in this post" });
    }

    // Kiểm tra số lượng có sẵn
    if (selectedProduct.quantity < input.quantity) {
      return res.status(400).json({
        error: "Not enough quantity available",
        available: selectedProduct.quantity,
      });
    }

    const userRef = doc(firestoreDb, "user", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();
    const userCart = userData.shopcart || [];

    // 3. Kiểm tra và cập nhật giỏ hàng
    const existingPostIndex = userCart.findIndex(
      (item) => item.postId === input.postId
    );

    if (existingPostIndex === -1) {
      // Post chưa có trong giỏ hàng -> thêm mới
      userCart.unshift({
        postId: input.postId,
        title: postData.title,
        image: postData.image,
        category: postData.category,
        status: postData.status,
        service: postData.service,
        oldNew: postData.oldNew,
        product: [
          {
            productId: input.productId,
            name: selectedProduct.name,
            price: selectedProduct.price,
            image: selectedProduct.image,
            quantity: input.quantity,
            selectedAt: new Date().toISOString(),
          },
        ],
      });
    } else {
      // Post đã có trong giỏ hàng
      const existingPost = userCart[existingPostIndex];
      existingPost.product = existingPost.product || [];

      const existingProductIndex = existingPost.product.findIndex(
        (p) => p.productId === input.productId
      );

      if (existingProductIndex === -1) {
        // Product chưa có -> thêm mới vào mảng products
        existingPost.product.push({
          productId: input.productId,
          name: selectedProduct.name,
          price: selectedProduct.price,
          image: selectedProduct.image,
          quantity: input.quantity,
          selectedAt: new Date().toISOString(),
        });
      } else {
        // Product đã có -> cộng thêm số lượng
        const newQuantity =
          Number(existingPost.product[existingProductIndex].quantity) +
          Number(input.quantity);

        console.log(newQuantity);
        if (newQuantity > selectedProduct.quantity) {
          return res.status(400).json({
            error: "Total quantity exceeds available stock",
            available: selectedProduct.quantity,
            currentInCart:
              userCart[existingPostIndex].products[existingProductIndex]
                .quantity,
          });
        }

        userCart[existingPostIndex].product[existingProductIndex].quantity =
          newQuantity;
      }
      userCart.splice(existingPostIndex, 1);
      userCart.unshift(existingPost);
    }

    // 4. Cập nhật user document với giỏ hàng mới
    await updateDoc(userRef, {
      shopcart: userCart,
    });

    res.status(200).json({
      message: "Product added to cart successfully",
      cart: userCart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(400).json({ error: error.message });
  }
};

const updateShopCart = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const userId = req.params.id;
  const input = req.body;
  try {
    const userRef = doc(firestoreDb, "user", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();
    const userCart = userData.shopcart || [];

    const postIndex = userCart.findIndex(
      (item) => item.postId === input.postId
    );
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found in cart" });
    }

    const existingPost = userCart[postIndex];
    existingPost.product = existingPost.product || [];

    const existingProductIndex = existingPost.product.findIndex(
      (p) => p.productId === input.productId
    );
    if (existingProductIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    existingPost.product[existingProductIndex].quantity = input.quantity;
    existingPost.product[existingProductIndex].name = input.name;

    await setDoc(userRef, { shopcart: userCart });

    res
      .status(200)
      .json({ message: "ShopCart updated successfully", shopcart: userCart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(400).json({ error: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  console.log("Removing product from cart");
  const firestoreDb = getFirestoreDb();
  const userId = req.params.id;
  const { postId, productId } = req.body; // Lấy postId và productId từ body

  try {
    const userRef = doc(firestoreDb, "user", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();
    const userCart = userData.shopcart || [];

    // Tìm chỉ số của post trong shopcart
    const postIndex = userCart.findIndex((item) => item.postId === postId);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found in cart" });
    }

    console.log(postIndex);
    const existingPost = userCart[postIndex];

    // Kiểm tra xem mảng product có tồn tại không
    if (!existingPost.product || !Array.isArray(existingPost.product)) {
      return res.status(404).json({ error: "No products found for this post" });
    }

    const existingProductIndex = existingPost.product.findIndex(
      (p) => p.productId === productId
    );
    console.log(existingProductIndex);
    if (existingProductIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // Xóa sản phẩm khỏi mảng product
    existingPost.product.splice(existingProductIndex, 1);

    // Nếu mảng product rỗng, xóa post khỏi shopcart
    if (existingPost.product.length === 0) {
      userCart.splice(postIndex, 1);
    }

    // Cập nhật shopcart trong Firestore
    await setDoc(userRef, { shopcart: userCart });

    res
      .status(200)
      .json({ message: "Product removed successfully", cart: userCart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(400).json({ error: error.message });
  }
};

const addToLike = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const userId = req.params.id;
  const { postId } = req.body;

  try {
    const userRef = doc(firestoreDb, "user", userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentLikes = userDoc.data().like || [];

    // Kiểm tra nếu postId đã tồn tại trong mảng likes
    if (currentLikes.includes(postId)) {
      return res.status(400).json({ error: "Post already liked" });
    }
    await updateDoc(userRef, {
      like: [postId, ...currentLikes],
    });

    return res.status(200).json({ message: "Added to likes successfully" });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Error add to like:", errorMessage: e });
  }
};

const removeFromLike = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const userId = req.params.id;
  const { postId } = req.body;

  try {
    const userRef = doc(firestoreDb, "user", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    // Lấy mảng likes hiện tại
    const currentLikes = userDoc.data().like || [];

    // Kiểm tra xem postId có tồn tại trong mảng likes không
    if (!currentLikes.includes(postId)) {
      return res.status(400).json({ error: "Post is not in likes" });
    }

    // Lọc ra mảng mới không chứa postId cần xóa
    const updatedLikes = currentLikes.filter((id) => id !== postId);

    // Cập nhật document với mảng likes mới
    await updateDoc(userRef, {
      like: updatedLikes,
    });

    return res.status(200).json({
      message: "Removed from likes successfully",
      remainingLikes: updatedLikes,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Error removing from like:", errorMessage: e });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserShopCart,
  addToShopCart,
  updateShopCart,
  removeProductFromCart,
};
