// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY4n-mTXjjrq-Eq0hYQoJ1IO2q13e-0bc",
  authDomain: "wellezyprueba.firebaseapp.com",
  projectId: "wellezyprueba",
  storageBucket: "wellezyprueba.firebasestorage.app",
  messagingSenderId: "455801379632",
  appId: "1:455801379632:web:70f6275e6b4ed6d8dd86f5",
  measurementId: "G-CXZJEFZF52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, GoogleAuthProvider, signInWithPopup }
export default app;