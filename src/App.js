import React,{  useState,useEffect } from 'react';
import './App.scss';
import FrontPage from './Components/FrontPage/FrontPage';
import { Routes, Route, useNavigate, } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import BreakUI from './Components/BreakUI/BreakUI';
import UserAccountUI from './Components/UserAccount/UserAccount';
import AddTask from './Components/addTask/addTask';
import Settings from './Components/Settings/Settings';
import WorkAlarmTones from './Components/AlarmTones/workAlarm';
import BreakAlarmTones from './Components/AlarmTones/breakAlarm';
import { onAuthStateChanged } from 'firebase/auth';
import SignUpForm from './Components/SignUpForms/SignUpForm';
import SignInUser from "./Components/SignUpForms/SignInUser"
import AddProject from './Components/AddProject/AddProject';
import VerifyEmail from './Components/VerificationPage/VerificationPage';
import AccountDetails from './Components/accountDetails/accountDetails';
import {auth} from "./Components/Firebase/Firebase"
import {getUserId} from "./Components/SignUpForms/SignUpFormSlice"
import Projects from './Components/Projects/Projects';
import {fetchUserSettings,FetchTasks,FetchUserData,FetchUserBioData} from "./Components/Settings/SettingsSlice"
import PasswordReset from './Components/SignUpForms/forgottenPassword';
import AvatarUploadUI from './Components/avatarUploadUI/avatarUploadUI';
import ProjectsCompletedTasks from "./Components/allProjectCompleteTasks/projectsCompletedTasks"
import Report from './Components/Report/Report';
import LandingPage from './Components/LandingPage/LandingPage';

//////////////////////////////////////
function App() {
	const dispatch = useDispatch()
	onAuthStateChanged(auth, (user) => {
		if(user) {
			dispatch(getUserId(user.uid))
			dispatch(fetchUserSettings(user.uid))
			dispatch(FetchTasks([user.uid]))
			dispatch(FetchUserData(user.uid))
		}
	})
	const fetchedSettingsData = useSelector(state => state.settings.fetchedSettingsData)
	const fetchedUserBioData = useSelector(state => state.settings.fetchedUserData)
	const fetchedUserTask = useSelector(state => state.settings.fetchedUserTask)
	const [isLoading,setIsLoading] = useState(true)
	////////////////////////////////////////////////////
	const minute = useSelector((state) => state.settings.pomodoroCurrLength);
	const shortBreakLength = useSelector(state => state.settings.shortBreakCurrLength)
	const timeMinutes = new Date();
	const timeSeconds = new Date()
	//////////////////////////////////////
	///Implement time conversion here /////
	timeMinutes.setSeconds(timeMinutes.getSeconds() +  60 * minute);
	timeSeconds.setSeconds(timeSeconds.getSeconds() + ( 60 * shortBreakLength))
	const displayBreak = useSelector((state) => state.frontPage.break);
	useEffect(() => {
		if(fetchedUserTask === true && fetchedSettingsData === true && fetchedUserBioData === true){
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
				<Route path="/" element={<LandingPage/>} />
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
