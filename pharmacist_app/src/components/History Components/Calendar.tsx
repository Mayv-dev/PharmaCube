import { IonContent, IonPage} from '@ionic/react';
import '../../styles/Settings.css';
import { CalendarDate } from 'typescript-calendar-date';
import CalendarRow from './CalendarRow';
type CalendarProps = {
	dateList:any[];
	dateNow:CalendarDate;
}

const Calendar: React.FC<CalendarProps> = ({dateList,dateNow}) => (
	<div className='calendar'>
		<CalendarRow dateList={dateList} dateNow={dateNow} startDay={0} endDay={6}></CalendarRow>
		<CalendarRow dateList={dateList} dateNow={dateNow} startDay={7} endDay={13}></CalendarRow>
		<CalendarRow dateList={dateList} dateNow={dateNow} startDay={14} endDay={20}></CalendarRow>
		<CalendarRow dateList={dateList} dateNow={dateNow} startDay={21} endDay={27}></CalendarRow>
		<CalendarRow dateList={dateList} dateNow={dateNow} startDay={28} endDay={33}></CalendarRow>
	</div>
);

export default Calendar;