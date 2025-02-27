import { IonContent, IonModal, IonInput, IonSelect, IonSelectOption, IonPage, IonItem, IonButton } from '@ionic/react';
import '../styles/Accounts.css';
import { useState } from 'react';
import LinkedPatientDeleteConfirmation from '../components/Delete Confirmation Component/LinkedPatientDeleteConfirmation';

// Referenced yup from https://www.npmjs.com/package/yup
import { string } from 'yup';
import { useHistory } from 'react-router';

const Account: React.FC = () => {
	const [isInEditMode, setIsInEditMode] = useState<Boolean>(false)
	const [patientName, setPatientName] = useState("")
	const [patientId, setPatientId] = useState(-1)
	const [showModal, setShowModal] = useState(false)
	const [patientList, setPatientList] = useState(["Ann Murphy", "Aaron Murphy", "Irene Duffy"])

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [pharmacyName, setPharmacyName] = useState("");
	const [addressLine1, setAddressLine1] = useState("");
	const [addressLine2, setAddressLine2] = useState("");
	const [addressLine3, setAddressLine3] = useState("");
	const [postcode, setPostcode] = useState("");

	const history = useHistory();


	const handleModification = async () => {
		let emailValidation = string().email().required()
		try {
			await emailValidation.validate(email).then(result => console.log(result))

			if (
				email == "" ||
				password == "" ||
				pharmacyName == "" ||
				addressLine1 == "" ||
				addressLine2 == "" ||
				addressLine3 == "" ||
				postcode == ""
			) {
				console.log("The modification is unacceptable, the incorrect inputs should be highlighted")
			}
			else {
				console.log("The modification is acceptable, the app will now navigate to a confirmation page where the user confirms (along with entering their new email and/or password, only if they changed them)")
			}
		}
		// Figured out how to implement Validation Error while referencing Shanmugaraja_K at https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
		catch (e) {
			console.log("Invalid email")
		}
	}

	return (
		<IonPage>
			<IonContent className='ion-padding'>
				<div className='formBody'>
					<p>Your Details</p>
					<IonItem>
						<IonInput onIonChange={e => setEmail(e.target.value)} type="email" label='Email'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setPassword(e.target.value)} type="password" label='Password'></IonInput>
					</IonItem>

					<p>Your Pharmacy Details</p>
					<IonItem>
						<IonInput onIonChange={e => setPharmacyName(e.target.value)} label='Pharmacy Name'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setAddressLine1(e.target.value)} label='Address Line 1'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setAddressLine2(e.target.value)} label='Address Line 2'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setAddressLine3(e.target.value)} label='Address Line 3'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setPostcode(e.target.value)} label='Postal Code'></IonInput>
					</IonItem>

					<IonButton onClick={e => handleModification()}>Modify Details</IonButton>

					<p className='headingText'>Patient list</p>
					{isInEditMode ?
						<IonButton color="danger" onClick={e => setIsInEditMode(false)}>Stop Editing List</IonButton>
						:
						<IonButton onClick={e => setIsInEditMode(true)}>Edit List</IonButton>
					}
					{patientList.map((patient, index) =>
						<div className='patientContainer'>
							<p className="patientContainerName">{patient}</p>
							{isInEditMode ? <IonButton className="deletePatientButton" onClick={e => { setShowModal(true); setPatientId(index); setPatientName(patient) }}>X</IonButton> : null}
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
