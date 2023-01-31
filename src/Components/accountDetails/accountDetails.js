import React from 'react';
import styles from './accountDetails.module.scss'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Account from '../PopsUps/account';

const accountDetails = () => {
    return <div className={styles.accountDetailsWrapper}>
        <h3 className={styles.accountDetailsHeader}>
            <FaChevronLeft className= {styles.navLinkIcon}/>
            <span className= {styles.headerHeading}>Account Details</span>
        </h3>
        <div className={styles.accountDetailsInnerWrapper}>
            <label htmlFor='userAvatar' className= {styles.inputLabel}>
                <span>Avatar</span>
                <div className={styles.figureWrapper}>
                    <figure className={styles.avatarFigure}>
                    {/* <img src ={} alt ="avata"/> */}
                    
                    </figure>
                    <FaChevronRight className= {styles.navLinkIconRight}/>
                    <input type= 'file' id  ="userAvatar" className={styles.inputFile} />
                </div> 
            </label>
            

            <div className= {styles.newUsername}>
                <span>Username</span>
                <div className={styles.rightContainer}>
                    <span>Patrick Chidiebele</span>
                    <FaChevronRight className= {styles.navLinkIconRight}/>
                </div>
                
            </div>
            <div className= {styles.newEmail}>
                <span>Account</span>
                <div className={styles.rightContainer}>
                    <span>okaforPatrick@gmail.com</span>
                    <FaChevronRight className= {styles.navLinkIconRight}/>
                </div>
                
            </div>
            <div className= {styles.newPassword}>
                <span>Change Password</span>
                <FaChevronRight className= {styles.navLinkIconRight}/>
            </div>
        </div>
        
        <button className={styles.signOutBtn}>Sign Out</button>
        <Account/>
    </div>;
}
export default accountDetails;