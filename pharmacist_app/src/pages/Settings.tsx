import { IonContent, IonPage} from '@ionic/react';
import LowerToolbar from '../components/LowerToolbar';
import '../styles/Settings.css';

const Settings: React.FC = () => (
  <IonPage>
    
    <LowerToolbar title='Settings'/>

    <IonContent></IonContent>

  </IonPage>
);

export default Settings;
