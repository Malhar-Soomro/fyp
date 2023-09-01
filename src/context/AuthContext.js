import React from "react";
import { navigate } from 'gatsby';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import {
    ref,
    uploadBytes,
} from "firebase/storage";




import { auth, provider, db, storage } from "../../firebase";


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

    const createUser = async (email, password, values) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response)
            sessionStorage.setItem("uid", auth.currentUser.uid);
            saveUser(values);
            navigate("/");

        } catch (error) {
            console.log(error)
        }
    }

    const loginWithEmailAndPassword = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response)
            sessionStorage.setItem("uid", auth.currentUser.uid);
            navigate("/");


        } catch (error) {
            console.log(error)
        }
    }

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider).then(result => console.log(result));
            sessionStorage.setItem("uid", auth.currentUser.uid);
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


    const uploadFile = (IDCard, email) => {
        if (IDCard == null) return;
        const imageRef = ref(storage, `images/${email.toString()}`);
        uploadBytes(imageRef, IDCard).then(() => {
            alert("image uploaded");
        });
    }

    //specifying the collection in the db
    const userCollectionRef = collection(db, "users")
    // user info
    const saveUser = async (values) => {
        const doc = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            dateOfBirth: values.dateOfBirth,
            gender: values.gender,
            occupation: values.occupation,
            walletAddress: values.walletAddress,
        }

        try {
            await addDoc(userCollectionRef, doc);
            uploadFile(values.IDCard, values.email);


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