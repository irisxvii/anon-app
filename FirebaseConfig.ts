// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFbnGr1mwM3jJl8At3LBh7gW5eIipMmUw",
  authDomain: "anon-app-3c9f1.firebaseapp.com",
  projectId: "anon-app-3c9f1",
  storageBucket: "anon-app-3c9f1.firebasestorage.app",
  messagingSenderId: "620684574621",
  appId: "1:620684574621:web:7993c49268421810c3b974",
  measurementId: "G-RV7S23XRFT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth };

