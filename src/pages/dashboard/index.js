import React from 'react'
import Sidebar from '../../components/Sidebar';
import Swal from 'sweetalert2'
import { navigate } from 'gatsby';


import * as styles from "../../styles/dashboard.module.css"


const Dashboard = () => {

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
            <div>
                user dashboard
            </div>
        </div>
    )
}

export default Dashboard;