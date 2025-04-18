import React, { createContext, useState, useContext, ReactNode } from 'react';

type ColorblindContextType = {
  daltonization: string;
  setDaltonization: (type: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ColorblindContext = createContext<ColorblindContextType | undefined>(undefined);

export const ColorblindProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [daltonization, setDaltonization] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle('dark', !isDarkMode);
  };

  return (
    <ColorblindContext.Provider value={{ daltonization, setDaltonization, isDarkMode, toggleDarkMode }}>
      {children}
    </ColorblindContext.Provider>
  );
};

export const useColorblindFilter = () => {
  const context = useContext(ColorblindContext);
  if (!context) {
    throw new Error('useColorblindFilter must be used within a ColorblindProvider');
  }
  return context;
};