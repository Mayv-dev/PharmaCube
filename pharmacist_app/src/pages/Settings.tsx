import { IonButton, IonContent, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonText} from '@ionic/react';
import '../styles/Settings.css';

const Settings: React.FC = () => (
  <IonPage>

    <IonContent>
      <div className='formBody'>
        <IonButton>Reset to defaults</IonButton>

        <IonItem>
          <IonLabel>App theme</IonLabel>
          <IonSelect>
            <IonSelectOption>Auto (Device Selected)</IonSelectOption>
            <IonSelectOption>Dark</IonSelectOption>
            <IonSelectOption>Light</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonText>Your device's current theme automatically sets the app theme to XXXXXX</IonText>

        <IonItem>
          <IonLabel>Navbar position</IonLabel>
          <IonSelect>
            <IonSelectOption>Top</IonSelectOption>
            <IonSelectOption>Bottom</IonSelectOption>
            </IonSelect>
        </IonItem>
      </div>
    </IonContent>
  </IonPage>
);

export default Settings;
