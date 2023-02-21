import React, {useRef,useState} from 'react';
import styles from "./tasksCategoryPopUp.module.scss"
import {
  FaSun,
  FaRegCalendarCheck,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { MdEventNote, MdOutlineWbTwilight } from "react-icons/md";
import {setTaskCategory} from '../Settings/SettingsSlice'
import userEvent from '@testing-library/user-event';
import { useDispatch, useSelector } from 'react-redux';
import {hideTaskCategoryPopUp} from "../Settings/SettingsSlice"
//////////////////////////////////////////////////
const TasksCategoryPopUp = () => {
    const dispatch = useDispatch()
    const todayTasksRef = useRef()
    const tomorrowTasksRef = useRef()
    const somedayTasksRef = useRef()
    const upcomingTasksRef = useRef()
    const showTasksCategoryPopUp = useSelector(state => state.settings.showTasksCategoryPopUp)
    //////////////////////////////////////////////////
    const todayTasksHandler =  () => {
        dispatch(setTaskCategory(todayTasksRef.current.id))
    }
    ///////////////////////////////////////////////////
    const tomorrowTasksCategoryHandler = () => {
        dispatch(setTaskCategory(tomorrowTasksRef.current.id))
    }
    ///////////////////////////////////////////////////
    const somedayTasksHandler = () => {
        dispatch(setTaskCategory(somedayTasksRef.current.id))
    }
    //////////////////////////////////////////////////
    const  upcomingTasksHandler =  () => {
       
        dispatch(setTaskCategory(upcomingTasksRef.current.id))
    }
    return<div className={showTasksCategoryPopUp ? styles.popUpWrapper: styles.hidden} onClick = {() => 
    dispatch(hideTaskCategoryPopUp())}>
        <div className={styles.innerContainerWrapper}>
            <div className={styles.popupInnerContainer}>
                <div className={styles.taskCategory} onClick = {todayTasksHandler}  ref = {todayTasksRef} id = "today">
                    <figure className={[styles.iconFigure, styles.sunIconFigure].join(' ')}>
                        <FaSun className={[styles.icon,styles.sunIcon].join(' ')}/>
                    </figure>
                    <span>Today</span>
                </div>
                <div className={styles.taskCategory} onClick = {tomorrowTasksCategoryHandler} ref = {tomorrowTasksRef} id = "tomorrow">
                    <figure className={[styles.iconFigure, styles.tomorrowIconFigure].join(' ')}>
                        <MdOutlineWbTwilight className={[styles.icon,styles.tomorrowIcon].join(' ')}/>
                    </figure>
                    
                    <span>Tomorrow</span>
                </div>
                <div className={styles.taskCategory} onClick = {upcomingTasksHandler} ref = {upcomingTasksRef} id = "upcoming">
                    <figure className={[styles.iconFigure, styles.upcomingIconFigure].join(' ')}>
                        <FaRegCalendarCheck className={[styles.icon,styles.upcommingIcon].join(' ')}/>
                    </figure>
                    
                    <span>7 days later</span>
                </div>
                <div className={styles.taskCategory} onClick = {somedayTasksHandler} ref = {somedayTasksRef} id = "someday">
                    <figure className={[styles.iconFigure, styles.somedayIconFigure].join(' ')}>
                        <FaRegCalendarAlt className={[styles.icon,styles.somedayIcon].join(' ')}/>
                    </figure>
                    
                    <span>Someday</span>
                </div>
               
                </div>
            </div>
        </div>;
}


export default TasksCategoryPopUp;