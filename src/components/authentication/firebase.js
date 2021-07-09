import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage';

const Firebase = firebase.initializeApp({
  apiKey: "FIREBASES_API_KEY",
  authDomain: "FIREBASES_DOMAIN",
  projectId: "FIREBASES_PROJECT_ID",
  storageBucket: "FIREBASES_STORAGE_KEY",
  messagingSenderId: "FIREBASES_SENDER_NUMBER",
  appId: "FIREBASES_APP_NAME"
})

// export const Firestore = Firebase.firestore()
export const Firestore = {
  auth_users: Firebase.firestore().collection("auth_users"),
  feed_posts: Firebase.firestore().collection("feed_posts"),
  payment_data: Firebase.firestore().collection("payment_data"),
  notifications: Firebase.firestore().collection("notifications"),
  serverTime: firebase.firestore.FieldValue.serverTimestamp,
}
export const Storage = Firebase.storage()

export default Firebase
