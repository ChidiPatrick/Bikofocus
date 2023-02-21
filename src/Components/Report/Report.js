import React,{useState} from "react"
import styles from "./Report.module.scss"
import { Link } from "react-router-dom"
import { HiChevronLeft } from "react-icons/hi";
import {
    BarChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts"
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import {setDailyWorkHours} from "../Settings/SettingsSlice"

const Report = () => {
  const dispatch = useDispatch()
  const dailyWorkHours = useSelector(state => state.settings.dailyWorkHours)
   const projects = useSelector((state) => state.settings.projects)
   const userTasks = useSelector(state => state.settings.userTasks)
   const [showProjects,setShowProjects] = useState(false)
  ///Format Date //////////////
  const formatDate = (taskDate) => {
    const date = new Date(taskDate)
    const monthNum = date.getMonth()
    let  month = null
    const dayOfMonth = date.getDate()
    switch(monthNum) {
      case 0: {
        month = "Jan"
        break
      }
      case 1: {
        month = "Feb"
        break
      }
      case 2: {
        month = "Mar"
        break
      }
      case 3: {
        month = "April"
        break
      }
      case 4: {
        month = "May"
        break
      }
      case 5: {
        month = "Jun"
        break
      }
      case 6: {
        month = "Jul"
        break
      }
       case 7: {
        month = "Aug"
        break
      }
       case 6: {
        month = "Sept"
        break
      }
       case 6: {
        month = "Oct"
        break
      }
       case 6: {
        month = "Nov"
        break
      }
       case 6: {
        month = "Dec"
        break
      }
    }
    return `${dayOfMonth} ${month}`
  }
  let totalHours = 0;
  let averageTime = 0
  const data = []
  ///////////////////////////////////////////
  function calculateMinutesAndHours(minutes){
    if(minutes === NaN) return
    const remainingMinutes = minutes % 60
    const hours = minutes / 60
    return [parseInt(hours),parseInt(remainingMinutes)]
  }
  /////////////////////////////////////
  const focusedTimeData = dailyWorkHours.map((dailyWorkObject,i) =>{
    const cur = formatDate(dailyWorkObject.date)
    totalHours = totalHours + dailyWorkObject.totalDailyWorkHours
    averageTime = totalHours / (i + 1)
    data.push({date: formatDate(dailyWorkObject.date), totalWorkHours: (dailyWorkObject.totalDailyWorkHours / 60).toFixed(2)})
  })
  const totalHoursTimeArray = calculateMinutesAndHours(totalHours)
 const averageTimesArray = calculateMinutesAndHours(averageTime)

 ////////////////////////////////////////////////
 const projectSelectionHandler = (e) =>{
  const projectTitle = e.target.innerText
  const projectId = projectTitle.split(" ").join("")
  const projectObject = userTasks[projectId]
  const projectDailyWorkHoursArray = projectObject.dailyWorkHoursArray
  console.log(projectDailyWorkHoursArray);
  dispatch(setDailyWorkHours(projectDailyWorkHoursArray))
  setShowProjects(!showProjects)
 }
    return <div className={styles.reportsWrapper}>
            <div className= {styles.headerContainer}>
              <Link to = "/UserAccount" className={styles.navLink}>
                <HiChevronLeft className= {styles.navLinkIcon}/>
              </Link>
              <h3 className= {styles.mainHeader}>Report</h3>
            </div>
            <div className={styles.projectSelectionWrapper}>
              <div className={ styles.selectProjectHeader } onClick = {() => setShowProjects(!showProjects)}>
                <span>Select Project</span>
                <IoIosArrowDown/>
              </div>
              {projects.map((project,index) => {
                return <div className={showProjects ? styles.projectsWrapper : styles.hidden} key = {index}>
                    <div className={styles.projectTitle} onClick = {projectSelectionHandler} >
                    {project.projectTitle}
                    </div>
              </div>
              })
              }
              
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.chartHeader}>
                    <h4 className={styles.header}>Focus Time Chart</h4>
                        <div className={styles.timeSummary}>Total: {totalHoursTimeArray[0] !== NaN ? totalHoursTimeArray[0]: 0}hrs : {totalHoursTimeArray[1] !== NaN ? totalHoursTimeArray[1]: 0}min</div>
                        <div className={styles.timeSummary}>Average: {averageTimesArray[0] !== NaN ? averageTimesArray[0] : 0}hrs : {averageTimesArray[1] !== NaN ? averageTimesArray[1] : 0}min</div>
                </div>
                <div className = {styles.chartWrapper}>
                    <h4 className={styles.graphHeader}>Daily Chart Of Focused Time </h4>
                    <ResponsiveContainer  width={"100%"} height = {300}>
                        <BarChart
                        width={100}
                        height = {300}
                        data = {data}
                        margin = {
                            {
                             top:5,
                             right:5,
                             left: 0,
                             bottom: 5
                            }}
                       maxBarSize = {20} 
                       barSize = {10}
                       barGap = {2}
                        
                    >
                        <CartesianGrid strokeDasharray = "1" vertical = ""/>
                        <XAxis dataKey= "date" />
                        <YAxis />
                        <Tooltip 
                        contentStyle={{
                          backgroundColor: "red",
                          color: "#fff",
                          borderRadius: "10px",
                          overflowX: "scroll"

                          
                        }}
                          itemStyle={{
                            color: "#fff"
                          }}
                        />
                        <Bar 
                        dataKey= "totalWorkHours" 
                        name="Time" 
                        fill = "#dd2b0c" 
                        barSize={20}
                        
                        
                        unit = "Hrs"
                        />
                    </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
                
          </div>
}
export default Report