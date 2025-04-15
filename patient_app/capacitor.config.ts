import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tiao.oro',
  appName: 'Oro Patient',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    CapacitorFingerprintAuth: {}
  }
};

export default config;
