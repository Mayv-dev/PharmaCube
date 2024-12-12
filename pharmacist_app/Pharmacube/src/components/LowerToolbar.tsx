import {
  IonToolbar,
  IonTitle,
  IonIcon,
  IonBadge,
  IonHeader
} from '@ionic/react';
import { menu, notifications } from 'ionicons/icons';
import '../styles/LowerToolbar.css';

const LowerToolbar: React.FC<{title:string}> = ({title}) => {
  return (
	<IonHeader>
		<IonToolbar>
			<IonIcon className="hamburger-icon" slot="start" icon={menu} />
			<IonTitle className="centerTitle">{title}</IonTitle>
			<IonIcon className="notification-icon" slot="end" icon={notifications}>
				<IonBadge className="notification-badge">3</IonBadge>
			</IonIcon>
		</IonToolbar>
	</IonHeader>
  );
};

export default LowerToolbar;