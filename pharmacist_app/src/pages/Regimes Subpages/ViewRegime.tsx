import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  IonPage,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonText,
  IonItem,
} from '@ionic/react';
import '../../styles/Regime Subpages/ViewRegime.css';
import { RegimeItem } from 'api types/types';
import RegimeItemContainer from '../../components/Regime Components/RegimeItemContainer';
import { arrowBack } from 'ionicons/icons';

type ContainerProps = {
	passModifyDataToApp:any
	passedPatientList:any
	patientId: number
	changePatientId: any
	passedPharmacistId:number
}

const ViewRegime: React.FC<ContainerProps> =  ({ passedPharmacistId, passModifyDataToApp, passedPatientList, patientId, changePatientId }) => {
	
	const [userRegimes, setUserRegimes] = useState<RegimeItem[]>()
	const [deleteRegimeId, setDeleteRegimeId] = useState<number>(-1);

	const [showModal, setShowModal] = useState(false);


  async function getPatientRegime() {
	try {
	  const { data, status } = await axios.get(
		`${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/pharmacist/${passedPharmacistId}/patient/${patientId}/regime`,
		{
		  headers: {
			Accept: 'application/json'
		  },
		},
	  );
  
	  return data;
  
	} 
	catch (e:any) {
		if(e.code == "ERR_NETWORK") alert("Unable to connect to the server. Are you connected to the internet?")
		if(e.code == "ERR_BAD_REQUEST") alert("This user was not found on the system. If you believe this is incorrect, contact a system administrator to validate user ID.")
	}
  }

  const modifyFromApp = (regime:any) =>{
	passModifyDataToApp(regime)
  }

  const confirmDeletion = (regimeId:number) => {
	setDeleteRegimeId(regimeId)
	setShowModal(true)
  }

  const deleteRegimeItem = async () => {
	console.log("deleting regime... ", deleteRegimeId)
	try {
		const { data, status } = await axios.delete(
		  `${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/pharmacist/${passedPharmacistId}/patient/${patientId}/regime/${deleteRegimeId}`,
		  {
			headers: {
			  Accept: 'application/json'
			}
		  }
		);
	
		getPatientRegime().then(setUserRegimes);
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

  useEffect(() => {
		patientId != 0 ? getPatientRegime().then(setUserRegimes) : null
	},[patientId])

  return (
    <IonPage>
			<IonContent className="ion-padding">
			<div className='webBody'>
				<div className='regimeReturn'>
                  <IonButton routerLink='/regimes/' routerDirection='root' color="light">
                    <IonIcon icon={arrowBack}></IonIcon>
                    <IonText>Back to Home Screen</IonText>
                  </IonButton>
              </div>
				<IonItem>

				<IonSelect value={patientId} interface="popover" label="Patient" placeholder='Choose a patient' onIonChange={e => changePatientId(e.target.value)}>
					{passedPatientList.map(patient => <IonSelectOption key={patient.id} value={patient.id}>{patient.name}</IonSelectOption>)}
				</IonSelect>
				</IonItem>
			{
				patientId == 0 || userRegimes == undefined ? null :
					<div className='doseViewGrid'>
						{/*declaring an object that is passed entirely to the component with ...regime was a solution recieved from the answer of CPHPython 
						at https://stackoverflow.com/questions/48240449/type-is-not-assignable-to-type-intrinsicattributes-intrinsicclassattribu*/}
						{userRegimes.map((regime,index) => <RegimeItemContainer key={index} regime={regime} deleteItem={confirmDeletion} modifyItem={modifyFromApp} />)}
					</div>
			}


			<IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Confirm Submission</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
		  <div className='webBody'>
            <p>Are you sure you wish to delete this dose?</p>
            <IonButton expand="full" color="primary" onClick={() => {
				deleteRegimeItem()
				setShowModal(false)}}>
              Yes
            </IonButton>
            <IonButton expand="full" color="medium" className="cancel-button" onClick={() => setShowModal(false)}>
              No
            </IonButton>
			</div>
          </IonContent>
        </IonModal>
		</div>
			</IonContent>
    </IonPage>
  );
};

export default ViewRegime;
