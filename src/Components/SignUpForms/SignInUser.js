import React from "react"
import styles from "./SignUpForm.module.scss"
import {useNavigate} from "react-router"
import { useFormik} from 'formik';
import {signInExistingUser,authStateObserver,auth} from "../Firebase/Firebase"
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithEmailLink } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
const SignInUser = () => {
    // const [signInWithEmailAndPassword,user,loading,error] = useSignInWithEmailAndPassword(auth)
    const [user,loading,error] = useAuthState(auth)
   const navigate = useNavigate()
    const goToSettings = () => {
        navigate("/settings")
        
    }
   console.log(user);
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
        signInWithEmailAndPassword(auth,values.email,values.password)
        .then((user) => {
            if(user) {
                navigate('/settings')
            }
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
                <span>Password</span>
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
                className ={[styles.ctaBtn,styles.signIn].join(" ")} 
                value ="SignIn"
                // onClick={goToSettings}
                />
                <input 
                type = "submit" 
                className ={[styles.ctaBtn,styles.signUp].join(' ')} 
                value ="SignUp"
                onClick={() => navigate("/signUpForm")}
                />
            </div>
            <Link to = "/forgottenPassword" className= {styles.forgottenPasswordLink} >Forgot Password?</Link>
        </form>
    )
}
export default SignInUser