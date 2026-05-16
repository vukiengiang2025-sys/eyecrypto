import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Database, Zap, Brain, History, BookOpen, RefreshCw, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function MemoryLayer() {
  const { memories, memoryBank, recalibrateMemory } = useStore();

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'SUCCESS': return <CheckCircle2 className="w-3 h-3 text-green-500" />;
      case 'FAILURE': return <XCircle className="w-3 h-3 text-red-500" />;
      default: return <AlertCircle className="w-3 h-3 text-gray-500" />;
    }
  };

  return (
    <div className="h-full bg-panel-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,163,255,0.05),transparent_70%)] pointer-events-none" />

      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Database className="w-3 h-3 text-brand-primary" />
          <h2 className="panel-title">Hệ tri thức Memory [COGNITIVE_ARCHIVE]</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-brand-primary/10 border border-brand-primary/20">
           <History className="w-2.5 h-2.5 text-brand-primary" />
           <span className="text-[7px] font-black text-brand-primary tracking-widest uppercase">Syncing...</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col relative z-10 bg-panel-bg/40 backdrop-blur-sm">
        {/* Memory Holographic Stats */}
        <div className="p-4 grid grid-cols-3 gap-2 bg-black/40 border-b border-white/5">
           <div className="space-y-0.5">
              <span className="data-label">Stored Events</span>
              <div className="text-lg font-black text-white leading-none">{memoryBank.totalEntries}</div>
           </div>
           <div className="space-y-0.5">
              <span className="data-label">Optim Gain</span>
              <div className="text-lg font-black text-brand-primary leading-none">+{memoryBank.efficiencyGain.toFixed(1)}%</div>
           </div>
           <div className="flex items-center justify-end">
              <button 
                onClick={recalibrateMemory}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-black transition-all hover:scale-110 active:scale-95"
              >
                 <RefreshCw className="w-3.5 h-3.5" />
              </button>
           </div>
        </div>

        {/* Neural Strategies Timeline Accent */}
        <div className="px-4 py-3 border-b border-white/5 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
           {memoryBank.topStrategies.map(s => (
             <div key={s} className="shrink-0 px-2 py-0.5 bg-brand-primary/5 border border-brand-primary/30 rounded-sm text-[7px] font-black text-brand-primary/80 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-brand-primary animate-pulse" />
                {s}
             </div>
           ))}
        </div>

        {/* Cognitive Feed */}
        <div className="flex-1 overflow-y-auto terminal-scroll p-3 space-y-3">
           {memories.map((entry, i) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 bg-black/40 border border-white/5 rounded-sm group hover:border-brand-primary/30 transition-all cursor-crosshair relative"
              >
                 {/* Timeline Dot */}
                 <div className="absolute -left-[3.5px] top-4 w-1 h-1 rounded-full bg-white/10 group-hover:bg-brand-primary" />

                 <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                       {getOutcomeIcon(entry.outcome)}
                       <span className={`text-[7px] font-black uppercase tracking-widest ${entry.outcome === 'SUCCESS' ? 'text-brand-success' : 'text-brand-risk'}`}>{entry.outcome}</span>
                       <span className="text-[6px] text-gray-700 mx-1">|</span>
                       <span className="text-[7px] font-black uppercase text-gray-500">{entry.regime}</span>
                    </div>
                    <span className="text-[7px] text-gray-600 font-bold uppercase">{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                 </div>
                 
                 <div className="space-y-1.5">
                    <h4 className="text-[9px] font-black text-white/90 group-hover:text-white transition-colors tracking-tight leading-snug">{entry.context.toUpperCase()}</h4>
                    <div className="grid grid-cols-1 gap-1 pl-2 border-l border-white/10">
                       {entry.learnings.map((l, j) => (
                         <div key={j} className="flex items-start gap-1.5">
                            <span className="text-brand-primary text-[10px] leading-none mt-0.5">›</span>
                            <p className="text-[8px] text-gray-500 font-medium leading-relaxed group-hover:text-gray-400">{l}</p>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 max-w-[100px]">
                       <div className="h-[2px] flex-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${entry.importance}%` }}
                            className="h-full bg-brand-primary"
                          />
                       </div>
                    </div>
                    <span className="text-[7px] font-black text-gray-600 uppercase ml-2">Weight: {entry.importance}</span>
                 </div>
              </motion.div>
           ))}
        </div>
      </div>

      <div className="p-2.5 bg-black border-t border-card-border flex items-center justify-between text-[7px] font-black uppercase text-gray-600 tracking-widest">
         <div className="flex items-center gap-1.5">
            <Brain className="w-2.5 h-2.5" />
            <span>Archive Integrity: 99.8%</span>
         </div>
         <div className="flex items-center gap-1.5 text-brand-primary">
            <div className="status-dot status-active" />
            <span>Continuous Learning</span>
         </div>
      </div>
    </div>
  );
}

