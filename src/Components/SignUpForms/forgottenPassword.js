import React from "react"
import styles from "./SignUpForm.module.scss"
import {useNavigate} from "react-router"
import { useFormik} from 'formik';
import {signInExistingUser,authStateObserver,auth} from "../Firebase/Firebase"
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithEmailLink } from "react-firebase-hooks/auth";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import * as Yup from 'yup';
const PasswordReset = () => {
    const [user,loading,error] = useAuthState(auth)
   const navigate = useNavigate()
    const goToSettings = () => {
        navigate("/settings")
    }
 const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string().min(8, "Password must be at least 8 alpha numeric characters").required("Required")

		}),
		onSubmit: (values) => {
        sendPasswordResetEmail(auth,values.email)
        .then((user) => {
            // if(user) {
            //     navigate('/settings')
            // }
        })
     },
	})
    return (
        <form className={styles.signInUserForm}   autoComplete="off" onSubmit={formik.handleSubmit}>
            <label htmlFor="email" className={styles.label}>
                <span>Email</span>
                <input 
                type="email" 
                className={styles.inputEl} 
                id ="email" 
                onChange={formik.handleChange} 
                required
                value={formik.values.email}
                />
            </label>
            {formik.errors.userName ? <div className={styles.required}>{formik.errors.userName}</div> : null}
            <label htmlFor="password" className={styles.label}>
                <span>New Password</span>
                <input 
                type ="password" 
                className={styles.inputEl} 
                onChange={formik.handleChange} 
                id ="password" 
                required
                value= {formik.values.password}
                />
            </label>
            {formik.errors.password ? <div className={styles.required}>{formik.errors.password}</div> : null}
            <div className={styles.CTAButtons}>
                <input 
                type = "submit" 
                className ={styles.forgottenPassword} 
                value ="Reset Password"
                // onClick={() => navigate("/settings")}
                />
            </div>
        </form>
    )
}
export default PasswordReset