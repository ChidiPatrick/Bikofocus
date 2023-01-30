import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    stopWatchIcon: false,
    inputElementFocused: false
}
const PomodoroSettingSlice = createSlice({
    name: "PomodoroStetting",
    initialState,
    reducers: {
        blurStopWatchIcon(state,action){
            state.stopWatchIcon = false
        },
        showStopWatchIcon (state,action){
            state.stopWatchIcon = true
        },
        showPomodoroSettings(state,action){
            state.inputElementFocused = true
        },
        hidePomodoroSettings(state,action){
            state.inputElementFocused = false
        }
    }

})
export const {
    blurStopWatchIcon,
    showStopWatchIcon,
    hidePomodoroSettings,
    showPomodoroSettings
} = PomodoroSettingSlice.actions;
export default PomodoroSettingSlice.reducer