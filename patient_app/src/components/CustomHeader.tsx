import React from 'react';
import { IonHeader, IonToolbar, IonTitle, useIonRouter } from '@ionic/react';
import './CustomHeader.css';

interface CustomHeaderProps {
  title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  const router = useIonRouter();

  // Optional: Keep your dynamic title logic if you want
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
      case '/ChatPage':
        return 'AI Helper';
      default:
        return title; // Use the passed title prop as fallback
    }
  };

  return (
    <IonHeader className="custom-header">
      <IonToolbar className="custom-toolbar">
        <IonTitle className="custom-title">{getPageTitle()}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default CustomHeader;