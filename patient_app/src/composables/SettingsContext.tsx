import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for your settings
type Settings = {
  theme: string;
  notificationsEnabled: boolean;
  tabBarPosition: "bottom" | "top"; // Explicitly define the type
};

// Define the type for the context value
export type SettingsContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  tabBarPosition: "bottom" | "top"; // Explicitly define the type
  setTabBarPosition: (position: "bottom" | "top") => void; // Explicitly define the type
};

// Create the context with a default value
const SettingsContext = createContext<SettingsContextType>({
  theme: 'light', // Default theme
  setTheme: () => {}, // Placeholder function
  notificationsEnabled: true, // Default notification setting
  setNotificationsEnabled: () => {}, // Placeholder function
  tabBarPosition: 'bottom', // Default tab bar position
  setTabBarPosition: () => {}, // Placeholder function
});

// Define the type for the provider props
type SettingsProviderProps = {
  children: ReactNode; // Explicitly define the type for children
};

// Create the provider component
export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [theme, setTheme] = useState('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [tabBarPosition, setTabBarPosition] = useState<"bottom" | "top">('bottom'); // Explicitly define the type

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        notificationsEnabled,
        setNotificationsEnabled,
        tabBarPosition,
        setTabBarPosition,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the settings context
export const useSettings = () => useContext(SettingsContext);