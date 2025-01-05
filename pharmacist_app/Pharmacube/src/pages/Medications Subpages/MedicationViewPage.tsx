import { IonContent, IonPage, IonSelect, IonSelectOption} from '@ionic/react';
import LowerToolbar from '../../components/LowerToolbar';
import DeleteConfirmationPopup from '../../components/Medications Components/DeleteConfirmationPopup';
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
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('Unselected');
  const [medId, setMedId] = useState(null);
  const [medName, setMedName] = useState('Unselected');

  const [userMedications, setUserMedications] = useState<any[]>()
  const [localUserMedications, setLocalUserMedications] = useState<Array<SQLItem>>()
  
  
  const [userMedToDelete, setUserMedToDelete] = useState<any[]>()
  const [popupState, setPopupState] = useState<boolean>(false)

  // hook for sqlite db
  const { performSQLAction, initialized } = useSQLiteDB();

  // hook for confirmation dialog
  const { showConfirmationAlert, ConfirmationAlert } = useConfirmationAlert();

  useEffect(() => {
    loadData();
  }, [initialized]);
	

  const deleteConfirmed = () => {
    // SQL code to delete an item by id here
    // set popup states to nothing

    // Make popup disappear
    setPopupState(false);
  }
  
  const deleteDenied = () => {
    // Make popup disappear
    setPopupState(false);
  }

  const deleteClicked = (medId:number, medName:string) => {
    // Make popup appear
    setPopupState(true);
  }


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
    setUserName(user);
    getMockData().then(setUserMedications);
  }


  return (
    <IonPage>
      
      {popupState ? 
      <DeleteConfirmationPopup 
        med_name={"hardcoded medname"} 
        user_name={userName} 
        delete_denied={deleteDenied} 
        delete_confirmed={deleteConfirmed}
      />
      :
      null}
      <LowerToolbar title='View Medications'/>

      <IonContent>
        <p>Select a user</p>
        <IonSelect placeholder='Users' onIonChange={e => handleUserSelect(e.target.value)}>
          <IonSelectOption>TEST Duffy</IonSelectOption>
          <IonSelectOption>TEST Murphy</IonSelectOption>
          <IonSelectOption>TEST McMahon</IonSelectOption>
        </IonSelect>

        {userId == "Unselected" ? null :
        <>
          <p>Medications from API</p>
          <ul>
          {userMedications?.map(medication => <li>{medication.name} - {medication["dose amount"]} - {medication.details}</li>)}
          </ul>

          <p>Medications from local storage</p>
          <ul>
          {localUserMedications?.map(medication => <li>{medication.name} <span className="deletionButton" onClick={e => deleteClicked(medication.id, medication.name)}>Delete</span></li>)}
          </ul>
        </>
        }
      </IonContent>

    </IonPage>
  );
};

export default MedicationViewPage;