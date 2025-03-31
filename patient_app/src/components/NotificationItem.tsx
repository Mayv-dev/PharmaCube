import './ExploreContainer.css';
import './NotificationItem.css';
import withSettings from '../composables/withSettings'; // Import the HOC
import { SettingsContextType } from '../composables/SettingsContext'; // Import the settings type

function dayConvert(day: number): string {
  let stringDay = "";

  switch (day) {
    case 0: {
      stringDay = "Monday";
      break;
    }
    case 1: {
      stringDay = "Tuesday";
      break;
    }
    case 2: {
      stringDay = "Wednesday";
      break;
    }
    case 3: {
      stringDay = "Thursday";
      break;
    }
    case 4: {
      stringDay = "Friday";
      break;
    }
    case 5: {
      stringDay = "Saturday";
      break;
    }
    case 6: {
      stringDay = "Sunday";
      break;
    }
  }

  return stringDay;
}

enum urgency {
  LOW, MEDIUM, HIGH
}

interface NotificationItemProps {
  id: number;
  content: string;
  timestamp: string;
  urgencyPassed: urgency;
  settings: SettingsContextType; // Add settings to the props interface
}

const NotificationItem: React.FC<NotificationItemProps> = ({ id, content, timestamp, urgencyPassed, settings }) => {
  const { theme } = settings; // Use settings in the component

  let nameOfClass: string;

  if (urgencyPassed == urgency.LOW) nameOfClass = "notificationItemContainer lowNotification";
  else if (urgencyPassed == urgency.MEDIUM) nameOfClass = "notificationItemContainer mediumNotification";
  else nameOfClass = "notificationItemContainer highNotification";

  return (
    <div key={id} className={`${nameOfClass} ${theme}`}> {/* Apply theme */}
      <p className='timeContainer'>{timestamp.substring(11, 16)}</p>
      <p className='contentContainer'>{content}</p>
    </div>
  );
};

export default withSettings(NotificationItem); // Wrap the component with the HOC