import React, { useState } from 'react'
import * as styles from "../styles/sign-up.module.css";
import { Link, navigate } from 'gatsby';
import { useFormik } from "formik";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

const Signup = () => {

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            //   validationSchema: signUpSchema,
            onSubmit: (values, action) => {
                console.log(
                    values
                );
                action.resetForm();
            },
        });


    const goBack = () => {
        console.log("go back")
        navigate("/")
    }

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
                        <label htmlFor="lastName">last name</label>
                        <input
                            type="text"
                            id="lastName"
                            autoComplete='off'
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="email">email</label>
                        <input
                            type="email"
                            id="email"
                            autoComplete='off'
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <label htmlFor="password">password</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete='off'
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <div className={styles.btnContainer}>

                            <button className={styles.submitBtn} type="submit">Sign Up</button>
                        </div>
                    </div>

                    <p>Already Have an account? <Link to="/login">Login</Link></p>

                </form>
            </div>


        </div>
    )
}

export default Signup