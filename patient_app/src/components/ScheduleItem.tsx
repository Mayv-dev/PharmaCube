import './ExploreContainer.css';
import './ScheduleItem.css';

function dayConvert(day:number):string {
	let stringDay = "";

	switch (day) {
		case 0: {
			stringDay = "Monday";
			break;
		}
		case 1: {
			stringDay = "Tuesday";
			break;
		}
		case 2: {
			stringDay = "Wednesday";
			break;
		}
		case 3: {
			stringDay = "Thursday";
			break;
		}
		case 4: {
			stringDay = "Friday";
			break;
		}
		case 5: {
			stringDay = "Saturday";
			break;
		}
		case 6: {
			stringDay = "Sunday";
			break;
		}
	}

	return stringDay;
}

interface ScheduleItemProps {
	id:number,
  	day: number,
	time: string
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ id, day, time }) => 
{
	return(
		<div key={id} className='scheduleItemContainer'>
			<p className='timeContainer'>{time.substring(11,16)}</p>
			<p className='infoContainer'>Example Info</p>
		</div>
	)
}

export default ScheduleItem;
