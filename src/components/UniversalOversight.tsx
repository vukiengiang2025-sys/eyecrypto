import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Globe, Zap, ShieldAlert, Cpu, Radio, AlertCircle, Eye, Activity } from 'lucide-react';

export default function UniversalOversight() {
  const { universeSignals, omniscience } = useStore();

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'DEEP_WEB': return 'text-purple-400';
      case 'SATELLITE': return 'text-blue-400';
      case 'INSTITUTIONAL': return 'text-yellow-400';
      case 'QUANTUM_VOID': return 'text-brand-primary';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-brand-primary animate-spin-slow" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold">Giám sát Vũ trụ [OMNISCIENCE]</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/30">
           <Eye className="w-3 h-3 text-brand-primary" />
           <span className="text-[8px] font-bold text-brand-primary">TOTAL_AWARENESS</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Global Certainty Meter */}
        <div className="p-6 bg-black/40 border-b border-white/5 flex items-center gap-8">
           <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                 <circle cx="40" cy="40" r="36" stroke="#111" strokeWidth="4" fill="transparent" />
                 <motion.circle 
                    cx="40" cy="40" r="36" stroke="#22d3ee" strokeWidth="4" 
                    fill="transparent" 
                    strokeDasharray={2 * Math.PI * 36}
                    initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                    animate={{ strokeDashoffset: (2 * Math.PI * 36) * (1 - omniscience.globalCertainty / 100) }}
                    transition={{ duration: 2 }}
                    className="filter drop-shadow-[0_0_8px_#22d3ee]"
                 />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-xl font-black">{omniscience.globalCertainty}%</span>
                 <span className="text-[6px] text-gray-500 uppercase">Certainty</span>
              </div>
           </div>

           <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="p-2 bg-white/5 rounded border border-white/5 space-y-1">
                 <span className="text-[7px] text-gray-500 uppercase font-black">Anomaly Detection</span>
                 <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${omniscience.anomalyDetected ? 'bg-red-500 animate-ping' : 'bg-green-500'}`} />
                    <span className={`text-[10px] font-bold ${omniscience.anomalyDetected ? 'text-red-500' : 'text-green-500'}`}>
                       {omniscience.anomalyDetected ? 'POSITIVE' : 'NEGATIVE'}
                    </span>
                 </div>
              </div>
              <div className="p-2 bg-white/5 rounded border border-white/5 space-y-1">
                 <span className="text-[7px] text-gray-500 uppercase font-black">Dimensional Loops</span>
                 <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-brand-primary" />
                    <span className="text-[10px] font-bold text-white">
                       {omniscience.activeDimensionalLoops} ACTIVE
                    </span>
                 </div>
              </div>
           </div>
        </div>

        {/* Signals Feed */}
        <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-4">
           {universeSignals.map((signal, i) => (
              <motion.div 
                key={signal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-3 bg-white/5 border border-white/10 rounded-lg group hover:border-brand-primary/30 transition-all"
              >
                 <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                       <Radio className={`w-3 h-3 ${getSourceColor(signal.source)}`} />
                       <span className={`text-[8px] font-black uppercase ${getSourceColor(signal.source)}`}>{signal.source}</span>
                    </div>
                    <span className="text-[7px] text-gray-600 font-bold">{new Date(signal.timestamp).toLocaleTimeString()}</span>
                 </div>
                 <p className="text-[10px] text-gray-400 group-hover:text-white transition-colors leading-relaxed">
                    {signal.message}
                 </p>
                 <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${signal.intensity}%` }}
                      className={`h-full ${signal.intensity > 70 ? 'bg-red-500' : 'bg-brand-primary'}`}
                    />
                 </div>
              </motion.div>
           ))}
        </div>
      </div>

      <div className="p-3 bg-black border-t border-card-border flex items-center justify-between text-[8px] font-black uppercase text-gray-600">
         <div className="flex items-center gap-2">
            <Cpu className="w-3 h-3" />
            <span>Scanning deep field...</span>
         </div>
         <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-brand-primary" />
            <span>Flux: 1.42 THz</span>
         </div>
      </div>
    </div>
  );
}
