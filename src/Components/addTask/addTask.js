import React,{useRef,useState,useEffect} from "react";
import style from "./addTask.module.scss";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProjectTodos } from "../Settings/SettingsSlice";
import AddTaskComponent from "./addTaskComponent";

const AddTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const currTaskArray = useSelector(state => state.settings.currTasks)
  const [showFinishedTasks,setShowFinishedTask] = useState((false))
  const [tasks,setTasks] = useState(null)
  useEffect(() => {
    if(currTaskArray){
      setTasks(currTaskArray)
    }
  }, [currTaskArray])
   const inputRef = useRef()
    ///Add task handler////////
   return <AddTaskComponent/>
}
;

export default AddTask;
