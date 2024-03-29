import React, { useState, useRef,useEffect,Suspense } from 'react';
import styles from './Settings.module.scss';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { db,auth,storage } from '../Firebase/Firebase';
import {doc,updateDoc} from "firebase/firestore"
import { onAuthStateChanged } from 'firebase/auth';
import { ImUser } from "react-icons/im";
import {
	showMinutes,
	hideMinutes,
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
	setUserAvatarURL
	
	
} from '../Settings/SettingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createResource } from '../PersonApi/PersonApi';
import {ref,getDownloadURL,uploadBytesResumable} from "@firebase/storage";

////////////////////////////////////
const Settings = (props) => {	
	///////////////////
	//HOOKS//
	const [selectedFile,setSelectedFile] = useState(null)
	const [imgUrl,setImgUrl] = useState("")
	const [loadingPercentage,setLoadingPercentage] = useState(`${0}%`)
	///GLOBALS/////////
	const dispatch = useDispatch();
	////Select Display states/////
	const pomodoroLengthSelected = useSelector((state) => state.settings.pomodoroLengthSelected);
	const shortBreakLengthSelected = useSelector((state) => state.settings.shortBreakLengthSelected);
	const longBreakLengthSelected = useSelector((state) => state.settings.longBreakLengthSelected);
	const longBreakAfterLengthSelected = useSelector((state) => state.settings.longBreakAfterSelected);
	const autoStartBreak = useSelector((state) => state.settings.autoStartBreak);
	const autoStartNextPomodoro = useSelector((state) => state.settings.autoStartNextPomodoro);
	const goForBreak = useSelector((state) => state.settings.goForBreak);
	const userSettings = useSelector((state) => state.settings.userSettings)
	/// Get Pomodoro Durations //////
	const pomodoroCurrLength = useSelector((state) => state.settings.pomodoroCurrLength);
	const shortBreakCurrLength = useSelector((state) => state.settings.shortBreakCurrLength);
	const longBreakCurrLength = useSelector((state) => state.settings.longBreakCurrLength);
	const longBreakAfterCurrLength = useSelector((state) => state.settings.longBreakAfterCurrLength);
	const workAlarm = useSelector(state => state.tones.workAlarm)
	const breakAlarm = useSelector(state => state.tones.breakAlarm)
	const userId = useSelector((state) => state.signUpSlice.userId)
	const [settings,setSettings] = useState(userSettings)
	const userBioData = useSelector(state => state.settings.userBioData)
	const avatarURL = useSelector(state => state.settings.userAvatarURL)
	//////////////////////////////////////
	dispatch(getUserSettings())
    const settingsRef = doc(db,"users",`${userId}`,"userSettingsCollection","settings")
	const selectRef = useRef();
	const Minutes = [];
	let selectedTime = 45;
	for (let i = 1; i < 60; i++) {
		Minutes.push(i);
	}
	///////////////////////////////////
	//GET SELECTED MINUTE
	const getPomodoroTime = (e) => {
		dispatch(hideMinutes());
		dispatch(updatePomodoroTime(e.target.value));
	};
	const getShortBreakTime = (e) => {
		dispatch(hideShortBreak());
		dispatch(updateShortBreakTime(e.target.value));
	};
	const getLongBreakTime = (e) => {
		dispatch(hideLongBreak());
		dispatch(updateLongBreakTime(e.target.value));
	};
	const getLongBreakAfterTime = (e) => {
		
		dispatch(hideLongBreakAfter());
		dispatch(updateLongBreakAfterTime(e.target.value));
	};
	////////////////////////////////////
	//Check button handler////////
	const toggleShortBreakSelect = () => {
		if (!shortBreakLengthSelected) {
			dispatch(showShortBreak());
		}
		if (shortBreakLengthSelected) {
			dispatch(hideShortBreak());
		}
	};
	const togglePomodoroSelect = () => {
		if (!pomodoroLengthSelected) {
			dispatch(showMinutes());
		}
		if (pomodoroLengthSelected) {
			dispatch(hideMinutes());
		}
	};
	const toggleLongBreakAfter = () => {
		if (!longBreakAfterLengthSelected) {
			dispatch(showLongBreakAfter());
			console.log(longBreakAfterLengthSelected);
		}
		if (longBreakAfterLengthSelected) {
			dispatch(hideLongBreakAfter());
		}
	};
	const toggleLongBreak = () => {
		if (!longBreakLengthSelected) {
			dispatch(showLongBreak());
			console.log(longBreakLengthSelected);
		}
		if (longBreakLengthSelected) {
			dispatch(hideLongBreak());
		}
	};
	const updatePomodoroLength = async (e) =>  {
			getPomodoroTime(e)
			togglePomodoroSelect()
			await updateDoc(settingsRef, {
				pomodoroLength: e.target.value
			});
			dispatch(getUserSettings())
		}
		const updateShortBreakLength = async (e) => {
			getShortBreakTime(e)
			toggleShortBreakSelect()
			await updateDoc(settingsRef, {
				shortBreakLength: e.target.value
			});
			dispatch(getUserSettings())
			
		}
		const updateLongBreakLength = async (e) => {
			getLongBreakTime(e)
			toggleLongBreak()
			await updateDoc(settingsRef, {
				longBreakLength: e.target.value
			})
			dispatch(getUserSettings())
		}
		const updateLongBreakAfter = async  (e) => {
			getLongBreakAfterTime(e)
			toggleLongBreakAfter()
			await updateDoc(settingsRef, {
				longBreakAfter: e.target.value
			})
			dispatch(getUserSettings())
		}
		
	///////TESTING SUSPENSE //////////////////
	const resource = createResource()
	const loadingSpinner = <div className={styles.loadingSpinner}>
			<span className={styles.loader}></span>
		</div>
	return (
		<div className={styles.Setting}>
			<div className={styles.HeaderWrapper}>
				<Link to= "/userAccount" className={styles.navLink}>
					<FaChevronLeft className={styles.iconBack} />
				</Link>
				<h3 className={styles.SettingHeader}>Settings</h3>
			</div>
			<Link to="/accountDetails" className={styles.accountDetails}>
				<div className={styles.avatarParentContainer}>
					{avatarURL ?
					<figure className = {styles.avatarImage}>
						<img className={styles.profilePicture} src = {avatarURL}/>
					</figure>
					:
					<ImUser className = {styles.fallbackAvatar}/>
				}
				</div>
				
				<div className={styles.userName}>{userBioData.firstName} {userBioData.lastName} </div>
				<FaChevronRight className={styles.iconBack} />
			</Link>
			<Link to ="/Projects" className={styles.projectsLink}>
				<div className={styles.projectLinkContainer}>
					<p>Projects</p>
					<FaChevronRight className={styles.iconBack} />
				</div>
			</Link>
			<div className={styles.AlarmSettings}>
					<Link to="workAlarm" className={styles.linkWrapper}>
						<div>Work Alarm Tone</div>
						<div className={styles.alarmTone}>
						<span className={styles.alarm}> {settings ? settings.workAlarm : workAlarm} </span>
						<FaChevronRight className={styles.iconBack} />
						</div>
					</Link>
	
					<Link to="breakAlarm" className={styles.linkWrapper}>
						<div>Break Alarm Tone</div>
						<div className={styles.alarmTone}>
						<span className={styles.alarm}>{settings ? settings.breakAlarm : breakAlarm }</span>
						<FaChevronRight className={styles.iconBack} />
						</div>
					</Link>
			</div>
			<div className={styles.timeSettingsWrapper}>
				<form className={styles.minuteList} >
					<label htmlFor="minutes" className={styles.minutesLabel} onClick={togglePomodoroSelect}>
						<span>Pomodoro Length</span>
						<span>{settings ? settings.pomodoroLength : pomodoroCurrLength} Minutes</span>
					</label>
					<select
						className={pomodoroLengthSelected ? styles.selectMinutes : styles.hidden}
						onChange={updatePomodoroLength}
					>
						{Minutes.map((minute, i) => {
							return (
								<option ref={selectRef} className={styles.minuteOption} value={minute} key={i}>
									{minute}
								</option>
							);
						})}
					</select>

					<label htmlFor="minutes" className={styles.minutesLabel} onClick={toggleShortBreakSelect}>
						<span>Short Break Length</span>
						<span>{settings ? settings.shortBreakLength : shortBreakCurrLength} Minutes</span>
					</label>
					<select
						className={shortBreakLengthSelected ? styles.selectMinutes : styles.hidden}
						onChange={updateShortBreakLength}
					>
						{Minutes.map((minute, i) => {
							return (
								<option ref={selectRef} className={styles.minuteOption} value={minute} key={i}>
									{minute}
								</option>
							);
						})}
					</select>
					<label htmlFor="minutes" className={styles.minutesLabel} onClick={toggleLongBreak}>
						<span>Long Break Length</span>
						<span>{settings ? settings.longBreakLength : longBreakCurrLength} Minutes</span>
					</label>
					<select
						className={longBreakLengthSelected ? styles.selectMinutes : styles.hidden}
						onChange={updateLongBreakLength}
					>
						{Minutes.map((minute, i) => {
							return (
								<option ref={selectRef} className={styles.minuteOption} value={minute} key={i}>
									{minute}
								</option>
							);
						})}
					</select>
					<label htmlFor="minutes" className={styles.minutesLabel} onClick={toggleLongBreakAfter}>
						<span>Long Break After</span>
						<span>{settings ? settings.longBreakAfter : longBreakAfterCurrLength} Pomodoros</span>
					</label>
					<select
						className={longBreakAfterLengthSelected ? styles.selectMinutes : styles.hidden}
						onChange={updateLongBreakAfter}
					>
						{Minutes.map((minute, i) => {
							return (
								<option ref={selectRef} className={styles.minuteOption} value={minute} key={i}>
									{minute}
								</option>
							);
						})}
					</select>
			 
				</form>
			</div>
		</div>
	);
};
export default Settings;
