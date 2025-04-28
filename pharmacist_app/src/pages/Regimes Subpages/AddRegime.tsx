import { useState, useEffect } from 'react';
import axios from 'axios';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonItem, IonLabel, IonInput, IonModal, IonCheckbox, IonSelect, IonSelectOption, IonTextarea, IonDatetime, IonText, IonIcon, useIonRouter, IonImg, IonRange, IonPopover} from '@ionic/react';
import '../../styles/Regime Subpages/AddRegime.css';
import { RegimeItem } from 'api types/types';
import { arrowBack, informationCircleOutline } from 'ionicons/icons';
type AddRegimeProps = {
  passedInfo: any
  passedPatientList:any
  patientId: number
  changePatientId: any
  passedPharmacistId:number
}

const AddRegime: React.FC<AddRegimeProps> = ({ passedPharmacistId, passedInfo, passedPatientList, patientId, changePatientId }) => {
  const router = useIonRouter()

  const [addState, setAddState] = useState<number>(1);
  const [patientList, setPatientList] = useState<any[]>([]);

  const [isPatientIdValid, setIsPatientIdValid] = useState(true);
  const [patientName, setPatientName] = useState('');

  const [isInformationValid, setIsInformationValid] = useState(true);
  const [information, setInformation] = useState('');

  const [compartment, setCompartment] = useState<number>(0);
  const [compartmentImgSrc, setCompartmentImgSrc] = useState<string>("../../visual compartment/No Compartment.png");

  const [isDateInfoValid, setIsDateInfoValid] = useState(true);
  const [dateInfo, setDateInfo] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [isTimeOfDayValid, setIsTimeOfDayValid] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState<number>(0);
  const [isTimeOffsetValid, setIsTimeOffsetValid] = useState(true);
  const [timeOffset, setTimeOffset] = useState<number>(0);

  const [predefinedInstructions, setPredefinedInstructions] = useState([{instruction:"Take this dose orally (take through mouth).",status:false},{instruction:"Do not drink alcohol while on this dose.",status:false},{instruction:"This dose may make you feel tired or dizzy. If this happens, not drive or operate heavy machinery.",status:false}]);
  const [otherInstructions, setOtherInstructions] = useState('');

  const [areInstructionsValid, setAreInstructionsValid] = useState(true);
  const [instructions, setInstructions] = useState('');

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (passedInfo != null) {
      setPatientName("Aaron Murphy")
      setInformation(passedInfo.information)
      setCompartment(passedInfo.compartment_id)
      setDateInfo(new Date(passedInfo.year + "-" + passedInfo.month + "-" + passedInfo.date))
      setTimeOfDay(passedInfo.time_period)
      setTimeOffset(passedInfo.time_adjustment)
      setInstructions(passedInfo.instructions)
    }
    else {
      setPatientList(passedPatientList)
    }
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

  const handleSubmit = () => {
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
        const { data, status } = await axios.post(
          `${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/pharmacist/${passedPharmacistId}/patient/${patientId}/regime`,
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
        const { data, status } = await axios.put(
          `${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/pharmacist/${passedPharmacistId}/patient/${patientId}/regime/${passedInfo.id}`,
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
    catch (e:any) {
      if(e.code == "ERR_NETWORK") alert("Unable to connect to the server. Are you connected to the internet?")
      if(e.code == "ERR_BAD_REQUEST") alert("This user was not found on the system. If you believe this is incorrect, contact a system administrator to validate user ID.")
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

    sendToMockable(addedRegime).then(res => {
      if(res != undefined) {
        alert('Details confirmed and submitted!');
    
        setPatientName("")
        setInformation("")
        setCompartment(0)
        setDateInfo(currentDate)
        setTimeOfDay(0)
        setTimeOffset(0)
        setInstructions("")
        setOtherInstructions("")
        setPredefinedInstructions([{instruction:"Take this dose orally (take through mouth).",status:false},{instruction:"Do not drink alcohol while on this dose.",status:false},{instruction:"This dose may make you feel tired or dizzy. If this happens, not drive or operate heavy machinery.",status:false}]);
        setAddState(1)
        router.push("/regimes/view")
      }
      
    })

    
  };

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
        setOtherInstructions("")
        setPredefinedInstructions([{instruction:"Take this dose orally (take through mouth).",status:false},{instruction:"Do not drink alcohol while on this dose.",status:false},{instruction:"This dose may make you feel tired or dizzy. If this happens, not drive or operate heavy machinery.",status:false}]);
        setInstructions("")
        break;
      case 3:
        setDateInfo(currentDate)
        setTimeOfDay(0)
        setTimeOffset(0)
        break;
      case 2:
        changePatientId(0)
        setPatientName("")
        setInformation("")
        setCompartment(0)
        break;
      default:
        console.log("An unexpected error occured in the handleBackData() swtich statement")
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

  const helperPatientChoice = (hasPassed:boolean) => {
    setIsPatientIdValid(patientId != 0)
  }

  const helperToTake = (hasPassed:boolean) => {
    setIsInformationValid(information.length != 0)
  }

  const helperWhenTaken = (hasPassed:boolean) => {
    const currDate: Date = new Date();
    setIsDateInfoValid(currDate < dateInfo)
    setIsTimeOfDayValid(timeOfDay != 0)
    setIsTimeOffsetValid(timeOffset >= 0 && timeOffset <= 23)
  }

  const helperInstructions = (hasPassed:boolean) => {
    setAreInstructionsValid(false)
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className='webBody'>
          {addState == 1 ? 
              passedInfo == null ?
              <>
              <IonItem>

                  <IonSelect className={isPatientIdValid ? "" : "invalidInput"}value={patientId} label='Patient' interface="popover" placeholder='Please make a selection here' onIonChange={e => {
                    changePatientId(e.target.value)
                    setPatientName(patientList.find(patient => patient.id == e.target.value).name)
                    setIsPatientIdValid(true)
                  }}>
                    {patientList?.map((patient) => <IonSelectOption key={patient.id} value={patient.id}>{patient.name}</IonSelectOption>)}
                  </IonSelect>

                </IonItem>
                  <div className='regimeReturn'>
                      <IonButton routerLink='/regimes/' routerDirection='root' color="light">
                        <IonIcon icon={arrowBack}></IonIcon>
                        <IonText>Back to Home Screen</IonText>
                      </IonButton>
                  </div>
                  
          <IonButton expand="full" color={patientId != 0 ? "primary":'gray'} className="submit-button" onClick={e => 
            {
              if(patientId != 0)
              {
                setPatientName(patientList.find(patient => patient.id == patientId).name)
                handleForwardClick();
                helperPatientChoice(true);
              }
              else {
                helperPatientChoice(false);
              }
            }
          }>
            Next
          </IonButton>
                  </>
                :
                <div className='regimeReturn'>
                  <IonButton routerLink='/regimes/view' routerDirection='root' onClick={e => passedInfo = null} className='regimeReturn' color="light">
                    <IonIcon icon={arrowBack}></IonIcon>
                    <IonText>Back to Dose View</IonText>
                  </IonButton>
                </div>
                : null
    }

    {addState == 2 ?
      <>
          <p className="sectionHeading">What is {patientList.find(patient => patient.id == patientId).name} taking?</p>
          <div className='formGroup'>
            <IonItem>
              <IonTextarea className={isInformationValid ? "" : "invalidInput"} labelPlacement="fixed" label="Medications" value={information} counter={true} maxlength={500} onIonInput={e => {setInformation(e.target.value); setIsInformationValid(true)}}></IonTextarea>
              <IonIcon className='helpIcon' id="medication-info" icon={informationCircleOutline}></IonIcon>
              <IonPopover trigger="medication-info" triggerAction="click">
                <IonContent class="ion-padding">
                  <p>Fill in the medications of your dose here.</p>
                  <p>This is usually the medication names paired with their dosages, but you may fill it at your own discretion.</p>
                  </IonContent>
              </IonPopover>
            </IonItem>

            <IonImg className="visualBoxRepresenter" src={compartmentImgSrc}></IonImg>

            <IonItem>
              <IonRange label={"Compartment"} snaps={true} ticks={true} min={0} max={7} onIonInput={e => setCompartment(e.target.value)}></IonRange>
              <IonIcon className='helpIcon' id="compartment-info" icon={informationCircleOutline}></IonIcon>
              <IonPopover trigger="compartment-info" triggerAction="click">
                <IonContent class="ion-padding">
                  <p>Choose what part of the box you will fill the dose into here.</p>
                  <p>If the medication is too big for the box, you can choose not to use a compartment (No compartments should be highlighted yellow).</p>
                  <p>The physical box's compartments are labelled by number, and match the selected compartment numbers of this screen. The black compartment on screen refers to the default position with no compartment or number.</p>
                  </IonContent>
              </IonPopover>
            </IonItem>
            
          </div>
          <IonButton expand="full" color="primary" className="submit-button" onClick={e => handleBackClick()}>
            Back
          </IonButton>
          <IonButton expand="full" color={information != "" ? "primary":'gray'} className="submit-button" onClick={e => {
              if(information != "") {
                handleForwardClick()
              }
              else helperToTake(false)
            }
          }
          >
            Next
          </IonButton>
          </>
          :
          null}

{addState == 3 ?
    <>
          <p className="sectionHeading">When should {patientList.find(patient => patient.id == patientId).name} take it?</p>
          <div className='formGroup'>
            <IonItem>
              <IonLabel position="fixed">Date</IonLabel>
              <IonDatetime className={isDateInfoValid ? "" : "invalidInput"} onIonChange={e => {
                const dateData: Date = typeof e.target.value == "string" ? new Date(e.target.value) : new Date(-1);
                const currDate: Date = new Date();
                if (currDate > dateData) {
                  alert("please choose a date in the future")
                  setDateInfo(dateData)
                  setIsDateInfoValid(false)
                }
                else {
                  setDateInfo(dateData)
                  setIsDateInfoValid(true)
                }
              }} presentation="date"></IonDatetime>
              <IonIcon className='helpIcon' id="date-info" icon={informationCircleOutline}></IonIcon>
              <IonPopover trigger="date-info" triggerAction="click">
                <IonContent class="ion-padding">
                  <p>Select the date where the dose must be taken.</p>
                  <p>This must be a date in the future.</p>
                  </IonContent>
              </IonPopover>
            </IonItem>

            <IonItem>
              <IonSelect className={isTimeOfDayValid ? "" : "invalidInput"} label="Time of Day:" interface="popover" value={timeOfDay} onIonChange={e => {setTimeOfDay(e.target.value);setIsTimeOfDayValid(true)}}>
                <IonSelectOption value={1}>Morning</IonSelectOption>
                <IonSelectOption value={2}>Afternoon</IonSelectOption>
                <IonSelectOption value={3}>Evening</IonSelectOption>
                <IonSelectOption value={4}>Night</IonSelectOption>
              </IonSelect>
              <IonIcon className='helpIcon' id="time-of-day-info" icon={informationCircleOutline}></IonIcon>
              <IonPopover trigger="time-of-day-info" triggerAction="click">
                <IonContent class="ion-padding">
                  <p>Select which of the four parts of the day the dose should be taken at.</p>
                  <p>The patient should set when they are available for this dose on their schedule.</p>
                  </IonContent>
              </IonPopover>
            </IonItem>

            <IonItem>
              <IonInput className={isTimeOffsetValid ? "" : "invalidInput"} label='Hours before repeat:' min={0} max={23} onIonBlur={e => {if(e.target.value < 0 || timeOffset == "") setTimeOffset(0); else if (e.target.value > 23) setTimeOffset(23); else if(e.target.value % 1 != 0) setTimeOffset(e.target.value - (e.target.value % 1))}} type='number' value={timeOffset} onIonInput={e => setTimeOffset(e.target.value)}></IonInput>
              <IonIcon className='helpIcon' id="time-offset-info" icon={informationCircleOutline}></IonIcon>
              <IonPopover trigger="time-offset-info" triggerAction="click">
                <IonContent class="ion-padding">
                  <p>If the dose needs to be repeated a short time later, this sets how many hours after the original dose that the dose will be triggered again.</p>
                  <p>By default, this is set to 0, so that the dose will only happen once.</p>
                  </IonContent>
              </IonPopover>
            </IonItem>
          </div>
          <IonButton expand="full" color="primary" className="submit-button" onClick={e => handleBackClick()}>
            Back
          </IonButton>
          <IonButton expand="full" color={dateInfo > currentDate && timeOfDay != 0 ? "primary":'gray'} className="submit-button" onClick={e => { if(dateInfo > currentDate && timeOfDay != 0 && timeOffset >= 0 && timeOffset <= 23) {
            handleForwardClick()
          }
          else {helperWhenTaken(false)} }}>
            Next
          </IonButton>
          </>:null}


          {addState == 4 ? 
          <>
          <p className="sectionHeading">Please provide instructions that {patientList.find(patient => patient.id == patientId).name} must follow.</p>
          <div className='formGroup'>
            <div className='instructionGroup'>
              {predefinedInstructions.map((inst, index) => <IonItem><IonCheckbox value={inst.status} onIonChange={e => {
                let pastPredefined = predefinedInstructions
                pastPredefined[index].status = !pastPredefined[index].status
                setPredefinedInstructions(pastPredefined)
                changeInstructionList();
                setAreInstructionsValid(true)
                }}>{inst.instruction}</IonCheckbox></IonItem>)}
            </div>

            <div className='instructionSeparator'>
              <IonItem>
                <IonTextarea labelPlacement="fixed" label='Other Notes' counter={true} maxlength={500} value={otherInstructions} onInput={e => {
                  changeInstructionList(e.target.value);
                  setAreInstructionsValid(true)
                  }}></IonTextarea>
                    <IonIcon className='helpIcon' id="other-notes-info" icon={informationCircleOutline}></IonIcon>
                  <IonPopover trigger="other-notes-info" triggerAction="click">
                    <IonContent class="ion-padding">
                      <p>Fill in any instructions not listed above here.</p>
                      <p>You can separate instructions onto different lines.</p>
                      </IonContent>
                  </IonPopover>
              </IonItem>
            </div>

            <div className='instructionSeparator'>
              <IonItem>
                <IonTitle className={areInstructionsValid ? "" : "invalidInput"}>Complete Instructions:</IonTitle>
                <p className={areInstructionsValid ? "" : "invalidInput"}>{instructions}</p>
              </IonItem>
            </div>
          </div>
          <IonButton expand="full" color="primary" className="submit-button" onClick={e => handleBackClick()}>
            Back
          </IonButton>
          <IonButton expand="full" color={instructions != "" ? "primary":'gray'} className="submit-button" onClick={e => {
              if (instructions != "") {
                handleSubmit()
              }
              else {
                helperInstructions(false)
              }
            }
          }>
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
            <p className='regimeConfirm'>Are you sure you wish to create this dose?</p>
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
                <p><strong>Medications:</strong> </p><p>{information}</p>
              </div>
              <div className='alignRegimeReview'>
                <p><strong>Compartment:</strong> {compartment == 0 ? "None in use" : compartment}</p> 
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
