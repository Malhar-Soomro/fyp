import React from 'react'
import Sidebar from '../../components/Sidebar'

import * as styles from "../../styles/profile.module.css"

const Profile = () => {
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