import { IonContent, IonButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './ScheduleAddModifyPage.css';
import React, { useEffect,useState } from 'react';

import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";
import useConfirmationAlert from "../../composables/useConfirmationAlert";

import axios from 'axios';



// Learned how to make enums from: https://www.typescriptlang.org/docs/handbook/enums.html
enum formState {ADD, MODIFY}

interface AddGameFormProps {
	enteredFormState: formState;
  }

const ScheduleAddModifyPage: React.FC<AddGameFormProps> = ({enteredFormState}) => {
  const [formState, setFormState] = useState<formState>(0);
  const { performSQLAction, initialized } = useSQLiteDB();

    useEffect(() => {
      setFormState(enteredFormState)
      },[]);


      async function sendToMockable(enteredFormState:formState) {
        try {
          enum formState {ADD, MODIFY}

          if(enteredFormState == formState.ADD) {
            console.log("post request being made...")
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
          }
          else {
            console.log("put request being made...")
            const { data, status } = await axios.put(
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
          }
      
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
          } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
          }
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
            new Date().toISOString()
          ]);
          console.log(Date.now().toString())
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
          <IonTitle className='center'>{enteredFormState}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={e => sendToMockable(formState).then(e => addItem(formState))} expand="block" className='ScheduleButtons' color="light">
              Submit
      </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ScheduleAddModifyPage;
