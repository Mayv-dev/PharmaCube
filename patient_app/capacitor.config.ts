import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pharmacube.patient',
  appName: 'ORO Patient',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "none",
      showSpinner: false,
      splashFullScreen: false,
      splashImmersive: false
    }
  }
};

export default config;
