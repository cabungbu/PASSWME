
import Config from 'react-native-config';


const firebaseConfig = {
  apiKey: Config.apiKey,
  authDomain: Config.authDomain,
  databaseURL: Config.databaseURL,
  projectId: Config.projectId,
  storageBucket: Config.storageBucket,
  messagingSenderId: Config.messagingSenderId,
  appId: Config.appId,
  measurementId: Config.measurementId
};

export { firebaseConfig };