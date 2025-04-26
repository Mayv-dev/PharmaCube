import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { CapacitorHttp } from '@capacitor/core';
import { useEffect, useState } from 'react';



const Tab1: React.FC = () => {

  let path =`${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}`

  const [poll,setPoll] = useState<boolean>(false)

  const [pharmacist1Status,setPharmacist1Status] = useState<number|undefined>(undefined)
  const [pharmacist2Status,setPharmacist2Status] = useState<number|undefined>(undefined)

  const [patient1Status,setPatient1Status] = useState<number|undefined>(undefined)
  const [patient2Status,setPatient2Status] = useState<number|undefined>(undefined)
  const [patient3Status,setPatient3Status] = useState<number|undefined>(undefined)
  const [patient4Status,setPatient4Status] = useState<number|undefined>(undefined)

  const pollAccounts = async () => {
    try { await CapacitorHttp.get({ url:`${path}/pharmacist/1`}).then(res => { setPharmacist1Status(res.status) }) } catch (e) {setPharmacist1Status(0)}
    try { await CapacitorHttp.get({ url:`${path}/pharmacist/2`}).then(res => { setPharmacist2Status(res.status) }) } catch (e) {setPharmacist2Status(0)}

    try { await CapacitorHttp.get({ url:`${path}/patient/1`}).then(res => { setPatient1Status(res.status) }) } catch (e) {setPatient1Status(0)}
    try { await CapacitorHttp.get({ url:`${path}/patient/2`}).then(res => { setPatient2Status(res.status) }) } catch (e) {setPatient2Status(0)}
    try { await CapacitorHttp.get({ url:`${path}/patient/3`}).then(res => { setPatient3Status(res.status) }) } catch (e) {setPatient3Status(0)}
    try { await CapacitorHttp.get({ url:`${path}/patient/4`}).then(res => { setPatient4Status(res.status) }) } catch (e) {setPatient4Status(0)}
  }

  useEffect( () => {
    pollAccounts() 
    setTimeout(() => {
      setPoll(!poll)
    },5000)
  },[poll,])

  return (
    <IonPage>
      <IonContent>
        <IonList>
          <IonItem><IonLabel>Pharmacist 1 Status:</IonLabel>{pharmacist1Status == 200 ? <IonText color={"success"}>Good</IonText>:<IonText color={"danger"}>Bad</IonText>}</IonItem>
          <IonItem><IonLabel>Pharmacist 2 Status:</IonLabel>{pharmacist2Status == 200 ? <IonText color={"success"}>Good</IonText>:<IonText color={"danger"}>Bad</IonText>}</IonItem>
          <IonItem><IonLabel>Patient 1 Status:</IonLabel>{patient1Status == 200 ? <IonText color={"success"}>Good</IonText>:<IonText color={"danger"}>Bad</IonText>}</IonItem>
          <IonItem><IonLabel>Patient 2 Status:</IonLabel>{patient2Status == 200 ? <IonText color={"success"}>Good</IonText>:<IonText color={"danger"}>Bad</IonText>}</IonItem>
          <IonItem><IonLabel>Patient 3 Status:</IonLabel>{patient3Status == 200 ? <IonText color={"success"}>Good</IonText>:<IonText color={"danger"}>Bad</IonText>}</IonItem>
          <IonItem><IonLabel>Patient 4 Status:</IonLabel>{patient4Status == 200 ? <IonText color={"success"}>Good</IonText>:<IonText color={"danger"}>Bad</IonText>}</IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
