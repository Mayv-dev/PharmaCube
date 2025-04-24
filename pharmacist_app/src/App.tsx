import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Regimes from './pages/Regimes'; // Medications Tab
import Chat from './pages/Chat'; // Chat Tab
import Settings from './pages/Settings'; // Settings Tab


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AddRegime from './pages/Regimes Subpages/AddRegime';
import ViewRegime from './pages/Regimes Subpages/ViewRegime';
import LowerToolbar from './components/LowerToolbar';
import UpperToolbar, { Notification } from './components/UpperToolbar';
import Account from './pages/Account';
import PatientChat from './pages/Chat Subpage/PatientChat';
import Login from './pages/Authentication Pages/Login';
import Register from './pages/Authentication Pages/Register';
import History from './pages/History';

import "./styles/GlobalStyling.css"

import {ChatType}  from 'api types/types';

import OneSignal from 'onesignal-cordova-plugin';

setupIonicReact();
// firebase notification code taken from https://www.youtube.com/watch?v=IK8x7qc9ZsA
import {generateToken, messaging} from "./notifications/firebaseHidden.js"
import { onMessage} from 'firebase/messaging';
import axios from 'axios';

// Code snippets to help me implement audio were taken from a usage example in the following
// library page link: https://www.npmjs.com/package/@capacitor-community/native-audio
import {NativeAudio} from '@capacitor-community/native-audio'
import { Capacitor } from '@capacitor/core';
import React from 'react';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import AppPatientDetails from 'app types/AppPatientDetails';

// the royalty free sound used to demonstrate the notification comes from RasoolAsaad at: https://pixabay.com/users/rasoolasaad-47313572/
NativeAudio.preload({
  assetId: "notify",
  assetPath: "notify.mp3",
  audioChannelNum: 1,
  isUrl: false
});
const platform = Capacitor.getPlatform();

const App: React.FC = () => {
  // Retrieved from https://documentation.onesignal.com/docs/ionic-capacitor-cordova-sdk-setup
  const OneSignalInit = () => {
  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(6)
  
  OneSignal.initialize(import.meta.env.VITE_ONESIGNAL_APP_ID);
  console.log(import.meta.env.VITE_ONESIGNAL_APP_ID)

  OneSignal.Notifications.addEventListener('click', async (e) => {
    let clickData = await e.notification;
    console.log("Notification Clicked : " + clickData);
  })

  OneSignal.Notifications.requestPermission(true).then((success: Boolean) => {
    console.log("Notification permission granted " + success);
  })
  }

  // This if statement is necessary to stop mobile notification cod TypeErrors on the incompatible web version
  // This solution is adapted from previous attempts at getting sqlite working from https://www.youtube.com/watch?v=tixvx5nsJO8&t=1130s
  if (platform != "web") {OneSignalInit();}

	const [isNavBarTop, setIsNavBarTop] = useState(false)


	const [pollState, setPollState] = useState(true)
	const [getPatientChatStatus, setGetPatientChatStatus] = useState(true)
  const [notificationList, setNotificationList] = useState<Notification[]>([]);
    const [notifsBefore, setNotifsBefore] = useState<number>(notificationList.length)
    const [unreadNotifs, setUnreadNotifs] = useState<number>(0)

    const [patientChat, setPatientChat] = useState<ChatType[]>([{patient_id:1, pharmacist_id:1, messages:[],unread_message_count:0},{patient_id:2, pharmacist_id:1, messages:[],unread_message_count:0}]);
  const [patientList, setPatientList] = useState<AppPatientDetails[]>([])

  const [pharmacistId, setPharmacistId] = useState<number>(1);
  const [pharmacistDetails, setPharmacistDetails] = useState<any|null>(null);
  const [patientId, setPatientId] = useState<number>(0); 

  const [modifyRegimeInfo, setModifyRegimeInfo] = useState(null);
  const testRootMessage = (regime: any) => setModifyRegimeInfo(regime)

  const [isTTSOn, setIsTTSOn] = useState<boolean>(true);
  const speak = async (message:string) => {
    await TextToSpeech.speak({
      text: message,
      lang: 'en-US',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient',
      queueStrategy: 1
    });
    };

    const notify = (payloadBody:string) => {
      console.log(isTTSOn)
      if (isTTSOn){
       speak(payloadBody);
      }
      else {
        NativeAudio.play({assetId: 'notify'});
      }
    }

  useEffect(() => {
    generateToken()
    onMessage(messaging, (payload) => {
      console.log("notification: ", payload);
      let notification = {body:""}
      notification = typeof payload.notification?.body == "string" ? JSON.parse(payload.notification?.body):{body:""}
      if(payload.notification?.body != undefined){
        const updatedNotificationList = notificationList;
        updatedNotificationList.push({id:0,content:payload.notification?.body, urgency:1, timestamp: new Date(Date.now()).toISOString()});
        setNotificationList(updatedNotificationList.sort((a:Notification,b:Notification) => Date.parse(b.timestamp) - Date.parse(a.timestamp)));
        notify(notification["body"])
      }
    })
  },[isTTSOn,])

  const updatePatientChats = () => {
    let stuff:ChatType[] = []
    patientChat.map(async patient => {
      await getPatientChat(patient.patient_id).then(res => {
        let unread_messages = patient.unread_message_count;
        console.log(res.length > patient.messages.length)
        console.log(res.length)
        console.log(patient.messages.length)
        if(res.length > patient.messages.length) unread_messages += (res.length - patient.messages.length)
        console.log("testing"+window.location.href.endsWith("chat/patient") && patient.patient_id == patientId)
        window.location.href.endsWith("chat/patient") && patient.patient_id == patientId ? stuff.push({patient_id:patient.patient_id, pharmacist_id:patient.pharmacist_id, messages:res, unread_message_count:0}): stuff.push({patient_id:patient.patient_id, pharmacist_id:patient.pharmacist_id, messages:res, unread_message_count:unread_messages}) 
      })
    })
    setPatientChat(stuff)
  }
  
  const getPatientChat = async (passedPatient:number) => {
		try {
			const { data, status } = await axios.get(
			  `${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/chat/1/${passedPatient}`,
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

  useEffect(() => {
  //   if(pharmacistId != 0) fetchNotifications().then(res => res == "Network Error" || res == "Request failed with status code 404" ? console.log("Server connection has failed in App.tsx with the following error message: ", res):
  //   setNotificationList(res)
  // )
  
  setNotificationList(notificationList.sort((a:Notification,b:Notification) => Date.parse(b.timestamp) - Date.parse(a.timestamp)))
  setNotifsBefore(notificationList.length)
  if (notificationList.length > notifsBefore) {
    setUnreadNotifs(unreadNotifs+1)
    setNotifsBefore(notificationList.length)
  }
  // updatePatientChats()

  setTimeout(() => {			
      setPollState(!pollState);
    }, 3000);
  },[pollState])
  


  const fetchNotifications = async () => {
    try {
			const { data, status } = await axios.get(
			  `${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/pharmacist/${pharmacistId}/notifications`,
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

  const navBarChange = (value:boolean) =>  setIsNavBarTop(value)
  const ttsChange = (value:boolean) =>  setIsTTSOn(value)

  const resetUnreadNotifs = () => setUnreadNotifs(0)

  const changePatientId = (id:number) => {
    setPatientId(id)
  }

  const getLoginAccountDetails = (account:any) => {
    setPharmacistDetails(account)
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          {/* The necessity of an id for the menus to link to was pointed out by deanwilliammills in his answer to the following question
        https://stackoverflow.com/questions/53003274/ionic4-component-menu-must-have-a-content-element-to-listen-for-drag-events */}
          <IonRouterOutlet id="main-content">

            <Route exact path="/login">
              <Login loggedInAccount={getLoginAccountDetails}/>
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>

            <Route exact path="/regimes">
              <Regimes />
            </Route>
            <Route exact path="/regimes/create">
              <AddRegime patientId={patientId} changePatientId={changePatientId} passedInfo={null} />
            </Route>
            <Route exact path="/regimes/modify">
              <AddRegime patientId={patientId} changePatientId={changePatientId} passedInfo={modifyRegimeInfo} />
            </Route>

            <Route exact path="/regimes/view">
              <ViewRegime patientId={patientId} changePatientId={changePatientId} passModifyDataToApp={testRootMessage} />
            </Route>


            <Route exact path="/history">
              <History patientId={patientId} changePatientId={changePatientId} />
            </Route>

            <Route exact path="/chat">
              <Chat patientChat={patientChat} patientSelect={changePatientId}/>
            </Route>
            <Route exact path="/chat/patient">
              <PatientChat passedPatient={patientId} passedPatientChatStatus={getPatientChatStatus}/>
            </Route>

            <Route exact path="/account">
              <Account pharmacist_id={pharmacistId}/>
            </Route>

            <Route exact path="/settings">
              <Settings isNavBarTop={isNavBarTop} navBarChange={navBarChange} isTTSOn={isTTSOn} ttsChange={ttsChange}/>
            </Route>

            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet >

          <UpperToolbar pharmacistName={pharmacistDetails?.name} passedNotificationList={notificationList} unreadNotifs={unreadNotifs} resetUnreadNotifs={resetUnreadNotifs}/>
          <LowerToolbar chatList={patientChat} isNavBarTop={isNavBarTop}/>

        </IonTabs >
      </IonReactRouter >
    </IonApp >
  );
}

export default App;
