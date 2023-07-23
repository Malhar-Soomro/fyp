import React from 'react'
import { Link, navigate } from 'gatsby';
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth, provider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import * as styles from "../styles/login.module.css";


import image from "../../static/Google.png"

const initialValues = {
    email: "",
    password: "",
};

export const loginSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
});



const Login = () => {


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
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: loginSchema,
            onSubmit: (values, action) => {
                const { email, password } = values;
                loginWithEmailAndPassword(email, password)
                // action.resetForm();
            },
        });
    // console.log(errors)


    const goBack = () => {
        console.log("go back")
        navigate("/")
    }


    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.arrow}>

                    <button onClick={goBack} >←</button>
                    <h2 className={styles.title}>Login now to get started</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
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

                            <button className={styles.submitBtn} type="submit">Login</button>
                        </div>
                        <button type='button' onClick={loginWithGoogle} className={styles.loginWithGoogle}>
                            Login with
                            <img src={image} alt="google" />

                        </button>

                    </div>

                    <p className={styles.alreadyHaveAccount}>Don't Have an account? <Link to="/sign-up">Sign up</Link></p>

                </form>
            </div>


        </div>
    )
}

export default Login