import { useMemo } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Sparkles, GitBranch, Zap, Layers, AlertCircle } from 'lucide-react';

export default function QuantumForecast() {
  const { quantumPaths, marketData, selectedAsset } = useStore();
  const currentPrice = marketData.length > 0 ? marketData[marketData.length - 1].price : 0;

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-primary" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold">Dự báo Đa vũ trụ [QUANTUM_PATHS]</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/30">
           <Sparkles className="w-3 h-3 text-brand-primary animate-pulse" />
           <span className="text-[8px] font-bold text-brand-primary">PROBABILISTIC_MODE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-6">
        {/* Probability Map Visualization */}
        <div className="relative aspect-square bg-black/40 rounded-lg border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
           <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:15px_15px]" />
           
           <div className="relative z-10 flex flex-col h-full justify-between py-4">
              {quantumPaths.map((path, i) => (
                <motion.div 
                  key={path.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="space-y-1"
                >
                   <div className="flex justify-between items-center text-[7px] font-black uppercase text-gray-500">
                      <span>{path.label}</span>
                      <span className="text-brand-primary">P = {path.probability}%</span>
                   </div>
                   <div className="relative h-12 flex items-center">
                      <div className="absolute left-0 w-1.5 h-1.5 rounded-full bg-white/20" />
                      <svg className="w-full h-full overflow-visible">
                        <motion.path 
                           d={`M 5 ${24} Q 50 ${24 + (i - 1) * 20} 180 ${24 + (i - 1) * 40}`}
                           fill="transparent"
                           stroke={path.label.includes('OPTIMISTIC') ? '#22c55e' : path.label.includes('BLACK_SWAN') ? '#ef4444' : '#22d3ee'}
                           strokeWidth={path.probability / 20}
                           strokeDasharray="4 2"
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition={{ duration: 2, ease: "easeOut" }}
                        />
                      </svg>
                   </div>
                </motion.div>
              ))}
           </div>

           <div className="relative z-10 border-t border-white/10 pt-2 flex justify-between text-[8px] uppercase font-bold text-gray-500">
              <span>Hôm nay</span>
              <span>+24h Dự kiến</span>
           </div>
        </div>

        {/* Tactical Reasoning */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <GitBranch className="w-3 h-3 text-brand-primary" />
            <span className="text-[9px] font-black text-white uppercase tracking-widest">Phân tích Phễu Xác suất</span>
          </div>
          
          <div className="space-y-2">
            <div className="p-3 bg-white/5 border border-white/10 rounded text-[9px] leading-relaxed">
              <p className="text-gray-400 italic">
                "MIRO-SENTIENT đã mô phỏng 10,000 kịch bản cho {selectedAsset}. 65% dòng thời gian dẫn đến đợt bùng nổ giá nhờ sự hấp thụ thanh khoản tại vùng đáy. Tuy nhiên, 12% khả năng xuất hiện 'Thiên nga đen' nếu Whales xả hàng đồng loạt."
              </p>
            </div>
          </div>
        </div>

        {/* Quant Insight */}
        <div className="bg-brand-primary/5 border border-brand-primary/20 p-4 rounded-lg flex gap-3 items-start">
           <Zap className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
           <div className="space-y-1">
             <span className="text-[9px] font-bold text-brand-primary uppercase">Cố vấn Lượng tử</span>
             <p className="text-[9px] text-gray-400 leading-tight italic font-sans">
               "Đừng giao dịch dựa trên một tương lai duy nhất. Hãy chuẩn bị lệnh chờ ở cả REALITY_A và REALITY_B để tối ưu hóa rủi ro đa biến."
             </p>
           </div>
        </div>
      </div>

      <div className="p-3 bg-black/40 border-t border-card-border flex items-center justify-between">
         <div className="flex items-center gap-2 text-[8px] uppercase">
           <AlertCircle className="w-3 h-3 text-yellow-500" />
           <span className="text-gray-600">Độ lệch chuẩn: 0.142</span>
         </div>
         <button 
           onClick={() => useStore.getState().generateQuantumPaths(currentPrice)}
           className="text-[8px] font-black text-brand-primary uppercase border border-brand-primary/30 px-2 py-1 rounded hover:bg-brand-primary/10 transition-colors"
         >
           RE-SIMULATE
         </button>
      </div>
    </div>
  );
}
