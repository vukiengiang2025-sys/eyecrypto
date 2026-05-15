import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Globe, TrendingUp, TrendingDown, Minus, Info, Zap, Map as MapIcon, Share2 } from 'lucide-react';

export default function GlobalIntelligence() {
  const { globalSentiment } = useStore();

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-brand-primary" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold">Tình báo Toàn cầu [SENTIMENT_HUB]</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/30">
           <Zap className="w-3 h-3 text-brand-primary animate-pulse" />
           <span className="text-[8px] font-bold text-brand-primary">SYNC_OK</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-6 space-y-8">
        {/* World Sentiment Visualization Placeholder */}
        <div className="relative aspect-video bg-black/40 rounded-lg border border-white/5 flex items-center justify-center overflow-hidden">
           {/* Simple Grid Overlay */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:20px_20px]" />
           
           <div className="relative z-10 flex flex-col items-center gap-3">
             <MapIcon className="w-12 h-12 text-brand-primary/20" />
             <div className="text-center">
               <span className="text-[10px] font-black tracking-[0.2em] text-brand-primary block mb-1">MẢNG NHẬN THỨC TOÀN CẦU</span>
               <span className="text-[8px] text-gray-500 uppercase">Đang quét dòng vốn đa quốc gia...</span>
             </div>
           </div>

           {/* Pulse Points */}
           {[
             { top: '20%', left: '30%', color: 'bg-green-500' },
             { top: '45%', left: '60%', color: 'bg-red-500' },
             { top: '70%', left: '25%', color: 'bg-brand-primary' },
             { top: '30%', left: '80%', color: 'bg-yellow-500' },
           ].map((point, i) => (
             <motion.div 
               key={i}
               animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 3 + i, repeat: Infinity }}
               className={`absolute w-3 h-3 rounded-full ${point.color} blur-sm`}
               style={{ top: point.top, left: point.left }}
             />
           ))}
        </div>

        {/* Sentiment Asset Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <TrendingUp className="w-3 h-3 text-gray-500" />
             <span className="text-[9px] font-bold text-white uppercase tracking-widest">Chỉ số Tâm lý Theo Tài sản</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {globalSentiment.map((node) => (
              <div key={node.asset} className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black italic">{node.asset}</span>
                  {node.momentum === 'UP' ? <TrendingUp className="w-3 h-3 text-green-500" /> : 
                   node.momentum === 'DOWN' ? <TrendingDown className="w-3 h-3 text-red-500" /> : 
                   <Minus className="w-3 h-3 text-gray-500" />}
                </div>

                <div className="flex items-end gap-2 h-8">
                  <div className="flex-1 h-full bg-black/40 rounded overflow-hidden relative border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.abs(node.score)}%` }}
                      className={`h-full ${node.score >= 0 ? 'bg-green-500' : 'bg-red-500'} opacity-50`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                      {node.score > 0 ? '+' : ''}{node.score}%
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-[7px] font-black uppercase tracking-tighter">
                  <span className={node.score > 0 ? 'text-green-500' : 'text-red-500'}>
                    {node.score > 30 ? 'CỰC KỲ KHẢ QUAN' : node.score > 0 ? 'KHẢ QUAN' : node.score > -30 ? 'TIÊU CỰC' : 'CỰC KỲ TIÊU CỰC'}
                  </span>
                  <span className="text-gray-600">ĐỘ TRỄ: 28MS</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence Intel */}
        <div className="p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-lg space-y-3">
           <div className="flex items-center gap-2">
             <Share2 className="w-4 h-4 text-brand-primary" />
             <span className="text-[9px] font-bold text-brand-primary uppercase">Dòng chảy Dữ liệu OSINT</span>
           </div>
           <p className="text-[10px] text-gray-400 leading-relaxed italic">
             "Phát hiện sự gia tăng thảo luận về việc nới lỏng chính sách tiền tệ tại các diễn đàn tài chính ngầm. Chỉ số bốc hơi thanh khoản tại các sàn CEX đang gia tăng. Commander nên chuẩn bị cho tình huống biến động cao trong 24h tới."
           </p>
        </div>
      </div>

      <div className="p-3 bg-black/60 border-t border-card-border flex items-center justify-between">
         <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
           <span className="text-[8px] text-gray-500 uppercase">Scanning 4.2B Data Points...</span>
         </div>
         <button className="text-[8px] font-black text-brand-primary uppercase border border-brand-primary/30 px-2 py-1 rounded hover:bg-brand-primary/10 transition-colors">
           EXPAND_MAP
         </button>
      </div>
    </div>
  );
}
