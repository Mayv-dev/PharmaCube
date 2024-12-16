import { useState } from 'react';
import { IonButton, IonContent, IonPage, IonSelect, IonSelectOption} from '@ionic/react';
import LowerToolbar from '../../components/LowerToolbar';
import '../../styles/Medication Subpages/MedicationAddPage.css';

const MedicationAddPage: React.FC = () => {
  const [user, setUser] = useState('User');
  const [medication, setMedication] = useState('Medication');
  const [dosage, setDosage] = useState('');
  return(
    <IonPage>
      
      <LowerToolbar title='Add a Medication'/>

      <IonContent>
        <IonSelect placeholder='Users' onIonChange={e => setUser(e.target.value)}>
          <IonSelectOption>TEST Duffy</IonSelectOption>
          <IonSelectOption>TEST Murphy</IonSelectOption>
          <IonSelectOption>TEST McMahon</IonSelectOption>
        </IonSelect>
        <IonSelect placeholder='Medications' onIonChange={e => setMedication(e.target.value)}>
          <IonSelectOption>TEST Ibuprofen</IonSelectOption>
          <IonSelectOption>TEST Sertraline</IonSelectOption>
          <IonSelectOption>TEST Multivitamin</IonSelectOption>
        </IonSelect>
        <IonSelect placeholder='Dosage' onIonChange={e => setDosage(e.target.value)}>
          <IonSelectOption>TEST 50mg</IonSelectOption>
          <IonSelectOption>TEST 100mg</IonSelectOption>
          <IonSelectOption>TEST 200mg</IonSelectOption>
        </IonSelect>
        <IonButton>
          Give {user} {medication}
        </IonButton>
      </IonContent>

    </IonPage>
  );
}

export default MedicationAddPage;
