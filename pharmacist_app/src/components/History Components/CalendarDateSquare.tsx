import { IonButton, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import '../../styles/Settings.css';
import '../../styles/DoseSquare.css';
import { CalendarDate } from 'typescript-calendar-date';
import { useState } from 'react';
import DoseTakenStatus from './DoseTakenStatus';
import { PatientAdherenceRecord } from 'api types/types';
IonModal
type CalendarProps = {
	date:CalendarDate;
	dateNow:CalendarDate;
	history:PatientAdherenceRecord[];
	visibleHighlights:any;
}

const CalendarDateSquare: React.FC<CalendarProps> = ({date,dateNow,history,visibleHighlights}) => {
	  const [showModal, setShowModal] = useState(false);

	function handleDate(date:number):string {
		let stringDay = "";

		if(date % 10 == 1 && date != 11) stringDay = date + "st"
		else if(date % 10 == 2 && date != 12) stringDay = date + "nd"
		else if(date % 10 == 3 && date != 13) stringDay = date + "rd"
		else stringDay = date + "th"

		return stringDay;
	}

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

	function convertMonthDigits(monthString: string): string {
		switch (monthString) {
			case "01": 
				return "jan";
			case "02": 
				return "feb";
			case "03": 
				return "mar";
			case "04": 
				return "apr";
			case "05": 
				return "may";
			case "06": 
				return "jun";
			case "07": 
				return "jul";
			case "08": 
				return "aug";
			case "09": 
				return "sep";
			case "10": 
				return "oct";
			case "11": 
				return "nov";
			case "12": 
				return "dec";
			default:
				return "";
		}
	}

	const returnTakenStatus = () => {
		const thisDayHistory = history.filter(hist => hist.date_time_scheduled.substring(0,4) == date.year.toString() && convertMonthDigits(hist.date_time_scheduled.substring(5,7)) == date.month.toString() && Number.parseInt(hist.date_time_scheduled.substring(8,10)) == date.day)
		const takenList = thisDayHistory.map(hist => hist.was_taken)

		if(takenList.length == 0) return "";

		if(takenList.includes(false)) {
			return takenList.includes(true) ?  
			visibleHighlights[2].isVisible ? "partiallyTakenDate": "calendarDate" 
			: 
			visibleHighlights[0].isVisible ? "notTakenDate" : "calendarDate";
		}
		else return visibleHighlights[1].isVisible ? "takenDate" : "calendarDate";
	}



	let square:any
		if(date.day == dateNow.day && date.month == dateNow.month && date.year == dateNow.year) {
			square = <div onClick={e => setShowModal(true)} className={visibleHighlights[3].isVisible ? 'currentCalendarDate' : "calendarDate"}>
				{date.day}
			</div>
		}
		else {
			square= <div onClick={e => setShowModal(true)} className={"calendarDate " + returnTakenStatus()}>
				{date.day}
				</div>
		}
	return (
		<>
			{square}
			<IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
				<IonButton expand="full" color="medium" className="cancel-button" onClick={() => setShowModal(false)}>
					Close
				</IonButton>
				<IonHeader>
				<IonToolbar>
					<IonTitle>Dose History</IonTitle>
				</IonToolbar>
				</IonHeader>
				<IonContent className="ion-padding">
					<p>Dose overview for the {handleDate(date.day)} of {convertMonthName(date.month)} {date.year}</p>
					{history.map(hist => hist.date_time_scheduled.substring(0,4) == date.year.toString() && convertMonthDigits(hist.date_time_scheduled.substring(5,7)) == date.month.toString() && Number.parseInt(hist.date_time_scheduled.substring(8,10)) == date.day ? 
					<DoseTakenStatus time={hist.date_time_scheduled.substring(11,16)} medList={hist.information} takenStatus={hist.was_taken}/>: null)}
				</IonContent>
			</IonModal>
		</>
	);
	
};

export default CalendarDateSquare;