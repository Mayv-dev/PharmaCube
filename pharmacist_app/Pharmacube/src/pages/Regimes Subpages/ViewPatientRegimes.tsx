import { IonContent, IonPage, IonSelect, IonSelectOption } from '@ionic/react';
import LowerToolbar from '../../components/LowerToolbar';
import '../../styles/Regimes Subpages/ViewPatientRegimes.css';
import React, { useEffect, useState } from 'react';

import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";

type RegimeItem = {
  id: number;
  medication_name: string;
  dosage: string;
  compartment: string;
  days: string;
  time_of_day: string;
  time_offset: string;
  instructions: string;
};

type UserItem = {
  id: number;
  name: string;
};

const ViewPatientRegimes: React.FC = () => {
  const [userName, setUserName] = useState('User');
  const [userList, setUserList] = useState<Array<UserItem>>([]);
  const [regimeList, setRegimeList] = useState<Array<RegimeItem>>([]);

  const [popupState, setPopupState] = useState<boolean>(false);
  const [regimeId, setRegimeId] = useState<number>();
  const { performSQLAction, initialized } = useSQLiteDB();

  useEffect(() => {
    loadUsers();
  }, [initialized]);

  const loadUsers = async () => {
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM users`);
        setUserList(respSelect?.values || []);
      });
    } catch (error) {
      alert((error as Error).message);
      setUserList([]);
    }
  };

  const handleUserSelect = (user: string) => {
    setUserName(user);

    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const respSelect = await db?.query(
        `SELECT * FROM regimes WHERE user = ?`, 
        [user]
      );
      setRegimeList(respSelect?.values || []);
    });
  }

  const deleteConfirmed = async () => {
    try {
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`DELETE FROM regimes WHERE id=?;`, [regimeId]);
          const respSelect = await db?.query(`SELECT * FROM regimes WHERE user = ?`, [userName]);
          setRegimeList(respSelect?.values || []);
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

  const deleteClicked = (regimeId: number) => {
    setRegimeId(regimeId);
    setPopupState(true);
  }

  return (
    <IonPage>
      {popupState ? 
        <div className="confirmation-popup-overlay">
          <div className="confirmation-popup">
            <h3>Are you sure you want to delete this regime?</h3>
            <button className="no" onClick={deleteDenied}>No</button>
            <button className="yes" onClick={deleteConfirmed}>Yes</button>
          </div>
        </div>
      : null}

      <LowerToolbar title='View Regimes' />

      <IonContent className="view-regime-content">
        <h2 className="title">Select a User</h2>
        <IonSelect className="custom-select" placeholder='Users' onIonChange={e => handleUserSelect(e.detail.value)}>
          <IonSelectOption value="User" disabled>Select User</IonSelectOption>
          {userList.map(userItem => (
            <IonSelectOption key={userItem.id} value={userItem.name}>
              {userItem.name}
            </IonSelectOption>
          ))}
        </IonSelect>

        {userName === "User" ? null :
        <>
          <h3>{userName}'s Regimes</h3>
          <ul className="regime-list">
            {regimeList.map(regime => (
              <li key={regime.id}>
                <strong>Medications:</strong> {regime.medication_name} <br />
                <strong>Dosage:</strong> {regime.dosage} <br />
                <strong>Taken At:</strong> {regime.days}, {regime.time_of_day} <br />
                <strong>Information:</strong> {regime.instructions}
                <span className="deletionButton" onClick={() => deleteClicked(regime.id)}>🗑️</span>
              </li>
            ))}
          </ul>
        </>
        }
      </IonContent>
    </IonPage>
  );
};

export default ViewPatientRegimes;
