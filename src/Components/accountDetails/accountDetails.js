import React from 'react';
import styles from './accountDetails.module.scss'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Account from '../PopsUps/account';
import ChangePasswordPopUp from '../PopsUps/changePassword';
import { showChangePasswordUI,showUsernameUI,showPopUp } from '../Settings/SettingsSlice';
import ChangeUsernamePopUp from '../PopsUps/usernamePopUp';
import { useDispatch, useSelector } from 'react-redux';
import { db,auth } from '../Firebase/Firebase';
import { Link,useNavigate } from 'react-router-dom';
import { doc} from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { ImUser } from "react-icons/im";
import { persistor } from '../store/store';


const AccountDetails = () => {
    const avatarURL = useSelector(state => state.settings.userAvatarURL)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userBioData = useSelector(state => state.settings.userBioData)
    ///////////////////////////////////////
    const showAccountPopUp = () => {
        dispatch(showPopUp())
    }
    ////////////////////////////////////////
    const handleChangePasswordUI = () => {
        dispatch(showChangePasswordUI())
    }
    ///////////////////////////////////////
    const handleChangeUsername = (e) => {
        dispatch(showUsernameUI())
    }
    //////////////////////////////////////////
    const logOutUser = () => {
        signOut(auth)
        persistor.purge()
        navigate('/')
    }
    
    /////////////////////////////////////////
   
    ////////////////////////////////////////////
    return <div className={styles.accountDetailsWrapper}>
        <h3 className={styles.accountDetailsHeader}>
            <FaChevronLeft className= {styles.navLinkIcon} onClick = {() => navigate('/settings')}/>
            <span className= {styles.headerHeading}>Account Details</span>
        </h3>
        <div className={styles.accountDetailsInnerWrapper}>
            <Link to = "/uploadAvatarUI" className= {styles.changeAvatarLink}>
                <span>Avatar</span>
                <div className={styles.figureWrapper}>
                    {avatarURL ?
					<figure className = {styles.avatarFigure}>
						<img className={styles.avatarImage} src = {avatarURL}/>
					</figure>
					:
					<ImUser className = {styles.fallbackAvatar}/>
				}
                    
                    <FaChevronRight className= {styles.navLinkIconRight}/>
                    {/* <input type= 'file' id  ="userAvatar" className={styles.inputFile} onChange = {handleChange} /> */}
                </div> 
            </Link>
            <div className= {styles.newUsername} onClick = {handleChangeUsername}>
                <span>Username</span>
                <div className={styles.rightContainer}>
                    <span>{userBioData.userName}</span>
                    <FaChevronRight className= {styles.navLinkIconRight}/>
                </div>
            </div>

            <div className= {styles.newEmail} onClick = {showAccountPopUp}>
                <span>Account</span>
                <div className={styles.rightContainer}>
                    <span>{userBioData.email.slice(0,17).padEnd(20,".")}</span>
                    <FaChevronRight className= {styles.navLinkIconRight}/>
                </div>
            </div>
            <div className= {styles.newPassword} onClick = {handleChangePasswordUI}>
                <span>Change Password</span>
                <FaChevronRight className= {styles.navLinkIconRight}/>
            </div>
        </div>
        
        <button className={styles.signOutBtn} onClick = {logOutUser}>Sign Out</button>
        <Account/>
        <ChangeUsernamePopUp/>
        <ChangePasswordPopUp/>
        
    </div>;
}
export default AccountDetails;