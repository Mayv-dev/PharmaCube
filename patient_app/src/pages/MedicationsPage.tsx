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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSelect,
  IonSelectOption,
  IonAlert,
  IonImg,
  IonFab,
  IonFabButton,
  IonModal,
} from '@ionic/react';
import { addOutline, trashOutline, camera } from 'ionicons/icons';
import { useColorblindFilter } from '../colorBlindContext';
import { usePhotoGallery } from './usePhotoGallery';
import './MedicationsPage.css';

interface Medication {
  id: number;
  name: string;
  type: string;
  dosage: string;
  frequency: string;
  image?: string;
}

const MedicationPage: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [dosage, setDosage] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [medicationToDelete, setMedicationToDelete] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const { filter } = useColorblindFilter();
  const { takePhoto, photos } = usePhotoGallery();

  const addMedication = () => {
    if (!name || !type || !dosage || !frequency) {
      setToastMessage("Please fill in all fields.");
      setShowToast(true);
      return;
    }

    const newMedication: Medication = {
      id: Date.now(),
      name,
      type,
      dosage,
      frequency,
      image: photos[0]?.webviewPath,
    };

    setMedications([...medications, newMedication]);
    setName("");
    setType("");
    setDosage("");
    setFrequency("");
    setToastMessage("Medication added successfully!");
    setShowToast(true);
    setShowAddModal(false);
  };

  const confirmDelete = (id: number) => {
    setMedicationToDelete(id);
    setShowDeleteAlert(true);
  };

  const deleteMedication = () => {
    if (medicationToDelete !== null) {
      const updatedMedications = medications.filter((med) => med.id !== medicationToDelete);
      setMedications(updatedMedications);
      setToastMessage("Medication deleted successfully!");
      setShowToast(true);
    }
    setShowDeleteAlert(false);
    setMedicationToDelete(null);
  };

  // Calculate quick stats
  const totalMedications = medications.length;
  const upcomingMedications = medications.filter((med) => med.frequency === "Once daily").length;

  return (
    <IonPage className={filter}>
      <IonHeader>
        <IonToolbar color="primary">
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding content">
        {/* Welcome Message and Quick Stats */}
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome Back!</h1>
          <div className="quick-stats">
            <IonCard className="stat-card">
              <IonCardContent>
                <h2>{totalMedications}</h2>
                <p>Total Medications</p>
              </IonCardContent>
            </IonCard>
          </div>
        </div>

        {/* Today's Medicines Section */}
        <div className="medications-section">
          <h2 className="section-title">Today's Medicines</h2>
          <IonList className="medication-list">
            {medications.map((med) => (
              <IonCard key={med.id} className="medication-item">
                <IonCardContent>
                  {med.image && (
                    <div className="medication-image">
                      <IonImg src={med.image} alt={med.name} />
                    </div>
                  )}
                  <div className="medication-details">
                    <h2>{med.name}</h2>
                    <p>{med.type}, {med.dosage}</p>
                    <p>{med.frequency}</p>
                  </div>
                  <IonButton
                    color="danger"
                    className="delete-button"
                    onClick={() => confirmDelete(med.id)}
                  >
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        </div>

        {/* Add Medication Button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowAddModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        {/* Add Medication Modal */}
        <IonModal isOpen={showAddModal} onDidDismiss={() => setShowAddModal(false)}>
          <IonContent>
            <div className="modal-content">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Add a Medication</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating">Medication Name</IonLabel>
                    <IonInput
                      value={name}
                      onIonChange={(e) => setName(e.detail.value!)}
                      placeholder="e.g., Paracetamol"
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Type</IonLabel>
                    <IonInput
                      value={type}
                      onIonChange={(e) => setType(e.detail.value!)}
                      placeholder="e.g., Capsule"
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Dosage</IonLabel>
                    <IonInput
                      value={dosage}
                      onIonChange={(e) => setDosage(e.detail.value!)}
                      placeholder="e.g., 500mg"
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Frequency</IonLabel>
                    <IonSelect
                      value={frequency}
                      placeholder="Select Frequency"
                      onIonChange={(e) => setFrequency(e.detail.value)}
                    >
                      <IonSelectOption value="Once daily">Once daily</IonSelectOption>
                      <IonSelectOption value="Twice daily">Twice daily</IonSelectOption>
                      <IonSelectOption value="Three times daily">Three times daily</IonSelectOption>
                      <IonSelectOption value="As needed">As needed</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                  <IonButton expand="block" onClick={takePhoto} className="ion-margin-top">
                    <IonIcon icon={camera} slot="start" />
                    Take Photo
                  </IonButton>
                  <IonButton expand="block" onClick={addMedication} className="ion-margin-top">
                    <IonIcon icon={addOutline} slot="start" />
                    Add Medication
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </div>
          </IonContent>
        </IonModal>

        {/* Toast for feedback */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color="success"
        />

        {/* Delete Confirmation Alert */}
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Delete Medication"
          message="Are you sure you want to delete this medication?"
          buttons={[
            { text: 'Cancel', role: 'cancel' },
            { text: 'Delete', handler: deleteMedication },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default MedicationPage;