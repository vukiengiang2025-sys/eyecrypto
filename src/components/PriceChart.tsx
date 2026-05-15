import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { MarketData, AssetSymbol } from '../types';

interface PriceChartProps {
  data: MarketData[];
  title: string;
  selectedAsset: AssetSymbol;
  onAssetChange: (asset: AssetSymbol) => void;
}

export default function PriceChart({ data, title, selectedAsset, onAssetChange }: PriceChartProps) {
  const currentPrice = data.length > 0 ? data[data.length - 1].price : 0;
  const prevPrice = data.length > 1 ? data[data.length - 2].price : currentPrice;
  const isUp = currentPrice >= prevPrice;

  return (
    <div className="w-full h-full bg-dashboard-bg border border-card-border rounded-lg p-4 flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div className="flex flex-col">
          <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400">{title}</h3>
          <div className="flex gap-4 text-[10px] font-mono mt-1">
            <span className="text-brand-primary">T.TIẾP: ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className={isUp ? 'text-brand-primary' : 'text-brand-secondary'}>
              {isUp ? '▲' : '▼'} {((Math.abs(currentPrice - data[0]?.price || 0) / (data[0]?.price || 1)) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="flex bg-black/40 p-1 rounded border border-white/5 self-end sm:self-auto">
          {(['WTI', 'BTC', 'ETH', 'GOLD'] as AssetSymbol[]).map((asset) => (
            <button
              key={asset}
              onClick={() => onAssetChange(asset)}
              className={`px-3 py-1 rounded text-[10px] font-mono transition-all ${
                selectedAsset === asset 
                  ? 'bg-brand-primary text-black font-bold' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {asset}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ffaa" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00ffaa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis 
              dataKey="time" 
              hide 
            />
            <YAxis 
              domain={['auto', 'auto']}
              orientation="right"
              tick={{ fontSize: 10, fill: '#6b7280', fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #1f2937', borderRadius: '4px' }}
              labelStyle={{ display: 'none' }}
              itemStyle={{ color: '#00ffaa', fontSize: '12px', fontFamily: 'JetBrains Mono' }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#00ffaa" 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
