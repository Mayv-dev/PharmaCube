import { useEffect, useState } from 'react';
import { IonButton, IonContent, IonPage, IonSelect, IonSelectOption} from '@ionic/react';
import LowerToolbar from '../../components/LowerToolbar';
import '../../styles/Medication Subpages/MedicationAddPage.css';
import axios from 'axios';

import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";
import useConfirmationAlert from "../../composables/useConfirmationAlert";


const MedicationAddPage: React.FC = () => {
  const [user, setUser] = useState('User');
  const [medication, setMedication] = useState('Medication');
  const [dosage, setDosage] = useState('');

  const { performSQLAction } = useSQLiteDB();

  async function sendToMockable(userInput:string, medicationInput:string, dosageInput:string) {
   
    if (user != "User" && medication != "Medication" && dosage != "") {
      try{
        console.log("post request being made...")
        const { data, status } = await axios.post(
          'https://demo3553220.mockable.io/',
          {
            "id": 12345,
            "user": userInput,  
            "medication": medicationInput,
            "dosage amount": dosageInput,
            "details":"test run"
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
    else {
      console.log("blank input. Try again")
    }
  };

  const addItem = async () => {
    if (user != "User" && medication != "Medication" && dosage != "") {
    try {
      // add test record to db
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`INSERT INTO medication (id,name,dose_amount,details) values (?,?,?,?);`, [
            Date.now(),
            "stored medication",
            "400mg",
            "details are listed here"
          ]);
        }
      );
      
    } catch (error) {
      alert((error as Error).message);
    }
  }
  };


  return(
    <IonPage>
      
      <LowerToolbar title='Add a Medication'/>

      <IonContent>
        <IonSelect placeholder='Users' onIonChange={e => setUser(e.target.value)}>
          <IonSelectOption>TEST Duffy</IonSelectOption>
          <IonSelectOption>TEST Murphy</IonSelectOption>
          <IonSelectOption>TEST McMahon</IonSelectOption>
        </IonSelect>
        <IonSelect placeholder='Medications' onIonChange={e => setMedication(e.target.value)}>
          <IonSelectOption>TEST Ibuprofen</IonSelectOption>
          <IonSelectOption>TEST Sertraline</IonSelectOption>
          <IonSelectOption>TEST Multivitamin</IonSelectOption>
        </IonSelect>
        <IonSelect placeholder='Dosage' onIonChange={e => setDosage(e.target.value)}>
          <IonSelectOption>TEST 50mg</IonSelectOption>
          <IonSelectOption>TEST 100mg</IonSelectOption>
          <IonSelectOption>TEST 200mg</IonSelectOption>
        </IonSelect>
        <IonButton onClick={e => sendToMockable(user, medication, dosage).then(e => addItem())}>
          Give {user} {medication}
        </IonButton>
      </IonContent>

    </IonPage>
  );
}

export default MedicationAddPage;
