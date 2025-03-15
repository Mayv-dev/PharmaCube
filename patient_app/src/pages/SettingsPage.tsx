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
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [theme, setTheme] = useState<string>("light");
  const [fontSize, setFontSize] = useState<string>("medium");
  const [language, setLanguage] = useState<string>("en");
  const [accentColor, setAccentColor] = useState<string>("default");
  const [appLayout, setAppLayout] = useState<string>("list");

  const { filter, setFilter } = useColorblindFilter();
  const { tabBarPosition, setTabBarPosition } = useSettings();

  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    document.body.classList.toggle("dark", enabled);
    document.body.setAttribute("color-theme", enabled ? "dark" : "light");
  };

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    toggleDarkMode(selectedTheme === "dark");
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    document.body.style.fontSize = size === "small" ? "14px" : size === "medium" ? "16px" : "18px";
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const handleAccentColorChange = (color: string) => {
    setAccentColor(color);
    document.documentElement.style.setProperty("--ion-color-primary", color);
  };

  const handleAppLayoutChange = (layout: string) => {
    setAppLayout(layout);
  };

  return (
    <IonPage className={filter}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="settings-container">
        <div className="settings-form">
          <h2 className="settings-title">Settings</h2>
          <IonList>
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
              <IonLabel>Language</IonLabel>
              <IonSelect
                value={language}
                placeholder="Select Language"
                onIonChange={(e) => handleLanguageChange(e.detail.value)}
              >
                <IonSelectOption value="en">English</IonSelectOption>
                <IonSelectOption value="es">Spanish</IonSelectOption>
                <IonSelectOption value="fr">French</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Theme</IonLabel>
              <IonSelect
                value={accentColor}
                placeholder="Select Accent Color"
                onIonChange={(e) => handleAccentColorChange(e.detail.value)}
              >
                <IonSelectOption value="default">Default</IonSelectOption>
                <IonSelectOption value="#3880ff">Blue</IonSelectOption>
                <IonSelectOption value="#ff5722">Orange</IonSelectOption>
                <IonSelectOption value="#4caf50">Green</IonSelectOption>
              </IonSelect>
            </IonItem>

            
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;