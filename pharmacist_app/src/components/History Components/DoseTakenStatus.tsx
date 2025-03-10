import '../../styles/Settings.css';
import '../../styles/DoseSquare.css';
import { CalendarDate } from 'typescript-calendar-date';
import CalendarDateSquare from './CalendarDateSquare';
type CalendarProps = {
	time:string
	takenStatus:boolean;
}

const DoseTakenStatus: React.FC<CalendarProps> = ({time, takenStatus}) => (
	<div className='doseTakenStatus'>
		<p>Time due: {time}</p>
		<p>Status: {takenStatus ? <span className={"takenDose"}>Taken</span>:<span className={"untakenDose"}>Not Taken</span>}</p>
	</div>
);

export default DoseTakenStatus;