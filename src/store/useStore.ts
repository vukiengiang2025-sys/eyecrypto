import { create } from 'zustand';
import { MarketData, AssetSymbol, APICredentials, UserProfile, Order } from '../types';

const STORAGE_KEY = 'miro_trading_creds';
const PROFILE_KEY = 'miro_user_profile';

const loadCreds = (): APICredentials => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved credentials');
    }
  }
  return {
    okxKey: '',
    okxSecret: '',
    okxPassphrase: '',
    binanceKey: '',
    binanceSecret: '',
    geminiKey: '',
    geminiSecret: '',
  };
};

const loadProfile = (): UserProfile => {
  const saved = localStorage.getItem(PROFILE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse profile');
    }
  }
  return {
    name: 'COMMANDER',
    avatarColor: '#22d3ee',
    rank: 'NOVICE',
    preferredAssets: ['BTC', 'WTI']
  };
};

interface PortfolioState {
  balance: number;
  assets: Record<string, number>;
  pnlPercentage: number;
  orders: Order[];
}

interface AppStore {
  // User Profile
  profile: UserProfile;
  setProfile: (profile: Partial<UserProfile>) => void;
  // Credentials
  credentials: APICredentials;
  setCredentials: (creds: APICredentials) => void;

  // Market State
  selectedAsset: AssetSymbol;
  marketData: MarketData[];
  latency: string;
  buffer: string;
  dataSource: 'LIVE' | 'SIMULATED';
  setDataSource: (source: 'LIVE' | 'SIMULATED') => void;
  setSelectedAsset: (asset: AssetSymbol) => void;
  setMarketData: (data: MarketData[]) => void;
  updatePrice: (price: number, volume: number) => void;

  // Portfolio State
  portfolio: PortfolioState;
  executeTrade: (order: Omit<Order, 'id' | 'timestamp' | 'status'>) => void;
  updatePortfolio: (updates: Partial<PortfolioState>) => void;

  // AI State
  aiInsights: string[];
  addAIInsight: (insight: string) => void;
}

export const useStore = create<AppStore>((set) => ({
  profile: loadProfile(),
  setProfile: (updates) => set((state) => {
    const newProfile = { ...state.profile, ...updates };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
    return { profile: newProfile };
  }),

  credentials: loadCreds(),
  setCredentials: (creds) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(creds));
    set({ credentials: creds });
  },

  selectedAsset: 'WTI',
  marketData: [],
  latency: '4ms',
  buffer: '100%',
  dataSource: 'SIMULATED',
  
  setDataSource: (source) => set({ dataSource: source }),
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
  
  setMarketData: (data) => set({ marketData: data }),
  
  updatePrice: (price, volume) => set((state) => {
    const newPoint = {
      time: new Date().toLocaleTimeString(),
      price,
      volume
    };
    const newData = [...state.marketData.slice(1), newPoint];
    return { marketData: newData };
  }),

  portfolio: {
    balance: 500000.00,
    assets: {
      BTC: 1.25,
      ETH: 12.4,
      WTI: 500,
      GOLD: 25.5
    },
    pnlPercentage: 14.2,
    orders: []
  },

  executeTrade: (tradeData) => set((state) => {
    const newOrder: Order = {
      ...tradeData,
      id: `TRD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      timestamp: Date.now(),
      status: 'COMPLETED'
    };

    const cost = tradeData.price * tradeData.amount;
    const newBalance = tradeData.type === 'BUY' 
      ? state.portfolio.balance - cost 
      : state.portfolio.balance + cost;

    const assetChange = tradeData.type === 'BUY' ? tradeData.amount : -tradeData.amount;
    const newAssetAmount = (state.portfolio.assets[tradeData.asset] || 0) + assetChange;

    return {
      portfolio: {
        ...state.portfolio,
        balance: newBalance,
        assets: {
          ...state.portfolio.assets,
          [tradeData.asset]: newAssetAmount
        },
        orders: [newOrder, ...state.portfolio.orders]
      }
    };
  }),

  updatePortfolio: (updates) => set((state) => ({
    portfolio: { ...state.portfolio, ...updates }
  })),

  aiInsights: [
    "HỆ THỐNG TRỰC TUYẾN: Lõi nhận thức Miro-Sentient đã khởi tạo.",
    "QUÉT DỮ LIỆU: Đang đồng bộ hóa với thị trường toàn cầu...",
    "BẢO MẬT: Kết nối đã được mã hóa. Chào mừng trở lại, Chỉ huy."
  ],

  addAIInsight: (insight) => set((state) => ({
    aiInsights: [insight, ...state.aiInsights.slice(0, 19)]
  }))
}));
