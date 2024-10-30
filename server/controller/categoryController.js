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

const CategoryController = {
  // Thêm một danh mục mới
  addCategory: async (req, res) => {
    const firestoreDb = getFirestoreDb();
    const data = req.body;
    
    const newCategoryData = { 
      nameOfCategory: data.nameOfCategory,
      quantityOfPost: 0, // Khởi tạo quantityOfPost bằng 0
    };

    try {
        // Tạo danh mục mới
        const newCategoryRef = await addDoc(collection(firestoreDb, "categories"), newCategoryData);
  
        // Tạo subcollection 'posts' cho danh mục mới
        const postsCollectionRef = collection(newCategoryRef, "posts");
  
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
      const categories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

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

      res.status(200).json({ id: categoryId, ...categoryDoc.data() });
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