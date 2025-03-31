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
import axios from 'axios';

const SchedulePage: React.FC = () => {
  const { filter, setFilter } = useColorblindFilter();

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

        {/* Large Schedule Icon */}
        <div className="center-icon-container">
          <IonIcon icon={calendar} className="center-icon" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SchedulePage;