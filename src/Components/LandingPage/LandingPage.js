import React from "react"
import styles from "./LandingPage.module.scss"
import SignInUser from "../SignUpForms/SignInUser"

const LandingPage = () => {
    return (
        <div className = {styles.landingPage}>
           <header className= {styles.header}> 
                 <div className={styles.headerHeading}>" If you want to be <br/>
                    <span className={styles.quotePoints}>MORE PRODUCTIVE</span><br/>
                    you need to become  <span className={styles.quotePoints}>MASTER </span>of your 
                    <span className={styles.quotePoints}> MINUTES </span> "
                    <span className={styles.welcomeMessage}>Welcome to <span className={styles.bikofocus}>Bikofocus</span></span>
                </div>
           </header> 
            <SignInUser/>
            {/* <div className={styles.btnWrapper}>
                <button>Log in</button>
                <button>Sign Up</button>
            </div> */}
         </div> 
        
    )
}
export default LandingPage