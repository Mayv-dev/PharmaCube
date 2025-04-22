import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  calendarOutline,
  medical,
  notificationsOutline,
  settingsOutline,
  homeOutline
} from 'ionicons/icons';
import { SplashScreen as CapacitorSplashScreen } from '@capacitor/splash-screen';

import SchedulePage from './pages/SchedulePage';
import ScheduleViewPage from './pages/Schedule Subpages/ScheduleViewPage';
import ScheduleAddModifyPage from './pages/Schedule Subpages/ScheduleAddModifyPage';
import NotificationPage from './pages/NotificationPage';
import MedicationsPage from './pages/MedicationsPage';
import SettingsPage from './pages/SettingsPage';
import MainPage from './pages/MainPage';
import CustomSplashScreen from './components/SplashScreen';

import { ColorblindProvider } from './colorBlindContext';
import { ThemeProvider } from './theme/ThemeContext';
import { SettingsProvider } from './composables/SettingsContext';

import './App.css';
import './loginAndRegister.css';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import './theme/mobile.css';

setupIonicReact();

// Hide native splash screen immediately
CapacitorSplashScreen.hide().catch(err => console.error('Error hiding splash screen:', err));

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <CustomSplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <ColorblindProvider>
      <ThemeProvider>
        <SettingsProvider>
          <IonApp>
            <IonReactRouter>
              <IonTabs>
                <IonRouterOutlet>
                  <Route exact path="/home">
                    <MainPage />
                  </Route>
                  <Route exact path="/schedule">
                    <SchedulePage />
                  </Route>
                  <Route exact path="/schedule/view">
                    <ScheduleViewPage />
                  </Route>
                  <Route exact path="/schedule/edit">
                    <ScheduleAddModifyPage />
                  </Route>
                  <Route exact path="/notifications">
                    <NotificationPage />
                  </Route>
                  <Route exact path="/medications">
                    <MedicationsPage />
                  </Route>
                  <Route exact path="/settings">
                    <SettingsPage />
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/home" />
                  </Route>
                  <Route>
                    <Redirect to="/home" />
                  </Route>
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                  <IonTabButton tab="main" href="/home">
                    <IonIcon icon={homeOutline} />
                    <IonLabel>Home</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="schedule" href="/schedule">
                    <IonIcon icon={calendarOutline} />
                    <IonLabel>Schedule</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="notifications" href="/notifications">
                    <IonIcon icon={notificationsOutline} />
                    <IonLabel>Notifications</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="medications" href="/medications">
                    <IonIcon icon={medical} />
                    <IonLabel>Medication</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="settings" href="/settings">
                    <IonIcon icon={settingsOutline} />
                    <IonLabel>Settings</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </IonReactRouter>
          </IonApp>
        </SettingsProvider>
      </ThemeProvider>
    </ColorblindProvider>
  );
};

export default App;