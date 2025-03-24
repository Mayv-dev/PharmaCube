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
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  calendarOutline,
  medical,
  notificationsOutline,
  settingsOutline,
  chatbubbleOutline
} from 'ionicons/icons';

import SchedulePage from './pages/SchedulePage';
import ScheduleViewPage from './pages/Schedule Subpages/ScheduleViewPage';
import ScheduleAddModifyPage from './pages/Schedule Subpages/ScheduleAddModifyPage';
import NotificationPage from './pages/NotificationPage';
import MedicationPage from './pages/MedicationsPage';
import SettingsPage from './pages/SettingsPage';
import ChatPage from './pages/ChatPage';

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

import CustomHeader from './components/CustomHeader';

setupIonicReact();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const { tabBarPosition } = useSettings();

  useEffect(() => {
    const checkUserSession = async () => {
      const storedUser = await getItem('user');
      setIsAuthenticated(storedUser ? true : false);
    };
    checkUserSession();
  }, []);

  const handleRegister = async () => {
    await registerUser(username, password);
    alert('Account registered successfully! You can now log in.');
    setIsRegistering(false);
  };

  const handleLogin = async () => {
    const isValid = await verifyUser(username, password);
    if (isValid) {
      await setItem('user', { username });
      setIsAuthenticated(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = async () => {
    await removeItem('user');
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return <IonApp>Loading...</IonApp>;
  }

  if (!isAuthenticated) {
    return (
      <IonApp>
        <IonContent className="login-container">
          <div className="login-form">
            <img
              src="src/Adobe Express - file.png"
              alt="Logo"
              className="login-image"
            />
            <h2 className="login-title">{isRegistering ? 'Register' : 'Login'}</h2>
            <IonInput
              className="login-input"
              placeholder="Username"
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
            />
            <IonInput
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
            {isRegistering ? (
              <>
                <IonButton className="login-button" onClick={handleRegister}>
                  Register
                </IonButton>
                <IonButton
                  className="toggle-button"
                  fill="clear"
                  onClick={() => setIsRegistering(false)}
                >
                  Back to Login
                </IonButton>
              </>
            ) : (
              <>
                <IonButton className="login-button" onClick={handleLogin}>
                  Login
                </IonButton>
                <IonButton
                  className="toggle-button"
                  fill="clear"
                  onClick={() => setIsRegistering(true)}
                >
                  Create an Account
                </IonButton>
              </>
            )}
          </div>
        </IonContent>
      </IonApp>
    );
  }

  return (
    <ColorblindProvider>
      <SettingsProvider>
        <IonApp>
          <IonReactRouter>
            <IonTabs>
              {tabBarPosition === 'bottom' && <CustomHeader />}

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
                <Route path="/SettingsPage">
                  <SettingsPage />
                </Route>
                <Route path="/ChatPage">
                  <ChatPage />
                </Route>
                <Route exact path="/">
                  <Redirect to="/SchedulePage" />
                </Route>
              </IonRouterOutlet>

              <IonTabBar slot={tabBarPosition}>
                <IonTabButton tab="SchedulePage" href="/SchedulePage">
                  <IonIcon icon={calendarOutline} />
                  <IonLabel>Schedule</IonLabel>
                </IonTabButton>
                <IonTabButton tab="NotificationsPage" href="/NotificationsPage">
                  <IonIcon icon={notificationsOutline} />
                  <IonLabel>Notifications</IonLabel>
                </IonTabButton>
                <IonTabButton tab="MedicationsPage" href="/MedicationsPage">
                  <IonIcon icon={medical} />
                  <IonLabel>Medication</IonLabel>
                </IonTabButton>
                <IonTabButton tab="ChatPage" href="/ChatPage">
                  <IonIcon icon={chatbubbleOutline} />
                  <IonLabel>AI Chat</IonLabel>
                </IonTabButton>
                <IonTabButton tab="SettingsPage" href="/SettingsPage">
                  <IonIcon icon={settingsOutline} />
                  <IonLabel>Settings</IonLabel>
                </IonTabButton>
              </IonTabBar>

              {tabBarPosition === 'top' && <CustomHeader />}
            </IonTabs>
          </IonReactRouter>

          <button
            onClick={handleLogout}
            style={{
              position: 'fixed',
              bottom: 80,
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '5px',
              backgroundColor: '#d9534f',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </IonApp>
      </SettingsProvider>
    </ColorblindProvider>
  );
};

export default App;
