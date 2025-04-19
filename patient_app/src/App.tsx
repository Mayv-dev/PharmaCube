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
  IonContent,
  IonInput,
  IonButton,
  IonPage,
  setupIonicReact,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  calendarOutline,
  medical,
  notificationsOutline,
  settingsOutline,
  chatbubbleOutline,
  homeOutline
} from 'ionicons/icons';

import SchedulePage from './pages/SchedulePage';
import ScheduleViewPage from './pages/Schedule Subpages/ScheduleViewPage';
import ScheduleAddModifyPage from './pages/Schedule Subpages/ScheduleAddModifyPage';
import NotificationPage from './pages/NotificationPage';
import MedicationsPage from './pages/MedicationsPage';
import SettingsPage from './pages/SettingsPage';
import ChatPage from './pages/ChatPage';
import MainPage from './pages/MainPage';

import { ColorblindProvider } from './colorBlindContext';
import { SettingsProvider, useSettings } from './composables/SettingsContext';
import { getItem, setItem, removeItem, registerUser, verifyUser } from './utils/storage';

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

setupIonicReact();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { tabBarPosition } = useSettings();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getItem('token');
      if (token) {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await removeItem('token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <IonApp>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Login</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div className="login-container">
              <IonInput
                placeholder="Username"
                value={username}
                onIonChange={e => setUsername(e.detail.value!)}
                className="ion-margin-bottom"
              />
              <IonInput
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
                className="ion-margin-bottom"
              />
              <IonButton expand="block" onClick={async () => {
                const success = await verifyUser(username, password);
                if (success) {
                  setIsAuthenticated(true);
                }
              }}>
                Login
              </IonButton>
            </div>
          </IonContent>
        </IonPage>
      </IonApp>
    );
  }

  return (
    <ColorblindProvider>
      <SettingsProvider>
        <IonApp>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/main">
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
                <Route exact path="/chat">
                  <ChatPage />
                </Route>
                <Route exact path="/settings">
                  <SettingsPage />
                </Route>
                <Route exact path="/">
                  <Redirect to="/main" />
                </Route>
                <Route>
                  <Redirect to="/main" />
                </Route>
              </IonRouterOutlet>

              <IonTabBar slot="bottom" className="ion-tab-bar">
                <IonTabButton tab="main" href="/main">
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
                <IonTabButton tab="chat" href="/chat">
                  <IonIcon icon={chatbubbleOutline} />
                  <IonLabel>AI Chat</IonLabel>
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
    </ColorblindProvider>
  );
};

export default App;