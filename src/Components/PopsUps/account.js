import React from 'react';
import styles from "./PopUps.module.scss"

const account = () => {
    return <div className={styles.popUpWrapper}>
        <div className={styles.popUpInnerWrapper}>
            <h4 className={styles.popUpHeader}>Change Username</h4>
            <input className={styles.popUpInput} type= "text" placeholder = "New username"/>
            <button>Cancle</button>
            <button>Confirm</button>
        </div>
        
    </div>;
}

export default account;