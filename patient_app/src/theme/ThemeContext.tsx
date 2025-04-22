import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type ThemeContextType = {
  accentColor: string;
  setAccentColor: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get initial color from CSS variable
  const [accentColor, setAccentColor] = useState<string>(() => {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue('--ion-color-primary').trim() || '#00A878';
  });

  const updateAccentColor = (color: string) => {
    setAccentColor(color);
    // Update CSS variables
    document.documentElement.style.setProperty('--ion-color-primary', color);
    
    // Calculate contrast color based on brightness
    const brightness = Math.round(
      (parseInt(color.slice(1, 3), 16) * 299 +
        parseInt(color.slice(3, 5), 16) * 587 +
        parseInt(color.slice(5, 7), 16) * 114) /
        1000
    );
    const contrastColor = brightness > 125 ? '#000000' : '#ffffff';
    document.documentElement.style.setProperty('--ion-color-primary-contrast', contrastColor);
    
    // Calculate shade and tint
    const shade = `#${Math.max(0, parseInt(color.slice(1, 3), 16) - 20).toString(16).padStart(2, '0')}${Math.max(0, parseInt(color.slice(3, 5), 16) - 20).toString(16).padStart(2, '0')}${Math.max(0, parseInt(color.slice(5, 7), 16) - 20).toString(16).padStart(2, '0')}`;
    const tint = `#${Math.min(255, parseInt(color.slice(1, 3), 16) + 20).toString(16).padStart(2, '0')}${Math.min(255, parseInt(color.slice(3, 5), 16) + 20).toString(16).padStart(2, '0')}${Math.min(255, parseInt(color.slice(5, 7), 16) + 20).toString(16).padStart(2, '0')}`;
    
    document.documentElement.style.setProperty('--ion-color-primary-shade', shade);
    document.documentElement.style.setProperty('--ion-color-primary-tint', tint);
  };

  // Initialize the accent color on component mount
  useEffect(() => {
    updateAccentColor(accentColor);
  }, []);

  return (
    <ThemeContext.Provider value={{ accentColor, setAccentColor: updateAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 