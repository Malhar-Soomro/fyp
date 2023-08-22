import { navigate } from 'gatsby';
import React, { useContext } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2'
import {
    ref,
    uploadBytes,
} from "firebase/storage";
import { storage, auth } from "../../firebase";



import * as styles from "../styles/form.module.css";
import { AuthContext } from '../context/AuthContext';


const initialValues = {
    fullName: "",
    dateOfBirth: "",
    gender: "",
    repaymentDate: "",
    occupation: "",
    IDCard: "",
    loanAmountRequested: "",
    walletAddress: "",
    loanDuration: "",
    imageUpload: "",
};

export const applicationSchema = Yup.object({
    // fullName: Yup.string().min(2).max(25).required("Please enter your full name"),
});


const ApplicationForm = () => {

    const { sendRequest } = useContext(AuthContext);

    const uid = localStorage.getItem("uid");
    console.log(uid.toString())


    const uploadFile = (imageUpload) => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${uid.toString()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("image uploaded");
        });
    }


    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
        useFormik({
            initialValues,
            validationSchema: applicationSchema,
            onSubmit: (values, action) => {
                const { fullName, loanAmountRequested, walletAddress, gender } = values;
                console.log(values);
                uploadFile(values.imageUpload);
                // sendRequest(fullName, loanAmountRequested, walletAddress);
                action.resetForm();
            },
        });
    // console.log(errors);

    const user = localStorage.getItem("uid");
    if (!user) {
        Swal.fire({
            icon: "error",
            title: "create your account to apply for loan",
            showConfirmButton: false,
            timer: 2000
        });
        return navigate("/sign-up");
    }

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

                        <label htmlFor="IDCard">ID Card or Passport</label>
                        <input
                            type="file"
                            id="IDCard"
                            autoComplete='off'
                            value={values.IDCard}
                            onChange={(e) => setFieldValue("imageUpload", e.target.files[0])}
                            onBlur={handleBlur}
                        />
                        {errors.IDCard && touched.IDCard ? (
                            <p className={styles.formError}>{errors.IDCard}</p>
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