const { getFirestoreDb } = require("../config/firebase.js");
const {
  collection,
  addDoc,
  getDoc,
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
      soldQuantity: data.soldQuantity || 0, // Giá trị mặc định
    });

    // Lưu Post vào Firestore
    const postCollection = collection(firestoreDb, "post");
    const postDocRef = await addDoc(postCollection, newPost.toPlainObject());

    const categoryCollection = collection(firestoreDb, data.category);
    const categoryDocRef = await addDoc(
      categoryCollection,
      newPost.toPlainObject()
    );

    // Kiểm tra xem có sản phẩm nào không
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

        await addDoc(productCollection, newProduct.toPlainObject());
        await addDoc(productCategoryCollection, newProduct.toPlainObject());
      }
    }

    res.status(200).json({
      message: "Post added successfully.",
      postId: postDocRef.id,
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
  const postId = req.params.id; // Lấy ID từ URL params

  try {
    const postDocRef = doc(firestoreDb, "post", postId);
    const postDoc = await getDoc(postDocRef);

    if (!postDoc.exists()) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ id: postId, ...postDoc.data() });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(400).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const postId = req.params.id; // Lấy ID từ URL params
  const data = req.body;

  try {
    const postDocRef = doc(firestoreDb, "post", postId);
    await updateDoc(postDocRef, data); // Cập nhật dữ liệu

    res.status(200).json({ message: "Post updated successfully." });
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
