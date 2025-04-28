import { IonIcon, useIonRouter } from '@ionic/react';
import './ExploreContainer.css';
import './NotificationItem.css';
import { alert, checkmark, warning } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

enum urgency {
	LOW, MEDIUM, HIGH
}

interface NotificationItemProps {
	patient_id:number,
	body:string,
	route_to:string,
	timestamp:string,
	urgencyPassed:urgency,
	minimize:any
	setPatientId:any
	pharmacistId:number
}

const NotificationItem: React.FC<NotificationItemProps> = ({ pharmacistId, patient_id, body, route_to, timestamp, urgencyPassed, minimize, setPatientId }) => 
{
	const [nameOfClass, setNameOfClass] = useState<string>("")
	const [patientName, setPatientName] = useState<string>("")

	const getPatient = async (patientId:number) => { 
		console.log(patientId)
		try {
		  const { data, status } = await axios.get(
		  `${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/patient/${patientId}`,
		  {
			headers: {
			Accept: 'application/json'
			},
		  },
		  );
		  
		  return data;
		
		} 
		catch (e:any) {
		  if(e.code == "ERR_NETWORK") alert("Unable to connect to the server. Are you connected to the internet?")
		  if(e.code == "ERR_BAD_REQUEST") alert("This user was not found on the system. If you believe this is incorrect, contact a system administrator to validate user ID.")
		}
	  }


	useEffect(() => {
		getPatient(patient_id).then(res => setPatientName(res.name))
		if(urgencyPassed == urgency.LOW) setNameOfClass("notificationItemContainer lowNotification");
		else if(urgencyPassed == urgency.MEDIUM) setNameOfClass("notificationItemContainer mediumNotification");
		else setNameOfClass("notificationItemContainer highNotification");
	},[patient_id,])  

	

  const router = useIonRouter()
	const handleRouting = () => {
		if (route_to == "chat" && router.routeInfo.pathname != "/chat/patient" && pharmacistId != 0) {
			setPatientId(patient_id)
			router.push("/chat/patient", "none");
			minimize()
		}
	}

	return (
		<div key={patient_id} className={nameOfClass} onClick={e => {handleRouting();}}>
			{urgencyPassed == urgency.HIGH ? 
				<IonIcon className={"notificationIcon"} icon={alert}></IonIcon>
				:
				urgencyPassed == urgency.MEDIUM ? 
					<IonIcon className={"notificationIcon"} icon={warning}></IonIcon>
					:
					<IonIcon className={"notificationIcon"} icon={checkmark}></IonIcon>
			}
			<div>
				<p className='timeContainer'>{timestamp.substring(0,10)}</p>
				<p className='timeContainer'>{timestamp.substring(11,16)}</p>
			</div>
			<p className='contentContainer'>{body.replace("${patient_id}",patientName)}</p>
		</div>
	);
}

export default NotificationItem;
