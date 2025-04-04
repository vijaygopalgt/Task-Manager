// src/firebase.js
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Login
const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("Google Signed In:", result.user);
        return result.user;
    } catch (error) {
        console.error("Google Login Error:", error.message);
        throw error;
    }
};

// Email/Password Login
const signInWithEmailPassword = async(email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Email Signed In:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Email Login Error:", error.message);
        throw error;
    }
};

// Logout
const logout = async() => {
    try {
        await signOut(auth);
        console.log("User signed out");
    } catch (error) {
        console.error("Logout Error:", error.message);
    }
};

export { auth, provider, signInWithGoogle, signInWithEmailPassword, logout };