import React,{useRef,useState,Suspense,useEffect} from "react";
import style from "./addTask.module.scss";
import { useNavigate } from "react-router";
import {ButtonBack} from "../NavButtons/NavButton";
import { TbArrowsDownUp } from "react-icons/tb";
// import AddTaskInput from "../addTaskInput/addTaskInput"
import PomodoroSetting from "../PomodoroSetting/PomodoroSetting"
import { useDispatch, useSelector } from "react-redux";
import { ImOpt } from "react-icons/im";
import { getProjectT, getProjectTodos } from "../Settings/SettingsSlice";
import { ImBin,ImRadioUnchecked } from "react-icons/im";
import { hidePomodoroSettings,showPomodoroSettings } from "../PomodoroSetting/PomodoroSettingSlice";
import CompletedTasks from "../CompletedTask/CompletedTask";
import { IoMdArrowDropdown } from "react-icons/io";
import AddTaskComponent from "./addTaskComponent";
import { createResource } from "../PersonApi/PersonApi";

const AddTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const projects = useSelector(state => state.settings.projects)
  const currTaskArray = useSelector(state => state.settings.currTasks)
  const projectTitle = useSelector(state => state.settings.taskProjectTitle)
  const projectCurrTask = useSelector(state => state.settings.projectTasks)
  const taskDataAvailable = useSelector(state => state.settings.taskDataAvailable)
  const [showUI,setShowUI] = useState(false)
  const [showFinishedTasks,setShowFinishedTask] = useState((false))
  const [tasks,setTasks] = useState(null)
  console.log(taskDataAvailable);
  useEffect(() => {
    if(currTaskArray){
      setTasks(currTaskArray)
    }
  }, [currTaskArray])
  console.log(tasks);
  const moveToPreviousePage = () => {
    navigate(-1);
  };
   const inputRef = useRef()
    ///Add task handler////////
    const handleAddTask = () => {
    if(inputRef.current.value === ""){
      setShowUI(false)
       return
      }
    inputRef.current.blur()
    dispatch(getProjectTodos(inputRef.current.value))
    setShowUI(false)
    inputRef.current.value = ""
  }
  const handleComplete = () => {
    console.log("clicked");
  }
  const toggleDisplay = () => {
    if(showFinishedTasks) {
      setShowFinishedTask(false)
    }
    else{
      setShowFinishedTask(true)
    }
  }
  // const resource = createResource()
	const loadingSpinner = <div className={style.loadingSpinner}>
			<span className={style.loader}></span>
		</div>
  return ( taskDataAvailable ?  <AddTaskComponent/> : loadingSpinner)
}
;

export default AddTask;
