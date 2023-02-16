import React,{useState,useRef} from 'react';
import styles from "./PopUps.module.scss"
import {showChangePasswordUI,hideChangePasswordUI} from "../Settings/SettingsSlice"
import { useDispatch, useSelector } from 'react-redux';
import { updateDoc,doc, arrayUnion, increment } from "firebase/firestore";
import { db,auth,app,storage } from '../Firebase/Firebase';
import {FetchUserBioData } from '../Settings/SettingsSlice';
import { useNavigate } from 'react-router';

///////////////////////////////////////////
const ChangePasswordPop = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const newPasswordInputRef = useRef()
    const oldPasswordInputRef = useRef()
    const userBioData = useSelector(state => state.settings.userBioData)
     const userId =  useSelector((state) => state.signUpSlice.userId)
    const changePasswordPopUp = useSelector(state => state.settings.changePasswordPopUp)
    const userBioRef = doc(db,"users",`${userId}`,`userInfoFolder`,`userData`)
    ///////////////////////////////////////////
    console.log(userBioData);
    const handlePopUp = (e) => {
        if(e.target.id === "changeAccountPopUp" || e.target.id === "cancleBtnId"){
            dispatch(hideChangePasswordUI())
        }
        return
    }
////////////////////////////////////////////
const handleChangePassword = () => {
    const newPassword = newPasswordInputRef.current.value
    const oldPassword = oldPasswordInputRef.current.value
    if(oldPassword !== userBioData.password){
        alert("Wrong password")
        newPasswordInputRef.current.value = ""
        oldPasswordInputRef.current.value = ""
        return
    }
    newPasswordInputRef.current.value = ""
    oldPasswordInputRef.current.value = ""
    updateDoc(userBioRef,{
        password: newPassword
    })
    dispatch(FetchUserBioData(userId))
    navigate(0)
}
    return  <div className={ changePasswordPopUp ? styles.popUpWrapper : styles.hidden  } id = "changeAccountPopUp" onClick={handlePopUp}>
        <div className={styles.popUpInnerWrapper}>
            <h4 className={styles.popUpHeader}>Change Password</h4>
            <input className={styles.popUpInput} ref = {oldPasswordInputRef} type= "text" placeholder = "Current Password"/>
            <input className={styles.popUpInput} ref = {newPasswordInputRef} type= "text" placeholder = "New Password"/>
            <div className={styles.actionBtnsContainer}>
                <button className={styles.CTABtn} id = "cancleBtnId" onClick={handlePopUp}>Cancle</button>
                <button className={styles.CTABtn} onClick = {handleChangePassword}>Confirm</button>
            </div>
        </div>

    </div>
}

export default  ChangePasswordPop