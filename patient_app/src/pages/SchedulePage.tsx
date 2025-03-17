import React from 'react';
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
import { timeOutline, calendarOutline } from 'ionicons/icons';
import { useColorblindFilter } from '../colorBlindContext'; // Import the colorblind context
import './SchedulePage.css';
import calendarImage from '../../../Adobe Express - file.png'; 

const SchedulePage: React.FC = () => {
  const { filter } = useColorblindFilter(); 

  return (
    <IonPage className={filter}> 
      <IonHeader>
        <IonToolbar color="primary">
          
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding content" color="secondary">

        <div className="center-icon-container">
          <img src={calendarImage} alt="Calendar" className="center-icon" />
        </div>

        <IonGrid className="center-grid">
          <IonRow className="label-row">
            <IonCol size="6">
              <IonItem lines="none" className="card-item">
                <IonRouterLink routerLink="/ScheduleAddModifyPage" className="card-link">
                  <div className="card-item-button">
                    <IonIcon icon={timeOutline} slot="start" />
                    <IonLabel className="card-label">Edit Schedule</IonLabel>
                  </div>
                </IonRouterLink>
              </IonItem>
            </IonCol>

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
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SchedulePage;