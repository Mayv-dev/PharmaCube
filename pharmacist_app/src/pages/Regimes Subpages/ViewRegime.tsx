import { useState } from 'react';
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
} from '@ionic/react';
import '../../styles/Regime Subpages/ViewRegime.css';
import LowerToolbar from '../../components/LowerToolbar';
import { RegimeItem } from 'api types/types';
import RegimeItemContainer from '../../components/Regime Components/RegimeItemContainer';

type ContainerProps = {
	passModifyDataToApp:any
}

const ViewRegime: React.FC<ContainerProps> =  ({passModifyDataToApp}) => {
	const [pharmacistId, setPharmacistId] = useState<number>(1);

	const [patientId, setPatientId] = useState<number>(1);
	const [patientName, setPatientName] = useState('Unselected');
	
	const [userRegimes, setUserRegimes] = useState<RegimeItem[]>()
	const [deleteRegimeId, setDeleteRegimeId] = useState<number>(-1);

	const [showModal, setShowModal] = useState(false);

  async function getMockData() {
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

  const handleUserSelect = (user:string) => {
    console.log("This should display the regimes assigned to: " + user);
    setPatientName(user);
    getMockData().then(setUserRegimes);
  }

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
	
		getMockData().then(setUserRegimes);
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
				<p>Select a user (currently hardcoded)</p>
				<IonSelect placeholder='Users' onIonChange={e => handleUserSelect(e.target.value)}>
					<IonSelectOption>Nina Muller</IonSelectOption>
					<IonSelectOption>Aaron Murphy</IonSelectOption>
					<IonSelectOption>Dillon McMahon</IonSelectOption>
				</IonSelect>
			{
				patientName == "Unselected" ? null :
				<>
					<ul>
						{/*declaring an object that is passed entirely to the component with ...regime was a solution recieved from the answer of CPHPython 
						at https://stackoverflow.com/questions/48240449/type-is-not-assignable-to-type-intrinsicattributes-intrinsicclassattribu*/}
						{userRegimes?.map(regime => <RegimeItemContainer regime={regime} deleteItem={confirmDeletion} modifyItem={modifyFromApp} />)}
					</ul>
				</>
			}


			<IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Confirm Submission</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>Are you sure you wish to delete this regime?</p>
            <IonButton expand="full" color="primary" onClick={() => {
				deleteRegimeItem()
				setShowModal(false)}}>
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

export default ViewRegime;
