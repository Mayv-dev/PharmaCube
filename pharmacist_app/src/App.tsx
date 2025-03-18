import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
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
import UpperToolbar from './components/UpperToolbar';
import Account from './pages/Account';
import FAQs from './pages/FAQs';
import PatientChat from './pages/Chat Subpage/PatientChat';
import Login from './pages/Authentication Pages/Login';
import Register from './pages/Authentication Pages/Register';
import History from './pages/History';

import "./styles/GlobalStyling.css"
setupIonicReact();


const App: React.FC = () => {
  const [modifyRegimeInfo, setModifyRegimeInfo] = useState(null);
  const testRootMessage = (regime: any) => setModifyRegimeInfo(regime)

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
              <PatientChat />
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

          <UpperToolbar />
          <LowerToolbar />

        </IonTabs >
      </IonReactRouter >
    </IonApp >
  );
}

export default App;
