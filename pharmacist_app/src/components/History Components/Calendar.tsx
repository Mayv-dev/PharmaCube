import { IonContent, IonPage} from '@ionic/react';
import '../../styles/Settings.css';
import { CalendarDate } from 'typescript-calendar-date';
import CalendarRow from './CalendarRow';
import { PatientAdherenceRecord } from 'api types/types';
type CalendarProps = {
	dateList:any[];
	dateNow:CalendarDate;
	history: PatientAdherenceRecord[];
}

const Calendar: React.FC<CalendarProps> = ({dateList,dateNow,history}) => (
	<div className='calendar'>
		<CalendarRow dateList={dateList} dateNow={dateNow} startDay={0} endDay={6} history={history}></CalendarRow>
		<CalendarRow dateList={dateList} dateNow={dateNow} startDay={7} endDay={13} history={history}></CalendarRow>
		<CalendarRow dateList={dateList} dateNow={dateNow} startDay={14} endDay={20} history={history}></CalendarRow>
		<CalendarRow dateList={dateList} dateNow={dateNow} startDay={21} endDay={27} history={history}></CalendarRow>
		<CalendarRow dateList={dateList} dateNow={dateNow} startDay={28} endDay={33} history={history}></CalendarRow>
	</div>
);

export default Calendar;