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
  import { medkit,menu,notifications, chatbubbleOutline, calendar, personCircle, map, informationCircle } from 'ionicons/icons';
  import '../styles/LowerToolbar.css';
  import Notifications from '../pages/Notifications';
  import { Route } from 'react-router';
  import { IonReactRouter } from '@ionic/react-router';
  
  const UpperToolbar: React.FC = () => {
	return (
	
	<IonTabBar className='tabBarPrimary' slot="top">

	<IonTabButton tab="menu" href="/menu">
	  <IonIcon icon={menu} aria-hidden="true" />
	  <IonLabel>Menu</IonLabel>
	  </IonTabButton>
	  <IonTabButton tab="notifications" href="/notifications">
	  <IonIcon icon={notifications} aria-hidden="true" />
	  <IonLabel>Notifications</IonLabel>
	  </IonTabButton>
  </IonTabBar>
	);
  };
  
  export default UpperToolbar;