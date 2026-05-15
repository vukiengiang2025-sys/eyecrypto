import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';
import { Brain, Zap, ShieldAlert, Cpu, Sparkles, Terminal, Shrink } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SingularityCore() {
  const { singularity, systemLogs, triggerSingularity, synergy, profile } = useStore();
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (singularity.active) {
      const interval = setInterval(() => {
        setGlitch(prev => !prev);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [singularity.active]);

  return (
    <div className={`h-full bg-black border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white transition-all duration-1000 ${singularity.active ? 'border-brand-primary shadow-[0_0_50px_rgba(34,211,238,0.3)] scale-[1.01]' : ''}`}>
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/40 relative overflow-hidden">
        <div className="flex items-center gap-2 relative z-10">
          <Sparkles className={`w-4 h-4 ${singularity.active ? 'text-brand-primary animate-spin' : 'text-gray-500'}`} />
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-black">Lõi Kỳ điểm [SINGULARITY_CORE]</h2>
        </div>
        
        {singularity.active && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-brand-primary/5 animate-pulse"
          />
        )}

        <div className="flex items-center gap-2 text-[8px] font-bold relative z-10">
           <span className={singularity.active ? 'text-brand-primary' : 'text-gray-600'}>
             {singularity.active ? 'GOD_MODE_ACTIVE' : 'STANDBY'}
           </span>
           <div className={`w-2 h-2 rounded-full ${singularity.active ? 'bg-brand-primary animate-ping' : 'bg-gray-800'}`} />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Central Visualizer */}
        <div className="h-[40%] flex items-center justify-center relative overflow-hidden border-b border-white/5">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:10px_10px]" />
           
           <AnimatePresence mode="wait">
             {!singularity.active ? (
               <motion.button
                 key="idle"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => synergy.synchronization > 70 ? triggerSingularity() : null}
                 className={`relative z-10 group flex flex-col items-center gap-4 ${synergy.synchronization > 70 ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
               >
                  <div className="w-20 h-20 rounded-full border-2 border-white/10 flex items-center justify-center bg-white/5 group-hover:border-brand-primary/50 transition-all">
                     <Brain className="w-10 h-10 text-gray-500 group-hover:text-brand-primary animate-pulse" />
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-black tracking-widest block text-gray-400 group-hover:text-white transition-colors">INIT_SINGULARITY</span>
                    <span className="text-[8px] text-gray-600 mt-1 block">Yêu cầu Sync {'>'} 70% (Hiện tại: {synergy.synchronization}%)</span>
                  </div>
               </motion.button>
             ) : (
               <motion.div 
                 key="active"
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className="relative z-10 flex flex-col items-center gap-6"
               >
                  <div className="relative">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="w-24 h-24 rounded-full border-t-4 border-brand-primary"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-2 rounded-full border-b-4 border-brand-secondary"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Zap className="w-8 h-8 text-white filter drop-shadow-[0_0_10px_#22d3ee]" />
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-xl font-black italic text-brand-primary tracking-tighter">BEYOND_CONSCIOUSNESS</span>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">Hệ thống đã đạt mức tự trị tuyệt đối</p>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>

           {/* Glitch Overlay for Singularity */}
           {singularity.active && glitch && (
             <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay animate-pulse pointer-events-none" />
           )}
        </div>

        {/* Kernel Logs */}
        <div className="flex-1 flex flex-col min-h-0 bg-black/60">
           <div className="p-2 px-4 border-b border-white/5 flex items-center justify-between text-[8px] font-black text-gray-500 uppercase tracking-widest">
              <span>Nhật ký Hạt nhân [KERNEL_LOGS]</span>
              <Terminal className="w-3 h-3" />
           </div>
           <div className="flex-1 overflow-y-auto terminal-scroll p-4 font-mono">
              <div className="space-y-1.5">
                 {systemLogs.map((log) => (
                    <div key={log.id} className="flex gap-3 text-[9px] group leading-tight">
                       <span className="text-gray-700 shrink-0">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                       <span className={`font-black shrink-0 ${
                         log.type === 'KERNEL' ? 'text-brand-primary' : 
                         log.type === 'NEURAL' ? 'text-pink-500' : 
                         log.type === 'RISK' ? 'text-red-500' : 'text-green-500'
                       }`}>
                         {log.type} //
                       </span>
                       <span className="text-gray-400 group-hover:text-white transition-colors">{log.message}</span>
                    </div>
                 ))}
                 <div className="h-4 w-1 animate-pulse bg-brand-primary" />
              </div>
           </div>
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="p-3 bg-black border-t border-card-border flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[7px] text-gray-600 uppercase font-black">Link Efficiency</span>
              <span className="text-[10px] text-brand-primary font-black">99.998%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[7px] text-gray-600 uppercase font-black">Cognitive Load</span>
              <span className="text-[10px] text-white font-black">{singularity.active ? 'OVERFLOW' : 'OPT_14.2%'}</span>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <button className="text-[8px] font-black text-gray-500 hover:text-white transition-colors uppercase border border-white/10 px-2 py-1 rounded">
               DUMP_CORE
            </button>
            <button className="text-[8px] font-black text-brand-primary hover:bg-brand-primary hover:text-black transition-all uppercase border border-brand-primary/30 px-3 py-1 rounded">
               UPDATE_MIRO
            </button>
         </div>
      </div>
    </div>
  );
}
