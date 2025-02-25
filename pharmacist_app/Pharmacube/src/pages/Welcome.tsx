import { IonPage, IonContent, IonButton, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../styles/Welcome.css';

const Welcome: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="welcome-content" fullscreen>
        <IonImg src="/assets/pharmacube-logo.png" alt="Pharmacube" className="logo" />
        <IonButton expand="block" className="custom-button" onClick={() => history.push('/login')}>
          Log In
        </IonButton>
        <IonButton expand="block" className="custom-button" onClick={() => history.push('/signup')}>
          Sign Up
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
