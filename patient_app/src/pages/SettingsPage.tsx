import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useColorblindFilter } from "../colorBlindContext"; // Import the colorblind context
import { useSettings } from "../composables/SettingsContext"; // Import the settings context
import "./SettingsPage.css";

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [theme, setTheme] = useState<string>("light");
  const { filter, setFilter } = useColorblindFilter(); // Use the colorblind filter context
  const { tabBarPosition, setTabBarPosition } = useSettings(); // Use the settings context for tab bar position

  // Function to toggle dark mode
  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    document.body.classList.toggle("dark", enabled);

    // Update Ionic's CSS variables for dark mode
    if (enabled) {
      document.body.setAttribute("color-theme", "dark");
    } else {
      document.body.setAttribute("color-theme", "light");
    }
  };

  // Function to handle theme change
  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    toggleDarkMode(selectedTheme === "dark");
  };

  return (
    <IonPage className={filter}> {/* Apply the selected colorblind filter */}
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {/* Theme Selection */}
          <IonItem>
            <IonLabel>Theme</IonLabel>
            <IonSelect
              value={theme}
              placeholder="Select Theme"
              onIonChange={(e) => handleThemeChange(e.detail.value)}
            >
              <IonSelectOption value="light">Light</IonSelectOption>
              <IonSelectOption value="dark">Dark</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* Notifications Toggle */}
          <IonItem>
            <IonLabel>Enable Notifications</IonLabel>
            <IonToggle
              checked={notificationsEnabled}
              onIonChange={(e) => setNotificationsEnabled(e.detail.checked)}
            />
          </IonItem>

          {/* Colorblind Filter Selector */}
          <IonItem>
            <IonLabel>Colorblind Filter</IonLabel>
            <IonSelect
              value={filter}
              placeholder="Select Colorblind Filter"
              onIonChange={(e) => setFilter(e.detail.value)} // Update the global filter state
            >
              <IonSelectOption value="">None</IonSelectOption>
              <IonSelectOption value="protanopia-filter">Protanopia</IonSelectOption>
              <IonSelectOption value="deuteranopia-filter">Deuteranopia</IonSelectOption>
              <IonSelectOption value="tritanopia-filter">Tritanopia</IonSelectOption>
              <IonSelectOption value="achromatopsia-filter">Achromatopsia</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* Tab Bar Position Selector */}
          <IonItem>
            <IonLabel>Tab Bar Position</IonLabel>
            <IonSelect
              value={tabBarPosition}
              placeholder="Select Tab Bar Position"
              onIonChange={(e) => setTabBarPosition(e.detail.value)} // Update the global tab bar position
            >
              <IonSelectOption value="bottom">Bottom</IonSelectOption>
              <IonSelectOption value="top">Top</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;