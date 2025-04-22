import React, { useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { timeOutline, calendarOutline, chevronForward } from 'ionicons/icons';
import { useColorblindFilter } from '../colorBlindContext';
import { useHistory } from 'react-router-dom';
import './SchedulePage.css';
import calendarImage from '../Picture2.png';
import '../daltonization.css';

const SchedulePage: React.FC = () => {
  const { daltonization, isDarkMode } = useColorblindFilter();
  const history = useHistory();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleViewSchedule = () => {
    history.push('/schedule/view');
  };

  const handleEditSchedule = () => {
    history.push('/schedule/edit');
  };

  return (
    <IonPage className={`${daltonization} daltonization-active`}>
      <IonContent className="schedule-page-content">
        <div className="app-container">
          <div className="welcome-section">
            <div className="welcome-decoration"></div>
            <div className="welcome-content">
              <h1>Schedule Management</h1>
              <p>View and edit your medication schedule</p>
            </div>
          </div>

          <div className="menu-section">
            <IonGrid className="menu-grid">
              <IonRow className="menu-row">
                <IonCol size="12" sizeMd="6" className="menu-col">
                  <IonCard className="quick-access-card" onClick={handleEditSchedule}>
                    <div className="card-content">
                      <IonIcon icon={timeOutline} />
                      <IonLabel>
                        <h2>Edit Schedule</h2>
                        <p>Modify your medication schedule and timing</p>
                      </IonLabel>
                      <IonIcon icon={chevronForward} className="arrow-icon" />
                    </div>
                  </IonCard>
                </IonCol>

                <IonCol size="12" sizeMd="6" className="menu-col">
                  <IonCard className="quick-access-card" onClick={handleViewSchedule}>
                    <div className="card-content">
                      <IonIcon icon={calendarOutline} />
                      <IonLabel>
                        <h2>View Schedule</h2>
                        <p>Check your current medication schedule</p>
                      </IonLabel>
                      <IonIcon icon={chevronForward} className="arrow-icon" />
                    </div>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SchedulePage;