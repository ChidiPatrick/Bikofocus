// import { defaultListboxReducer } from "@mui/base"
import React from "react"
import {useNavigate} from "react-router"
import styles from "./VerificationPage.module.scss"
import { useSelector,useDispatch } from "react-redux"
import { IoIosClose } from "react-icons/io";
const VerifyEmail = ({verify = false}) => {
   const navigate = useNavigate()
    const userData = useSelector(state => state.signUpSlice.userData)
    console.log(userData.email);
    const closeModal = () => {
        navigate('/signInForm')
    }
    return (
        <div className={ styles.verifyEmailWrapper }>
            <div className={styles.innerEmailWrapper}>
                <div className={styles.closeContainer}>
                    <IoIosClose className={styles.Close} onClick={closeModal}/>
                    </div>
                <h3 className={styles.verifyEmailHeader}>Thanks for Registering With Us!</h3>
                <p className={styles.verifyEmailParagraph}>We just sent you a verification email @{userData.email}. Please verify your account to complete your registration
                Check your spam messages incase you didn't see the mail in your mailbox
                </p>
                
            </div>
            
        </div>
    )
}
export default VerifyEmail