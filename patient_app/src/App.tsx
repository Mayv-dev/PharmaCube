import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendarOutline, notificationsOutline } from 'ionicons/icons';
import SchedulePage from './pages/SchedulePage';
import ScheduleViewPage from './pages/Schedule Subpages/ScheduleViewPage';
import ScheduleAddModifyPage from './pages/Schedule Subpages/ScheduleAddModifyPage';
import NotificationPage from './pages/NotificationPage';
import { useEffect, useState } from 'react';
import { getItem, setItem, removeItem, registerUser, verifyUser } from './utils/storage';

/* Core CSS */
import '@ionic/react/css/core.css';
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

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  useEffect(() => {
    const checkUserSession = async () => {
      const storedUser = await getItem('user');
      if (storedUser) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh" }}>
          <h2>{isRegistering ? 'Register' : 'Login'}</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {isRegistering ? (
            <>
              <button onClick={handleRegister} style={{ marginTop: '10px', padding: '10px' }}>Register</button>
              <button onClick={() => setIsRegistering(false)} style={{ marginTop: '5px', padding: '10px' }}>Back to Login</button>
            </>
          ) : (
            <>
              <button onClick={handleLogin} style={{ marginTop: '10px', padding: '10px' }}>Login</button>
              <button onClick={() => setIsRegistering(true)} style={{ marginTop: '5px', padding: '10px' }}>Create an Account</button>
            </>
          )}
        </div>
      </IonApp>
    );
  }

  return (
    <IonApp>
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
          <IonTabBar slot="top">
            <IonTabButton tab="SchedulePage" href="/SchedulePage">
              <IonIcon icon={calendarOutline} />
              <IonLabel>Schedule</IonLabel>
            </IonTabButton>
            <IonTabButton tab="NotificationsPage" href="/NotificationsPage">
              <IonIcon icon={notificationsOutline} />
              <IonLabel>Notifications</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
      <button 
        onClick={handleLogout} 
        style={{ 
          position: 'fixed', 
          bottom: 20, 
          left: '50%', 
          transform: 'translateX(-50%)', 
          padding: '10px 20px', 
          fontSize: '16px', 
          borderRadius: '5px', 
          backgroundColor: '#d9534f', 
          color: 'white', 
          border: 'none', 
          cursor: 'pointer' 
        }}>
        Logout
      </button>
    </IonApp>
  );
};

export default App;
