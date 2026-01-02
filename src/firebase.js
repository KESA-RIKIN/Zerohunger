// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALPymnrN-i4QYX5hLqFKeBv1OaHvJPWp8",
    authDomain: "movie-4d2da.firebaseapp.com",
    projectId: "movie-4d2da",
    storageBucket: "movie-4d2da.firebasestorage.app",
    messagingSenderId: "72118162880",
    appId: "1:72118162880:web:dcb194aa65f6380d2b2425",
    measurementId: "G-ZGJB041JGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Auth

// Analytics (Safe Init)
let analytics;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

export { app, analytics, auth };
