import { IonButton, IonCard, IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='center'>Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='wrapper'>
        <IonCard className='card'>
        <IonRouterLink routerLink='/Tab3'>
        <IonButton expand="block" className='ScheduleButtons' color="light">
              Add Item to Schedule
      </IonButton>
      </IonRouterLink>
      <IonRouterLink routerLink='/Tab2'>
      <IonButton expand="block" className='ScheduleButtons' color="light">
              View Your Schedule
      </IonButton>
      </IonRouterLink>
      </IonCard>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Schedule</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
