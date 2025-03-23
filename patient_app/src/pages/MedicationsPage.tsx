import React, { useState, useEffect } from 'react';
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
import { Medication } from '../api types/types';

const MedicationPage: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [medicationToDelete, setMedicationToDelete] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const { filter } = useColorblindFilter();
  const { takePhoto, photos } = usePhotoGallery();

  useEffect(() => {
    const storedMedications = JSON.parse(localStorage.getItem('medications') || '[]');
    setMedications(storedMedications);
  }, []);

  const addMedication = () => {
    if (!name || !amount) {
      setToastMessage("Please fill in all fields.");
      setShowToast(true);
      return;
    }

    const newMedication: Medication = {
      id: Date.now(),
      name,
      amount,
      image: photos[0]?.webviewPath,
    };

    const updatedMedications = [...medications, newMedication];
    setMedications(updatedMedications);
    localStorage.setItem('medications', JSON.stringify(updatedMedications));
    setName("");
    setAmount("");
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
      localStorage.setItem('medications', JSON.stringify(updatedMedications));
      setToastMessage("Medication deleted successfully!");
      setShowToast(true);
    }
    setShowDeleteAlert(false);
    setMedicationToDelete(null);
  };

  return (
    <IonPage className={filter}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Medications</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding content">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome Back!</h1>
          <div className="quick-stats">
            <IonCard className="stat-card">
              <IonCardContent>
                <h2>{medications.length}</h2>
                <p>Total Medications</p>
              </IonCardContent>
            </IonCard>
          </div>
        </div>

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
                    <p>{med.amount}</p>
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

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowAddModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

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
                    <IonLabel position="floating">Amount</IonLabel>
                    <IonInput
                      value={amount}
                      onIonChange={(e) => setAmount(e.detail.value!)}
                      placeholder="e.g., 3 pills"
                    />
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

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color="success"
        />

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