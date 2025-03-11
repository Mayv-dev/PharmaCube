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
import { timeOutline, calendarOutline, calendar, eyeOutline } from 'ionicons/icons'; // Added eyeOutline for colorblind icon
import { useState } from 'react';
import './SchedulePage.css';

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
          <IonIcon icon={calendar} className="center-icon" />
        </div>

          {/* Colorblind Filter Selector */}
          <div className="filter-selector-container">
          
          <IonSelect
            value={filter}
            placeholder="Select Colorblind Filter"
            onIonChange={(e) => setFilter(e.detail.value)}
            className="filter-selector"
          >
            <IonSelectOption value="">Colorblind Filter</IonSelectOption>
            <IonSelectOption value="protanopia-filter">Protanopia</IonSelectOption>
            <IonSelectOption value="deuteranopia-filter">Deuteranopia</IonSelectOption>
            <IonSelectOption value="tritanopia-filter">Tritanopia</IonSelectOption>
            <IonSelectOption value="achromatopsia-filter">Achromatopsia</IonSelectOption>
          </IonSelect>
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