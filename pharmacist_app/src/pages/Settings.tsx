import { IonButton, IonContent, IonItem, IonPage, IonSelect, IonSelectOption } from '@ionic/react';
import '../styles/Settings.css';

type props = {
  isNavBarTop:boolean
  navBarChange:any
  
  isTTSOn:boolean
  ttsChange:any
}
const Settings: React.FC<props> = ({isNavBarTop, navBarChange, isTTSOn, ttsChange}) => (
  <IonPage>

    <IonContent className="ion-padding">
      <div className='webBody'>
        <IonButton onClick={e => {ttsChange(true); navBarChange(false)}}>Reset to defaults</IonButton>

        <IonItem>
          <IonSelect label="Notification Audio Type:" value={isTTSOn} onIonChange={e => ttsChange(e.target.value)}>
            <IonSelectOption value={true}>Text To Speech</IonSelectOption>
            <IonSelectOption value={false}>Beep</IonSelectOption>
          </IonSelect>
        </IonItem>

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
