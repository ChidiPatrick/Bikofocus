import React,{ Suspense, useState,useEffect } from 'react';
import './App.scss';
import FrontPage from './Components/FrontPage/FrontPage';
import { Routes, Route, useNavigate, } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import BreakUI from './Components/BreakUI/BreakUI';
import UserAccountUI from './Components/UserAccount/UserAccount';
import AddTask from './Components/addTask/addTask';
// import Setting from './Components/Settings/Settings';
import Settings from './Components/Settings/Settings';
import WorkAlarmTones from './Components/AlarmTones/workAlarm';
import BreakAlarmTones from './Components/AlarmTones/breakAlarm';
import { initializeApp } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
// import { doc, DocumentSnapshot, getDoc, getDocs, getFirestore, setDoc, updateDoc, query } from 'firebase/firestore';
// import { collection, addDoc } from 'firebase/firestore';
import {  firebaseConfig } from './Components/Firebase/Firebase';
import SignUpForm from './Components/SignUpForms/SignUpForm';
import SignInUser from "./Components/SignUpForms/SignInUser"
import AddProject from './Components/AddProject/AddProject';
import VerifyEmail from './Components/VerificationPage/VerificationPage';
import AccountDetails from './Components/accountDetails/accountDetails';
// import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "./Components/Firebase/Firebase"
import {getUserId} from "./Components/SignUpForms/SignUpFormSlice"
import Projects from './Components/Projects/Projects';
import {fetchUserSettings,FetchTasks,FetchUserData,FetchUserBioData} from "./Components/Settings/SettingsSlice"
import PasswordReset from './Components/SignUpForms/forgottenPassword';
import AvatarUploadUI from './Components/avatarUploadUI/avatarUploadUI';
import TodayTasks from './Components/Tasks/todayTasks';
import ProjectsCompletedTasks from "./Components/allProjectCompleteTasks/projectsCompletedTasks"
import Report from './Components/Report/Report';
import LandingPage from './Components/LandingPage/LandingPage';
// const analytics = getAnalytics(app);

//////////////////////////////////////
function App() {
	// const [user,loading,erro] = useAuthState(auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [isSignedIn,setIsSignedIn] = useState(false)
	onAuthStateChanged(auth, (user) => {
		if(user) {
			dispatch(getUserId(user.uid))
			dispatch(fetchUserSettings(user.uid))
			dispatch(FetchTasks([user.uid]))
			dispatch(FetchUserData(user.uid))
			setIsSignedIn(true)
		}
	})
	const fetchedSettingsData = useSelector(state => state.settings.fetchedSettingsData)
	const fetchedUserBioData = useSelector(state => state.settings.fetchedUserData)
	const fetchedUserTask = useSelector(state => state.settings.fetchedUserTask)
	const [isLoading,setIsLoading] = useState(true)
	console.log(fetchedSettingsData);
	////////////////////////////////////////////////////
	const minute = useSelector((state) => state.settings.pomodoroCurrLength);
	const shortBreakLength = useSelector(state => state.settings.shortBreakCurrLength)
	console.log(minute);
	const timeMinutes = new Date();
	const timeSeconds = new Date()
	//////////////////////////////////////
	///Implement time conversion here /////
	timeMinutes.setSeconds(timeMinutes.getSeconds() +  60 * minute);
	timeSeconds.setSeconds(timeSeconds.getSeconds() + (60 * shortBreakLength))
	const displayBreak = useSelector((state) => state.frontPage.break);
	useEffect(() => {
		if(fetchedUserTask === true && fetchedSettingsData === true && fetchedUserBioData === true){
			console.log("Fetched all!!");
			setIsLoading(false)
		}
	}, [isLoading])
	let frontpage = null;
	if (displayBreak) {
		frontpage = <BreakUI expiryTimestamp={timeSeconds} />;
	} else {
		frontpage = <FrontPage expiryTimestamp={timeMinutes} />;
	}
	const loadingSpinner = <div className= "loadingSpinner">
								<span className= "loader"></span>
							</div>
	const app = <div className="App">
			<Routes>
				<Route path="/" element={isSignedIn ? frontpage : <LandingPage/>} />
				<Route path="/timerPage" element={frontpage} />
				<Route path="/UserAccount" element={<UserAccountUI />} />
				<Route path="/project" element={<AddTask />} />
				<Route path="/tomorrowTodo" element={<AddTask />} />
				<Route path="/upcomingTodo" element={<AddTask />} />
				<Route path="/somedayTodo" element={<AddTask />} />
				<Route path="/events" element={<AddTask />} />
				<Route path="/completed" element={<AddTask />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/settings/workAlarm" element={<WorkAlarmTones />} />
				<Route path="/settings/breakAlarm" element={<BreakAlarmTones />} />
				<Route path="/signUpForm" element = {<SignUpForm/>} />
				<Route path= "/verifyEmail" element= {<VerifyEmail/>}/>
				<Route path="/signInForm" element={<SignInUser/>}/>
				<Route path="/AddProject" element={<AddProject/>}/>
				<Route path="/Projects" element={<Projects/>}/>
				<Route path = "/forgottenPassword" element = {<PasswordReset/>}/>
				<Route path = "/uploadAvatarUI" element = {<AvatarUploadUI/>}/>
				<Route path = "/accountDetails" element = {<AccountDetails/>}/>
				<Route path = "/completedTasks" element = {<ProjectsCompletedTasks/>}/>
				<Route path = "/reports" element = {<Report/>}/>
			</Routes>
		</div>
	return (  app );
}

export default App;
