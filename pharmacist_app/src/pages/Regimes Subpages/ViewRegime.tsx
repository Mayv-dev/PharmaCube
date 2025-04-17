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
	patientId: number
	changePatientId: any
}

const ViewRegime: React.FC<ContainerProps> =  ({ passModifyDataToApp, patientId, changePatientId }) => {
	const [pharmacistId, setPharmacistId] = useState<number>(1);

	const [patientList, setPatientList] = useState<any[]>([]);
	
	const [userRegimes, setUserRegimes] = useState<RegimeItem[]>()
	const [deleteRegimeId, setDeleteRegimeId] = useState<number>(-1);

	const [showModal, setShowModal] = useState(false);

const getMockPatientList = () => {
      return [{
        "id":1,
        "name":"Ann Murphy",
        "patient_schedule_ids":[0,1,2,3],
        "scheduled_regime_ids":[0,1,2,3]
    }]
  };

  async function getMockData(patientId:number) {
	try {
	  const { data, status } = await axios.get(
		`http://localhost:8080/pharmacist/${pharmacistId}/patient/${patientId}/regime`,
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

  const modifyFromApp = (regime:any) =>{
	passModifyDataToApp(regime)
  }

  const confirmDeletion = (regimeId:number) => {
	setDeleteRegimeId(regimeId)
	setShowModal(true)
  }

  const handleUserSelect = (id:number) => {
	changePatientId(id)
	getMockData(id).then(setUserRegimes);
  }

  useEffect(() => {
    setPatientList(getMockPatientList());
	if(patientId != 0) getMockData(patientId).then(setUserRegimes);
  }, [])

  const deleteRegimeItem = async () => {
	console.log("deleting regime... ", deleteRegimeId)
	try {
		const { data, status } = await axios.delete(
		  `http://localhost:8080/pharmacist/${pharmacistId}/patient/${patientId}/regime/${deleteRegimeId}`,
		  {
			headers: {
			  Accept: 'application/json'
			}
		  }
		);
	
		getMockData(patientId).then(setUserRegimes);
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

  return (
    <IonPage>
			<IonContent className="ion-padding">
			<div className='webBody'>
				<div className='regimeReturn'>
                  <IonButton routerLink='/regimes/' routerDirection='root' color="light">
                    <IonIcon icon={arrowBack}></IonIcon>
                    <IonText>Back to Regime Home</IonText>
                  </IonButton>
              </div>
				<IonItem>

				<IonSelect value={patientId} interface="popover" label="Patient" placeholder='Choose a patient' onIonChange={e => handleUserSelect(e.target.value)}>
					{patientList.map(patient => <IonSelectOption value={patient.id}>{patient.name}</IonSelectOption>)}
				</IonSelect>
				</IonItem>
			{
				patientId == 0 || userRegimes == undefined ? null :
					<div className='doseViewGrid'>
						{/*declaring an object that is passed entirely to the component with ...regime was a solution recieved from the answer of CPHPython 
						at https://stackoverflow.com/questions/48240449/type-is-not-assignable-to-type-intrinsicattributes-intrinsicclassattribu*/}
						{userRegimes.map(regime => <RegimeItemContainer regime={regime} deleteItem={confirmDeletion} modifyItem={modifyFromApp} />)}
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
            <p>Are you sure you wish to delete this regime?</p>
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
