import React,{useRef} from 'react';
import styles from "./PopUps.module.scss"
import {hideChangeUsernameUI} from "../Settings/SettingsSlice"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { db} from '../Firebase/Firebase';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
import { updateDoc,doc, arrayUnion, increment } from "firebase/firestore";
import {FetchUserBioData } from '../Settings/SettingsSlice';
//////////////////////////////////////
const ChangeUsername = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId =  useSelector((state) => state.signUpSlice.userId)
    const changeUsername = useSelector(state => state.settings.changeUsername)
    const userBioRef = doc(db,"users",`${userId}`,`userInfoFolder`,`userData`)
    const inputRef = useRef()
///////////////////////////////////////
    const handlePopUp = (e) => {
        if(e.target.id === "changeUsername" || e.target.id === "cancleBtnId"){
            dispatch(hideChangeUsernameUI())
        }
    }
////////////////////////////////////////
 const handleUpdateUsername = async () => {
    const newUsername = inputRef.current.value
    inputRef.current.value = ""
        updateDoc(userBioRef,{
            userName: newUsername
        })
        dispatch(FetchUserBioData(userId))
        dispatch(hideChangeUsernameUI())
        navigate(0)
    }
    return  <div className={changeUsername ? styles.popUpWrapper : styles.hidden} id = "changeUsername" onClick={handlePopUp}>
        <div className={styles.popUpInnerWrapper}>
            <h4 className={styles.popUpHeader}>Change Username</h4>
            <input className={styles.popUpInput} ref = {inputRef} type= "text" placeholder = "New Username"/>
            <div className={styles.actionBtnsContainer}>
                <button className={styles.CTABtn} id = "cancleBtnId" onClick={handlePopUp}>Cancle</button>
                <button className={styles.CTABtn} onClick = {handleUpdateUsername}>Confirm</button>
            </div>
        </div>

    </div>
}

export default  ChangeUsername