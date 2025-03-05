import { IonButton, IonContent, IonInput, IonItem, IonPage, IonRouterLink, IonText } from '@ionic/react';
import '../../styles/Regime Subpages/AddRegime.css';
import { useState } from 'react';

// Referenced yup from https://www.npmjs.com/package/yup
import { string, ValidationError } from 'yup';
import { useHistory } from 'react-router';

const Login: React.FC = () => {
	const [email, setEmail] = useState("liammurphy86@gmail.com");
	const [password, setPassword] = useState("pharmalord420");
	const history = useHistory();

	const handleLogin = async () => {
		try {
			let emailValidation = string().email().required()
			await emailValidation.validate(email).then(result => { return result })
			if (
				email == "" ||
				password == ""
			) {
				console.log("incorrect login")
			}
			else {
				// Found "history" solution to login/register prevention at https://stackoverflow.com/questions/70237476/react-link-async-await-does-not-wait-code-block
				history.push("/regimes")
			}
		}
		catch (e) {
			console.log("Invalid email")
		}
	}
	return (
		<IonPage>
			<IonContent>
				<div className='formBody'>
					<div className='oroLogo'>
						<img width="100%" src="..\ORO logo v2 bg-removed.png" />
					</div>

					<p className='authenticationPageHeading'>Log In</p>

					<IonItem>
						<IonInput onIonChange={e => setEmail(e.target.value)} value={email} type="email" label='Email'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonChange={e => setPassword(e.target.value)} value={password} type="password" label='Password'></IonInput>
					</IonItem>

					<IonButton onClick={e => handleLogin()}>Log In</IonButton>

					<IonRouterLink routerLink='/register'>
						<IonButton>Sign Up Instead</IonButton>
					</IonRouterLink>

				</div>
			</IonContent>
		</IonPage>
	);

	export default Login;
