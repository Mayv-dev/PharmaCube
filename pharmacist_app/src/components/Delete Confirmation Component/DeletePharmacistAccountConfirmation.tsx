//import ExploreContainer from '../components/ExploreContainer';
import { IonToolbar, IonTitle, IonHeader, IonContent, IonButton } from '@ionic/react';

type popupInfo = {
	deleteAccount:any;
	setShowModal:any;
  };

const DeletePharmacistAccountConfirmation: React.FC<popupInfo> = ({deleteAccount, setShowModal}) => {
	return (
	<>
		<IonHeader>
		<IonToolbar>
			<IonTitle>Confirm Submission</IonTitle>
		</IonToolbar>
		</IonHeader>
		<IonContent className="ion-padding">
			
		<div className='webBody'>
		<p>Are you sure you wish to delete your account?</p>
		<IonButton expand="full" color={"danger"} onClick={() => {
			deleteAccount()
			setShowModal(false)
		}}>
			Yes
		</IonButton>
		<IonButton expand="full" color="medium" className="cancel-button" onClick={() => setShowModal(false)}>
			No
		</IonButton>
		</div>
		</IonContent>
	</>
  );
};

export default DeletePharmacistAccountConfirmation;