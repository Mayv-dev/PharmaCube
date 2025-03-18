import {
  IonPage,
  IonContent,
  IonButton,
  IonRouterLink
} from '@ionic/react';
import '../styles/Regimes.css';

const Regimes = () => {

  return (
    <IonPage>
			<IonContent className="ion-padding">
				<div className='webBody'>
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
				</div>
			</IonContent>
    </IonPage>
  );
};

export default Regimes;

