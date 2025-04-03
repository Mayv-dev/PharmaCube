import { IonButton, IonContent, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import '../styles/Settings.css';

type props = {
  isNavBarTop:boolean
  navBarChange:any
}
const Settings: React.FC<props> = ({isNavBarTop, navBarChange}) => (
  <IonPage>

    <IonContent className="ion-padding">
      <div className='webBody'>
        <IonButton>Reset to defaults</IonButton>

        <IonItem>
          <IonSelect label="App Theme:">
            <IonSelectOption>Auto (Device Selected)</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonText>Your device's current theme automatically sets the app theme to DARK</IonText>

        <IonItem>
          <IonSelect value={isNavBarTop} onIonChange={e => navBarChange(e.target.value)} label="Navbar position:">
            <IonSelectOption value={true}>Top</IonSelectOption>
            <IonSelectOption value={false}>Bottom</IonSelectOption>
          </IonSelect>
        </IonItem>
      </div>
    </IonContent>
  </IonPage>
);

export default Settings;
