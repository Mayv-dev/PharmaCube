import { IonButton, IonCard, IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import './NotificationPage.css';

const NotificationPage: React.FC = () => {
  return (
	<IonPage>
	  <IonHeader>
		<IonToolbar>
		  <IonTitle className='center'>Notifications</IonTitle>
		</IonToolbar>
	  </IonHeader>
	  <IonContent fullscreen className='wrapper'>
		
	  </IonContent>
	</IonPage>
  );
};

export default NotificationPage;
