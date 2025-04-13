import React from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { calendar, notifications, flask, settings } from 'ionicons/icons'; // Using filled variants
import './MainPage.css';

const MainPage: React.FC = () => {
  const history = useHistory();

  const menuItems = [
    { title: 'Schedule', icon: calendar, path: '/SchedulePage', color: '#FF6B6B', bgColor: '#FFF0F0' },
    { title: 'Notifications', icon: notifications, path: '/NotificationsPage', color: '#4ECDC4', bgColor: '#F0FDFA' },
    { title: 'Medication', icon: flask, path: '/MedicationsPage', color: '#45B7D1', bgColor: '#F0F9FF' },
    { title: 'Settings', icon: settings, path: '/SettingsPage', color: '#A78BFA', bgColor: '#F5F3FF' }
  ];

  return (
    <IonPage>
      <IonContent className="main-page-content" fullscreen>
        <div className="app-container">
          <div className="welcome-section">
            <h1>Welcome to PharmaCube</h1>
            <p>Your personal healthcare companion</p>
          </div>

          <IonGrid className="menu-grid">
            <IonRow>
              {menuItems.map((item, index) => (
                <IonCol size="6" key={index}>
                  <IonCard 
                    className="menu-card" 
                    button 
                    onClick={() => history.push(item.path)}
                    style={{ 
                      '--card-color': item.color,
                      '--card-bg-color': item.bgColor
                    }}
                  >
                    <IonCardContent className="card-content">
                      <div className="card-icon-container">
                        <ion-icon icon={item.icon} className="card-icon"></ion-icon>
                      </div>
                      <h3>{item.title}</h3>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;