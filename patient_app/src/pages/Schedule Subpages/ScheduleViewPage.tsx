import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonDatetime,
  IonButton,
  IonList,
  IonCard,
  IonCardContent,
  IonBadge,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonChip,
  IonNote,
  IonSkeletonText,
} from '@ionic/react';
import { timeOutline, calendarOutline, calendar, checkmarkCircle, closeCircle, chevronBack, alertCircle, informationCircle } from 'ionicons/icons';
import { useColorblindFilter } from '../../colorBlindContext';
import { useHistory } from 'react-router-dom';
import './ScheduleViewPage.css';
import axios from 'axios';

const ScheduleViewPage: React.FC = () => {
  console.log('ScheduleViewPage component rendered');
  
  const { filter } = useColorblindFilter();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [medicationStatus, setMedicationStatus] = useState<{ [key: string]: { taken: boolean, missingDoseHandling?: string } }>({});
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString());

  const handleMedicationStatus = (date: string, taken: boolean, missingDoseHandling?: string) => {
    setMedicationStatus(prevStatus => ({
      ...prevStatus,
      [date]: { taken, missingDoseHandling },
    }));
  };

  useEffect(() => {
    console.log('ScheduleViewPage useEffect running');
    setLoading(true);
    try {
      axios.get("http://localhost:8080/patient/1/mock_schedule")
        .then(res => {
          console.log("API response received:", res.data);
          setScheduleData(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching schedule data:", err);
          setScheduleData([
            { id: 1, day: 1, hour: 8, minute: 30, time_period: 1, taken: false, medications: [] },
            { id: 2, day: 1, hour: 13, minute: 0, time_period: 2, taken: true, medications: [] }
          ]);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error in useEffect:", error);
      setLoading(false);
    }
  }, []);

  const getStatusColor = (taken: boolean) => {
    return taken ? 'success' : 'danger';
  };

  const getStatusText = (taken: boolean) => {
    return taken ? 'Taken' : 'Not Taken';
  };

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };

  return (
    <IonPage className={filter}>
      <IonContent className="schedule-view-content">
        <div className="app-container">
          <div className="welcome-section">
            <div className="welcome-content">
              <p>Track and manage your daily medications</p>
              <div className="status-summary">
                <IonChip color="success" className="status-chip">
                  <IonIcon icon={checkmarkCircle} />
                  <IonLabel>3 Taken</IonLabel>
                </IonChip>
                <IonChip color="danger" className="status-chip">
                  <IonIcon icon={closeCircle} />
                  <IonLabel>1 Missed</IonLabel>
                </IonChip>
                <IonChip color="warning" className="status-chip">
                  <IonIcon icon={alertCircle} />
                  <IonLabel>2 Upcoming</IonLabel>
                </IonChip>
              </div>
            </div>
            <div className="welcome-decoration"></div>
          </div>

          <div className="schedule-section">
            <IonCard className="calendar-card">
              <IonCardContent>
                <IonDatetime
                  presentation="date"
                  value={selectedDate}
                  onIonChange={(e) => setSelectedDate(e.detail.value as string)}
                  className="calendar"
                ></IonDatetime>
              </IonCardContent>
            </IonCard>

            <div className="status-buttons">
              <IonButton
                className="status-button taken"
                onClick={() => handleMedicationStatus(selectedDate.split('T')[0], true)}
              >
                <IonIcon icon={checkmarkCircle} />
                <span>Mark as Taken</span>
              </IonButton>
              <IonButton
                className="status-button not-taken"
                onClick={() => handleMedicationStatus(selectedDate.split('T')[0], false, "Handling information")}
              >
                <IonIcon icon={closeCircle} />
                <span>Mark as Not Taken</span>
              </IonButton>
            </div>

            <div className="schedule-list">
              <div className="section-header">
                <h2>Today's Schedule</h2>
                <IonNote>Select a medication to mark its status</IonNote>
              </div>
              <IonList>
                {loading ? (
                  // Loading skeletons
                  Array(3).fill(0).map((_, index) => (
                    <IonItem key={index} className="schedule-item">
                      <div className="schedule-item-content">
                        <IonSkeletonText animated style={{ width: '60%' }} />
                        <IonSkeletonText animated style={{ width: '40%' }} />
                        <IonSkeletonText animated style={{ width: '80%' }} />
                      </div>
                    </IonItem>
                  ))
                ) : scheduleData.length > 0 ? (
                  scheduleData.map((item) => (
                    <IonItem key={item.id} className="schedule-item" button detail={false}>
                      <div className="schedule-item-content">
                        <div className="schedule-time">
                          <IonIcon icon={timeOutline} />
                          <span>{formatTime(item.hour, item.minute)}</span>
                        </div>
                        <div className="schedule-day">
                          <IonIcon icon={calendarOutline} />
                          <span>Day {item.day}</span>
                        </div>
                        {item.medications && item.medications.length > 0 ? (
                          <div className="medications-list">
                            <ul>
                              {item.medications.map((med: any) => (
                                <li key={med.id}>
                                  <span className="medication-name">{med.name}</span>
                                  <span>{med.amount}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="no-medications">No medications scheduled</p>
                        )}
                      </div>
                      <div className="schedule-status">
                        <IonIcon
                          icon={item.taken ? checkmarkCircle : closeCircle}
                          className={item.taken ? "status-taken" : "status-not-taken"}
                        />
                        <span className={`status-text ${item.taken ? "taken" : "not-taken"}`}>
                          {getStatusText(item.taken)}
                        </span>
                      </div>
                    </IonItem>
                  ))
                ) : (
                  <IonItem>
                    <IonLabel>
                      <div className="empty-state">
                        <IonIcon icon={informationCircle} />
                        <p>No schedule data available</p>
                      </div>
                    </IonLabel>
                  </IonItem>
                )}
              </IonList>
            </div>

            <div className="status-history">
              <div className="section-header">
                <h2>Status History</h2>
                <IonNote>Your medication history for the past week</IonNote>
              </div>
              <IonList>
                {Object.entries(medicationStatus).length > 0 ? (
                  Object.entries(medicationStatus).map(([date, status]) => (
                    <IonItem key={date} className="history-item" button detail={false}>
                      <div className="history-content">
                        <div className="history-date">
                          <IonIcon icon={calendar} />
                          <span>{new Date(date).toLocaleDateString()}</span>
                        </div>
                        <span className={`status-text ${status.taken ? "taken" : "not-taken"}`}>
                          {getStatusText(status.taken)}
                        </span>
                        {status.missingDoseHandling && (
                          <p className="handling-info">{status.missingDoseHandling}</p>
                        )}
                      </div>
                      <IonIcon
                        icon={status.taken ? checkmarkCircle : closeCircle}
                        className={status.taken ? "status-taken" : "status-not-taken"}
                      />
                    </IonItem>
                  ))
                ) : (
                  <IonItem>
                    <IonLabel>
                      <div className="empty-state">
                        <IonIcon icon={informationCircle} />
                        <p>No status history available</p>
                      </div>
                    </IonLabel>
                  </IonItem>
                )}
              </IonList>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ScheduleViewPage;
