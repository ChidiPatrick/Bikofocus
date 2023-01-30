import React from "react";
import styles from "./ButtonDone.module.scss"
const ButtonDone = ({handleClick = f => f, active = false, disable = true}) => {
   
    return (
        <button className={active ? styles.ButtonDone : styles.BtnDisabled} disabled = {disable}  onClick={handleClick}>Done</button>
    )
}
export default ButtonDone