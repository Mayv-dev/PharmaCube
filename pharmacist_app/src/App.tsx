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

import OneSignal from 'react-onesignal';
import * as OneSignalCordova from 'onesignal-cordova-plugin';


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

  const [pharmacistId, setPharmacistId] = useState<number>(0);
  const [pharmacistDetails, setPharmacistDetails] = useState<any|null>(null);

  const [unreadChatTracker, setUnreadChatTracker] = useState<any[]>([]);



  // Retrieved from https://documentation.onesignal.com/docs/ionic-capacitor-cordova-sdk-setup
  const OneSignalInit = () => {
    // Remove this method to stop OneSignal Debugging
    OneSignalCordova.default.Debug.setLogLevel(6)
    
    OneSignalCordova.default.initialize(import.meta.env.VITE_ONESIGNAL_APP_ID);
    console.log(import.meta.env.VITE_ONESIGNAL_APP_ID)

    OneSignalCordova.default.Notifications.addEventListener('click', async (e) => {
      let clickData = await e.notification;
      console.log("Notification Clicked : " + clickData);
    })

    OneSignalCordova.default.Notifications.requestPermission(true).then((success: Boolean) => {
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

  const [patientList, setPatientList] = useState<AppPatientDetails[]>([])


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

    const notifyFirebase = (payloadBody:string) => {
      if (isTTSOn){
		if(payloadBody == "chat") speak("A patient has sent you a message")
        else speak("You have recieved a notification");
      }
      else {
        NativeAudio.play({assetId: 'notify'});
      }
    }

  useEffect(() => {
    generateToken()
    onMessage(messaging, payload => {
      console.log("notification: ", payload);
      let notification = {route_to:""}
      notification = typeof payload.notification?.body == "string" ? JSON.parse(payload.notification?.body):{body:""}
      if(payload.notification?.body != undefined) {
        let updatedNotificationList = notificationList;
		let newNotif = payload.notification?.body
		console.log(newNotif)
		console.log("updatedNotificationList before: ", updatedNotificationList);
        updatedNotificationList.push(
			{
				patient_id:0,
				content:newNotif, 
				urgency:1, 
				timestamp: new Date(Date.now()).toISOString()
			});
		console.log("updatedNotificationList after: ", updatedNotificationList);
		setNotificationList(updatedNotificationList.sort((a:Notification,b:Notification) => Date.parse(b.timestamp) - Date.parse(a.timestamp)));
        notifyFirebase(notification["route_to"])
      }
    })
  },[isTTSOn])

  
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
  if (pharmacistId != 0) {
  	getLoginAccountDetails().then(res => {
    setPharmacistDetails(res)
    setPatientList(res.patients)
  })}
  else {
  	setPharmacistDetails(null)
	  setUnreadChatTracker([])
    setPatientId(0)
  }

  let includedPatientIds:number[] = []

  let incomingChatList:any[] = []
  pharmacistDetails?.chats.map(chat => {
    if (includedPatientIds.find(id => id == chat.patient_id) == undefined) {
      incomingChatList.push({ patient_id:chat.patient_id, last_message_time:chat.last_message_time, last_sender_is_patient:chat.last_sender_is_patient, unread_message_count:0 })
      includedPatientIds.push(chat.patient_id)
    }
  })
  
  let newUnreadChatTracker:any[] = []
  incomingChatList.map(incomingChat => {
    if (unreadChatTracker.find(unreadChatTrackerObject => unreadChatTrackerObject.patient_id == incomingChat.patient_id) == undefined) {
      console.log("not found in existing tracker")
      newUnreadChatTracker.push(incomingChat)
    }
    else {
      console.log("found in existing tracker")
      let previousValues = unreadChatTracker.find(unreadChatTrackerObject => unreadChatTrackerObject.patient_id == incomingChat.patient_id)
      console.log("previous values",previousValues)
      console.log("current values",incomingChat)
      let rolling_unread_message_count:number = 0;
      if(!incomingChat.last_sender_is_patient) rolling_unread_message_count = 0
      else {
        if(incomingChat.last_message_time == previousValues.last_message_time) rolling_unread_message_count = previousValues.unread_message_count
        else rolling_unread_message_count = previousValues.unread_message_count+1
      }
      newUnreadChatTracker.push({ 
        patient_id:incomingChat.patient_id, 
        last_message_time:incomingChat.last_message_time, 
        last_sender_is_patient:incomingChat.last_sender_is_patient, 
        unread_message_count: rolling_unread_message_count })
    }
  })
  setUnreadChatTracker(newUnreadChatTracker)
  
  setNotificationList(notificationList.sort((a:Notification,b:Notification) => Date.parse(b.timestamp) - Date.parse(a.timestamp)))
  setNotifsBefore(notificationList.length)
  if (notificationList.length > notifsBefore) {
    setUnreadNotifs(unreadNotifs+1)
    setNotifsBefore(notificationList.length)
  }

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

  const getLoginAccountDetails = async () => {
    try {
      const { data, status } = await axios.get(
      `${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/pharmacist/${pharmacistId}`,
      {
        headers: {
        Accept: 'application/json'
        },
      },
      );
    
      return data;
    
    } 
    catch (e:any) {
      if(e.code == "ERR_NETWORK") alert("Unable to connect to the server. Are you connected to the internet?")
      if(e.code == "ERR_BAD_REQUEST") alert("This user was not found on the system. If you believe this is incorrect, contact a system administrator to validate user ID.")
    }
  }


  useEffect(() => {
    console.log("onesignal init")
    // The starting code below was found at https://documentation.onesignal.com/docs/react-js-setup

    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined') {

      OneSignal.init({
        appId: `${import.meta.env.VITE_ONESIGNAL_APP_ID}`,
        // You can add other initialization options here
        notifyButton:{enable:true},
        // Uncomment the below line to run on localhost. See: https://documentation.onesignal.com/docs/local-testing
        allowLocalhostAsSecureOrigin: true
      });

      OneSignal.Notifications.addEventListener('click', async (e) => {
        let clickData = await e.notification;
        console.log("Notification Clicked : " + clickData);
      })

      // Correct event listener for processing notifications found at https://documentation.onesignal.com/docs/device-user-model-web-sdk-mapping
      OneSignal.Notifications.addEventListener("foregroundWillDisplay", e => {
        const n = e.notification
        console.log("body: ",n.title)
        console.log("additionalData: ",n.additionalData)
      })
      
      OneSignal.Notifications.requestPermission().then((success) => {
        console.log("Notification permission granted " + success);
      })

    }

  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          {/* The necessity of an id for the menus to link to was pointed out by deanwilliammills in his answer to the following question
        https://stackoverflow.com/questions/53003274/ionic4-component-menu-must-have-a-content-element-to-listen-for-drag-events */}
          <IonRouterOutlet id="main-content">

            <Route exact path="/login">
              <Login setPharmacistId={setPharmacistId} loggedInAccount={setPharmacistDetails}/>
            </Route>
            <Route exact path="/register">
              <Register setPharmacistId={setPharmacistId}/>
            </Route>

            <Route exact path="/regimes">
              <Regimes />
            </Route>
            <Route exact path="/regimes/create">
              <AddRegime passedPharmacistId={pharmacistId} patientId={patientId} passedPatientList={patientList} changePatientId={changePatientId} passedInfo={null} />
            </Route>
            <Route exact path="/regimes/modify">
              <AddRegime passedPharmacistId={pharmacistId} patientId={patientId} passedPatientList={patientList} changePatientId={changePatientId} passedInfo={modifyRegimeInfo} />
            </Route>

            <Route exact path="/regimes/view">
              <ViewRegime passedPharmacistId={pharmacistId} patientId={patientId} passedPatientList={patientList} changePatientId={changePatientId} passModifyDataToApp={testRootMessage} />
            </Route>


            <Route exact path="/history">
              <History passedPharmacistId={pharmacistId} passedPatientList={patientList} passedPatientId={patientId} changePatientId={changePatientId} />
            </Route>

            <Route exact path="/chat">
              <Chat unreadChats={unreadChatTracker} passedPatientList={patientList} patientSelect={changePatientId}/>
            </Route>
            <Route exact path="/chat/patient">
              <PatientChat passedPharmacistDetails={pharmacistDetails} passedPharmacistId={pharmacistId} passedPatientId={patientId} passedPatientChatStatus={getPatientChatStatus}/>
            </Route>

            <Route exact path="/account">
              <Account passedPatientList={patientList} pharmacist_id={pharmacistId}/>
            </Route>

            <Route exact path="/settings">
              <Settings isNavBarTop={isNavBarTop} navBarChange={navBarChange} isTTSOn={isTTSOn} ttsChange={ttsChange}/>
            </Route>

            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet >

          <UpperToolbar setPatientId={setPatientId} setPharmacistId={setPharmacistId} pharmacistName={pharmacistDetails?.name} passedNotificationList={notificationList} unreadNotifs={unreadNotifs} resetUnreadNotifs={resetUnreadNotifs}/>
          {pharmacistId != 0 ? <LowerToolbar isNavBarTop={isNavBarTop}/> : null}

        </IonTabs >
      </IonReactRouter >
    </IonApp >
  );
}

export default App;
