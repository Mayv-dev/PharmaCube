import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for your settings
type Settings = {
  theme: string;
};

// Define the type for the context value
export type SettingsContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

// Create the context with a default value
const SettingsContext = createContext<SettingsContextType>({
  theme: 'light', // Default theme
  setTheme: () => {}, // Placeholder function
});

// Define the type for the provider props
type SettingsProviderProps = {
  children: ReactNode; // Explicitly define the type for children
};

// Create the provider component
export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [theme, setTheme] = useState('light');

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};