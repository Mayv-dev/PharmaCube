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
  IonDatetime,
  IonRouterLink,
  IonText,
  IonIcon,
  IonRoute,
  useIonRouter,
  IonImg,
  IonRange,
  
} from '@ionic/react';
import '../../styles/Regime Subpages/AddRegime.css';
import LowerToolbar from '../../components/LowerToolbar';
import { RegimeItem } from 'api types/types';
import { date } from 'yup';
import { arrowBack } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
type AddRegimeProps = {
  passedInfo: any
}

const AddRegime: React.FC<AddRegimeProps> = ({ passedInfo }) => {
  const router = useIonRouter()

  const [addState, setAddState] = useState<number>(1);
  const [patientList, setPatientList] = useState<any[]>([]);
  const [pharmacistId, setPharmacistId] = useState<number>(1);

  
  const [patientId, setPatientId] = useState<number>(1);
  const [patientName, setPatientName] = useState('');

  const [information, setInformation] = useState('');

  const [compartment, setCompartment] = useState<number>(0);
  const [compartmentImgSrc, setCompartmentImgSrc] = useState<string>("../../visual compartment/No Compartment.png");

  const [dateInfo, setDateInfo] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [timeOfDay, setTimeOfDay] = useState<number>(0);
  const [timeOffset, setTimeOffset] = useState<number>(0);

  const [predefinedInstructions, setPredefinedInstructions] = useState([{instruction:"Take this dose orally (take through mouth).",status:false},{instruction:"Do not drink alcohol while on this dose.",status:false},{instruction:"This dose may make you feel tired or dizzy. If this happens, not drive or operate heavy machinery.",status:false}]);
  const [otherInstructions, setOtherInstructions] = useState('');
  const [instructions, setInstructions] = useState('');

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (passedInfo != null) {
      console.log(passedInfo)
      setPatientId(passedInfo.patient_id)
      setPatientName("Aaron Murphy")
      setInformation(passedInfo.information)
      setCompartment(passedInfo.compartment_id)
      setDateInfo(new Date(passedInfo.year + "-" + passedInfo.month + "-" + passedInfo.date))
      setTimeOfDay(passedInfo.time_period)
      setTimeOffset(passedInfo.time_adjustment)
      setInstructions(passedInfo.instructions)
    }
    else setPatientList(getMockPatientList())
  }, [passedInfo]);

  useEffect(() => {
    switch (compartment) {
      case 0:
        setCompartmentImgSrc('\\visual compartment\\No Compartment.png');
        break;
      case 1:
        setCompartmentImgSrc('\\visual compartment\\Compartment 1.png');
        break;
      case 2:
        setCompartmentImgSrc('\\visual compartment\\Compartment 2.png');
        break;
      case 3:
        setCompartmentImgSrc('\\visual compartment\\Compartment 3.png');
        break;
      case 4:
        setCompartmentImgSrc('\\visual compartment\\Compartment 4.png');
        break;
      case 5:
        setCompartmentImgSrc('\\visual compartment\\Compartment 5.png');
        break;
      case 6:
        setCompartmentImgSrc('\\visual compartment\\Compartment 6.png');
        break;
      case 7:
        setCompartmentImgSrc('\\visual compartment\\Compartment 7.png');
        break;
    }
  }, [compartment]);

  const getMockPatientList = () => {
      return [{
        "id":1,
        "name":"Ann Murphy",
        "patient_schedule_ids":[0,1,2,3],
        "scheduled_regime_ids":[0,1,2,3]
    }]
  };

  const handleSubmit = () => {
    console.log(timeOffset)
    if (!patientName || dateInfo.valueOf() == currentDate.valueOf() || !timeOfDay || timeOfDay == -1 || !information || !instructions) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    else if (timeOffset > 24 || timeOffset < -24) {
      alert('Time offset must be within a 24 hour period.');
      return;
    }
    setShowModal(true);
  };





  async function sendToMockable(addedRegime: RegimeItem) {
    try {
      if (passedInfo == null) {
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
      else {
        console.log("put request being made...")
        const { data, status } = await axios.put(
          `http://localhost:8080/pharmacist/${pharmacistId}/patient/${patientId}/regime/${passedInfo.id}`,
          addedRegime,
          {
            headers: {
              Accept: 'application/json'
            },
          },
        );
        return data;
      }
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

    // Solution to the timeoffset appearing as a string was retrieved from Ryan Cavanaugh's answer at:
    // https://stackoverflow.com/questions/14667713/how-to-convert-a-string-to-number-in-typescript
    let offset: number = +timeOffset

    let addedRegime: RegimeItem = {
      id: 0,
      compartment_id: compartment == undefined ? 0 : compartment,
      information: information,
      date: dateInfo.getDate(),
      month: dateInfo.getMonth() + 1,
      year: dateInfo.getFullYear(),
      time_period: timeOfDay,
      time_adjustment: offset,
      instructions: instructions
    }

    sendToMockable(addedRegime)

    alert('Details confirmed and submitted!');
    
    setPatientId(0)
    setPatientName("")
    setInformation("")
    setCompartment(0)
    setDateInfo(currentDate)
    setTimeOfDay(0)
    setTimeOffset(0)
    setInstructions("")
    setAddState(1)
    router.push("/regimes/view")
  };

  useEffect(() => {
    console.log(patientName, information, compartment, dateInfo, timeOfDay, timeOffset,instructions)
  }
  ,[patientName, information, compartment, dateInfo,timeOfDay,timeOffset,instructions])

  const handleBackClick = () => {
    handleBackData()
    setAddState(addState-1)
  }
  const handleForwardClick = () => {
    setAddState(addState+1)
  } 
  const handleBackData = () => {
    switch(addState) {
      case 4:
        setInstructions("")
        break;
      case 3:
        setDateInfo(currentDate)
        setTimeOfDay(0)
        setTimeOffset(0)
        break;
      case 2:
        setPatientId(0)
        setPatientName("")
        setInformation("")
        setCompartment(0)
        break;
      default:
        console.log("An unexpected error occurd in the handleBackData() swtich statement")
        break;
    }
  }

  const changeInstructionList = (passedOthers?:string) => {
    let newInstructions = ""
    predefinedInstructions.map(inst => inst.status == true ? newInstructions += inst.instruction + "\n":null)
    if(passedOthers != null) {
      setOtherInstructions(passedOthers)
      newInstructions += passedOthers
    }
    else {  
      newInstructions += otherInstructions
    }
    setInstructions(newInstructions)
  } 

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className='webBody'>
          {addState == 1 ? 
              passedInfo == null ?
              <>
              <IonItem>

                  <IonSelect label='Patient' interface="popover" placeholder='Choose a patient' onIonChange={e => {
                    setPatientId(e.target.value.id)
                    setPatientName(e.target.value.name)
                  }}>
                    {patientList.map(patient => <IonSelectOption value={patient}>{patient.name}</IonSelectOption>)}
                  </IonSelect>

                </IonItem>
                  <div className='regimeReturn'>
                      <IonButton routerLink='/regimes/' routerDirection='root' color="light">
                        <IonIcon icon={arrowBack}></IonIcon>
                        <IonText>Back to Regime Home</IonText>
                      </IonButton>
                  </div>
                  
          <IonButton expand="full" color={patientName != "" ? "primary":'gray'} className="submit-button" onClick={e => patientName != "" ? handleForwardClick():null}>
            Next
          </IonButton>
                  </>
                :
                <div className='regimeReturn'>
                  <IonButton routerLink='/regimes/view' routerDirection='root' onClick={e => passedInfo = null} className='regimeReturn' color="light">
                    <IonIcon icon={arrowBack}></IonIcon>
                    <IonText>Back to Regime View</IonText>
                  </IonButton>
                </div>
                : null
    }

    {addState == 2 ?
      <>
          <p className="sectionHeading">What is {patientName == "" ? "the patient" : patientName} taking?</p>
          <div className='formGroup'>
            <IonItem>
              <IonTextarea labelPlacement="fixed" label="Information:" value={information} onIonInput={e => setInformation(e.target.value)}></IonTextarea>
            </IonItem>
            <IonImg className="visualBoxRepresenter" src={compartmentImgSrc}></IonImg>
            <IonItem>
              <IonRange label={"Compartment"} snaps={true} ticks={true} min={0} max={7} onIonInput={e => setCompartment(e.target.value)}></IonRange>
            </IonItem>
          </div>
          <IonButton expand="full" color="primary" className="submit-button" onClick={e => handleBackClick()}>
            Back
          </IonButton>
          <IonButton expand="full" color={information != "" ? "primary":'gray'} className="submit-button" onClick={e => information != "" ?  handleForwardClick():null}>
            Next
          </IonButton>
          </>
          :
          null}

{addState == 3 ?
    <>
          <p className="sectionHeading">When should {patientName == "" ? "the patient" : patientName} take it?</p>
          <div className='formGroup'>
            <IonItem>
              <IonLabel position="fixed">Date:</IonLabel>
              <IonDatetime onIonChange={e => {
                const dateData: Date = typeof e.target.value == "string" ? new Date(e.target.value) : new Date(-1);
                const currDate: Date = new Date();
                if (currDate > dateData) {
                  alert("please choose a date in the future")
                  setDateInfo(dateData)
                }
                else {
                  setDateInfo(dateData)
                }
              }} presentation="date"></IonDatetime>
            </IonItem>

            <IonItem>
              <IonSelect label="Time of Day:" interface="popover" value={timeOfDay} onIonChange={e => setTimeOfDay(e.target.value)}>
                <IonSelectOption value={1}>Morning</IonSelectOption>
                <IonSelectOption value={2}>Afternoon</IonSelectOption>
                <IonSelectOption value={3}>Evening</IonSelectOption>
                <IonSelectOption value={4}>Night</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonInput label='Hours before repeat:' type='number' value={timeOffset} onIonInput={e => setTimeOffset(e.target.value)}></IonInput>
            </IonItem>
          </div>
          <IonButton expand="full" color="primary" className="submit-button" onClick={e => handleBackClick()}>
            Back
          </IonButton>
          <IonButton expand="full" color={dateInfo > currentDate && timeOfDay != 0 ? "primary":'gray'} className="submit-button" onClick={e => dateInfo > currentDate && timeOfDay != 0 ? handleForwardClick():null}>
            Next
          </IonButton>
          </>:null}


          {addState == 4 ? 
          <>
          <p className="sectionHeading">Please provide instructions that {patientName == "" ? "the patient" : patientName} must follow.</p>
          <div className='formGroup'>
            <div className='instructionGroup'>
              {predefinedInstructions.map((inst, index) => <IonItem><IonCheckbox value={inst.status} onIonChange={e => {
                let pastPredefined = predefinedInstructions
                pastPredefined[index].status = !pastPredefined[index].status
                setPredefinedInstructions(pastPredefined)
                changeInstructionList();
                }}>{inst.instruction}</IonCheckbox></IonItem>)}
            </div>

            <IonItem>
              <IonTextarea labelPlacement="fixed" label='Other:' value={otherInstructions} onInput={e => {
                changeInstructionList(e.target.value);
                }}></IonTextarea>
            </IonItem>

            <p>{instructions}</p>
          </div>
          <IonButton expand="full" color="primary" className="submit-button" onClick={e => handleBackClick()}>
            Back
          </IonButton>
          <IonButton expand="full" color={instructions != "" ? "primary":'gray'} className="submit-button" onClick={e => instructions != "" ? handleSubmit() : null}>
            Submit
          </IonButton>
          </>:null}

          
        </div>
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Confirm Submission</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p className='regimeConfirm'>Are you sure you wish to create this regime?</p>
            <IonButton expand="full" color="success" onClick={handleConfirm}>
              Yes
            </IonButton>
            <IonButton expand="full" color="danger" className="cancel-button" onClick={() => setShowModal(false)}>
              No
            </IonButton>
            <div className="data-display">
              <div className='alignRegimeReview'>
                <p><strong>Patient:</strong> {patientName}</p>
              </div>
              <div className='alignRegimeReview'>
                <p><strong>Information:</strong> </p><p>{information}</p>
              </div>
              <div className='alignRegimeReview'>
                <p><strong>Compartment:</strong> {compartment == undefined ? "Medication not stored in compartment" : compartment}</p> 
              </div>
              <div className='alignRegimeReview'>
                <p><strong>Date:</strong> {dayConvert(dateInfo.getDay())}, {handleDate(dateInfo.getDate())} {monthConvert(dateInfo.getMonth() + 1)}</p>
              </div>
              <div className='alignRegimeReview'>
                <p><strong>Time of Day:</strong> {timeOfDayConvert(timeOfDay)}</p>
              </div>
              <div className='alignRegimeReview'>
                <p><strong>Hours before repeat:</strong> {timeOffset} hours</p>
              </div>
              <div className='alignRegimeReview'>
                <p><strong>Instructions:</strong></p>
                 <p>{instructions}</p>
              </div>
              </div >
          </IonContent >
        </IonModal >
      </IonContent >
    </IonPage >
  );
};

function dayConvert(day: number): string {
  let stringDay = "";

  switch (day) {
    case 1: {
      stringDay = "Monday";
      break;
    }
    case 2: {
      stringDay = "Tuesday";
      break;
    }
    case 3: {
      stringDay = "Wednesday";
      break;
    }
    case 4: {
      stringDay = "Thursday";
      break;
    }
    case 5: {
      stringDay = "Friday";
      break;
    }
    case 6: {
      stringDay = "Saturday";
      break;
    }
    case 7: {
      stringDay = "Sunday";
      break;
    }
  }

  return stringDay;
}

function monthConvert(month: number): string {
  let stringMonth = "";

  switch (month) {
    case 1: {
      stringMonth = "January";
      break;
    }
    case 2: {
      stringMonth = "February";
      break;
    }
    case 3: {
      stringMonth = "March";
      break;
    }
    case 4: {
      stringMonth = "April";
      break;
    }
    case 5: {
      stringMonth = "May";
      break;
    }
    case 6: {
      stringMonth = "June";
      break;
    }
    case 7: {
      stringMonth = "July";
      break;
    }
    case 8: {
      stringMonth = "August";
      break;
    }
    case 9: {
      stringMonth = "September";
      break;
    }
    case 10: {
      stringMonth = "October";
      break;
    }
    case 11: {
      stringMonth = "November";
      break;
    }
    case 12: {
      stringMonth = "December";
      break;
    }
  }

  return stringMonth;
}

function timeOfDayConvert(timeOfDay: number): string {
  let stringTimeOfDay = "";

  switch (timeOfDay) {
    case 1: {
      stringTimeOfDay = "Morning";
      break;
    }
    case 2: {
      stringTimeOfDay = "Afternoon";
      break;
    }
    case 3: {
      stringTimeOfDay = "Evening";
      break;
    }
    case 4: {
      stringTimeOfDay = "Night";
      break;
    }
  }

  return stringTimeOfDay;
}

function handleDate(date:number):string {
  let stringDay = "";

  if(date % 10 == 1 && date != 11) stringDay = date + "st"
  else if(date % 10 == 2 && date != 12) stringDay = date + "nd"
  else if(date % 10 == 3 && date != 13) stringDay = date + "rd"
  else stringDay = date + "th"

  return stringDay;
}

export default AddRegime;
