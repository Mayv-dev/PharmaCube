import React from 'react';
import { 
  IonContent, 
  IonPage,
  IonIcon,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCard
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { 
  calendar, 
  notifications, 
  flask, 
  settings,
  chevronForward
} from 'ionicons/icons';
import { useColorblindFilter } from '../colorBlindContext';
import './MainPage.css';
import calendarImage from '../Picture2.png';

const MainPage: React.FC = () => {
  const history = useHistory();
  const { daltonization } = useColorblindFilter();

  const getBadgeCount = (type: string) => {
    switch(type) {
      case 'schedule':
        return 0;
      case 'notifications':
        return 0;
      default:
        return 0;
    }
  };

  const menuItems = [
    { 
      title: 'Schedule', 
      icon: calendar, 
      path: '/schedule', 
      description: 'Manage your medication schedule',
      type: 'schedule'
    },
    { 
      title: 'Notifications', 
      icon: notifications, 
      path: '/notifications', 
      description: 'View your alerts and reminders',
      type: 'notifications'
    },
    { 
      title: 'Medication', 
      icon: flask, 
      path: '/medications', 
      description: 'Track your medications',
      type: 'medication'
    },
    { 
      title: 'Settings', 
      icon: settings, 
      path: '/settings', 
      description: 'Customize your app preferences',
      type: 'settings'
    }
  ];

  return (
    <IonPage className={`${daltonization} daltonization-active`}>
      <IonContent className="main-page-content">
        <div className="app-container">
          <div className="background-logo">
            <img src={calendarImage} alt="Oro Logo" className="center-icon" />
          </div>
          
          <div className="content-container">
            <h2 className="section-title">Quick Access</h2>
            <div className="quick-access-grid">
              {menuItems.map((item, index) => {
                const badgeCount = getBadgeCount(item.type);
                return (
                  <IonCard 
                    key={index}
                    className="quick-access-card" 
                    onClick={() => history.push(item.path)}
                  >
                    <div className="card-content">
                      <IonIcon icon={item.icon} />
                      <IonLabel>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                      </IonLabel>
                      {badgeCount > 0 && (
                        <div className="badge">{badgeCount}</div>
                      )}
                      <IonIcon icon={chevronForward} className="arrow-icon" />
                    </div>
                  </IonCard>
                );
              })}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;