import {
  IonPage,
  IonContent,
  IonSelect,
  IonItem,
  IonSelectOption
} from '@ionic/react';
import LowerToolbar from '../components/LowerToolbar';
import '../styles/Notifications.css';
import { useEffect, useState } from 'react';
import { Notification } from '../components/UpperToolbar';
import NotificationItem from '../components/NotificationItem';

const Notifications: React.FC = () => {
		const [notificationList, setNotificationList] = useState<Notification[]>();

	useEffect(() => {
		setNotificationList([{
			id: 1,
			content: "Take your Wednesday morning medication from compartment 2",
			timestamp: "2025-01-06T09:00:19+00:00",
			urgency: 1
		   },
		   {
			id: 1,
			content: "Urgent message from your patient Aaron Murphy",
			timestamp: "2025-01-06T06:00:19+00:00",
			urgency: 2
		   },
		   {
			id: 1,
			content: "Take your Wednesday Night medication from compartment 5",
			timestamp: "2025-01-06T23:00:19+00:00",
			urgency: 0
		   }]);
	  }, []);
	return (
	<IonPage>
  
  <IonContent className="ion-padding">
	<div className='webBody'>
		<div className='rowOfSelects'>
			<IonItem>
          <IonSelect label="Filter By:">
            <IonSelectOption>None</IonSelectOption>
            <IonSelectOption>High Priority</IonSelectOption>
            <IonSelectOption>Medium Priority</IonSelectOption>
            <IonSelectOption>Low Priority</IonSelectOption>
          </IonSelect>
        </IonItem>
		<IonItem>
          <IonSelect label="Sort By:">
            <IonSelectOption>Most Recent</IonSelectOption>
            <IonSelectOption>Highest Priority</IonSelectOption>
          </IonSelect>
        </IonItem>
		</div>
		{notificationList?.map(notification => <NotificationItem id={notification.id} content={notification.content} timestamp={notification.timestamp} urgencyPassed={notification.urgency}/>)}
		</div>
		</IonContent>
  
	</IonPage>
  );
};

export default Notifications;

