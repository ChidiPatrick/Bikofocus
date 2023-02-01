import React from 'react';
import styles from "./PopUps.module.scss"
import {hideChangeUsernameUI} from "../Settings/SettingsSlice"
import { useDispatch, useSelector } from 'react-redux';

const ChangeUsername = () => {
    const dispatch = useDispatch()
    const changeUsername = useSelector(state => state.settings.changeUsername)
   
   console.log(changeUsername);
    const handlePopUp = (e) => {
        if(e.target.id === "changeUsername" || e.target.id === "cancleBtnId"){
            dispatch(hideChangeUsernameUI())
        }
    }
    return  <div className={changeUsername ? styles.popUpWrapper : styles.hidden} id = "changeUsername" onClick={handlePopUp}>
        <div className={styles.popUpInnerWrapper}>
            <h4 className={styles.popUpHeader}>Change Username</h4>
            <input className={styles.popUpInput} type= "text" placeholder = "New Username"/>
            <div className={styles.actionBtnsContainer}>
                <button className={styles.CTABtn} id = "cancleBtnId" onClick={handlePopUp}>Cancle</button>
                <button className={styles.CTABtn}>Confirm</button>
            </div>
        </div>

    </div>
}

export default  ChangeUsername