import React, { useState, useContext } from 'react'
import * as styles from "../styles/sign-up.module.css";
import { Link, navigate } from 'gatsby';
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth, provider } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"

import image from "../../static/Google.png"
import { AuthContext } from '../context/AuthContext';


const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

export const signUpSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Please enter your first name"),
    lastName: Yup.string().min(2).max(25).required("Please enter your last name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
});

const Signup = () => {

    const value = useContext(AuthContext);

    const user = localStorage.getItem("uid");


    console.log(value)

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

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider).then(result => console.log(result));
            localStorage.setItem("uid", auth.currentUser.uid);
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: signUpSchema,
            onSubmit: (values, action) => {
                const { email, password } = values;
                createUser(email, password)
                // action.resetForm();
            },
        });
    // console.log(errors)


    const goBack = () => {
        console.log("go back")
        navigate("/")
    }

    if (user) return navigate("/");


    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.arrow}>

                    <button onClick={goBack} >←</button>
                    <h2 className={styles.title}>sign up now to get started</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">first name</label>
                        <input
                            type="text"
                            id="firstName"
                            autoComplete='off'
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.firstName && touched.firstName ? (
                            <p className={styles.formError}>{errors.firstName}</p>
                        ) : null}
                        <label htmlFor="lastName">last name</label>
                        <input
                            type="text"
                            id="lastName"
                            autoComplete='off'
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.lastName && touched.lastName ? (
                            <p className={styles.formError}>{errors.lastName}</p>
                        ) : null}
                        <label htmlFor="email">email</label>
                        <input
                            type="email"
                            id="email"
                            autoComplete='off'
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                            <p className={styles.formError}>{errors.email}</p>
                        ) : null}

                        <label htmlFor="password">password</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete='off'
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? (
                            <p className={styles.formError}>{errors.password}</p>
                        ) : null}

                        <div className={styles.btnContainer}>

                            <button className={styles.submitBtn} type="submit">Sign Up</button>
                        </div>
                        <button type='button' onClick={loginWithGoogle} className={styles.loginWithGoogle}>
                            Login with
                            <img src={image} alt="google" />

                        </button>

                    </div>

                    <p className={styles.alreadyHaveAccount}>Already Have an account? <Link to="/login">Login</Link></p>

                </form>
            </div>


        </div>
    )
}

export default Signup