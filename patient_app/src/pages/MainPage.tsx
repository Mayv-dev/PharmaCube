import React from 'react';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardContent, 
  IonIcon,
  IonBadge,
  IonPage
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { 
  calendar, 
  notifications, 
  flask, 
  settings,
  chevronForward
} from 'ionicons/icons';
import './MainPage.css';
import calendarImage from '../Picture2.png';

const MainPage: React.FC = () => {
  const history = useHistory();

  // This would typically come from your app's state management
  const getBadgeCount = (type: string) => {
    switch(type) {
      case 'schedule':
        // Example: Return actual count of upcoming medications
        return 0;
      case 'notifications':
        // Example: Return actual count of unread notifications
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
      color: '#00A878', 
      bgColor: '#F5F5F5',
      description: 'Manage your medication schedule',
      type: 'schedule'
    },
    { 
      title: 'Notifications', 
      icon: notifications, 
      path: '/notifications', 
      color: '#00A878', 
      bgColor: '#F5F5F5',
      description: 'View your alerts and reminders',
      type: 'notifications'
    },
    { 
      title: 'Medication', 
      icon: flask, 
      path: '/medications', 
      color: '#00A878', 
      bgColor: '#F5F5F5',
      description: 'Track your medications',
      type: 'medication'
    },
    { 
      title: 'Settings', 
      icon: settings, 
      path: '/settings', 
      color: '#00A878', 
      bgColor: '#F5F5F5',
      description: 'Customize your app preferences',
      type: 'settings'
    }
  ];

  return (
    <IonPage>
      <IonContent className="main-page-content" fullscreen>
        <div className="app-container">
          <div className="background-logo">
            <img src={calendarImage} alt="Oro Logo" className="center-icon" />
          </div>
          <div className="content-container">
            <div className="menu-section">
              <h2 className="section-title">Quick Access</h2>
              <IonGrid className="menu-grid">
                <IonRow>
                  {menuItems.map((item, index) => {
                    const badgeCount = getBadgeCount(item.type);
                    return (
                      <IonCol size="12" sizeMd="6" key={index}>
                        <IonCard 
                          className="menu-card" 
                          button 
                          onClick={() => history.push(item.path)}
                          style={{ 
                            '--card-bg-color': item.bgColor
                          }}
                        >
                          <IonCardContent className="card-content">
                            <div className="card-icon-container">
                              <IonIcon icon={item.icon} className="card-icon" />
                              {badgeCount > 0 && (
                                <IonBadge color="danger" className="card-badge">
                                  {badgeCount}
                                </IonBadge>
                              )}
                            </div>
                            <div className="card-text-content">
                              <h3>{item.title}</h3>
                              <p className="card-description">{item.description}</p>
                            </div>
                            <IonIcon icon={chevronForward} className="card-arrow" />
                          </IonCardContent>
                        </IonCard>
                      </IonCol>
                    );
                  })}
                </IonRow>
              </IonGrid>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;