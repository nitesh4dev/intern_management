import firebase from "firebase/compat";

/* Link the react app with firebase using the following code, the apiKey and other data are like an access key, without which the app cannot access the firebase app.*/
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDzCtX04sc96P0lK52IEFKtoFr_WM3Jfkw",
  authDomain: "resoluteai-internships.firebaseapp.com",
  projectId: "resoluteai-internships",
  storageBucket: "resoluteai-internships.appspot.com",
  messagingSenderId: "376446193137",
  appId: "1:376446193137:web:a983509f1e536b70440850",
  measurementId: "G-ZL42DHVKQ9",
});

/* 

db: exposes various method and data related to firestore
auth: exposes authentication methods like signup and login and logout
storage: expose storage functionality to store, files like resume, user profile etc.

*/
const db = firebaseApp.firestore();
const rdb = firebaseApp.database();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage().ref();

export { db, rdb, auth, storage };
