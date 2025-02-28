import { IonContent, IonModal, IonInput, IonSelect, IonSelectOption, IonPage, IonItem, IonButton} from '@ionic/react';
import '../styles/Accounts.css';
import { useState } from 'react';
import LinkedPatientDeleteConfirmation from '../components/Delete Confirmation Component/LinkedPatientDeleteConfirmation';

const Account: React.FC = () => {
	const [isInEditMode, setIsInEditMode] = useState<Boolean>(false)
	const [patientName, setPatientName] = useState("")
	const [patientId, setPatientId] = useState(-1)
	const [showModal, setShowModal] = useState(false)
	const [patientList, setPatientList] = useState(["Ann Murphy", "Aaron Murphy", "Irene Duffy"])

	return(
		<IonPage>
			<IonContent className='ion-padding'>
				<div className='formBody'>
					<IonItem>
						<IonInput label="First Name:" onIonChange={e => {}}></IonInput>
					</IonItem>

					<IonItem>
						<IonInput label="Last Name:" onIonChange={e => {}}></IonInput>
					</IonItem>

					<IonItem>
						<IonInput label="Pharmacy Name:"onIonChange={e => {}}></IonInput>
					</IonItem>

					<p className='headingText'>Patient list</p>
					{isInEditMode ? 
						<IonButton color="danger" onClick={e => setIsInEditMode(false)}>Stop Editing List</IonButton>
						:
						<IonButton onClick={e => setIsInEditMode(true)}>Edit List</IonButton>
					}
					{patientList.map((patient,index) =>
						<div className='patientContainer'>
						<p className="patientContainerName">{patient}</p>
						{isInEditMode ? <IonButton className="deletePatientButton" onClick={e => {setShowModal(true); setPatientId(index); setPatientName(patient)}}>X</IonButton>:null}
						</div>
					)}

					<p className='headingText'>Adding a new patient? Have them scan the code below with the app.</p>

					<div className='imageContainer'>
						<img className="qrImg" src="https://qr.io/qr-svg/M5L6UF.svg?1740700782050"></img>
					</div>
				</div>
			</IonContent>


		<IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
			<LinkedPatientDeleteConfirmation patient_id={patientId} patient_name={patientName} setShowModal={setShowModal} deletePatient={() => setPatientList(patientList.filter(patient => patient != patientName))}></LinkedPatientDeleteConfirmation>
		</IonModal>
		</IonPage>
	);
};

export default Account;