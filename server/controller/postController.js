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
  arrayUnion,
} = require("firebase/firestore");
const post = require("../model/post.js");
const product = require("../model/productOfPost.js");

const addPost = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const data = req.body;

  try {
    // Tạo ID mới cho post
    const newPostId = doc(collection(firestoreDb, "posts")).id;

    // Tạo reference cho post mới
    const postDocRef = doc(firestoreDb, "posts", newPostId);

    // Tạo object post mới
    const newPost = new post({
      title: data.title,
      category: doc(firestoreDb, "categories", data.category), // Lưu reference tới category
      images: data.images,
      video: data.video,
      status: data.status,
      description: data.description,
      service: data.service,
      start: data.start || new Date.now(),
      time: new Date().toLocaleTimeString(),
      owner: doc(firestoreDb, "users", data.owner), // Lưu reference tới owner
      condition: data.condition,
      address: data.address,
      soldQuantity: data.soldQuantity || 0,
      feedbacks: [],
      rating: data.rating || 0,
    });

    // Khởi tạo batch write
    const batch = writeBatch(firestoreDb);

    // Set dữ liệu cho post mới
    batch.set(postDocRef, newPost.toPlainObject());

    // Lấy reference của category và user
    const categoryRef = doc(firestoreDb, "categories", data.category);
    const userRef = doc(firestoreDb, "users", data.owner);

    // Kiểm tra user có tồn tại
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    if (data.products && Array.isArray(data.products)) {
      const productCollection = collection(postDocRef, "products");
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
      });
      await Promise.all(productPromises);
    }

    // Thêm reference của post vào category
    batch.update(categoryRef, {
      posts: arrayUnion(postDocRef), // Thêm reference thay vì ID
      quantityOfPost: increment(1),
    });

    batch.update(userRef, {
      posts: arrayUnion(postDocRef), // Thêm reference thay vì ID
    });

    // Thực hiện batch write

    const categoryDoc = await getDoc(categoryRef);
    if (!categoryDoc.exists()) {
      return res.status(404).json({ error: "Category not found" });
    }

    const categoryAllRef = doc(
      firestoreDb,
      "categories",
      "26tBjcXpgwcYT5y9V4g1"
    );
    const categoryAllDoc = await getDoc(categoryAllRef);
    batch.update(categoryAllRef, {
      posts: arrayUnion(postDocRef), // Thêm reference thay vì ID
      quantityOfPost: increment(1),
    });

    await batch.commit();
    res.status(200).json({
      message: "Post added successfully.",
      post: {
        id: newPostId,
        ...newPost,
      },
      category: {
        id: data.category,
        ...categoryDoc.data(),
      },
    });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(400).json({ error: error.message });
  }
};

const getAllPost = async (req, res) => {
  const firestoreDb = getFirestoreDb();

  try {
    const snapshot = await getDocs(collection(firestoreDb, "posts"));
    const posts = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const postData = doc.data();

        // Fetch category data
        const categoryDoc = await getDoc(postData.category);
        const categoryData = categoryDoc.data();

        // Fetch owner data with only required fields
        const ownerDoc = await getDoc(postData.owner);
        const ownerData = ownerDoc.data();

        // Return post with filtered owner data
        return {
          id: doc.id,
          ...postData,
          category: { id: categoryDoc.id, ...categoryData },
          owner: {
            id: ownerDoc.id,
            username: ownerData.username,
            phone: ownerData.phone,
            address: ownerData.address,
            avatar: ownerData.avatar,
            followers: ownerData.followers,
            posts: ownerData.posts,
            following: ownerData.following,
          },
        };
      })
    );

    return res.status(200).json(posts);
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
    const postDocRef = doc(firestoreDb, "posts", postId);
    const postDoc = await getDoc(postDocRef);

    if (!postDoc.exists()) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin bài đăng" });
    }

    // Lấy subcollection products
    const productsRef = collection(postDocRef, "products");
    const productsSnapshot = await getDocs(productsRef);

    // Chuyển đổi products data
    const products = [];
    productsSnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Fetch seller data
    const categoryDoc = await getDoc(postDoc.data().category);
    const catagoryData = categoryDoc.data();

    // Fetch seller data
    const ownerDoc = await getDoc(postDoc.data().owner);
    const ownerData = ownerDoc.data();

    const feedbacksData = [];
    if (
      postDoc &&
      Array.isArray(postDoc.feedbacks) &&
      postDoc.feedbacks.length > 0
    ) {
      feedbacksData = await Promise.all(
        postDoc.feedbacks.map(async (feedbackId) => {
          const feedbackDoc = await getDoc(feedbackId);
          return { id: feedbackDoc.id, ...feedbackDoc.data() };
        })
      );
    }

    return res.status(200).json({
      id: postId,
      ...postDoc.data(),
      products: products,
      feedback: feedbacksData,
      category: { id: categoryDoc.id, ...catagoryData },
      owner: { id: ownerDoc.id, ...ownerData },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(400).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const postId = req.params.id;
  const data = req.body;

  try {
    // Get reference to the post document
    const postRef = doc(firestoreDb, "posts", postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      return res.status(404).json({ error: "Post not found" });
    }

    const existingData = postDoc.data();

    // Initialize batch write
    const batch = writeBatch(firestoreDb);

    // Prepare updated post data, explicitly handling each field
    const updatedPost = {
      title: data.title || existingData.title,
      category: doc(
        firestoreDb,
        "categories",
        data.category || existingData.category.id
      ),
      images: data.images || existingData.images,
      video: data.video === null ? null : data.video || existingData.video,
      status: data.status || existingData.status,
      description: data.description || existingData.description,
      service: data.service || existingData.service,
      start: existingData.start, // Keep original start date
      owner: doc(firestoreDb, "users", data.owner || existingData.owner.id),
      condition: data.condition || existingData.condition,
      address: data.address || existingData.address,
      soldQuantity: data.soldQuantity ?? existingData.soldQuantity,
      rating: existingData.rating || 0,
      feedbacks: existingData.feedbacks || [],
    };

    // Update the main post document
    batch.update(postRef, updatedPost);

    // Handle products subcollection update if provided
    if (data.products && Array.isArray(data.products)) {
      // Delete existing products
      const existingProducts = await getDocs(collection(postRef, "products"));
      existingProducts.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Add new products
      const productCollection = collection(postRef, "products");
      const productPromises = data.products.map(async (productData) => {
        const newProduct = new product(
          productData.name,
          Number(productData.price), // Convert price to number
          Number(productData.quantity), // Convert quantity to number
          productData.image
        );
        const newProductId = doc(productCollection).id;
        batch.set(
          doc(productCollection, newProductId),
          newProduct.toPlainObject()
        );
      });
      await Promise.all(productPromises);
    }

    // Commit all changes
    await batch.commit();

    // Fetch updated data for response
    const updatedPostDoc = await getDoc(postRef);
    const updatedProducts = await getDocs(collection(postRef, "products"));

    const productsData = [];
    updatedProducts.forEach((doc) => {
      productsData.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({
      message: "Post updated successfully",
      post: {
        id: postId,
        ...updatedPostDoc.data(),
        products: productsData,
      },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(400).json({ error: error.message });
  }
};

const updatePostStatus = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const postId = req.params.id;
  const newStatus = req.body.status;

  try {
    // Get reference to the post document
    const postRef = doc(firestoreDb, "posts", postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      return res.status(404).json({ error: "Post not found" });
    }

    const batch = writeBatch(firestoreDb);

    batch.update(postRef, { status: newStatus });

    await batch.commit();
    const updatedPostDoc = await getDoc(postRef);

    res.status(200).json({
      message: "Post status updated successfully",
      post: {
        id: postId,
        title: updatedPostDoc.data().title,
        status: updatedPostDoc.data().status,
      },
    });
  } catch (error) {
    console.error("Error updating post status:", error);
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const postId = req.params.id;

  try {
    const postDocRef = doc(firestoreDb, "posts", postId);
    const postSnapshot = await getDoc(postDocRef);

    if (!postSnapshot.exists()) {
      return res.status(404).json({ error: "Post not found" });
    }

    const currentData = postSnapshot.data();
    const categoryDocRef = doc(
      firestoreDb,
      "categories",
      currentData.category,
      "posts",
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

const searchPosts = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const searchQuery = req.query.query?.toLowerCase() || "";

  try {
    // Get all posts
    const snapshot = await getDocs(collection(firestoreDb, "posts"));

    // Filter posts where title matches search query
    const matchingPosts = await Promise.all(
      snapshot.docs
        .filter((doc) => doc.data().title.toLowerCase().includes(searchQuery))
        .map(async (doc) => {
          const postData = doc.data();

          // Fetch category data
          const categoryDoc = await getDoc(postData.category);
          const categoryData = categoryDoc.data();

          // Fetch owner data with only required fields
          const ownerDoc = await getDoc(postData.owner);
          const ownerData = ownerDoc.data();

          // Get products subcollection
          const productsSnapshot = await getDocs(
            collection(doc.ref, "products")
          );
          const products = productsSnapshot.docs.map((productDoc) => ({
            id: productDoc.id,
            ...productDoc.data(),
          }));

          // Return post with filtered owner data and products
          return {
            id: doc.id,
            ...postData,
            products: products,
            category: {
              id: categoryDoc.id,
              ...categoryData,
            },
            owner: {
              id: ownerDoc.id,
              username: ownerData.username,
              phone: ownerData.phone,
              address: ownerData.address,
              avatar: ownerData.avatar,
              followers: ownerData.followers,
              posts: ownerData.posts,
              following: ownerData.following,
            },
          };
        })
    );

    if (matchingPosts.length === 0) {
      return res.status(200).json({
        message: "No posts found matching the search query",
        posts: [],
      });
    }

    return res.status(200).json({
      message: "Posts found successfully",
      posts: matchingPosts,
    });
  } catch (error) {
    console.error("Error searching posts:", error);
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
  searchPosts,
  updatePostStatus
};
