import React from 'react';
import { 
  IonCard, 
  IonItem, 
  IonLabel, 
  IonNote, 
  IonBadge,
  IonIcon,
  IonButton,
  IonChip
} from '@ionic/react';
import { 
  timeOutline,
  warningOutline,
  alertCircleOutline,
  notificationsOutline,
  pillOutline,
  checkmarkCircleOutline,
  closeCircleOutline
} from 'ionicons/icons';
import withSettings from '../composables/withSettings';
import { SettingsContextType } from '../composables/SettingsContext';
import './NotificationItem.css';

enum Urgency {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

interface Medication {
  name: string;
  dosage: string;
}

interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'medication' | 'reminder' | 'alert';
  status: 'pending' | 'completed' | 'missed';
  urgency: Urgency;
  medication?: Medication;
  settings: SettingsContextType;
  onMarkAsRead?: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  id,
  title,
  message,
  timestamp,
  type,
  status,
  urgency,
  medication,
  settings,
  onMarkAsRead
}) => {
  const { theme } = settings;

  const getUrgencyStyle = () => {
    switch (urgency) {
      case Urgency.HIGH:
        return {
          icon: alertCircleOutline,
          color: 'danger',
          bgColor: 'rgba(var(--ion-color-danger-rgb), 0.1)',
          text: 'High'
        };
      case Urgency.MEDIUM:
        return {
          icon: warningOutline,
          color: 'warning',
          bgColor: 'rgba(var(--ion-color-warning-rgb), 0.1)',
          text: 'Medium'
        };
      case Urgency.LOW:
        return {
          icon: notificationsOutline,
          color: 'success',
          bgColor: 'rgba(var(--ion-color-success-rgb), 0.1)',
          text: 'Low'
        };
      default:
        return {
          icon: notificationsOutline,
          color: 'medium',
          bgColor: 'rgba(var(--ion-color-medium-rgb), 0.1)',
          text: 'Unknown'
        };
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'medication': return pillOutline;
      case 'reminder': return notificationsOutline;
      case 'alert': return alertCircleOutline;
      default: return notificationsOutline;
    }
  };

  const urgencyStyle = getUrgencyStyle();

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], {month: 'short', day: 'numeric'});
  };

  const handleMarkAsRead = () => {
    if (onMarkAsRead) {
      onMarkAsRead(id);
    }
  };

  return (
    <IonCard className={`notification-card ${theme}`}>
      <IonItem 
        lines="none" 
        className="notification-item"
        button
        detail={false}
      >
        <div 
          slot="start" 
          className="urgency-indicator"
          style={{ backgroundColor: urgencyStyle.bgColor }}
        >
          <IonIcon 
            icon={getTypeIcon()} 
            color={urgencyStyle.color}
            className="urgency-icon"
          />
        </div>

        <IonLabel className="notification-content">
          <h3 className="content-text">{title}</h3>
          <p className="notification-message">{message}</p>
          <div className="notification-meta">
            <IonNote className="timestamp">
              <IonIcon icon={timeOutline} className="time-icon" />
              {formatTime(timestamp)} • {formatDate(timestamp)}
            </IonNote>
            {medication && (
              <IonChip color="tertiary" className="medication-chip">
                {medication.name} • {medication.dosage}
              </IonChip>
            )}
            <IonBadge 
              color={urgencyStyle.color}
              className="urgency-badge"
            >
              {urgencyStyle.text}
            </IonBadge>
          </div>
        </IonLabel>

        {status === 'pending' ? (
          <IonButton 
            slot="end" 
            size="small"
            onClick={handleMarkAsRead}
          >
            Mark Done
          </IonButton>
        ) : (
          <IonIcon 
            slot="end"
            icon={status === 'completed' ? checkmarkCircleOutline : closeCircleOutline}
            color={status === 'completed' ? 'success' : 'danger'}
          />
        )}
      </IonItem>
    </IonCard>
  );
};

export default withSettings(NotificationItem);