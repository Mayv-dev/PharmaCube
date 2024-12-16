import { IonContent, IonPage} from '@ionic/react';
import LowerToolbar from '../../components/LowerToolbar';
import '../../styles/Medication Subpages/MedicationViewPage.css';

const MedicationViewPage: React.FC = () => {
  return (
    <IonPage>
      
      <LowerToolbar title='View Medications'/>

      <IonContent>

      </IonContent>

    </IonPage>
  );
};

export default MedicationViewPage;
