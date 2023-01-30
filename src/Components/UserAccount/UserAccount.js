import React,{useState,useEffect,useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./UserAccount.module.scss";
import {
  FaChartLine,
  FaSeedling,
  FaUserFriends,
  FaSun,
  FaRegCalendarCheck,
  FaRegCalendarAlt,
  WiSunrise,
} from "react-icons/fa";
import { BiCalendar, BiCheckCircle } from "react-icons/bi";
import { IoIosSettings, IoIosSearch } from "react-icons/io";
// import SearchInput from "../SearchInput/SearchInput"
import { MdEventNote, MdOutlineWbTwilight } from "react-icons/md";
// import {ButtonBack} from '../NavButtons/NavButton'
// import AddProject from "../AddProject/AddProject";
import { useDispatch,useSelector } from "react-redux";
import { IoIosAdd,IoIosPricetag,IoIosClose } from "react-icons/io";
import { ImFolderPlus } from "react-icons/im";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../Firebase/Firebase"
// import { async } from "@firebase/util";
import { db } from "../Firebase/Firebase";
// import {doc,getDoc} from "firebase/firestore"
import { HiChevronLeft } from "react-icons/hi";
import { 
  getProjectTasks,
  getProjectTitle,
  getProjectTodos,
  setProjectId,
  setCurrTasks ,
  setClickedProjectId,
  setCompletedTasks,
	setEstimatedTime,
	setTasksToBeCompleted,
	// setTimeElasped,
  setElapsedTimeHoursMinutesArray,
  setCompletedTasksArray,
  setTotalEstimatedTaskTime,
  setTasksHourMinutesArray,
  updateNumbersArray,
  setTasksTimesArray
} from "../Settings/SettingsSlice";
// import {persistor} from "../Store/Store"
// import { FetchTasks } from "../Settings/SettingsSlice";

const UserAccountUI = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user,loadingUser,loginError] = useAuthState(auth);
  const projects = useSelector((state) => state.settings.projects)
  const tasks = useSelector(state => state.settings.tasks)
  // const [projects,setProjects] = useState(projectsData)
  const userId = useSelector(state => state.signUpSlice.userId)
  const userTasks = useSelector(state => state.settings.userTasks)
  const projectCurrTask = useSelector(state => state.settings.projectTasks)
  const currPomodoroLength = useSelector(state => state.settings.pomodoroCurrLength)
  const numbSelectedPomodoros =  useSelector(state => state.settings.numbSelectedPomodoro)
  const numbersArray = useSelector(state => state.settings.numbersArray)
  console.log(userTasks);
  /////////Get projects /////////////////
  // let finishedTasksArray = [1,2,3,4,5,6,7,8,9,10]
  // const [numArray,setNumArray] = useState(numbersArray)
  const removeNum = (array,numIndex) => {
    const newArray = numbersArray.filter((num,index) => numIndex !== index)
    const totalNum = newArray.reduce((i,s) => i+s,0)
    console.log(totalNum);
    // setNumArray(newArray)
    // finishedTasksArray = newArray
    // console.log(newArray);
    dispatch(updateNumbersArray(newArray))
  }
  console.log(numbersArray);
  const linkRef = useRef()
  console.log(projects);
  const loadingSpinner = <div className={styles.loadingSpinner}>
			<span className={styles.loader}></span>
		</div>
   function calculateMinutesAndHours(minutes){
    const remainingMinutes = minutes % 60
    const hours = minutes / 60
    dispatch(setTasksHourMinutesArray([parseInt(hours),remainingMinutes]))
    return [parseInt(hours),remainingMinutes]
  }
  
  function calcTotalTasksTime(totalTime,currPomodoroLength,numbSelectedPomodoro) {
    const totalTasksTime = totalTime + (currPomodoroLength * numbSelectedPomodoro)
    console.log(totalTasksTime);
    return totalTasksTime
  }
    const getProjectTaskData = (projectTask) => {
      dispatch(setCompletedTasks(projectTask.completedTasks))
      dispatch(setTasksToBeCompleted(projectTask.tasksToBeCompleted))
      dispatch(setElapsedTimeHoursMinutesArray(projectTask.elaspedTime))
      dispatch(setEstimatedTime(projectTask.estimatedTime))
      dispatch(setCompletedTasksArray(projectTask.completedTasksArray))
      dispatch(setTotalEstimatedTaskTime(projectTask.totalEstimatedTasksTime))
      dispatch(setTasksTimesArray(projectTask.tasksTimesArray))
    }
    const selectProject = (projects,projectId) => {
      projects.filter((project,index) => {
        if (index === projectId){
          const taskName = project.projectTitle.split(" ").join("")
          dispatch(setClickedProjectId(taskName))
          dispatch(setCurrTasks(userTasks[taskName]))
          dispatch(getProjectTasks(userTasks[taskName].tasks))
          dispatch(getProjectTitle(project.projectTitle))
          dispatch(setProjectId(projectId))
          getProjectTaskData(userTasks[taskName])
          navigate("/todayTodo")
          return 
        }
      })
    }
    
    
    const handleClicked =  (projects,projectId) => {
      //1.Get selected project from projects object and dispatch add task action
      selectProject(projects,projectId)
     
      //2. Get selected project's task object
      //3. Add task to task store
      console.log("clicked");
    }
  return (
    <div className={styles.UserAccountUI}>
      <nav className={styles.Nav}>
        <ul className={styles.listContainer}>
          <li className={styles.listItem}>
            <Link to = "/" className ={styles.backBtn}>
              <HiChevronLeft className={styles.navigateBackIcon}/>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.link} to = {user && user.uid ? "/settings" : "/signInForm" } >
            
              <IoIosSettings className={styles.settingLink} />
            </Link>
          </li>
         
          <li className={styles.listItem}>
            <Link className={styles.link} to="/community">
              <FaUserFriends className={styles.icon} />
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.link} to="/Sunlight">
              <FaSeedling className={styles.icon} />
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.link} to="/statistics">
              <FaChartLine className={styles.icon} />
            </Link>
          </li>
        </ul>
      </nav>
      {/* <SearchInput/> */}
      {/* <input type="search" placeholder="Search" className={styles.search} /> */}
      <div className={styles.todoWrapper}>
        <div className={styles.todo}>
          <Link className={styles.link} to="/todayTodo">
            <FaSun className={styles.sunIcon} />
            <span className={styles.todayTodo}>Today</span>
          </Link>
          
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/tomorrowTodo">
            <MdOutlineWbTwilight className={styles.tomorrowIcon} />
            <span className={styles.todayTodo}>Tomorrow</span>
          </Link>
          
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/upcomingTodo">
            <FaRegCalendarCheck className={styles.upcomingIcon} />
            <span className={styles.todayTodo}>Upcoming</span>
          </Link>
          
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/somedayTodo">
            <FaRegCalendarAlt className={styles.somedayIcon} />
            <span className={styles.todayTodo}>Someday</span>
          </Link>
          
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/events">
            <MdEventNote className={styles.eventIcon} />
             <span className={styles.todayTodo}>Events</span>
          </Link>
         
        </div>
        <div className={styles.todo}>
          <Link className={styles.link} to="/completed">
            <BiCheckCircle className={styles.completedIcon} />
            <span className={styles.todayTodo}>Completed</span>
          </Link>
          
        </div>
        
          
      </div>
      <div className={styles.projects}>
          {

          projects && projects.map((project,i) => {
           return <div  className={styles.project} ref = {linkRef} onClick = {() => handleClicked(projects,i)} key = {i}>
              <div className={styles.projectWrapper}>
                <div className={styles.colorAndProjectWrapper}>
                  <span style={{backgroundColor: `${project.projectColor}`}} className={styles.projectColor}></span>
                  <p className={styles.projectName}>{project.projectTitle}</p>
                </div>
                  <div>
                    <span className={styles.focusTime}>45m</span>
                    <span className={styles.numberOfTask}>3</span>
                  </div>
              </div>
            </div>
          })
        }
        </div>
        <div className={styles.addProjectWrapper}>
          <Link className={styles.linkToAddProject} to="/AddProject">
             <div className={styles.AddProject}>
              <div className={styles.innerWrapper}>
                <IoIosAdd className={styles.addProjectIcon} />
              <span>Add Project</span>
              </div>
              <div>
              <IoIosPricetag className={styles.addFolderIcon}/>
              <ImFolderPlus className={styles.addTagIcon}/>
              </div>
              </div>
          </Link>
        </div>
        {/* <div style={{display: "flex",width: '100%', justifyContent: "space-around"}}>
      {numbersArray.map((time,index) =>{
        return <div onClick={() => removeNum(numbersArray,index)}>{time}</div>
      })}
     </div> */}
    </div>
  );
};
export default UserAccountUI;
