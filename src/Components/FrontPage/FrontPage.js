import React, { useContext, } from "react";
import styles from "./FrontPage.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import {  useTimer } from "react-timer-hook";
import btnStyles from "../Button/Button.module.scss";
import { Link,  useNavigate } from "react-router-dom";
// import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {auth} from "../Firebase/Firebase"
// import {persistor} from "../Store/Store"
// import ReactAudioPlayer from "react-audio-player";
import UIFx from "uifx";
import {
  showStartBtn,
  hideStartBtn,
  showPauseBtn,
  hidePauseBtn,
  showStopBtn,
  hideStopBtn,
  showContinueBtn,
  hideContinueBtn,
  resetState,
  breakEnd,
  breakStart,
  endCounting,
  startCounting,
  updateCurrnetTime,
  turnOffCountDownRunning,
  turnOnCountDownRunning,
  turnOffTriggerPlayFromTak,
  setIsRunning,
  setWeeklyWorkHours,
  // setDailyWorkHours,
  setMonthlyWorkHours,
  updateDailyWorkHoursStore,
   setCurrDate,
} from "./FrontPageSlice";
import {
  setTimeElasped,
  setElapsedTimeHoursMinutesArray, 
  FetchTasks,
  setDailyWorkHours
 
  
} from "../Settings/SettingsSlice"
import { getUserId } from "../SignUpForms/SignUpFormSlice";
// import Toness from "../audioFiles/AudioFiles"
import Bell from "../audioFiles/Bell.mp3"
import Impact  from "../audioFiles/Impact.mp3"
import Buzzer from "../audioFiles/Buzzer.mp3"
import Swoosh from "../audioFiles/Swoosh.mp3"
import Decide from "../audioFiles/Decide.mp3"
import Ding from "../audioFiles/Ding.mp3"
import Notification from "../audioFiles/Notification.mp3"
import Thriller from "../audioFiles/Thriller.mp3"
import TubularBell from "../audioFiles/TubularBell.mp3"
import Announcement from "../audioFiles/Announcement.mp3"
import { updateDoc,doc, arrayUnion, increment } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { IoIosArrowBack,} from "react-icons/io";
import { IoBarChart, } from "react-icons/io5";
import { 
        ImFilesEmpt,
        ImFolder,
        ImStopwatch,
        ImHourGlass,
        ImLoop2,
        ImLock,
        ImNotification,
        ImPause2,
        ImStop2,
        ImUser,
        ImList, 
        ImPlay3
      } from "react-icons/im";
  
// 
// import { settings } from "firebase/analytics";
/////////////////////////////////
const FrontPage = ({ expiryTimestamp }) => {
  const dispatch = useDispatch();
  const time = new Date();
  const circularTime = useSelector((state) => state.frontPage.minute5);
  const tone = useSelector((state) => state.tones.workAlarm)
  time.setSeconds(time.getSeconds() + circularTime);
  const running = useSelector((state) => state.frontPage.running);
  const Pause = useSelector((state) => state.frontPage.Pause);
  const Continue = useSelector((state) => state.frontPage.Continue);
  const stop = useSelector((state) => state.frontPage.stop);
  const counting = useSelector((state) => state.frontPage.counting);
  const pomodoroTime = useSelector(state => state.settings.pomodoroCurrLength)
  const countDownRunning = useSelector(state => state.frontPage.countDownRunning)
  const triggerPlayFromTask = useSelector(state => state.frontPage.triggerPlayFromTask)
  // const activeRunningPomodoroLength = useSelector(state => state.settings.activeRunningPomodoroLength)
  const activeProject = useSelector(state => state.frontPage.activeProject)
  console.log(triggerPlayFromTask);
  const userId =  useSelector((state) => state.signUpSlice.userId)
  const userTasks = useSelector(state => state.settings.userTasks)
  const activePomodoroLength = useSelector(state => state.settings.activeRunningPomodoroLength)
  const countDownIsRunning = useSelector(state => state.frontPage.isRunning)
  const taskName = useSelector(state => state.settings.clickedProjectIdentitfier)
  const userTasksRef = doc(db,"users",`${userId}`,`userTasksCollection`,`tasks`)
  const [showCautionMessage,setShowCautionMessage] = useState(false)
  const currDate = useSelector(state => state.settings.currDate)
  const dailyWorkHoursArray = useSelector(state => state.settings.dailyWorkHours)
  const monthlyWorkHourArray = useSelector(state => state.frontPage.monthlyWorkHour)
  const date = new Date().toDateString()
  const timeElapsed = useSelector(state => state.settings.elapsedTimeHoursMinutesArray)
 ////////////////////////////////////////////////////////////
 
   const tones = {
    Bell,Swoosh,Thriller,TubularBell,Announcement,Notification,Buzzer,Decide,Ding,Impact
   }
   console.log(tones[tone]);
  const workAlarm = new UIFx(tones[tone], { volume: 0.4, throttleMs: 100 });
  console.log(tone);
  const navigate = useNavigate()
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => onExpiry()

  });
  console.log(isRunning);
  //Handle Time Elapsed ///
  function calculateElapsedMinutesAndHours(minutes){
    const remainingMinutes = minutes % 60
    const hours = minutes / 60
    // dispatch(setElapsedTimeHoursMinutesArray([parseInt(hours),remainingMinutes]))
    console.log(minutes);
    return [parseInt(hours),parseInt(remainingMinutes)]
  }
  const updateDailyWorkHours = async (pomodoroLength,dailyWorkHoursArray,currDate) => {
   if((currDate !== date) && (dailyWorkHoursArray.length === 0) ){
     const currDate = new Date().toDateString()
     console.log(`Initial work hours array`);
     dispatch(setCurrDate(currDate))
      await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.dailyWorkHoursArray`]: [
        {
          date: date, 
          dailyWorkHours: [pomodoroLength],
          totalDailyWorkHours: [pomodoroLength]
        }],
     })
     await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.currDate`]: currDate,
     })
      dispatch(FetchTasks(userId))
    }
    else if(currDate === date) {
      console.log(`RUNNING SECOND CONDITION....`);
      const newHoursArray = dailyWorkHoursArray;
      let currWorkObj = {};
      //Remove last element of the array ////
      const filteredWorkHoursArr = newHoursArray.filter((obj,i) => {
        if(obj.date === date){
          currWorkObj = obj
          return false
        }
        else {
          return true
        }
      })
      const newWorkHoursArray = [...currWorkObj.dailyWorkHours,pomodoroLength]
      const newTotalDailyWorkHours = newWorkHoursArray.reduce((a,b) => parseInt(a) +parseInt( b), 0)
      const newDailyWorkHoursObject = {dailyWorkHours: newWorkHoursArray,date,totalDailyWorkHours: newTotalDailyWorkHours}
      const newOverallDailyWorkHoursObject = [...filteredWorkHoursArr,newDailyWorkHoursObject]
      await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.dailyWorkHoursArray`]: newOverallDailyWorkHoursObject 
     })
     dispatch(setDailyWorkHours(newOverallDailyWorkHoursObject))
    }
    else if(currDate !== date){
      const currDate = new Date().toDateString()
      dispatch(setCurrDate(currDate))
      await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.dailyWorkHoursArray`]: [...dailyWorkHoursArray,{
          date: date, 
          dailyWorkHours: [pomodoroLength],
          totalDailyWorkHours: [pomodoroLength]
        }],
     })
     await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.currDate`]: currDate,
     })
    }
    ////////////////////////////////////////
    
  }
  // const dateYesterday = new Date("february, 10, 2023")
  // const dateNow = new Date("february, 11, 2023");
  // console.log(dateNow.toDateString() === dateYesterday.toDateString());
  //// Update Elasped Time ////////
  // const updateElapsedTime = async (currPomodoroLength) => {
  //   const activeProjectId = activeProject.split(" ").join("")
  //   const currProject = userTasks[activeProjectId]
  //   const totalElaspedTime = currProject.totalElaspedTime
  //   const newTotalElapsedTime = totalElaspedTime + activePomodoroLength
  //   const elapsedTimeHoursMinutesArray = calculateMinutesAndHours(newTotalElapsedTime)
    // await updateDoc(userTasksRef,{
    //   [`projectsTasks.${activeProject}.totalElaspedTime`]: newTotalElapsedTime,
    //  })
    // await updateDoc(userTasksRef,{
    //   [`projectsTasks.${activeProject}.elaspedTime`]: elapsedTimeHoursMinutesArray,
    //  })
    //  updateTotalElaspedTime(newTotalElapsedTime)
    //  dispatch(FetchTasks())
  // }
  ////////////////////////////////////////////////
  const handleTimeElapsed = async (timeElapsed,activeRunningPomodoroLength) => {
    const newTasksElapsedTimeArray = [...timeElapsed,parseInt(activeRunningPomodoroLength)]
    const newTotalElapsedTime = newTasksElapsedTimeArray.reduce((firstValue,secondValue) => firstValue + secondValue,0)
    const newElapsedHourseMinutesArray = calculateElapsedMinutesAndHours(newTotalElapsedTime)
    dispatch(setElapsedTimeHoursMinutesArray(newElapsedHourseMinutesArray))
     updateDailyWorkHours(activePomodoroLength,dailyWorkHoursArray,currDate)
    await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.elaspedTime`]: newElapsedHourseMinutesArray
     })
    
    dispatch(FetchTasks(userId))
  }
 
  // useEffect(() => {
  //   if(countDownIsRunning)
  //   return pauseCountDown()
  // },[countDownIsRunning])
  // useEffect(() => {
  //   if(countDownRunning) {
  //     start()
  //   }
  //   else {
  //     return
  //   }
  // },[countDownRunning])
  
  const getDate = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + (60 * pomodoroTime));
    return time
   
  };
  //  useEffect(() => {
  //   if(!isRunning && !countDownRunning){
  //     restart(getDate(),false)
  //   }
  // },[countDownRunning,isRunning])
  // console.log(expiryTimestamp);
  const onExpiry = () => {
    workAlarm.play();
    handleTimeElapsed(timeElapsed,parseInt(activePomodoroLength),dailyWorkHoursArray)
    dispatch(resetState());
    restart(getDate(), false);
    dispatch(breakStart());
    // updateElapsedTime(activePomodoroLength)
    dispatch(turnOffCountDownRunning())
    dispatch(turnOffTriggerPlayFromTak())
    dispatch(setIsRunning(isRunning))
  };
  const Style = [styles.FrontPageTime];
  // let classes = [classNames(btnStyles.BtnStart)];
  const startCountDown = (e) => {
    restart(getDate(), false);
    start();
    dispatch(hideStartBtn());
    dispatch(startCounting());
    dispatch(turnOnCountDownRunning())
    dispatch(setIsRunning(isRunning))
  };
   
  // dispatch(updateCurrnetTime({ minute }));
  const pauseCountDown = () => {
    pause();
    dispatch(hidePauseBtn());
    dispatch(showContinueBtn());
    dispatch(showStopBtn());
    dispatch(setIsRunning(isRunning))
  };
  const countinueCountDown = () => {
    resume();
    dispatch(hideContinueBtn());
    dispatch(hideStopBtn());
    dispatch(showPauseBtn());
    dispatch(setIsRunning(isRunning))
  };
  const stopCountDown = () => {
    dispatch(resetState());
    restart(getDate(), false);
    dispatch(showStartBtn());
    dispatch(hideContinueBtn());
    dispatch(hideStopBtn());
    dispatch(turnOffCountDownRunning())
    dispatch(turnOffTriggerPlayFromTak())
    dispatch(setIsRunning(isRunning))
   
  };
  const refresh = () => {
    navigate(0)
  }
  const handleNavigation = () => {
    if(isRunning) {
      setShowCautionMessage(!showCautionMessage)
      navigate('/')
    }
    else if(!userId){
      alert("Please register or login sign in to access this page")
      navigate('/landingPage')

    }
    else{
      navigate("/UserAccount")
    }
    
  }
  const handleNavigationToUserAccount = () => {
    if(isRunning) {
      setShowCautionMessage(!showCautionMessage)
      navigate("/")
    }
     else if(!userId){
      alert("Please register or sign in with your login details to access this page")
      navigate('/landingPage')
    }
    else{
      navigate('/accountDetails')
    }
  }
  const handleNavigationToTimerSettings = () => {
    if(isRunning) {
      setShowCautionMessage(!showCautionMessage)
      navigate("/")
    }
     else if(!userId){
      alert("Please register or sign in with your login details to access this page")
      navigate('/landingPage')
    }
    else{
      navigate('/settings')
    }
  }
  const handleNavigationToProjectsList = () =>{
    if(isRunning) {
      setShowCautionMessage(!showCautionMessage)
      navigate("/")
    }
     else if(!userId){
      alert("Please register or sign in with your login details to access this page")
      navigate('/landingPage')
    }
    else{
      navigate('/Projects')
    }
  }
  const handleNavigationToUserStats = () => {
    if(isRunning) {
      setShowCautionMessage(!showCautionMessage)
      navigate("/")
    }
     else if(!userId){
      alert("Please register or sign in with your login details to access this page")
      navigate('/landingPage')
    }
    else{
      navigate('/reports')
    }
  }
  return (
    <div className={styles.FrontPageMainWrapper}>
      <div className={showCautionMessage ? styles.popUp: styles.hidden} onClick = {() => setShowCautionMessage(!showCautionMessage)}>
        <div className={styles.cautionMessage} >
          <div className={styles.iconConatainer}>
            <ImNotification className={styles.cautionIcon}/>
          </div>
          
         <span>
            You cannot access this page when the counter is running,
            pause or stop the counter in order to access this page
         </span>
        </div>
      </div>
      <div className={styles.timerHeader}>
        <div onClick = {handleNavigation} className={styles.UserAccountLink}>
        <IoIosArrowBack className={styles.navLink} />
      </div>
      <div className={styles.refreshTimer} onClick = {refresh}>
        <ImLoop2 className={styles.refreshIcon}/>
      </div>
      </div>
      <div className={styles.FrontPageWrapper}>
        <div className={styles.FrontPageTime}>
          <div className={styles.timer}>
            { minutes} : { seconds }
          </div>
          <div className={styles.BtnWrapper}>
            <button
              className={running ? btnStyles.BtnStart : btnStyles.BtnHide}
              onClick={startCountDown}
            >
             <ImPlay3 className={btnStyles.btnIcons}/> <span className={styles.btnActionWord}>Start</span>
            </button>
            <button
              className={Pause ? btnStyles.BtnPause : btnStyles.BtnHide}
              onClick={pauseCountDown}
            >
             <ImPause2 className={btnStyles.btnIcons}/> <span className={styles.btnActionWord}>Pause</span>
            </button>
            <div className={btnStyles.BtnWrapper}>
              <button
                className={Continue ? btnStyles.BtnContinue : btnStyles.BtnHide}
                onClick={countinueCountDown}
              >
               <ImPlay3 className={btnStyles.btnIcons}/> <span className={styles.btnActionWord}>Continue</span>
              </button>
              <button
                className={stop ? btnStyles.BtnStop : btnStyles.BtnHide}
                onClick={stopCountDown}
              >
               <ImStop2 className={btnStyles.btnIcons}/> <span className={styles.btnActionWord}>Stop</span>
              </button>
            </div>
          </div>
        
        </div>
        <div className={styles.navContainerWrapper}>
          <nav className={styles.navContainer}>
            <div className={styles.navIcon} onClick = {handleNavigationToUserAccount}>
              <ImUser className={styles.icon}/>  
            </div>
            <div className={styles.navIcon} onClick = {handleNavigationToTimerSettings}>
              <ImHourGlass className={styles.icon}/>
            </div>
            <div className={styles.navIcon} onClick = {handleNavigationToProjectsList}>
              <ImList className={styles.icon}/>
            </div>
            <div className={styles.navIcon} onClick = {handleNavigationToUserStats}>
              <IoBarChart className={styles.icon}/>
            </div>
          </nav>
      </div>
      </div>
      
    </div>
  );
};

export default FrontPage;
