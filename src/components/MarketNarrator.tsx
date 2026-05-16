import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Volume2, Radio, Newspaper, Globe, Sparkles, MessageCircle, Activity } from 'lucide-react';

export default function MarketNarrator() {
  const { selectedAsset } = useStore();

  return (
    <div className="h-full bg-panel-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(0,210,255,0.02),transparent)] pointer-events-none" />
      
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Radio className="w-3 h-3 text-brand-accent" />
          <h2 className="panel-title">NARRATIVE_SYNTHESIS [LIVE_CONTEXT]</h2>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex gap-1 items-end h-3">
             {[...Array(5)].map((_, i) => (
               <motion.div 
                 key={i}
                 animate={{ height: ['20%', '80%', '40%', '100%', '20%'] }}
                 transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                 className="w-[2px] bg-brand-accent/40 rounded-full"
               />
             ))}
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-5 bg-panel-bg/40">
        {/* Main Intelligence Narrative */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 opacity-40">
            <Sparkles className="w-2.5 h-2.5 text-brand-primary" />
            <span className="text-[7px] font-black text-white uppercase tracking-[0.3em]">AI_SYNTHETIC_COGNITION</span>
          </div>
          
          <div className="relative group">
             <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-brand-primary/20 group-hover:bg-brand-primary/40 transition-colors" />
             <div className="pl-4 py-0.5">
               <p className="text-[11px] text-[#CBD5E0] leading-[1.6] font-medium italic opacity-90">
                 "Commander. Market structural transition detected. $4.2B decoupling event in {selectedAsset} session signifies institutional absorption. Hidden support layers stabilizing at current level. Prepare for volatility expansion."
               </p>
             </div>
          </div>
        </div>

        {/* Global OSINT Stream */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
             <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">OSINT_Global_Signal</span>
             <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <div className="space-y-2.5">
            {[
              { source: 'REUTERS', text: 'US Inflation data cools, driving risk-on sentiment.', time: '5m' },
              { source: 'BLOOMBERG', text: 'ETF Inflow cluster detected in spot instruments.', time: '12m' },
              { source: 'MIRO-CORE', text: 'Anomalous Delta variance found in primary pools.', time: '20m' },
            ].map((news, i) => (
              <div key={i} className="flex gap-4 group cursor-help">
                <div className="text-[8px] font-black text-brand-primary w-14 shrink-0 group-hover:text-white transition-colors uppercase tracking-widest">{news.source}</div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <p className="text-[10px] text-[#A0AEC0] group-hover:text-white transition-colors leading-snug">{news.text}</p>
                  <span className="text-[6px] text-gray-800 uppercase font-black tracking-tighter">TIMESTAMP_IDX::{news.time}_AGO</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Directives */}
        <div className="p-3 bg-brand-accent/[0.03] border-l border-brand-accent/30 space-y-2 rounded-sm group hover:bg-brand-accent/[0.05] transition-all">
           <div className="flex items-center gap-2">
              <MessageCircle className="w-2.5 h-2.5 text-brand-accent" />
              <span className="text-[7px] font-black text-brand-accent uppercase tracking-widest">STRATEGIC_DIRECTIVE</span>
           </div>
           <p className="text-[9px] text-[#E2E8F0] leading-relaxed font-black opacity-60">
              "Tactical scalping risk: High. Recommend swing-bias alignment due to whale cluster density."
           </p>
        </div>
      </div>

      <div className="p-2 bg-black border-t border-card-border flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_#F59E0B]" />
            <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">Neural_Synthesizer_Online</span>
         </div>
         <Activity className="w-2.5 h-2.5 text-brand-accent/20" />
      </div>
    </div>
  );
}
