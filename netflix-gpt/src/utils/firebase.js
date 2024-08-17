// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAom2armn7DmUv8RjBxdoEt1PuqGsSh2uc",
  authDomain: "netflixgpt-ebd3e.firebaseapp.com",
  projectId: "netflixgpt-ebd3e",
  storageBucket: "netflixgpt-ebd3e.appspot.com",
  messagingSenderId: "456704799189",
  appId: "1:456704799189:web:cb8c26a879d60c22d48d5c",
  measurementId: "G-KBZN851ZYN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;
