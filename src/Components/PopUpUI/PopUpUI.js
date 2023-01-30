import React from "react";
import styles from "./PopUpUI.module.scss"
import { hideModal } from "../SignUpForms/SignUpFormSlice";
import { useSelector,useDispatch } from "react-redux";

const PopUpUI = ({heading,message, modalState}) => {
    const dispatch = useDispatch()
    // const modalState = useSelector((state) => state.signUpSlice.modalState)
   
    console.log(modalState)
    return <div className={modalState ? styles.PopUpUIWrapper : styles.hidden } onClick={() => dispatch(hideModal())} >
            <div onClick={() => {dispatch(hideModal())}} className={styles.PopUpUI}>
                <h3 onClick={() => dispatch(hideModal())} className={styles.popUpHeader}>{heading}</h3>
            <p onClick={() => dispatch(hideModal())} className={styles.popUpMessage}>{message}</p>
            </div>
    </div>
}
export default PopUpUI