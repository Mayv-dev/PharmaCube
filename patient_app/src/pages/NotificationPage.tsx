import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import axios from 'axios';
import { useColorblindFilter } from '../colorBlindContext'; // Import the colorblind context
import './NotificationPage.css';
import NotificationItem from '../components/NotificationItem';

enum urgency {
  LOW,
  MEDIUM,
  HIGH,
}

type Notification = {
  id: number;
  content: string;
  timestamp: string;
  urgency: urgency;
};

async function getMockData() {
  try {
    const { data, status } = await axios.get('http://demo3553220.mockable.io/notification', {
      headers: {
        Accept: 'application/json',
      },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>();
  const { filter } = useColorblindFilter(); // Use the filter from the context

  useEffect(() => {
    getMockData().then(setNotifications);
  }, []);

  return (
    <IonPage className={filter}> {/* Apply the filter class */}
      <IonHeader>
        <IonToolbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="wrapper ion-padding">
        {notifications?.map((notification) => (
          <NotificationItem
            key={notification.id}
            id={notification.id}
            content={notification.content}
            timestamp={notification.timestamp}
            urgencyPassed={notification.urgency}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default NotificationPage;