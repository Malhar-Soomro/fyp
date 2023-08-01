import React from "react";
import { navigate } from 'gatsby';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";



import { auth, provider } from "../../firebase";


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

    const createUser = async (email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response)
            localStorage.setItem("uid", auth.currentUser.uid);
            navigate("/");

        } catch (error) {
            console.log(error)
        }
    }

    const loginWithEmailAndPassword = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response)
            localStorage.setItem("uid", auth.currentUser.uid);
            navigate("/");


        } catch (error) {
            console.log(error)
        }
    }

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider).then(result => console.log(result));
            localStorage.setItem("uid", auth.currentUser.uid);
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const sendRequest = async (fullName, loanAmountRequested, walletAddress) => {

        //specifying the collection in the db
        const loanRequests = collection(db, "loanRequests")

        const doc = {
            fullName,
            loanAmountRequested,
            walletAddress
        }
        try {
            await addDoc(loanRequests, doc);

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <AuthContext.Provider value={{ loginWithGoogle, createUser, loginWithEmailAndPassword, sendRequest }}>
            {children}
        </AuthContext.Provider>
    );
}