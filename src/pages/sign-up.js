import React, { useContext } from 'react'
import * as styles from "../styles/sign-up.module.css";
import { Link, navigate } from 'gatsby';
import { useFormik } from "formik";
import * as Yup from "yup";

import image from "../../static/Google.png"
import { AuthContext } from '../context/AuthContext';



const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    occupation: "",
    repaymentDate: "",
    occupation: "",
    walletAddress: "",
    IDCard: "",
};

export const signUpSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Please enter your first name"),
    lastName: Yup.string().min(2).max(25).required("Please enter your last name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    dateOfBirth: Yup
        .date()
        .max(new Date(), "Date of birth can't be in the future")
        .required('Date of birth is required'),
    gender: Yup
        .string()
        .oneOf(['male', 'female',], 'Please select a valid option')
        .required('Selection is required'),
    occupation: Yup.string().min(2).max(25).required("Please enter your occupation"),
    walletAddress: Yup.string().min(42).max(42).required("Please enter your wallet address"),
    IDCard: Yup.mixed().required('File is required'),

});

const Signup = () => {

    const { loginWithGoogle, createUser } = useContext(AuthContext);

    const user = sessionStorage.getItem("uid");


    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
        useFormik({
            initialValues,
            validationSchema: signUpSchema,
            onSubmit: (values, action) => {
                const { email, password } = values;
                console.log(values)

                createUser(email, password, values);
                // uploadFile(values.IDCard, values.email);
                // action.resetForm();
            },
        });
    console.log(errors)

    if (user) {
        return navigate("/");
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.arrow}>

                    <button onClick={() => navigate("/")} >←</button>
                    <h2 className={styles.title}>signup now to get started</h2>
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



                        <label htmlFor="dateOfBirth">Date Of Birth</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            autoComplete='off'
                            value={values.dateOfBirth}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.dateOfBirth && touched.dateOfBirth ? (
                            <p className={styles.formError}>{errors.dateOfBirth}</p>
                        ) : null}

                        <label htmlFor="gender">Gender</label>
                        <select value={values.gender} onChange={(e) => setFieldValue("gender", e.target.value)} name="gender" id="gender">
                            <option value="">Select an option</option>

                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        {errors.gender && touched.gender ? (
                            <p className={styles.formError}>{errors.gender}</p>
                        ) : null}

                        <label htmlFor="occupation">Occupation</label>
                        <input
                            type="text"
                            id="occupation"
                            autoComplete='off'
                            value={values.occupation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.occupation && touched.occupation ? (
                            <p className={styles.formError}>{errors.occupation}</p>
                        ) : null}


                        <label htmlFor="walletAddress">Wallet Address</label>
                        <input
                            type="text"
                            id="walletAddress"
                            autoComplete='off'
                            value={values.walletAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.walletAddress && touched.walletAddress ? (
                            <p className={styles.formError}>{errors.walletAddress}</p>
                        ) : null}


                        <label htmlFor="IDCard">ID Card or Passport</label>
                        <input
                            type="file"
                            id="IDCard"
                            autoComplete='off'
                            // value={values.IDCard}
                            onChange={(e) => setFieldValue("IDCard", e.target.files[0])}
                            onBlur={handleBlur}
                        />
                        {errors.IDCard && touched.IDCard ? (
                            <p className={styles.formError}>{errors.IDCard}</p>
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