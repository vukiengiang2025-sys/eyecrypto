import { create } from 'zustand';
import { MarketData, AssetSymbol, APICredentials } from '../types';

const STORAGE_KEY = 'miro_trading_creds';

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

interface PortfolioState {
  balance: number;
  pnl: number;
  pnlPercentage: number;
}

interface AppStore {
  // Credentials
  credentials: APICredentials;
  setCredentials: (creds: APICredentials) => void;

  // Market State
  selectedAsset: AssetSymbol;
  marketData: MarketData[];
  latency: string;
  buffer: string;
  setSelectedAsset: (asset: AssetSymbol) => void;
  setMarketData: (data: MarketData[]) => void;
  updatePrice: (price: number, volume: number) => void;

  // Portfolio State
  portfolio: PortfolioState;
  updatePortfolio: (updates: Partial<PortfolioState>) => void;

  // AI State
  aiInsights: string[];
  addAIInsight: (insight: string) => void;
}

export const useStore = create<AppStore>((set) => ({
  credentials: loadCreds(),
  setCredentials: (creds) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(creds));
    set({ credentials: creds });
  },

  selectedAsset: 'WTI',
  marketData: [],
  latency: '4ms',
  buffer: '100%',
  
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
    balance: 587420.44,
    pnl: 74200.12,
    pnlPercentage: 14.2
  },

  updatePortfolio: (updates) => set((state) => ({
    portfolio: { ...state.portfolio, ...updates }
  })),

  aiInsights: [
    "KÊNH ĐÀO SUEZ: PHÁT HIỆN CỤM TẮC NGHẼN. +12 tàu.",
    "NHẬN ĐỊNH: BIẾN ĐỘNG GIẢM MẠNH TẠI EU_NATGAS.",
    "TIN TỨC: RÒ RỈ CUỘC HỌP OPEC+ GỢI Ý GIỮ NGUYÊN HẠN NGẠCH.",
  ],

  addAIInsight: (insight) => set((state) => ({
    aiInsights: [insight, ...state.aiInsights.slice(0, 19)]
  }))
}));
