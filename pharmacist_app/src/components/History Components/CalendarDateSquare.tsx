import '../../styles/Settings.css';
import { CalendarDate } from 'typescript-calendar-date';
type CalendarProps = {
	date:CalendarDate
	dateNow:CalendarDate
}

const CalendarDateSquare: React.FC<CalendarProps> = ({date,dateNow}) => {
	
	if(date.day == dateNow.day && date.month == dateNow.month && date.year == dateNow.year) {
		return <div className={'currentCalendarDate'}>{date.day}</div>
	}
	else {
		return <div className={'calendarDate'}>{date.day}</div>
	}
};

export default CalendarDateSquare;