import '../../styles/Settings.css';
import { CalendarDate } from 'typescript-calendar-date';
import CalendarDateSquare from './CalendarDateSquare';
import { PatientAdherenceRecord } from 'api types/types';
type CalendarProps = {
	dateList:any[];
	dateNow:CalendarDate;
	startDay:number;
	endDay:number;
	history:PatientAdherenceRecord[];
	visibleHighlights:any
}

const CalendarRow: React.FC<CalendarProps> = ({dateList, dateNow, startDay, endDay, history, visibleHighlights}) => {
	
	console.log(dateList)
	return (
	<div className='calendarRow'>
		{dateList.map((date,index) => index+1 % 7 != 0 && index+1 > startDay && index <= endDay ? <CalendarDateSquare date={date} dateNow={dateNow} history={history} visibleHighlights={visibleHighlights}/>: null)}
	</div>
)};

export default CalendarRow;