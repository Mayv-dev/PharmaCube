import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonText
} from '@ionic/react';
import '../styles/Regimes.css';
import { add, search } from 'ionicons/icons';

const Regimes = () => {

  return (
    <IonPage>
			<IonContent className="ion-padding">
				<div className='webBody'>
					<div className='regimeButtonLayout'>
							<IonButton routerLink="/regimes/create" routerDirection='root' expand="block" className='regimeButtonSizing' color="light">
								<div className='regimeButtonInternals'>
									<IonIcon icon={add} size='large'></IonIcon>
									<IonText>Create a Dose for Patient</IonText>
								</div>
							</IonButton>
							<IonButton routerLink="/regimes/view" routerDirection='root' expand="block" className='regimeButtonSizing' color="light">
							<div className='regimeButtonInternals'>
								<IonIcon icon={search} size='large'></IonIcon>
								<IonText>View Existing Patient Doses</IonText>
							</div>
							</IonButton>
					</div>
				</div>
			</IonContent>
    </IonPage>
  );
};

export default Regimes;

