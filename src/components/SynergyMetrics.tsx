import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { HeartPulse, CheckCircle2, XCircle, Zap, Activity, Info } from 'lucide-react';

export default function SynergyMetrics() {
  const { synergy } = useStore();

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-pink-500" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold">Chỉ số Hợp nhất [SYNERGY]</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/30">
           <Activity className="w-3 h-3 text-pink-500 animate-pulse" />
           <span className="text-[8px] font-bold text-pink-500">SYNC_LIVE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-6 space-y-10">
        {/* Main Sync Circle */}
        <div className="flex flex-col items-center justify-center space-y-4">
           <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90">
                 <circle cx="64" cy="64" r="60" stroke="#1e293b" strokeWidth="2" fill="transparent" />
                 {/* Human Path */}
                 <motion.circle 
                    cx="64" cy="64" r="60" stroke="#f472b6" strokeWidth="4" 
                    fill="transparent" 
                    strokeDasharray={2 * Math.PI * 60}
                    initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                    animate={{ strokeDashoffset: (2 * Math.PI * 60) * (1 - synergy.synchronization / 100) }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className="opacity-50"
                 />
                 {/* AI Path */}
                 <motion.circle 
                    cx="64" cy="64" r="60" stroke="#22d3ee" strokeWidth="4" 
                    fill="transparent" 
                    strokeDasharray={2 * Math.PI * 60}
                    initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                    animate={{ strokeDashoffset: (2 * Math.PI * 60) * (1 - synergy.synchronization / 100) }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
                    className="opacity-50"
                 />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-3xl font-black text-pink-500">{synergy.synchronization}%</span>
                 <span className="text-[7px] text-gray-500 uppercase tracking-widest">Độ Đồng Bộ</span>
              </div>
           </div>
           <p className="text-[10px] text-gray-400 italic text-center max-w-[250px]">
             "Tâm trí của bạn và thuật toán MIRO đang hòa làm một."
           </p>
        </div>

        {/* Detailed Stats */}
        <div className="space-y-4">
           {[
             { label: 'Niềm tin Hệ thống (Trust Bond)', val: synergy.trustBond, color: 'bg-green-500' },
             { label: 'Xung đột Tư duy (Conflict Rate)', val: synergy.conflictRate, color: 'bg-red-500' },
           ].map((stat) => (
             <div key={stat.label} className="space-y-2">
                <div className="flex justify-between items-center text-[9px] uppercase font-black">
                   <span className="text-gray-500">{stat.label}</span>
                   <span className={stat.color.replace('bg-', 'text-')}>{stat.val}%</span>
                </div>
                <div className="h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${stat.val}%` }}
                     className={`h-full ${stat.color}`}
                   />
                </div>
             </div>
           ))}
        </div>

        {/* Recent Synergy Log */}
        <div className="space-y-3">
           <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-pink-500" />
              <span className="text-[9px] font-black text-white uppercase tracking-widest">Sự kiện Đồng bộ Gần đây</span>
           </div>
           <div className="space-y-2">
              <div className="flex items-start gap-3 p-2 bg-white/5 border-l-2 border-green-500/50 rounded-r">
                 <CheckCircle2 className="w-3 h-3 text-green-500 mt-1 shrink-0" />
                 <div className="space-y-0.5">
                    <p className="text-[10px] text-white">Xác nhận Ý định: MUA BTC</p>
                    <p className="text-[8px] text-gray-500">Người dùng thực hiện lệnh đúng thời điểm AI đề xuất.</p>
                 </div>
              </div>
              <div className="flex items-start gap-3 p-2 bg-white/5 border-l-2 border-red-500/50 rounded-r">
                 <XCircle className="w-3 h-3 text-red-500 mt-1 shrink-0" />
                 <div className="space-y-0.5">
                    <p className="text-[10px] text-white">Hành vi Cảm xúc: Panic Close</p>
                    <p className="text-[8px] text-gray-500">Độ lệch tư duy 12%. Hệ thống ghi nhận trạng thái FATIGUED.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="p-3 bg-pink-500/5 border-t border-card-border flex items-center justify-between">
         <div className="flex items-center gap-2">
           <Info className="w-3 h-3 text-pink-500" />
           <span className="text-[8px] text-gray-600 uppercase font-black">Neural Convergence: High</span>
         </div>
      </div>
    </div>
  );
}
