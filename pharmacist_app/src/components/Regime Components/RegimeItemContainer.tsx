import { RegimeItem } from 'api types/types';
import '../../styles/RegimeItemContainer.css';
import { IonButton, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { createOutline, trashOutline } from "ionicons/icons";

function dayConvert(day:number):string {
	let stringDay = "";

	switch (day) {
		case 0: {
			alert("A 0 was passed into a regime item container as a day of the week, this is a sign of a server side error. Call in the Méabh..")
			break;
		}
		case 1: {
			stringDay = "Monday";
			break;
		}
		case 2: {
			stringDay = "Tuesday";
			break;
		}
		case 3: {
			stringDay = "Wednesday";
			break;
		}
		case 4: {
			stringDay = "Thursday";
			break;
		}
		case 5: {
			stringDay = "Friday";
			break;
		}
		case 6: {
			stringDay = "Saturday";
			break;
		}
		case 7: {
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
			alert("A 0 was passed into a regime item container as a time of day, this is a sign of a server side error. Call in the Méabh..")
			break;
		}
		case 1: {
			stringDay = "Morning";
			break;
		}
		case 2: {
			stringDay = "Afternoon";
			break;
		}
		case 3: {
			stringDay = "Evening";
			break;
		}
		case 4: {
			stringDay = "Night";
			break;
		}
	}

	return stringDay;
}

type ContainerProps = {
	regime:RegimeItem,
	deleteItem:any,
	modifyItem:any
}

const RegimeItemContainer: React.FC<ContainerProps> = ({regime, deleteItem, modifyItem}) => 
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
				<IonButton routerLink="/regimes/modify" onClick={() => modifyItem(regime)} color="primary">
				<IonIcon icon={createOutline} />
				</IonButton>
			</div>
			
		</div>
	)
}

export default RegimeItemContainer;
