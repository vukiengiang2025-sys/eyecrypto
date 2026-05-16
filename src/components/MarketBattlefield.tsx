import { useMemo } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Crosshair, ShieldIcon, Target, Zap } from 'lucide-react';

export default function MarketBattlefield() {
  const { marketData } = useStore();
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
    <div className="h-full bg-panel-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(0,210,255,0.02),transparent)] pointer-events-none" />
      
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Target className="w-3 h-3 text-brand-primary" />
          <h2 className="panel-title">THE_BATTLEFIELD [ORDER_FLOW_HEATMAP]</h2>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
           <span className="text-[7px] font-black text-brand-primary uppercase tracking-[0.2em]">RADAR_ACTIVE</span>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-panel-bg/40">
        {/* Radar Scanner Effect */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <motion.div 
            animate={{ y: ['0%', '100%', '0%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="w-full h-[1px] bg-brand-primary/20 shadow-[0_0_15px_#00D2FF]"
          />
        </div>

        <div className="absolute inset-0 p-4 space-y-6 overflow-y-auto terminal-scroll">
          {/* Tactical Legend */}
          <div className="flex gap-4 border-b border-white/5 pb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-brand-risk rounded-full" />
              <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">Resistance Wall</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
              <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">Support Core</span>
            </div>
          </div>

          {/* Conflict Zones Grid */}
          <div className="grid grid-cols-1 gap-4">
            {battlefield.zones.map((zone, i) => (
              <div key={i} className="group cursor-crosshair">
                <div className="flex justify-between items-end mb-1.5">
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-black tracking-widest ${zone.type === 'SELL_WALL' ? 'text-brand-risk' : 'text-brand-primary'}`}>
                      {zone.type === 'SELL_WALL' ? 'WALL_SELL' : 'WALL_BUY'}
                    </span>
                    <span className="text-[8px] text-gray-700 font-bold tracking-tighter uppercase">Signal_Locked :: ${zone.price.toFixed(2)}</span>
                  </div>
                  <span className="text-[8px] font-black text-white/40 tracking-widest">INTENSITY: {(zone.intensity * 100).toFixed(0)}%</span>
                </div>
                <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${zone.intensity * 100}%` }}
                    className={`h-full ${zone.type === 'SELL_WALL' ? 'bg-brand-risk' : 'bg-brand-primary'} shadow-[0_0_8px_currentColor]`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Liquidation Events */}
          <div className="space-y-3 pt-2">
             <div className="flex items-center gap-2 opacity-40">
                <Zap className="w-2.5 h-2.5 text-brand-primary" />
                <span className="text-[7px] font-black text-white uppercase tracking-[0.3em]">LIQUIDATION_CLUSTERS</span>
             </div>
             
             <div className="grid grid-cols-1 gap-2">
               {battlefield.liquidations.map((liq, i) => (
                 <div key={i} className="flex items-center justify-between p-3 bg-black/40 border border-white/5 rounded-sm hover:border-brand-primary/20 transition-all group overflow-hidden relative">
                    <div className="absolute inset-0 bg-brand-primary/[0.02] group-hover:bg-brand-primary/[0.05] transition-all" />
                    <div className="flex items-center gap-4 relative z-10">
                       <Crosshair className="w-3 h-3 text-brand-primary opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                       <div className="flex flex-col">
                         <span className="text-[11px] text-white font-black tracking-tighter">${liq.price.toFixed(2)}</span>
                         <span className="text-[7px] text-gray-700 font-black uppercase tracking-widest">{liq.volume}M_NOTIONAL</span>
                       </div>
                    </div>
                    <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-sm relative z-10 border transition-all ${
                      liq.type === 'LONG' ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20 group-hover:bg-brand-primary group-hover:text-black' : 'bg-brand-risk/10 text-brand-risk border-brand-risk/20 group-hover:bg-brand-risk group-hover:text-white'
                    }`}>
                      {liq.type === 'LONG' ? 'LONG_EXIT' : 'SHORT_SQUEEZE'}
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-brand-primary/[0.03] border-t border-card-border flex items-center gap-3">
        <ShieldIcon className="w-3 h-3 text-brand-primary shrink-0 opacity-40" />
        <p className="text-[8px] text-gray-500 font-medium uppercase tracking-tight leading-normal">
          Heatmap reflects synthesized orderbook depth. Recommendation: Adjust stops outside of high-intensity zones to prevent invalidation.
        </p>
      </div>
    </div>
  );
}
