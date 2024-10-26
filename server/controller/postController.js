const { getFirestoreDb } = require("../config/firebase.js");
const {
  collection,
  addDoc,
  increment,
  getDoc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
} = require("firebase/firestore");
const post = require("../model/post.js");
const product = require("../model/productOfPost.js");
// Thêm Post mới
// const addPost = async (req, res) => {
//   const firestoreDb = getFirestoreDb();
//   const data = req.body;

//   try {
//     // Tạo ID mới cho post
//     const newPostId = doc(collection(firestoreDb, "post")).id;

//     // Tạo đối tượng Post
// const newPost = new post({
//   title: data.title,
//   category: data.category,
//   image: data.image,
//   status: data.status,
//   description: data.description,
//   service: data.service,
//   start: data.start,
//   end: data.end,
//   owner: data.owner,
//   oldNew: data.oldNew,
//   soldQuantity: data.soldQuantity || 0,
// });

//     // Lưu Post vào collection "post" với ID đã tạo
//     const postDocRef = doc(firestoreDb, "post", newPostId);
//     await setDoc(postDocRef, newPost.toPlainObject());

//     // Lưu Post vào collection category với cùng ID data.category
//     const categoryRef = doc(firestoreDb, "category", data.category);
//     const categoryDoc = await getDoc(categoryRef);

//     // Kiểm tra và lưu products nếu có
//     if (data.products && Array.isArray(data.products)) {
//       const productCollection = collection(postDocRef, "product");

//       // Lưu từng sản phẩm vào subcollection Product
//       for (const productData of data.products) {
//         const newProduct = new product(
//           productData.name,
//           productData.price,
//           productData.quantity,
//           productData.image
//         );

//         // Tạo ID mới cho mỗi product
//         const newProductId = doc(productCollection).id;

//         // Lưu product với cùng ID trong cả hai nơi
//         await setDoc(
//           doc(productCollection, newProductId),
//           newProduct.toPlainObject()
//         );
//         const categoryPostRef = doc(
//           firestoreDb,
//           `category/${data.category}/post`,
//           newPostId
//         );
//         await setDoc(categoryPostRef, newPost.toPlainObject());
//         await updateDoc(categoryRef, {
//           quantityOfPost: increment(1),
//         });
//         const categoryPostProductRef = doc(
//           firestoreDb,
//           `category/${data.category}/post/${newPostId}/product`,
//           newProductId
//         );
//         await setDoc(categoryPostProductRef, productData);

//         const userRef = doc(firestoreDb, "user", data.owner);
//         const userDoc = await getDoc(userRef);
//         if (!userDoc.exists()) {
//           return res.status(404).json({ error: "User not found" });
//         }
//       }
//     }

//     res.status(200).json({
//       message: "Post added successfully.",
//       postId: newPostId,
//     });
//   } catch (error) {
//     console.error("Error adding post:", error);
//     res.status(400).json({ error: error.message });
//   }
// };
const addPost = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const data = req.body;

  try {
    const newPostId = doc(collection(firestoreDb, "post")).id;
    const newPost = new post({
      title: data.title,
      category: data.category,
      image: data.image,
      status: data.status,
      description: data.description,
      service: data.service,
      start: data.start,
      end: data.end,
      owner: data.owner,
      oldNew: data.oldNew,
      soldQuantity: data.soldQuantity || 0,
    });
    const postDocRef = doc(firestoreDb, "post", newPostId);

    const batch = writeBatch(firestoreDb);
    batch.set(postDocRef, newPost.toPlainObject());

    const categoryRef = doc(firestoreDb, "category", data.category);
    const userRef = doc(firestoreDb, "user", data.owner);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    if (data.products && Array.isArray(data.products)) {
      const productCollection = collection(postDocRef, "product");

      const productPromises = data.products.map(async (productData) => {
        const newProduct = new product(
          productData.name,
          productData.price,
          productData.quantity,
          productData.image
        );
        const newProductId = doc(productCollection).id;

        batch.set(
          doc(productCollection, newProductId),
          newProduct.toPlainObject()
        );
        batch.set(
          doc(
            firestoreDb,
            `category/${data.category}/post/${newPostId}/product`,
            newProductId
          ),
          productData
        );
      });

      await Promise.all(productPromises);
    }

    batch.set(
      doc(firestoreDb, `category/${data.category}/post`, newPostId),
      newPost.toPlainObject()
    );
    batch.update(categoryRef, { quantityOfPost: increment(1) });

    await batch.commit();

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
    const postDocRef = doc(firestoreDb, "post", postId);
    const postSnapshot = await getDoc(postDocRef);

    if (!postSnapshot.exists()) {
      return res.status(404).json({ error: "Post not found" });
    }

    const currentData = postSnapshot.data();
    const mergedData = {
      ...currentData,
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    const batch = writeBatch(firestoreDb);
    batch.update(postDocRef, mergedData);

    const categoryDocRef = doc(
      firestoreDb,
      "category",
      currentData.category,
      "post",
      postId
    );
    batch.update(categoryDocRef, mergedData);

    await batch.commit();

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
  const postId = req.params.id;

  try {
    const postDocRef = doc(firestoreDb, "post", postId);
    const postSnapshot = await getDoc(postDocRef);

    if (!postSnapshot.exists()) {
      return res.status(404).json({ error: "Post not found" });
    }

    const currentData = postSnapshot.data();
    const categoryDocRef = doc(
      firestoreDb,
      "category",
      currentData.category,
      "post",
      postId
    );

    const batch = writeBatch(firestoreDb);
    batch.delete(postDocRef);
    batch.delete(categoryDocRef);

    await batch.commit();

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
