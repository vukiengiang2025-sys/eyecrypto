import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Activity, Brain, AlertCircle, Zap, Coffee, Skull, HeartPulse, ShieldAlert } from 'lucide-react';

const MOOD_DATA = {
  CALM: { icon: <Coffee className="w-6 h-6" />, color: 'text-green-500', label: 'TĨNH LẶNG (ZEN)', desc: 'Tâm lý ổn định. Bạn đang giao dịch bằng lý trí.' },
  OVERCONFIDENT: { icon: <Zap className="w-6 h-6" />, color: 'text-yellow-500', label: 'QUÁ TỰ TIN', desc: 'Cảnh báo: Bạn vừa thắng chuỗi lệnh. Đừng để cái tôi điều khiển vị thế.' },
  PARANOID: { icon: <HeartPulse className="w-6 h-6" />, color: 'text-purple-500', label: 'HOANG MANG', desc: 'Nhịp tim cao. Bạn đang sợ hãi thị trường. Hãy tạm nghỉ.' },
  FATIGUED: { icon: <ShieldAlert className="w-6 h-6" />, color: 'text-blue-500', label: 'KIỆT SỨC', desc: 'Đã quá lâu chưa nghỉ ngơi. Độ chính xác đang giảm dần.' },
  REVENGE_LUST: { icon: <Skull className="w-6 h-6" />, color: 'text-red-500', label: 'TRẢ THÙ THỊ TRƯỜNG', desc: 'NGUY HIỂM: Bạn đang cố gỡ lỗ. Hệ thống MIRO sẽ tự động khóa nếu cần.' },
};

export default function PsychologyDashboard() {
  const { psychology } = useStore();
  const mood = MOOD_DATA[psychology.currentMood];

  return (
    <div className="h-full bg-panel-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,210,255,0.02),transparent)] pointer-events-none" />
      
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Brain className="w-3 h-3 text-brand-primary" />
          <h2 className="panel-title">PSYCHO_METRICS [BIO_SYNC]</h2>
        </div>
        <div className="flex items-center gap-2 px-2 py-0.5 bg-brand-primary/5 border border-brand-primary/20 rounded-sm">
           <HeartPulse className="w-2.5 h-2.5 text-brand-primary animate-pulse" />
           <span className="text-[7px] font-black text-brand-primary uppercase tracking-widest">72_BPM</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-6 bg-panel-bg/40">
        {/* State Visualizer */}
        <div className="flex flex-col items-center py-4 relative group">
           <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <div className="w-24 h-24 rounded-full border border-brand-primary animate-spin-slow" />
              <div className="absolute w-20 h-20 rounded-full border border-brand-primary/20 animate-reverse-spin" />
           </div>
           
           <motion.div 
             animate={{ scale: [1, 1.05, 1] }}
             transition={{ duration: 4, repeat: Infinity }}
             className={`mb-4 relative z-10 ${mood.color}`}
           >
             {mood.icon}
           </motion.div>
           
           <div className="text-center relative z-10">
             <h3 className={`text-[11px] font-black uppercase tracking-[0.3em] mb-1.5 ${mood.color}`}>{mood.label}</h3>
             <p className="text-[9px] text-[#E2E8F0] opacity-60 leading-relaxed font-medium italic max-w-[200px] mx-auto">
               "{mood.desc}"
             </p>
           </div>
        </div>

        {/* Neural Parameters */}
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">Avarice_Index</span>
              <span className="text-[9px] font-black text-brand-risk">64.0%</span>
            </div>
            <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-brand-risk/60 w-[64%] shadow-[0_0_8px_#FF0055]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">Cognitive_Focus</span>
              <span className="text-[9px] font-black text-brand-primary">89.2%</span>
            </div>
            <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-brand-primary/60 w-[89%] shadow-[0_0_8px_#00D2FF]" />
            </div>
          </div>
        </div>

        {/* System Warnings */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 opacity-40">
            <Activity className="w-2.5 h-2.5 text-brand-accent" />
            <span className="text-[7px] font-black text-white uppercase tracking-[0.2em]">BEHAVIORAL_LOGS</span>
          </div>
          <div className="p-3 bg-black/40 border-l border-brand-accent/40 rounded-sm space-y-1.5">
             <div className="flex items-center gap-2 text-brand-accent">
               <AlertCircle className="w-2.5 h-2.5" />
               <span className="text-[8px] font-black uppercase tracking-widest">High_Velocity_detected</span>
             </div>
             <p className="text-[8px] text-gray-500 font-medium leading-tight">
               5 orders executed within [10m]. Risk of overtrading detected in behavioral stream.
             </p>
          </div>
        </div>

        {/* Cognitive Advice */}
        <div className="p-3 bg-brand-primary/[0.03] border border-brand-primary/10 rounded-sm flex gap-3 items-start group">
           <Zap className="w-4 h-4 text-brand-primary shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
           <div className="space-y-1">
             <span className="text-[8px] font-black text-brand-primary uppercase tracking-widest">Miro_Protocol: "Zen_Recalibration"</span>
             <p className="text-[8px] text-[#A0AEC0] italic leading-relaxed opacity-80">
               Decouple from stream for [15m]. BIO_SYNC data suggests performance degradation.
             </p>
           </div>
        </div>
      </div>
      
      <div className="p-2 bg-black border-t border-card-border flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_#00D2FF]" />
            <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">Neurometric_Link_Active</span>
         </div>
         <Activity className="w-2.5 h-2.5 text-brand-primary/20" />
      </div>
    </div>
  );
}
