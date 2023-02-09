import React from 'react';
import { Link } from 'react-router-dom';
import { HiChevronLeft } from "react-icons/hi";
import styles from "./projectsCompletedTasks.module.scss"
import { useSelector } from 'react-redux';
import { IoIosCheckmark } from "react-icons/io";
import { HiFolderAdd,HiFolder,HiOutlineFolderAdd,HiOutlineDocument,HiOutlineDocumentText } from "react-icons/hi";
// HiFolderAdd
const ProjectsCompletedTasks = () => {
    const projectsCompletedTasks = useSelector(state => state.settings.projectsCompletedTasks)
    console.log(projectsCompletedTasks);
    return <div className={styles.completedTasksWrapper}>
        <h3 className={styles.completedTasksHeader}>
            <Link to = "/UserAccount" className ={styles.backLink}>
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
    : <div className={styles.fallbackUI}>
        <HiOutlineDocument className={styles.documentIcon}/>
        <span>
            No completed tasks
        </span>
        
    </div>
        }
        
    </div>;
}



export default ProjectsCompletedTasks;