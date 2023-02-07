import React,{useRef,useState,useEffect} from "react";
// import styles from './Tasks.module.scss';
import AddTaskComponent from '../addTask/addTaskComponent';
import style from "../addTask/addTask.module.scss";
import { useNavigate } from "react-router";
import {ButtonBack} from "../NavButtons/NavButton";
import { TbArrowsDownUp } from "react-icons/tb";
// import AddTaskInput from "../addTaskInput/addTaskInput"
import PomodoroSetting from "../PomodoroSetting/PomodoroSetting"
import { useDispatch, useSelector } from "react-redux";
import { 
  getProjectT, 
  getProjectTodos,
  FetchTasks,
  // updateTodaysTasksArray,
  increaseTodaysTasksToBeCompleted,
  setTodaysTotalEstimatedTime,
  setTodaysTaskHoursMinutesArray,
  setCompletedTasks,
  updateProjectTasks, 
  setCompletedTasksArray,
  setNumSelectedPomodoro,
  setTodaysTasksTimeArray,
  setCurrTasks,
  setActivePomodoroLength,
  updateTodaysTasksArray,
  reduceTasksToBeCompleted
} from "../Settings/SettingsSlice";
import { ImBin,ImRadioUnchecked } from "react-icons/im";
import { hidePomodoroSettings,showPomodoroSettings } from "../PomodoroSetting/PomodoroSettingSlice";
import CompletedTasks from "../CompletedTask/CompletedTask";
import { IoMdArrowDropdown } from "react-icons/io";
import { db } from "../Firebase/Firebase";
import { updateDoc,doc, arrayUnion, increment } from "firebase/firestore";
import { setTriggerPlayFromTask } from "../FrontPage/FrontPageSlice";
import { Link } from "react-router-dom";
import { FaChevronLeft } from 'react-icons/fa';



const defaultProps = {};
const TodayTasks = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch()
  const userId =  useSelector((state) => state.signUpSlice.userId)
  const todaysTasks = useSelector(state => state.settings.todaysTasks)
  const taskName = useSelector(state => state.settings.clickedProjectIdentitfier)
  const tasksArray = useSelector(state => state.settings.todaysTasks)
  const tasksToBeCompleted = useSelector(state => state.settings.todaysTasksToBeCompleted)
  const completedTasks = useSelector(state => state.settings.todaysCompletedTasks)
  const pomodoroCurrLength = useSelector(state => state.settings.pomodoroCurrLength)
  const totalEstimatedTasksTime = useSelector(state => state.settings.todaysTotalEstimatedTasksTime)
  const numbSelectedPomodoros = useSelector(state => state.settings.numbSelectedPomodoro)
  // const tasksHoursMinutesArray = useSelector(state => state.settings.tasksHourMinutesArray)
  const [tasksHoursMinutesArray,setTasksHoursMinutesArray] = useState(calculateMinutesAndHours(calcTotalTasksTime(totalEstimatedTasksTime,pomodoroCurrLength,numbSelectedPomodoros)))
  // const [elaspedTimeHoursMinutesArray,setElapsedTimeHoursMinutes] = useState(calculateMinutesAndHours(elapsedTime))
  const todaysCompletedTasksArray = useSelector(state => state.settings.todaysCompletedTasksArray)
  const tasksTimesArray = useSelector(state => state.settings.todaysTasksTimesArray)
  const todaysTasksElaspedTime = useSelector(state => state.settings.todaysTasksElaspedTime)
  const [showUI,setShowUI] = useState(false)
  const [showFinishedTasks,setShowFinishedTask] = useState((false))
  const userTasksRef = doc(db,"users",`${userId}`,`userTasksCollection`,`tasks`)
  const todayTasksArray = useSelector(state => state.settings.todaysTasks)
  console.log(todaysCompletedTasksArray);
   ///////////////////////////////////////////////////////////////
   console.log(todayTasksArray)
//  const tasksHoursMinutesArray =   calculateMinutesAndHours(calcTotalTasksTime(totalEstimatedTasksTime,pomodoroCurrLength,numbSelectedPomodoros))
  
  useEffect(() =>{
    const cleanUp = () => {
      dispatch(setNumSelectedPomodoro(0))
    }
    return cleanUp
  },[totalEstimatedTasksTime])
  function calculateMinutesAndHours(minutes){
    const remainingMinutes = minutes % 60
    const hours = minutes / 60
    dispatch(setTodaysTaskHoursMinutesArray([parseInt(hours),remainingMinutes]))
    return [parseInt(hours),remainingMinutes]
  }
  ///Evaluate this code///
  function calcTotalTasksTime(totalTime,currPomodoroLength,numbSelectedPomodoro) {
    const totalTasksTime = totalTime + (currPomodoroLength * numbSelectedPomodoro)
    console.log(totalTasksTime);
    return totalTasksTime
  }
  const updateTasksHourMinutesArray = (minutes) => {
    const remainingMinutes = minutes % 60
    const hours = minutes / 60
    setTasksHoursMinutesArray([parseInt(hours),remainingMinutes])
  }
  const addTaskTimeToTasksTimesArray = async (tasksTimesArray,currPomodoroLength,numbSelectedPomodoros) => {
    const newTime = currPomodoroLength * numbSelectedPomodoros
    const newArray = [...tasksTimesArray,newTime]
    dispatch(setTodaysTasksTimeArray(newArray))
    // console.log(`New Time: ${newTime} /n New Time Array: ${newArray}, Old array: ${tasksTimesArray}`);
    await updateDoc(userTasksRef,{
      [`tasksCategories.today.tasksTimesArray`]: newArray
    })
  }
  /////////Update Tasks in the server ////
  const todaysTaskUpdateHandler = async (task,updatedTaskArray) => {
    const newTasksObjectArray = [...updatedTaskArray,task]
    await updateDoc(userTasksRef,{
      [`tasksCategories.today.tasks`]: newTasksObjectArray
    })
  }
  const incrementTasksTodo = async (tasksToBeCompleted) => {
    const totalTasks = tasksToBeCompleted + 1
    console.log(totalTasks)
    dispatch(increaseTodaysTasksToBeCompleted())
    await updateDoc(userTasksRef,{
      [`tasksCategories.today.tasksToBeCompleted`]: totalTasks
    })
  }
  const decrementTasksTodo = async (tasksToBeCompleted) => {
    if(tasksToBeCompleted === 0) return
    const newTasksToBeCompletedNum = tasksToBeCompleted - 1
   dispatch(reduceTasksToBeCompleted(newTasksToBeCompletedNum))
   await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.tasksToBeCompleted`]: newTasksToBeCompletedNum
    })
  }
  const removeTaskTime = async (tasksTimesArray,tasksIndex) => {
    //1. Remove task time
    const newTasksTimesArray = tasksTimesArray.filter((task,index) => tasksIndex !== index)
    //2. Update tasksTimesArray
    dispatch(setTodaysTasksTimeArray(newTasksTimesArray))
    await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.tasksTimesArray`]: newTasksTimesArray
    })
    //3. Calculate total estimated task time
    const newTotalEstimatedTasksTime = newTasksTimesArray.reduce((firstValue,secondValue) => firstValue + secondValue,0)
    //4. Update total estimated task time
    dispatch(setTodaysTotalEstimatedTime(newTotalEstimatedTasksTime))
    const newTasksHoursMinutesArray = calculateMinutesAndHours(calcTotalTasksTime(newTotalEstimatedTasksTime,pomodoroCurrLength,numbSelectedPomodoros))
    setTasksHoursMinutesArray(newTasksHoursMinutesArray)
      await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.totalEstimatedTasksTime`]: newTotalEstimatedTasksTime
    })
}
  const updateTotalTasksTime = async (totalTasksTime) => {
    dispatch(setTodaysTotalEstimatedTime(totalTasksTime))
     await updateDoc(userTasksRef,{
      [`tasksCategories.today.totalEstimatedTasksTime`]: totalTasksTime
     })
  }

   const inputRef = useRef()
    ///Add task handler////////
    console.log(todaysTasks);
    ///Handle   Add task ////
    const handleAddTask = () => {
    if(inputRef.current.value === ""){
      setShowUI(false)
       return
      }
    inputRef.current.blur()
    dispatch(getProjectTodos(inputRef.current.value))
    dispatch(updateTodaysTasksArray(inputRef.current.value))
    todaysTaskUpdateHandler(inputRef.current.value,todaysTasks,tasksArray)
    incrementTasksTodo(tasksToBeCompleted)
    dispatch(FetchTasks(userId))
    const totalTasksTime = calcTotalTasksTime(totalEstimatedTasksTime,pomodoroCurrLength,numbSelectedPomodoros)
    calculateMinutesAndHours(totalTasksTime)
    updateTasksHourMinutesArray(totalTasksTime)
    updateTotalTasksTime(totalTasksTime)
    addTaskTimeToTasksTimesArray(tasksTimesArray,pomodoroCurrLength,numbSelectedPomodoros)
    setShowUI(false)
    inputRef.current.value = ""
    
  }
  const updateCurrTasksArray = (currTasksArray,taskIndex) => {
    const newTasksArray =  currTasksArray.filter((task,index) => index !== taskIndex) 
    console.log(newTasksArray);
    dispatch(updateProjectTasks(newTasksArray))
   
  }
  const updateCompletedTasksArray = async (completedTasksArray,tasksArray,index) => {
    const date = new Date().toString()
    const completedTaskTitle = tasksArray[index]
    const newCompletedTasksArray = [...completedTasksArray,{taskTitle: completedTaskTitle,date}]
    console.log(newCompletedTasksArray);
    dispatch(setCompletedTasksArray(newCompletedTasksArray))
     await updateDoc(userTasksRef,{
    [`projectsTasks.${taskName}.completedTasksArray`]: newCompletedTasksArray
     })
  }
  const removeAndUpdateTaskFromTasksArray = async (taskIndex,tasksArray,completedTasksArray) => {
    const newCompletedTasksArray = [...completedTasksArray,tasksArray[taskIndex]]
    dispatch(setCompletedTasksArray(newCompletedTasksArray))
   const newTasksArray = tasksArray.filter((task,index) => index !== taskIndex)
   console.log(newTasksArray);
   dispatch(setCurrTasks(newTasksArray))
   await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.tasks`]: newTasksArray
     })
  }
  const handleComplete = async (index,totalEstimatedTasksTime,tasksTimesArray,tasksArray,completedTasksArray) => {
    updateCurrTasksArray(tasksArray,index)
    const numCompletedTasks = completedTasks + 1
    dispatch(setCompletedTasks(numCompletedTasks))
    removeTaskTime(tasksTimesArray,index)
    removeAndUpdateTaskFromTasksArray(index,tasksArray,completedTasksArray)
    decrementTasksTodo(tasksToBeCompleted)
    updateCompletedTasksArray(completedTasksArray,tasksArray,index)
    await updateDoc(userTasksRef,{
      [`projectsTasks.${taskName}.completedTasks`]: increment(1),
     })
  }
  const toggleDisplay = () => {
    if(showFinishedTasks) {
      setShowFinishedTask(false)
    }
    else{
      setShowFinishedTask(true)
    }
  }
  const handleStart = () => {
    dispatch(setTriggerPlayFromTask())
    dispatch(setActivePomodoroLength(pomodoroCurrLength))
    
     navigate('/')
  } 
  
  return (
    <div className={style.TaskWrapper}>
      <div className={style.TaskHeaderWrapper}>
        <Link to = "/UserAccount" className={style.linkBtn}><FaChevronLeft/></Link>
        <h2 className={style.TaskHeader}>Today</h2>
        <button className={style.sort} >
          <TbArrowsDownUp />
        </button>
      </div>
      <div className={style.TaskTimeWrapper}>
        <div className={style.TaskTimeEstimateWrapper}>
          <div className={style.TaskTimePartition}>
            <span className={style.TaskTimeUnit}>HH</span>
            <span className={style.TaskTimeUnit}>MM</span>
          </div>
          <div className={style.TaskEstimatedTime}>
            <span>
               {tasksHoursMinutesArray[0] < 10 ? `0${tasksHoursMinutesArray[0]}` : tasksHoursMinutesArray[0]}
            </span>
             <span>:</span>
             <span>
               {tasksHoursMinutesArray[1] < 10 ? `0${tasksHoursMinutesArray[1]}` : tasksHoursMinutesArray[1]}
             </span>
          </div>
          <span className={style.TaskTimeUnit}>Estimated Time</span>
        </div>
        <div className={style.TaskTobeCompletedWrapper}>
        <div className={style.TaskTimePartition}>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
          </div>
          <div className={style.TaskTobeCompleted}>{tasksToBeCompleted}</div>
          <span className={style.TaskTimeUnit}>Tasks todo</span>
        </div>
        <div className={style.ElapsedTimeWrapper}>
          <div className={style.TaskTimePartition}>
            <span className={style.TaskTimeUnit}>HH</span>
            <span className={style.TaskTimeUnit}>MM</span>
          </div>
          {/* <div className={style.TaskEstimatedTime}>
            <span>
               {todaysTasksElaspedTime[0] < 10 ? `0${todaysTasksElaspedTime[0]}` : todaysTasksElaspedTime[0]}
            </span>
             <span>:</span>
             <span>
              
                {todaysTasksElaspedTime[1] < 10 ? `0${todaysTasksElaspedTime[1]}` : todaysTasksElaspedTime[1]}
              
             </span>
          </div> */}
          <span className={style.TaskTimeUnit}>Elasped Time</span>
        </div>
        <div className={style.TaskCompletedWrapper}>
        <div className={style.TaskTimePartition}>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
            <span className={style.TaskTimeUnit}>&nbsp;</span>
          </div>
          <div className={style.TaskEstimatedTime}>{completedTasks}</div>
          <span className={style.TaskTimeUnit}>Completed Tasks</span>
        </div>
      </div>
      
      
    <input type = "text" placeholder="+ Add a task..." 
        className={ style.addTaskInputNotFocused }
        ref={inputRef}
       onClick={() => setShowUI(true)}
        />
         
     <div className={style.tasksWrapper}>
        {todayTasksArray.length > 0 ? todayTasksArray.map((task, i) => {
        return (<div className={style.taskContainer} key ={i}>
          <div className={style.circle} onClick = {() => handleComplete(i,totalEstimatedTasksTime,tasksTimesArray,tasksArray,todaysCompletedTasksArray)}></div>
           <div className={style.task}>
            <span>{task}</span>
            <span onClick={handleStart}>Play</span>
          </div>
        </div>)
      } ) : null}
      </div>
      <div className={style.hideShowFinishedTaskContainer} onClick ={toggleDisplay}>
        <div className={style.hideShowFinishedTask}>
          <span >{showFinishedTasks ? "Hide" : "Show"} completed tasks </span>
          <IoMdArrowDropdown className={style.dropDownIcon}/>
        </div>
      </div>
      <CompletedTasks showFinishedTasks={showFinishedTasks} todaysCompletedTasksArray = {todaysCompletedTasksArray}/>
     <PomodoroSetting showUI ={showUI} handleAddTask={handleAddTask}/>
     
    </div>
  );

}

export default TodayTasks;