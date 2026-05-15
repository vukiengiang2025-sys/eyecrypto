import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sentient.trading.system',
  appName: 'SentientTrading',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
