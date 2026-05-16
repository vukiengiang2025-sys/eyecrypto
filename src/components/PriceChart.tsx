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
    <div className="w-full h-full bg-panel-bg border border-card-border rounded-lg p-5 flex flex-col font-mono">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
             <div className="w-1 h-3 bg-brand-primary" />
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">{title}</h3>
          </div>
          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-2xl font-black text-white tracking-tighter">${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className={`text-[11px] font-black tracking-widest ${isUp ? 'text-brand-primary' : 'text-brand-risk'}`}>
              {isUp ? '▲' : '▼'} {((Math.abs(currentPrice - data[0]?.price || 0) / (data[0]?.price || 1)) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="flex bg-black p-1 rounded-sm border border-white/5 self-end sm:self-auto shadow-inner">
          {(['WTI', 'BTC', 'ETH', 'GOLD'] as AssetSymbol[]).map((asset) => (
            <button
              key={asset}
              onClick={() => onAssetChange(asset)}
              className={`px-4 py-1.5 rounded-[2px] text-[9px] font-black transition-all tracking-widest ${
                selectedAsset === asset 
                  ? 'bg-brand-primary text-black' 
                  : 'text-gray-600 hover:text-gray-400'
              }`}
            >
              {asset}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isUp ? "#00D2FF" : "#EF4444"} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={isUp ? "#00D2FF" : "#EF4444"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="time" 
              hide 
            />
            <YAxis 
              domain={['auto', 'auto']}
              orientation="right"
              tick={{ fontSize: 9, fill: '#4B5563', fontWeight: '900', fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0B0F14', border: '1px solid #1f2937', borderRadius: '2px', fontSize: '10px' }}
              labelStyle={{ display: 'none' }}
              itemStyle={{ color: isUp ? '#00D2FF' : '#EF4444', fontWeight: 'bold', fontFamily: 'JetBrains Mono' }}
            />
            <Area 
              type="stepAfter" 
              dataKey="price" 
              stroke={isUp ? "#00D2FF" : "#EF4444"} 
              strokeWidth={1.5}
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
