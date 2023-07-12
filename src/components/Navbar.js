import React from 'react';
import * as styles from "../styles/navbar.module.css";
import { Link } from 'gatsby';

const Navbar = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Crypto Loan</h2>

            <ul className={styles.list}>
                <Link>Home</Link>
                <Link>About</Link>
                <Link>Application Form</Link>
                <Link>My Account</Link>
                <Link>Contact</Link>
                <Link to="/sign-up">Sign Up</Link>
                <Link to='/login'>Login</Link>
            </ul>

        </div>
    )
}

export default Navbar;