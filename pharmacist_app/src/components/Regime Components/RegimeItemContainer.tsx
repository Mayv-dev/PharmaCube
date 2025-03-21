import { RegimeItem } from 'api types/types';
import '../../styles/RegimeItemContainer.css';
import { IonButton, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { createOutline, trashOutline } from "ionicons/icons";

function handleDate(date:number):string {
	let stringDay = "";

	if(date % 10 == 1 && date != 11) stringDay = date + "st"
	else if(date % 10 == 2 && date != 12) stringDay = date + "nd"
	else if(date % 10 == 3 && date != 13) stringDay = date + "rd"
	else stringDay = date + "th"

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
				
			<IonList className='listElement'>
      <IonItem>
        <IonLabel><span className='regimeInfoField'>Compartment:</span> <p>{regime.compartment_id == 0 ? "No compartment, indicated by 0" : regime.compartment_id}</p></IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel><span className='regimeInfoField'>Information:</span> <p>{regime.information}</p></IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel><span className='regimeInfoField'>Instructions:</span> <p>{regime.instructions}</p></IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel><span className='regimeInfoField'>When to take:</span> <p>{handleDate(regime.date)}, {timeOfDayConvert(regime.time_period)}</p></IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel><span className='regimeInfoField'>Hours before repeat:</span> <p>{regime.time_adjustment} hours</p></IonLabel>
      </IonItem>
    </IonList>

				
			</div>
			<div className='regimeItemContainerButtons'>
				<IonButton onClick={() => deleteItem(regime.id)} color="danger">
				<IonIcon icon={trashOutline} />
				</IonButton>
				<IonButton routerLink="/regimes/modify" onClick={() => {
					modifyItem(regime)
					console.log("From regimeitemcontainer. Look for dateinfo: ",regime)
				}} color="primary">
				<IonIcon icon={createOutline} />
				</IonButton>
			</div>
			
		</div>
	)
}

export default RegimeItemContainer;
