import { Link } from 'gatsby'
import React from 'react'
import { UilCreateDashboard, UilMessage, UilUserCircle } from '@iconscout/react-unicons'
import * as styles from "../styles/sidebar.module.css";

const Sidebar = () => {
    return (
        <div className={styles.container}>
            <Link to='/dashboard'>
                <UilCreateDashboard />
                <span>Dashboard</span>
            </Link>
            <Link to='/dashboard/requests'>
                <UilMessage />
                <span>Requests</span>
            </Link>
            <Link to='/dashboard/profile'>
                <UilUserCircle />
                <span>Profile</span>
            </Link>
        </div>
    )
}

export default Sidebar