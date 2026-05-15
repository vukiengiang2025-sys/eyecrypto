import { AssetSymbol } from '../types';
import { useStore } from '../store/useStore';

class MarketService {
  private intervals: Record<string, NodeJS.Timeout> = {};

  startSimulation(asset: AssetSymbol) {
    this.stopSimulation();
    
    const store = useStore.getState();
    const basePrice = asset === 'BTC' ? 64000 : 
                     asset === 'ETH' ? 3400 : 
                     asset === 'GOLD' ? 2380 : 83;
    
    const volatility = asset === 'BTC' ? 500 : 
                      asset === 'ETH' ? 50 : 
                      asset === 'GOLD' ? 20 : 2;

    // Initial fill
    const initialData = Array.from({ length: 50 }).map((_, i) => ({
      time: `${i}:00`,
      price: basePrice + (Math.random() - 0.5) * volatility,
      volume: Math.random() * 1000
    }));
    
    useStore.getState().setMarketData(initialData);

    // Dynamic updates
    this.intervals['simulation'] = setInterval(() => {
      const lastPrice = useStore.getState().marketData.slice(-1)[0]?.price || basePrice;
      const change = (Math.random() - 0.5) * (volatility / 5);
      useStore.getState().updatePrice(lastPrice + change, Math.random() * 1000);
      
      // Randomly add AI insights
      if (Math.random() > 0.95) {
        const events = [
          `CẢNH BÁO: Biến động ${asset} vượt ngưỡng 2%`,
          `TIN TỨC: Khối lượng giao dịch ${asset} tăng vọt`,
          `NHẬN ĐỊNH: Chỉ số RSI của ${asset} đi vào vùng quá mua`,
          `OSINT: Hoạt động ví cá voi ${asset} được phát hiện`
        ];
        useStore.getState().addAIInsight(events[Math.floor(Math.random() * events.length)]);
      }
    }, 1000);
  }

  stopSimulation() {
    Object.values(this.intervals).forEach(clearInterval);
    this.intervals = {};
  }
}

export const marketService = new MarketService();
