import React,{useState} from 'react';
import styles from "./PopUps.module.scss"
import {showPopUp,hidePopUP} from "../Settings/SettingsSlice"
import { useDispatch, useSelector } from 'react-redux';

const Account = () => {
    const dispatch = useDispatch()
    const popUp = useSelector(state => state.settings.popUp)
    console.log(popUp);
    const handlePopUp = (e) => {
        console.log(e.target.id)
        if(e.target.id === "accountPop" || e.target.id === "cancleBtnId"){
            dispatch(hidePopUP())
        }
        else {
            return
        }
    }
    return <div className={popUp ? styles.popUpWrapper : styles.hidden  } id = "accountPop" onClick = {handlePopUp}>
        <div className={styles.popUpInnerWrapper}>
            <h4 className={styles.popUpHeader}>Change Email</h4>
            <input className={styles.popUpInput} type= "text" placeholder = "New username"/>
            <div className={styles.actionBtnsContainer}>
                <button className={styles.CTABtn} id = "cancleBtnId" onClick = {handlePopUp}>Cancle</button>
                <button className={styles.CTABtn}>Confirm</button>
            </div>
        </div>
        
    </div>;
}

export default Account;