import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minute5: 5,
  minute15: 900,
  minute25: 1500,
  minute45: 2700,
  currentTime: null,
  running: true,
  Pause: true,
  Continue: false,
  stop: false,
  break: false,
  counting: false,
  countDownRunning: false,
  triggerPlayFromTask: false,
  activeProject: null,
  isRunning: false
};
const FrontPageSlice = createSlice({
  name: "FrontPage",
  initialState,
  reducers: {
    updateCurrnetTime(state, action) {
      state.currentTime = action.payload;
    },
    resetState(state, action) {
      // state.minute5 = 5;
      // state.minute15 = 900;
      // state.minute25 = 1500;
      // state.minute45 = 2700;
      state.running = true;
      state.Pause = true;
      state.Continue = false;
      state.stop = false;
    },
    startCounting(state, action) {
      state.counting = true;
    },
    endCounting(state, action) {
      state.counting = false;
    },
    hideStartBtn(state, action) {
      state.running = false;
    },
    showStartBtn(state, action) {
      state.running = true;
    },
    hidePauseBtn(state, action) {
      state.Pause = false;
    },
    showPauseBtn(state, action) {
      state.Pause = true;
    },
    showContinueBtn(state, action) {
      state.Continue = true;
    },
    hideContinueBtn(state, action) {
      state.Continue = false;
    },
    showStopBtn(state, action) {
      state.stop = true;
    },
    hideStopBtn(state, action) {
      state.stop = false;
    },
    breakStart(state, action) {
      state.break = true;
    },
    breakEnd(state, action) {
      state.break = false;
    },
    turnOnCountDownRunning(state,action) {
      state.countDownRunning = true
    },
    turnOffCountDownRunning(state,action) {
      state.countDownRunning = false
    },
    setTriggerPlayFromTask(state,action){
      state.triggerPlayFromTask = true
    },
    turnOffTriggerPlayFromTak(state,action){
      state.triggerPlayFromTask = false
    },
    setActiveProject(state,action){
      state.activeProject = action.payload
    },
    setIsRunning(state,action){
      state.isRunning = action.payload
    }
  },
});

export const {
  showStartBtn,
  hideStartBtn,
  showPauseBtn,
  hidePauseBtn,
  showStopBtn,
  hideStopBtn,
  showContinueBtn,
  hideContinueBtn,
  breakEnd,
  breakStart,
  resetState,
  startCounting,
  endCounting,
  updateCurrnetTime,
  turnOffCountDownRunning,
  turnOnCountDownRunning,
  setTriggerPlayFromTask,
  turnOffTriggerPlayFromTak,
  setActiveProject,
  setIsRunning
} = FrontPageSlice.actions;
export default FrontPageSlice.reducer;
