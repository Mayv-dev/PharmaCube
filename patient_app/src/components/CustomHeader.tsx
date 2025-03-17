import React from 'react';
import { IonHeader, IonToolbar, IonTitle, useIonRouter } from '@ionic/react';
import './CustomHeader.css'; // Import the CSS file

const CustomHeader: React.FC = () => {
  const router = useIonRouter();

  const getPageTitle = () => {
    const path = router.routeInfo.pathname;
    switch (path) {
      case '/SchedulePage':
        return 'Schedule';
      case '/ScheduleViewPage':
        return 'View Schedule';
      case '/ScheduleAddModifyPage':
        return 'Add/Modify Schedule';
      case '/NotificationsPage':
        return 'Notifications';
      case '/MedicationsPage':
        return 'Medications';
      case '/SettingsPage':
        return 'Settings';
      default:
        return 'My App';
    }
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{getPageTitle()}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default CustomHeader;