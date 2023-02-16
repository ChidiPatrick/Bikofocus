import React,{useRef,useState,} from "react";
import styles from "./Settings.module.scss"
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { updateDoc,doc,onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/Firebase";


import {
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
	getUserProjects
} from '../Settings/SettingsSlice';
	

const SettingsComponent = ({resource}) => {
    const data = resource.data.read()
	const [settings,setSettings] = useState(data.data())
	console.log(settings);
    const dispatch = useDispatch()
	dispatch(getUserProjects(settings.projects))
    const selected = useSelector((state) => state.settings.selected);
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
	
	const userId = useSelector((state) => state.signUpSlice.userId)
    const settingsRef = doc(db,"users",`${userId}`,"userSettingsCollection","settings")
	const [disableBreak,setDisableBreak] = useState(settings.disableBreak)
	// console.log(user);
		
		const toggleShortBreakSelect = () => {
		if (!shortBreakLengthSelected) {
			dispatch(showShortBreak());
		}
		if (shortBreakLengthSelected) {
			dispatch(hideShortBreak());
		}
	};
	const getPomodoroTime = (e) => {
		let curValue = e.target.value;
		console.log(typeof selectedTime);
		dispatch(hideMinutes());
		dispatch(updatePomodoroTime({ currTime: curValue }));
	};
	const getShortBreakTime = (e) => {
		let curValue = e.target.value;
		dispatch(hideShortBreak());
		dispatch(updateShortBreakTime({ currTime: curValue }));
	};
	const getLongBreakTime = (e) => {
		let curValue = e.target.value;
		dispatch(hideLongBreak());
		dispatch(updateLongBreakTime({ currTime: curValue }));
	};
	const getLongBreakAfterTime = (e) => {
		let curValue = e.target.value;
		dispatch(hideLongBreakAfter());
		dispatch(updateLongBreakAfterTime({ currTime: curValue }));
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
    const autoStartNextPomodoroHandler = () => {
		if (!autoStartNextPomodoro) {
			dispatch(enableAutoStartPomodoro());
		}
		if (autoStartNextPomodoro) {
			dispatch(disableAutoStartPomodoro());
		}
	};
	const autoBreakStartHandler = () => {
		if (!autoStartBreak) {
			dispatch(enableAutoStartBreak());
		}
		if (autoStartBreak) {
			dispatch(disableAutoStartBreak());
		}
	};
	const disableBreakHandler = () => {
		if (!goForBreak) {
			dispatch(enableGoForBreak());
		}
		if (goForBreak) {
			dispatch(disableGoForBreak());
		}
	};
	const updatePomodoroLength = async (e) =>  {
			setSettings({...settings,pomodoroLength: e.target.value})
			await updateDoc(settingsRef, {
				pomodoroLength: e.target.value
			});
			togglePomodoroSelect()
		}
		
		
		const updateShortBreak = async (e) => {
			setSettings({...settings,shortBreakLength: e.target.value})
			await updateDoc(settingsRef, {
				shortBreakLength: e.value.target
			})
			
		}
		const updateLongBreakLength = async (e) => {
			setSettings({...settings,longBreakLength: e.target.value})
			await updateDoc(settingsRef, {
				longBreakLength: e.target.value
			})
			toggleLongBreak()
		}
		const updateLongBreakAfter = async (e) => {
			setSettings({...settings,longBreakAfter: e.target.value})
			await updateDoc(settingsRef, {
				longBreakAfter: e.target.value
			})
			toggleLongBreakAfter()
		}
		const updateAutoStartBreak = async (e) => {
			await updateDoc(settingsRef, {
				autoStartBreaks: settings.disableBreak
			});
			
		}
		const updateDisableBreak = async (values) => {
			setDisableBreak({...settings,disableBreak: !disableBreak})
			await updateDoc(settingsRef, {
				disableBreak: !settings.disableBreak
			});
			
		}
		const updateAlarmBreak = async (e) => {
			await updateDoc(settingsRef, {
				breakAlarm: e.target.value
			});
			
		}
		const updateShortBreakLength = async (e) => {
			setSettings({...settings,shortBreakLength: e.target.value})
			await updateDoc(settingsRef, {
				shortBreakLength: e.target.value
			});
			toggleShortBreakSelect()
		}
		
    const selectRef = useRef();
	const Minutes = [];
	let selectedTime = 45;
	for (let i = 0; i <= 60; i++) {
		Minutes.push(i + 1);
	}
	
    return (
    <div className={styles.Setting}>
			<div className={styles.HeaderWrapper}>
				<Link to= "/userAccount" className={styles.navLink}>
					<FaChevronLeft className={styles.iconBack} />
				</Link>
				<h3 className={styles.SettingHeader}>Settings</h3>
			</div>
			<Link to="/userAccount" className={styles.accountDetails}>
				<figure className={styles.Avatar} />
				
				<div className={styles.userName}>Mr. Somebody</div>
				<FaChevronRight className={styles.iconBack} />
			</Link>
			<Link to ="/Projects" className={styles.projectsLink}>
				<div className={styles.projectLinkContainer}>
					<p>Projects</p>
					<FaChevronRight className={styles.iconBack} />
				</div>
			</Link>
			<div className={styles.AlarmSettings}>
				<div className={styles.linkWrapper}>
					<Link to="workAlarm" className={styles.workAlarm}>
						Work Alarm Tone
					</Link>
					<div className={styles.alarmTone}>
						<span className={styles.alarm}>Bell2</span>
						<FaChevronRight className={styles.iconBack} />
					</div>
				</div>
				<div className={styles.linkWrapper}>
					<Link to="workAlarm" className={styles.workAlarm}>
						Break Alarm Tone
					</Link>
					<div className={styles.alarmTone}>
						<span className={styles.alarm}>Bell3</span>
						<FaChevronRight className={styles.iconBack} />
					</div>
				</div>
			</div>
			<div className={styles.timeSettingsWrapper}>
				<form className={styles.minuteList}>
					<label htmlFor="minutes" className={styles.minutesLabel} onClick={togglePomodoroSelect}>
						<span>Pomodoro Length</span>
						<span>{pomodoroCurrLength} Minutes</span>
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
						<span>{settings.shortBreakLength} Minutes</span>
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
						<span>{settings.longBreakLength} Minutes</span>
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
						<span>{settings.longBreakAfter} Pomodoros</span>
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
					{/* <label className={styles.breakSwitch}>
						<span className={styles.switchLabel}>Disable Break</span>
						<Switch
							className={styles.switch}
							height={17}
							width={40}
							onChange={updateDisableBreak}
							checked={settings.disableBreak}
						/>
					</label> */}
					{/* <label className={styles.AutoStartPomodoroSwitch}>
						<span className={styles.switchLabel}>Auto Start of Next Pomodoro</span>
						<Switch
							className={styles.switch}
							height={17}
							width={40}
							checked={autoStartNextPomodoro}
							onChange={autoStartNextPomodoroHandler}
						/>
					</label>
					<label className={styles.AutoStartBreakSwitch}>
						<span className={styles.switchLabel}>Auto Start of Break</span>
						<Switch
							className={styles.switch}
							height={17}
							width={40}
							checked={autoStartBreak}
							onChange={autoBreakStartHandler}
							// color="#ccc"
						/>
					</label> */}
					{/* <Switch color="red" /> */}
				</form>
			</div>
		</div>
        )
}
export default SettingsComponent