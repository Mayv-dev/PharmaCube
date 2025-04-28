import {
	IonIcon,
	IonLabel,
	IonTabBar,
	IonTabButton
} from '@ionic/react';
import { medkit, chatbubbleOutline, calendarOutline } from 'ionicons/icons';
import '../styles/LowerToolbar.css';
import { useEffect, useState } from 'react';

type props = {
	isNavBarTop:boolean;
	unreadChats:any;
}

const LowerToolbar: React.FC<props> = ({isNavBarTop, unreadChats}) => {
	const [unreadChatNum, setUnreadChatNum] = useState<number>(0)

	useEffect(() => {
		let totalUnread = 0
		unreadChats.map(chat => totalUnread += chat.unread_message_count)
		setUnreadChatNum(totalUnread)
	},[unreadChats])
	
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
				<IonLabel>Chat {unreadChatNum != 0 ? <span className='notificationBadge'>{unreadChatNum}</span>:null}</IonLabel>
			</IonTabButton>
		</IonTabBar>
	);
};

export default LowerToolbar;
