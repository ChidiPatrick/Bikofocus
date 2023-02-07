import { async } from '@firebase/util';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {doc,getDoc} from "firebase/firestore"
import { act } from 'react-dom/test-utils';
import { db } from '../Firebase/Firebase';
const initialState = {
	pomodoroLengthSelected: false,
	shortBreakLengthSelected: false,
	longBreakLengthSelected: false,
	longBreakAfterSelected: false,
	pomodoroCurrLength: 45,
	shortBreakCurrLength: 10,
	longBreakCurrLength: 15,
	longBreakAfterCurrLength: 4,
	goForBreak: false,
	autoStartNextPomodoro: false,
	autoStartBreak: true,
	workAlarm: "Bell2",
	userSettings: null,
	projects: [],
	currTasks: null,
	userTasks: null,
	activeRunningPomodoroLength: 0,
	/// Projects parent tasks object
	tasks: null,
	////////
	taskHeader: null,
	///Container for clicked project tasks to perform
	projectTasks: [],
	projectId: 0,
	currTasksArray: null,
	clickedProjectIdentitfier: null,
	tasksToBeCompleted: 0,
	completedTasks: 0,
	elapsedTime: 0,
	elapsedTimeHoursMinutesArray: [0,0],
	estimatedTime: 0,
	numbSelectedPomodoro: 0,
	totalEstimatedTasksTime: 0,
	tasksHourMinutesArray: [0,0],
	completedTasksArray: [],
	tasksTimesArray: [],
	userBioData: null,
	userAvatarURL: null,
	popUp: false,
	changePasswordPopUp: false,
	changeUsername: false,
	todayTasksObject: null,
	someDayTasks: [],
	tomorrowTasks: [],
	upcomingTasks: [],
	tasksCategory: "today",
	showTasksCategoryPopUp: false,
	/////Today Tasks state/////////////
	todaysTasksEstimatedTimeArray: [0,0],
	todaysCompletedTasks: 0,
    todaysTasksToBeCompleted: 0,
    todaysEstimatedTasksTime: 0,
    todaysTasksElaspedTime: [0,0],
    todaysTasks: [],
    todaysTotalEstimatedTasksTime: 0,
    todaysCompletedTasksArray: [],
    todaysTasksTimesArray: [],
	todaysTasksHoursMinutesArray: [0,0]
	
};
export const fetchUserSettings = createAsyncThunk("settings/fetchUserSettings", async (userId,{dispatch,getState}) =>{
	try{
		const settingsRef = doc(db,"users",`${userId}`,"userSettingsCollection","settings")
		const data = await getDoc(settingsRef)
    	if(data.exists()){
        console.log(data.data());
		dispatch(getUserProjects(data.data().projects))
		console.log(data.data().projects);
         return data
   	 }
	}
	catch(err) {
		console.log(err);
	}
})
export const FetchTasks = createAsyncThunk("settings/fetchProjectTasks",async (userId,{dispatch,getState}) =>{
	try{
		const userTasksDoc = doc(db,"users",`${userId}`,"userTasksCollection","tasks")
		const data = await getDoc(userTasksDoc)
    	if(data.exists()){
		const userProjectTasks = data.data().projectsTasks
		const tasksByCategories = data.data().tasksCategories
		dispatch(setUserTasks(userProjectTasks))
		dispatch(setTodayCategoryTasks(tasksByCategories.today))
		dispatch(setTomorrowCategoryTasks(tasksByCategories.tomorrow))
		dispatch(setUpcomingCategoryTasks(tasksByCategories.upcoming))
		dispatch(setSomedayCategoryTasks(tasksByCategories.someday))
		dispatch(setTaskDataAvailable())
		console.log(userProjectTasks);
		
   	 }
	}
	catch(err) {
		console.log(err);
	}
})
export const FetchUserBioData = createAsyncThunk("settings/fetchUserBioData",async (userId,{dispatch,getState}) =>{
	try{
		const userBioInfo = doc(db,"users",`${userId}`,"userInfoFolder","userData")
		const data = await getDoc(userBioInfo)
    	if(data.exists()){
		const userBioData = data.data()
		dispatch(userBioInfo)
   	 }
	}
	catch(err) {
		console.log(err);
	}
})
export const FetchUserData = createAsyncThunk("settings/fetchUserData",async (userId,{dispatch,getState}) =>{
	try{
		const userDataRef = doc(db,"users",`${userId}`,"userInfoFolder","userData")
		const userData = await getDoc(userDataRef)
		if(userData.exists()){
			const userBio = userData.data()
			dispatch(setUserBioData(userBio))
			console.log(userBio);
		}
	}
	catch(err) {
		console.log(err);
	}
})
const SettingSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		showMinutes(state, action) {
			state.pomodoroLengthSelected = true;
		},
		hideMinutes(state, action) {
			state.pomodoroLengthSelected = false;
		},
		showShortBreak(state, action) {
			state.shortBreakLengthSelected = true;
		},
		hideShortBreak(state, action) {
			state.shortBreakLengthSelected = false;
		},
		showLongBreakAfter(state, action) {
			state.longBreakAfterSelected = true;
		},
		hideLongBreakAfter(state, action) {
			state.longBreakAfterSelected = false;
		},
		showLongBreak(state, action) {
			state.longBreakLengthSelected = true;
		},
		hideLongBreak(state, action) {
			state.longBreakLengthSelected = false;
		},
		updatePomodoroTime(state, action) {
			state.pomodoroCurrLength = action.payload
		},
		updateShortBreakTime(state, action) {
			
			state.shortBreakCurrLength = action.payload;
		},
		updateLongBreakTime(state, action) {
			
			state.longBreakCurrLength = action.payload;
		},
		updateLongBreakAfterTime(state, action) {
			
			state.longBreakAfterCurrLength = action.payload;
		},
		enableAutoStartBreak(state, action) {
			state.autoStartBreak = true;
		},
		disableAutoStartBreak(state, action) {
			state.autoStartBreak = false;
		},
		enableAutoStartPomodoro(state, action) {
			state.autoStartNextPomodoro = true;
		},
		disableAutoStartPomodoro(state, action) {
			state.autoStartNextPomodoro = false;
		},
		enableGoForBreak(state, action) {
			state.goForBreak = true;
		},
		disableGoForBreak(state, action) {
			state.goForBreak = false;
		},
		getUserSettings(state,action) {
			state.userSettings = action.payload
			
		},
		getUserProjects(state,action) {
			state.projects = action.payload
		},
		getProjectTasks(state,action) {
			state.tasks = action.payload
		},
		updateProjectTasks(state,action){
			state.tasks = action.payload
		},
		updateCurrProjectTasks(state,action){
			state.tasks.push(action.payload)
		},
		getProjectTitle(state,action) {
			state.taskHeader = action.payload
		},
		getProjectTodos(state,action){
			state.projectTasks.push(action.payload)
		},
		
		setProjectId(state,action){
			state.projectId = action.payload
		},
		setCurrTasks(state,action){
			state.currTasks = action.payload

		},
		
		setUserTasks(state,action){
			state.userTasks = action.payload
		},
		setClickedProjectId(state,action) {
			state.clickedProjectIdentitfier = action.payload
		},
		setTaskDataAvailable(state,action){
			state.taskDataAvailable = true
		},
		setTasksToBeCompleted(state,action){
			state.tasksToBeCompleted = action.payload
		},
		increaseTasksToBeCompleted(state, action){
			state.tasksToBeCompleted = state.tasksToBeCompleted + 1
		},
		reduceTasksToBeCompleted(state,action){
			// if(action.payload < 1) return
			state.tasksToBeCompleted = action.payload
		}
		,
		setTimeElasped(state,action){
			state.elapsedTime = action.payload
		},
		setCompletedTasks(state,action){
			state.completedTasks = action.payload
		},
		setEstimatedTime(state,action){
			state.estimatedTime = action.payload
		},
		setNumSelectedPomodoro(state,action){
			state.numbSelectedPomodoro = action.payload
		},
		setTotalEstimatedTaskTime(state,action){
			state.totalEstimatedTasksTime = action.payload
		},
		setTasksHourMinutesArray(state,action){
			state.tasksHourMinutesArray = action.payload
		},
		setCompletedTasksArray(state,action){
			state.completedTasksArray = [...action.payload]
			//Work on this reducer
		},
		setTasksTimesArray(state,action){
			state.tasksTimesArray = action.payload
		},
		updateNumbersArray(state,action){
			state.numbersArray = action.payload
		},
		setActivePomodoroLength(state,action){
			state.activeRunningPomodoroLength = action.payload
		},
		setElapsedTimeHoursMinutesArray(state,action) {
			state.elapsedTimeHoursMinutesArray = action.payload
		},
		setUserBioData(state,action){
			state.userBioData = action.payload
		},
		setUserAvatarURL(state,action){
			state.userAvatarURL = action.payload
		},
		showPopUp(state,action){
			state.popUp = true
		},
		hidePopUP(state,action){
			state.popUp = false
		},
		showChangePasswordUI(state,action){
			state.changePasswordPopUp = true
		},
		hideChangePasswordUI(state,account){
			state.changePasswordPopUp = false
		},
		showUsernameUI(state,action){
			state.changeUsername = true
			console.log("Showing change...");
			console.log(state.changeUsername);
		},
		hideChangeUsernameUI(state,action){
			state.changeUsername = false
		},
		setUserBioInformation(state,action){
			state.userBioInfo = action.payload
		},
		setTaskCategory(state,action){
			state.tasksCategory = action.payload
		},
		setTodayCategoryTasks(state,action){
			state.todayTasks = action.payload
		},
		setSomedayCategoryTasks(state,action){
			state.someDayTasks = action.payload
		},
		setTomorrowCategoryTasks(state,action){
			state.tomorrowTasks = action.payload
		},
		setUpcomingCategoryTasks(state,action){
			state.upcomingTasks = action.payload
		},
		showTaskCategoryPopUp(state,action){
			state.showTasksCategoryPopUp = true
		},
		hideTaskCategoryPopUp(state,account){
			state.showTasksCategoryPopUp = false
		},
		updataTodayTasksEstimatedTime(state,action){
			state.todaysTasksEstimatedTimeArray = action.payload
		},
		///////////////////Todays Task Reducers////////////////////////////
		setTodaysTasksEstimatedTimeArray(state,action){
			state.todaysTasksEstimatedTimeArray = action.payload
		},
		setTodaysCompletedTasks(state,action){
			state.todaysCompletedTasks = action.payload
		},
		setTodaysEstimatedTasksTime(state,action){
			state.todaysEstimatedTasksTime = action.payload
		},
		setTodaysTasksToBeCompleted(state,action){
			state.todaysTasksToBeCompleted = action.payload
		},
		setTodaysTasksElapsedTime(state,action){
			state.todaysTasksElaspedTime = action.payload
		},
		setTodaysTasks(state,action){
			state.todayTasks = action.payload
		},
		setTodaysTotalEstimatedTime(state,action){
			state.todaysTotalEstimatedTasksTime = action.payload
		},
		setTodaysCompletedTasksArray(state,action){
			state.todaysCompletedTasksArray = action.payload
		},
		setTodaysTasksTimeArray(state,action){
			state.todaysTasksTimesArray = action.payload
		},
		updateTodaysTasksArray(state,action){
			state.todaysTasks.push(action.payload)
		},
		increaseTodaysTasksToBeCompleted(state,action){
			state.todaysTasksToBeCompleted = state.todaysTasksToBeCompleted + 1
		},
		setTodaysTaskHoursMinutesArray(state,action){
			state.todaysTasksHoursMinutesArray = action.payload
		}
		
			
	}
});
export const {
	showMinutes,
	hideMinutes,
	updateTime,
	showLongBreak,
	hideLongBreak,
	showLongBreakAfter,
	hideLongBreakAfter,
	showShortBreak,
	hideShortBreak,
	updateLongBreakAfterTime,
	updateLongBreakTime,
	updatePomodoroTime,
	updateShortBreakTime,
	disableAutoStartBreak,
	enableAutoStartBreak,
	enableAutoStartPomodoro,
	disableAutoStartPomodoro,
	disableGoForBreak,
	enableGoForBreak,
	getUserSettings,
	getUserProjects,
	getProjectTasks,
	getProjectTitle,
	getProjectTodos,
	setProjectId,
	setCurrTasks,
	setUserTasks,
	setClickedProjectId,
	setTaskDataAvailable,
	updateCurrProjectTasks,
	setCompletedTasks,
	setEstimatedTime,
	setTasksToBeCompleted,
	setTimeElasped,
	increaseTasksToBeCompleted,
	setNumSelectedPomodoro,
	setTotalEstimatedTaskTime,
	setTasksHourMinutesArray,
	updateProjectTasks,
	setCompletedTasksArray,
	setTasksTimesArray,
	reduceTasksToBeCompleted,
	updateNumbersArray,
	setActivePomodoroLength,
	setElapsedTimeHoursMinutesArray,
	setUserBioData,
	setUserAvatarURL,
	showPopUp,
	hidePopUP,
	showChangePasswordUI,
	hideChangePasswordUI,
	showUsernameUI,
	hideChangeUsernameUI,
	setUserBioInformation,
	setSomedayCategoryTasks,
	setTomorrowCategoryTasks,
	setTodayCategoryTasks,
	setUpcomingCategoryTasks,
	setTaskCategory,
	hideTaskCategoryPopUp,
	showTaskCategoryPopUp,
	/////////////////////
	setTodaysTasksEstimatedTimeArray,
	setTodaysCompletedTasks,
	setTodaysEstimatedTasksTime,
	setTodaysTasksToBeCompleted,
	setTodaysTasksElapsedTime,
	setTodaysTasks,
	setTodaysTotalEstimatedTime,
	setTodaysCompletedTasksArray,
	setTodaysTasksTimeArray,
	updateTodaysTasksArray,
	increaseTodaysTasksToBeCompleted,
	setTodaysTaskHoursMinutesArray
} = SettingSlice.actions;
export default SettingSlice.reducer;
