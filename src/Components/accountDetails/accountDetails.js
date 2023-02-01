import React,{useState} from 'react';
import styles from './accountDetails.module.scss'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Account from '../PopsUps/account';
import ChangePasswordPopUp from '../PopsUps/changePassword';
import { showChangePasswordUI,showUsernameUI,showPopUp } from '../Settings/SettingsSlice';
import ChangeUsernamePopUp from '../PopsUps/usernamePopUp';
import { useDispatch, useSelector } from 'react-redux';
import {setUserAvatarURL} from "../Settings/SettingsSlice"
import {ref,getDownloadURL,uploadBytesResumable} from "@firebase/storage"
import { db,auth,app,storage } from '../Firebase/Firebase';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { updateDoc,doc, arrayUnion, increment } from "firebase/firestore";


const AccountDetails = () => {
    const avatarURL = useSelector(state => state.settings.userAvatarURL)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId =  useSelector((state) => state.signUpSlice.userId)
    const userBioData = useSelector(state => state.settings.userBioData)
    const popUp = useSelector(state => state.settings.popUp)
    const changeUserName = useSelector(state => state.settings.changeUserName)
    const userBioRef = doc(db,"users",`${userId}`,`userInfoFolder`,`userData`)
    console.log(changeUserName);
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
        console.log(e);
        dispatch(showUsernameUI())
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
                    <figure className={styles.avatarFigure}>
                    <img src ={avatarURL}  className={styles.avatarImage}/>
                    
                    </figure>
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
                    <span>okaforPatrick@gmail.com</span>
                    <FaChevronRight className= {styles.navLinkIconRight}/>
                </div>
            </div>
            <div className= {styles.newPassword} onClick = {handleChangePasswordUI}>
                <span>Change Password</span>
                <FaChevronRight className= {styles.navLinkIconRight}/>
            </div>
        </div>
        
        <button className={styles.signOutBtn}>Sign Out</button>
        <Account/>
        <ChangeUsernamePopUp/>
        <ChangePasswordPopUp/>
        
    </div>;
}
export default AccountDetails;