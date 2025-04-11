import '../../styles/Settings.css';
import '../../styles/DoseSquare.css';
import { CalendarDate } from 'typescript-calendar-date';
import CalendarDateSquare from './CalendarDateSquare';
import { IonItem } from '@ionic/react';
type CalendarProps = {
	time:string
	takenStatus:boolean;
	medList:string;
}

const DoseTakenStatus: React.FC<CalendarProps> = ({time, medList, takenStatus}) => (
	<div className='doseTakenStatus'>
		<div>
			<p>Time due</p>
			<p>{time}</p>
		</div>
		<div>
			<p>Medications</p>
			<p>{medList}</p>
		</div>
		<div>
			<p>Status</p>
			<p>{takenStatus ? <span className={"takenDose"}>Taken</span>:<span className={"untakenDose"}>Not Taken</span>}</p>
		</div>
	</div>
);

export default DoseTakenStatus;