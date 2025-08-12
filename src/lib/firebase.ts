// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJK2lv9fTWRxL2DoNPGihPfInGbqgKDts",
  authDomain: "rawad-eltwjeh.firebaseapp.com",
  projectId: "rawad-eltwjeh",
  storageBucket: "rawad-eltwjeh.firebasestorage.app",
  messagingSenderId: "609861715336",
  appId: "1:609861715336:web:e33c46b7879a6e6353663d",
  measurementId: "G-KKVJYB767Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
