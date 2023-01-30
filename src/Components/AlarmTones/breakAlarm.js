import Tones from '../Tones/workAlarmTones';
import { Link } from 'react-router-dom';
import styles from './AlarmTone.module.scss';
import { HiChevronLeft } from 'react-icons/hi';
import BreakAlarmTones from '../Tones/breakAlarmTones';
const breakAlarmTones = (props) => {
	return (
		<div className={styles.AlarmTonesWrapper}>
			<header className={styles.AlarmToneHeader}>
				<Link to = {-1} className={styles.backLink}>
					<HiChevronLeft className={styles.goBackIcon} />
				</Link>
				<h3 className={styles.AlarmHeader}>Break Alarm</h3>
			</header>
			<BreakAlarmTones />
		</div>
	);
};
export default breakAlarmTones;