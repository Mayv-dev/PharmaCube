import { IonContent, IonPage, IonSelect, IonSelectOption} from '@ionic/react';
import LowerToolbar from '../../components/LowerToolbar';
import '../../styles/Medication Subpages/MedicationViewPage.css';
import React, { useEffect,useState } from 'react';
import axios from 'axios';

async function getMockData() {
  try {
    const { data, status } = await axios.get(
      'http://demo3553220.mockable.io/',
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

const MedicationViewPage: React.FC = () => {
  const [user, setUser] = useState('Unselected');
  const [userMedications, setUserMedications] = useState<any[]>()
  
	
  const handleUserSelect = (user:string) => {
    console.log("This should display the medications assigned to: " + user);
    setUser(user);
    getMockData().then(setUserMedications);
  }


  return (
    <IonPage>
      
      <LowerToolbar title='View Medications'/>

      <IonContent>
        <p>Select a user</p>
        <IonSelect placeholder='Users' onIonChange={e => handleUserSelect(e.target.value)}>
          <IonSelectOption>TEST Duffy</IonSelectOption>
          <IonSelectOption>TEST Murphy</IonSelectOption>
          <IonSelectOption>TEST McMahon</IonSelectOption>
        </IonSelect>

        {user == "Unselected" ? null :
        <>
          <p>Medications</p>
          <ul>
          {userMedications?.map(medication => <li>{medication.name} - {medication["dose amount"]} - {medication.details}</li>)}
          </ul>
        </>
        }
      </IonContent>

    </IonPage>
  );
};

export default MedicationViewPage;
