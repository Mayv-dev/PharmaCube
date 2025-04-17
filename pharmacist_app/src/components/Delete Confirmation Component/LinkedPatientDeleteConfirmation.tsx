//import ExploreContainer from '../components/ExploreContainer'; 
import { IonToolbar, IonTitle, IonHeader, IonContent, IonButton, IonInput } from '@ionic/react';
import { useState } from 'react';
import "../../styles/Accounts.css"
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
				<p>Are you sure you wish to delete {patient_name} from your list? Please enter their name below to confirm deletion.</p>
				<IonInput className={"patientDeleteNameEntry"} value={deleteInput} onIonInput={e => setDeleteInput(e.target.value)}></IonInput>
				<IonButton expand="full" color={deleteInput == patient_name ? "success" : "dark"} onClick={() => {
					if (deleteInput == patient_name) {
						deletePatient()
						setShowModal(false)
					}
				}}>
					Yes
				</IonButton>
				<IonButton expand="full" color="danger" className="cancel-button" onClick={() => setShowModal(false)}>
					No
				</IonButton>
			</IonContent>
		</>
	);
};

export default LinkedPatientDeleteConfirmation;
