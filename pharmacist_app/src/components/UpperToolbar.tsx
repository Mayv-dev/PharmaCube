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
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';

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
	patient_id: number,
	body: string,
	route_to: string,
	timestamp: string,
	urgency: urgency
}

async function getAccount() {
	try {
		const { data, status } = await axios.get(
			`${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/pharmacist/1`,
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
	setPharmacistId:any
	setPatientId:any
	pharmacistId:number
}

const UpperToolbar: React.FC<UpperToolbarProps> = ({pharmacistName, pharmacistId, passedNotificationList, unreadNotifs, resetUnreadNotifs,setPharmacistId, setPatientId}) => {
		const history = useHistory();
		const [notifyList, setNotifyList] = useState<Notification[]>([])

		useEffect(() => {
			setNotifyList(passedNotificationList)
		},[passedNotificationList])

	return (
		<>
			<IonTabBar className='tabBarPrimary' slot="top">
				<IonTabButton tab="menu" onClick={openHamburgerMenu}>
					<IonIcon icon={menu} aria-hidden="true" />
					<IonLabel>Menu</IonLabel>
				</IonTabButton>
				<IonTabButton disabled={true} className='topOroLogo'>
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
					</IonButton>						

					<div className='pharmacistMenuGreeting'>
						{/* I use the picture from wikipedia as a stand-in for real pictures that would be stored on the server: https://commons.wikimedia.org/wiki/File:Portrait_Placeholder.png */}
						<img width="13%" src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'></img>
						<p>Hello, {pharmacistName != null ? pharmacistName.indexOf(" ") != -1 ? pharmacistName.substring(0, pharmacistName.indexOf(" ")) : pharmacistName : "Pharmacist"}!</p>
					</div>
					<IonButton className={"menuOptionButton"} routerLink='/account' routerDirection='root'>My Account</IonButton>
					<IonButton className={"menuOptionButton"} routerLink='/settings' routerDirection='root'>Settings</IonButton> 
					<IonButton color={"danger"} onClick={e => {
						setPharmacistId(0)
						history.push("/")
					}}>Log Out</IonButton>
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
					{passedNotificationList.length > 0 ? passedNotificationList?.map(notification => <NotificationItem pharmacistId={pharmacistId}patient_id={notification.patient_id} body={notification.body} route_to={notification.route_to} timestamp={notification.timestamp} urgencyPassed={notification.urgency} minimize={menuController.close} setPatientId={setPatientId} />): <IonItem>You have no notifications</IonItem>}
				</div>
				</IonContent>
			</IonMenu>
		</>
	);
};

export default UpperToolbar;
