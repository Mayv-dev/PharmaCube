import {
	IonIcon,
	IonLabel,
	IonTabBar,
	IonTabButton
<<<<<<< HEAD
} from '@ionic/react';
import { medkit, chatbubbleOutline } from 'ionicons/icons';
import '../styles/LowerToolbar.css';

const LowerToolbar: React.FC = () => {
	return (
		<IonTabBar className='tabBarSecondary' slot="top">
			<IonTabButton tab="regimes" href="/regimes">
				<IonIcon icon={medkit} />
				<IonLabel>Regimes</IonLabel>
			</IonTabButton>
			<IonTabButton tab="chat" href="/chat">
				<IonIcon icon={chatbubbleOutline} />
				<IonLabel>Chat</IonLabel>
			</IonTabButton>
		</IonTabBar>
=======
  } from '@ionic/react';
  import { medkit, chatbubbleOutline } from 'ionicons/icons';
  import '../styles/LowerToolbar.css';
  
  const LowerToolbar: React.FC = () => {
	return (
		<IonTabBar className='tabBarSecondary' slot="top">
		<IonTabButton tab="regimes" href="/regimes">
		  <IonIcon icon={medkit} />
		  <IonLabel>Regimes</IonLabel>
		</IonTabButton>
		<IonTabButton tab="chat" href="/chat">
		  <IonIcon icon={chatbubbleOutline} />
		  <IonLabel>Chat</IonLabel>
		</IonTabButton>
	  </IonTabBar>
>>>>>>> d1c4d74 (Implement blank notification/hamburger side menus)
	);
};

export default LowerToolbar;
