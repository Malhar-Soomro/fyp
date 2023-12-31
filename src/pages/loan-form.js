import { navigate } from 'gatsby';
import React, { useContext } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2'

import * as styles from "../styles/form.module.css";
import { AuthContext } from '../context/AuthContext';


const initialValues = {
    repaymentDate: "",
    loanAmountRequested: "",
};

export const applicationSchema = Yup.object({
    repaymentDate: Yup
        .date()
        .min(new Date(), "Repayment Date can't be in the past")
        .required('Date of birth is required'),
    loanAmountRequested: Yup.number().required("Please enter the amount"),

});


const LoanForm = () => {

    const value = useContext(AuthContext);
    const walletAddress = sessionStorage.getItem("walletAddress");
    const loanRequested = sessionStorage.getItem("loanRequested");


    const { values, errors, touched, handleBlur, handleChange, handleSubmit, } =
        useFormik({
            initialValues,
            validationSchema: applicationSchema,
            onSubmit: (values, action) => {
                value.saveUserRequest(values);
                action.resetForm();
            },
        });
    // console.log(errors);

    const user = sessionStorage.getItem("uid");
    if (!user) {
        Swal.fire({
            icon: "error",
            title: "create your account",
            showConfirmButton: false,
            timer: 2000
        });
        return navigate("/sign-up")
    }

    if (!walletAddress) {
        Swal.fire({
            icon: "error",
            title: "your profile is incomplete",
            showConfirmButton: false,
            timer: 2000
        });
        return navigate("/dashboard/profile");
    }

    if (loanRequested === "true") {
        Swal.fire({
            icon: "error",
            title: "you have taken the loan",
            showConfirmButton: false,
            timer: 2000
        });
        return navigate("/");
    }


    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.arrow}>

                    <button onClick={() => navigate("/")} >←</button>
                    <h2 className={styles.title}>Loan Form</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>

                        <label htmlFor="loanAmountRequested">Loan Amount</label>
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



                        <label htmlFor="repaymentDate">Repayment Date</label>
                        <input
                            type="date"
                            id="repaymentDate"
                            autoComplete='off'
                            value={values.repaymentDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.repaymentDate && touched.repaymentDate ? (
                            <p className={styles.formError}>{errors.repaymentDate}</p>
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

export default LoanForm;