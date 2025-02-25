import { IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

const Login: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="login-content" fullscreen>
      <img src="/assets/pharmacube-logo.png" alt="Pharmacube" className="logo" />

        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput type="text" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" />
        </IonItem>
        <IonButton expand="block" className="custom-button" onClick={() => history.push('/welcome')}>
          Log In
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;