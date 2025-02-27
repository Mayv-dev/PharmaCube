import { IonContent, IonModal, IonInput, IonLabel, IonSelect, IonSelectOption, IonPage, IonItem, IonButton} from '@ionic/react';
import '../styles/Accounts.css';
import { useState } from 'react';
import LinkedPatientDeleteConfirmation from '../components/Delete Confirmation Component/LinkedPatientDeleteConfirmation';

const Account: React.FC = () => {
	const [isInEditMode, setIsInEditMode] = useState<Boolean>(false)
	const [showModal, setShowModal] = useState(false)

	return(
		<IonPage>
			<IonContent className='ion-padding'>
				<div className='formBody'>
					<IonItem>
						<IonLabel position="fixed">First Name:</IonLabel>
						<IonInput onIonChange={e => {}}></IonInput>
					</IonItem>

					<IonItem>
						<IonLabel position="fixed">Last Name:</IonLabel>
						<IonInput onIonChange={e => {}}></IonInput>
					</IonItem>

					<IonItem>
						<IonLabel position="fixed">Pharmacy Name:</IonLabel>
						<IonInput onIonChange={e => {}}></IonInput>
					</IonItem>

					<p className='headingText'>Patient list</p>
					{isInEditMode ? 
						<IonButton color="danger" onClick={e => setIsInEditMode(false)}>Stop Editing List</IonButton>
						:
						<IonButton onClick={e => setIsInEditMode(true)}>Edit List</IonButton>
					}
					<div className='patientContainer'>
						<p>Ann Conway </p>
						{isInEditMode ? <IonButton onClick={e => setShowModal(true)}>X</IonButton>:null}
					</div>
					<div className='patientContainer'>
						<p>Juan Cortez</p>
						{isInEditMode ? <IonButton onClick={e => setShowModal(true)}>X</IonButton>:null}
					</div>
					<div className='patientContainer'>
						<p>Josh Higgins</p>
						{isInEditMode ? <IonButton onClick={e => setShowModal(true)}>X</IonButton>:null}
					</div>

					<p className='headingText'>Adding a new patient? Have them scan the code below with the app.</p>
					<img src="https://media.istockphoto.com/id/1347277582/vector/qr-code-sample-for-smartphone-scanning-on-white-background.jpg?s=612x612&w=0&k=20&c=6e6Xqb1Wne79bJsWpyyNuWfkrUgNhXR4_UYj3i_poc0="></img>
				</div>
			</IonContent>


		<IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
			<LinkedPatientDeleteConfirmation patient_id={1} patient_name={"Patient Name"} delete_denied={console.log("The delete was not carried out")} delete_confirmed={console.log("The delete was carried out")}></LinkedPatientDeleteConfirmation>
		</IonModal>
		</IonPage>
	);
};

export default Account;