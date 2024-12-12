// import React, { useState } from 'react';
// import {
//   IonPage,
//   IonContent,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonButton,
//   IonItem,
//   IonLabel,
//   IonInput,
//   IonIcon,
//   IonBadge,
//   IonTabBar,
//   IonTabButton,
//   IonModal,
//   IonCheckbox,
// } from '@ionic/react';
// import { menu, notifications, people, medkit, settings } from 'ionicons/icons';
// import './Tab1.css';

// const Tab1 = () => {
//   const [user, setUser] = useState('');
//   const [medication, setMedication] = useState('');
//   const [amount, setAmount] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);

//   const handleSubmit = () => {
//     if (!user || !medication || !amount) {
//       alert('Please fill in all fields before submitting.');
//       return;
//     }
//     setShowModal(true); // Show modal when the Submit button is clicked
//   };

//   const handleConfirm = () => {
//     if (!isChecked) {
//       alert('Please confirm the details by checking the box.');
//       return;
//     }
//     setShowModal(false);
//     alert('Details confirmed and submitted!');
//   };

//   return (
//     <IonPage>
//       {/* Main Content Header */}
//       <IonTabBar slot="top">
//         <IonTabButton tab="tab1" href="/tab1">
//           <IonIcon icon={medkit} />
//           <IonLabel>Medications</IonLabel>
//         </IonTabButton>
//         <IonTabButton tab="users" href="/users">
//           <IonIcon icon={people} />
//           <IonLabel>Users</IonLabel>
//         </IonTabButton>
//         <IonTabButton tab="settings" href="/settings">
//           <IonIcon icon={settings} />
//           <IonLabel>Settings</IonLabel>
//         </IonTabButton>
//       </IonTabBar>

//       {/* Content Area Header */}
//       <IonHeader>
//         <IonToolbar>
//           <IonIcon slot="start" icon={menu} style={{ fontSize: '24px', padding: '8px' }} />
//           <IonTitle style={{ textAlign: 'center' }}>Medications</IonTitle>
//           <IonIcon slot="end" icon={notifications} style={{ fontSize: '24px', padding: '8px' }}>
//             <IonBadge color="danger" style={{ fontSize: '12px', marginLeft: '-10px' }}>
//               3
//             </IonBadge>
//           </IonIcon>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="ion-padding">
//         {/* Input Fields */}
//         <IonItem>
//           <IonLabel position="stacked">User:</IonLabel>
//           <IonInput
//             placeholder="Enter user name"
//             value={user}
//             onIonChange={(e) => setUser(e.detail.value!)}
//           />
//         </IonItem>
//         <IonItem>
//           <IonLabel position="stacked">Medication:</IonLabel>
//           <IonInput
//             placeholder="Enter medication"
//             value={medication}
//             onIonChange={(e) => setMedication(e.detail.value!)}
//           />
//         </IonItem>
//         <IonItem>
//           <IonLabel position="stacked">Amount:</IonLabel>
//           <IonInput
//             type="number"
//             placeholder="Enter amount"
//             value={amount}
//             onIonChange={(e) => setAmount(e.detail.value!)}
//           />
//         </IonItem>

//         {/* Display Entered Data */}
//         <div
//           style={{
//             border: '1px solid #ccc',
//             marginTop: '20px',
//             padding: '10px',
//             borderRadius: '8px',
//             backgroundColor: '#f4f4f4',
//           }}
//         >
//           <h3>Entered Data:</h3>
//           <p><strong>User:</strong> {user || 'N/A'}</p>
//           <p><strong>Medication:</strong> {medication || 'N/A'}</p>
//           <p><strong>Amount:</strong> {amount || 'N/A'}</p>
//         </div>

//         {/* Submit Button */}
//         <IonButton
//           expand="full"
//           color="danger"
//           style={{ marginTop: '20px' }}
//           onClick={handleSubmit}
//         >
//           Submit
//         </IonButton>

//         {/* Modal with Table and Checkbox */}
//         <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
//           <IonHeader>
//             <IonToolbar>
//               <IonTitle>Confirm Submission</IonTitle>
//             </IonToolbar>
//           </IonHeader>
//           <IonContent className="ion-padding">
//             <table style={{ width: '100%', border: '1px solid #ccc', textAlign: 'left' }}>
//               <tbody>
//                 <tr>
//                   <th>User:</th>
//                   <td>{user}</td>
//                 </tr>
//                 <tr>
//                   <th>Medication:</th>
//                   <td>{medication}</td>
//                 </tr>
//                 <tr>
//                   <th>Amount:</th>
//                   <td>{amount}</td>
//                 </tr>
//               </tbody>
//             </table>
//             <div style={{ marginTop: '20px' }}>
//               <IonCheckbox
//                 checked={isChecked}
//                 onIonChange={(e) => setIsChecked(e.detail.checked)}
//               />
//               <label style={{ marginLeft: '8px' }}>I confirm the above details</label>
//             </div>
//             <IonButton expand="full" color="primary" onClick={handleConfirm}>
//               Confirm
//             </IonButton>
//             <IonButton
//               expand="full"
//               color="medium"
//               style={{ marginTop: '10px' }}
//               onClick={() => setShowModal(false)}
//             >
//               Cancel
//             </IonButton>
//           </IonContent>
//         </IonModal>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Tab1;

import React, { useState } from 'react';
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
  IonIcon,
  IonBadge,
  IonTabBar,
  IonTabButton,
  IonModal,
  IonCheckbox,
} from '@ionic/react';
import { menu, notifications, people, medkit, settings } from 'ionicons/icons';
import './Tab1.css';

const Tab1 = () => {
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

      <IonHeader>
        <IonToolbar>
          <IonIcon className="icon-menu" slot="start" icon={menu} />
          <IonTitle className="center-title">Medications</IonTitle>
          <IonIcon className="icon-notifications" slot="end" icon={notifications}>
            <IonBadge className="notification-badge">3</IonBadge>
          </IonIcon>
        </IonToolbar>
      </IonHeader>

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

export default Tab1;

