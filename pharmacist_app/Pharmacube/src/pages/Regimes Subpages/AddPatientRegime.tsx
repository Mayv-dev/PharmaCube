import { IonContent, IonPage, IonInput, IonButton, IonSelect, IonSelectOption, IonCheckbox } from '@ionic/react';
import LowerToolbar from '../../components/LowerToolbar';
import '../../styles/Regimes Subpages/AddPatientRegime.css';
import React, { useState, useEffect } from 'react';

import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";

type UserItem = {
  id: number;
  name: string;
};

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

const AddPatientRegime: React.FC = () => {
  const [user, setUser] = useState('User');
  const [userList, setUserList] = useState<Array<UserItem>>([]);
  const [regimeList, setRegimeList] = useState<Array<RegimeItem>>([]);
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [compartment, setCompartment] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = useState('');
  const [timeOffset, setTimeOffset] = useState('');
  const [instructions, setInstructions] = useState('');
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

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
    setUser(user);

    // Load regimes for the selected user
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const respSelect = await db?.query(
        `SELECT * FROM regimes WHERE user = ?`, 
        [user]
      );
      setRegimeList(respSelect?.values || []);
    });
  };

  const toggleDay = (day: string) => {
    setDays(prevDays =>
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const handleSubmit = () => {
    setConfirmationPopup(false);
    setSuccessMessage(true);

    // Save the regime to the database
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      await db?.query(`INSERT INTO regimes (id, user, medication_name, dosage, compartment, days, time_of_day, time_offset, instructions) values (?,?,?,?,?,?,?,?,?);`, [
        Date.now(),
        user,
        medicationName,
        dosage,
        compartment,
        days.join(", "),
        timeOfDay,
        timeOffset,
        instructions
      ]);
    });

    // Clear the form
    setMedicationName('');
    setDosage('');
    setCompartment('');
    setDays([]);
    setTimeOfDay('');
    setTimeOffset('');
    setInstructions('');
  };

  return (
    <IonPage>
      <LowerToolbar title='Regime Creation' />

      <IonContent className="add-regime-content">

        {successMessage ? (
          <div className="success-message">
            <h2>Regime created successfully!</h2>
          </div>
        ) : (
          <>
            <h2 className="title">Select a User</h2>
            <IonSelect className="custom-select" placeholder='Users' value={user} onIonChange={e => handleUserSelect(e.detail.value!)}>
              <IonSelectOption value="User" disabled>Select User</IonSelectOption>
              {userList.map(userItem => (
                <IonSelectOption key={userItem.id} value={userItem.name}>
                  {userItem.name}
                </IonSelectOption>
              ))}
            </IonSelect>

            {user !== "User" && (
              <>
                <h2 className="title">Current Regimes for {user}</h2>
                <ul className="regime-list">
                  {regimeList.map(regime => (
                    <li key={regime.id}>
                      {regime.medication_name} - {regime.dosage}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="title">What must {user} take?</h2>
            
            <div className="input-group">
              <IonInput className="input-box" placeholder="Medication Name" value={medicationName} onIonChange={e => setMedicationName(e.detail.value!)} />
              <IonInput className="input-box" placeholder="Dosage" value={dosage} onIonChange={e => setDosage(e.detail.value!)} />
            </div>

            <IonSelect className="input-box" placeholder="Compartment" value={compartment} onIonChange={e => setCompartment(e.detail.value!)}>
              <IonSelectOption value="Not In Compartment">Not In Compartment</IonSelectOption>
              <IonSelectOption value="Compartment A">Compartment A</IonSelectOption>
              <IonSelectOption value="Compartment B">Compartment B</IonSelectOption>
            </IonSelect>

            <h2 className="title">When should this be taken?</h2>
            
            <div className="days-selector">
              {[
                { label: 'Mon', value: 'Monday' },
                { label: 'Tue', value: 'Tuesday' },
                { label: 'Wed', value: 'Wednesday' },
                { label: 'Thu', value: 'Thursday' },
                { label: 'Fri', value: 'Friday' },
                { label: 'Sat', value: 'Saturday' },
                { label: 'Sun', value: 'Sunday' }
              ].map(day => (
                <div key={day.value} className="day-item">
                  <IonCheckbox checked={days.includes(day.value)} onIonChange={() => toggleDay(day.value)} />
                  <span>{day.label}</span>
                </div>
              ))}
            </div>

            <IonInput className="input-box" placeholder="Time Offset" value={timeOffset} onIonChange={e => setTimeOffset(e.detail.value!)} />

            <h2 className="title">Instructions</h2>
            <IonInput className="input-box" placeholder="Enter instructions" value={instructions} onIonChange={e => setInstructions(e.detail.value!)} />

            <IonButton className="submit-button" onClick={() => setConfirmationPopup(true)}>Submit</IonButton>

            {confirmationPopup && (
              <div className="confirmation-popup-overlay">
                <div className="confirmation-popup">
                  <h3>Are you sure you wish to create this regime?</h3>
                  <button className="no" onClick={() => setConfirmationPopup(false)}>No</button>
                  <button className="yes" onClick={handleSubmit}>Yes</button>
                </div>
              </div>
            )}
          </>
        )}

      </IonContent>
    </IonPage>
  );
};

export default AddPatientRegime;
