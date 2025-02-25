// src/pages/Medications Subpages/MedicationViewPage.tsx
import { IonContent, IonPage, IonSelect, IonSelectOption } from '@ionic/react';
import LowerToolbar from '../../components/LowerToolbar';
import '../../styles/Medication Subpages/MedicationViewPage.css';
import React, { useEffect, useState } from 'react';

import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";

type SQLItem = {
  id: number;
  name: string;
  dose_amount: string;
  details: string;
};

const MedicationViewPage: React.FC = () => {
  const [userName, setUserName] = useState('Unselected');
  const [localUserMedications, setLocalUserMedications] = useState<Array<SQLItem>>([]);

  const [popupState, setPopupState] = useState<boolean>(false);
  const [medId, setMedId] = useState<number>();
  const [medName, setMedName] = useState('Unselected');

  const { performSQLAction, initialized } = useSQLiteDB();

  useEffect(() => {
    loadData();
  }, [initialized]);

  const loadData = async () => {
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM medication`);
        setLocalUserMedications(respSelect?.values || []);
      });
    } catch (error) {
      alert((error as Error).message);
      setLocalUserMedications([]);
    }
  };

  const handleUserSelect = (user: string) => {
    setUserName(user);

    // Load data for the selected user
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const respSelect = await db?.query(
        `SELECT * FROM medication WHERE details LIKE ?`, 
        [`%${user}%`]
      );
      setLocalUserMedications(respSelect?.values || []);
    });
  }

  const deleteConfirmed = async () => {
    try {
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`DELETE FROM medication WHERE id=?;`, [medId]);
          // Reload the list after deletion
          const respSelect = await db?.query(`SELECT * FROM medication`);
          setLocalUserMedications(respSelect?.values || []);
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }
    setPopupState(false);
  }

  const deleteDenied = () => {
    setPopupState(false);
  }

  const deleteClicked = (medId: number, medName: string) => {
    setMedId(medId);
    setMedName(medName);
    setPopupState(true);
  }

  return (
    <IonPage>
      {popupState ? 
        <div className="confirmation-popup-overlay">
          <div className="confirmation-popup">
            <h3>
              Are you sure you want to delete <span className="med-name">{medName}</span> from <span className="user-name">{userName}</span>'s medication list?
            </h3>
            <button className="no" onClick={deleteDenied}>No</button>
            <button className="yes" onClick={deleteConfirmed}>Yes</button>
          </div>
        </div>
      : null}

      <LowerToolbar title='View Medications' />

      <IonContent className="medication-view-content">
        <h2 className="title">Select a User</h2>
        <IonSelect className="custom-select" placeholder='Users' onIonChange={e => handleUserSelect(e.detail.value)}>
          <IonSelectOption value="Ann Murphy">Ann Murphy</IonSelectOption>
          <IonSelectOption value="John Wayne">John Wayne</IonSelectOption>
          <IonSelectOption value="Irene Duffy">Irene Duffy</IonSelectOption>
        </IonSelect>

        {userName === "Unselected" ? null :
        <>
          <h3>Medications</h3>
          <ul className="medication-list">
            {localUserMedications.map(medication => (
              <li key={medication.id}>
                {medication.name} - {medication.dose_amount} 
                <span className="deletionButton" onClick={() => deleteClicked(medication.id, medication.name)}>🗑️</span>
              </li>
            ))}
          </ul>
        </>
        }
      </IonContent>
    </IonPage>
  );
};

export default MedicationViewPage;
