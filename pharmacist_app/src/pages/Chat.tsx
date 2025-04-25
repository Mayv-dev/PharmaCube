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
  passedPatientList:any
}

const Chat: React.FC<chatProps> = ({patientSelect, patientChat, passedPatientList}) => {

  return (
    <IonPage>

      <IonContent className="ion-padding">
        <div className='webBody'>
          <IonList>
            {passedPatientList.map(patient => (
              <IonItem routerLink="/chat/patient" onClick={e => patientSelect(patient.id)} routerDirection='root' key={patient.id}>
                <IonLabel >
                  {/* I use the picture from wikipedia as a stand-in for real pictures that would be stored on the server: https://commons.wikimedia.org/wiki/File:Portrait_Placeholder.png */}
                  <img width="10%" src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'></img>
                  <h2>{patient.name}</h2>
                </IonLabel>
                {/*patient.unread_message_count == 0 ? null:<span className={"notificationBadge"}>{patient.unread_message_count}</span>*/}
              </IonItem>
            ))}
          </IonList>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chat;



