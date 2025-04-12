import React from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { calendarOutline, notificationsOutline, medical, settingsOutline } from 'ionicons/icons';
import './MainPage.css'; // Create this CSS file for custom styling

const MainPage: React.FC = () => {
  const history = useHistory();

  const menuItems = [
    { title: 'Schedule', icon: calendarOutline, path: '/SchedulePage' },
    { title: 'Notifications', icon: notificationsOutline, path: '/NotificationsPage' },
    { title: 'Medication', icon: medical, path: '/MedicationsPage' },
    { title: 'Settings', icon: settingsOutline, path: '/SettingsPage' }
  ];

  return (
    <IonPage>
      <IonContent className="main-page-content" fullscreen>
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
                >
                  <IonCardContent className="card-content">
                    <IonIcon icon={item.icon} size="large" />
                    <h3>{item.title}</h3>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;