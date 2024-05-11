// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3v7YNxxHFbnbXh068bsa8uUmnG3fWQdY",
  authDomain: "lost-temple-ba3da.firebaseapp.com",
  projectId: "lost-temple-ba3da",
  storageBucket: "lost-temple-ba3da.appspot.com",
  messagingSenderId: "150965735412",
  appId: "1:150965735412:web:baf8a2e4b830cdb779f3a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };