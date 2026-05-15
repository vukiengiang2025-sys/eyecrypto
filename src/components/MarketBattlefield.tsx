import { useMemo } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Crosshair, ShieldIcon, Target, AlertCircle, Zap, TrendingDown, TrendingUp } from 'lucide-react';

export default function MarketBattlefield() {
  const { marketData, selectedAsset } = useStore();
  const currentPrice = marketData.length > 0 ? marketData[marketData.length - 1].price : 0;

  // Simulate battlefield data based on current price
  const battlefield = useMemo(() => {
    const zones = [];
    const liquidations = [];
    
    // Sell walls above
    zones.push({ price: currentPrice * 1.02, type: 'SELL_WALL', intensity: 0.8 });
    zones.push({ price: currentPrice * 1.05, type: 'SELL_WALL', intensity: 0.95 });
    
    // Buy walls below
    zones.push({ price: currentPrice * 0.98, type: 'BUY_WALL', intensity: 0.75 });
    zones.push({ price: currentPrice * 0.95, type: 'BUY_WALL', intensity: 0.9 });
    
    // Liquidation clusters
    liquidations.push({ price: currentPrice * 0.97, volume: 1.2, type: 'LONG' });
    liquidations.push({ price: currentPrice * 1.03, volume: 0.8, type: 'SHORT' });

    return { zones, liquidations };
  }, [currentPrice]);

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-brand-secondary" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold text-white">Vùng Chiến sự Thị trường (BATTLEFIELD)</h2>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
          <span className="text-[8px] text-brand-secondary uppercase font-bold">Quét OSINT Theo thời gian thực</span>
        </div>
      </div>

      <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-repeat">
        {/* Radar Scanner Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ y: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-full h-[2px] bg-brand-secondary/30 shadow-[0_0_15px_rgba(129,140,248,0.5)] z-10"
          />
        </div>

        <div className="p-4 space-y-6 relative z-0">
          {/* Legend */}
          <div className="flex gap-4 text-[8px] uppercase">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-sm" />
              <span className="text-gray-500">Tường Bán (Whale)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-sm" />
              <span className="text-gray-500">Tường Mua (Whale)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 border border-brand-secondary rounded-sm" />
              <span className="text-gray-500">Vùng Thanh lý</span>
            </div>
          </div>

          {/* Visual Zones */}
          <div className="space-y-4">
            {battlefield.zones.map((zone, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[9px]">
                  <span className={zone.type === 'SELL_WALL' ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>
                    {zone.type === 'SELL_WALL' ? 'TƯỜNG BÁN' : 'TƯỜNG MUA'} :: ${zone.price.toFixed(2)}
                  </span>
                  <span className="text-gray-600">Cường độ: {(zone.intensity * 100).toFixed(0)}%</span>
                </div>
                <div className="h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${zone.intensity * 100}%` }}
                    className={`h-full ${zone.type === 'SELL_WALL' ? 'bg-red-500' : 'bg-green-500'}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Liquidations */}
          <div className="bg-black/40 border border-white/5 rounded p-3 space-y-3">
             <div className="flex items-center gap-2 mb-1">
               <Zap className="w-3 h-3 text-brand-secondary" />
               <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Cụm Thanh lý (Liquidation Clouds)</span>
             </div>
             
             <div className="space-y-2">
               {battlefield.liquidations.map((liq, i) => (
                 <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded border-l-2 border-brand-secondary">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white font-bold">${liq.price.toFixed(2)}</span>
                      <span className="text-[8px] text-gray-500 uppercase">Khối lượng: {liq.volume}M USD</span>
                    </div>
                    <div className={`text-[8px] font-bold px-2 py-0.5 rounded ${liq.type === 'LONG' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {liq.type === 'LONG' ? 'LONG_EXIT' : 'SHORT_SQUEEZE'}
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-brand-secondary/5 border-t border-card-border flex items-center gap-3">
        <ShieldIcon className="w-4 h-4 text-brand-secondary shrink-0" />
        <p className="text-[9px] text-gray-400 leading-tight">
          Hệ thống đang mô phỏng các vùng tập trung thanh khoản. MIRO-SENTIENT khuyên bạn nên đặt Stop Loss ngoài các vùng đỏ.
        </p>
      </div>
    </div>
  );
}
