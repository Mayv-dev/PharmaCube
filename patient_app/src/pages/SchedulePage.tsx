import React from 'react';
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
  IonButton,
} from '@ionic/react';
import { timeOutline, calendarOutline } from 'ionicons/icons';
import { useColorblindFilter } from '../colorBlindContext';
import { useHistory } from 'react-router-dom';
import './SchedulePage.css';
import calendarImage from '../Picture2.png';

const SchedulePage: React.FC = () => {
  const { filter } = useColorblindFilter();
  const history = useHistory();

  const handleViewSchedule = () => {
    console.log('View Schedule button clicked');
    history.push('/schedule/view');
  };

  const handleEditSchedule = () => {
    console.log('Edit Schedule button clicked');
    history.push('/schedule/edit');
  };

  return (
    <IonPage className={filter}>
      <IonContent fullscreen className="ion-padding content">
        <div className="center-icon-container">
          <img src={calendarImage} alt="Calendar" className="center-icon" />
        </div>

        <IonGrid className="center-grid">
          <IonRow className="label-row">
            <IonCol size="6">
              <IonItem lines="none" className="card-item">
                <div className="card-link" onClick={handleEditSchedule}>
                  <div className="card-item-button">
                    <IonIcon icon={timeOutline} slot="start" />
                    <IonLabel className="card-label">Edit Schedule</IonLabel>
                  </div>
                </div>
              </IonItem>
            </IonCol>

            <IonCol size="6">
              <IonItem lines="none" className="card-item">
                <div className="card-link" onClick={handleViewSchedule}>
                  <div className="card-item-button">
                    <IonIcon icon={calendarOutline} slot="start" />
                    <IonLabel className="card-label">View Schedule</IonLabel>
                  </div>
                </div>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SchedulePage;