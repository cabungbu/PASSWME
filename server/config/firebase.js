const { initializeApp } = require("firebase/app");
//const { getAnalytics } = require("firebase/analytics");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAZH3kD4sdwcL0bF5jq3iklAcCfkyMZ5qk",
  authDomain: "passwme-ec9f7.firebaseapp.com",
  databaseURL:
    "https://passwme-ec9f7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "passwme-ec9f7",
  storageBucket: "passwme-ec9f7.appspot.com",
  messagingSenderId: "872196934858",
  appId: "1:872196934858:web:ba4e42d567a85c50c37833",
  measurementId: "G-6EBCZQFDRC",
};

let app;
let firestoreDb;

const initializeFirebaseApp = () => {
  try {
    app = initializeApp(firebaseConfig);
    firestoreDb = getFirestore();
    //const analytics = getAnalytics(app);
    console.log("Firebase app initialized successfully");
  } catch (error) {
    console.error("Error initializing Firebase app", error);
  }
};

const getFirebaseApp = () => app;
const getFirestoreDb = () => firestoreDb;

const upLoadData = async () => {
  const dataToUpload = {
    key1: "test",
    key2: "123",
    key3: new Date(),
  };
  try {
    const document = doc(firestoreDb, "user", "something");
    let dataUploaded = await setDoc(document, dataToUpload);
    return dataUploaded;
  } catch (error) {
    console.error("Error uploading data to Firestore", error);
  }
};

module.exports = {
  initializeFirebaseApp,
  getFirebaseApp,
  upLoadData,
  getFirestoreDb,
};
