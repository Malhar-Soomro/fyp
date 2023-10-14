import { navigate } from 'gatsby';
import React, { useContext } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2';

import * as styles from "../styles/amount.module.css";
import { TransactionContext } from "../context/TransactionContext";

const initialValues = {
    walletAddress: "0x278C0f6227EbdE53314fA97d91214086DD92fF3E",
    amount: "",
};

export const repaySchema = Yup.object({
    walletAddress: Yup.string().min(20).required("Please enter your wallet address"),
    amount: Yup.string().required("Please enter amount"),
});

const Repay = () => {

    const contextValues = useContext(TransactionContext);


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: repaySchema,
            onSubmit: (values, action) => {
                console.log(values)
                const { walletAddress, amount } = values;
                console.log(walletAddress, amount)
                const amountType = "repayment";
                contextValues?.sendAmount(walletAddress, amount, amountType);
            },
        });
    // console.log(errors);


    if (contextValues?.currentAccount) {
        return (
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <div className={styles.arrow}>

                        <button onClick={() => navigate(-1)} >← go back</button>
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
                                readOnly
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
                        onClick={contextValues?.connectWallet}
                    // type="submit"
                    >
                        Connect Wallet
                    </button>
                </div>
            </div>
        )
    }
}
export default Repay;