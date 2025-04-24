import { IonButton, IonContent, IonInput, IonItem, IonPage, IonRouterLink } from '@ionic/react';
import '../../styles/Regime Subpages/AddRegime.css';
import { useState } from 'react';

// Referenced yup from https://www.npmjs.com/package/yup
import { string } from 'yup';
import { useHistory } from 'react-router';

import axios from 'axios';
type loginProps = {
	loggedInAccount:any
}

const Login: React.FC<loginProps> = ({loggedInAccount}) => {
	const [email, setEmail] = useState(import.meta.env.VITE_TESTER_EMAIL);
	const [password, setPassword] = useState(import.meta.env.VITE_TESTER_PASSWORD);
	const history = useHistory();

	

	const handleLogin = async () => {
		try {
			if (email == "") {
				alert("Please enter an email")
				return
			}
			let emailValidation = string().email().required()
			await emailValidation.validate(email).then(result => { return result })
			if (email == "") alert("Please enter an email")
			else if (password == "") alert("Please enter a password")
			else {
				try {
					const { data, status } = await axios.get(
						`${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/pharmacist/1`,
						{
							headers: {
								Accept: 'application/json'
							},
						},
					);
					if(status == 200) {
						// Found "history" solution to login/register prevention at https://stackoverflow.com/questions/70237476/react-link-async-await-does-not-wait-code-block
						history.push("/regimes")
						loggedInAccount(data)
					}
				}
				catch (e:any) {
					if(e.code == "ERR_NETWORK") alert("Unable to connect to the server. Are you connected to the internet?")
					if(e.code == "ERR_BAD_REQUEST") alert("This user was not found on the system. If you believe this is incorrect, contact a system administrator to validate user ID.")
				}
			}
		}
		catch (e) {
			alert("The email is incorrectly formatted. Please try again.")
		}
	}
	return (
		<IonPage>
			<IonContent className="ion-padding">
				<div className='webBody'>
					<p className='authenticationPageHeading'>Log In</p>

					<IonItem>
						<IonInput onIonInput={e => setEmail(e.target.value)} value={email} type="email" label='Email'></IonInput>
					</IonItem>

					<IonItem>
						<IonInput onIonInput={e => setPassword(e.target.value)} value={password} type="password" label='Password'></IonInput>
					</IonItem>

					<IonButton onClick={e => handleLogin()}>Log In</IonButton>

					<IonRouterLink routerLink='/register' routerDirection={"none"}>
						<IonButton>Sign Up Instead</IonButton>
					</IonRouterLink>

				</div>
			</IonContent>
		</IonPage>
	);
}

export default Login;