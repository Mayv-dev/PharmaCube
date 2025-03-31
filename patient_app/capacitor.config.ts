import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tiao.pharmacube',
  appName: 'PharmaCube Patient',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorFingerprintAuth: {}
  }
};

export default config;
