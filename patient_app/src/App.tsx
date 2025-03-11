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
import { calendarOutline, medical, notificationsOutline } from 'ionicons/icons';
import SchedulePage from './pages/SchedulePage';
import ScheduleViewPage from './pages/Schedule Subpages/ScheduleViewPage';
import ScheduleAddModifyPage from './pages/Schedule Subpages/ScheduleAddModifyPage';
import NotificationPage from './pages/NotificationPage';
import MedicationPage from './pages/MedicationsPage'; // Make sure this matches your file name
import { ColorblindProvider } from './colorBlindContext';
import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <ColorblindProvider>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/SchedulePage">
              <SchedulePage />
            </Route>
            <Route exact path="/ScheduleViewPage">
              <ScheduleViewPage />
            </Route>
            <Route path="/ScheduleAddModifyPage">
              <ScheduleAddModifyPage />
            </Route>
            <Route path="/NotificationsPage">
              <NotificationPage />
            </Route>
            <Route path="/MedicationsPage">
              <MedicationPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/SchedulePage" />
            </Route>
          </IonRouterOutlet>
          
          <IonTabBar slot="bottom" className="custom-tab-bar">
            <IonTabButton tab="SchedulePage" href="/SchedulePage" className="custom-tab-button">
              <IonIcon aria-hidden="true" icon={calendarOutline} className="tab-icon" />
              <IonLabel className="tab-label">Schedule</IonLabel>
            </IonTabButton>
            <IonTabButton tab="NotificationsPage" href="/NotificationsPage" className="custom-tab-button">
              <IonIcon aria-hidden="true" icon={notificationsOutline} className="tab-icon" />
              <IonLabel className="tab-label">Notifications</IonLabel>
            </IonTabButton>
            <IonTabButton tab="MedicationsPage" href="/MedicationsPage" className="custom-tab-button">
              <IonIcon aria-hidden="true" icon={medical} className="tab-icon" />
              <IonLabel className="tab-label">Medication</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </ColorblindProvider>
  </IonApp>
);

export default App;
