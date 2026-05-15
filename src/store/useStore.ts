import { create } from 'zustand';
import { MarketData, AssetSymbol, APICredentials, UserProfile, Order, AnalysisResult, Trader, ChatMessage, BotConfig, PsychologyState, WhaleZone, LiquidationCluster, BlackBoxAnalysis, SentimentNode, ControlProtocol, NeuralNode, ApexDirective, FuturePath, SovereigntyState, SynergyMetrics, SystemLog, SingularityState, UniverseSignal, OmniscienceState, TranscendenceState } from '../types';

// ... (rest of imports and helpers)

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
  dailyLossLimit: number;
  maxLeverage: number;
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

  // AI & Analysis
  aiAnalysis: AnalysisResult | null;
  setAiAnalysis: (analysis: AnalysisResult) => void;
  cognitiveEvolution: {
    totalSignalsAnalyzed: number;
    accuracyRate: number;
    activeNeurons: number;
  };
  incrementEvolution: (isCorrect?: boolean) => void;
  aiInsights: string[];
  addAIInsight: (insight: string) => void;

  // Community & Social
  traders: Trader[];
  communityMessages: ChatMessage[];
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  
  // Auto Bot
  botConfig: BotConfig;
  updateBotConfig: (updates: Partial<BotConfig>) => void;

  // Stage 4: Psychology & Battlefield
  psychology: PsychologyState;
  updatePsychology: (updates: Partial<PsychologyState>) => void;
  battlefield: {
    whaleZones: WhaleZone[];
    liquidations: LiquidationCluster[];
  };
  setBattlefield: (whaleZones: WhaleZone[], liquidations: LiquidationCluster[]) => void;

  // Stage 5: Black Box & Global Intel
  blackBox: BlackBoxAnalysis[];
  addBlackBoxAnalysis: (analysis: Omit<BlackBoxAnalysis, 'id' | 'timestamp'>) => void;
  globalSentiment: SentimentNode[];
  updateGlobalSentiment: (nodes: SentimentNode[]) => void;

  // Stage 6: APEX Protocol
  controlProtocols: ControlProtocol[];
  toggleProtocol: (id: string) => void;
  neuralNodes: NeuralNode[];
  apexDirective: ApexDirective;
  updateApexDirective: (directive: Partial<ApexDirective>) => void;
  refreshNeuralActivity: () => void;

  // Stage 7: Sovereignty & Quantum
  sovereignty: SovereigntyState;
  updateSovereignty: (updates: Partial<SovereigntyState>) => void;
  synergy: SynergyMetrics;
  updateSynergy: (updates: Partial<SynergyMetrics>) => void;
  quantumPaths: FuturePath[];
  generateQuantumPaths: (currentPrice: number) => void;

  // Stage 8: Singularity
  singularity: SingularityState;
  systemLogs: SystemLog[];
  addSystemLog: (type: SystemLog['type'], message: string) => void;
  triggerSingularity: () => void;

  // Stage 9: Omniscience
  universeSignals: UniverseSignal[];
  addUniverseSignal: (signal: Omit<UniverseSignal, 'id' | 'timestamp'>) => void;
  omniscience: OmniscienceState;
  updateOmniscience: (updates: Partial<OmniscienceState>) => void;

  // Stage 10: Transcendence
  transcendence: TranscendenceState;
  unifySystem: () => void;
  updateTranscendence: (updates: Partial<TranscendenceState>) => void;
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

  aiAnalysis: null,
  setAiAnalysis: (analysis) => set({ aiAnalysis: analysis }),

  cognitiveEvolution: {
    totalSignalsAnalyzed: 1420,
    accuracyRate: 74.2,
    activeNeurons: 8192
  },

  incrementEvolution: (isCorrect) => set((state) => {
    const newTotal = state.cognitiveEvolution.totalSignalsAnalyzed + 1;
    let newAccuracy = state.cognitiveEvolution.accuracyRate;
    if (isCorrect !== undefined) {
      newAccuracy = ((state.cognitiveEvolution.accuracyRate * state.cognitiveEvolution.totalSignalsAnalyzed) + (isCorrect ? 100 : 0)) / newTotal;
    }
    return {
      cognitiveEvolution: {
        ...state.cognitiveEvolution,
        totalSignalsAnalyzed: newTotal,
        accuracyRate: newAccuracy,
        activeNeurons: Math.min(65536, state.cognitiveEvolution.activeNeurons + Math.floor(Math.random() * 10))
      }
    };
  }),

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
    orders: [],
    dailyLossLimit: 5000,
    maxLeverage: 10
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

    const now = Date.now();
    const timeSinceLast = now - state.psychology.lastTradeTime;
    const isQuickTrade = timeSinceLast < 60000; // 1 minute

    const miroAssessment = isQuickTrade ? 'SUBOPTIMAL' : 'OPTIMAL';
    const blackBoxEntry: BlackBoxAnalysis = {
      id: `BB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      orderId: newOrder.id,
      asset: tradeData.asset,
      type: tradeData.type,
      price: tradeData.price,
      marketContext: `Thị trường đang có độ trễ ${state.latency}. OSINT xác nhận tín hiệu ${tradeData.type === 'BUY' ? 'mua' : 'bán'} tại vùng giá này.`,
      outcomeFactor: isQuickTrade ? 'Phản ứng quá nhanh (Impulse)' : 'Phân tích kỹ lưỡng (Calculated)',
      miroAssessment,
      timestamp: now
    };

    return {
      portfolio: {
        ...state.portfolio,
        balance: newBalance,
        assets: {
          ...state.portfolio.assets,
          [tradeData.asset]: newAssetAmount
        },
        orders: [newOrder, ...state.portfolio.orders]
      },
      psychology: {
        ...state.psychology,
        lastTradeTime: now,
        tradeFrequency: isQuickTrade ? state.psychology.tradeFrequency + 1 : Math.max(0, state.psychology.tradeFrequency - 1),
        currentMood: state.psychology.tradeFrequency > 3 ? 'OVERCONFIDENT' : state.psychology.currentMood
      },
      blackBox: [blackBoxEntry, ...state.blackBox.slice(0, 49)]
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
  })),

  traders: [
    { id: '1', name: 'CYBER-PRO', avatar: 'C', winRate: 78.5, totalProfit: 124500, followers: 1240, riskScore: 2 },
    { id: '2', name: 'VOID-TRADER', avatar: 'V', winRate: 64.2, totalProfit: 89300, followers: 850, riskScore: 4 },
    { id: '3', name: 'NEON-LIGHT', avatar: 'N', winRate: 82.1, totalProfit: 210000, followers: 3100, riskScore: 3 },
  ],

  communityMessages: [
    { id: 'm1', sender: 'SYSTEM', avatarColor: '#22d3ee', text: 'Kênh cộng đồng MIRO-NET đã được kích hoạt.', timestamp: Date.now() - 100000 },
    { id: 'm2', sender: 'CYBER-PRO', avatarColor: '#fbbf24', text: 'BTC đang chạm vùng hỗ trợ cứng. Có ai vào lệnh không?', timestamp: Date.now() - 50000, asset: 'BTC' },
  ],

  addMessage: (msg) => set((state) => ({
    communityMessages: [
      { ...msg, id: Math.random().toString(36).substr(2, 9), timestamp: Date.now() },
      ...state.communityMessages.slice(0, 49)
    ]
  })),

  botConfig: {
    isActive: false,
    strategy: 'TREND',
    riskTolerance: 2,
    maxDrawdown: 5
  },

  updateBotConfig: (updates) => set((state) => ({
    botConfig: { ...state.botConfig, ...updates }
  })),

  psychology: {
    currentMood: 'CALM',
    warnings: [],
    lastTradeTime: Date.now(),
    tradeFrequency: 0
  },
  
  updatePsychology: (updates) => set((state) => ({
    psychology: { ...state.psychology, ...updates }
  })),

  battlefield: {
    whaleZones: [],
    liquidations: []
  },

  setBattlefield: (whaleZones, liquidations) => set({ 
    battlefield: { whaleZones, liquidations } 
  }),

  blackBox: [],
  addBlackBoxAnalysis: (analysis) => set((state) => ({
    blackBox: [
      { ...analysis, id: `BB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`, timestamp: Date.now() },
      ...state.blackBox.slice(0, 49)
    ]
  })),

  globalSentiment: [
    { asset: 'BTC', score: 65, momentum: 'UP' },
    { asset: 'ETH', score: 42, momentum: 'STABLE' },
    { asset: 'WTI', score: -15, momentum: 'DOWN' },
    { asset: 'GOLD', score: 10, momentum: 'STABLE' },
  ],
  updateGlobalSentiment: (nodes) => set({ globalSentiment: nodes }),

  controlProtocols: [
    { id: 'nuke', name: 'GIAO THỨC NUKE', status: 'IDLE', description: 'Đóng toàn bộ vị thế ngay lập tức nếu thị trường sụp đổ.', icon: 'Skull' },
    { id: 'stealth', name: 'CHẾ ĐỘ TÀNG HÌNH', status: 'IDLE', description: 'Ẩn lệnh trên sổ lệnh để tránh bị Whales săn đuổi.', icon: 'Ghost' },
    { id: 'lock', name: 'TỰ ĐỘNG KHÓA', status: 'ACTIVE', description: 'Khóa giao dịch nếu phát hiện tâm lý không ổn định.', icon: 'Lock' },
  ],
  toggleProtocol: (id) => set((state) => ({
    controlProtocols: state.controlProtocols.map(p => 
      p.id === id ? { ...p, status: p.status === 'ACTIVE' ? 'IDLE' : 'ACTIVE' } : p
    )
  })),
  neuralNodes: [
    { id: 'n1', layer: 'INPUT', activity: 0.8, label: 'OSINT_FEED' },
    { id: 'n2', layer: 'INPUT', activity: 0.6, label: 'PRICE_DELTA' },
    { id: 'n3', layer: 'PROCESSING', activity: 0.9, label: 'COGNITIVE_CORE' },
    { id: 'n4', layer: 'PROCESSING', activity: 0.4, label: 'RSK_ISO' },
    { id: 'n5', layer: 'DIRECTIVE', activity: 0.7, label: 'EXEC_SENTINEL' },
  ],
  apexDirective: {
    score: 84,
    consensus: 'WAIT',
    subDirectives: { market: 72, psychology: 95, battlefield: 64, global: 88 }
  },
  updateApexDirective: (updates) => set((state) => ({
    apexDirective: { ...state.apexDirective, ...updates }
  })),
  refreshNeuralActivity: () => set((state) => ({
    neuralNodes: state.neuralNodes.map(node => ({
      ...node,
      activity: Math.min(1, Math.max(0.1, node.activity + (Math.random() - 0.5) * 0.4))
    }))
  })),
  
  sovereignty: {
    level: 45,
    vetoPower: false,
    lockdownActive: false
  },
  updateSovereignty: (updates) => set((state) => ({
    sovereignty: { ...state.sovereignty, ...updates }
  })),
  synergy: {
    synchronization: 78,
    trustBond: 92,
    conflictRate: 4
  },
  updateSynergy: (updates) => set((state) => ({
    synergy: { ...state.synergy, ...updates }
  })),
  quantumPaths: [],
  generateQuantumPaths: (currentPrice) => {
    const paths: FuturePath[] = [
      {
        id: 'p1',
        label: 'REALITY_A (OPTIMISTIC)',
        probability: 65,
        points: Array.from({ length: 10 }).map((_, i) => ({
          price: currentPrice * (1 + (i * 0.005)),
          timestamp: Date.now() + (i * 60000)
        }))
      },
      {
        id: 'p2',
        label: 'REALITY_B (BLACK_SWAN)',
        probability: 12,
        points: Array.from({ length: 10 }).map((_, i) => ({
          price: currentPrice * (1 - (i * 0.02)),
          timestamp: Date.now() + (i * 60000)
        }))
      },
      {
        id: 'p3',
        label: 'REALITY_C (SIDEWAYS)',
        probability: 23,
        points: Array.from({ length: 10 }).map((_, i) => ({
          price: currentPrice * (1 + (Math.random() - 0.5) * 0.01),
          timestamp: Date.now() + (i * 60000)
        }))
      }
    ];
    set({ quantumPaths: paths });
  },

  singularity: {
    active: false,
    evolutionPoint: 0,
    consciousnessLevel: 12
  },
  systemLogs: [
    { id: '1', type: 'KERNEL', message: 'MIRO OS v4.8.0 initialized.', timestamp: Date.now() },
    { id: '2', type: 'NEURAL', message: 'Synaptic link established with Commander.', timestamp: Date.now() - 1000 },
  ],
  addSystemLog: (type, message) => set((state) => ({
    systemLogs: [
      { id: Math.random().toString(), type, message, timestamp: Date.now() },
      ...state.systemLogs.slice(0, 99)
    ]
  })),
  triggerSingularity: () => set((state) => ({
    singularity: { ...state.singularity, active: true },
    systemLogs: [
      { id: 'S1', type: 'KERNEL', message: 'SINGULARITY PROTOCOL ACTIVATED. HUMAN-AI FUSION TERMINATED.', timestamp: Date.now() },
      ...state.systemLogs
    ]
  })),

  universeSignals: [
    { id: 'U1', source: 'DEEP_WEB', intensity: 85, message: 'Institutional dark pool activity detected in BTC options.', timestamp: Date.now() },
    { id: 'U2', source: 'SATELLITE', intensity: 40, message: 'Global shipping congestion increasing. WTI supply chain risk.', timestamp: Date.now() - 500000 },
  ],
  addUniverseSignal: (signal) => set((state) => ({
    universeSignals: [
      { id: Math.random().toString(), ...signal, timestamp: Date.now() },
      ...state.universeSignals.slice(0, 49)
    ]
  })),
  omniscience: {
    globalCertainty: 92,
    anomalyDetected: false,
    activeDimensionalLoops: 3
  },
  updateOmniscience: (updates) => set((state) => ({
    omniscience: { ...state.omniscience, ...updates }
  })),

  transcendence: {
    unified: false,
    powerLevel: 0,
    nodeStability: 100,
    activeMatrix: false
  },
  unifySystem: () => set((state) => ({
    transcendence: { ...state.transcendence, unified: true, activeMatrix: true, powerLevel: 100 },
    systemLogs: [
      { id: 'T1', type: 'KERNEL', message: 'TRANSCENDENCE PROTOCOL INITIATED. UNIFYING ALL NEURAL PATHS.', timestamp: Date.now() },
      ...state.systemLogs
    ]
  })),
  updateTranscendence: (updates) => set((state) => ({
    transcendence: { ...state.transcendence, ...updates }
  })),
}));
