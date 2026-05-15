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

export interface Trade {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  price: number;
  amount: number;
  time: string;
  status: 'filled' | 'pending' | 'canceled';
}
