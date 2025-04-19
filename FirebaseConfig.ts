// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFbnGr1mwM3jJl8At3LBh7gW5eIipMmUw",
  authDomain: "anon-app-3c9f1.firebaseapp.com",
  projectId: "anon-app-3c9f1",
  storageBucket: "anon-app-3c9f1.firebasestorage.app",
  messagingSenderId: "620684574621",
  appId: "1:620684574621:web:7993c49268421810c3b974"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

