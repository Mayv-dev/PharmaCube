import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { addCircleOutline, createOutline, calendarOutline } from 'ionicons/icons'; // Import the required icons
import './SchedulePage.css';

const SchedulePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center title">
            PharmaCube Schedule
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding content" color="secondary">
        <IonCard className="ion-padding card" color="secondary">
          <IonRouterLink routerLink="/ScheduleAddModifyPage">
            <IonButton expand="block" className="ScheduleButtons add-button">
              <IonIcon icon={addCircleOutline} slot="start" /> {/* Add icon */}
              <span className="button-text">Add Medication to Schedule</span>
            </IonButton>
          </IonRouterLink>
          <IonRouterLink routerLink="/ScheduleAddModifyPage">
            <IonButton expand="block" className="ScheduleButtons modify-button">
              <IonIcon icon={createOutline} slot="start" /> {/* Modify icon */}
              <span className="button-text">Modify Scheduled Medication</span>
            </IonButton>
          </IonRouterLink>
          <IonRouterLink routerLink="/ScheduleViewPage">
            <IonButton expand="block" className="ScheduleButtons view-button">
              <IonIcon icon={calendarOutline} slot="start" /> {/* View icon */}
              <span className="button-text">View Your Medication Schedule</span>
            </IonButton>
          </IonRouterLink>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SchedulePage;