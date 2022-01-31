import firebase from "firebase/compat";
import moment from "moment";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDzCtX04sc96P0lK52IEFKtoFr_WM3Jfkw",
  authDomain: "resoluteai-internships.firebaseapp.com",
  projectId: "resoluteai-internships",
  storageBucket: "resoluteai-internships.appspot.com",
  messagingSenderId: "376446193137",
  appId: "1:376446193137:web:a983509f1e536b70440850",
  measurementId: "G-ZL42DHVKQ9",
});

const db = firebaseApp.firestore();
const rdb = firebaseApp.database();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage().ref();

export { db, rdb, auth, storage };
