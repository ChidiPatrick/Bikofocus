import React,{useState,useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./UserAccount.module.scss";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch,useSelector } from "react-redux";
import { IoIosAdd} from "react-icons/io";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../Firebase/Firebase"
import { HiChevronLeft } from "react-icons/hi";
import { ImUser } from "react-icons/im";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import { FcSettings, FcTodoList,FcBullish } from "react-icons/fc";
import { 
  getProjectTasks,
  getProjectTitle,
  setProjectId,
  setCurrTasks ,
  setClickedProjectId,
  setCompletedTasks,
	setEstimatedTime,
	setTasksToBeCompleted,
  setElapsedTimeHoursMinutesArray,
  setCompletedTasksArray,
  setTotalEstimatedTaskTime,
  setTasksHourMinutesArray,
  updateNumbersArray,
  setTasksTimesArray
} from "../Settings/SettingsSlice";
import { FcBarChart } from "react-icons/fc";
import {ImFolder} from "react-icons/im";
const UserAccountUI = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const projects = useSelector((state) => state.settings.projects)
  const userTasks = useSelector(state => state.settings.userTasks)
  const numbersArray = useSelector(state => state.settings.numbersArray)
  const avatarURL = useSelector(state => state.settings.userAvatarURL)
  const userBioData = useSelector(state => state.settings.userBioData)
  const [collapseProjectContainer,setCollapseProjectContainer] = useState(false)
  /////////Get projects /////////////////
  const linkRef = useRef()
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
        <div className={styles.listContainer}>
          <div className={styles.avatarLinkWrapper}>
          <div className={[styles.listItem, styles.navBtn].join(" ")}>
            <Link to = "/timerPage" className ={styles.backBtn}>
              <HiChevronLeft className={styles.navigateBackIcon}/>
            </Link>
          </div>
          <div className={[styles.listItem,styles.avatarParentContainer].join(' ')}>
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
          </div>
          </div>
         <div className={styles.innerHeaderWrapper}>
                <div className={styles.listItem}>
               <Link to= '/Projects'>
                  {/* <IoMdFolderOpen className={styles.icon}/> */}
                  < FcTodoList className={styles.icon}/>
              </Link>
          </div>
          <div className={styles.listItem}>
            <Link className={styles.link} to = "/settings">
              <FcSettings className={styles.icon} />
            </Link>
          </div>
          <div className={styles.listItem}>
            <Link className={styles.link} to="/reports">
              <FcBarChart className={styles.icon}/>
            </Link>
          </div>
         </div>
          
        </div>
      </nav>
      {/* <div className={styles.todoWrapper}>
        <div className={styles.todo}>
          <Link className={styles.link} to="/completedTasks">
            <div className={styles.completedLeftWrapper}>
                <BiCheckCircle className={styles.completedIcon} />
              <span className={styles.todayTodo}>Completed Tasks</span>
            </div>
            
            <IoIosArrowForward className={styles.arrowForward}/>
          </Link>
        </div>
      </div> */}
      
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
              <div className={styles.projectFolderAndTitle}>
                <ImFolder className= {styles.projectsFolderIcon}/>
                <div className= {styles.projectsTitleContainer}>My Projects</div>
              </div>
              
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
