import React, { useRef, useState,useReducer } from 'react'
import style from "./PomodoroSetting.module.scss"
import { FaStopwatch,FaAngleRight,FaCaretRight} from "react-icons/fa";
import { SlArrowRight } from "react-icons/im";
import { TbFlag } from "react-icons/tb";
import {useDispatch,useSelector} from "react-redux"
import {showStopWatchIcon,blurStopWatchIcon} from "../PomodoroSetting/PomodoroSettingSlice"
import StopWatch from '../StopWatch/StopWatch';
import StopWatchNumber from '../StopWatch/StopWatchNumber';
import { hidePomodoroSettings } from '../PomodoroSetting/PomodoroSettingSlice';
import { showTaskCategoryPopUp } from '../Settings/SettingsSlice';
// import classames from "./classnames"
const PomodoroSetting = ({handleAddTask,showUI}) => {
    const iconState = useSelector((state) => state.PomodoroSetting.stopWatchIcon)
   const [selected,setSelected] = useState(false)  
   const [selectedClocks,setSelectedClocks] = useState(0)
   const inputElementFocused = useSelector(state => state.PomodoroSetting.inputElementFocused)
    const dispatch = useDispatch()
    const [clicked,setClicked] = useState(false)
    const iconRef = useRef()
   const stopWatchIconClicked = (e) => {
        setClicked(true)
        console.log(e.target);
        if(iconState) {
            dispatch(blurStopWatchIcon())
        }else{
            dispatch(showStopWatchIcon())
        }
        console.log(iconRef.current);
   }
   const numbStopWatchIcons = [...Array(6)]
   const showPopUp = () => {
    dispatch(showTaskCategoryPopUp())
    console.log('clicked');
   }
    return (
        <div className={ showUI ? style.PomodoroSettingWrapper : style.hidePomodoroSettings}>
            <h6 className={style.PomodoroSettingHeader}>Estimated Pomodoros</h6>
            <div className={style.stopWatchIconWrapper} >
            <StopWatchNumber/>
            </div>
            <div className={style.taskSetting} >
                <div className={style.taskIcon} onClick = {showPopUp}>Task Icon</div>
                <TbFlag className={style.flagIcon}/>
                <div className={style.tag}>Tag</div>
                <div className={style.Task}>Task</div>
                <button className= {style.doneBtn} onClick ={() => handleAddTask()}>Done</button>
            </div>
        </div>
    )
}
export default PomodoroSetting