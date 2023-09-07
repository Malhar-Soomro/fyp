import React, { useEffect, useState } from "react";
import { navigate } from 'gatsby';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import {
    ref,
    uploadBytes,
} from "firebase/storage";
import Swal from 'sweetalert2'

import { auth, provider, db, storage } from "../../firebase";


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

    const email = sessionStorage.getItem('email');

    const [requestData, setRequestData] = useState({ amount: "", repaymentDate: "", status: "" });


    const createUser = async (email, password, values) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response)
            sessionStorage.setItem("uid", auth.currentUser.uid);
            saveUser(values);
            getUserData();

        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                // Fire the alert
                Swal.fire({
                    icon: "error",
                    title: "Account Already Exists !",
                    text: "Email address is already in use by another account",
                    showConfirmButton: false,
                    timer: 2500,
                });
            }
        }
    }

    const loginWithEmailAndPassword = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response)
            sessionStorage.setItem("uid", auth.currentUser.uid);
            sessionStorage.setItem("email", auth.currentUser.email);

            Swal.fire({
                icon: "success",
                title: "logged in successfully",
                showConfirmButton: false,
                timer: 2000
            });

            getUserData();
            getUserRequest();
            navigate("/");


        } catch (error) {
            if (error.code === "auth/user-not-found") {
                // Fire the alert
                Swal.fire({
                    icon: "error",
                    title: "User not found !",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }

            else if (error.code === "auth/too-many-requests") {
                // Fire the alert
                Swal.fire({
                    icon: "error",
                    title: "Too many failed login attempts, please try again later !",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    }

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider).then(result => console.log(result));
            sessionStorage.setItem("uid", auth.currentUser.uid);
            sessionStorage.setItem("email", auth.currentUser.email);

            Swal.fire({
                icon: "success",
                title: "logged in successfully",
                showConfirmButton: false,
                timer: 2000
            });

            getUserData();
            getUserRequest();
            navigate("/")
        } catch (error) {

            if (error.code === "auth/too-many-requests") {
                // Fire the alert
                Swal.fire({
                    icon: "error",
                    title: "Too many failed login attempts, please try again later !",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }

        }
    }


    const uploadFile = (IDCard, email) => {
        if (IDCard == null) return;
        const imageRef = ref(storage, `images/${email.toString()}`);
        uploadBytes(imageRef, IDCard).then(() => {
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
            loanRequested: false
        }

        try {
            await addDoc(userCollectionRef, doc);
            uploadFile(values.IDCard, values.email);
            sessionStorage.setItem("email", values.email);
            Swal.fire({
                icon: "success",
                title: "account created",
                showConfirmButton: false,
                timer: 2000
            });
            navigate("/");
            getUserData();



        } catch (error) {
            console.log(error)
        }

    }

    const getUserData = async () => {
        const q = query(userCollectionRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            sessionStorage.setItem("walletAddress", doc.data().walletAddress);
            sessionStorage.setItem("loanRequested", doc.data().loanRequested);
        })
    }

    //specifying the collection in the db
    const requestCollectionRef = collection(db, "requests")

    const getUserRequest = async () => {
        const q = query(requestCollectionRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setRequestData({
                amount: doc.data().loanAmountRequested,
                repaymentDate: doc.data().repaymentDate,
                status: doc.data().status
            });
        })
    }

    const saveUserRequest = async (values) => {

        const document = {
            loanAmountRequested: values.loanAmountRequested,
            repaymentDate: values.repaymentDate,
            email: email,
            status: "applied"
        }

        // updating doc
        const q = query(userCollectionRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            const docRef = doc(db, "users", document.id);
            updateDoc(docRef, {
                loanRequested: true
            })
        })

        try {
            await addDoc(requestCollectionRef, document);
            navigate("/");
            getUserData();
            getUserRequest();


        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserData();
        getUserRequest();

    }, [])


    return (
        <AuthContext.Provider value={{ loginWithGoogle, createUser, loginWithEmailAndPassword, saveUser, saveUserRequest, getUserRequest, requestData }}>
            {children}
        </AuthContext.Provider>
    );
}