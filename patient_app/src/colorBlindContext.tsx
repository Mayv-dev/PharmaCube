// ColorblindContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

type ColorblindContextType = {
  filter: string;
  setFilter: (filter: string) => void;
};

const ColorblindContext = createContext<ColorblindContextType | undefined>(undefined);

export const ColorblindProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filter, setFilter] = useState<string>('');

  return (
    <ColorblindContext.Provider value={{ filter, setFilter }}>
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