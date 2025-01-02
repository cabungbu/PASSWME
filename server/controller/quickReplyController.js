const { getFirestoreDb } = require("../config/firebase");
const {
  collection,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  serverTimestamp,
  increment,
  writeBatch,
  orderBy,
} = require("firebase/firestore");
const QuickReply = require("../model/quickReply");

const getQuickReplies = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  try {
    const quickRepliesRef = collection(firestoreDb, "quickReplies");
    const snapshot = await getDocs(quickRepliesRef);
    const quickReplies = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(200).json(quickReplies.sort((a, b) => a.order - b.order));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getQuickReplies,
};
