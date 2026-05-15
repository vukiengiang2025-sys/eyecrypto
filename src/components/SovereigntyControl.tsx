import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { ShieldCheck, Lock, Unlock, AlertTriangle, Cpu, Zap, Activity } from 'lucide-react';

export default function SovereigntyControl() {
  const { sovereignty, updateSovereignty, psychology } = useStore();

  const handleToggleVeto = () => {
    updateSovereignty({ vetoPower: !sovereignty.vetoPower });
  };

  const handleToggleLockdown = () => {
    updateSovereignty({ lockdownActive: !sovereignty.lockdownActive });
  };

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-primary" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold text-white">Quyền năng Tự quyết [SOVEREIGNTY]</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/30">
           <Cpu className="w-3 h-3 text-brand-primary animate-pulse" />
           <span className="text-[8px] font-bold text-brand-primary">SENTIENT_CORE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-6 space-y-8">
        {/* Autonomy Level Slider Placeholder style */}
        <div className="space-y-4">
           <div className="flex justify-between items-center text-[10px] font-black uppercase">
              <span className="text-gray-500">Mức độ Tự chủ</span>
              <span className="text-brand-primary">{sovereignty.level}%</span>
           </div>
           <div className="relative h-12 flex items-center">
              <div className="absolute inset-0 bg-white/5 rounded-full border border-white/10" />
              <motion.div 
                animate={{ width: `${sovereignty.level}%` }}
                className="absolute left-0 h-full bg-gradient-to-r from-brand-primary/20 to-brand-primary/50 rounded-full blur-sm"
              />
              <div 
                className="absolute h-1 bg-brand-primary transition-all duration-500 ease-out rounded-full z-10" 
                style={{ width: `${sovereignty.level}%` }}
              />
              <motion.div 
                 drag="x"
                 dragConstraints={{ left: 0, right: 300 }} // Simplified
                 onDrag={(_, info) => {
                    const newLevel = Math.min(100, Math.max(0, info.point.x / 3)); // Dummy calc
                    updateSovereignty({ level: Math.round(newLevel) });
                 }}
                 className="absolute w-6 h-6 bg-white rounded-full border-4 border-brand-primary shadow-[0_0_15px_rgba(34,211,238,0.8)] cursor-pointer z-20"
                 style={{ left: `calc(${sovereignty.level}% - 12px)` }}
              />
           </div>
           <p className="text-[8px] text-gray-500 uppercase tracking-tighter text-center">
             Kéo để điều chỉnh quyền can thiệp của MIRO vào tài sản của bạn.
           </p>
        </div>

        {/* Major Controls */}
        <div className="grid grid-cols-1 gap-4">
           {/* Veto Power */}
           <div 
             onClick={handleToggleVeto}
             className={`p-4 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
               sovereignty.vetoPower ? 'bg-brand-primary/20 border-brand-primary' : 'bg-white/5 border-white/10 hover:border-white/20'
             }`}
           >
              <div className="flex items-center gap-4">
                 <div className={`p-2 rounded ${sovereignty.vetoPower ? 'bg-brand-primary text-black' : 'bg-white/10 text-gray-500'}`}>
                    <AlertTriangle className="w-5 h-5" />
                 </div>
                 <div className="space-y-0.5">
                    <span className="text-[10px] font-black uppercase">Quyền Phủ quyết (AI Veto)</span>
                    <p className="text-[9px] text-gray-500 italic">MIRO sẽ chặn các lệnh nếu phát hiện Commander đang hoảng loạn.</p>
                 </div>
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${sovereignty.vetoPower ? 'bg-brand-primary' : 'bg-gray-700'}`}>
                 <motion.div 
                   animate={{ x: sovereignty.vetoPower ? 16 : 2 }}
                   className="absolute top-1 w-2 h-2 bg-white rounded-full"
                 />
              </div>
           </div>

           {/* Autonomous Lockdown */}
           <div 
             onClick={handleToggleLockdown}
             className={`p-4 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
               sovereignty.lockdownActive ? 'bg-red-500/20 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-white/5 border-white/10 hover:border-white/20'
             }`}
           >
              <div className="flex items-center gap-4">
                 <div className={`p-2 rounded ${sovereignty.lockdownActive ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-500'}`}>
                    <Lock className="w-5 h-5" />
                 </div>
                 <div className="space-y-0.5">
                    <span className="text-[10px] font-black uppercase">Khóa Tự thân (Auto-Lockdown)</span>
                    <p className="text-[9px] text-gray-500 italic">Khóa toàn bộ hệ thống nếu PnL giảm quá 10% trong 1 giờ.</p>
                 </div>
              </div>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-white/10 ${sovereignty.lockdownActive ? 'text-red-500 border-red-500/50' : 'text-gray-500'}`}>
                 {sovereignty.lockdownActive ? <Activity className="w-5 h-5 animate-pulse" /> : <Unlock className="w-5 h-5" />}
              </div>
           </div>
        </div>

        {/* Sovereignty Status Message */}
        <div className="bg-black/40 border-l-2 border-brand-primary p-4 rounded text-[10px] space-y-2">
           <div className="flex items-center gap-2 text-brand-primary font-black uppercase tracking-widest">
              <Zap className="w-3 h-3" />
              <span>Phân tích Tư cách Thành viên</span>
           </div>
           <p className="text-gray-400 italic leading-relaxed">
             "Commander, mức độ Tâm lý của bạn hiện là <span className="text-white font-bold">{psychology.currentMood}</span>. Tôi khuyên bạn nên giữ Sovereignty Level ở mức <span className="text-brand-primary font-bold">60%</span> để chúng ta có thể tối ưu hóa 'Human-AI Synergy'."
           </p>
        </div>
      </div>

      <div className="p-3 bg-black/80 border-t border-card-border flex items-center justify-center">
         <span className="text-[8px] text-gray-600 uppercase font-black tracking-[0.3em]">Neural Link Stable // Bio-ID Verified</span>
      </div>
    </div>
  );
}
