import { Globe, TrendingUp, TrendingDown, Minus, Share2, Map as MapIcon, Activity } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'motion/react';

export default function GlobalIntelligence() {
  const { globalSentiment } = useStore();

  return (
    <div className="h-full bg-panel-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,210,255,0.02),transparent)] pointer-events-none" />
      
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Globe className="w-3 h-3 text-brand-primary" />
          <h2 className="panel-title">GLOBAL_INTEL [OSINT_MATRIX]</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-brand-primary/5 border border-brand-primary/30">
           <div className="w-1 h-1 rounded-full bg-brand-primary animate-pulse" />
           <span className="text-[7px] font-black text-brand-primary uppercase tracking-widest">LIVE_SYNC</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-5 bg-panel-bg/40">
        {/* Geographic Sentiment Scan */}
        <div className="relative aspect-[21/9] bg-black/60 rounded-sm border border-white/5 flex items-center justify-center overflow-hidden group">
           <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:15px_15px]" />
           
           <div className="relative z-10 flex flex-col items-center gap-2">
             <MapIcon className="w-8 h-8 text-brand-primary/20 group-hover:text-brand-primary/40 transition-colors" />
             <div className="text-center">
               <span className="text-[8px] font-black tracking-[0.3em] text-brand-primary block mb-0.5 uppercase">Geospatial_Neural_Field</span>
               <span className="text-[6px] text-gray-700 uppercase font-black">Triangulating Capital Velocity...</span>
             </div>
           </div>

           {/* Dynamic Nodes */}
           {[
             { top: '25%', left: '20%', color: 'bg-brand-primary' },
             { top: '40%', left: '70%', color: 'bg-brand-risk' },
             { top: '65%', left: '40%', color: 'bg-brand-accent' },
           ].map((point, i) => (
             <motion.div 
               key={i}
               animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
               transition={{ duration: 4 + i, repeat: Infinity }}
               className={`absolute w-3 h-3 rounded-full ${point.color} blur-[2px]`}
               style={{ top: point.top, left: point.left }}
             />
           ))}
        </div>

        {/* Sentiment Grid */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
             <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">Segment_Analysis</span>
             <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {globalSentiment.map((node) => (
              <div key={node.asset} className="bg-black/40 border border-white/5 p-2.5 rounded-sm flex flex-col gap-2 hover:border-brand-primary/20 transition-all cursor-crosshair group">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black tracking-widest text-white/80 group-hover:text-brand-primary">{node.asset}</span>
                  {node.momentum === 'UP' ? <TrendingUp className="w-2.5 h-2.5 text-brand-primary" /> : 
                   node.momentum === 'DOWN' ? <TrendingDown className="w-2.5 h-2.5 text-brand-risk" /> : 
                   <Minus className="w-2.5 h-2.5 text-gray-700" />}
                </div>

                <div className="relative h-1 bg-white/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.abs(node.score)}%` }}
                    className={`absolute h-full ${node.score >= 0 ? 'bg-brand-primary' : 'bg-brand-risk'} shadow-[0_0_8px_currentColor]`}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-[7px] font-black tracking-tight ${node.score > 0 ? 'text-brand-primary/60' : 'text-brand-risk/60'}`}>
                    {Math.abs(node.score)}%_FLUX
                  </span>
                  <div className="flex gap-0.5">
                     <div className="w-0.5 h-1.5 bg-brand-primary/40" />
                     <div className="w-0.5 h-1.5 bg-brand-primary/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intel Log */}
        <div className="p-3 bg-brand-primary/[0.03] border-l border-brand-primary/30 space-y-2">
           <div className="flex items-center gap-2">
              <Share2 className="w-3 h-3 text-brand-primary" />
              <span className="text-[7px] font-black text-brand-primary uppercase tracking-[0.2em]">OSINT_SYNTHESIS</span>
           </div>
           <p className="text-[9px] text-[#E2E8F0] leading-relaxed font-medium italic opacity-70">
              "ETF_Flows detected $4.2B decoupling in Asian session. Prepare for volatility expansion."
           </p>
        </div>
      </div>

      <div className="p-2 bg-black border-t border-card-border flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_#00D2FF]" />
            <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">Scanning_Active</span>
         </div>
         <Activity className="w-2.5 h-2.5 text-brand-primary/20" />
      </div>
    </div>
  );
}
