import {
	IonToolbar,
	IonTitle,
	IonIcon,
	IonBadge,
	IonButton,
	IonHeader,
	IonRouterLink,
	IonContent,
	IonTabs,
	IonTab,
	IonLabel,
	IonTabBar,
	IonTabButton,
	IonRouterOutlet,
	IonText
  } from '@ionic/react';
  import { menu, medkit, notifications, calendar, personCircle, map, informationCircle } from 'ionicons/icons';
  import '../styles/LowerToolbar.css';
  import Notifications from '../pages/Notifications';
  import { Route } from 'react-router';
  import { IonReactRouter } from '@ionic/react-router';
  
  const LowerToolbar: React.FC = () => {
	return (
		
		<IonTabBar className='tabBarSecondary' slot="top">
		<IonTabButton tab="regimes" href="/regimes">
		  <IonIcon icon={medkit} />
		  <IonLabel>Regimes</IonLabel>
		</IonTabButton>
		<IonTabButton tab="chat" href="/chat">
		  <IonIcon icon={calendar} />
		  <IonLabel>Chat</IonLabel>
		</IonTabButton>
	  </IonTabBar>
	);
  };
  
  export default LowerToolbar;