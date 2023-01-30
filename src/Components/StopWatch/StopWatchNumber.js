import React,{useState} from "react";
import StopWatch from "./StopWatch";
import { useDispatch } from "react-redux";
import { setNumSelectedPomodoro } from "../Settings/SettingsSlice";
//Import pomodoro selected
const createArray =   length =>[...Array(length)]
const StopWatchNumber = ({totalNumber = 6}) => {
    const dispatch = useDispatch()
    const [selectedClocks,setSelectedClocks] = useState(0)
    const handleClicks = (index) => {
        const clockNum = index + 1
        setSelectedClocks(clockNum)
        dispatch(setNumSelectedPomodoro(clockNum))
    }
    return (<>
        {createArray(totalNumber)
        .map((n,i) => <StopWatch key={i} selected={selectedClocks > i}
        onSelect={() => handleClicks(i) }
        
        />)}
    </>)
}
export default StopWatchNumber