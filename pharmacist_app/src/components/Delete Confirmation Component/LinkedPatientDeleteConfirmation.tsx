//import ExploreContainer from '../components/ExploreContainer';
import { IonModal, IonToolbar, IonTitle, IonHeader, IonContent, IonButton } from '@ionic/react';
type popupInfo = {
	patient_id: number;
	patient_name: string;
	delete_denied:any;
	delete_confirmed:any;
  };

const LinkedPatientDeleteConfirmation: React.FC<popupInfo> = ({patient_id,patient_name,delete_denied,delete_confirmed}) => {
  return (
	<>
			  <IonHeader>
				<IonToolbar>
				  <IonTitle>Confirm Submission</IonTitle>
				</IonToolbar>
			  </IonHeader>
			  <IonContent className="ion-padding">
				<p>Are you sure you wish to delete {patient_name} from your list?</p>
				<IonButton expand="full" color="primary" onClick={() => {
					//deletePatient()
					//setShowModal(false)
					}}>
				  Yes
				</IonButton>
				<IonButton expand="full" color="medium" className="cancel-button" onClick={() => console.log("To be changed") /*setShowModal(false)*/}>
				  No
				</IonButton>
			  </IonContent>
			  </>
  );
};

export default LinkedPatientDeleteConfirmation;