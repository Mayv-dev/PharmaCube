import '../../styles/Settings.css';
import { CalendarDate } from 'typescript-calendar-date';
import CalendarDateSquare from './CalendarDateSquare';
type CalendarProps = {
	dateList:any[];
	dateNow:CalendarDate;
	startDay:number;
	endDay:number;
}

const CalendarRow: React.FC<CalendarProps> = ({dateList, dateNow, startDay, endDay}) => (
	<div className='calendarRow'>
		{dateList.map((date,index) => index+1 % 7 != 0 && index+1 > startDay && index <= endDay ? <CalendarDateSquare date={date} dateNow={dateNow}/>: null)}
	</div>
);

export default CalendarRow;