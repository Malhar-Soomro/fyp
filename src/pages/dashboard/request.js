import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Swal from 'sweetalert2'
import { navigate } from 'gatsby';


import * as styles from "../../styles/request.module.css";
import { AuthContext } from '../../context/AuthContext';

const Request = () => {

    const value = useContext(AuthContext);

    useEffect(() => {
        console.log(value.requestData)
    }, [])

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

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.cards}>

                <div className={styles.card}>
                    <div>
                        <p className={styles.amount}>amount requested: {value?.requestData?.amount}ETH</p>
                        <p className={styles.repayment}>repayment date: {value?.requestData?.repaymentDate}</p>
                    </div>
                    <span onClick={value.getUserRequest} className={styles.tag}>{value?.requestData?.status}</span>
                </div>

            </div>
        </div>
    )
}

export default Request