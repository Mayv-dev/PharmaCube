import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonCard,
  IonCardContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonNote,
} from '@ionic/react';
import { 
  moonOutline, 
  notificationsOutline, 
  eyeOutline, 
  colorPaletteOutline,
  textOutline,
  phonePortraitOutline,
  chevronBack
} from 'ionicons/icons';
import { useColorblindFilter } from '../colorBlindContext';
import { useSettings } from '../composables/SettingsContext';
import './SettingsPage.css';

type FontSize = 'small' | 'medium' | 'large';

const SettingsPage: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [accentColor, setAccentColor] = useState<string>('#66d6c3');
  const [appLayout, setAppLayout] = useState<string>('list');

  const { filter, setFilter, isDarkMode, toggleDarkMode } = useColorblindFilter();
  const { tabBarPosition, setTabBarPosition, theme, setTheme } = useSettings();

  const handleFontSizeChange = (size: FontSize) => {
    setFontSize(size);
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
    };
    document.documentElement.style.setProperty('--ion-font-size', fontSizeMap[size]);
  };

  const handleAccentColorChange = (color: string) => {
    setAccentColor(color);
    document.documentElement.style.setProperty('--ion-color-primary', color);
    const brightness = Math.round(
      (parseInt(color.slice(1, 3), 16) * 299 +
        parseInt(color.slice(3, 5), 16) * 587 +
        parseInt(color.slice(5, 7), 16) * 114) /
        1000
    );
    const contrastColor = brightness > 125 ? '#000000' : '#ffffff';
    document.documentElement.style.setProperty('--ion-color-primary-contrast', contrastColor);
    const shade = `#${(parseInt(color.slice(1, 3), 16) - 20).toString(16)}${(
      parseInt(color.slice(3, 5), 16) - 20
    ).toString(16)}${(parseInt(color.slice(5, 7), 16) - 20).toString(16)}`;
    const tint = `#${(parseInt(color.slice(1, 3), 16) + 20).toString(16)}${(
      parseInt(color.slice(3, 5), 16) + 20
    ).toString(16)}${(parseInt(color.slice(5, 7), 16) + 20).toString(16)}`;
    document.documentElement.style.setProperty('--ion-color-primary-shade', shade);
    document.documentElement.style.setProperty('--ion-color-primary-tint', tint);
  };

  return (
    <IonPage className={filter}>
      <IonContent className="settings-content">
        <div className="settings-container">
          <div className="welcome-section">
            <div className="welcome-content">
              <h1>Settings</h1>
              <p>Customize your app experience</p>
            </div>
            <div className="welcome-decoration"></div>
          </div>

          <div className="settings-section">
            <IonCard className="settings-card">
              <IonCardContent>
                <div className="section-header">
                  <IonIcon icon={moonOutline} className="section-icon" />
                  <h2>Appearance</h2>
                </div>
                <IonList className="settings-list">
                  <IonItem className="settings-item">
                    <IonIcon icon={moonOutline} slot="start" />
                    <IonLabel>Dark Mode</IonLabel>
                    <IonToggle
                      checked={isDarkMode}
                      onIonChange={toggleDarkMode}
                    />
                  </IonItem>
                  <IonItem className="settings-item">
                    <IonIcon icon={textOutline} slot="start" />
                    <IonLabel>Font Size</IonLabel>
                    <IonSelect
                      value={fontSize}
                      onIonChange={(e) => handleFontSizeChange(e.detail.value as FontSize)}
                    >
                      <IonSelectOption value="small">Small</IonSelectOption>
                      <IonSelectOption value="medium">Medium</IonSelectOption>
                      <IonSelectOption value="large">Large</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                  <IonItem className="settings-item">
                    <IonIcon icon={colorPaletteOutline} slot="start" />
                    <IonLabel>Accent Color</IonLabel>
                    <IonSelect
                      value={accentColor}
                      onIonChange={(e) => handleAccentColorChange(e.detail.value)}
                    >
                      <IonSelectOption value="#66d6c3">Default (Teal)</IonSelectOption>
                      <IonSelectOption value="#3880ff">Blue</IonSelectOption>
                      <IonSelectOption value="#ff5722">Orange</IonSelectOption>
                      <IonSelectOption value="#4caf50">Green</IonSelectOption>
                      <IonSelectOption value="#9c27b0">Purple</IonSelectOption>
                      <IonSelectOption value="#f44336">Red</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>

            <IonCard className="settings-card">
              <IonCardContent>
                <div className="section-header">
                  <IonIcon icon={phonePortraitOutline} className="section-icon" />
                  <h2>Layout</h2>
                </div>
                <IonList className="settings-list">
                  <IonItem className="settings-item">
                    <IonIcon icon={phonePortraitOutline} slot="start" />
                    <IonLabel>Tab Bar Position</IonLabel>
                    <IonSelect
                      value={tabBarPosition}
                      onIonChange={(e) => setTabBarPosition(e.detail.value as 'bottom' | 'top')}
                    >
                      <IonSelectOption value="bottom">Bottom</IonSelectOption>
                      <IonSelectOption value="top">Top</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>

            <IonCard className="settings-card">
              <IonCardContent>
                <div className="section-header">
                  <IonIcon icon={notificationsOutline} className="section-icon" />
                  <h2>Notifications</h2>
                </div>
                <IonList className="settings-list">
                  <IonItem className="settings-item">
                    <IonIcon icon={notificationsOutline} slot="start" />
                    <IonLabel>Enable Notifications</IonLabel>
                    <IonToggle
                      checked={notificationsEnabled}
                      onIonChange={(e) => setNotificationsEnabled(e.detail.checked)}
                    />
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>

            <IonCard className="settings-card">
              <IonCardContent>
                <div className="section-header">
                  <IonIcon icon={eyeOutline} className="section-icon" />
                  <h2>Accessibility</h2>
                </div>
                <IonList className="settings-list">
                  <IonItem className="settings-item">
                    <IonIcon icon={eyeOutline} slot="start" />
                    <IonLabel>Colorblind Filter</IonLabel>
                    <IonSelect
                      value={filter}
                      onIonChange={(e) => setFilter(e.detail.value)}
                    >
                      <IonSelectOption value="">None</IonSelectOption>
                      <IonSelectOption value="protanopia-filter">Protanopia</IonSelectOption>
                      <IonSelectOption value="deuteranopia-filter">Deuteranopia</IonSelectOption>
                      <IonSelectOption value="tritanopia-filter">Tritanopia</IonSelectOption>
                      <IonSelectOption value="achromatopsia-filter">Achromatopsia</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;