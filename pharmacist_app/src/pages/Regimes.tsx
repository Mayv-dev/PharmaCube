import { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonCard,
  IonRouterLink
} from '@ionic/react';
import '../styles/Regimes.css';
import LowerToolbar from '../components/LowerToolbar';

const Regimes = () => {

  return (
    <IonPage>
			<IonContent className="ion-padding">
				<IonRouterLink routerLink='/regimes/create'>
					<IonButton expand="block" className='ScheduleButtons' color="light">
						Make Regime For User
					</IonButton>
				</IonRouterLink>
				<IonRouterLink routerLink='/regimes/view'>
					<IonButton expand="block" className='ScheduleButtons' color="light">
						View User Regimes
					</IonButton>
				</IonRouterLink>
			</IonContent>
    </IonPage>
  );
};

export default Regimes;

