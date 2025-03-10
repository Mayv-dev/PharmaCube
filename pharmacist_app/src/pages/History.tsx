import { IonContent, IonPage} from '@ionic/react';
import '../styles/Settings.css';
import '../styles/History.css';
import { useEffect, useState } from 'react';

// Used this as my library and reference for my calendar work https://www.npmjs.com/package/typescript-calendar-date
import { CalendarDate, calendarDateFromJsDateObject, numberOfDaysInMonth } from 'typescript-calendar-date';
import Calendar from '../components/History Components/Calendar';


const History: React.FC = () => {
	const [date, setDate] = useState(calendarDateFromJsDateObject(new Date(Date.now())))
	const [dateNow, setDateNow] = useState(calendarDateFromJsDateObject(new Date(Date.now())))
	const [dateList, setDateList] = useState<any[]>([])
	
	const getDateRange = (from: CalendarDate, to: CalendarDate):any[] =>  {
		let i = from.day
		let dateList = []
		dateList.push({ year: from.year, month: from.month, day: i })
		do {
			i++
			dateList.push({ year: from.year, month: from.month, day: i })
		} while (i != to.day)
		return dateList
	};

	useEffect(() => {
		setDateList(getDateRange({ year: date.year, month: date.month, day: 1 }, { year: date.year, month: date.month, day: numberOfDaysInMonth(date)})) 
	},[]);

  return(
  <IonPage>
	<IonContent>
		<p>{date.month}</p>
		<Calendar dateNow={dateNow} dateList={dateList}></Calendar>
		<br></br>
		<div className='calendarRow'>
			<div className={'calendarDate takenDate'}>{date.day}</div>
			<div className={'calendarDate notTakenDate'}>{date.day}</div>
			<div className={'calendarDate partiallyTakenDate'}>{date.day}</div>
		</div>
	</IonContent>
  </IonPage>
);
}

export default History;