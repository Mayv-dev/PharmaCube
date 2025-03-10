//import ExploreContainer from '../components/ExploreContainer';
import { IonModal, IonToolbar, IonTitle, IonHeader, IonContent, IonButton, IonInput, IonItem } from '@ionic/react';
import { useState } from 'react';
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
			
		<div className='formBody'>
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