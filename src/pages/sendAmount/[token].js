import { navigate, useStaticQuery } from 'gatsby';
import React, { useContext } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2';

import * as styles from "../../styles/amount.module.css";
import { TransactionContext } from "../../context/TransactionContext";


const initialValues = {
    walletAddress: "",
    amount: "",
};

export const amountSchema = Yup.object({
    walletAddress: Yup.string().min(20).required("Please enter your wallet address"),
    amount: Yup.string().required("Please enter amount"),
});

const SendAmount = ({ token }) => {


    const { connectWallet, currentAccount, sendAmount } = useContext(TransactionContext);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: amountSchema,
            onSubmit: (values, action) => {
                console.log(values)
                const { walletAddress, amount } = values;
                console.log(walletAddress, amount)
                sendAmount(walletAddress, amount);
                // action.resetForm();
            },
        });
    // console.log(errors);


    if (token !== "11223") {
        Swal.fire({
            icon: "error",
            title: "you are not authorized to access this",
            showConfirmButton: false,
            timer: 2000
        });
        return navigate("/")
    }


    if (currentAccount) {
        return (
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <div className={styles.arrow}>

                        <button onClick={() => navigate("/")} >← go back</button>
                        {/* <h2 className={styles.title}>Application Form</h2> */}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
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

                            <label htmlFor="amount">Amount</label>
                            <input
                                type="text"
                                id="amount"
                                autoComplete='off'
                                step="0.0001"
                                value={values.amount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Amount (ETH)"
                            />
                            {errors.amount && touched.amount ? (
                                <p className={styles.formError}>{errors.amount}</p>
                            ) : null}


                            <div className={styles.btnContainer}>

                                <button
                                    className={styles.submitBtn}
                                    type="submit"
                                >
                                    Send Now
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={styles.connectWallet}>
                <h2>Connect with your metamask wallet before sending amount</h2>
                <div className={styles.btnContainer}>
                    <button
                        className={styles.walletBtn}
                        onClick={connectWallet}
                    // type="submit"
                    >
                        Connect Wallet
                    </button>
                </div>
            </div>
        )
    }
}


export default SendAmount