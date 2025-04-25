import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANf5u89J_wuIMK_e6Fw9w-lE0g75iGQiA",
  authDomain: "soothe-47de1.firebaseapp.com",
  databaseURL: "https://soothe-47de1-default-rtdb.firebaseio.com",
  projectId: "soothe-47de1",
  storageBucket: "soothe-47de1.firebasestorage.app",
  messagingSenderId: "1075651197699",
  appId: "1:1075651197699:web:99c75b6541efa064040736",
  measurementId: "G-N20W7QP1G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

// Initialize browser-only services conditionally
let analytics = null;
let messaging = null;

if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
  import("firebase/messaging").then(({ getMessaging }) => {
    messaging = getMessaging(app);
  });
}

export { app, auth, firestore, storage, database, analytics, messaging };