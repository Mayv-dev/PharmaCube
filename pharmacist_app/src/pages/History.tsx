import { IonButton, IonContent, IonIcon, IonItem, IonPage, IonSelect, IonSelectOption} from '@ionic/react';
import '../styles/Settings.css';
import '../styles/History.css';
import { useEffect, useState } from 'react';

// Used this as my library and reference for my calendar work https://www.npmjs.com/package/typescript-calendar-date
import { addDays, CalendarDate, calendarDateFromJsDateObject, numberOfDaysInMonth } from 'typescript-calendar-date';
import Calendar from '../components/History Components/Calendar';
import { PatientAdherenceRecord } from 'api types/types';
import axios from 'axios';
import { arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';

type HistoryProps = {
	passedPatientId:number
	changePatientId:any
	passedPatientList:any
	passedPharmacistId:number
}

const History: React.FC<HistoryProps> = ({passedPatientId, changePatientId, passedPatientList,passedPharmacistId}) => {
	const [date, setDate] = useState<CalendarDate>(calendarDateFromJsDateObject(new Date(Date.now())))
	const [dateNow, setDateNow] = useState<CalendarDate>(calendarDateFromJsDateObject(new Date(Date.now())))
	const [dateList, setDateList] = useState<any[]>([])

	const [patientHistoricalDosesList, setPatientHistoricalDosesList] = useState<PatientAdherenceRecord[]>([])

	const [highlightToggle, setHighlightToggle] = useState<{highlightType:string, isVisible:boolean}[]>([{highlightType:"No Doses Taken", isVisible:true}, {highlightType:"All Doses Taken", isVisible:true},{highlightType:"Only Some Doses Have Been Taken", isVisible:true},{highlightType:"Current Day", isVisible:true}])

	
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
			`${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/pharmacist/${passedPharmacistId}/patient/${passedPatientId}/history`,
			{
			  headers: {
				Accept: 'application/json'
			  },
			  // Got help with handling a 302 return on history GET request with https://stackoverflow.com/questions/67623396/how-to-make-axios-not-to-throw-an-exception-when-http-302-is-encountered-but-re
			  validateStatus: function (status) {
                return status == 302 || status == 200;
            }
			},
		  );
	
		  return data;
	
		} 
		catch (e:any) {
			if(e.code == "ERR_NETWORK") alert("Unable to connect to the server. Are you connected to the internet?")
			if(e.code == "ERR_BAD_REQUEST") alert("This user was not found on the system. If you believe this is incorrect, contact a system administrator to validate user ID.")
		}
	  };

	  useEffect(() => {
		setDateList(getDateRange({ year: date.year, month: date.month, day: 1 }, { year: date.year, month: date.month, day: numberOfDaysInMonth(date)})) 
	},[date, ]);

	useEffect(() => {
		passedPatientId != 0 && passedPatientId != undefined? getHistoryFromServer().then(setPatientHistoricalDosesList) : null;
	},[passedPatientId]);

	function convertMonthName(monthString: string): string {
		switch (monthString) {
			case "jan": 
				return "January";
			case "feb": 
				return "February";
			case "mar": 
				return "March";
			case "apr": 
				return "April";
			case "may": 
				return "May";
			case "jun": 
				return "June";
			case "jul": 
				return "July";
			case "aug": 
				return "August";
			case "sep": 
				return "September";
			case "oct": 
				return "October";
			case "nov": 
				return "November";
			case "dec": 
				return "December";
			default:
				return "";
		}
	}

	const handleToggleSwitch = (passedHighlight:string) => {
		let newHighlightToggle = highlightToggle.map(h => h.highlightType == passedHighlight ? {highlightType:h.highlightType, isVisible:!h.isVisible} : h)
		setHighlightToggle(newHighlightToggle)
	}

  return(
  <IonPage>
	<IonContent className="ion-padding">
		<div className='webBody'>
			<IonItem>
				<IonSelect value={passedPatientId} onIonChange={e => changePatientId(e.target.value)} label='Choose a patient'>
					{passedPatientList.map(patientInList => <IonSelectOption key={patientInList.id} value={patientInList.id}>{patientInList.name}</IonSelectOption>)}
				</IonSelect>
			</IonItem>
			{passedPatientId == 0 ? <p>Select a patient to view their history</p> : 
				<div className='calendarLayout'>
					<div className='history'>
						<div className='calendarScrollerBar'>
							<IonButton onClick={e => setDate(addDays(date, -31))}><IonIcon icon={arrowBackOutline}></IonIcon></IonButton>
							<p>Calendar - {convertMonthName(date.month)} {date.year}</p>
							<IonButton onClick={e => setDate(addDays(date, 31))}><IonIcon icon={arrowForwardOutline}></IonIcon></IonButton>
						</div>
						<Calendar dateNow={dateNow} dateList={dateList} history={patientHistoricalDosesList} visibleHighlights={highlightToggle}/>
					</div>
					<div className='historyLegend'>
						<p>Legend</p>
						<div className={highlightToggle[0].isVisible ? 'historyLegendRow' : 'historyLegendRow faded'} onClick={e => handleToggleSwitch("No Doses Taken")}>
							<div className={'legendCalendarDate ' + (date.month == "mar" ? "march_notTakenDate": date.month == "feb" ? "february_notTakenDate" : "notTakenDate")} ></div> 
							<p>No doses taken</p>
						</div>
						<div className={highlightToggle[1].isVisible ? 'historyLegendRow' : 'historyLegendRow faded'} onClick={e => handleToggleSwitch("All Doses Taken")}>
							<div className={'legendCalendarDate ' + (date.month == "mar" ? "march_takenDate": date.month == "feb" ?  "february_takenDate" : "takenDate")}  ></div>
							<p>All doses taken</p>
						</div>
						<div className={highlightToggle[2].isVisible ? 'historyLegendRow' : 'historyLegendRow faded'} onClick={e => handleToggleSwitch("Only Some Doses Have Been Taken")}>
							<div className={'legendCalendarDate '  + (date.month == "mar" ? "march_partiallyTakenDate": date.month == "feb" ? "february_partiallyTakenDate" : "partiallyTakenDate")} ></div>
							<p>Only some doses have been taken</p>
						</div>
						<div className={highlightToggle[3].isVisible ? 'historyLegendRow' : 'historyLegendRow faded'} onClick={e => handleToggleSwitch("Current Day")}>
							<div className={'legendCalendarDate currentCalendarDate'} ></div>
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