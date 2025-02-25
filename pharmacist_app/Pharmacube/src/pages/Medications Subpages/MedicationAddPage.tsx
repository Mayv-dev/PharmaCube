// src/pages/Medications Subpages/MedicationAddPage.tsx
import { useState } from 'react';
import { IonButton, IonContent, IonPage, IonSelect, IonSelectOption } from '@ionic/react';
import LowerToolbar from '../../components/LowerToolbar';
import '../../styles/Medication Subpages/MedicationAddPage.css';
import axios from 'axios';

import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";

const MedicationAddPage: React.FC = () => {
  const [user, setUser] = useState('User');
  const [medication, setMedication] = useState('Medication');
  const [dosage, setDosage] = useState('');

  const { performSQLAction } = useSQLiteDB();

  async function sendToMockable(userInput: string, medicationInput: string, dosageInput: string) {
    if (user !== "User" && medication !== "Medication" && dosage !== "") {
      try {
        console.log("post request being made...")
        const { data, status } = await axios.post(
          'https://demo3553220.mockable.io/',
          {
            "id": 12345,
            "user": userInput,
            "medication": medicationInput,
            "dosage amount": dosageInput,
            "details": "test run"
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
    } else {
      console.log("blank input. Try again");
    }
  };

  const addItem = async () => {
    if (user !== "User" && medication !== "Medication" && dosage !== "") {
      try {
        performSQLAction(
          async (db: SQLiteDBConnection | undefined) => {
            await db?.query(`INSERT INTO medication (id, name, dose_amount, details) values (?,?,?,?);`, [
              Date.now(),
              medication,   // Save the selected medication name
              dosage,       // Save the selected dosage
              `Given to ${user}`  // Store the user the medication is assigned to
            ]);
          }
        );
      } catch (error) {
        alert((error as Error).message);
      }
    }
  };
  

  return (
    <IonPage>
      <LowerToolbar title='Add a Medication' />

      <IonContent className="medication-add-content">
        <h2 className="title">Add a Medication</h2>
        <IonSelect className="custom-select" placeholder='Users' onIonChange={e => setUser(e.detail.value)}>
          <IonSelectOption value="Irene Duffy">Irene Duffy</IonSelectOption>
          <IonSelectOption value="Ann Murphy">Ann Murphy</IonSelectOption>
          <IonSelectOption value="John Wayne">John Wayne</IonSelectOption>
        </IonSelect>
        <IonSelect className="custom-select" placeholder='Medications' onIonChange={e => setMedication(e.detail.value)}>
          <IonSelectOption value="Ibuprofen">Ibuprofen</IonSelectOption>
          <IonSelectOption value="Ibandronate">Ibandronate</IonSelectOption>
          <IonSelectOption value="Ibrance">Ibrance</IonSelectOption>
        </IonSelect>
        <IonSelect className="custom-select" placeholder='Dosage' onIonChange={e => setDosage(e.detail.value)}>
          <IonSelectOption>50mg</IonSelectOption>
          <IonSelectOption>100mg</IonSelectOption>
          <IonSelectOption>200mg</IonSelectOption>
        </IonSelect>
        <IonButton className="custom-button" onClick={e => sendToMockable(user, medication, dosage).then(e => addItem())}>
          Give {user} {medication}
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default MedicationAddPage;
