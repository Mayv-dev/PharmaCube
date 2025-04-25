import React from 'react';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import '../styles/Users.css';

type chatProps = {
  patientSelect:any
  passedPatientList:any
  unreadChats:any[]
}

const Chat: React.FC<chatProps> = ({patientSelect, passedPatientList, unreadChats}) => {

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
                  {unreadChats.map(chat => {
                    return patient.id == chat.patient_id && chat.unread_message_count != 0 ? <span class={"notificationBadge"}>{chat.unread_message_count}</span>:null
                    })}
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



