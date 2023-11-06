// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// added this for Firebase Realtime Database
// to send and get sensor data
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtnDkNU18zdCM-zmlROyqOoQ8w4ee73Bs",
  authDomain: "marc-6d5c6.firebaseapp.com",
  projectId: "marc-6d5c6",
  storageBucket: "marc-6d5c6.appspot.com",
  messagingSenderId: "437354803957",
  appId: "1:437354803957:web:2506bf560e26ae32a00bbc",
  databaseURL: "https://marc-6d5c6-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app); 
export const storage = getStorage(app); 

// added this for Firebase Realtime Database
// to send and get sensor data
export const realtimeDb = getDatabase(app);