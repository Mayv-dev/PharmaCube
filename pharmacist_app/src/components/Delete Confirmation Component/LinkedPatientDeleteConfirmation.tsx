//import ExploreContainer from '../components/ExploreContainer';
import { IonModal, IonToolbar, IonTitle, IonHeader, IonContent, IonButton, IonInput, IonItem } from '@ionic/react';
import { useState } from 'react';
type popupInfo = {
	patient_id: number;
	patient_name: string;
	deletePatient: any;
	setShowModal: any;
};

const LinkedPatientDeleteConfirmation: React.FC<popupInfo> = ({ patient_id, patient_name, deletePatient, setShowModal }) => {
	const [deleteInput, setDeleteInput] = useState<string>("")
	return (
		<>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Confirm Submission</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">

				<div className='formBody'>
					<p>Are you sure you wish to delete {patient_name} from your list? Please enter their name below to confirm deletion.</p>
					<IonItem>
						<IonInput value={deleteInput} onIonInput={e => setDeleteInput(e.target.value)}></IonInput>
					</IonItem>
					<IonButton expand="full" color={deleteInput == patient_name ? "primary" : "dark"} onClick={() => {
						if (deleteInput == patient_name) {
							deletePatient()
							setShowModal(false)
						}
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

export default LinkedPatientDeleteConfirmation;
