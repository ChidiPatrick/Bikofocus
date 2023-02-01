import React,{useState} from 'react';
import styles from "./PopUps.module.scss"
import {showChangePasswordUI,hideChangePasswordUI} from "../Settings/SettingsSlice"
import { useDispatch, useSelector } from 'react-redux';

const ChangePasswordPop = () => {
    const dispatch = useDispatch()
    const changePasswordPopUp = useSelector(state => state.settings.changePasswordPopUp)
    const handlePopUp = (e) => {
        if(e.target.id === "changeAccountPopUp" || e.target.id === "cancleBtnId"){
            dispatch(hideChangePasswordUI())
        }
        return
    }
    return  <div className={ changePasswordPopUp ? styles.popUpWrapper : styles.hidden  } id = "changeAccountPopUp" onClick={handlePopUp}>
        <div className={styles.popUpInnerWrapper}>
            <h4 className={styles.popUpHeader}>Change Password</h4>
            <input className={styles.popUpInput} type= "text" placeholder = "Current Password"/>
            <input className={styles.popUpInput} type= "text" placeholder = "New Password"/>
            <div className={styles.actionBtnsContainer}>
                <button className={styles.CTABtn} id = "cancleBtnId" onClick={handlePopUp}>Cancle</button>
                <button className={styles.CTABtn}>Confirm</button>
            </div>
        </div>

    </div>
}

export default  ChangePasswordPop