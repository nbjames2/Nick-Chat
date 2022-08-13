import { initializeApp } from "firebase/app";
import {
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref as storageRef,
  set,
} from "firebase/database";


const createData = (postData, path) => {
  const mainRef = getRef(path);
  const newDataRef = push(mainRef);
  set(newDataRef, postData);
};

const getData = async (setData, path) => {
  const mainRef = getRef(path);
  return onValue(mainRef, (snapshot) => {
    if (snapshot.exists()) {
      const dataObject = snapshot.val();
      console.log('Listener ==> ', dataObject);
      const result = [];
      for (const [key, value] of Object.entries(dataObject)) {
        result.push({
          key,
          ...value
        });
      }
      setData(result);
    } else {
      setData([]);
    }
  });
};

const getRef = (path) => {
  const db = getDatabase();
  return storageRef(db, path);
};

const initializeFirebase = () => {
  // Initialize Firebase
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID
  };
  const firebaseApp = initializeApp(config);
  return getDatabase(firebaseApp);
};

const removeListener = (setData, unsubscribe) => {
  unsubscribe();
  setData([]);
}

export {
  createData,
  getData,
  getRef,
  initializeFirebase,
  removeListener
}