import { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonModal,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import '../../styles/Regime Subpages/AddRegime.css';
import LowerToolbar from '../../components/LowerToolbar';
import React from 'react';

const AddRegime = () => {
  const [userId, setUserId] = useState<number>(123456);
  const [userName, setUserName] = useState('');

  const [medicationName, setMedicationName] = useState("");
  const [medicationDosage, setMedicationDosage] = useState("");
  const [medicationList, setMedicationList] = useState<any[]>([]);

  const [compartment, setCompartment] = useState<number>();

  const [day, setDay] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [timeOffset, setTimeOffset] = useState<number>();

  const [instructions, setInstructions] = useState('');

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    if (!userName || medicationList.length == 0 || !compartment || !day || !timeOfDay || !timeOffset || !instructions) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    alert('Details confirmed and submitted!');
  };

  return (
    <IonPage>

      <LowerToolbar title="Regimes"/>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Patient:</IonLabel>
          <IonSelect placeholder='Enter user name' onIonChange={e => setUserName(e.target.value)}>
            <IonSelectOption>TEST Duffy</IonSelectOption>
            <IonSelectOption>TEST Murphy</IonSelectOption>
            <IonSelectOption>TEST McMahon</IonSelectOption>
          </IonSelect>
        </IonItem>

        <p>What should {userName == "" ? "the patient" : userName} take?</p>
        <IonItem>
          <IonInput placeholder='Medication Name' value={medicationName} onIonChange={e => setMedicationName(e.target.value)}></IonInput>
          <IonInput placeholder='Medication Dosage' value={medicationDosage} onIonChange={e => setMedicationDosage(e.target.value)}></IonInput>
          <IonButton onClick={e => {
            if(medicationName == "" || medicationDosage == "") return
            let medlist = medicationList
            medlist.push(medicationName + " " + medicationDosage)
            console.log(medlist)
            setMedicationList(medlist)
            setMedicationName("")
            setMedicationDosage("")
            }
            }>Add to Medication List</IonButton>
          <div>
            {medicationList.map(medication => <p>{medication}</p>)}
          </div>
          {/* Create a component with two input boxes, a button, and a list to display medications passed as props*/}
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Compartment:</IonLabel>
          <IonSelect onIonChange={e => setCompartment(e.target.value)}>
            <IonSelectOption>Not in a compartment (MAKE ME THE DEFAULT)</IonSelectOption>
            <IonSelectOption>Compartment 1</IonSelectOption>
            <IonSelectOption>Compartment 2</IonSelectOption>
            <IonSelectOption>Compartment 3</IonSelectOption>
            <IonSelectOption>Compartment 4</IonSelectOption>
            <IonSelectOption>Compartment 5</IonSelectOption>
          </IonSelect>
        </IonItem>

        <p>When should {userName == "" ? "the patient" : userName} take it?</p>

        <IonItem>
          <IonLabel position="stacked">Day (this could be a multiple select):</IonLabel>
          <IonSelect onIonChange={e => setDay(e.target.value)}>
            <IonSelectOption>Monday</IonSelectOption>
            <IonSelectOption>Tuesday</IonSelectOption>
            <IonSelectOption>Wednesday</IonSelectOption>
            <IonSelectOption>Thursday</IonSelectOption>
            <IonSelectOption>Friday</IonSelectOption>
            <IonSelectOption>Saturday</IonSelectOption>
            <IonSelectOption>Sunday</IonSelectOption>
          </IonSelect>
        </IonItem>
        
        <IonItem>
          <IonLabel position="stacked">Time of Day:</IonLabel>
          <IonSelect onIonChange={e => setTimeOfDay(e.target.value)}>
            <IonSelectOption>Late Night</IonSelectOption>
            <IonSelectOption>Early Morning</IonSelectOption>
            <IonSelectOption>Morning</IonSelectOption>
            <IonSelectOption>Afternoon</IonSelectOption>
            <IonSelectOption>Evening</IonSelectOption>
            <IonSelectOption>Night</IonSelectOption>
          </IonSelect>
        </IonItem>
        
        <IonItem>
          <IonLabel position="stacked">Time Offset:</IonLabel>
          <IonInput type='number' onIonChange={e => setTimeOffset(e.target.value)}></IonInput>
        </IonItem>

        <p>Please provide any additional information that {userName == "" ? "the patient" : userName} should know below.</p>

        <IonItem>
          <IonLabel position="stacked">Information:</IonLabel>
          <IonInput onIonChange={e => setInstructions(e.target.value)}></IonInput>
        </IonItem>

        

        <IonButton expand="full" color="danger" className="submit-button" onClick={handleSubmit}>
          Submit
        </IonButton>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Confirm Submission</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>Are you sure you wish to create this regime?</p>
            <div className="data-display">
              <h3>Entered Data:</h3>
              <p><strong>User:</strong> {userName}</p>
              <p><strong>Medication:</strong> {medicationList.map(bla => bla + ", ")}</p>
              <p><strong>Compartment:</strong> {compartment}</p>
              <p><strong>Day:</strong> {day}</p>
              <p><strong>Time of Day:</strong> {timeOfDay}</p>
              <p><strong>Time Offset:</strong> {timeOffset}</p>
              <p><strong>Instructions:</strong> {instructions}</p>
            </div>
            <IonButton expand="full" color="primary" onClick={handleConfirm}>
              Yes
            </IonButton>
            <IonButton expand="full" color="medium" className="cancel-button" onClick={() => setShowModal(false)}>
              No
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default AddRegime;
