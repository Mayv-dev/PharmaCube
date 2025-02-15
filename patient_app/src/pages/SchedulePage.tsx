import { IonButton, IonCard, IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import './SchedulePage.css';

const SchedulePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='center'>Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='wrapper ion-padding'>
        <IonCard className='card'>
        <IonRouterLink routerLink='/ScheduleAddModifyPage'>
        <IonButton expand="block" className='ScheduleButtons' color="light">
              Add Item to Schedule
      </IonButton>
      </IonRouterLink>
      <IonRouterLink routerLink='/ScheduleAddModifyPage'>
        <IonButton expand="block" className='ScheduleButtons' color="light">
              Modify A Scheduled Item
      </IonButton>
      </IonRouterLink>
      <IonRouterLink routerLink='/ScheduleViewPage'>
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

export default SchedulePage;
