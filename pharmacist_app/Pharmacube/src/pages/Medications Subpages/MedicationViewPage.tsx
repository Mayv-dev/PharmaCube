import { IonContent, IonPage, IonSelect, IonSelectOption} from '@ionic/react';
import LowerToolbar from '../../components/LowerToolbar';
import '../../styles/Medication Subpages/MedicationViewPage.css';
import { useState } from 'react';

const MedicationViewPage: React.FC = () => {
  const [user, setUser] = useState('Unselected');
  return (
    <IonPage>
      
      <LowerToolbar title='View Medications'/>

      <IonContent>
        <p>Select a user</p>
        <IonSelect placeholder='Users' onIonChange={e => setUser(e.target.value)}>
          <IonSelectOption>TEST Duffy</IonSelectOption>
          <IonSelectOption>TEST Murphy</IonSelectOption>
          <IonSelectOption>TEST McMahon</IonSelectOption>
        </IonSelect>

        {user == "Unselected" ? null :
        <>
          <p>Medications</p>
          <ul>
            <li>TEST Medication 1</li>
            <li>TEST Medication 2</li>
            <li>TEST Medication 3</li>
          </ul>
        </>
        }
      </IonContent>

    </IonPage>
  );
};

export default MedicationViewPage;
