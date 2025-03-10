import { IonContent, IonModal, IonInput, IonSelect, IonSelectOption, IonPage, IonItem, IonButton} from '@ionic/react';
import '../styles/Accounts.css';
import { useState } from 'react';
import LinkedPatientDeleteConfirmation from '../components/Delete Confirmation Component/LinkedPatientDeleteConfirmation';

// Referenced yup from https://www.npmjs.com/package/yup
import { string } from 'yup';
import { useHistory } from 'react-router';

import { PharmacistAccountDetailModify } from '../api types/types';

import axios from 'axios';
import DeletePharmacistAccountConfirmation from '../components/Delete Confirmation Component/DeletePharmacistAccountConfirmation';

const Account: React.FC = () => {
	const [isInEditMode, setIsInEditMode] = useState<Boolean>(false)
	const [patientName, setPatientName] = useState("")
	const [patientId, setPatientId] = useState(-1)
	const [showModal, setShowModal] = useState(false)
	const [showDeletionModal, setShowDeletionModal] = useState(false)
	const [patientList, setPatientList] = useState(["Ann Murphy", "Aaron Murphy", "Irene Duffy"])

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [pharmacy_name, setPharmacy_name] = useState("");
	const [pharmacy_address_1, setAddressLine1] = useState("");
	const [pharmacy_address_2, setAddressLine2] = useState("");
	const [pharmacy_address_3, setAddressLine3] = useState("");
	const [postcode, setPostcode] = useState("");


	const history = useHistory();

	async function modifyAccount(addedPharmacist:PharmacistAccountDetailModify) {
		try {
		  console.log("put request being made...")
		  const { data, status } = await axios.put(
			`http://localhost:8080/pharmacist/2`,
			addedPharmacist,
			{
			  headers: {
				Accept: 'application/json'
			  },
			},
		  );
		  return data;
		}
		catch (error) {
		  if (axios.isAxiosError(error)) {
			console.log('error message: ', error.message);
			return error.message;
		  } else {
			console.log('unexpected error: ', error);
			return 'An unexpected error occurred';
		  }
		}
	  };	

	  const deleteAccount = async () => {
		let pharmacistId = 2
		try {
			const { data, status } = await axios.delete(
			  `http://localhost:8080/pharmacist/${pharmacistId}`,
			  {
				headers: {
				  Accept: 'application/json'
				}
			  }
			);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log('error message: ', error.message);
				return error.message;
			} else {
				console.log('unexpected error: ', error);
				return 'An unexpected error occurred';
			}
		}

		history.push("/login")

	  }

	const handleModification = async () => {
		let emailValidation = string().email().required()
		try {
			await emailValidation.validate(email).then(result => console.log(result))

			if(
				name == "" ||
				email == "" ||
				password == "" ||
				pharmacy_name == "" ||
				pharmacy_address_1 == "" ||
				pharmacy_address_2 == "" ||
				pharmacy_address_3 == "" ||
				postcode == ""
			){
				console.log("The modification is unacceptable, the incorrect inputs should be highlighted")
			}
			else {
				console.log("The modification is acceptable, the app will now navigate to a confirmation page where the user confirms (along with entering their new email and/or password, only if they changed them)")
				modifyAccount(
					{name, 
					email, 
					password, 
					pharmacy_name, 
					pharmacy_address_1, 
					pharmacy_address_2, 
					pharmacy_address_3, 
					postcode
					})
			}
		}
		// Figured out how to implement Validation Error while referencing Shanmugaraja_K at https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
		catch (e) {
			console.log("Invalid email")
		}
	}

	return(
		<IonPage>
			<IonContent className='ion-padding'>
				<div className='formBody'>
				<p>Your Details</p>
					<IonItem>
						<IonInput onIonChange={e => setName(e.target.value)} label='Your Name'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setEmail(e.target.value)} type="email" label='Email'></IonInput>
					</IonItem>
					
					<IonItem>
						<IonInput onIonChange={e => setPassword(e.target.value)} type="password" label='Password'></IonInput>
					</IonItem>

					<p>Your Pharmacy Details</p>
					<IonItem>
						<IonInput onIonChange={e => setPharmacy_name(e.target.value)} label='Pharmacy Name'></IonInput>
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

					<IonButton color={"danger"} onClick={e => {setShowDeletionModal(true)}}>Delete Your Account</IonButton>
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
		<IonModal isOpen={showDeletionModal} onDidDismiss={() => setShowDeletionModal(false)}>
			<DeletePharmacistAccountConfirmation setShowModal={setShowDeletionModal} deleteAccount={() => deleteAccount()}></DeletePharmacistAccountConfirmation>
		</IonModal>
		</IonPage>
	);
};

export default Account;