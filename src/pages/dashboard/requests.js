import React from 'react';
import Sidebar from '../../components/Sidebar';
import Swal from 'sweetalert2'
import { navigate } from 'gatsby';


import * as styles from "../../styles/requests.module.css";

const Requests = () => {

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
                        <p className={styles.amount}>amount requested: 0.0002ETH</p>
                        <p className={styles.repayment}>repayment date: 15-8-2023</p>
                    </div>
                    <span className={styles.tag}>applied</span>
                </div>
                <div className={styles.card}>
                    <div>
                        <p className={styles.amount}>amount requested: 0.0002ETH</p>
                        <p className={styles.repayment}>repayment date: 15-8-2023</p>
                    </div>
                    <span className={styles.tag}>applied</span>
                </div>

            </div>
        </div>
    )
}

export default Requests