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
  IonDatetime,
} from '@ionic/react';
import { timeOutline, calendarOutline, calendar } from 'ionicons/icons';
import { useColorblindFilter } from '../../colorBlindContext'; 
import './ScheduleViewPage.css';

const SchedulePage: React.FC = () => {
  const { filter, setFilter } = useColorblindFilter();

  return (
    <IonPage className={filter}> {}
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center title">
            PharmaCube Schedule
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding content">
        {/* Filter Selector */}
        <IonSelect
          value={filter}
          placeholder="Select Colorblind Filter"
          onIonChange={(e) => setFilter(e.detail.value)} // Update the global filter state
          className="filter-selector"
        >
          <IonSelectOption value="">None</IonSelectOption>
          <IonSelectOption value="protanopia-filter">Protanopia</IonSelectOption>
          <IonSelectOption value="deuteranopia-filter">Deuteranopia</IonSelectOption>
          <IonSelectOption value="tritanopia-filter">Tritanopia</IonSelectOption>
          <IonSelectOption value="achromatopsia-filter">Achromatopsia</IonSelectOption>
        </IonSelect>

        {/* Calendar Component */}
        <IonDatetime
          displayFormat="MM/DD/YYYY"
          placeholder="Select Date"
          className="calendar"
        ></IonDatetime>

        {/* Large Schedule Icon */}
        <div className="center-icon-container">
          <IonIcon icon={calendar} className="center-icon" />
        </div>

        
      </IonContent>
    </IonPage>
  );
};

export default SchedulePage;