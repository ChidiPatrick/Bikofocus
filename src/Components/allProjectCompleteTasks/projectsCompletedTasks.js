import React from 'react';
import { Link } from 'react-router-dom';
import { HiChevronLeft } from "react-icons/hi";
import styles from "./projectsCompletedTasks.module.scss"
import {BiCheckCircle } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { IoIosCheckmark } from "react-icons/io";
const ProjectsCompletedTasks = () => {
    const projectsCompletedTasks = useSelector(state => state.settings.projectsCompletedTasks)
    console.log(projectsCompletedTasks);
    return <div className={styles.completedTasksWrapper}>
        <h3 className={styles.completedTasksHeader}>
            <Link to = "/UserAccount" className ={styles.backBtn}>
              <HiChevronLeft className={styles.navigateBackIcon}/>
            </Link>
            <span>Completed Tasks</span>
        </h3>
        {projectsCompletedTasks.length > 0 ?  projectsCompletedTasks.map((task,index) => {
        return <div className={styles.completedTasks} key = {index}>
                <div className={styles.tasksCompletionDate}>
                  <span>{task.date}</span>
                  <span>{task.time}</span>
                </div>
                <div className= {styles.completedTask}>
                    <IoIosCheckmark className={styles.completedBadge} />
                    <div className={styles.taskTitle}>{task.taskTitle}</div>
                </div>
        </div>
        })
    : <div>No completed tasks</div>
        }
        
    </div>;
}



export default ProjectsCompletedTasks;