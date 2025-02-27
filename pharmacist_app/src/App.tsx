import { useState } from 'react';
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
import { medkit, people, settings, triangle, chatbubbleOutline} from 'ionicons/icons'; // Icons for the tabs
import Regimes from './pages/Regimes'; // Medications Tab
import Users from './pages/Users'; // Users Tab
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

setupIonicReact();


const App: React.FC = () => {
    const [modifyRegimeInfo, setModifyRegimeInfo] = useState(null);
    const testRootMessage = (regime:any) => setModifyRegimeInfo(regime)

  return(<IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>

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

          
          <Route exact path="/notifications">
            <Notifications />
          </Route>

          <Route exact path="/menu">
            <Menu />
          </Route>

          <Route exact path="/chat">
            <Users />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/">
            <Redirect to="/regimes" />
          </Route>

        </IonRouterOutlet>

        <UpperToolbar/>
        <LowerToolbar/>
        {/* Tab Bar */}
        
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);
}

export default App;
