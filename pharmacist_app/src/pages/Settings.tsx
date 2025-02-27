import { IonButton, IonContent, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import '../styles/Settings.css';

const Settings: React.FC = () => (
  <IonPage>

    <IonContent>
      <div className='formBody'>
        <IonButton>Reset to defaults</IonButton>

        <IonItem>
          <IonSelect label="App Theme:">
            <IonSelectOption>Auto (Device Selected)</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonText>Your device's current theme automatically sets the app theme to DARK</IonText>

        <IonItem>
          <IonSelect label="Navbar position:">
            <IonSelectOption>Top</IonSelectOption>
          </IonSelect>
        </IonItem>
      </div>
    </IonContent>
  </IonPage>
);

export default Settings;
