
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import dotenv from 'dotenv';

dotenv.config();


const firebaseConfig = {
  // Các thông tin cấu hình Firebase khác
  storageBucket: process.env.storageBucket,
};

firebase.initializeApp(firebaseConfig);

export { firebase };