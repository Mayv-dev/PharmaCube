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
import { useColorblindFilter } from "../colorBlindContext";
import { useSettings } from "../composables/SettingsContext";
import "./SettingsPage.css";

const SettingsPage: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<string>("medium");
  const [accentColor, setAccentColor] = useState<string>("#66d6c3"); // Default accent color
  const [appLayout, setAppLayout] = useState<string>("list");

  const { filter, setFilter, isDarkMode, toggleDarkMode } = useColorblindFilter();
  const { tabBarPosition, setTabBarPosition } = useSettings();

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    const fontSizeMap = {
      small: "14px",
      medium: "16px",
      large: "18px",
    };
    document.documentElement.style.setProperty("--ion-font-size", fontSizeMap[size]);
  };

  const handleAccentColorChange = (color: string) => {
    setAccentColor(color);

    // Update the primary color variable
    document.documentElement.style.setProperty("--ion-color-primary", color);

    // Calculate contrast color (white or black) based on the brightness of the accent color
    const brightness = Math.round(
      (parseInt(color.slice(1, 3), 16) * 299 +
        parseInt(color.slice(3, 5), 16) * 587 +
        parseInt(color.slice(5, 7), 16) * 114) /
        1000
    );
    const contrastColor = brightness > 125 ? "#000000" : "#ffffff";
    document.documentElement.style.setProperty("--ion-color-primary-contrast", contrastColor);

    // Update shade and tint (optional, based on your design)
    const shade = `#${(parseInt(color.slice(1, 3), 16) - 20).toString(16)}${(
      parseInt(color.slice(3, 5), 16) - 20
    ).toString(16)}${(parseInt(color.slice(5, 7), 16) - 20).toString(16)}`;
    const tint = `#${(parseInt(color.slice(1, 3), 16) + 20).toString(16)}${(
      parseInt(color.slice(3, 5), 16) + 20
    ).toString(16)}${(parseInt(color.slice(5, 7), 16) + 20).toString(16)}`;
    document.documentElement.style.setProperty("--ion-color-primary-shade", shade);
    document.documentElement.style.setProperty("--ion-color-primary-tint", tint);
  };

  const handleAppLayoutChange = (layout: string) => {
    setAppLayout(layout);
  };

  return (
    <IonPage className={filter}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="settings-container">
        <div className="settings-form">
          <h2 className="settings-title">Settings</h2>
          <IonList>
            <IonItem>
              <IonLabel>Enable Dark Mode</IonLabel>
              <IonToggle
                checked={isDarkMode}
                onIonChange={toggleDarkMode}
              />
            </IonItem>

            <IonItem>
              <IonLabel>Enable Notifications</IonLabel>
              <IonToggle
                checked={notificationsEnabled}
                onIonChange={(e) => setNotificationsEnabled(e.detail.checked)}
              />
            </IonItem>

            <IonItem>
              <IonLabel>Colorblind Filter</IonLabel>
              <IonSelect
                value={filter}
                placeholder="Select Colorblind Filter"
                onIonChange={(e) => setFilter(e.detail.value)}
              >
                <IonSelectOption value="">None</IonSelectOption>
                <IonSelectOption value="protanopia-filter">Protanopia</IonSelectOption>
                <IonSelectOption value="deuteranopia-filter">Deuteranopia</IonSelectOption>
                <IonSelectOption value="tritanopia-filter">Tritanopia</IonSelectOption>
                <IonSelectOption value="achromatopsia-filter">Achromatopsia</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Tab Bar Position</IonLabel>
              <IonSelect
                value={tabBarPosition}
                placeholder="Select Tab Bar Position"
                onIonChange={(e) => setTabBarPosition(e.detail.value as "bottom" | "top")}
              >
                <IonSelectOption value="bottom">Bottom</IonSelectOption>
                <IonSelectOption value="top">Top</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Font Size</IonLabel>
              <IonSelect
                value={fontSize}
                placeholder="Select Font Size"
                onIonChange={(e) => handleFontSizeChange(e.detail.value)}
              >
                <IonSelectOption value="small">Small</IonSelectOption>
                <IonSelectOption value="medium">Medium</IonSelectOption>
                <IonSelectOption value="large">Large</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Accent Color</IonLabel>
              <IonSelect
                value={accentColor}
                placeholder="Select Accent Color"
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;