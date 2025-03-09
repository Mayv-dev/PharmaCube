import { IonButton, IonContent, IonInput, IonItem, IonPage, IonRouterLink, IonText} from '@ionic/react';
import '../../styles/Regime Subpages/AddRegime.css';
import { useState } from 'react';

// Referenced yup from https://www.npmjs.com/package/yup
import { string } from 'yup';
import { useHistory } from 'react-router';


const Register: React.FC = () => {
	const [email, setEmail] = useState("liammurphy86@gmail.com");
	const [password, setPassword] = useState("pharmalord420");
	const [confirmPassword, setConfirmPassword] = useState("pharmalord420");
	const [pharmacyName, setPharmacyName] = useState("Allcare Pharmacy");
	const [addressLine1, setAddressLine1] = useState("Carlingford");
	const [addressLine2, setAddressLine2] = useState("Dundalk");
	const [addressLine3, setAddressLine3] = useState("Co. Louth");
	const [postcode, setPostcode] = useState("A91 D101");
	const history = useHistory();


	const handleRegistration = async () => {
		let emailValidation = string().email().required()
		try {
			await emailValidation.validate(email).then(result => console.log(result))

			if(
				email == "" ||
				password == "" ||
				confirmPassword == "" || confirmPassword != password ||
				pharmacyName == "" ||
				addressLine1 == "" ||
				addressLine2 == "" ||
				addressLine3 == "" ||
				postcode == ""
			){
				console.log("incorrect login")
			}
			else {
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
			<IonContent>
				<div className='formBody'>
					<div className='oroLogo'>
						<img width="100%" src="..\ORO logo v2 bg-removed.png"/>
					</div>

					<p className='authenticationPageHeading'>Registration</p>

					<p>Your Details</p>
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
						<IonInput onIonChange={e => setPharmacyName(e.target.value)} value={pharmacyName} label='Pharmacy Name'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setAddressLine1(e.target.value)} value={addressLine1} label='Address Line 1'></IonInput>
					</IonItem>
					
					<IonItem>
						<IonInput onIonChange={e => setAddressLine2(e.target.value)} value={addressLine2} label='Address Line 2'></IonInput>
					</IonItem>
					
					<IonItem>
						<IonInput onIonChange={e => setAddressLine3(e.target.value)} value={addressLine3} label='Address Line 3'></IonInput>
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