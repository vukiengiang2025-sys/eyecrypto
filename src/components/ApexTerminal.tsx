import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Target, Activity, TrendingUp, Brain, Users, Globe, Zap, Cpu, AlertTriangle } from 'lucide-react';

export default function ApexTerminal() {
  const { apexDirective, aiAnalysis } = useStore();

  if (!aiAnalysis) return null;

  const getSubColor = (score: number) => {
    if (score > 80) return 'text-green-500';
    if (score > 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white">
      <div className="p-4 border-b border-card-border flex items-center justify-between bg-brand-primary/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-primary rounded-lg text-black">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-widest font-black">Chỉ thị APEX [MASTER_DIRECTIVE]</h2>
            <div className="flex items-center gap-2 mt-0.5">
               <span className="text-[8px] text-brand-primary uppercase font-bold px-1.5 py-0.5 bg-brand-primary/10 rounded">Protocol: SEN-72</span>
               <div className="flex items-center gap-1 text-[8px] text-gray-500">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span>CONCORD_STABLE</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-6 space-y-10">
        {/* Main Score & Consensus */}
        <div className="flex items-center gap-8">
           <div className="relative w-24 h-24 shrink-0">
              <svg className="w-full h-full -rotate-90">
                 <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                 <motion.circle 
                    cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="6" 
                    fill="transparent" className="text-brand-primary"
                    strokeDasharray={2 * Math.PI * 44}
                    initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                    animate={{ strokeDashoffset: (2 * Math.PI * 44) * (1 - apexDirective.score / 100) }}
                    transition={{ duration: 2, ease: "easeOut" }}
                 />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-2xl font-black">{apexDirective.score}</span>
                 <span className="text-[7px] text-gray-500 uppercase tracking-tighter">Apex Score</span>
              </div>
           </div>

           <div className="flex-1 space-y-3">
              <div className="space-y-1">
                 <span className="text-[9px] text-gray-500 uppercase font-black">Trạng thái Đồng thuận</span>
                 <h3 className={`text-2xl font-black italic tracking-widest ${
                   apexDirective.consensus === 'STRIKE' ? 'text-green-500' : 
                   apexDirective.consensus === 'DEFEND' ? 'text-red-500' : 'text-yellow-500'
                 }`}>
                   [ {apexDirective.consensus} ]
                 </h3>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                 <p className="text-[10px] text-gray-400 italic font-sans leading-relaxed">
                   "{aiAnalysis.directive}"
                 </p>
              </div>
           </div>
        </div>

        {/* Intelligence Pillars */}
        <div className="grid grid-cols-2 gap-4">
           {[
             { label: 'Thị trường (Market)', score: apexDirective.subDirectives.market, icon: <Activity className="w-3 h-3" /> },
             { label: 'Tâm lý (Psychology)', score: apexDirective.subDirectives.psychology, icon: <Brain className="w-3 h-3" /> },
             { label: 'Chiến trường (Battlefield)', score: apexDirective.subDirectives.battlefield, icon: <Zap className="w-3 h-3" /> },
             { id: 'global', label: 'Toàn cầu (Global)', score: apexDirective.subDirectives.global, icon: <Globe className="w-3 h-3" /> },
           ].map((pillar) => (
             <div key={pillar.label} className="p-3 bg-black/40 border border-white/5 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      {pillar.icon}
                      <span className="text-[8px] font-black uppercase text-gray-500 tracking-wider font-sans">{pillar.label}</span>
                   </div>
                   <span className={`text-[10px] font-black ${getSubColor(pillar.score)}`}>{pillar.score}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${pillar.score}%` }}
                     className={`h-full ${getSubColor(pillar.score).replace('text-', 'bg-')}`}
                   />
                </div>
             </div>
           ))}
        </div>

        {/* Final Execution Safeguard */}
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex gap-4 items-center">
           <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
           <div className="space-y-1">
             <span className="text-[10px] font-black text-red-500 uppercase">Phân tích rủi ro cuối cùng</span>
             <p className="text-[9px] text-gray-400 font-sans leading-tight">
               Xác suất thất bại dựa trên nhiễu OSINT: <span className="text-red-400 font-bold">12.4%</span>. 
               Hệ thống MIRO khuyến nghị mức đòn bẩy không quá 5x trong bối cảnh này.
             </p>
           </div>
        </div>
      </div>

      <div className="p-4 bg-black border-t border-card-border flex items-center justify-between">
         <div className="flex gap-4">
           <div className="flex flex-col">
              <span className="text-[7px] text-gray-600 uppercase font-bold">Latency</span>
              <span className="text-[10px] text-brand-primary font-black">2.4ms</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[7px] text-gray-600 uppercase font-bold">Trust Index</span>
              <span className="text-[10px] text-green-500 font-black">0.998</span>
           </div>
         </div>
         <button className="bg-brand-primary text-black text-[9px] font-black px-4 py-2 rounded uppercase hover:bg-white transition-colors flex items-center gap-2">
           <Cpu className="w-3 h-3" />
           FORCE_EXECUTE
         </button>
      </div>
    </div>
  );
}
