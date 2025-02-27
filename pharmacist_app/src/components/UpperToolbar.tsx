import {
	IonIcon,
	IonContent,
	IonLabel,
	IonTabBar,
	IonTabButton,
	IonMenu
  } from '@ionic/react';
  import { menu,notifications } from 'ionicons/icons';
  import '../styles/LowerToolbar.css';
  import { menuController } from '@ionic/core/components';

	async function openHamburgerMenu() {
	  await menuController.open('hamburger-menu');
	}
  
	async function openNotificationMenu() {
	  await menuController.open('notifications');
	}

  const UpperToolbar: React.FC = () => {
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
        <IonContent className="ion-padding">Account and other hamburger menu items will go here.</IonContent>
      </IonMenu>

      <IonMenu side="end" menuId="notifications" contentId="main-content">
        <IonContent className="ion-padding">Notifications will go here.</IonContent>
      </IonMenu>
	</>
	);
  };
  
  export default UpperToolbar;