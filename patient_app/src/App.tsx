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
import { ellipse, square, triangle } from 'ionicons/icons';
import SchedulePage from './pages/SchedulePage';
import ScheduleViewPage from './pages/Schedule Subpages/ScheduleViewPage';
import ScheduleAddModifyPage from './pages/Schedule Subpages/ScheduleAddModifyPage';

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

setupIonicReact();

enum formState {ADD, MODIFY}

const App: React.FC = () => (
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
          <Route path="/ScheduleAddModifyPage/Add">
            <ScheduleAddModifyPage enteredFormState={formState.ADD}/>
          </Route>
          <Route path="/ScheduleAddModifyPage/Modify">
            <ScheduleAddModifyPage enteredFormState={formState.MODIFY}/>
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
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Schedule</IonLabel>
          </IonTabButton>
          <IonTabButton tab="ScheduleViewPage" href="/ScheduleViewPage">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>View Schedule</IonLabel>
          </IonTabButton>
          <IonTabButton tab="ScheduleAddModifyPage/Add" href="/ScheduleAddModifyPage/Add">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Add To Schedule</IonLabel>
          </IonTabButton>
          <IonTabButton tab="ScheduleAddModifyPage/Modify" href="/ScheduleAddModifyPage/Modify">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Modify Schedule</IonLabel>
          </IonTabButton>
          <IonTabButton tab="NotificationsPage" href="/NotificationsPage">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Notifications</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
