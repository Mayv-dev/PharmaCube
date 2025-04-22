import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonBadge,
  IonButton,
  IonChip,
  IonSegment,
  IonSegmentButton,
  IonCard,
  IonCardContent,
  IonAvatar,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
  IonToast
} from '@ionic/react';
import { 
  timeOutline,
  checkmarkDoneOutline,
  notificationsOutline,
  medicalOutline,
  alertCircleOutline,
  alarmOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  addOutline,
  filterOutline,
  searchOutline
} from 'ionicons/icons';
import { useColorblindFilter } from '../colorBlindContext';
import './NotificationPage.css';

type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: 'medication' | 'reminder' | 'alert';
  status: 'pending' | 'completed' | 'missed';
  priority?: 'high' | 'medium' | 'low';
  medication?: {
    name: string;
    dosage: string;
    image?: string;
  };
  schedule?: {
    time: string;
    days: string[];
  };
};

const NotificationPage: React.FC = () => {
  const { daltonization, isDarkMode } = useColorblindFilter();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Medication Time',
        message: 'Take your morning medications',
        timestamp: new Date(Date.now() + 3600000), // 1 hour from now
        type: 'medication',
        status: 'pending',
        priority: 'high',
        medication: {
          name: 'Aspirin',
          dosage: '100mg',
          image: 'https://placehold.co/100x100/purple/white?text=A'
        },
        schedule: {
          time: '08:00 AM',
          days: ['Mon', 'Wed', 'Fri']
        }
      },
      {
        id: '2',
        title: 'Refill Reminder',
        message: 'Your prescription needs refilling',
        timestamp: new Date(Date.now() + 7200000), // 2 hours from now
        type: 'reminder',
        status: 'pending',
        priority: 'medium'
      },
      {
        id: '3',
        title: 'Medication Taken',
        message: 'You took your evening dose',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        type: 'medication',
        status: 'completed',
        medication: {
          name: 'Ibuprofen',
          dosage: '200mg',
          image: 'https://placehold.co/100x100/blue/white?text=I'
        }
      },
      {
        id: '4',
        title: 'Missed Dose',
        message: 'You missed your afternoon medication',
        timestamp: new Date(Date.now() - 86400000), // Yesterday
        type: 'alert',
        status: 'missed',
        priority: 'high',
        medication: {
          name: 'Vitamin D',
          dosage: '1000IU',
          image: 'https://placehold.co/100x100/green/white?text=V'
        }
      },
      {
        id: '5',
        title: 'Upcoming Appointment',
        message: 'Doctor appointment tomorrow at 10:00 AM',
        timestamp: new Date(Date.now() + 86400000), // Tomorrow
        type: 'reminder',
        status: 'pending',
        priority: 'high'
      },
      {
        id: '6',
        title: 'Medication Interaction Alert',
        message: 'Potential interaction between Aspirin and Ibuprofen',
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
        type: 'alert',
        status: 'completed',
        priority: 'high',
        medication: {
          name: 'Aspirin',
          dosage: '100mg',
          image: 'https://placehold.co/100x100/purple/white?text=A'
        }
      },
      {
        id: '7',
        title: 'Prescription Ready',
        message: 'Your prescription is ready for pickup',
        timestamp: new Date(Date.now() + 259200000), // 3 days from now
        type: 'reminder',
        status: 'pending',
        priority: 'medium'
      },
      {
        id: '8',
        title: 'Medication Schedule Update',
        message: 'Your medication schedule has been updated',
        timestamp: new Date(Date.now() - 432000000), // 5 days ago
        type: 'alert',
        status: 'completed',
        priority: 'low'
      },
      {
        id: '9',
        title: 'Lab Results Available',
        message: 'Your recent blood test results are now available',
        timestamp: new Date(Date.now() - 604800000), // 1 week ago
        type: 'reminder',
        status: 'completed',
        priority: 'medium'
      },
      {
        id: '10',
        title: 'Medication Refill Approved',
        message: 'Your Metformin refill has been approved by your doctor',
        timestamp: new Date(Date.now() + 432000000), // 5 days from now
        type: 'reminder',
        status: 'pending',
        priority: 'medium',
        medication: {
          name: 'Metformin',
          dosage: '500mg',
          image: 'https://placehold.co/100x100/red/white?text=M'
        }
      },
      {
        id: '11',
        title: 'Annual Checkup Reminder',
        message: 'Your annual physical exam is scheduled for next month',
        timestamp: new Date(Date.now() + 2592000000), // 30 days from now
        type: 'reminder',
        status: 'pending',
        priority: 'low'
      },
      {
        id: '12',
        title: 'Medication Side Effect Alert',
        message: 'Report any unusual symptoms while taking Lisinopril',
        timestamp: new Date(Date.now() - 86400000), // Yesterday
        type: 'alert',
        status: 'pending',
        priority: 'high',
        medication: {
          name: 'Lisinopril',
          dosage: '10mg',
          image: 'https://placehold.co/100x100/orange/white?text=L'
        }
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => n.status === 'pending').length);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, status: 'completed' } : n
    ));
    setUnreadCount(prev => prev - 1);
    setToastMessage('Notification marked as read');
    setShowToast(true);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => 
      n.status === 'pending' ? { ...n, status: 'completed' } : n
    ));
    setUnreadCount(0);
    setToastMessage('All notifications marked as read');
    setShowToast(true);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'medication': return medicalOutline;
      case 'reminder': return alarmOutline;
      case 'alert': return alertCircleOutline;
      default: return notificationsOutline;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return checkmarkCircleOutline;
      case 'missed': return closeCircleOutline;
      default: return undefined;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'missed': return 'danger';
      default: return 'primary';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'medium';
    }
  };

  const filteredNotifications = notifications
    .filter(n => activeTab === 'upcoming' ? n.status === 'pending' : n.status !== 'pending')
    .sort((a, b) => 
      activeTab === 'upcoming' 
        ? a.timestamp.getTime() - b.timestamp.getTime() // Sort upcoming by soonest first
        : b.timestamp.getTime() - a.timestamp.getTime() // Sort history by newest first
    );

  return (
    <IonPage className={`${daltonization} daltonization-active${isDarkMode ? ' dark' : ''}`}>
      <IonContent className="notification-content">
        <div className="notification-container">
          <div className="welcome-section">
            <div className="welcome-content">
              <div className="welcome-header">
                <h1>Notifications</h1>
                <p>
                  <IonIcon icon={notificationsOutline} />
                  {unreadCount} unread notifications
                </p>
              </div>
              <div className="header-actions">
                <IonButton fill="clear" onClick={markAllAsRead}>
                  <IonIcon slot="start" icon={checkmarkDoneOutline} />
                  Mark all as read
                </IonButton>
              </div>
            </div>
          </div>

          <div className="notification-filters">
            <IonSegment 
              value={activeTab} 
              onIonChange={e => setActiveTab(e.detail.value as 'upcoming' | 'history')}
            >
              <IonSegmentButton value="upcoming">
                <IonLabel>Upcoming</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="history">
                <IonLabel>History</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

          <div className="notification-list">
            {filteredNotifications.length === 0 ? (
              <div className="empty-state">
                <IonIcon icon={notificationsOutline} />
                <h3>No {activeTab} notifications</h3>
                <p>You're all caught up!</p>
              </div>
            ) : (
              filteredNotifications.map(notification => (
                <IonCard 
                  key={notification.id} 
                  className={`notification-card ${notification.status} ${notification.priority || ''}`}
                >
                  <IonCardContent>
                    <div className="notification-header-row">
                      <div className="notification-icon-container">
                        <IonIcon icon={getNotificationIcon(notification.type)} />
                      </div>
                      <div className="notification-title-container">
                        <h2>{notification.title}</h2>
                        <p>{notification.message}</p>
                      </div>
                      {notification.status === 'pending' && (
                        <IonButton
                          fill="clear"
                          className="action-button"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <IonIcon slot="icon-only" icon={checkmarkDoneOutline} />
                        </IonButton>
                      )}
                    </div>
                    <div className="notification-details">
                      <div className="notification-time">
                        <IonIcon icon={timeOutline} />
                        <span>
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                      </div>
                      {notification.priority && (
                        <IonChip color={getPriorityColor(notification.priority)}>
                          {notification.priority.toUpperCase()}
                        </IonChip>
                      )}
                      {notification.medication && (
                        <IonChip className="medication-chip">
                          <IonIcon icon={medicalOutline} />
                          <IonLabel>{notification.medication.name} - {notification.medication.dosage}</IonLabel>
                        </IonChip>
                      )}
                      {notification.schedule && (
                        <IonChip className="schedule-chip">
                          <IonIcon icon={alarmOutline} />
                          <IonLabel>{notification.schedule.time} ({notification.schedule.days.join(', ')})</IonLabel>
                        </IonChip>
                      )}
                    </div>
                  </IonCardContent>
                </IonCard>
              ))
            )}
          </div>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default NotificationPage;