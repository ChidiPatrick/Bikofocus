import React from "react";
import styles from "./CompletedTask.module.scss"
import { IoIosCheckmark } from "react-icons/io";
////////////////////////////////////////////////
const CompletedTasks = ({completedTasksArray, showFinishedTasks}) => {
    return(
        completedTasksArray.length > 0 ?
        <div className={showFinishedTasks ? styles.finishedTaskComponent : styles.hideTasks}>
            {completedTasksArray.map((task,index) => {
                // const date = new Date(task.date)
              return <div className={styles.finishedTasksWrapper} key = {index}>
                    <div className={styles.taskDate}>
                        <span>{task.date}</span>
                        <span>{task.time}</span>
                    </div>
                    <div className={styles.finishedTaskContainer}>
                        <div className={styles.finishedTaskIconContainer}>
                            <IoIosCheckmark className={styles.finishedTaskIcon}/>
                        </div>
                        <div className={styles.finishedTaskInnerWrapper}>
                            <div className={styles.finishedTask}>{task.taskTitle}</div>
                        </div>
                        
                    </div>
                </div>
            })}
        </div>
        : null
    )
}
export default CompletedTasks