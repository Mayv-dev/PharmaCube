import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import ScheduleItem from '../../components/ScheduleItem';
import './ScheduleViewPage.css';
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";
import useConfirmationAlert from "../../composables/useConfirmationAlert";

// This file's original sqlite content was taken from the video used to implement sqlite in our project https://www.youtube.com/watch?v=tixvx5nsJO8&t=1130s
type SQLItem = {
  id: number;
  day: number;
  time: string;
};

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
	const [schedule, setSchedule] = useState<Array<SQLItem>>();


  // hook for sqlite db
  const { performSQLAction, initialized } = useSQLiteDB();

  // hook for confirmation dialog
  const { showConfirmationAlert, ConfirmationAlert } = useConfirmationAlert();

  useEffect(() => {
    loadData();
  }, [initialized]);

  /**
   * do a select of the database
   */
  const loadData = async () => {
    try {
      // query db
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM schedule`);
        setSchedule(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setSchedule([]);
    }
  };


  const addItem = async () => {
    try {
      // add test record to db
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`INSERT INTO schedule (id,day,time) values (?,?,?);`, [
            Date.now(),
            5,
            Date.now().toString(),
          ]);

          // update ui
          const respSelect = await db?.query(`SELECT * FROM schedule;`);
          setSchedule(respSelect?.values);
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }
  };

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
        
        {
          schedule?.map(scheduleItem => 
            <ScheduleItem 
              id={scheduleItem.id} 
              day={scheduleItem.day} 
              time={scheduleItem.time} 
            />
          )
        }
      </IonContent>
    </IonPage>
  );
};

export default ScheduleViewPage;
