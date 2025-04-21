import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonLoading,
  IonSearchbar,
} from '@ionic/react';
import '../styles/Users.css';
import { ChatType } from 'api types/types';
import axios from 'axios';

type chatProps = {
  patientSelect:any
  patientChat:ChatType[]
}

const Chat: React.FC<chatProps> = ({patientSelect, patientChat}) => {
  const [patientList, setPatientList] = useState<ChatType[]>([])
  const [patientNameList, setPatientNameList] = useState<{id:number,name:string}[]>([])


  useEffect(() => {
    console.log(patientChat)
    if(patientList.length > patientChat.length) console.log("Bad call protected");
    else setPatientList(patientChat.sort((a,b) => a.patient_id - b.patient_id))
  }, [patientChat]);

  useEffect(() => {
    let newPatientNameList:any = []
    if(patientNameList.length == 0) {
      patientList.map(async patient => {
        await getMockData(patient.patient_id).then(res => newPatientNameList.push({id:patient.patient_id, name:res.name}))
      })
      console.log(newPatientNameList)
      setPatientNameList(newPatientNameList)
    }
  }, [patientList]);

  async function getMockData(patientId:number) {
    try {
      const { data, status } = await axios.get(
      `http://localhost:8080/patient/${patientId}`,
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

  return (
    <IonPage>

      <IonContent className="ion-padding">
        <div className='webBody'>
          <IonList>
            {patientList.map(chat => (
              <IonItem routerLink="/chat/patient" onClick={e => patientSelect(chat.patient_id)} routerDirection='root' key={chat.patient_id}>
                <IonLabel >
                  <img width="10%" src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'></img>
                  <h2>{patientNameList?.find(list => list.id == chat.patient_id)?.name}</h2>
                </IonLabel>
                {chat.unread_message_count == 0 ? null:<span className={"notificationBadge"}>{chat.unread_message_count}</span>}
              </IonItem>
            ))}
          </IonList>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chat;



