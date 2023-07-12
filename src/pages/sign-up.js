import React, { useState } from 'react'
import * as styles from "../styles/sign-up.module.css";
import { Link, navigate, Button } from 'gatsby';

const Signup = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('firstName:', firstName);
        console.log('lastName:', lastName);
        console.log('email:', email);
        console.log('password:', password);
    };

    const goBack = () => {
        console.log("go back")
        navigate("/")
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.arrow}>

                    <button onClick={goBack} >←</button>
                    <h2 className={styles.title}>sign up now to get started</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">first name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <label htmlFor="lastName">last name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <label htmlFor="email">email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="password">password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <div className={styles.btnContainer}>

                            <button className={styles.submitBtn} type="submit">Sign Up</button>
                        </div>
                    </div>

                    <p>Already Have an account? <Link to="/login">Login</Link></p>

                </form>
            </div>


        </div>
    )
}

export default Signup