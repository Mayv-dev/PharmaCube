import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

import React, { useEffect,useState } from 'react';

import axios from 'axios';

async function getMockData() {
  try {
    const { data, status } = await axios.get(
      'https://demo3553220.mockable.io/',
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

getMockData().then(response => console.log(JSON.stringify(response)))

const Tab2: React.FC = () => {
	const [schedule, setSchedule] = useState<any[]>([]);

  useEffect(() => {
		getMockData().then(setSchedule);
  },[]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='center'>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">rahr</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
