import { Link, navigate } from 'gatsby';
import React, { useContext } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore"


import * as styles from "../styles/form.module.css";
import { AuthContext } from '../context/AuthContext';
import { db } from "../../firebase"



const initialValues = {
    fullName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    employmentStatus: "",
    loanAmountRequested: "",
    walletAddress: "",
    loanDuration: "",
};

export const loginSchema = Yup.object({
    fullName: Yup.string().min(2).max(25).required("Please enter your full name"),
});


const ApplicationForm = () => {

    // const { sendRequest } = useContext(AuthContext);
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

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: loginSchema,
            onSubmit: (values, action) => {
                const { fullName, loanAmountRequested, walletAddress } = values;
                console.log(fullName, loanAmountRequested, walletAddress)
                sendRequest(fullName, loanAmountRequested, walletAddress);
                // action.resetForm();
            },
        });
    // console.log(errors);

    const user = localStorage.getItem("uid");
    // if (!user) return navigate("/sign-up");

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.arrow}>

                    <button onClick={() => navigate("/")} >←</button>
                    <h2 className={styles.title}>Application Form</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            autoComplete='off'
                            value={values.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.fullName && touched.fullName ? (
                            <p className={styles.formError}>{errors.fullName}</p>
                        ) : null}

                        <label htmlFor="loanAmountRequested">Loan Amount Requested</label>
                        <input
                            type="loanAmountRequested"
                            id="loanAmountRequested"
                            autoComplete='off'
                            value={values.loanAmountRequested}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='in eth'
                        />
                        {errors.loanAmountRequested && touched.loanAmountRequested ? (
                            <p className={styles.formError}>{errors.loanAmountRequested}</p>
                        ) : null}

                        <label htmlFor="walletAddress">Wallet Address</label>
                        <input
                            type="walletAddress"
                            id="walletAddress"
                            autoComplete='off'
                            value={values.walletAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.walletAddress && touched.walletAddress ? (
                            <p className={styles.formError}>{errors.walletAddress}</p>
                        ) : null}


                        <div className={styles.btnContainer}>

                            <button className={styles.submitBtn} type="submit">Submit</button>
                        </div>
                    </div>

                </form>
            </div>


        </div>
    )
}

export default ApplicationForm;