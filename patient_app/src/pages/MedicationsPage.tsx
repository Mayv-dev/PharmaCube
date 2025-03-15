import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
} from '@ionic/react';
import { addOutline, trashOutline } from 'ionicons/icons';
import { useColorblindFilter } from '../colorBlindContext'; // Import the colorblind context
import './MedicationsPage.css';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}

const MedicationPage: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [name, setName] = useState<string>('');
  const [dosage, setDosage] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const { filter } = useColorblindFilter(); // Use the filter from the context

  const addMedication = () => {
    if (!name || !dosage || !frequency) {
      setToastMessage("Please fill in all fields.");
      setShowToast(true);
      return;
    }

    const newMedication: Medication = {
      id: Date.now(),
      name,
      dosage,
      frequency,
    };

    setMedications([...medications, newMedication]);
    setName("");
    setDosage("");
    setFrequency("");
    setToastMessage("Medication added successfully!");
    setShowToast(true);
  };

  const deleteMedication = (id: number) => {
    const updatedMedications = medications.filter((med) => med.id !== id);
    setMedications(updatedMedications);
    setToastMessage("Medication deleted successfully!");
    setShowToast(true);
  };

  return (
    <IonPage className={filter}> {/* Apply the filter class */}
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center title">Medication Tracker</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding content" color="secondary">
        {/* Medication Input Form */}
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonLabel position="floating">Medication Name</IonLabel>
                <IonInput
                  value={name}
                  onIonChange={(e) => setName(e.detail.value!)}
                  placeholder="e.g., Paracetamol"
                />
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonItem>
                <IonLabel position="floating">Dosage</IonLabel>
                <IonInput
                  value={dosage}
                  onIonChange={(e) => setDosage(e.detail.value!)}
                  placeholder="e.g., 500mg"
                />
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonItem>
                <IonLabel position="floating">Frequency</IonLabel>
                <IonInput
                  value={frequency}
                  onIonChange={(e) => setFrequency(e.detail.value!)}
                  placeholder="e.g., Once daily"
                />
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonButton expand="block" onClick={addMedication}>
                <IonIcon icon={addOutline} slot="start" />
                Add Medication
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Medication List */}
        <IonList className="medication-list">
          {medications.map((med) => (
            <IonItem key={med.id} className="medication-item">
              <IonLabel>
                <h2>{med.name}</h2>
                <p>Dosage: {med.dosage}</p>
                <p>Frequency: {med.frequency}</p>
              </IonLabel>
              <IonButton
                color="danger"
                slot="end"
                onClick={() => deleteMedication(med.id)}
              >
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        {/* Toast for feedback */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default MedicationPage;