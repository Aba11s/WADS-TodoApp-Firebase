import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDQTS7z3ePENiVfEHNyL-9XU2m1wGJcu8",
  authDomain: "todoapp-6a331.firebaseapp.com",
  projectId: "todoapp-6a331",
  storageBucket: "todoapp-6a331.firebasestorage.app",
  messagingSenderId: "759885193140",
  appId: "1:759885193140:web:a0d3428c9d79eafc4e5ce1",
  measurementId: "G-XNM0ZN0TND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {db, auth, googleProvider}