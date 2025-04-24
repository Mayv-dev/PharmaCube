import {
	IonIcon,
	IonLabel,
	IonTabBar,
	IonTabButton
} from '@ionic/react';
import { medkit, chatbubbleOutline, calendarOutline } from 'ionicons/icons';
import '../styles/LowerToolbar.css';

type props = {
	isNavBarTop:boolean;
}

const LowerToolbar: React.FC<props> = ({isNavBarTop}) => {
	return (
		<IonTabBar className='tabBarSecondary' slot={isNavBarTop ? "top" : "bottom"}>
			<IonTabButton tab="regimes" href="/regimes">
				<IonIcon icon={medkit} />
				<IonLabel>Doses</IonLabel>
			</IonTabButton>
			<IonTabButton tab="history" href="/history">
				<IonIcon icon={calendarOutline} />
				<IonLabel>History</IonLabel>
			</IonTabButton>
			<IonTabButton tab="chat" href="/chat">
				<IonIcon icon={chatbubbleOutline} />
				<IonLabel>Chat</IonLabel>
			</IonTabButton>
		</IonTabBar>
	);
};

export default LowerToolbar;
