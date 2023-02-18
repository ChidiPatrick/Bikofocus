import React,{useState,useEffect,useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./UserAccount.module.scss";
import {BiCheckCircle } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch,useSelector } from "react-redux";
import { IoIosAdd,IoIosPricetag,IoIosClose } from "react-icons/io";
import { ImFolderPlus } from "react-icons/im";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../Firebase/Firebase"
// import { async } from "@firebase/util";
// import {doc,getDoc} from "firebase/firestore"
import { HiChevronLeft } from "react-icons/hi";
import { ImUser } from "react-icons/im";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
// FcList
// FcTodoList
// FcBullish
import { FcSettings, FcTodoList,FcBullish } from "react-icons/fc";
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
import { FcBarChart } from "react-icons/fc";
import { IoIosCheckmark } from "react-icons/io";
import {ImFolder} from "react-icons/im";

// ImList2
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
  const numbersArray = useSelector(state => state.settings.numbersArray)
  const avatarURL = useSelector(state => state.settings.userAvatarURL)
  const userBioData = useSelector(state => state.settings.userBioData)
  const [collapseProjectContainer,setCollapseProjectContainer] = useState(false)
  console.log(userTasks);
  /////////Get projects /////////////////
  console.log(projects);
  const removeNum = (array,numIndex) => {
    const newArray = numbersArray.filter((num,index) => numIndex !== index)
    const totalNum = newArray.reduce((i,s) => i+s,0)
    console.log(totalNum);
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
          console.log(userTasks);
          const taskName = project.projectTitle.split(" ").join("")
          dispatch(setClickedProjectId(taskName))
          dispatch(setCurrTasks(userTasks[taskName]))
          dispatch(getProjectTasks(userTasks[taskName].tasks))
          dispatch(getProjectTitle(projects[projectId].projectTitle))
          dispatch(setProjectId(projectId))
          getProjectTaskData(userTasks[taskName])
          navigate("/project")
          return 
        }
      })
    }
    
    
    const handleClicked =  (projects,projectId) => {
      selectProject(projects,projectId)
    }
    const handleProjectsCollapse = () => {
      setCollapseProjectContainer(!collapseProjectContainer)
    }
  return (
    <div className={styles.UserAccountUI}>
      <nav className={styles.Nav}>
        <ul className={styles.listContainer}>
          <li className={[styles.listItem, styles.navBtn].join(" ")}>
            <Link to = "/timerPage" className ={styles.backBtn}>
              <HiChevronLeft className={styles.navigateBackIcon}/>
            </Link>
          </li>
          <li className={[styles.listItem,styles.avatarParentContainer].join(' ')}>
            <Link className={styles.link}  to = "/accountDetails">
                { avatarURL ?
                  <figure className = {styles.settingsAvatar}>
                    <img className={styles.profilePicture} src = {avatarURL}/>
                  </figure>
                  :
                  <ImUser className = {styles.fallbackAvatar}/>
                }
               
            </Link>
             <span className={styles.userName}>{userBioData.userName.slice(0,5).padEnd(8,".")}</span>
          </li>
         
          <li className={styles.listItem}>
               <Link to= '/Projects'>
                  {/* <IoMdFolderOpen className={styles.icon}/> */}
                  < FcTodoList className={styles.icon}/>
              </Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.link} to = {user && user.uid ? "/settings" : "/signInForm" }>
              <FcSettings className={styles.icon} />
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.link} to="/reports">
              <FcBarChart className={styles.icon}/>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.todoWrapper}>
        <div className={styles.todo}>
          <Link className={styles.link} to="/completedTasks">
            <BiCheckCircle className={styles.completedIcon} />
            <span className={styles.todayTodo}>Completed Tasks</span>
            <IoIosArrowForward className={styles.arrowForward}/>
          </Link>
        </div>
      </div>
      
        <div className={styles.addProjectWrapper}>
          <Link className={styles.linkToAddProject} to="/AddProject">
             <div className={styles.AddProject}>
              <div className={styles.innerWrapper}>
                <IoIosAdd className={styles.addProjectIcon} />
              <span>Add Project</span>
              </div>
              <div>
              <IoIosArrowForward className={styles.addTagIcon}/>
              </div>
              </div>
          </Link>
        </div>
        <div className={ styles.projectsFolderWrapper} onClick = {handleProjectsCollapse}>
          <div className={styles.projectsListHeader}>
              <ImFolder className= {styles.projectsFolderIcon}/>
              <div className= {styles.projectsTitleContainer}>My Projects</div>
              <div className={styles.dropDownIconContainer}>
                {
                 collapseProjectContainer ? < IoIosArrowUp className={[styles.projectsFolderIcon, styles.dropDownIcon].join(" ")}/>
                 :
                 <IoIosArrowDown className={[styles.projectsFolderIcon, styles.dropDownIcon].join(" ")}/>
                }
                
              </div>
              
            </div>
          <div className= {collapseProjectContainer ? styles.projectsListContainer : styles.collapseProjects}>
            <div className={ styles.projects }>
          {
          projects && projects.map((project,i) => {
           return <div  className={collapseProjectContainer ? styles.project : styles.collapseProjects} ref = {linkRef} onClick = {() => handleClicked(projects,i)} key = {i}>
              <div className={styles.projectWrapper}>
                <div className={styles.colorAndProjectWrapper}>
                  <div className={styles.projectInnerWrapper}>
                    <span style={{backgroundColor: `${project.projectColor}`}} className={styles.projectColor}></span>
                    <p className={styles.projectName}>{project.projectTitle}</p>
                  </div>
                  <IoIosArrowForward className={styles.addTagIcon}/>
                </div>
              </div>
            </div>
          })
        }
        </div>
          </div>
          
        </div>
    </div>
  );
};
export default UserAccountUI;
