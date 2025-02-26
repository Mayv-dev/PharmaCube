import { useState, useEffect } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
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
import { medkit, people, settings, triangle } from 'ionicons/icons';
import Regimes from './pages/Regimes';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Medications from './pages/Medications';
import MedicationAddPage from './pages/Medications Subpages/MedicationAddPage';
import MedicationViewPage from './pages/Medications Subpages/MedicationViewPage';
import AddRegime from './pages/Regimes Subpages/AddRegime';
import ViewRegime from './pages/Regimes Subpages/ViewRegime';

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

/** Push Notification Imports */
import { PushNotifications } from '@capacitor/push-notifications';

setupIonicReact();

const App: React.FC = () => {
  const [modifyRegimeInfo, setModifyRegimeInfo] = useState(null);
  const testRootMessage = (regime:any) => setModifyRegimeInfo(regime);

  /** Initialize Push Notifications */
  useEffect(() => {
    console.log('Initializing Push Notifications');

    // Request permission to use push notifications
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        console.log('Push Notification permission not granted');
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', token => {
      console.log('Push registration success, token: ' + token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', error => {
      console.error('Push registration error: ', error);
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push received: ', notification);
      alert(`Push Notification Received: ${notification.title} - ${notification.body}`);
    });

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push action performed: ', notification);
      alert('Notification clicked: ' + notification.notification.title);
    });

  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/medications">
              <Medications />
            </Route>
            <Route exact path="/medications/add">
              <MedicationAddPage />
            </Route>
            <Route exact path="/medications/view">
              <MedicationViewPage />
            </Route>

            <Route exact path="/regimes">
              <Regimes />
            </Route>
            <Route exact path="/regimes/create">
              <AddRegime passedInfo={null}/>
            </Route>
            <Route exact path="/regimes/modify">
              <AddRegime passedInfo={modifyRegimeInfo}/>
            </Route>

            <Route exact path="/regimes/view">
              <ViewRegime passModifyDataToApp={testRootMessage}/>
            </Route>

            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path="/settings">
              <Settings />
            </Route>
            <Route exact path="/">
              <Redirect to="/regimes" />
            </Route>
          </IonRouterOutlet>

          {/* Tab Bar */}
          <IonTabBar slot="top">
            <IonTabButton tab="medications" href="/medications">
              <IonIcon icon={triangle} />
              <IonLabel>Medications</IonLabel>
            </IonTabButton>
            <IonTabButton tab="regimes" href="/regimes">
              <IonIcon icon={medkit} />
              <IonLabel>Regimes</IonLabel>
            </IonTabButton>
            <IonTabButton tab="users" href="/users">
              <IonIcon icon={people} />
              <IonLabel>Users</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={settings} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
