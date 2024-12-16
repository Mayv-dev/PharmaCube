import {
  IonPage,
  IonContent,
} from '@ionic/react';
import LowerToolbar from '../components/LowerToolbar';
import '../styles/Notifications.css';

const Notifications: React.FC = () => (
	<IonPage>
	  
	  <LowerToolbar title='Notifications'/>
  
	  <IonContent></IonContent>
  
	</IonPage>
  );

export default Notifications;

