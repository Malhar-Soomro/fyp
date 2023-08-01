import { navigate } from 'gatsby';
import React, { useContext } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";


import * as styles from "../styles/form.module.css";
import { AuthContext } from '../context/AuthContext';


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

export const applicationSchema = Yup.object({
    fullName: Yup.string().min(2).max(25).required("Please enter your full name"),
});


const ApplicationForm = () => {

    const { sendRequest } = useContext(AuthContext);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: applicationSchema,
            onSubmit: (values, action) => {
                const { fullName, loanAmountRequested, walletAddress } = values;
                console.log(fullName, loanAmountRequested, walletAddress)
                sendRequest(fullName, loanAmountRequested, walletAddress);
                action.resetForm();
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
                            type="number"
                            id="loanAmountRequested"
                            autoComplete='off'
                            step="0.0001"
                            value={values.loanAmountRequested}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Amount (ETH)"
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