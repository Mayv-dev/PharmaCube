import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';
import { useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';

import {NativeAudio} from '@capacitor-community/native-audio'

// the royalty free sound used to demonstrate the notification comes from RasoolAsaad at: https://pixabay.com/users/rasoolasaad-47313572/
NativeAudio.preload({
  assetId: "notify",
  assetPath: "notify.mp3",
  audioChannelNum: 1,
  isUrl: false
});

// the royalty free sound used to demonstrate the FAR LOUDER notification comes from SamsterBirdies at: https://pixabay.com/sound-effects/alert-102266/
NativeAudio.preload({
  assetId: "alert",
  assetPath: "alert.mp3",
  audioChannelNum: 2,
  isUrl: false
});

const Tab4: React.FC = () => {

  const [newChatStatus, setNewChatStatus] = useState<boolean>(false)
  const [missingDoseStatus, setMissingDoseStatus] = useState<boolean>(false)

  const [mockNewChatStatus, setMockNewChatStatus] = useState<boolean>(false)
  const [mockMissingDoseStatus, setMockMissingDoseStatus] = useState<boolean>(false)

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='center'>
        <p>OneSignal Notifications</p>
          <div className='button-split'>
          {/* https://documentation.onesignal.com/reference/create-message */}
          <div>
          <IonButton disabled={true} color={"success"} onClick={e => {
            CapacitorHttp.post({
              url:"https://api.onesignal.com/notifications?c=push",
              headers: {
                "accept": "application/json",
                "Authorization":"Key "+import.meta.env.VITE_ONESIGNAL_API_KEY,
                "content-type": "application/json"
              },
              params:{
                "target_channel":"push",
                "included_segments":[
                  "Subscribed Users"
                ],
                "app_id":import.meta.env.VITE_ONESIGNAL_APP_ID,
                "contents":"test"
              }
            })
          }}>Send new chat notification</IonButton>
          {newChatStatus != false ? <p>Sent!</p>:<p>Unsent</p>}
          </div>
          <div>
          <IonButton disabled={true} color={"danger"} onClick={e => {
          }}>Send alert notification</IonButton>
          </div>
          </div>
          <br></br>
          <div>
          <p>Backup Sounds</p>
          <div className='button-split'>
            <div>
          <IonButton color={"success"} onClick={e => {
            NativeAudio.play({assetId: 'notify'});
          }}>Play new chat notification</IonButton>
          </div>
          <div>
          <IonButton color={"danger"} onClick={e => {
            NativeAudio.play({assetId: 'alert'});
          }}>Play alert notification</IonButton>
          </div>
          </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
