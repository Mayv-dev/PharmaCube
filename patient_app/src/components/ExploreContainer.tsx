import './ExploreContainer.css';
import withSettings from '../composables/withSettings'; // Import the HOC
import { SettingsContextType } from '../composables/SettingsContext'; // Import the settings type

interface ContainerProps {
  name: string;
  settings: SettingsContextType; // Add settings to the props interface
}

const ExploreContainer: React.FC<ContainerProps> = ({ name, settings }) => {
  const { theme } = settings; // Use settings in the component

  return (
    <div className={`container ${theme}`}> {/* Apply theme */}
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default withSettings(ExploreContainer); // Wrap the component with the HOC