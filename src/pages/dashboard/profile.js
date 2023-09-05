import React, { useContext } from 'react'
import Sidebar from '../../components/Sidebar'
import Swal from 'sweetalert2'
import { navigate, Link } from 'gatsby';
import { useFormik } from "formik";
import * as Yup from "yup";


import * as styles from "../../styles/profile.module.css"
import { AuthContext } from '../../context/AuthContext';


const initialValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    occupation: "",
    walletAddress: "",
    IDCard: "",
};

export const profileSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Please enter your first name"),
    lastName: Yup.string().min(2).max(25).required("Please enter your last name"),
    dateOfBirth: Yup
        .date()
        .max(new Date(), "Date of birth can't be in the future")
        .required('Date of birth is required'),
    gender: Yup
        .string()
        .oneOf(['male', 'female',], 'Please select a valid option')
        .required('Selection is required'),
    occupation: Yup.string().min(2).max(25).required("Please enter your occupation"),
    // walletAddress: Yup.string().min(42).max(42).required("Please enter your wallet address"),
    // IDCard: Yup.mixed().required('File is required'),

});

const Profile = () => {

    const user = sessionStorage.getItem("uid");
    const email = sessionStorage.getItem("email");


    const { saveUser, walletAddress } = useContext(AuthContext);

    console.log(walletAddress)




    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
        useFormik({
            initialValues,
            validationSchema: profileSchema,
            onSubmit: (values, action) => {
                console.log({ ...values, email })
                saveUser({ ...values, email });
                // action.resetForm();
            },
        });
    console.log(errors)




    if (!user) {
        Swal.fire({
            icon: "error",
            title: "create your account",
            showConfirmButton: false,
            timer: 2000
        });
        return navigate("/sign-up")
    }

    if (walletAddress) {
        Swal.fire({
            icon: "success",
            title: "your profile is complete, you can apply for loan",
            showConfirmButton: false,
            timer: 2000
        });
        return navigate("/");
    }


    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.formContainer}>
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

                            <button className={styles.submitBtn} type="submit">Submit</button>
                        </div>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default Profile