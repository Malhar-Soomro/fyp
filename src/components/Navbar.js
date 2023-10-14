import React, { useContext } from 'react';
import * as styles from "../styles/navbar.module.css";
import { Link } from 'gatsby';
import { signOut, } from "firebase/auth"
import Swal from 'sweetalert2';

import { auth } from "../../firebase"
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {

    const [user, setUser] = React.useState(sessionStorage.getItem('uid'));
    const values = useContext(AuthContext);

    const logout = async () => {
        await signOut(auth)
        Swal.fire({
            icon: "success",
            title: "Signed Out !",
            showConfirmButton: false,
            timer: 1000
        });
        setUser("");
        sessionStorage.setItem("uid", "");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("walletAddress")
        sessionStorage.removeItem("loanRequested")
        values.setRequestData({ amount: "", repaymentDate: "", status: "" });

    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Crypto Loan</h2>

            <ul className={styles.list}>
                <Link>Home</Link>
                <Link to='loan-form'>Apply for loan</Link>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/all-transactions'>All Transactions</Link>

                {user ?
                    <button className={styles.logoutBtn} onClick={logout}>
                        Logout
                    </button>
                    :
                    <>
                        <Link to="/sign-up">Sign Up</Link>
                        <Link to='/login'>Login</Link>
                    </>
                }
            </ul>

        </div>
    )
}

export default Navbar;