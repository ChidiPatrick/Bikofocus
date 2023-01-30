import React, {useState} from "react";
import styles from "./ProjectInput.module.scss"
import { useDispatch,useSelector } from "react-redux";
import { addProject,activateProjectBtn,deActivateProjectBtn } from "../AddProjectSlice";
///////////////////////////////////////////////////////
////Project Component////////////
const ProjectInput = ({ placeholder = "New project name", projectColor = "grey",handleValueChange = f => f}) => {
    const dispatch  = useDispatch()
    return (
        <div className={styles.InputWrapper}>
            <div className={styles.InputContainer}>
                <div style={{backgroundColor: `${projectColor}`}} className={styles.colorDisplay}></div>
                <input 
                className={styles.projectInput} 
                type='text' 
                placeholder= {placeholder}
               
                onChange = {(e) => {
                    if(e.target.value){
                        dispatch(activateProjectBtn())
                    }
                    else{
                        dispatch(deActivateProjectBtn())
                    }
                    
                }}
                />
            </div>
            
        </div>
        
    )
}
export default ProjectInput