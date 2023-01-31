import React from 'react';
import styles from './accountDetails.module.scss'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const accountDetails = () => {
    return <div className={styles.accountDetailsWrapper}>
        <h3 className={styles.accountDetailsHeader}>
            <FaChevronLeft className= {styles.navLinkIcon}/>
            <span className= {styles.headerHeading}>Account Details</span>
        </h3>
        <label htmlFor='userAvatar'>Avatar</label>
        <input type= 'file' id  ="userAvatar" />
        <div className= {styles.newUsername}>Username</div>
        <div className= {styles.newEmail}>okafor@gmail.com</div>
        <div className={styles.changePassword}>change Password</div>
        <button>Sign Out</button>
    </div>;
}
export default accountDetails;