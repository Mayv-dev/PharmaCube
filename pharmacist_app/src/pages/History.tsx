import { IonContent, IonPage} from '@ionic/react';
import '../styles/Settings.css';
import '../styles/History.css';
import { useEffect, useState } from 'react';

// Used this as my library and reference for my calendar work https://www.npmjs.com/package/typescript-calendar-date
import { CalendarDate, calendarDateFromJsDateObject, numberOfDaysInMonth } from 'typescript-calendar-date';


const History: React.FC = () => {
	const [date, setDate] = useState(calendarDateFromJsDateObject(new Date(Date.now())))
	const [dateNow, setDateNow] = useState(calendarDateFromJsDateObject(new Date(Date.now())))
	const [dateList, setDateList] = useState<any[]>([])
	
	const foo = (from: CalendarDate, to: CalendarDate):any[] =>  {
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
		setDateList(foo({ year: date.year, month: date.month, day: 1 }, { year: date.year, month: date.month, day: numberOfDaysInMonth(date)})) 
	},[]);

  return(
  <IonPage>
	<IonContent>
		<p>{date.month}</p>
		<div className='calendar'>
			<div className='calendarRow'>
				{dateList.map((date,index) => index+1 % 7 != 0 && index+1 > 0 && index <= 6 ? <div className={date.day == dateNow.day && date.month == dateNow.month && date.year == dateNow.year ? ' currentCalendarDate':'calendarDate'}>{date.day}</div>: null)}
			</div>
			
			<div className='calendarRow'>
			{dateList.map((date,index) => index+1 % 14 != 0 && index+1 > 7 && index <= 13 ? <div className={date.day == dateNow.day && date.month == dateNow.month && date.year == dateNow.year ? ' currentCalendarDate':'calendarDate'}>{date.day}</div>: null)}
			</div>

			<div className='calendarRow'>
			{dateList.map((date,index) => index+1 % 21 != 0 && index+1 > 14 && index <= 20 ? <div className={date.day == dateNow.day && date.month == dateNow.month && date.year == dateNow.year ? ' currentCalendarDate':'calendarDate'}>{date.day}</div>: null)}
			</div>

			<div className='calendarRow'>
			{dateList.map((date,index) => index+1 % 28 != 0 && index+1 > 21 && index <= 27 ? <div className={date.day == dateNow.day && date.month == dateNow.month && date.year == dateNow.year ? ' currentCalendarDate':'calendarDate'}>{date.day}</div>: null)}
			</div>

			<div className='calendarRow'>
			{dateList.map((date,index) => index+1 % 33 != 0 && index+1 > 28 && index <= 33 ? <div className={date.day == dateNow.day && date.month == dateNow.month && date.year == dateNow.year ? ' currentCalendarDate':'calendarDate'}>{date.day}</div>: null)}
			</div>
		</div>
	</IonContent>
  </IonPage>
);
}

export default History;