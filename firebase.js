// import firebase from "firebase/compat/app"
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";




const firebaseConfig = {
    apiKey: "AIzaSyBWZqi0w2dZcjWVtm5sr0xWTBx-yMZhQXs",
    authDomain: "finalyearproject-b1d76.firebaseapp.com",
    projectId: "finalyearproject-b1d76",
    storageBucket: "finalyearproject-b1d76.appspot.com",
    messagingSenderId: "703667427534",
    appId: "1:703667427534:web:9bcc1307a0f4e11178989f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider(auth)
export const storage = getStorage(app);