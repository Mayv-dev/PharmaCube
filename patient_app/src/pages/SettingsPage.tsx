import React, { useState, useEffect } from 'react';
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
  IonAlert,
  IonToast,
} from '@ionic/react';
import { 
  moonOutline, 
  eyeOutline, 
  colorPaletteOutline,
  textOutline,
  chevronBack,
  cloudDownloadOutline,
  cloudUploadOutline,
  trashOutline,
  saveOutline,
  timeOutline,
  contrastOutline
} from 'ionicons/icons';
import { useColorblindFilter } from '../colorBlindContext';
import { useSettings } from '../composables/SettingsContext';
import { useTheme } from '../theme/ThemeContext';
import './SettingsPage.css';
import '../daltonization.css';

type FontSize = 'small' | 'medium' | 'large';
type DataRetention = '7days' | '30days' | '90days' | 'forever';

const SettingsPage: React.FC = () => {
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [appLayout, setAppLayout] = useState<string>('list');
  const [showClearDataAlert, setShowClearDataAlert] = useState(false);
  const [showBackupToast, setShowBackupToast] = useState(false);
  const [showRestoreToast, setShowRestoreToast] = useState(false);
  const [showClearToast, setShowClearToast] = useState(false);
  const [dataRetention, setDataRetention] = useState<DataRetention>('forever');
  const [toastMessage, setToastMessage] = useState('');
  const [highContrastMode, setHighContrastMode] = useState(false);

  const { daltonization, setDaltonization, isDarkMode, toggleDarkMode } = useColorblindFilter();
  const { theme, setTheme } = useSettings();
  const { accentColor, setAccentColor } = useTheme();

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize') as FontSize;
    const savedHighContrast = localStorage.getItem('highContrastMode') === 'true';
    
    if (savedFontSize) {
      setFontSize(savedFontSize);
      handleFontSizeChange(savedFontSize);
    }
    
    if (savedHighContrast) {
      setHighContrastMode(savedHighContrast);
      handleHighContrastChange(savedHighContrast);
    }
  }, []);

  const handleHighContrastChange = (enabled: boolean) => {
    setHighContrastMode(enabled);
    localStorage.setItem('highContrastMode', enabled.toString());
    
    if (enabled) {
      // Apply high contrast colors
      document.documentElement.style.setProperty('--ion-color-primary', '#000000');
      document.documentElement.style.setProperty('--ion-color-primary-contrast', '#ffffff');
      document.documentElement.style.setProperty('--ion-color-primary-shade', '#000000');
      document.documentElement.style.setProperty('--ion-color-primary-tint', '#333333');
      document.documentElement.style.setProperty('--app-text', '#000000');
      document.documentElement.style.setProperty('--app-text-secondary', '#333333');
      document.documentElement.style.setProperty('--app-background', '#ffffff');
      document.documentElement.style.setProperty('--app-surface', '#ffffff');
      document.documentElement.style.setProperty('--app-border', '#000000');
      document.documentElement.style.setProperty('--app-shadow', 'rgba(0, 0, 0, 0.5)');
    } else {
      // Reset to default colors
      document.documentElement.style.setProperty('--ion-color-primary', accentColor);
      document.documentElement.style.setProperty('--ion-color-primary-contrast', isDarkMode ? '#ffffff' : '#000000');
      document.documentElement.style.setProperty('--ion-color-primary-shade', isDarkMode ? '#333333' : '#cccccc');
      document.documentElement.style.setProperty('--ion-color-primary-tint', isDarkMode ? '#666666' : '#f2f2f2');
      document.documentElement.style.setProperty('--app-text', isDarkMode ? '#ffffff' : '#000000');
      document.documentElement.style.setProperty('--app-text-secondary', isDarkMode ? '#cccccc' : '#666666');
      document.documentElement.style.setProperty('--app-background', isDarkMode ? '#121212' : '#ffffff');
      document.documentElement.style.setProperty('--app-surface', isDarkMode ? '#1e1e1e' : '#ffffff');
      document.documentElement.style.setProperty('--app-border', isDarkMode ? '#333333' : '#e0e0e0');
      document.documentElement.style.setProperty('--app-shadow', isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)');
    }
  };

  const handleFontSizeChange = (size: FontSize) => {
    setFontSize(size);
    localStorage.setItem('fontSize', size);
    
    const fontSizeMap = {
      small: {
        base: '14px',
        h1: '24px',
        h2: '20px',
        h3: '18px',
        p: '14px',
        button: '14px'
      },
      medium: {
        base: '16px',
        h1: '28px',
        h2: '24px',
        h3: '20px',
        p: '16px',
        button: '16px'
      },
      large: {
        base: '18px',
        h1: '32px',
        h2: '28px',
        h3: '24px',
        p: '18px',
        button: '18px'
      }
    };

    const sizes = fontSizeMap[size];
    
    // Set base font size
    document.documentElement.style.setProperty('--ion-font-size', sizes.base);
    
    // Set heading sizes
    document.documentElement.style.setProperty('--ion-font-size-h1', sizes.h1);
    document.documentElement.style.setProperty('--ion-font-size-h2', sizes.h2);
    document.documentElement.style.setProperty('--ion-font-size-h3', sizes.h3);
    
    // Set paragraph size
    document.documentElement.style.setProperty('--ion-font-size-p', sizes.p);
    
    // Set button text size
    document.documentElement.style.setProperty('--ion-font-size-button', sizes.button);
    
    // Set list item text size
    document.documentElement.style.setProperty('--ion-font-size-list', sizes.base);
    
    // Set input text size
    document.documentElement.style.setProperty('--ion-font-size-input', sizes.base);
    
    // Set toast text size
    document.documentElement.style.setProperty('--ion-font-size-toast', sizes.base);
    
    // Set alert text size
    document.documentElement.style.setProperty('--ion-font-size-alert', sizes.base);
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

  const handleBackupData = async () => {
    try {
      const data = {
        medications: JSON.parse(localStorage.getItem('medications') || '[]'),
        schedule: JSON.parse(localStorage.getItem('schedule') || '[]'),
        settings: {
          theme,
          fontSize,
          daltonization,
          dataRetention
        }
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pharmacube_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setToastMessage('Data backup successful!');
      setShowBackupToast(true);
    } catch (error) {
      console.error('Error backing up data:', error);
      setToastMessage('Error backing up data');
      setShowBackupToast(true);
    }
  };

  const handleRestoreData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          
          // Restore medications
          if (data.medications) {
            localStorage.setItem('medications', JSON.stringify(data.medications));
          }
          
          // Restore schedule
          if (data.schedule) {
            localStorage.setItem('schedule', JSON.stringify(data.schedule));
          }
          
          // Restore settings
          if (data.settings) {
            setTheme(data.settings.theme || theme);
            setFontSize(data.settings.fontSize || fontSize);
            setDaltonization(data.settings.daltonization || daltonization);
            setDataRetention(data.settings.dataRetention || dataRetention);
          }
          
          setToastMessage('Data restored successfully!');
          setShowRestoreToast(true);
        } catch (error) {
          console.error('Error parsing backup file:', error);
          setToastMessage('Error restoring data: Invalid backup file');
          setShowRestoreToast(true);
        }
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('Error reading backup file:', error);
      setToastMessage('Error restoring data');
      setShowRestoreToast(true);
    }
  };

  const handleClearData = () => {
    try {
      localStorage.clear();
      setToastMessage('All data cleared successfully!');
      setShowClearToast(true);
      // Reset to default settings
      setTheme('light');
      setFontSize('medium');
      setDaltonization('');
      setDataRetention('forever');
    } catch (error) {
      console.error('Error clearing data:', error);
      setToastMessage('Error clearing data');
      setShowClearToast(true);
    }
  };

  return (
    <IonPage className={`${daltonization} daltonization-active ${highContrastMode ? 'high-contrast' : ''}`}>
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
                      <IonSelectOption value="#00A878">Default (Teal)</IonSelectOption>
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
                  <IonIcon icon={eyeOutline} className="section-icon" />
                  <h2>Accessibility</h2>
                </div>
                <IonList className="settings-list">
                  <IonItem className="settings-item">
                    <IonIcon icon={eyeOutline} slot="start" />
                    <IonLabel>Color Enhancement</IonLabel>
                    <IonSelect
                      value={daltonization}
                      onIonChange={(e) => setDaltonization(e.detail.value)}
                    >
                      <IonSelectOption value="">None</IonSelectOption>
                      <IonSelectOption value="protanopia-daltonization">Protanopia Enhancement</IonSelectOption>
                      <IonSelectOption value="deuteranopia-daltonization">Deuteranopia Enhancement</IonSelectOption>
                      <IonSelectOption value="tritanopia-daltonization">Tritanopia Enhancement</IonSelectOption>
                      <IonSelectOption value="general-daltonization">General Color Enhancement</IonSelectOption>
                    </IonSelect>
                  </IonItem>

                  <IonItem className="settings-item">
                    <IonIcon icon={contrastOutline} slot="start" />
                    <IonLabel>High Contrast Mode</IonLabel>
                    <IonToggle
                      checked={highContrastMode}
                      onIonChange={(e) => handleHighContrastChange(e.detail.checked)}
                    />
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>

            <IonCard className="settings-card">
              <IonCardContent>
                <div className="section-header">
                  <IonIcon icon={saveOutline} className="section-icon" />
                  <h2>Data Management</h2>
                </div>
                <IonList className="settings-list">
                  <IonItem className="settings-item">
                    <IonIcon icon={cloudDownloadOutline} slot="start" />
                    <IonLabel>Backup Data</IonLabel>
                    <IonButton fill="clear" onClick={handleBackupData}>
                      Backup
                    </IonButton>
                  </IonItem>
                  
                  <IonItem className="settings-item">
                    <IonIcon icon={cloudUploadOutline} slot="start" />
                    <IonLabel>Restore Data</IonLabel>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleRestoreData}
                      style={{ display: 'none' }}
                      id="restore-file-input"
                    />
                    <IonButton fill="clear" onClick={() => document.getElementById('restore-file-input')?.click()}>
                      Restore
                    </IonButton>
                  </IonItem>

                  <IonItem className="settings-item">
                    <IonIcon icon={timeOutline} slot="start" />
                    <IonLabel>Data Retention</IonLabel>
                    <IonSelect
                      value={dataRetention}
                      onIonChange={(e) => setDataRetention(e.detail.value)}
                    >
                      <IonSelectOption value="7days">7 Days</IonSelectOption>
                      <IonSelectOption value="30days">30 Days</IonSelectOption>
                      <IonSelectOption value="90days">90 Days</IonSelectOption>
                      <IonSelectOption value="forever">Forever</IonSelectOption>
                    </IonSelect>
                  </IonItem>

                  <IonItem className="settings-item">
                    <IonIcon icon={trashOutline} slot="start" />
                    <IonLabel>Clear All Data</IonLabel>
                    <IonButton fill="clear" color="danger" onClick={() => setShowClearDataAlert(true)}>
                      Clear
                    </IonButton>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </div>
        </div>

        <IonAlert
          isOpen={showClearDataAlert}
          onDidDismiss={() => setShowClearDataAlert(false)}
          header="Clear All Data"
          message="Are you sure you want to clear all data? This action cannot be undone."
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => setShowClearDataAlert(false)
            },
            {
              text: 'Clear',
              role: 'destructive',
              handler: handleClearData
            }
          ]}
        />

        <IonToast
          isOpen={showBackupToast}
          onDidDismiss={() => setShowBackupToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
        />

        <IonToast
          isOpen={showRestoreToast}
          onDidDismiss={() => setShowRestoreToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
        />

        <IonToast
          isOpen={showClearToast}
          onDidDismiss={() => setShowClearToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;