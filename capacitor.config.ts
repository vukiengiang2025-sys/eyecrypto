import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sentient.trading.system',
  appName: 'Sentient Trading System',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
