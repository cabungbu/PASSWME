const { getFirestoreDb } = require("../config/firebase.js");
const {
  collection,
  addDoc,
  getDoc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} = require("firebase/firestore");
const post = require("../model/post.js");
const product = require("../model/productOfPost.js");
// Thêm Post mới
const addPost = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const data = req.body;

  try {
    // Tạo ID mới cho post
    const newPostId = doc(collection(firestoreDb, "post")).id;

    // Tạo đối tượng Post
    const newPost = new post({
      title: data.title,
      category: data.category,
      image: data.image,
      status: data.status,
      price: data.price,
      description: data.description,
      service: data.service,
      start: data.start,
      end: data.end,
      owner: data.owner,
      oldNew: data.oldNew,
      soldQuantity: data.soldQuantity || 0,
    });

    // Lưu Post vào collection "post" với ID đã tạo
    const postDocRef = doc(firestoreDb, "post", newPostId);
    await setDoc(postDocRef, newPost.toPlainObject());

    // Lưu Post vào collection category với cùng ID
    const categoryDocRef = doc(firestoreDb, data.category, newPostId);
    await setDoc(categoryDocRef, newPost.toPlainObject());

    // Kiểm tra và lưu products nếu có
    if (data.products && Array.isArray(data.products)) {
      const productCollection = collection(postDocRef, "product");
      const productCategoryCollection = collection(categoryDocRef, "product");

      // Lưu từng sản phẩm vào subcollection Product
      for (const productData of data.products) {
        const newProduct = new product(
          productData.name,
          productData.price,
          productData.quantity,
          productData.image
        );

        // Tạo ID mới cho mỗi product
        const newProductId = doc(productCollection).id;

        // Lưu product với cùng ID trong cả hai nơi
        await setDoc(
          doc(productCollection, newProductId),
          newProduct.toPlainObject()
        );
        await setDoc(
          doc(productCategoryCollection, newProductId),
          newProduct.toPlainObject()
        );

        const userRef = doc(firestoreDb, "user", userId);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          return res.status(404).json({ error: "User not found" });
        }
        const currentSold = userDoc.data().sold || [];

        // Kiểm tra nếu postId đã tồn tại trong mảng likes
        if (currentSold.includes(newPostId)) {
          return res.status(400).json({ error: "Post already added" });
        }
        await updateDoc(userRef, {
          sold: [newPostId, ...currentSold],
        });
      }
    }

    res.status(200).json({
      message: "Post added successfully.",
      postId: newPostId,
    });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(400).json({ error: error.message });
  }
};
const getAllPost = async (req, res) => {
  const firestoreDb = getFirestoreDb();

  try {
    const postCollection = collection(firestoreDb, "post");
    const snapshot = await getDocs(postCollection);
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(400).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const postId = req.params.id;

  try {
    // Lấy thông tin post
    const postDocRef = doc(firestoreDb, "post", postId);
    const postDoc = await getDoc(postDocRef);

    if (!postDoc.exists()) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Lấy subcollection products
    const productsRef = collection(postDocRef, "product");
    const productsSnapshot = await getDocs(productsRef);

    // Chuyển đổi products data
    const products = [];
    productsSnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Kết hợp thông tin post và products
    const postData = {
      id: postId,
      ...postDoc.data(),
      products: products,
    };

    res.status(200).json(postData);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(400).json({ error: error.message });
  }
};
const updatePost = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const postId = req.params.id;
  const updateData = req.body;

  try {
    // Lấy reference đến document
    const postDocRef = doc(firestoreDb, "post", postId);
    // Đọc dữ liệu hiện tại
    const postSnapshot = await getDoc(postDocRef);

    if (!postSnapshot.exists()) {
      return res.status(404).json({ error: "Post not found" });
    }

    const currentData = postSnapshot.data();

    // Merge dữ liệu cũ với dữ liệu mới
    const mergedData = {
      ...currentData,
      ...updateData,
      // Thêm updatedAt nếu bạn muốn theo dõi thời gian cập nhật
      updatedAt: new Date().toISOString(),
    };

    // Cập nhật trong collection post
    await updateDoc(postDocRef, mergedData);

    // Cập nhật trong collection category tương ứng
    const categoryDocRef = doc(firestoreDb, currentData.category, postId);
    await updateDoc(categoryDocRef, mergedData);

    res.status(200).json({
      message: "Post updated successfully.",
      updatedData: mergedData,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const postId = req.params.id; // Lấy ID từ URL params

  try {
    const postDocRef = doc(firestoreDb, "post", postId);
    await deleteDoc(postDocRef); // Xóa document

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(400).json({ error: error.message });
  }
};
const getPostByCategory = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const category = req.body.category; // Lấy danh mục từ URL params

  try {
    const postCollection = collection(firestoreDb, category);

    const snapshot = await getDocs(postCollection);
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found for this category." });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  addPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
  getPostByCategory,
};
