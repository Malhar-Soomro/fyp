import { Link, navigate } from 'gatsby'
import React from 'react'
import { UilCreateDashboard, UilMessage, UilUserCircle } from '@iconscout/react-unicons'
import * as styles from "../styles/sidebar.module.css";

const Sidebar = () => {
    return (
        <div className={styles.container}>
            <button className={styles.arrowButton} onClick={() => navigate("/")} >←</button>

            <Link to='/dashboard' activeStyle={{ backgroundColor: "#152953" }}>
                <UilCreateDashboard />
                <span>Dashboard</span>
            </Link>
            <Link to='/dashboard/requests' activeStyle={{ backgroundColor: "#152953" }}>
                <UilMessage />
                <span>Requests</span>
            </Link>
            <Link to='/dashboard/profile' activeStyle={{ backgroundColor: "#152953" }}>
                <UilUserCircle />
                <span>Profile</span>
            </Link>
        </div>
    )
}

export default Sidebar