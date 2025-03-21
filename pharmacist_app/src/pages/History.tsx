import { IonContent, IonItem, IonPage, IonSelect, IonSelectOption} from '@ionic/react';
import '../styles/Settings.css';
import '../styles/History.css';
import { useEffect, useState } from 'react';

// Used this as my library and reference for my calendar work https://www.npmjs.com/package/typescript-calendar-date
import { CalendarDate, calendarDateFromJsDateObject, numberOfDaysInMonth } from 'typescript-calendar-date';
import Calendar from '../components/History Components/Calendar';
import { PatientAdherenceRecord } from 'api types/types';
import axios from 'axios';
import CalendarDateSquare from 'components/History Components/CalendarDateSquare';


const History: React.FC = () => {
	const [date, setDate] = useState(calendarDateFromJsDateObject(new Date(Date.now())))
	const [dateNow, setDateNow] = useState(calendarDateFromJsDateObject(new Date(Date.now())))
	const [dateList, setDateList] = useState<any[]>([])

	const [patientHistoricalDosesList, setPatientHistoricalDosesList] = useState<PatientAdherenceRecord[]>([])

	const [patientId, setPatientId] = useState(undefined)
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

	  const getMockPatientList = () => {
		return [{
		  "id":1,
		  "name":"Ann Murphy",
		  "patient_schedule_ids":[0,1,2,3],
		  "scheduled_regime_ids":[0,1,2,3]
	  }]
	};

	  useEffect(() => {
		setDateList(getDateRange({ year: date.year, month: date.month, day: 1 }, { year: date.year, month: date.month, day: numberOfDaysInMonth(date)})) 
		setPatientList(getMockPatientList)
	},[]);

	useEffect(() => {
		patientId != undefined ? getHistoryFromServer().then(setPatientHistoricalDosesList) : null;
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
			{patientId == undefined ? <p>Select a patient to view their history</p> : 
				<div className='calendarLayout'>
					<div className='history'>
						<p>Calendar</p>
						<Calendar dateNow={dateNow} dateList={dateList} history={patientHistoricalDosesList}/>
					</div>
					<div className='historyLegend'>
						<p>Legend</p>
						<div className='historyLegendRow'>
							<div className={'legendCalendarDate notTakenDate'}></div> 
							<p>No doses taken</p>
						</div>
						<div className='historyLegendRow'>
							<div className={'legendCalendarDate takenDate'}></div>
							<p>All doses taken</p>
						</div>
						<div className='historyLegendRow'>
							<div className={'legendCalendarDate partiallyTakenDate'}></div>
							<p>Only some doses have been taken</p>
						</div>
						<div className='historyLegendRow'>
							<div className={'legendCalendarDate currentCalendarDate'}></div>
							<p>Current day</p>
						</div>
					</div>
				</div>
			}
		</div>
	</IonContent>
  </IonPage>
);
}

export default History;