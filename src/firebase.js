import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGSs3EWvxbCSIeNYYTIyNiZEERILnD_0s",
  authDomain: "netflix-nemo-clone.firebaseapp.com",
  projectId: "netflix-nemo-clone",
  storageBucket: "netflix-nemo-clone.appspot.com",
  messagingSenderId: "255999220369",
  appId: "1:255999220369:web:37170f76da90b1dda0bd30",
  measurementId: "G-5JD7F3VCP7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
