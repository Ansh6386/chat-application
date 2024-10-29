// Import the functions you need from the SDKs you need
/*import { initializeApp } from "firebase/app";
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
export const storage = getStorage()  */


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "chitchat-a544b.firebaseapp.com",
    projectId: "chitchat-a544b",
    storageBucket: "chitchat-a544b.appspot.com",
    messagingSenderId: "1093812811570",
    appId: "1:1093812811570:web:1369e3c2ff709db19d092b",
    measurementId: "G-VLD6N1XJG9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()