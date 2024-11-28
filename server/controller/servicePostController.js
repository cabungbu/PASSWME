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
  Timestamp,
} = require("firebase/firestore");

const addServicePost = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const data = req.body;
  try {
    // Tạo reference cho post mới
    const postDocRef = doc(firestoreDb, "servicePosts", data.postId);
    const batch = writeBatch(firestoreDb);
    const newServicePost = {
      postRef: doc(firestoreDb, "posts", data.postId),
      start: Timestamp.fromDate(new Date()),
      status: true,
    };
    await setDoc(postDocRef, newServicePost);

    // setTimeout(async () => {
    //   await updateDoc(postDocRef, { status: false });
    //   console.log(
    //     `Service post ${data.postId} status updated to false after 24 hours.`
    //   );
    // }, 24 * 60 * 60 * 1000);
    setTimeout(async () => {
      await deleteDoc(postDocRef);
      console.log(`Service post ${data.postId} deleted after 48 hours.`);
    }, 48 * 60 * 60 * 1000); // 48 hours in milliseconds

    res.status(201).json({
      message: "Service post added successfully",
      postId: data.postId,
    });
  } catch (error) {
    console.error("Error adding service post: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllServicePosts = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  try {
    const servicePostCollection = collection(firestoreDb, "servicePosts");
    const snapshot = await getDocs(servicePostCollection);

    const servicePosts = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const postData = doc.data();
        if (!postData.postRef) {
          console.error("postRef is undefined for document:", doc.id);
        }
        const postDoc = await getDoc(postData.postRef);

        const productsCollection = collection(postDoc.ref, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const products = productsSnapshot.docs.map((productDoc) => ({
          id: productDoc.id,
          ...productDoc.data(),
        }));

        return {
          id: doc.id,
          post: { id: postDoc.id, ...postDoc.data(), products: products },
        };
      })
    );
    res.status(200).json(servicePosts);
  } catch (err) {
    console.error("Error getting service posts: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateServicePostStatus = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const { postId, status } = req.body;
  try {
    const postDocRef = doc(firestoreDb, "servicePosts", postId);
    await updateDoc(postDocRef, { status });
    res
      .status(200)
      .json({ message: "Service post status updated successfully" });
  } catch (error) {
    console.error("Error updating service post status: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteServicePost = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const { postId } = req.params;
  try {
    const postDocRef = doc(firestoreDb, "servicePosts", postId);
    await deleteDoc(postDocRef);
    res.status(200).json({ message: "Service post deleted successfully" });
  } catch (error) {
    console.error("Error deleting service post: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addServicePost,
  getAllServicePosts,
  updateServicePostStatus,
  deleteServicePost,
};
