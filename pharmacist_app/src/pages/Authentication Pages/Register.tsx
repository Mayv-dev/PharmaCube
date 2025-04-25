import { IonButton, IonContent, IonInput, IonItem, IonPage, IonRouterLink } from '@ionic/react';
import '../../styles/Regime Subpages/AddRegime.css';
import { useState } from 'react';

// Referenced yup from https://www.npmjs.com/package/yup
import { string } from 'yup';
import { useHistory } from 'react-router';
import { PharmacistAccount } from 'api types/types';

import axios from 'axios';

type registerProps = {
	setPharmacistId:any
}

const Register: React.FC<registerProps> = ({setPharmacistId}) => {
	const [name, setName] = useState(import.meta.env.VITE_TESTER_NAME);
	const [email, setEmail] = useState(import.meta.env.VITE_TESTER_EMAIL);
	const [password, setPassword] = useState(import.meta.env.VITE_TESTER_PASSWORD);
	const [confirmPassword, setConfirmPassword] = useState(import.meta.env.VITE_TESTER_PASSWORD);
	const [pharmacy_name, setPharmacyName] = useState(import.meta.env.VITE_TESTER_PHARMACY_NAME);
	const [pharmacy_address_1, setAddressLine1] = useState(import.meta.env.VITE_TESTER_PHARMACY_ADDRESS_1);
	const [pharmacy_address_2, setAddressLine2] = useState(import.meta.env.VITE_TESTER_PHARMACY_ADDRESS_2);
	const [pharmacy_address_3, setAddressLine3] = useState(import.meta.env.VITE_TESTER_PHARMACY_ADDRESS_3);
	const [postcode, setPostcode] = useState(import.meta.env.VITE_TESTER_PHARMACY_POSTCODE);
	const history = useHistory();

	async function createAccount(addedPharmacist: PharmacistAccount) {
		try {
			console.log("post request being made...")
			const { data, status } = await axios.post(
				`${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/pharmacist`,
				addedPharmacist,
				{
					headers: {
						Accept: 'application/json'
					},
				},
			);
			return data;
		}
		catch (e:any) {
			if(e.code == "ERR_NETWORK") alert("Unable to connect to the server. Are you connected to the internet?")
		}
	};

	async function register(addedPharmacist: PharmacistAccount) {
		
		createAccount(addedPharmacist).then(async res => {
			await axios.post(`${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/patient`,{
				"name": "Ann Murphy",
				"schedule_times": null,
				"scheduled_regimes": null,
				"adherence_record": null,
				"pharmacist_id": res.id
			},{
				headers: {
					Accept: 'application/json'
				},
			})
			await axios.post(`${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/patient`,{
				"name": "Obi Njoku",
				"schedule_times": null,
				"scheduled_regimes": null,
				"adherence_record": null,
				"pharmacist_id": res.id
			},{
				headers: {
					Accept: 'application/json'
				},
			})
			await axios.post(`${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/patient`,{
				"name": "Paul Brady",
				"schedule_times": null,
				"scheduled_regimes": null,
				"adherence_record": null,
				"pharmacist_id": res.id
			},{
				headers: {
					Accept: 'application/json'
				},
			})
			setPharmacistId(res.id)
			history.push("/regimes")
			// Found "history" solution to login/register prevention at https://stackoverflow.com/questions/70237476/react-link-async-await-does-not-wait-code-block
		})
	};

	const handleRegistration = async () => {
		let emailValidation = string().email().required()
		try {
			await emailValidation.validate(email).then(result => console.log(result))

			if (name == "") alert("Please enter your name.")
			else if (email == "") alert("Please enter your email.")
			else if (password == "") alert("Please enter the password you wish to use.")
			else if (confirmPassword == "" || confirmPassword != password) alert("Your confirmation of the entered password does not match, please try again.")
			else if (pharmacy_name == "") alert("Please enter the name of your pharmacy.")
			else if (pharmacy_address_1 == "") alert("Please enter Address Line 1 of your pharmacy.")
			else if (pharmacy_address_2 == "") alert("Please enter Address Line 2 of your pharmacy.")
			else if (pharmacy_address_3 == "") alert("Please enter Address Line 3 of your pharmacy.")
			else if (postcode == "") alert("Please enter the post code of your pharmacy.")
			else {
				let patients: any[] = []
				register({
					name,
					email,
					password,
					pharmacy_name,
					pharmacy_address_1,
					pharmacy_address_2,
					pharmacy_address_3,
					postcode,
					patients
				})
			}
		}
		// Figured out how to implement Validation Error while referencing Shanmugaraja_K at https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
		catch (e) {
			alert("The email is incorrectly formatted. Please try again.")
		}
	}


	return (
		<IonPage>
			<IonContent className="ion-padding">
				<div className='webBody'>
					<p className='authenticationPageHeading'>Registration</p>

					<p>Your Details</p>
					<IonItem>
						<IonInput onIonInput={e => setName(e.target.value)} value={name} label='Your Name'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonInput={e => setEmail(e.target.value)} type="email" value={email} label='Email'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonInput={e => setPassword(e.target.value)} type="password" value={password} label='Password'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonInput={e => setConfirmPassword(e.target.value)} type="password" value={confirmPassword} label='Confirm your password'></IonInput>
					</IonItem>

					<p>Your Pharmacy Details</p>
					<IonItem>
						<IonInput onIonInput={e => setPharmacyName(e.target.value)} value={pharmacy_name} label='Pharmacy Name'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonInput={e => setAddressLine1(e.target.value)} value={pharmacy_address_1} label='Address Line 1'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonInput={e => setAddressLine2(e.target.value)} value={pharmacy_address_2} label='Address Line 2'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonInput={e => setAddressLine3(e.target.value)} value={pharmacy_address_3} label='Address Line 3'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onInput={e => setPostcode(e.target.value)} value={postcode} label='Postal Code'></IonInput>
					</IonItem>

					<IonButton onClick={e => handleRegistration()}>Register</IonButton>

					<IonRouterLink routerLink='/login' routerDirection={"none"}>
						<IonButton>Log In Instead</IonButton>
					</IonRouterLink>

				</div>
			</IonContent>
		</IonPage>
	);
};

export default Register;
