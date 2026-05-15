import { AssetSymbol } from '../types';
import { useStore } from '../store/useStore';

interface SimulationData {
  time: string;
  price: number;
  volume: number;
}

class MarketService {
  private intervals: Record<string, NodeJS.Timeout> = {};
  private isLive: boolean = false;

  async fetchRealPrice(asset: AssetSymbol): Promise<{price: number, volume: number} | null> {
    try {
      // Map AssetSymbol to Binance symbols
      const symbolMap: Record<string, string> = {
        'BTC': 'BTCUSDT',
        'ETH': 'ETHUSDT',
        'WTI': 'OILUSDT', // Note: Simple mapping, usually requires specific CFD/Future api
        'GOLD': 'PAXGUSDT' // Using PAXG as a proxy for Gold on Binance
      };

      const symbol = symbolMap[asset];
      if (!symbol) return null;

      const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      return {
        price: parseFloat(data.lastPrice),
        volume: parseFloat(data.volume)
      };
    } catch (error) {
      console.warn(`Failed to fetch real price for ${asset}, falling back to simulation:`, error);
      return null;
    }
  }

  async startSimulation(asset: AssetSymbol) {
    this.stopSimulation();
    
    // Check if we can get real data
    const realData = await this.fetchRealPrice(asset);
    const basePrice = realData?.price || (asset === 'BTC' ? 64000 : 
                     asset === 'ETH' ? 3400 : 
                     asset === 'GOLD' ? 2380 : 83);
    
    this.isLive = !!realData;
    useStore.getState().setDataSource(this.isLive ? 'LIVE' : 'SIMULATED');
    
    const volatility = asset === 'BTC' ? 500 : 
                      asset === 'ETH' ? 50 : 
                      asset === 'GOLD' ? 20 : 2;

    // Initial fill with historical data (simulated for now, could use binance klines)
    const initialData: SimulationData[] = Array.from({ length: 50 }).map((_, i) => ({
      time: `${i}:00`,
      price: basePrice + (Math.random() - 0.5) * (volatility * (this.isLive ? 0.1 : 1)),
      volume: (realData?.volume || 1000) / 24 / 60 // Roughly estimate volume per min
    }));
    
    useStore.getState().setMarketData(initialData);

    // Dynamic updates
    this.intervals['simulation'] = setInterval(async () => {
      let nextPrice: number;
      let nextVolume: number;

      if (this.isLive) {
        const live = await this.fetchRealPrice(asset);
        if (live) {
          nextPrice = live.price;
          nextVolume = live.volume / 1440; // Approx volume for 1 min
        } else {
          const lastPrice = useStore.getState().marketData.slice(-1)[0]?.price || basePrice;
          nextPrice = lastPrice + (Math.random() - 0.5) * (volatility / 10);
          nextVolume = Math.random() * 100;
        }
      } else {
        const lastPrice = useStore.getState().marketData.slice(-1)[0]?.price || basePrice;
        const change = (Math.random() - 0.5) * (volatility / 5);
        nextPrice = lastPrice + change;
        nextVolume = Math.random() * 1000;
      }

      useStore.getState().updatePrice(nextPrice, nextVolume);
      
      // Randomly add AI insights
      if (Math.random() > 0.98) {
        const events = [
          `CẢNH BÁO: Biến động ${asset} được ghi nhận tại thị trường quốc tế.`,
          `DỮ LIỆU: Khối lượng giao dịch ${asset} thay đổi liên tục.`,
          `THÔNG TIN: Chỉ số kỹ thuật của ${asset} đang được MIRO phân tích.`,
          `QUÉT MẠNG: OSINT phát hiện luồng giao dịch đáng chú ý cho ${asset}.`
        ];
        useStore.getState().addAIInsight(events[Math.floor(Math.random() * events.length)]);
      }
    }, 3000); // Slower updates to respect API limits
  }

  stopSimulation() {
    Object.values(this.intervals).forEach(clearInterval);
    this.intervals = {};
  }
}

export const marketService = new MarketService();
