import React, {useState} from "react"
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
   const [showMessage, setShowMessage] = useState(false)
   let [counter,setCounter] = useState(0)
    
   console.log(user);
   const handleCounter = () => {
   setCounter(counter + 1)
    console.log(counter);
    if(counter === 2){
        setShowMessage(true)
    }

    
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
                signInWithEmailAndPassword(auth,values.email,values.password)
                .then((user) => {
                    if(user){
                        navigate('/timerPage')
                    }
                })
            }
	})
    return (
        <form className={styles.signInUserForm}   autoComplete="off" onSubmit={formik.handleSubmit}>
            <div className={showMessage ? styles.errorMessage : styles.hidden}>
                Please Enter correct email,password and check your internet connection
            </div>
          <div className={styles.inputFieldWrapper}>
                <label htmlFor="email" className={styles.signLabel}>
                <span>Email</span>
                <input 
                type="email" 
                className={styles.signInputEl} 
                id ="email" 
                onChange={formik.handleChange} 
                required
                placeholder="youremail@yourdomain.com"
                value={formik.values.email}
                />
            </label>
            {formik.errors.userName ? <div className={styles.required}>{formik.errors.userName}</div> : null}
            <label htmlFor="password" className={styles.signLabel}>
                <span>Password</span>
                <input 
                type ="password" 
                className={styles.signInputEl} 
                onChange={formik.handleChange} 
                id ="password" 
                required
                placeholder="Strongpassword34!"
                value= {formik.values.password}
                />
            </label>
            {formik.errors.password ? <div className={styles.required}>{formik.errors.password}</div> : null}
          </div>
            
            <div className={styles.CTAButtons}>
                <input 
                type = "submit" 
                className ={[styles.ctaBtn,styles.signIn].join(" ")} 
                value ="Log In"
                onClick={handleCounter}
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