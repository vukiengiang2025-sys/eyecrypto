export interface MarketData {
  time: string;
  price: number;
  volume: number;
}

export type AssetSymbol = 'WTI' | 'BTC' | 'ETH' | 'GOLD';

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
