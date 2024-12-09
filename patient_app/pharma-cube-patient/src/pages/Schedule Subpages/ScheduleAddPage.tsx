import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './ScheduleAddPage.css';

import axios from 'axios';

async function postToMockable() {
  try {
    const { data, status } = await axios.post(
      'https://demo3553220.mockable.io/',
      {
        id: 12345,
        day: 0,
        time: "2024-11-23T17:09:15+00:00"
      },
      {
        headers: {
          Accept: 'application/json'
        },
      },
    );

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

postToMockable()

const ScheduleAddPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='center'>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default ScheduleAddPage;
