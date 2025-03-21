import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
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
import Notifications from './pages/Notifications';
import Menu from './pages/Menu';
import LowerToolbar from './components/LowerToolbar';
import UpperToolbar, { Notification, openHamburgerMenu, openNotificationMenu } from './components/UpperToolbar';
import Account from './pages/Account';
import FAQs from './pages/FAQs';
import PatientChat from './pages/Chat Subpage/PatientChat';
import Login from './pages/Authentication Pages/Login';
import Register from './pages/Authentication Pages/Register';
import History from './pages/History';

import "./styles/GlobalStyling.css"
setupIonicReact();
// firebase notification code taken from https://www.youtube.com/watch?v=IK8x7qc9ZsA
import {generateToken, messaging} from "./notifications/firebaseHidden.js"
import { onMessage} from 'firebase/messaging';
import axios from 'axios';

// Code snippets to help me implement audio were taken from a usage example in the following
// library page link: https://www.npmjs.com/package/@capacitor-community/native-audio
import {NativeAudio} from '@capacitor-community/native-audio'

// the royalty free sound used to demonstrate the notification comes from RasoolAsaad at: https://pixabay.com/users/rasoolasaad-47313572/
NativeAudio.preload({
  assetId: "notify",
  assetPath: "notify.mp3",
  audioChannelNum: 1,
  isUrl: false
});

const App: React.FC = () => {
	const [pollState, setPollState] = useState(true)
	const [getPatientChatStatus, setGetPatientChatStatus] = useState(true)
  const [notificationList, setNotificationList] = useState<Notification[]>([{
			id: 1,
			content: "Take your Wednesday morning medication from compartment 2",
			timestamp: "2025-01-06T09:00:19+00:00",
			urgency: 1
		},
		{
			id: 1,
			content: "Urgent message from your patient Aaron Murphy",
			timestamp: "2025-01-06T06:00:19+00:00",
			urgency: 2
		},
		{
			id: 1,
			content: "Take your Wednesday Night medication from compartment 5",
			timestamp: "2025-01-06T23:00:19+00:00",
			urgency: 0
		}]);
  const [pharmacistId, setPharmacistId] = useState<number>(0); // TODO: Set to actual pharmacist when notification route is established and working


  const [modifyRegimeInfo, setModifyRegimeInfo] = useState(null);
  const testRootMessage = (regime: any) => setModifyRegimeInfo(regime)

  useEffect(() => {
    generateToken()
    onMessage(messaging, (payload) => {
      console.log("notification: ", payload);
      console.log(payload.notification?.body)
      if(payload.notification?.body != undefined){
        const updatedNotificationList = notificationList;
        updatedNotificationList.push({id:0,content:payload.notification.body, urgency:1, timestamp: new Date(Date.now()).toISOString()});
        setNotificationList(updatedNotificationList);
        NativeAudio.play({
          assetId: 'notify'
        });
      }
    })
  },[])

  useEffect(() => {
    if(window.location.href.endsWith("chat/patient")) setGetPatientChatStatus(!getPatientChatStatus)
    if(pharmacistId != 0) fetchNotifications().then(res => res == "Network Error" || res == "Request failed with status code 404" ? console.log("Server connection has failed in App.tsx with the following error message: ", res):setNotificationList(res))
    setTimeout(() => {			
      setPollState(!pollState);
    }, 5000);
  },[pollState])

  const fetchNotifications = async () => {
    try {
			const { data, status } = await axios.get(
			  `http://localhost:8080/pharmacist/${pharmacistId}/notifications`,
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
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          {/* The necessity of an id for the menus to link to was pointed out by deanwilliammills in his answer to the following question
        https://stackoverflow.com/questions/53003274/ionic4-component-menu-must-have-a-content-element-to-listen-for-drag-events */}
          <IonRouterOutlet id="main-content">

            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>

            <Route exact path="/regimes">
              <Regimes />
            </Route>
            <Route exact path="/regimes/create">
              <AddRegime passedInfo={null} />
            </Route>
            <Route exact path="/regimes/modify">
              <AddRegime passedInfo={modifyRegimeInfo} />
            </Route>

            <Route exact path="/regimes/view">
              <ViewRegime passModifyDataToApp={testRootMessage} />
            </Route>


            <Route exact path="/notifications">
              <Notifications />
            </Route>

            <Route exact path="/history">
              <History />
            </Route>

            <Route exact path="/menu">
              <Menu />
            </Route>

            <Route exact path="/chat">
              <Chat />
            </Route>
            <Route exact path="/chat/patient">
              <PatientChat passedPatientChatStatus={getPatientChatStatus}/>
            </Route>

            <Route exact path="/account">
              <Account />
            </Route>

            <Route exact path="/settings">
              <Settings />
            </Route>

            <Route exact path="/faqs">
              <FAQs />
            </Route>

            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet >

          <UpperToolbar passedNotificationList={notificationList} />
          <LowerToolbar />

        </IonTabs >
      </IonReactRouter >
    </IonApp >
  );
}

export default App;
