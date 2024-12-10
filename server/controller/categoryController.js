const { getFirestoreDb } = require("../config/firebase.js");
const {
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
} = require("firebase/firestore");

const fetchBatchReferences = async (refs) => {
  // Loại bỏ references trùng lặp để tối ưu
  const uniqueRefs = [...new Set(refs)];

  const docMap = new Map();
  await Promise.all(
    uniqueRefs.map(async (ref) => {
      const doc = await getDoc(ref);
      if (doc.exists()) {
        docMap.set(ref.path, doc);
      }
    })
  );

  // Ánh xạ lại các documents ban đầu
  return refs.map((ref) => docMap.get(ref.path) || null);
};

const CategoryController = {
  // Thêm một danh mục mới
  addCategory: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const data = req.body;

    const newCategoryData = {
      nameOfCategory: data.nameOfCategory,
      quantityOfPost: 0,
      posts: [], // Khởi tạo quantityOfPost bằng 0
    };

    try {
      // Tạo danh mục mới
      const newCategoryRef = await addDoc(
        collection(firestoreDb, "categories"),
        newCategoryData
      );

      // Tạo subcollection 'posts' cho danh mục mới
      // const postsCollectionRef = collection(newCategoryRef, "posts");

      res.status(201).json({
        message: "Category added successfully.",
        categoryId: newCategoryRef.id,
      });
    } catch (error) {
      console.error("Error adding category:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Lấy tất cả danh mục
  getAllCategories: async (req, res) => {
    const firestoreDb = getFirestoreDb();

    try {
      const snapshot = await getDocs(collection(firestoreDb, "categories"));
      const categories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Lấy danh mục theo ID
  getCategoryById: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const categoryId = req.params.id;

    try {
      const categoryDocRef = doc(firestoreDb, "categories", categoryId);
      const categoryDoc = await getDoc(categoryDocRef);

      if (!categoryDoc.exists()) {
        return res.status(404).json({ error: "Category not found" });
      }

      let validPosts = [];
      const postRefs = categoryDoc.data().posts;

      if (postRefs.length > 0) {
        // Batch read posts
        const postDocs = await fetchBatchReferences(postRefs);

        // Batch read owners
        const ownerRefs = postDocs
          .filter((postDoc) => postDoc?.exists())
          .map((postDoc) => postDoc.data().owner);
        const ownerDocs = await fetchBatchReferences(ownerRefs);

        // Batch read categories
        const categoryRefs = postDocs
          .filter((postDoc) => postDoc?.exists())
          .map((postDoc) => postDoc.data().category);
        const categoryDocs = await fetchBatchReferences(categoryRefs);

        // Batch read products for each post
        const postsWithDetails = await Promise.all(
          postDocs
            .filter((postDoc) => postDoc?.exists())
            .map(async (postDoc, index) => {
              // Batch read products for this post
              const productsSnapshot = await getDocs(
                collection(postDoc.ref, "products")
              );

              const products = productsSnapshot.docs.map((productDoc) => ({
                id: productDoc.id,
                ...productDoc.data(),
              }));

              const { owner, category, feedbacks, ...rest } = postDoc.data();

              return {
                id: postDoc.id,
                ...rest,
                products: products,
                owner: ownerDocs[index]?.exists()
                  ? {
                      id: ownerDocs[index].id,
                      address: ownerDocs[index].data().address,
                    }
                  : null,
                category: categoryDocs[index]?.exists()
                  ? { id: categoryDocs[index].id }
                  : null,
              };
            })
        );

        validPosts = postsWithDetails;
      }

      res.status(200).json({
        id: categoryId,
        nameOfCategory: categoryDoc.data().nameOfCategory,
        quantityOfPost: categoryDoc.data().quantityOfPost,
        posts: validPosts,
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Cập nhật danh mục
  updateCategory: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const categoryId = req.params.id;
    const updateData = req.body;

    try {
      const categoryDocRef = doc(firestoreDb, "categories", categoryId);
      const categorySnapshot = await getDoc(categoryDocRef);

      if (!categorySnapshot.exists()) {
        return res.status(404).json({ error: "Category not found" });
      }

      await updateDoc(categoryDocRef, updateData);
      res.status(200).json({ message: "Category updated successfully." });
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Xóa danh mục
  deleteCategory: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const categoryId = req.params.id;

    try {
      const categoryDocRef = doc(firestoreDb, "categories", categoryId);
      const categorySnapshot = await getDoc(categoryDocRef);

      if (!categorySnapshot.exists()) {
        return res.status(404).json({ error: "Category not found" });
      }

      const batch = writeBatch(firestoreDb);
      batch.delete(categoryDocRef);

      // Xóa tất cả các bài đăng trong danh mục
      const postsCollection = collection(categoryDocRef, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      postsSnapshot.docs.forEach((postDoc) => {
        batch.delete(doc(postsCollection, postDoc.id));
      });

      await batch.commit();
      res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = CategoryController;
