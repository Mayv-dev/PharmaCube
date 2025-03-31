import {
	IonIcon,
	IonContent,
	IonLabel,
	IonTabBar,
	IonTabButton,
	IonMenu,
	IonButton,
	IonItem,
	IonSelect,
	IonSelectOption,
	IonRouterLink,
	IonText
} from '@ionic/react';
import { arrowBack, arrowDownRightBoxOutline, arrowForward, handRight, handRightSharp, menu, notifications } from 'ionicons/icons';
import '../styles/LowerToolbar.css';
import axios from 'axios';
import { menuController } from '@ionic/core/components';
import { useEffect, useState } from 'react';
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

async function getMockData() {
	try {
		const { data, status } = await axios.get(
			'http://demo3553220.mockable.io/notification',
			{
				headers: {
					Accept: 'application/json'
				},
			},
		);

		return data;

	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log('error message: ', error.message);
			return error.message;
		} else {
			console.log('unexpected error: ', error);
			return 'An unexpected error occurred';
		}
	}
}

type UpperToolbarProps = {
	passedNotificationList:Notification[]
}

const UpperToolbar: React.FC<UpperToolbarProps> = ({passedNotificationList}) => {
	
	return (
		<>
			<IonTabBar className='tabBarPrimary' slot="top">
				<IonTabButton tab="menu" onClick={openHamburgerMenu}>
					<IonIcon icon={menu} aria-hidden="true" />
					<IonLabel>Menu</IonLabel>
				</IonTabButton>
				<IonTabButton tab="notifications" onClick={openNotificationMenu}>
					<IonIcon icon={notifications} aria-hidden="true" />
					<IonLabel>Notifications</IonLabel>
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
							<p>Hello, Henry!</p>
						</div>
						<IonButton className={"menuOptionButton"} href='/account'>My Account</IonButton> 
						<IonButton className={"menuOptionButton"} href='/faqs'>FAQs</IonButton>
						<IonButton className={"menuOptionButton"} href='/settings'>Settings</IonButton> 
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
							{/* <IonItem>
								<IonSelect label="Filter By:">
									<IonSelectOption>None</IonSelectOption>
									<IonSelectOption>High Priority</IonSelectOption>
									<IonSelectOption>Medium Priority</IonSelectOption>
									<IonSelectOption>Low Priority</IonSelectOption>
								</IonSelect>
							</IonItem>
							<IonItem>
								<IonSelect label="Sort By:">
									<IonSelectOption>Most Recent</IonSelectOption>
									<IonSelectOption>Highest Priority</IonSelectOption>
								</IonSelect>
							</IonItem> */}
						</div>
					{passedNotificationList?.map(notification => <NotificationItem id={notification.id} content={notification.content} timestamp={notification.timestamp} urgencyPassed={notification.urgency} />)}
				</div>
				</IonContent>
			</IonMenu>
		</>
	);
};

export default UpperToolbar;
