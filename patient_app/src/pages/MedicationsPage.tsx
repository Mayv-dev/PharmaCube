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
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonBadge,
  IonChip,
  IonSpinner,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import { 
  addOutline, 
  trashOutline, 
  camera, 
  searchOutline,
  filterOutline,
  timeOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  refreshOutline
} from 'ionicons/icons';
import { useColorblindFilter } from '../colorBlindContext';
import { usePhotoGallery } from './usePhotoGallery';
import './MedicationsPage.css';
import { Medication } from '../api types/types';
import '../daltonization.css';

const MedicationsPage: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [medicationToDelete, setMedicationToDelete] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { daltonization } = useColorblindFilter();
  const { takePhoto, photos } = usePhotoGallery();

  useEffect(() => {
    loadMedications();
    // Add some initial hardcoded medications if none exist
    const storedMedications = JSON.parse(localStorage.getItem('medications') || '[]');
    if (storedMedications.length === 0) {
      const initialMedications: Medication[] = [
        {
          id: 1,
          name: 'Aspirin',
          amount: '100mg',
          image: 'https://placehold.co/100x100/purple/white?text=A'
        },
        {
          id: 2,
          name: 'Ibuprofen',
          amount: '200mg',
          image: 'https://placehold.co/100x100/blue/white?text=I'
        },
        {
          id: 3,
          name: 'Vitamin D',
          amount: '1000IU',
          image: 'https://placehold.co/100x100/green/white?text=V'
        },
        {
          id: 4,
          name: 'Metformin',
          amount: '500mg',
          image: 'https://placehold.co/100x100/red/white?text=M'
        },
        {
          id: 5,
          name: 'Lisinopril',
          amount: '10mg',
          image: 'https://placehold.co/100x100/orange/white?text=L'
        },
        {
          id: 6,
          name: 'Atorvastatin',
          amount: '20mg',
          image: 'https://placehold.co/100x100/yellow/white?text=A'
        }
      ];
      localStorage.setItem('medications', JSON.stringify(initialMedications));
      setMedications(initialMedications);
    }
  }, []);

  const loadMedications = async () => {
    try {
      setLoading(true);
      const storedMedications = JSON.parse(localStorage.getItem('medications') || '[]');
      setMedications(storedMedications);
      setError(null);
    } catch (err) {
      setError('Failed to load medications');
      console.error('Error loading medications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await loadMedications();
    event.detail.complete();
  };

  const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error('Error converting image to base64:', err);
      throw err;
    }
  };

  const addMedication = async () => {
    if (!name.trim() || !amount.trim() || !photos[0]) {
      setToastMessage("Please fill in all fields and add an image.");
      setShowToast(true);
      return;
    }

    try {
      // Convert image to base64
      const base64Image = await convertImageToBase64(photos[0].webviewPath!);

      const newMedication: Medication = {
        id: Date.now(),
        name: name.trim(),
        amount: amount.trim(),
        image: base64Image,
      };

      const updatedMedications = [...medications, newMedication];
      setMedications(updatedMedications);
      localStorage.setItem('medications', JSON.stringify(updatedMedications));
      setName("");
      setAmount("");
      setToastMessage("Medication added successfully!");
      setShowToast(true);
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to add medication');
      console.error('Error adding medication:', err);
    }
  };

  const confirmDelete = (id: number) => {
    setMedicationToDelete(id);
    setShowDeleteAlert(true);
  };

  const deleteMedication = () => {
    if (medicationToDelete !== null) {
      try {
        const updatedMedications = medications.filter((med) => med.id !== medicationToDelete);
        setMedications(updatedMedications);
        localStorage.setItem('medications', JSON.stringify(updatedMedications));
        setToastMessage("Medication deleted successfully!");
        setShowToast(true);
      } catch (err) {
        setError('Failed to delete medication');
        console.error('Error deleting medication:', err);
      }
    }
    setShowDeleteAlert(false);
    setMedicationToDelete(null);
  };

  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchText.toLowerCase()) ||
    med.amount.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage className={`${daltonization} daltonization-active`}>
      <IonContent fullscreen className="ion-padding content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingIcon={refreshOutline}
            refreshingSpinner="circles"
          />
        </IonRefresher>

        <div className="welcome-section">
          <h1 className="welcome-title">My Medications</h1>
          <div className="quick-stats">
            <IonCard className="stat-card">
              <IonCardContent>
                <h2>{medications.length}</h2>
                <p>Total Medications</p>
              </IonCardContent>
            </IonCard>
          </div>
        </div>

        <div className="search-section">
          <IonSearchbar
            value={searchText}
            onIonChange={e => setSearchText(e.detail.value!)}
            placeholder="Search medications..."
            animated
            className="search-bar"
          />
        </div>

        {error && (
          <div className="error-message">
            <IonIcon icon={alertCircleOutline} />
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <IonSpinner name="circles" />
            <p>Loading medications...</p>
          </div>
        ) : (
          <div className="medications-section">
            <h2 className="section-title">Medication List</h2>
            <IonGrid>
              <IonRow>
                {filteredMedications.map((med) => (
                  <IonCol size="12" sizeMd="6" sizeLg="4" key={med.id}>
                    <IonCard className="medication-item">
                      <IonCardContent>
                        <div className="medication-image">
                          <IonImg src={med.image} alt={med.name} />
                        </div>
                        <div className="medication-details">
                          <h2>{med.name}</h2>
                          <p>{med.amount}</p>
                          <div className="medication-actions">
                            <IonButton
                              color="danger"
                              fill="clear"
                              className="delete-button"
                              onClick={() => confirmDelete(med.id)}
                            >
                              <IonIcon icon={trashOutline} />
                            </IonButton>
                          </div>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </div>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowAddModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        <IonModal isOpen={showAddModal} onDidDismiss={() => setShowAddModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add Medication</IonTitle>
              <IonButton slot="end" fill="clear" onClick={() => setShowAddModal(false)}>
                Close
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonCard>
              <IonCardContent>
                <IonItem>
                  <IonLabel position="floating">Medication Name</IonLabel>
                  <IonInput
                    value={name}
                    onIonChange={(e) => setName(e.detail.value!)}
                    placeholder="e.g., Paracetamol"
                    required
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Amount</IonLabel>
                  <IonInput
                    value={amount}
                    onIonChange={(e) => setAmount(e.detail.value!)}
                    placeholder="e.g., 3 pills"
                    required
                  />
                </IonItem>
                <div className="photo-section">
                  <IonButton expand="block" onClick={takePhoto} className="ion-margin-top">
                    <IonIcon icon={camera} slot="start" />
                    Take Photo
                  </IonButton>
                  {photos[0] ? (
                    <div className="photo-preview">
                      <IonImg src={photos[0].webviewPath} alt="Medication" />
                    </div>
                  ) : (
                    <div className="photo-required-message">
                      <IonIcon icon={alertCircleOutline} />
                      <p>Photo is required</p>
                    </div>
                  )}
                </div>
                <IonButton expand="block" onClick={addMedication} className="ion-margin-top">
                  <IonIcon icon={addOutline} slot="start" />
                  Add Medication
                </IonButton>
              </IonCardContent>
            </IonCard>
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
            { text: 'Delete', handler: deleteMedication, role: 'destructive' },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default MedicationsPage;