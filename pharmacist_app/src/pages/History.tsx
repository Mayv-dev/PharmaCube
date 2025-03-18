import { IonContent, IonItem, IonPage, IonSelect, IonSelectOption} from '@ionic/react';
import '../styles/Settings.css';
import '../styles/History.css';
import { useEffect, useState } from 'react';

// Used this as my library and reference for my calendar work https://www.npmjs.com/package/typescript-calendar-date
import { CalendarDate, calendarDateFromJsDateObject, numberOfDaysInMonth } from 'typescript-calendar-date';
import Calendar from '../components/History Components/Calendar';
import { PatientAdherenceRecord } from 'api types/types';
import axios from 'axios';


const History: React.FC = () => {
	const [date, setDate] = useState(calendarDateFromJsDateObject(new Date(Date.now())))
	const [dateNow, setDateNow] = useState(calendarDateFromJsDateObject(new Date(Date.now())))
	const [dateList, setDateList] = useState<any[]>([])

	const [patientHistoricalDosesList, setPatientHistoricalDosesList] = useState<PatientAdherenceRecord[]>([])

	const [patientId, setPatientId] = useState<number>(0)
	const [patientList, setPatientList] = useState<any[]>([])

	
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

	const getHistoryFromServer = async () => {
		try {
		  const { data, status } = await axios.get(
			`http://localhost:8080/patient/${patientId}/history`,
			{
			  headers: {
				Accept: 'application/json'
			  },
			  // Got help with handling a 302 return on history GET request with https://stackoverflow.com/questions/67623396/how-to-make-axios-not-to-throw-an-exception-when-http-302-is-encountered-but-re
			  validateStatus: function (status) {
                return status == 302;
            }
			},
		  );
	
		  return data;
	
		} catch (error) {
		  if (axios.isAxiosError(error)) {
			console.log('error message: ', error.message);
			return error.message;
		  } else {
			console.log('unexpected error: ', error);
			return 'An unexpected error occurred';
		  }
		}
	  };

	  const getMockPatientList = async () => {
		try {
		  const { data, status } = await axios.get(
			`http://demo3553220.mockable.io/patients`,
			{
			  headers: {
				Accept: 'application/json'
			  },
			},
		  );
	
		  return data;
	
		} catch (error) {
		  if (axios.isAxiosError(error)) {
			console.log('error message: ', error.message);
			return error.message;
		  } else {
			console.log('unexpected error: ', error);
			return 'An unexpected error occurred';
		  }
		}
	  };

	  useEffect(() => {
		setDateList(getDateRange({ year: date.year, month: date.month, day: 1 }, { year: date.year, month: date.month, day: numberOfDaysInMonth(date)})) 
		getMockPatientList().then(setPatientList)
	},[]);

	useEffect(() => {
		getHistoryFromServer().then(setPatientHistoricalDosesList)
	},[patientId]);

  return(
  <IonPage>
	<IonContent className="ion-padding">
		<div className='webBody'>
			<IonItem>
				<IonSelect value={patientId} onIonChange={e => setPatientId(e.target.value)} label='Choose a patient'>
					{patientList.map(patientInList => <IonSelectOption value={patientInList.id}>{patientInList.name}</IonSelectOption>)}
				</IonSelect>
			</IonItem>
			{patientId == 0 ? <p>Select a patient to view their history</p> : <Calendar dateNow={dateNow} dateList={dateList} history={patientHistoricalDosesList}></Calendar>}
		</div>
	</IonContent>
  </IonPage>
);
}

export default History;