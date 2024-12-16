import { IonContent, IonPage, IonSelect, IonSelectOption} from '@ionic/react';
import LowerToolbar from '../../components/LowerToolbar';
import '../../styles/Medication Subpages/MedicationViewPage.css';
import React, { useEffect,useState } from 'react';
import axios from 'axios';

import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";
import useConfirmationAlert from "../../composables/useConfirmationAlert";

// This file's original sqlite content was taken from the video used to implement sqlite in our project https://www.youtube.com/watch?v=tixvx5nsJO8&t=1130s
type SQLItem = {
  id: number;
  name: string;
  dose_amount: string;
  details: string;
};

async function getMockData() {
  try {
    const { data, status } = await axios.get(
      'http://demo3553220.mockable.io/',
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

const MedicationViewPage: React.FC = () => {
  const [user, setUser] = useState('Unselected');
  const [userMedications, setUserMedications] = useState<any[]>()
  const [localUserMedications, setLocalUserMedications] = useState<Array<SQLItem>>()
  
  // hook for sqlite db
  const { performSQLAction, initialized } = useSQLiteDB();

  // hook for confirmation dialog
  const { showConfirmationAlert, ConfirmationAlert } = useConfirmationAlert();

  useEffect(() => {
    loadData();
  }, [initialized]);
	
  const loadData = async () => {
    try {
      // query db
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM medication`);
        setLocalUserMedications(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setLocalUserMedications([]);
    }
  };

  const handleUserSelect = (user:string) => {
    console.log("This should display the medications assigned to: " + user);
    setUser(user);
    getMockData().then(setUserMedications);
  }


  return (
    <IonPage>
      
      <LowerToolbar title='View Medications'/>

      <IonContent>
        <p>Select a user</p>
        <IonSelect placeholder='Users' onIonChange={e => handleUserSelect(e.target.value)}>
          <IonSelectOption>TEST Duffy</IonSelectOption>
          <IonSelectOption>TEST Murphy</IonSelectOption>
          <IonSelectOption>TEST McMahon</IonSelectOption>
        </IonSelect>

        {user == "Unselected" ? null :
        <>
          <p>Medications from API</p>
          <ul>
          {userMedications?.map(medication => <li>{medication.name} - {medication["dose amount"]} - {medication.details}</li>)}
          </ul>

          <p>Medications from local storage</p>
          <ul>
          {localUserMedications?.map(medication => <li>{medication.name}</li>)}
          </ul>
        </>
        }
      </IonContent>

    </IonPage>
  );
};

export default MedicationViewPage;
