import React, { useContext } from 'react';
import * as styles from "../styles/navbar.module.css";
import { Link } from 'gatsby';
import { signOut, } from "firebase/auth"

import { auth } from "../../firebase"
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {


    const value = useContext(AuthContext)
    console.log(value)

    const [user, setUser] = React.useState(localStorage.getItem('uid'));
    console.log(user)

    const logout = async () => {
        await signOut(auth)
        setUser("");
        localStorage.setItem("uid", "");
    }


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Crypto Loan</h2>

            <ul className={styles.list}>
                <Link>Home</Link>
                <Link>About</Link>
                <Link>Application Form</Link>
                <Link>My Account</Link>
                <Link>Contact</Link>

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