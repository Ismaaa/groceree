import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// init
firebase.initializeApp(firebaseConfig);

// shorthands
const db = firebase.firestore();

export const createGroceryList = (userName) => {
  return db.collection("groceryLists").add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    users: [{ name: userName }],
  });
};
