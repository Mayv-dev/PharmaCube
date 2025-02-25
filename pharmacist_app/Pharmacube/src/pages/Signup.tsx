import { IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../styles/SignUp.css';

const SignUp: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="signup-content" fullscreen>
      <img src="/assets/pharmacube-logo.png" alt="Pharmacube" className="logo" />
        <IonItem>
          <IonLabel position="floating">First Name</IonLabel>
          <IonInput type="text" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Surname</IonLabel>
          <IonInput type="text" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput type="text" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Confirm Password</IonLabel>
          <IonInput type="password" />
        </IonItem>
        <IonButton expand="block" className="custom-button" onClick={() => history.push('/welcome')}>
          Sign Up
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
