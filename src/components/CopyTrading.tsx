import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Users, Award, TrendingUp, ShieldCheck, ExternalLink, Zap } from 'lucide-react';

export default function CopyTrading() {
  const { traders } = useStore();

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-brand-primary" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold text-white">Bảng Xếp hạng Chỉ huy (Copy Trade)</h2>
        </div>
        <Users className="w-3 h-3 text-gray-500" />
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-4">
        {traders.map((trader, i) => (
          <motion.div 
            key={trader.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 p-4 rounded-lg group hover:border-brand-primary/50 transition-all relative overflow-hidden"
          >
            {/* Rank Badge */}
            <div className="absolute top-0 right-0 bg-brand-primary text-black font-black text-[10px] px-2 py-0.5 rounded-bl shadow-lg">
              #{i + 1}
            </div>

            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black text-black shadow-lg"
                style={{ backgroundColor: i === 0 ? '#fbbf24' : '#22d3ee' }}
              >
                {trader.avatar}
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex flex-col">
                  <span className="text-sm font-black text-white uppercase tracking-tighter">{trader.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[8px] text-gray-500 uppercase font-bold">Thanh danh:</span>
                    <div className="flex gap-0.5">
                       {[...Array(5)].map((_, idx) => (
                         <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx < (5 - trader.riskScore) ? 'bg-brand-primary' : 'bg-gray-800'}`} />
                       ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-gray-500 uppercase font-bold">Tỷ lệ Thắng</span>
                    <span className="text-xs text-green-500 font-bold">{trader.winRate}%</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-gray-500 uppercase font-bold">Lợi nhuận (USD)</span>
                    <span className="text-xs text-white font-bold">+${trader.totalProfit.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-gray-500" />
                    <span className="text-[9px] text-gray-400">{trader.followers.toLocaleString()} quân sĩ</span>
                  </div>
                  <button className="flex items-center gap-1.5 text-[9px] font-bold text-brand-primary uppercase hover:bg-brand-primary/10 px-2 py-1 rounded border border-brand-primary/20 transition-colors">
                    SẢN SAO VỊ THẾ <Zap className="w-2.5 h-2.5 animate-pulse" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-3 bg-black/40 border-t border-card-border">
         <div className="bg-brand-primary/5 border border-brand-primary/20 p-2 rounded flex items-center justify-between">
            <span className="text-[8px] text-gray-500 uppercase font-bold">Vị thế Sao chép của bạn</span>
            <span className="text-[8px] text-brand-primary font-bold">CHƯA CÓ KẾT NỐI</span>
         </div>
      </div>
    </div>
  );
}
