import { RegimeItem } from 'api types/types';
import '../../styles/RegimeItemContainer.css';
import { IonButton, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { createOutline, trashOutline } from "ionicons/icons";

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
			stringDay = "Late Night";
			break;
		}
		case 1: {
			stringDay = "Early Morning";
			break;
		}
		case 2: {
			stringDay = "Morning";
			break;
		}
		case 3: {
			stringDay = "Afternoon";
			break;
		}
		case 4: {
			stringDay = "Evening";
			break;
		}
		case 5: {
			stringDay = "Night";
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
				
			<IonList>
      <IonItem>
        <IonLabel><span className='regimeInfoField'>Compartment:</span> {regime.compartment_id == 0 ? "No compartment, indicated by 0" : regime.compartment_id}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel><span className='regimeInfoField'>Information:</span> {regime.information}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel><span className='regimeInfoField'>Instructions:</span> {regime.instructions}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel><span className='regimeInfoField'>When to take:</span> {dayConvert(regime.day)}, {timeOfDayConvert(regime.time_period)}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel><span className='regimeInfoField'>Time Offset:</span> {regime.time_adjustment}</IonLabel>
      </IonItem>
    </IonList>

				
			</div>
			<div className='regimeItemContainerButtons'>
				<IonButton onClick={() => deleteItem(regime.id)} color="danger">
				<IonIcon icon={trashOutline} />
				</IonButton>
				<IonButton onClick={() => console.log("Modify with the included regime, also ", regime)} color="primary">
				<IonIcon icon={createOutline} />
				</IonButton>
			</div>
			
		</div>
	)
}

export default RegimeItemContainer;
