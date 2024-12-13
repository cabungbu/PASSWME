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
              return res.status(404).json({ message: "Post not found" });
            }

            const postData = postDoc.data();
            const productsRef = collection(postRef, "products");
            const productRef = doc(productsRef, item.productId);

            const productSnapshot = await getDoc(productRef);
            if (!productSnapshot.exists()) {
              return res.status(404).json({ message: "Product not found" });
            }
            return {
              postId: postDoc.id,
              title: postData.title,
              images: postData.images,
              product: {
                quantityInShopcart: item.quantity,
                isCheck: item.isCheck,
                productId: productSnapshot.id,
                ...productSnapshot.data(),
              },
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
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin người bán" });
    }

    // 2. Lấy thông tin về post
    const postRef = doc(firestoreDb, "posts", postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin bài đăng" });
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
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin sản phẩm này" });
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
      return res.status(404).json({ message: "User not found" });
    }

    // 5. Cập nhật giỏ hàng của user
    const shopCartRef = doc(userRef, "shopcart", sellerId);
    const batch = writeBatch(firestoreDb);

    const shopCartDoc = await getDoc(shopCartRef);

    if (!shopCartDoc.exists()) {
      batch.set(shopCartRef, {
        listItem: [
          {
            isCheck: false,
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
        if (newQuantity > selectedProduct.quantity) {
          return res.status(400).json({
            message:
              "Sản phẩm này đã tồn tại trong giỏ hàng với số lượng: " +
              existingProduct.quantity +
              ", bạn chỉ có thể thêm số lượng tối đa là: " +
              (selectedProduct.quantity - existingProduct.quantity),
          });
        } else {
          const updatedItems = existingItems.map((item) =>
            item.productId === productId
              ? { ...item, quantity: newQuantity }
              : item
          );

          batch.update(shopCartRef, {
            listItem: updatedItems,
            updatedAt: Timestamp.now(),
          });
        }
      } else {
        const newItem = {
          postId,
          productId,
          quantity,
          selectedAt: Timestamp.now(),
          isCheck: false,
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

const setProductNotCheck = async (req, res) => {
  const db = getFirestoreDb();
  const { sellerId, postId, productId, quantity, currentPrice } = req.body;
  const userId = req.params.id;

  try {
    const result = await runTransaction(db, async (transaction) => {
      const userDocRef = doc(db, "users", userId);
      const shopcartRef = doc(collection(userDocRef, "shopcart"), sellerId);

      // Lấy dữ liệu giỏ hàng
      const shopcartDoc = await transaction.get(shopcartRef);

      // Đảm bảo luôn có listItem là mảng
      const shopcartData = shopcartDoc.exists() ? shopcartDoc.data() : {};
      const listItem = shopcartData.listItem || [];

      const itemIndex = listItem.findIndex(
        (item) => item.productId === productId
      );

      if (itemIndex === -1) {
        throw new HttpError(404, "Sản phẩm không tồn tại trong giỏ hàng");
      }

      const updatedListItem = [...listItem];
      updatedListItem[itemIndex] = {
        ...updatedListItem[itemIndex],
        isCheck: false,
      };
      transaction.set(
        shopcartRef,
        { listItem: updatedListItem },
        { merge: true }
      );

      return {};
    });
    return res.status(200).json({
      message: "Cập nhật sản phẩm của giỏ hàng thành công",
      ...result,
    });
  } catch (e) {
    if (error instanceof HttpError) {
      return res.status(error.status).json(error.toJSON());
    }

    // Xử lý các lỗi khác
    console.error("Error checkboxProduct in shopcart:", error);
    return res.status(500).json({
      message: error.message || "Đã xảy ra lỗi",
    });
  }
};

const checkboxProduct = async (req, res) => {
  const db = getFirestoreDb();
  const { sellerId, postId, productId, quantity, currentPrice } = req.body;
  const userId = req.params.id;

  try {
    const result = await runTransaction(db, async (transaction) => {
      const userDocRef = doc(db, "users", userId);
      const shopcartRef = doc(collection(userDocRef, "shopcart"), sellerId);

      // Lấy dữ liệu giỏ hàng
      const shopcartDoc = await transaction.get(shopcartRef);

      // Đảm bảo luôn có listItem là mảng
      const shopcartData = shopcartDoc.exists() ? shopcartDoc.data() : {};
      const listItem = shopcartData.listItem || [];

      const itemIndex = listItem.findIndex(
        (item) => item.productId === productId
      );

      // Kiểm tra sản phẩm có trong giỏ hàng không
      if (itemIndex === -1) {
        throw new HttpError(404, "Sản phẩm không tồn tại trong giỏ hàng");
      }

      // Lấy dữ liệu bài viết và sản phẩm
      const postRef = doc(db, "posts", postId);
      const productRef = doc(postRef, "products", productId);

      const [postDoc, productDoc] = await Promise.all([
        transaction.get(postRef),
        transaction.get(productRef),
      ]);

      // Kiểm tra bài viết tồn tại
      if (!postDoc.exists()) {
        const updatedListItem = [...listItem];
        updatedListItem[itemIndex] = {
          ...updatedListItem[itemIndex],
          isCheck: true,
        };
        transaction.set(
          shopcartRef,
          { listItem: updatedListItem },
          { merge: true }
        );
        throw new HttpError(404, "Bài viết không xác định");
      }

      // Kiểm tra sản phẩm tồn tại
      if (!productDoc.exists()) {
        const updatedListItem = [...listItem];
        updatedListItem[itemIndex] = {
          ...updatedListItem[itemIndex],
          isCheck: true,
        };
        transaction.set(
          shopcartRef,
          { listItem: updatedListItem },
          { merge: true }
        );
        throw new HttpError(
          404,
          "Sản phẩm không xác định, có thể bài viết đã bị ẩn"
        );
      }

      const postData = postDoc.data();
      const productData = productDoc.data();

      // Kiểm tra thay đổi giá
      if (productData.price !== currentPrice) {
        const updatedListItem = [...listItem];
        updatedListItem[itemIndex] = {
          ...updatedListItem[itemIndex],
          isCheck: true,
        };
        transaction.set(
          shopcartRef,
          { listItem: updatedListItem },
          { merge: true }
        );
        throw new HttpError(200, "Giá sản phẩm đã thay đổi", {
          price: productData.price,
        });
      }

      // Kiểm tra số lượng
      if (productData.quantity < quantity) {
        const updatedListItem = [...listItem];
        updatedListItem[itemIndex] = {
          ...updatedListItem[itemIndex],
          isCheck: true,
        };
        transaction.set(
          shopcartRef,
          { listItem: updatedListItem },
          { merge: true }
        );
        return {
          status: 200,
          message: `Kho sản phẩm đã thay đổi, chỉ còn ${productData.quantity}`,
          quantity: productData.quantity,
          listItem: updatedListItem,
        };
      }

      // Lấy thông tin chủ sở hữu
      const ownerDoc = await transaction.get(
        doc(db, "users", postData.owner.id)
      );
      const ownerData = ownerDoc.data();

      // Cập nhật trạng thái checked
      const updatedListItem = [...listItem];
      updatedListItem[itemIndex] = {
        ...updatedListItem[itemIndex],
        isCheck: true,
      };
      transaction.set(
        shopcartRef,
        { listItem: updatedListItem },
        { merge: true }
      );

      return {
        postTitle: postData.title,
        images: productData.image,
        name: productData.name,
        user: ownerData.username,
      };
    });

    return res.status(200).json({
      message: "Cập nhật sản phẩm của giỏ hàng thành công",
      ...result,
    });
  } catch (error) {
    // Xử lý HttpError
    if (error instanceof HttpError) {
      return res.status(error.status).json(error.toJSON().message);
    }

    // Xử lý các lỗi khác
    console.error("Error checkboxProduct in shopcart:", error);
    return res.status(500).json({
      message: error.message || "Đã xảy ra lỗi",
    });
  }
};

// Custom Error Class
class HttpError extends Error {
  constructor(status, message, data = {}) {
    super(message);
    this.status = status;
    this.data = data;
  }

  toJSON() {
    return {
      message: this.message,
      ...this.data,
    };
  }
}

const updateShopCart = async (req, res) => {
  const db = getFirestoreDb();
  const userId = req.params.id;
  try {
    const {
      sellerId,
      postId,
      productIdBefore,
      productIdAfter,
      quantity,
      isCheck,
    } = req.body;

    // Reference to user's shopcart collection
    const userDocRef = doc(db, "users", userId);
    const shopcartRef = doc(collection(userDocRef, "shopcart"), sellerId);

    // Lấy dữ liệu giỏ hàng
    const shopcartDoc = await getDoc(shopcartRef);

    const shopcartData = shopcartDoc.exists() ? shopcartDoc.data() : {};
    const listItem = shopcartData.listItem || [];

    const beforeIndex = listItem.findIndex(
      (item) => item.productId === productIdBefore
    );
    console.log("beforeIndex: " + beforeIndex);
    if (beforeIndex === -1) {
      console.log("case 0", productIdBefore, shopcartData);
      return res.status(400).json({
        message: "Product not found",
        productIdBefore: productIdBefore,
      });
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
      console.log("case 2 ", productIdBefore, productIdAfter, quantity);
      afterIndex = listItem.findIndex(
        (item) => item.productId === productIdAfter
      );
      console.log("afterIndex ", afterIndex);

      if (afterIndex !== -1) {
        // Merge quantities and remove old item
        listItem[afterIndex].quantity += listItem[beforeIndex].quantity;
        listItem[afterIndex].updatedAt = Timestamp.now();
        listItem.splice(beforeIndex, 1);
        afterIndex = afterIndex - 1;
      } else {
        // Just update the productId
        listItem[beforeIndex].productId = productIdAfter;
        listItem[beforeIndex].quantity = quantity;
        listItem[beforeIndex].updatedAt = Timestamp.now();
      }
    }

    await setDoc(shopcartRef, { listItem }, { merge: true });

    // Check maximum quantity
    const postDocRef = doc(db, "posts", postId);
    const productRef = doc(collection(postDocRef, "products"), productIdAfter);
    const maxQuantityDoc = await getDoc(productRef);

    if (!maxQuantityDoc.exists()) {
      console.log("case 3", maxQuantityDoc.data());
      return res
        .status(404)
        .json({ message: "Sản phẩm không xác định trong bài đăng" });
    }

    const maxQuantityData = maxQuantityDoc.data();

    if (
      afterIndex >= 0 &&
      maxQuantityData.quantity < listItem[afterIndex].quantity
    ) {
      console.log("case 4");
      listItem[afterIndex].quantity = maxQuantityData.quantity;
      await setDoc(shopcartRef, { listItem }, { merge: true });
      return res.status(401).json({ message: "Đã đạt số lượng tối đa" });
    }

    await setDoc(shopcartRef, { listItem }, { merge: true });
    return res.status(200).json({ message: "Cập nhật giỏ hàng thành công" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(400).json({ message: error.message });
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
  checkboxProduct,
  setProductNotCheck,
};
