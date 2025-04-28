import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHintALLOption } from '@capacitor/barcode-scanner';
import { useEffect, useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';

const Tab2: React.FC = () => {
  const [qrReady, setQrReady] = useState<boolean>(false)
  const [url, setURL] = useState<string|undefined>(undefined)
  const [patientId,setPatientId] = useState<number>(4)

  useEffect(() => {
    if (qrReady) {
      // Help with understanding scanBarcode method came from https://capacitorjs.com/docs/apis/barcode-scanner#capacitorbarcodescannertypehint
      CapacitorBarcodeScanner.scanBarcode({hint:CapacitorBarcodeScannerTypeHintALLOption.ALL}).then(res => {
        CapacitorHttp.post({ url:`${res.ScanResult}`+`/add_patient/${patientId}`})
        setURL(res.ScanResult)
      })
    }
    setQrReady(false)
  },[qrReady])

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='center'>
          <IonItem>
            <IonInput label="Selected patient id" type='number' className="patientInput" value={patientId} onIonInput={e => setPatientId(e.target.value)}></IonInput>
          </IonItem>
          <p>Scanning the QR code will add patient {patientId} to pharmacist 1</p>
          <IonButton onClick={e => {
            setQrReady(true)
          }}>Begin Scan</IonButton>
          {url != undefined ? <p>Last URL: {url+`/add_patient/${patientId}`}</p>:<p>No scans yet</p>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
