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
        {
          schedule.map(scheduleItem => {
            if(scheduleItem.day == 0) return <p key={scheduleItem.id}>Monday   {scheduleItem.time.substring(11,16)}</p>
            else if(scheduleItem.day == 1) return <p key={scheduleItem.id}>Tuesday   {scheduleItem.time.substring(11,16)}</p>
            else if(scheduleItem.day == 2) return <p key={scheduleItem.id}>Wednesday   {scheduleItem.time.substring(11,16)}</p>
            else if(scheduleItem.day == 3) return <p key={scheduleItem.id}>Thursday   {scheduleItem.time.substring(11,16)}</p>
            else if(scheduleItem.day == 4) return <p key={scheduleItem.id}>Friday   {scheduleItem.time.substring(11,16)}</p>
            else if(scheduleItem.day == 5) return <p key={scheduleItem.id}>Saturday   {scheduleItem.time.substring(11,16)}</p>
            else if(scheduleItem.day == 6) return <p key={scheduleItem.id}>Sunday   {scheduleItem.time.substring(11,16)}</p>
          })
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
