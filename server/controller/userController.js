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
} = require("firebase/firestore");

const addUser = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  try {
    const data = req.body;
    const newUser = new user({
      username: data.username,
      email: data.email, 
      password: data.password,
      phone: data.phone, 
      avatar: data.avatar,
      address: data.address || "",
      posts: data.posts || [],
      order: data.order || [],
      customerOrder: data.order || [],
    });
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "Data is required." });
    }
    const userCollection = collection(firestoreDb, "users");
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
    const userCollection = collection(firestoreDb, "users");
    const snapshot = await getDocs(userCollection); 

    const users = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const userData = doc.data();
        const posts = await Promise.all(
          userData.posts.map(async (postRef) => {
            const postDoc = await getDoc(postRef);
            if (postDoc.exists()) {
              return { id: postDoc.id, ...postDoc.data() };
            } else {
              return null;
            }
          })
        );
      })
    );
    const validPosts = posts.filter((post) => post !== null);
    res.status(200).json({ users, posts: validPosts });
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const userDoc = doc(firestoreDb, "users", userId);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      return res.status(404).json({ error: "User not found." });
    }

    const userData = userSnapshot.data();

    if (!userData.posts || !Array.isArray(userData.posts)) {
      return res.status(200).json({
        id: userSnapshot.id,
        ...userData,
        posts: [],
      });
    }

    const posts = await Promise.all(
      userData.posts.map(async (postRef) => {
        try {
          const postDoc = await getDoc(postRef);
          if (postDoc.exists()) {
            return { id: postDoc.id, ...postDoc.data() };
          }
          return null;
        } catch (error) {
          console.error(`Error fetching post: ${error}`);
          return null;
        }
      })
    );

    const validPosts = posts.filter((post) => post !== null);

    res.status(200).json({
      id: userSnapshot.id,
      ...userData,
      posts: validPosts,
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserShopCart = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const userId = req.params.id;

  try {
    const userRef = doc(firestoreDb, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    const shopCartRef = collection(userRef, "shopcart");
    const shopCartQuery = query(shopCartRef, orderBy("updatedAt", "desc"));
    const shopCartSnapshot = await getDocs(shopCartQuery);

    const shopCart = await Promise.all(
      shopCartSnapshot.docs.map(async (shopCartItem) => {
        const shopData = shopCartItem.data();

        const userShopRef = doc(firestoreDb, "users", shopCartItem.id);
        const userShopDoc = await getDoc(userShopRef);
        let username = "Người dùng không xác định";
        if (userShopDoc.exists()) {
          username = userShopDoc.data().username;
        }

        const listItem = await Promise.all(
          shopData.listItem.map(async (item) => {
            const postRef = doc(firestoreDb, "posts", item.postId);
            const postDoc = await getDoc(postRef);

            if (!postDoc.exists()) {
              return res.status(404).json({ error: "Post not found" });
            }

            const postData = postDoc.data();
            const productsRef = collection(postRef, "products");
            const productRef = doc(productsRef, item.productId); // Sửa ở đây
            const productSnapshot = await getDoc(productRef); // Sử dụng getDoc thay vì getDocs
            return {
              postId: postDoc.id,
              title: postData.title,
              images: postData.images,
              product: productSnapshot.data(),
            };
          })
        );

        return {
          id: shopCartItem.id,
          ...shopData,
          listItem: listItem,
          user: username,
        };
      })
    );

    res.status(200).json(shopCart);
  } catch (error) {
    console.error("Error getting user's shop cart:", error);
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

    const userDocRef = doc(firestoreDb, "users", userId);
    await updateDoc(userDocRef, updateData);

    const updatedUserDoc = await getDoc(userDocRef);
    if (!updatedUserDoc.exists()) {
      return res.status(404).json({ error: "User not found after update." });
    }

    res.status(200).json({
      message: "User updated successfully.",
      user: { id: updatedUserDoc.id, ...updatedUserDoc.data() }, 
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
    const userDoc = doc(firestoreDb, "users", userId);
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
  const { sellerId, postId, productId, quantity } = req.body;

  try {
    // 1. Lấy thông tin về seller
    const sellerRef = doc(firestoreDb, "users", sellerId);
    const sellerDoc = await getDoc(sellerRef);

    if (!sellerDoc.exists()) {
      return res.status(404).json({ error: "Seller not found" });
    }

    // 2. Lấy thông tin về post
    const postRef = doc(firestoreDb, "posts", postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      return res.status(404).json({ error: "Post not found" });
    }

    const postData = postDoc.data();

    // 3. Lấy thông tin về sản phẩm trong post
    const productsRef = collection(postRef, "products");
    const productsSnapshot = await getDocs(productsRef);

    const product = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const selectedProduct = product.find((p) => p.id === productId);

    if (!selectedProduct) {
      return res.status(404).json({ error: "Product not found in this post" });
    }

    if (selectedProduct.quantity < quantity) {
      return res.status(400).json({
        message: "Đã vượt quá số lượng còn lại trong kho",
        available: selectedProduct.quantity,
      });
    }

    // 4. Lấy thông tin về user
    const userRef = doc(firestoreDb, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    // 5. Cập nhật giỏ hàng của user
    const shopCartRef = doc(userRef, "shopcart", sellerId);
    const batch = writeBatch(firestoreDb);

    const shopCartDoc = await getDoc(shopCartRef);

    if (!shopCartDoc.exists()) {
      batch.set(shopCartRef, {
        listItem: [
          {
            postId,
            productId,
            quantity,
            selectedAt: Timestamp.now(),
          },
        ],
        updatedAt: Timestamp.now(),
      });
    } else {
      const existingItems = shopCartDoc.data().listItem;
      const existingProduct = existingItems.find(
        (p) => p.productId === productId
      );

      if (existingProduct) {
        const newQuantity = Number(existingProduct.quantity) + Number(quantity);
        const updatedItems = existingItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        );

        batch.update(shopCartRef, {
          listItem: updatedItems,
          updatedAt: Timestamp.now(),
        });
      } else {
        const newItem = {
          postId,
          productId,
          quantity,
          selectedAt: Timestamp.now(),
        };

        const updatedItems = [newItem, ...existingItems];

        batch.update(shopCartRef, {
          listItem: updatedItems,
          updatedAt: Timestamp.now(),
        });
      }
    }

    await batch.commit();

    res.status(200).json({
      message: "Product added to cart successfully",
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(400).json({ error: error.message });
  }
};

const updateShopCart = async (req, res) => {
  const db = getFirestoreDb();
  const userId = req.params.id;
  try {
    const { sellerId, postId, productIdBefore, productIdAfter, quantity } =
      req.body;

    // Reference to user's shopcart collection
    const userDocRef = doc(db, "users", userId);
    const shopcartRef = doc(collection(userDocRef, "shopcart"), sellerId);

    // Get the current shopcart data
    const shopcartDoc = await getDoc(shopcartRef);
    const shopcartData = shopcartDoc.data() || { listItem: [] };
    let { listItem } = shopcartData;

    const beforeIndex = listItem.findIndex(
      (item) => item.productId === productIdBefore
    );

    if (beforeIndex === -1) {
      return res.status(400).json({ message: "ProductId not found" });
    }

    let afterIndex = beforeIndex;

    // Case 1: Update quantity only
    if (productIdBefore === productIdAfter && quantity) {
      listItem[beforeIndex].quantity = quantity;
      listItem[beforeIndex].updatedAt = Timestamp.now();
    }
    // Case 2: Change product ID (with possible merge)
    else {
      // Find if productIdAfter already exists
      afterIndex = listItem.findIndex(
        (item) => item.productId === productIdAfter
      );

      if (afterIndex !== -1) {
        // Merge quantities and remove old item
        listItem[afterIndex].quantity += listItem[beforeIndex].quantity;
        listItem[afterIndex].updatedAt = Timestamp.now();
        listItem.splice(beforeIndex, 1);
      } else {
        // Just update the productId
        listItem[beforeIndex].productId = productIdAfter;
        listItem[beforeIndex].updatedAt = Timestamp.now();
      }
    }

    // Update the document first
    await setDoc(shopcartRef, { listItem }, { merge: true });

    // Check maximum quantity
    const postDocRef = doc(db, "posts", postId);
    const productRef = doc(collection(postDocRef, "products"), productIdAfter);
    const maxQuantityDoc = await getDoc(productRef);

    if (!maxQuantityDoc.exists()) {
      return res.status(404).json({ message: "Product not found" });
    }

    const maxQuantityData = maxQuantityDoc.data();

    if (
      afterIndex >= 0 &&
      maxQuantityData.quantity < listItem[afterIndex].quantity
    ) {
      listItem[afterIndex].quantity = maxQuantityData.quantity;
      await setDoc(shopcartRef, { listItem }, { merge: true });
      return res.status(401).json({ message: "Đã đạt số lượng tối đa" });
    }

    await setDoc(shopcartRef, { listItem }, { merge: true });
    return res.status(200).json({ message: "Cập nhật giỏ hàng thành công" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(400).json({ error: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const userId = req.params.id;
  const { postId, productId } = req.body; // Lấy postId và productId từ body

  try {
    const userRef = doc(firestoreDb, "users", userId);
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

    const existingPost = userCart[postIndex];

    // Kiểm tra xem mảng product có tồn tại không
    if (!existingPost.product || !Array.isArray(existingPost.product)) {
      return res.status(404).json({ error: "No products found for this post" });
    }

    const existingProductIndex = existingPost.product.findIndex(
      (p) => p.productId === productId
    );
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
    const userRef = doc(firestoreDb, "users", userId);
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
    const userRef = doc(firestoreDb, "users", userId);
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
