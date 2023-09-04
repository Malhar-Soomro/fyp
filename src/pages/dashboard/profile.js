import React from 'react'
import Sidebar from '../../components/Sidebar'
import Swal from 'sweetalert2'
import { navigate } from 'gatsby';


import * as styles from "../../styles/profile.module.css"

const Profile = () => {

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

    return (
        <div className={styles.container}>
            <Sidebar />
            <div>
                profile
            </div>
        </div>
    )
}

export default Profile