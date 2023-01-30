import React from "react";
import styles from "../PomodoroSetting/PomodoroSetting.module.scss"
import { FaStopwatch,FaAngleRight,FaCaretRight} from "react-icons/fa";

const StopWatch = ({selected = false, onSelect = f => f}) => {
    return <FaStopwatch className={
        selected ? 
        styles.stopWatchIconClicked : 
        styles.stopWatchIcon} 
        onClick ={onSelect}
        />
}

export default StopWatch