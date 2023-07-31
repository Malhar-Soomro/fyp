import React from "react";
import { navigate } from 'gatsby';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

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

    return (
        <AuthContext.Provider value={{ loginWithGoogle, createUser, loginWithEmailAndPassword }}>
            {children}
        </AuthContext.Provider>
    );
}