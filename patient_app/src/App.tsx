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
import { calendarOutline, ellipse, notificationsOutline, square, triangle } from 'ionicons/icons';
import SchedulePage from './pages/SchedulePage';
import ScheduleViewPage from './pages/Schedule Subpages/ScheduleViewPage';
import ScheduleAddModifyPage from './pages/Schedule Subpages/ScheduleAddModifyPage';
import './App.css';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import NotificationPage from './pages/NotificationPage';
import { ColorblindProvider } from './colorBlindContext'; // Import the ColorblindProvider

setupIonicReact();


const App: React.FC = () => (
  <IonApp>
    <ColorblindProvider> {/* Wrap the entire app with ColorblindProvider */}
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
            <Route exact path="/">
              <Redirect to="/SchedulePage" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="top" className="custom-tab-bar">
  <IonTabButton tab="SchedulePage" href="/SchedulePage" className="custom-tab-button">
    <IonIcon aria-hidden="true" icon={calendarOutline} className="tab-icon" />
    <IonLabel className="tab-label">Schedule</IonLabel>
  </IonTabButton>
  <IonTabButton tab="NotificationsPage" href="/NotificationsPage" className="custom-tab-button">
    <IonIcon aria-hidden="true" icon={notificationsOutline} className="tab-icon" />
    <IonLabel className="tab-label">Notifications</IonLabel>
  </IonTabButton>
</IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </ColorblindProvider>
  </IonApp>
);

export default App;
