export interface MarketData {
  time: string;
  price: number;
  volume: number;
}

export type AssetSymbol = 'WTI' | 'BTC' | 'ETH' | 'GOLD';

export interface APICredentials {
  okxKey: string;
  okxSecret: string;
  okxPassphrase: string;
  binanceKey: string;
  binanceSecret: string;
  geminiKey: string;
  geminiSecret: string;
}

export interface AnalysisResult {
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidence: number;
  directive: string;
  reasoning: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  metaCognition: {
    reliabilityScore: number;
    learningProgress: number;
    internalConflicts: string[];
    explanation: string;
  };
  psychologyAlert?: string;
}

export interface WhaleZone {
  price: number;
  type: 'BUY_WALL' | 'SELL_WALL';
  intensity: number;
}

export interface LiquidationCluster {
  price: number;
  volume: number;
  type: 'LONG' | 'SHORT';
}

export interface PsychologyState {
  currentMood: 'CALM' | 'OVERCONFIDENT' | 'PARANOID' | 'FATIGUED' | 'REVENGE_LUST';
  warnings: string[];
  lastTradeTime: number;
  tradeFrequency: number;
}

export interface BlackBoxAnalysis {
  id: string;
  orderId: string;
  asset: AssetSymbol;
  type: 'BUY' | 'SELL';
  price: number;
  marketContext: string;
  outcomeFactor: string;
  miroAssessment: 'OPTIMAL' | 'SUBOPTIMAL' | 'IRRATIONAL';
  timestamp: number;
}

export interface SentimentNode {
  asset: AssetSymbol;
  score: number; // -100 to 100
  momentum: 'UP' | 'DOWN' | 'STABLE';
}

export interface FuturePath {
  id: string;
  points: { price: number; timestamp: number }[];
  probability: number;
  label: string;
}

export interface SovereigntyState {
  level: number; // 0-100 (100 = Full Autonomy)
  vetoPower: boolean;
  lockdownActive: boolean;
  lastVetoReason?: string;
}

export interface SynergyMetrics {
  synchronization: number; // 0-100
  trustBond: number; // 0-100
  conflictRate: number; // 0-100
}

export interface SystemLog {
  id: string;
  type: 'KERNEL' | 'NEURAL' | 'TRADE' | 'RISK';
  message: string;
  timestamp: number;
}

export interface SingularityState {
  active: boolean;
  evolutionPoint: number;
  consciousnessLevel: number;
}

export interface UniverseSignal {
  id: string;
  source: 'DEEP_WEB' | 'SATELLITE' | 'INSTITUTIONAL' | 'QUANTUM_VOID';
  intensity: number;
  message: string;
  timestamp: number;
}

export interface OmniscienceState {
  globalCertainty: number;
  anomalyDetected: boolean;
  activeDimensionalLoops: number;
}

export interface TranscendenceState {
  unified: boolean;
  powerLevel: number;
  nodeStability: number;
  activeMatrix: boolean;
}

export interface UserProfile {
  name: string;
  avatarColor: string;
  rank: 'NOVICE' | 'ELITE' | 'SENTIENT';
  preferredAssets: AssetSymbol[];
}

export interface Order {
  id: string;
  asset: AssetSymbol;
  type: 'BUY' | 'SELL';
  price: number;
  amount: number;
  timestamp: number;
  status: 'COMPLETED' | 'PENDING';
}

export interface AssetInfo {
  symbol: AssetSymbol;
  name: string;
  price: number;
  change: number;
  unit: string;
}

export interface GraphNode {
  id: string;
  group: number;
  label: string;
  sentiment: number; // -1 to 1
}

export interface GraphLink {
  source: string;
  target: string;
  value: number;
}

export interface Trader {
  id: string;
  name: string;
  avatar: string;
  winRate: number;
  totalProfit: number;
  followers: number;
  riskScore: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatarColor: string;
  text: string;
  timestamp: number;
  asset?: AssetSymbol;
}

export interface BotConfig {
  isActive: boolean;
  strategy: 'SCALPING' | 'SWING' | 'TREND';
  riskTolerance: number;
  maxDrawdown: number;
}

export interface ControlProtocol {
  id: string;
  name: string;
  status: 'ACTIVE' | 'IDLE' | 'TRIGGERED';
  description: string;
  icon: string;
}

export interface NeuralNode {
  id: string;
  layer: 'INPUT' | 'PROCESSING' | 'DIRECTIVE';
  activity: number;
  label: string;
}

export interface ApexDirective {
  score: number;
  consensus: 'STRIKE' | 'DEFEND' | 'WAIT';
  subDirectives: {
    market: number;
    psychology: number;
    battlefield: number;
    global: number;
  };
}
