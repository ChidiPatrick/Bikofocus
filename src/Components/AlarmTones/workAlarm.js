import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AlarmTone.module.scss';
import { HiChevronLeft } from 'react-icons/hi';
import WorkAlarmTones from '../Tones/workAlarmTones';
const workAlarmTones = (props) => {
	return (
		<div className={styles.AlarmTonesWrapper}>
			<header className={styles.AlarmToneHeader}>
				<Link to = "/settings" className={styles.backLink}>
					<HiChevronLeft className={styles.goBackIcon} />
				</Link>
				<h3 className={styles.AlarmHeader}>Work Alarm</h3>
			</header>
			<WorkAlarmTones />
		</div>
	);
};
export default workAlarmTones;
