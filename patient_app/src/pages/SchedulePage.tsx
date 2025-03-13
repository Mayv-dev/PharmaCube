import React, { useState } from 'react';
import {
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { timeOutline, calendarOutline, eyeOutline } from 'ionicons/icons'; // Removed calendar icon as it's no longer needed
import './SchedulePage.css';
import calendarImage from '../../../Adobe Express - file.png'; // Adjust the path to your image

const SchedulePage: React.FC = () => {
  const [filter, setFilter] = useState<string>(''); 

  return (
    <IonPage className={filter}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center title">
            PharmaCube Schedule
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding content" color="secondary">
        {/* Large Schedule Icon */}
        <div className="center-icon-container">
          <img src={calendarImage} alt="Calendar" className="center-icon" />
        </div>

        {/* Set My Free Times and View Schedule Labels */}
        <IonGrid className="center-grid">
          <IonRow className="label-row">
            <IonCol size="6">
              <IonItem lines="none" className="card-item">
                <IonRouterLink routerLink="/ScheduleViewPage" className="card-link">
                  <div className="card-item-button">
                    <IonIcon icon={calendarOutline} slot="start" />
                    <IonLabel className="card-label">View Schedule</IonLabel>
                  </div>
                </IonRouterLink>
              </IonItem>
            </IonCol>
            <IonCol size="6">
              <IonItem lines="none" className="card-item">
                <IonRouterLink routerLink="/ScheduleAddModifyPage" className="card-link">
                  <div className="card-item-button">
                    <IonIcon icon={timeOutline} slot="start" />
                    <IonLabel className="card-label">Set My Schedule</IonLabel>
                  </div>
                </IonRouterLink>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SchedulePage;