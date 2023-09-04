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
    // fullName: Yup.string().min(2).max(25).required("Please enter your full name"),
});


const LoanForm = () => {

    const { walletAddress } = useContext(AuthContext);
    console.log(walletAddress)

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, } =
        useFormik({
            initialValues,
            validationSchema: applicationSchema,
            onSubmit: (values, action) => {
                const { fullName, loanAmountRequested, walletAddress, gender } = values;
                console.log(values);
                // sendRequest(fullName, loanAmountRequested, walletAddress);
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
        return navigate("/login")
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