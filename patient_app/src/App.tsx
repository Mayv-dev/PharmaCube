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
import { calendarOutline, medical, notificationsOutline, settingsOutline } from 'ionicons/icons'; // Added settingsOutline icon
import SchedulePage from './pages/SchedulePage';
import ScheduleViewPage from './pages/Schedule Subpages/ScheduleViewPage';
import ScheduleAddModifyPage from './pages/Schedule Subpages/ScheduleAddModifyPage';
import NotificationPage from './pages/NotificationPage';
import MedicationPage from './pages/MedicationsPage'; // Make sure this matches your file name
import SettingsPage from './pages/SettingsPage'; // Import the SettingsPage component
import { ColorblindProvider, useColorblindFilter } from './colorBlindContext'; // Import the hook
import { SettingsProvider, useSettings } from './composables/SettingsContext'; // Import SettingsProvider
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

const AppContent: React.FC = () => {
  const { filter } = useColorblindFilter(); // Get the current filter
  const { tabBarPosition } = useSettings(); // Get the current tab bar position

  return (
    <IonApp className={filter}> {/* Apply the colorblind filter globally */}
      <SettingsProvider> {/* Wrap the app with SettingsProvider */}
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
              <Route path="/SettingsPage"> {/* Add route for SettingsPage */}
                <SettingsPage />
              </Route>
              <Route exact path="/">
                <Redirect to="/SchedulePage" />
              </Route>
            </IonRouterOutlet>
            
            <IonTabBar slot={tabBarPosition} className="custom-tab-bar"> {/* Set tab bar position dynamically */}
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
              <IonTabButton tab="SettingsPage" href="/SettingsPage" className="custom-tab-button"> {/* Add Settings tab */}
                <IonIcon aria-hidden="true" icon={settingsOutline} className="tab-icon" />
                <IonLabel className="tab-label">Settings</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </SettingsProvider> 
    </IonApp>
  );
};

const App: React.FC = () => (
  <ColorblindProvider>
    <AppContent />
  </ColorblindProvider>
);

export default App;