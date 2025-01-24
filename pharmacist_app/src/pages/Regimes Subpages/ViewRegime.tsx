import { useState } from 'react';
import {
  IonPage,
  IonContent,
} from '@ionic/react';
import '../../styles/Regime Subpages/ViewRegime.css';
import LowerToolbar from '../../components/LowerToolbar';

const ViewRegime = () => {
  const [user, setUser] = useState('');
  const [medication, setMedication] = useState('');
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <IonPage>
        <LowerToolbar title="Regimes"/>
			<IonContent className="ion-padding">
				<p>View Regime</p>
			</IonContent>
    </IonPage>
  );
};

export default ViewRegime;
