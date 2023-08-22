import React from 'react'
import Sidebar from '../../components/Sidebar';

import * as styles from "../../styles/dashboard.module.css"


const Dashboard = () => {
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