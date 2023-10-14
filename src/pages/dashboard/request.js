import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Swal from 'sweetalert2'
import { navigate } from 'gatsby';


import * as styles from "../../styles/request.module.css";
import { AuthContext } from '../../context/AuthContext';

const Request = () => {

    const value = useContext(AuthContext);
    const { amount, status } = value?.requestData;

    useEffect(() => {
        value.getUserRequest();
        console.log(value?.requestData)
    }, [])

    const repay = () => {
        if (status == "repay") {
            navigate("/repay");
        }
    }

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
            {amount ? <div className={styles.cards}>

                <div className={styles.card}>
                    <div>
                        <p className={styles.amount}>amount requested: {value?.requestData?.amount}ETH</p>
                        <p className={styles.repayment}>repayment date: {value?.requestData?.repaymentDate}</p>
                    </div>
                    <button
                        style={status != "repay" ? { cursor: "not-allowed" } : { cursor: "pointer" }}
                        onClick={repay}
                        className={styles.tag}>{value?.requestData?.status}</button>
                </div>
            </div> :
                <div className='noText'>
                    <p>no request </p>
                </div>
            }
        </div>
    )
}

export default Request