import { RegimeItem } from 'api types/types';
import '../../styles/RegimeItemContainer.css';
import { IonButton } from '@ionic/react';
import { warning } from 'ionicons/icons';

function dayConvert(day:number):string {
	let stringDay = "";

	switch (day) {
		case 0: {
			stringDay = "Monday";
			break;
		}
		case 1: {
			stringDay = "Tuesday";
			break;
		}
		case 2: {
			stringDay = "Wednesday";
			break;
		}
		case 3: {
			stringDay = "Thursday";
			break;
		}
		case 4: {
			stringDay = "Friday";
			break;
		}
		case 5: {
			stringDay = "Saturday";
			break;
		}
		case 6: {
			stringDay = "Sunday";
			break;
		}
	}

	return stringDay;
}

function timeOfDayConvert(day:number):string {
	let stringDay = "";

	switch (day) {
		case 0: {
			stringDay = "Late Night - 00:00-04:00";
			break;
		}
		case 1: {
			stringDay = "Early Morning - 04:00-08:00";
			break;
		}
		case 2: {
			stringDay = "Morning - 08:00-12:00";
			break;
		}
		case 3: {
			stringDay = "Afternoon - 12:00-16:00";
			break;
		}
		case 4: {
			stringDay = "Evening - 16:00-20:00";
			break;
		}
		case 5: {
			stringDay = "Night - 20:00-00:00";
			break;
		}
	}

	return stringDay;
}

type ContainerProps = {
	regime:RegimeItem,
	deleteItem:any
}

const RegimeItemContainer: React.FC<ContainerProps> = ({regime, deleteItem}) => 
{
	return(
		<div key={regime.id} className='regimeItemContainer'>
			<div className='regimeItemContainerText'>
				<p>Compartment: {regime.copartment_id == 0 ? "No compartment, indicated by 0" : regime.copartment_id}</p>
				<p>Information: {regime.information}</p>
				<p>Day: {dayConvert(regime.period_scheduled.day)}</p>
				<p>Instructions: {regime.period_scheduled.instruction}</p>
				<p>Time of Day: {timeOfDayConvert(regime.period_scheduled.time_period)}</p>
				<p>Time Offset: {regime.period_scheduled.time_adjustment}</p>
				<p>Medications: TO BE ADDED TO API DEFINITION</p>
			</div>
			<div className='regimeItemContainerButtons'>
				<IonButton onClick={() => deleteItem(regime.id)} color="danger">
					<span className='deleteIcon'>🗑</span>
				</IonButton>
			</div>
			
		</div>
	)
}

export default RegimeItemContainer;
