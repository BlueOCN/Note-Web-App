// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FB_API_KEY,
  authDomain: import.meta.env.VITE_APP_AD,
  databaseURL: import.meta.env.VITE_APP_DB_URL,
  projectId: import.meta.env.VITE_APP_PID,
  storageBucket: import.meta.env.VITE_APP_SB,
  messagingSenderId: import.meta.env.VITE_APP_MS_ID,
  appId: import.meta.env.VITE_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes")
