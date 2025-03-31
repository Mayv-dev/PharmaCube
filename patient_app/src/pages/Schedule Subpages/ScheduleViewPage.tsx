import React, { useState } from 'react';
import {
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonDatetime,
  IonButton,
  IonList,
} from '@ionic/react';
import { timeOutline, calendarOutline, calendar, checkmarkCircle, closeCircle } from 'ionicons/icons';
import { useColorblindFilter } from '../../colorBlindContext'; 
import './ScheduleViewPage.css';

const ScheduleViewPage: React.FC = () => {
  const { filter } = useColorblindFilter();
  const [medicationStatus, setMedicationStatus] = useState<{ [key: string]: { taken: boolean, missingDoseHandling?: string } }>({});

  const handleMedicationStatus = (date: string, taken: boolean, missingDoseHandling?: string) => {
    setMedicationStatus(prevStatus => ({
      ...prevStatus,
      [date]: { taken, missingDoseHandling },
    }));
  };

  return (
    <IonPage className={filter}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Schedule View</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding content">
        {/* Calendar Component */}
        <IonDatetime
          displayFormat="MM/DD/YYYY"
          placeholder="Select Date"
          className="calendar"
          onIonChange={(e) => console.log(e.detail.value)}
        ></IonDatetime>

        {/* Medication Status Buttons */}
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                color="success"
                onClick={() => handleMedicationStatus(new Date().toISOString().split('T')[0], true)}
              >
                <IonIcon icon={checkmarkCircle} slot="start" />
                Taken
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                expand="block"
                color="danger"
                onClick={() => handleMedicationStatus(new Date().toISOString().split('T')[0], false, "Handling information")}
              >
                <IonIcon icon={closeCircle} slot="start" />
                Not Taken
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Display Medication Status */}
        <IonList>
          {Object.entries(medicationStatus).map(([date, status]) => (
            <IonItem key={date}>
              <IonLabel>
                {new Date(date).toLocaleDateString()}: {status.taken ? 'Taken' : 'Not Taken'}
                {status.missingDoseHandling && <p>{status.missingDoseHandling}</p>}
              </IonLabel>
              <IonIcon icon={status.taken ? checkmarkCircle : closeCircle} color={status.taken ? 'success' : 'danger'} />
            </IonItem>
          ))}
        </IonList>

        {/* Large Schedule Icon */}
        <div className="center-icon-container">
          <IonIcon icon={calendar} className="center-icon" />
        </div>
      </IonContent>
    </IonPage>
    );
  };
  
  export default ScheduleViewPage;