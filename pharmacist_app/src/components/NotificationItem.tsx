import { IonIcon, useIonRouter } from '@ionic/react';
import './ExploreContainer.css';
import './NotificationItem.css';
import { alert, checkmark, warning } from 'ionicons/icons';

enum urgency {
	LOW, MEDIUM, HIGH
}

interface NotificationItemProps {
	id:number,
	content:string,
	timestamp:string,
	urgencyPassed:urgency,
	minimize:any
}

const NotificationItem: React.FC<NotificationItemProps> = ({ id,content, timestamp, urgencyPassed, minimize }) => 
{
	let nameOfClass:string;
	let body:string = JSON.parse(content)["body"]

	if(urgencyPassed == urgency.LOW) nameOfClass = "notificationItemContainer lowNotification";
	else if(urgencyPassed == urgency.MEDIUM) nameOfClass = "notificationItemContainer mediumNotification";
	else nameOfClass = "notificationItemContainer highNotification";

  const router = useIonRouter()
	const handleRouting = () => {
		if (JSON.parse(content)["route_to"] == "chat" && router.routeInfo.pathname != "/chat/patient") {
			router.push("/chat/patient", "none");
			minimize()
		}
	}

	return (
		<div key={id} className={nameOfClass} onClick={e => {handleRouting();}}>
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
			<p className='contentContainer'>{body}</p>
		</div>
	);
}

export default NotificationItem;
