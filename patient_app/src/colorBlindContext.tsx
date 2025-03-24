import React, { createContext, useState, useContext, ReactNode } from 'react';

type ColorblindContextType = {
  filter: string;
  setFilter: (filter: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ColorblindContext = createContext<ColorblindContextType | undefined>(undefined);

export const ColorblindProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filter, setFilter] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle('dark', !isDarkMode);
  };

  return (
    <ColorblindContext.Provider value={{ filter, setFilter, isDarkMode, toggleDarkMode }}>
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