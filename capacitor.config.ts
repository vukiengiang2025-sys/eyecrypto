import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sentient.trading.system',
  appName: 'Hệ thống Giao dịch Nhận thức',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
