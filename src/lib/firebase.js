// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "chat-application-53a4c.firebaseapp.com",
    projectId: "chat-application-53a4c",
    storageBucket: "chat-application-53a4c.appspot.com",
    messagingSenderId: "340832350887",
    appId: "1:340832350887:web:ab3acc62608123f01be182"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()