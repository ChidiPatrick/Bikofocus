import React,{useRef} from 'react';
import styles from "./PopUps.module.scss"
import {showPopUp,hidePopUP,FetchUserBioData} from "../Settings/SettingsSlice"
import { useDispatch, useSelector } from 'react-redux';
import { updateEmail } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import {useNavigate} from "react-router"
const Account = () => {
    const inputRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const popUp = useSelector(state => state.settings.popUp)
    const userId =  useSelector((state) => state.signUpSlice.userId)
    console.log(auth);
    const handlePopUp = (e) => {
        if(e.target.id === "accountPop" || e.target.id === "cancleBtnId"){
            dispatch(hidePopUP())
        }
        else {
            return
        }
    }
    const changeEmail = async () => {
        const newEmail = inputRef.current.value
        inputRef.current.value = ""
        console.log(newEmail);
        updateEmail(auth.currentUser,newEmail)
        dispatch(FetchUserBioData(userId))
        dispatch(hidePopUP())
        navigate(0)
    }
    return <div className={popUp ? styles.popUpWrapper : styles.hidden  } id = "accountPop" onClick = {handlePopUp}>
        <div className={styles.popUpInnerWrapper}>
            <h4 className={styles.popUpHeader}>Change Email</h4>
            <input className={styles.popUpInput} ref = {inputRef} type= "text" placeholder = "New username"/>
            <div className={styles.actionBtnsContainer}>
                <button className={styles.CTABtn} id = "cancleBtnId" onClick = {handlePopUp}>Cancle</button>
                <button className={styles.CTABtn} onClick = {changeEmail}>Confirm</button>
            </div>
        </div>
        
    </div>;
}

export default Account;