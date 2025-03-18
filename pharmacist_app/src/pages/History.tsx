import { IonContent, IonItem, IonPage, IonSelect, IonSelectOption} from '@ionic/react';
import '../styles/Settings.css';
import '../styles/History.css';
import { useEffect, useState } from 'react';

// Used this as my library and reference for my calendar work https://www.npmjs.com/package/typescript-calendar-date
import { CalendarDate, calendarDateFromJsDateObject, numberOfDaysInMonth } from 'typescript-calendar-date';
import Calendar from '../components/History Components/Calendar';
import { PatientAdherenceRecord } from 'api types/types';


const History: React.FC = () => {
	const [date, setDate] = useState(calendarDateFromJsDateObject(new Date(Date.now())))
	const [dateNow, setDateNow] = useState(calendarDateFromJsDateObject(new Date(Date.now())))
	const [dateList, setDateList] = useState<any[]>([])

	const [patientHistoricalDosesList, setPatientHistoricalDosesList] = useState<PatientAdherenceRecord[]>([
		{
		  "patient_id": 1,
		  "information": "Aspirin 100mg",
		  "date_time_scheduled": "2025-03-17T08:00:00Z",
		  "date_time_taken": "2025-03-17T08:00:00Z",
		  "was_taken": true,
		  "time_period": 1
		},
		{
		  "patient_id": 1,
		  "information": "Metformin 500mg",
		  "date_time_scheduled": "2025-03-15T12:00:00Z",
		  "date_time_taken": "2025-03-15T12:00:00Z",
		  "was_taken": false,
		  "time_period": 1
		},
		{
		  "patient_id": 1,
		  "information": "Lisinopril 10mg",
		  "date_time_scheduled": "2025-03-16T18:00:00Z",
		  "date_time_taken": "2025-03-16T18:00:00Z",
		  "was_taken": true,
		  "time_period": 1
		},
		{
		  "patient_id": 1,
		  "information": "Lisinopril 10mg",
		  "date_time_scheduled": "2025-03-16T18:00:00Z",
		  "date_time_taken": "2025-03-16T18:00:00Z",
		  "was_taken": false,
		  "time_period": 1
		},
		{
		  "patient_id": 1,
		  "information": "Lisinopril 10mg",
		  "date_time_scheduled": "2025-03-14T18:00:00Z",
		  "date_time_taken": "2025-03-14T18:00:00Z",
		  "was_taken": true,
		  "time_period": 1
		}
	  ])
	
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
	<IonContent className="ion-padding">
		<div className='webBody'>
			<IonItem>
				<IonSelect label='Choose a patient'>
					<IonSelectOption></IonSelectOption>
				</IonSelect>
			</IonItem>
			<Calendar dateNow={dateNow} dateList={dateList} history={patientHistoricalDosesList}></Calendar>
		</div>
	</IonContent>
  </IonPage>
);
}

export default History;