import React from 'react';
import { useSettings } from './SettingsContext';

const withSettings = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const settings = useSettings(); // Get settings from the context
    return <WrappedComponent {...props} settings={settings} />; // Pass settings as a prop
  };
};

export default withSettings;