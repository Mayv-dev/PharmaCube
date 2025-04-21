import {
	IonIcon,
	IonContent,
	IonLabel,
	IonTabBar,
	IonTabButton,
	IonMenu,
	IonButton,
	IonItem,
	IonText,
	IonImg
} from '@ionic/react';
import { arrowBack, arrowForward, menu, notifications } from 'ionicons/icons';
import '../styles/LowerToolbar.css';
import axios from 'axios';
import { menuController } from '@ionic/core/components';
import NotificationItem from './NotificationItem';

export async function openHamburgerMenu() {
	await menuController.open('hamburger-menu');
}

export async function openNotificationMenu() {
	await menuController.open('notifications');
}

enum urgency {
	LOW, MEDIUM, HIGH
}
export type Notification = {
	id: number,
	content: string,
	timestamp: string,
	urgency: urgency
}

async function getAccount() {
	try {
		const { data, status } = await axios.get(
			`http://localhost:8080/pharmacist/1`,
			{
				headers: {
					Accept: 'application/json'
				},
			},
		);
		return data;
	}
	catch (error) {
		if (axios.isAxiosError(error)) {
			console.log('error message: ', error.message);
			return error.message;
		} else {
			console.log('unexpected error: ', error);
			return 'An unexpected error occurred';
		}
	}
};

type UpperToolbarProps = {
	pharmacistName:string,
	passedNotificationList:Notification[],
	unreadNotifs:number,
	resetUnreadNotifs:any
}

const UpperToolbar: React.FC<UpperToolbarProps> = ({pharmacistName, passedNotificationList, unreadNotifs, resetUnreadNotifs}) => {
	
	return (
		<>
			<IonTabBar className='tabBarPrimary' slot="top">
				<IonTabButton tab="menu" onClick={openHamburgerMenu}>
					<IonIcon icon={menu} aria-hidden="true" />
					<IonLabel>Menu</IonLabel>
				</IonTabButton>
				<IonTabButton className='topOroLogo'>
					<IonImg src='logo/ORO logo v2 bg-removed.png'>
					</IonImg>
				</IonTabButton>
					
				<IonTabButton tab="notifications" onClick={ e => {
					openNotificationMenu(); 
					resetUnreadNotifs();
					;}}>
					<IonIcon icon={notifications} aria-hidden="true" />
					<IonLabel>Notifications {unreadNotifs == 0 ? null:<span className={"notificationBadge"}>{unreadNotifs}</span>}</IonLabel>
				</IonTabButton>
			</IonTabBar>

			<IonMenu menuId="hamburger-menu" contentId="main-content">
				<IonContent>
					<div className="hamburger-menu">
					<IonButton onClick={() => menuController.close()} className='menuBackButton'>
						<IonText>Close Menu</IonText>
						<IonIcon icon={arrowBack}></IonIcon>
					</IonButton>						<div className='pharmacistMenuGreeting'>
							<img width="13%" src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'></img>
							<p>Hello, {pharmacistName != null ? pharmacistName.indexOf(" ") != -1 ? pharmacistName.substring(0, pharmacistName.indexOf(" ")) : pharmacistName : "Pharmacist"}!</p>
						</div>
						<IonButton className={"menuOptionButton"} routerLink='/account' routerDirection='root'>My Account</IonButton>
						<IonButton className={"menuOptionButton"} routerLink='/settings' routerDirection='root'>Settings</IonButton> 
						<IonButton color={"danger"}>Log Out</IonButton>
					</div>
				</IonContent>
			</IonMenu>

			<IonMenu side="end" className="notificationMenu" menuId="notifications" contentId="main-content">
				<IonContent>
				<div className="hamburger-menu">
						<IonButton onClick={() => menuController.close()} className='notificationsBackButton'>
							<IonIcon icon={arrowForward}></IonIcon>
							<IonText>Close Menu</IonText>
						</IonButton>
						<div className='rowOfSelects'>
						</div>
					{passedNotificationList.length > 0 ? passedNotificationList?.map(notification => <NotificationItem id={notification.id} content={notification.content} timestamp={notification.timestamp} urgencyPassed={notification.urgency} minimize={menuController.close} />): <IonItem>You have no notifications</IonItem>}
				</div>
				</IonContent>
			</IonMenu>
		</>
	);
};

export default UpperToolbar;
