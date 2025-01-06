import { IonButton, IonCard, IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
//import ExploreContainer from '../components/ExploreContainer';
import './NotificationPage.css';

enum urgency {
	LOW, MEDIUM, HIGH
}
type Notification = {
	id:number,
	content:string,
	timestamp:string,
	urgency:urgency
}

async function getMockData() {
  try {
	const { data, status } = await axios.get(
	  'https://demo3553220.mockable.io/notification',
	  {
		headers: {
		  Accept: 'application/json'
		},
	  },
	);

	return data;

  } catch (error) {
	if (axios.isAxiosError(error)) {
	  console.log('error message: ', error.message);
	  return error.message;
	} else {
	  console.log('unexpected error: ', error);
	  return 'An unexpected error occurred';
	}
  }
}

const NotificationPage: React.FC = () => {
	const [notifications, setNotifications] = useState<Notification[]>();

	useEffect(() => {
		getMockData().then(setNotifications);
	  }, []);

  return (
	<IonPage>
	  <IonHeader>
		<IonToolbar>
		  <IonTitle className='center'>Notifications</IonTitle>
		</IonToolbar>
	  </IonHeader>
	  <IonContent fullscreen className='wrapper'>
		{notifications?.map(notification => <p>{notification.id} {notification.timestamp} {notification.urgency}</p>)}
	  </IonContent>
	</IonPage>
  );
};

export default NotificationPage;
