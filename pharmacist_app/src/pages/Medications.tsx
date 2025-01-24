import { IonButton, IonContent, IonPage, IonRouterLink } from '@ionic/react';
import LowerToolbar from '../components/LowerToolbar';
import '../styles/Medications.css';

const Medications: React.FC = () => {
  return (
    <IonPage>
      <LowerToolbar title='Medications'/>
	  
  		<IonContent className="ion-padding">
		  <IonRouterLink routerLink='/medications/add'>
			<IonButton expand="block" className='ScheduleButtons' color="light">
				Add Medication To User
			</IonButton>
			</IonRouterLink>
			<IonRouterLink routerLink='/medications/view'>
				<IonButton expand="block" className='ScheduleButtons' color="light">
					View User Medications
				</IonButton>
			</IonRouterLink>
		</IonContent>
    </IonPage>
  );
};

export default Medications;