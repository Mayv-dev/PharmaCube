import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import ScheduleItem from '../../components/ScheduleItem';
import './ScheduleViewPage.css';

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



const ScheduleViewPage: React.FC = () => {
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
          schedule.map(scheduleItem => 
            <ScheduleItem id={scheduleItem.id} day={scheduleItem.day} time={scheduleItem.time} ></ScheduleItem>
          )
        }
      </IonContent>
    </IonPage>
  );
};

export default ScheduleViewPage;
