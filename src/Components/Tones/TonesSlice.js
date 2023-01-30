import React from "react";
import {creacteSlice, createSlice} from "@reduxjs/toolkit"
// import 
const initialState = {
    workAlarm: "Bell",
    breakAlarm: "Impact"
};
const TonesSlice = createSlice({
    name: "Tones",
    initialState,
    reducers: {
        getWorkAlarmTone(state,action){
            state.workAlarm = action.payload
            console.log( action.payload);
        },
        getBreakAlarmTone(state,action) {
            state.breakAlarm = action.payload
        }
         
    }
})
export const {getWorkAlarmTone,getBreakAlarmTone} = TonesSlice.actions;
export default TonesSlice.reducer