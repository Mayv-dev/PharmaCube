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
import { medkit, people, settings, triangle } from 'ionicons/icons';

import Regimes from './pages/Regimes';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import AddPatientRegime from './pages/Regimes Subpages/AddPatientRegime';
import ViewPatientRegimes from './pages/Regimes Subpages/ViewPatientRegimes';

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
import Medications from './pages/Medications';
import MedicationAddPage from './pages/Medications Subpages/MedicationAddPage';
import MedicationViewPage from './pages/Medications Subpages/MedicationViewPage';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/welcome">
            <Welcome />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/medications">
            <Medications />
          </Route>
          <Route exact path="/medicationAddPage">
            <MedicationAddPage />
          </Route>
          <Route exact path="/medicationViewPage">
            <MedicationViewPage />
          </Route>
          <Route exact path="/regimes">
            <Regimes />
          </Route>
          <Route exact path="/add-patient-regime">
            <AddPatientRegime />
          </Route>

          {/* New Route for ViewPatientRegimes */}
          <Route exact path="/view-patient-regimes">
            <ViewPatientRegimes />
          </Route>

          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/">
            <Redirect to="/welcome" />
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

export default App;
