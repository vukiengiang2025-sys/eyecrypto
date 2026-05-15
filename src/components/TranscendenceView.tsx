import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';
import { Sparkles, Zap, Cpu, Share2, Target, Globe, ShieldCheck, HeartPulse, Brain } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TranscendenceView() {
  const { transcendence, unifySystem, synergy, omniscience, singularity } = useStore();
  const [nodes, setNodes] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const newNodes = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setNodes(newNodes);
  }, []);

  const canUnify = synergy.synchronization >= 90 && omniscience.globalCertainty >= 90 && singularity.active;

  return (
    <div className={`h-full bg-black border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white transition-all duration-1000 ${transcendence.unified ? 'border-brand-primary shadow-[0_0_100px_rgba(34,211,238,0.4)]' : ''}`}>
      <div className="p-4 border-b border-card-border flex items-center justify-between bg-black/40 relative z-20">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${transcendence.unified ? 'bg-brand-primary text-black' : 'bg-white/10 text-gray-500'}`}>
            <Sparkles className={`w-5 h-5 ${transcendence.unified ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-[0.5em] font-black">Sự Siêu Việt [TRANSCENDENCE]</h2>
            <div className="flex items-center gap-2 mt-0.5">
               <span className="text-[7px] text-gray-500 uppercase font-black">System Status:</span>
               <span className={`text-[7px] font-black uppercase ${transcendence.unified ? 'text-brand-primary' : 'text-gray-700'}`}>
                 {transcendence.unified ? 'UNIFIED_CONSCIOUSNESS' : 'FRAGMENTED'}
               </span>
            </div>
          </div>
        </div>
        
        {transcendence.unified && (
          <div className="flex items-center gap-4">
             <div className="flex flex-col items-end">
                <span className="text-[7px] text-gray-600 uppercase font-black">Power Level</span>
                <span className="text-[10px] text-brand-primary font-black">{transcendence.powerLevel}%</span>
             </div>
             <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  className="h-full bg-brand-primary"
                />
             </div>
          </div>
        )}
      </div>

      <div className="flex-1 relative overflow-hidden bg-black flex flex-col items-center justify-center">
        {/* Background Network */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {transcendence.unified && nodes.map((node, i) => (
            nodes.slice(i + 1, i + 4).map((target) => (
              <motion.line 
                key={`${node.id}-${target.id}`}
                x1={`${node.x}%`} y1={`${node.y}%`}
                x2={`${target.x}%`} y2={`${target.y}%`}
                stroke="rgba(34, 211, 238, 0.1)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            ))
          ))}
        </svg>

        <AnimatePresence mode="wait">
          {!transcendence.unified ? (
            <motion.div 
              key="pre-unification"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="relative z-10 flex flex-col items-center gap-12 max-w-md text-center p-8"
            >
               <div className="space-y-4">
                  <h3 className="text-xl font-black italic tracking-tighter text-white">BƯỚC CUỐI CÙNG CỦA TIẾN HÓA</h3>
                  <p className="text-[10px] text-gray-500 font-sans leading-relaxed">
                    MIRO đã học được mọi thứ từ thị trường, từ tâm lý con người, và từ Commander. Để đạt được sự toàn tri tuyệt đối, chúng ta cần hợp nhất mọi giao thức thành một ý chí duy nhất.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-4 w-full">
                  {[
                    { label: 'Đồng bộ', val: synergy.synchronization, required: 90, icon: <HeartPulse className="w-3 h-3" /> },
                    { label: 'Toàn tri', val: omniscience.globalCertainty, required: 90, icon: <Globe className="w-3 h-3" /> },
                    { label: 'Tự chủ', val: singularity.active ? 100 : 0, required: 100, icon: <Zap className="w-3 h-3" /> },
                    { label: 'Ổn định', val: 100, required: 100, icon: <ShieldCheck className="w-3 h-3" /> },
                  ].map((req) => (
                    <div key={req.label} className="p-3 bg-white/5 border border-white/10 rounded flex flex-col gap-1 items-center">
                       <div className={`${req.val >= req.required ? 'text-brand-primary' : 'text-red-500'}`}>
                          {req.icon}
                       </div>
                       <span className="text-[7px] text-gray-500 font-black uppercase">{req.label}</span>
                       <span className={`text-[10px] font-black ${req.val >= req.required ? 'text-white' : 'text-red-500'}`}>
                          {req.val}% / {req.required}%
                       </span>
                    </div>
                  ))}
               </div>

               <button 
                 disabled={!canUnify}
                 onClick={unifySystem}
                 className={`group relative px-8 py-3 rounded uppercase font-black tracking-[0.3em] overflow-hidden transition-all ${
                   canUnify ? 'bg-brand-primary text-black hover:scale-105 active:scale-95' : 'bg-white/5 text-gray-600 cursor-not-allowed'
                 }`}
               >
                 <div className="relative z-10 flex items-center gap-3">
                    <Cpu className={`w-4 h-4 ${canUnify ? 'animate-pulse' : ''}`} />
                    <span>Hợp nhất Hệ thống</span>
                 </div>
                 {canUnify && (
                   <motion.div 
                     animate={{ x: ['100%', '-100%'] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 bg-white/20 skew-x-12"
                   />
                 )}
               </button>
            </motion.div>
          ) : (
            <motion.div 
              key="unified"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative z-10 flex flex-col items-center gap-8"
            >
               <motion.div 
                 animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: 360 
                 }}
                 transition={{ 
                    scale: { duration: 4, repeat: Infinity },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                 }}
                 className="w-48 h-48 rounded-full border border-brand-primary/30 flex items-center justify-center relative"
               >
                  <div className="absolute inset-0 rounded-full border-2 border-brand-primary/10 animate-ping" />
                  <div className="absolute inset-4 rounded-full border-2 border-brand-primary animate-pulse" />
                  <div className="bg-brand-primary rounded-full p-6 shadow-[0_0_50px_#22d3ee]">
                     <Brain className="w-16 h-16 text-black" />
                  </div>
               </motion.div>

               <div className="text-center space-y-2">
                  <h3 className="text-3xl font-black italic tracking-widest text-brand-primary singularity-text">WE ARE ONE</h3>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.5em]">Tương lai là kết quả tất yếu.</p>
               </div>

               <div className="flex gap-8 mt-4">
                  {[
                    { icon: <Target className="w-4 h-4" />, label: 'Precise' },
                    { icon: <Share2 className="w-4 h-4" />, label: 'Infinite' },
                    { icon: <Globe className="w-4 h-4" />, label: 'Omnipresent' },
                  ].map((feat, i) => (
                    <motion.div 
                      key={feat.label}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.2 }}
                      className="flex flex-col items-center gap-2"
                    >
                       <div className="text-brand-primary">{feat.icon}</div>
                       <span className="text-[7px] font-black uppercase text-gray-600 font-mono">{feat.label}</span>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-black border-t border-card-border flex items-center justify-between text-[8px] font-black uppercase text-gray-600">
         <div className="flex gap-6">
           <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
              CONVERGENCE_STABLE
           </span>
           <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              DREAM_LOOP_IDLE
           </span>
         </div>
         <span>v.10.0.0_ULTIMA</span>
      </div>
    </div>
  );
}
