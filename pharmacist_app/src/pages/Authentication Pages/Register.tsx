import { IonButton, IonContent, IonInput, IonItem, IonPage, IonRouterLink, IonText } from '@ionic/react';
import '../../styles/Regime Subpages/AddRegime.css';
import { useState } from 'react';

// Referenced yup from https://www.npmjs.com/package/yup
import { string } from 'yup';
import { useHistory } from 'react-router';
import { PharmacistAccount } from 'api types/types';

import axios from 'axios';


const Register: React.FC = () => {
	const [name, setName] = useState(import.meta.env.VITE_TESTER_NAME);
	const [email, setEmail] = useState(import.meta.env.VITE_TESTER_EMAIL);
	const [password, setPassword] = useState(import.meta.env.VITE_TESTER_PASSWORD);
	const [confirmPassword, setConfirmPassword] = useState(import.meta.env.VITE_TESTER_PASSWORD);
	const [pharmacy_name, setPharmacyName] = useState("Allcare Pharmacy");
	const [pharmacy_address_1, setAddressLine1] = useState("Carlingford");
	const [pharmacy_address_2, setAddressLine2] = useState("Dundalk");
	const [pharmacy_address_3, setAddressLine3] = useState("Co. Louth");
	const [postcode, setPostcode] = useState("A91 D101");
	const history = useHistory();

	async function register(addedPharmacist: PharmacistAccount) {
		try {
			console.log("post request being made...")
			const { data, status } = await axios.post(
				`http://localhost:8080/pharmacist`,
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

	const handleRegistration = async () => {
		let emailValidation = string().email().required()
		try {
			await emailValidation.validate(email).then(result => console.log(result))

			if (
				name == "" ||
				email == "" ||
				password == "" ||
				confirmPassword == "" || confirmPassword != password ||
				pharmacy_name == "" ||
				pharmacy_address_1 == "" ||
				pharmacy_address_2 == "" ||
				pharmacy_address_3 == "" ||
				postcode == ""
			) {
				console.log("incorrect login")
			}
			else {
				let patients: any[] = []
				register(
					{
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
				// Found "history" solution to login/register prevention at https://stackoverflow.com/questions/70237476/react-link-async-await-does-not-wait-code-block
				history.push("/regimes")
			}
		}
		// Figured out how to implement Validation Error while referencing Shanmugaraja_K at https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
		catch (e) {
			console.log("Invalid email")
		}
	}


	return (
		<IonPage>
			<IonContent className="ion-padding">
				<div className='webBody'>
					<div className='oroLogo'>
						<img width="100%" src="..\ORO logo v2 bg-removed.png" />
					</div>

					<p className='authenticationPageHeading'>Registration</p>

					<p>Your Details</p>
					<IonItem>
						<IonInput onIonChange={e => setName(e.target.value)} value={name} label='Your Name'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setEmail(e.target.value)} type="email" value={email} label='Email'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setPassword(e.target.value)} type="password" value={password} label='Password'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setConfirmPassword(e.target.value)} type="password" value={confirmPassword} label='Confirm your password'></IonInput>
					</IonItem>

					<p>Your Pharmacy Details</p>
					<IonItem>
						<IonInput onIonChange={e => setPharmacyName(e.target.value)} value={pharmacy_name} label='Pharmacy Name'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setAddressLine1(e.target.value)} value={pharmacy_address_1} label='Address Line 1'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setAddressLine2(e.target.value)} value={pharmacy_address_2} label='Address Line 2'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setAddressLine3(e.target.value)} value={pharmacy_address_3} label='Address Line 3'></IonInput>
					</IonItem>

					<p>Your Pharmacy Details</p>
					<IonItem>
						<IonInput onIonChange={e => setPharmacyName(e.target.value)} value={pharmacy_name} label='Pharmacy Name'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setAddressLine1(e.target.value)} value={pharmacy_address_1} label='Address Line 1'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setAddressLine2(e.target.value)} value={pharmacy_address_2} label='Address Line 2'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setAddressLine3(e.target.value)} value={pharmacy_address_3} label='Address Line 3'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setPostcode(e.target.value)} value={postcode} label='Postal Code'></IonInput>
					</IonItem>

					<IonButton onClick={e => handleRegistration()}>Register</IonButton>

					<IonRouterLink routerLink='/login'>
						<IonButton>Log In Instead</IonButton>
					</IonRouterLink>

				</div>
			</IonContent>
		</IonPage>
	);
};

export default Register;
