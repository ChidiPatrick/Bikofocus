// import React,{useRef} from 'react';
// import { useDispatch,useSelector } from 'react-redux';
// import styles from './Tones.module.scss';
// import UIFx from 'uifx';

// import { getWorkAlarmTone,getBreakAlarmTone } from './TonesSlice';
// import Tonez from '../audioFiles/AudioFiles';
// import { db } from '../Firebase/Firebase';
// import {doc,updateDoc } from 'firebase/firestore';
// // import { getSelectedTone } from './TonesSlice';
// const BreakAlarmTones = (props) => {
// 	const bell = new UIFx(Tonez.Bell, { volume: 0.4, throttleMs: 100 });
// 	const announcement = new UIFx(Tonez.Announcement, { volume: 0.4, throttleMs: 100 });
// 	const impact = new UIFx(Tonez.Impact, { volume: 0.4, throttleMs: 100 });
// 	const buzzerSound = new UIFx(Tonez.Buzzer, { volume: 0.4, throttleMs: 100 });
// 	const swoosh = new UIFx(Tonez.Swoosh, { volume: 0.4, throttleMs: 100 });
// 	const decision = new UIFx(Tonez.Decide, { volume: 0.4, throttleMs: 100 });
// 	const ding = new UIFx(Tonez.Ding, { volume: 0.4, throttleMs: 100 });
// 	const notifictions = new UIFx(Tonez.Notification, { volume: 0.4, throttleMs: 100 });
// 	const thrill = new UIFx(Tonez.Thriller, { volume: 0.4, throttleMs: 100 });
// 	const tubular_Bell = new UIFx(Tonez.TubularBell, { volume: 0.4, throttleMs: 100 });
// 	const seletedTone = useSelector(state => state.tones.seletedTone)
// 	const userId = useSelector(state => state.signUpSlice.userId)

// const dispatch = useDispatch()
// /////////////////Update Firestore ////////////////////
//  const settingsRef = doc(db,"users",`${userId}`,"userSettingsCollection","settings")
//  const updateWorkAlarm = async (tone) => {
// 	await updateDoc(settingsRef, {
// 		workAlarm: tone
// 	})
//  }
// 	const tones = [];
// 	for (let i = 0; i <= 10; i++) {
// 		tones.push(i);
// 	}
// 	console.log(tones);
// 	const getTone = (targetEl) => {
// 		dispatch(getBreakAlarmTone(targetEl.innerText))
// 		updateWorkAlarm(targetEl.innerText)
// 	}
// 	return (
// 		<div className={styles.TonesWrapper}>
// 			<div className={styles.tone} onClick={(e) => getTone(e.target)}>
// 				<span className={styles.theTone}>None</span>
// 			</div>
// 			<div className={styles.tone} onClick={(e) => 
// 				{bell.play()
// 				getTone(e.target)}}>
// 				<span className={styles.theTone}>Bell</span>
// 			</div>
// 			<div className={styles.tone} onClick={(e) => { announcement.play()
// 			getTone(e.target)
// 			}}>
// 				<span className={styles.theTone}>Announcement</span>
// 			</div>
// 			<div className={styles.tone} onClick={(e) => {impact.play()
// 			getTone(e.target)
// 			}}>
// 				<span>Impact</span>
// 			</div>
// 			<div className={styles.tone} onClick={(e) => {buzzerSound.play()
// 			getTone(e.target)
// 			}}>
// 				<span className={styles.theTone}>Buzzer</span>
// 			</div>
// 			<div className={styles.tone} onClick={(e) => {swoosh.play()
// 			getTone(e.target)
// 			}}>
// 				<span className={styles.theTone}>Swoosh</span>
// 			</div>
// 			<div className={styles.tone} onClick={(e) => {thrill.play()
// 			getTone(e.target)
// 			}}>
// 				<span className={styles.theTone}>Thriller</span>
// 			</div>
// 			<div className={styles.tone} onClick={(e) => {decision.play()
// 			getTone(e.target)
// 			}}>
// 				<span className={styles.theTone}>Decide</span>
// 			</div>
// 			<div className={styles.tone} onClick={(e) => {ding.play()
// 			getTone(e.target)
// 			}}>
// 				<span className={styles.theTone}>Ding</span>
// 			</div>
// 			<div className={styles.tone} onClick={(e) => {notifictions.play()
// 			getTone(e.target)
// 			}}>
// 				<span className={styles.theTone}>Notification</span>
// 			</div>
// 			<div className={styles.tone} onClick={(e) => {tubular_Bell.play()
// 			getTone(e.target)
// 			}}>
// 				<span className={styles.theTone}>TubularBell</span>
// 			</div>
// 		</div>
// 	);
// };

// export default BreakAlarmTones;
