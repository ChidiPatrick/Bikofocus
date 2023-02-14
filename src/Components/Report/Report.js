import React from "react"
import styles from "./Report.module.scss"
import { Link } from "react-router-dom"
import { HiChevronLeft } from "react-icons/hi";
import {
    LineChart,
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
import { useSelector } from "react-redux";

const Report = () => {
  const dailyWorkHours = useSelector(state => state.settings.dailyWorkHours)
  console.log(dailyWorkHours);
  const data = []
  const focusedTimeData = dailyWorkHours.map((dailyWorkObject,i) =>{
    data.push({date: new Date(dailyWorkObject.date).toLocaleDateString(), totalWorkHours: dailyWorkObject.totalDailyWorkHours})
  })
  console.log(data);
    return <div className={styles.reportsWrapper}>
            <div className= {styles.headerContainer}>
              <Link to = "/UserAccount" className={styles.navLink}>
                <HiChevronLeft className= {styles.navLinkIcon}/>
              </Link>
              <h3 className= {styles.mainHeader}>Report</h3>
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.chartHeader}>
                    <h4 className={styles.header}>Focus Time Chart</h4>
                    <div className={styles.reportSummaryWrapper}>
                        <div>Top: 8h 15m</div>
                        <div>Average 4h 33m</div>
                    </div>
                </div>
                <div>
                    <h4 className={styles.graphHeader}>Daily Chart Of Focused Time </h4>
                    <ResponsiveContainer  width={"100%"} height = {300}>
                        <BarChart
                        width={100}
                        height = {300}
                        data = {data}
                        margin = {
                            {
                             top:5,
                             right:30,
                             left: 20,
                             bottom: 5
                            }}
                        
                    >
                        <CartesianGrid strokeDasharray = "1" vertical = ""/>
                        <XAxis dataKey= "date" />
                        <YAxis />
                        <Tooltip/>
                        <Bar dataKey= "totalWorkHours" name="Work Hours" fill = "#dd2b0c" barSize={20}/>
                    </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
                
          </div>
}
export default Report