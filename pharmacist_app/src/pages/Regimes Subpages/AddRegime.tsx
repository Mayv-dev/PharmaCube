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
} from '@ionic/react';
import '../../styles/Regime Subpages/AddRegime.css';
import LowerToolbar from '../../components/LowerToolbar';

const AddRegime = () => {
  const [user, setUser] = useState('');
  const [medication, setMedication] = useState('');
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = () => {
    if (!user || !medication || !amount) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (!isChecked) {
      alert('Please confirm the details by checking the box.');
      return;
    }
    setShowModal(false);
    alert('Details confirmed and submitted!');
  };

  return (
    <IonPage>

      <LowerToolbar title="Regimes"/>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">User:</IonLabel>
          <IonInput
            placeholder="Enter user name"
            value={user}
            onIonChange={(e) => setUser(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Medication:</IonLabel>
          <IonInput
            placeholder="Enter medication"
            value={medication}
            onIonChange={(e) => setMedication(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Amount:</IonLabel>
          <IonInput
            type="number"
            placeholder="Enter amount"
            value={amount}
            onIonChange={(e) => setAmount(e.detail.value!)}
          />
        </IonItem>

        <div className="data-display">
          <h3>Entered Data:</h3>
          <p><strong>User:</strong> {user || 'N/A'}</p>
          <p><strong>Medication:</strong> {medication || 'N/A'}</p>
          <p><strong>Amount:</strong> {amount || 'N/A'}</p>
        </div>

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
            <table className="confirmation-table">
              <tbody>
                <tr>
                  <th>User:</th>
                  <td>{user}</td>
                </tr>
                <tr>
                  <th>Medication:</th>
                  <td>{medication}</td>
                </tr>
                <tr>
                  <th>Amount:</th>
                  <td>{amount}</td>
                </tr>
              </tbody>
            </table>
            <div className="confirmation-checkbox">
              <IonCheckbox
                checked={isChecked}
                onIonChange={(e) => setIsChecked(e.detail.checked)}
              />
              <label>I confirm the above details</label>
            </div>
            <IonButton expand="full" color="primary" onClick={handleConfirm}>
              Confirm
            </IonButton>
            <IonButton expand="full" color="medium" className="cancel-button" onClick={() => setShowModal(false)}>
              Cancel
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default AddRegime;
