import { IonIcon, IonText } from '@ionic/react';
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
	urgencyPassed:urgency
}

const NotificationItem: React.FC<NotificationItemProps> = ({ id,content, timestamp, urgencyPassed }) => 
{
	let nameOfClass:string;

	if(urgencyPassed == urgency.LOW) nameOfClass = "notificationItemContainer lowNotification";
	else if(urgencyPassed == urgency.MEDIUM) nameOfClass = "notificationItemContainer mediumNotification";
	else nameOfClass = "notificationItemContainer highNotification";

	return (
		<div key={id} className={nameOfClass}>
			{urgencyPassed == urgency.HIGH ? 
				<IonIcon className={"notificationIcon"} icon={alert}></IonIcon>
				:
				urgencyPassed == urgency.MEDIUM ? 
					<IonIcon className={"notificationIcon"} icon={warning}></IonIcon>
					:
					<IonIcon className={"notificationIcon"} icon={checkmark}></IonIcon>
			}
			<p className='timeContainer'>{timestamp.substring(11,16)}</p>
			<p className='contentContainer'>{content}</p>
		</div>
	);
}

export default NotificationItem;
