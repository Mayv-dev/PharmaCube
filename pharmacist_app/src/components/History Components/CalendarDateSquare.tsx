import { IonButton, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import '../../styles/Settings.css';
import '../../styles/DoseSquare.css';
import { CalendarDate } from 'typescript-calendar-date';
import { square } from 'ionicons/icons';
import { useState } from 'react';
import DoseTakenStatus from './DoseTakenStatus';
IonModal
type CalendarProps = {
	date:CalendarDate
	dateNow:CalendarDate
}

const CalendarDateSquare: React.FC<CalendarProps> = ({date,dateNow}) => {
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
		}
	}



	let square:any
	if(date.day == dateNow.day && date.month == dateNow.month && date.year == dateNow.year) {
		square = <div onClick={e => setShowModal(true)} className={'currentCalendarDate'}>{date.day}</div>
	}
	else {
		square= <div onClick={e => setShowModal(true)} className={'calendarDate'}>{date.day}</div>
	}
	return (
		<>
			{square}
			<IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
					  <IonHeader>
						<IonToolbar>
						  <IonTitle>Confirm Submission</IonTitle>
						</IonToolbar>
					  </IonHeader>
					  <IonContent className="ion-padding">
						<p>Dose overview for the {handleDate(date.day)} of {convertMonthName(date.month)} {date.year}</p>
						<DoseTakenStatus time='10:00' takenStatus={false}/>
						<DoseTakenStatus time='19:00' takenStatus={true}/>
						<IonButton expand="full" color="medium" className="cancel-button" onClick={() => setShowModal(false)}>
						  Close
						</IonButton>
					  </IonContent>
					</IonModal>
		</>
	);
	
};

export default CalendarDateSquare;