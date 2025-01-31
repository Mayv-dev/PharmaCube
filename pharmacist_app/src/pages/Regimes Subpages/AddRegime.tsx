import { useState, useEffect } from 'react';
import axios from 'axios';
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
  IonTextarea,
} from '@ionic/react';
import '../../styles/Regime Subpages/AddRegime.css';
import LowerToolbar from '../../components/LowerToolbar';
import { RegimeItem } from 'api types/types';

const AddRegime = () => {
  const [patientList, setPatientList] = useState<any[]>([]);
  const [pharmacistId, setPharmacistId] = useState<number>(1);


  const [patientId, setPatientId] = useState<number>(1);
  const [patientName, setPatientName] = useState('');

  const [information, setInformation] = useState('');

  const [compartment, setCompartment] = useState<number>(0);

  const [day, setDay] = useState('');
  const [timeOfDay, setTimeOfDay] = useState<number>(-1);
  const [timeOffset, setTimeOffset] = useState<number>(0);

  const [instructions, setInstructions] = useState('');

  const [showModal, setShowModal] = useState(false);


  function dayConvert(day:string):number {
    let stringDay = -1;
  
    switch (day) {
      case "Monday": {
        stringDay = 0;
        break;
      }
      case "Tuesday": {
        stringDay = 1;
        break;
      }
      case "Wednesday": {
        stringDay = 2;
        break;
      }
      case "Thursday": {
        stringDay = 3;
        break;
      }
      case "Friday": {
        stringDay = 4;
        break;
      }
      case "Saturday": {
        stringDay = 5;
        break;
      }
      case "Sunday": {
        stringDay = 6;
        break;
      }
    }
  
    return stringDay;
  }

  useEffect(() => {
    getMockPatientList().then(setPatientList)
    },[]);

    const getMockPatientList = async () => {
      try {
        const { data, status } = await axios.get(
          `https://demo3553220.mockable.io/patients`,
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
    };

  const handleSubmit = () => {
    console.log(timeOffset)
    if (!patientName || !day || !timeOfDay || timeOfDay == -1 || !information || !instructions) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    else if (timeOffset > 24 || timeOffset < -24) {
      alert('Time offset must be within a 24 hour period.');
      return;
    }
    setShowModal(true);
  };





  async function sendToMockable(addedRegime:RegimeItem) {
    try {
      console.log("post request being made...")
      const { data, status } = await axios.post(
        `http://localhost:8080/pharmacist/${pharmacistId}/patient/${patientId}/regime`,
        addedRegime,
        {
          headers: {
            Accept: 'application/json'
          },
        },
      );
      return data;
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    let addedRegime:RegimeItem = {
      id: 0,
      compartment_id: compartment == undefined ? 0 : compartment,
      information: information,
      day:dayConvert(day),
      time_period:timeOfDay,
      time_adjustment:timeOffset, 
      instructions: instructions
    }

    sendToMockable(addedRegime)
    console.log("patientId: " , patientId)
    console.log("Patient Name:", patientName)
    console.log("Compartment: ", compartment == undefined ? 0 : compartment)
    console.log("Day: " , day)
    console.log("Time of Day: " , timeOfDay)
    console.log("Time Offset: " , timeOffset)
    console.log("Instructions: " , instructions)
    alert('Details confirmed and submitted!');
  };

  return (
    <IonPage>

      <LowerToolbar title="Regimes"/>

      <IonContent className="ion-padding">
        <div className='formBody'>
          <IonItem>
            <IonLabel position="fixed">Patient:</IonLabel>
            <IonSelect placeholder='Choose a patient' onIonChange={e => {
                setPatientId(e.target.value.id)
                setPatientName(e.target.value.name)
              }}> 
              {patientList.map(patient => <IonSelectOption value={patient}>{patient.name}</IonSelectOption>)}
            </IonSelect>
          </IonItem>

          <p className="sectionHeading">What is {patientName == "" ? "the patient" : patientName} taking?</p>
          <div className='formGroup'>
          <IonItem>
            <IonLabel position="fixed">Information:</IonLabel>
            <IonTextarea onIonChange={e => setInformation(e.target.value)}></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">Compartment: </IonLabel>
            <IonSelect value={compartment} onIonChange={e => setCompartment(e.target.value)}>
              <IonSelectOption value={0}>Not in a compartment</IonSelectOption>
              <IonSelectOption value={1}>Compartment 1</IonSelectOption>
              <IonSelectOption value={2}>Compartment 2</IonSelectOption>
              <IonSelectOption value={3}>Compartment 3</IonSelectOption>
              <IonSelectOption value={4}>Compartment 4</IonSelectOption>
              <IonSelectOption value={5}>Compartment 5</IonSelectOption>
            </IonSelect>
          </IonItem>
          </div>

          <p className="sectionHeading">When should {patientName == "" ? "the patient" : patientName} take it?</p>
          <div className='formGroup'>
          <IonItem>
            <IonLabel position="fixed">Day:</IonLabel>
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
            <IonLabel position="fixed">Time of Day:</IonLabel>
            <IonSelect onIonChange={e => setTimeOfDay(e.target.value)}>
              <IonSelectOption value={0}>Late Night</IonSelectOption>
              <IonSelectOption value={1}>Early Morning</IonSelectOption>
              <IonSelectOption value={2}>Morning</IonSelectOption>
              <IonSelectOption value={3}>Afternoon</IonSelectOption>
              <IonSelectOption value={4}>Evening</IonSelectOption>
              <IonSelectOption value={5}>Night</IonSelectOption>
            </IonSelect>
          </IonItem>
          
          <IonItem>
            <IonLabel position="fixed">Time Offset:</IonLabel>
            <IonInput type='number' value={timeOffset}  onIonChange={e => setTimeOffset(e.target.value)}></IonInput>
          </IonItem>
</div>
          <p className="sectionHeading">Please provide instructions that {patientName == "" ? "the patient" : patientName} must follow.</p>
          <div className='formGroup'>

          <IonItem>
            <IonLabel position="fixed">Instructions:</IonLabel>
            <IonTextarea onIonChange={e => setInstructions(e.target.value)}></IonTextarea>
          </IonItem>
</div>
          

          <IonButton expand="full" color="danger" className="submit-button" onClick={handleSubmit}>
            Submit
          </IonButton>
        </div>
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
              <p><strong>Patient:</strong> {patientName}</p>
              <p><strong>Information:</strong> {information}</p>
              <p><strong>Compartment:</strong> {compartment == undefined ? "Medication not stored in compartment" : compartment}</p>
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
