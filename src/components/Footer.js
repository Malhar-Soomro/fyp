import React from 'react'
import * as styles from "../styles/footer.module.css"

import { UilFacebook, UilGithubAlt, UilLinkedinAlt } from '@iconscout/react-unicons';
import { Link } from 'gatsby';


const Footer = () => {
    return (
        <div className={styles.container}>

            <p>© Blockchain Based Loan Management System. All Rights Reserved</p>

            <div className={styles.follow}>
                <p>Follow us on:
                </p>

                <div className={styles.socials}>
                    <Link to="https://www.facebook.com/" target='_blank'>
                        <UilFacebook />
                    </Link>
                    <Link to="https://www.github.com/" target='_blank'>
                        <UilGithubAlt />
                    </Link>
                    <Link to="https://www.linkedin.com/" target='_blank'>
                        <UilLinkedinAlt />
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Footer