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
  const { psychology, portfolio } = useStore();
  const mood = MOOD_DATA[psychology.currentMood];

  // Calculate some stats for visual interest
  const winRate = portfolio.orders.length > 0 
    ? (portfolio.orders.filter(o => o.status === 'COMPLETED').length / portfolio.orders.length) * 100 
    : 0;

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-brand-primary" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold text-white">Chế độ Theo dõi Tâm lý (BIO-METRICS)</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/30">
           <HeartPulse className="w-3 h-3 text-brand-primary animate-pulse" />
           <span className="text-[8px] font-bold text-brand-primary">72 BPM</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-6 space-y-8">
        {/* Current Mood Display */}
        <div className="flex flex-col items-center text-center space-y-4">
           <motion.div 
             animate={{ scale: [1, 1.1, 1] }}
             transition={{ duration: 3, repeat: Infinity }}
             className={`p-4 rounded-full bg-white/5 border border-white/10 ${mood.color}`}
           >
             {mood.icon}
           </motion.div>
           <div className="space-y-1">
             <h3 className={`text-sm font-black uppercase tracking-[0.2em] ${mood.color}`}>{mood.label}</h3>
             <p className="text-[10px] text-gray-400 max-w-[250px] leading-relaxed italic">
               "{mood.desc}"
             </p>
           </div>
        </div>

        {/* Psychological Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-[8px] uppercase">
              <span className="text-gray-500">Chỉ số Tham lam</span>
              <span className="text-red-500 font-bold">64%</span>
            </div>
            <div className="h-1 bg-black/40 rounded-full overflow-hidden">
               <div className="h-full bg-red-500 w-[64%]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[8px] uppercase">
              <span className="text-gray-500">Độ tập trung</span>
              <span className="text-brand-primary font-bold">89%</span>
            </div>
            <div className="h-1 bg-black/40 rounded-full overflow-hidden">
               <div className="h-full bg-brand-primary w-[89%]" />
            </div>
          </div>
        </div>

        {/* Behavioral Warnings */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-yellow-500" />
            <h4 className="text-[9px] font-bold text-white uppercase tracking-wider">Cảnh báo Hành vi</h4>
          </div>
          <div className="space-y-2">
            <div className="p-3 bg-white/5 border border-white/10 rounded text-[10px] space-y-2">
              <div className="flex items-center gap-2 text-yellow-500">
                <AlertCircle className="w-3 h-3" />
                <span className="font-bold uppercase tracking-tighter">Tần suất giao dịch cao</span>
              </div>
              <p className="text-gray-500 leading-tight">
                Bạn đã thực hiện 5 lệnh trong 10 phút qua. Khả năng rủi ro do "Overtrading" đang ở mức cao.
              </p>
            </div>
          </div>
        </div>

        {/* Recovery Suggestion */}
        <div className="bg-brand-primary/5 border border-brand-primary/20 p-4 rounded-lg flex gap-3 items-start">
           <Zap className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
           <div className="space-y-1">
             <span className="text-[9px] font-bold text-brand-primary uppercase">Miro-Advice: "Ngắt kết nối 15p"</span>
             <p className="text-[9px] text-gray-400 leading-relaxed italic">
               Dữ liệu cho thấy hiệu suất của bạn giảm 20% sau 2 giờ giao dịch liên tục. Hãy ra ngoài hít thở không khí và quay lại khi chỉ số BIO đạt ngưỡng ZEN.
             </p>
           </div>
        </div>
      </div>
      
      <div className="p-3 bg-black/40 border-t border-card-border flex items-center justify-between">
         <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
           <span className="text-[8px] text-gray-500 uppercase">Live Neuro-Syncing...</span>
         </div>
         <button className="text-[8px] font-black text-brand-primary uppercase border border-brand-primary/30 px-2 py-1 rounded hover:bg-brand-primary/10 transition-colors">
           RE-CALIBRATE
         </button>
      </div>
    </div>
  );
}
