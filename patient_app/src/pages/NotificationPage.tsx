import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonBadge,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonAvatar,
  IonChip,
  IonSegment,
  IonSegmentButton,
  IonText
} from '@ionic/react';
import { 
  timeOutline,
  checkmarkDoneOutline,
  notificationsOutline,
  medicalOutline,
  alertCircleOutline,
  alarmOutline,
  checkmarkCircleOutline,
  closeCircleOutline
} from 'ionicons/icons';
import './NotificationPage.css';

type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: 'medication' | 'reminder' | 'alert';
  status: 'pending' | 'completed' | 'missed';
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
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Medication Time',
        message: 'Take your morning medications',
        timestamp: new Date(Date.now() + 3600000), // 1 hour from now
        type: 'medication',
        status: 'pending',
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
        status: 'pending'
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
        medication: {
          name: 'Vitamin D',
          dosage: '1000IU',
          image: 'https://placehold.co/100x100/green/white?text=V'
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
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => 
      n.status === 'pending' ? { ...n, status: 'completed' } : n
    ));
    setUnreadCount(0);
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
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'missed': return 'danger';
      default: return 'primary';
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
    <IonPage>
      <IonHeader className="notification-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Notifications</IonTitle>
          {unreadCount > 0 && (
            <IonButtons slot="end">
              <IonButton onClick={markAllAsRead}>
                <IonIcon icon={checkmarkDoneOutline} slot="icon-only" />
                <IonBadge color="danger" className="unread-badge">
                  {unreadCount}
                </IonBadge>
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>

        <IonSegment 
          value={activeTab}
          onIonChange={e => setActiveTab(e.detail.value as 'upcoming' | 'history')}
          className="notification-segment"
        >
          <IonSegmentButton value="upcoming">
            <IonLabel>Upcoming</IonLabel>
            {unreadCount > 0 && <IonBadge color="danger">{unreadCount}</IonBadge>}
          </IonSegmentButton>
          <IonSegmentButton value="history">
            <IonLabel>History</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonHeader>

      <IonContent className="notification-content">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <IonIcon icon={notificationsOutline} className="empty-icon" />
            <IonText className="empty-text">
              <h3>No {activeTab === 'upcoming' ? 'upcoming' : 'past'} notifications</h3>
              <p>You're all caught up!</p>
            </IonText>
          </div>
        ) : (
          <IonList lines="none" className="notification-list">
            {filteredNotifications.map((notification) => (
              <IonItem 
                key={notification.id}
                className={`notification-item ${notification.status}`}
                detail={false}
              >
                {notification.medication?.image && (
                  <IonAvatar slot="start" className="notification-avatar">
                    <img src={notification.medication.image} alt={notification.medication.name} />
                  </IonAvatar>
                )}
                {!notification.medication?.image && (
                  <div slot="start" className="notification-icon-container">
                    <IonIcon 
                      icon={getNotificationIcon(notification.type)} 
                      className="notification-icon"
                    />
                  </div>
                )}

                <IonLabel className="notification-content">
                  <h2 className="notification-title">{notification.title}</h2>
                  <p className="notification-message">{notification.message}</p>
                  
                  <div className="notification-meta">
                    <IonNote className="notification-time">
                      <IonIcon icon={timeOutline} />
                      {notification.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      {' • '}
                      {notification.timestamp.toLocaleDateString([], {month: 'short', day: 'numeric'})}
                    </IonNote>
                    
                    {notification.schedule && (
                      <IonChip color="medium" className="schedule-chip">
                        {notification.schedule.time}
                        {notification.schedule.days.length < 7 && (
                          <span> • {notification.schedule.days.join(', ')}</span>
                        )}
                      </IonChip>
                    )}
                    
                    {notification.medication && (
                      <IonChip color="tertiary" className="medication-chip">
                        {notification.medication.name} • {notification.medication.dosage}
                      </IonChip>
                    )}
                  </div>
                </IonLabel>

                {notification.status === 'pending' ? (
                  <IonButton 
                    slot="end" 
                    fill="solid" 
                    color="primary"
                    className="action-button"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark Done
                  </IonButton>
                ) : (
                  <IonIcon 
                    slot="end" 
                    icon={getStatusIcon(notification.status)} 
                    color={getStatusColor(notification.status)}
                    className="status-icon"
                  />
                )}
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NotificationPage;