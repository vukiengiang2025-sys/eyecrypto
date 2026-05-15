import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Volume2, Radio, Newspaper, Globe, Sparkles, MessageCircle } from 'lucide-react';

export default function MarketNarrator() {
  const { aiInsights, selectedAsset } = useStore();

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-orange-500" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold text-white">Người Dẫn chuyện Thị trường (NARRATOR)</h2>
        </div>
        <div className="flex items-center gap-2">
           <Volume2 className="w-3 h-3 text-gray-500 hover:text-white cursor-pointer transition-colors" />
           <div className="flex gap-0.5">
             {[...Array(4)].map((_, i) => (
               <motion.div 
                 key={i}
                 animate={{ height: [4, 12, 6, 14, 4] }}
                 transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                 className="w-1 bg-orange-500/50 rounded-full"
               />
             ))}
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-6">
        {/* Main Narrative */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-primary">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Phân tích Bối cảnh Toàn cầu</span>
          </div>
          
          <div className="relative">
             <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-primary/50 to-transparent" />
             <div className="pl-4 py-1">
               <p className="text-xs text-gray-300 leading-relaxed font-sans italic">
                 "Chào buổi sáng, Commander. Thị trường đang bước vào một giai đoạn kịch tính. Tôi nhận thấy sự dịch chuyển lớn từ các ví cá voi (Whales) tại sàn Binance. 
                 Mặc dù chỉ số Fear & Greed đang ở mức cao, nhưng lực bán tại ${selectedAsset} đang bị triệt tiêu bởi các lệnh mua ẩn (Hidden Buy Walls). 
                 Dòng tiền (Capital Flow) đang chuyển từ các tài sản rủi ro cao sang các chỉ số ổn định hơn. Hãy cẩn thận với đợt quét thanh khoản sắp tới."
               </p>
             </div>
          </div>
        </div>

        {/* Global News Snippets (Simulated OSINT) */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-gray-500">
             <Globe className="w-3 h-3" />
             <span className="text-[9px] font-bold uppercase tracking-widest">Tin tức Toàn cầu (Live OSINT)</span>
          </div>

          <div className="space-y-2">
            {[
              { source: 'REUTERS', text: 'Dữ liệu lạm phát Mỹ hạ nhiệt, thúc đẩy tâm lý Risk-on.', time: '5m ago' },
              { source: 'BLOOMBERG', text: 'Quỹ ETF Bitcoin ghi nhận dòng tiền vào kỷ lục kỷ lục.', time: '12m ago' },
              { source: 'MIRO-CORE', text: 'Phát hiện sự bất thường trong độ lệch Delta tại WTI.', time: '20m ago' },
            ].map((news, i) => (
              <div key={i} className="flex gap-3 group">
                <div className="text-[8px] font-black text-brand-primary w-12 shrink-0 group-hover:text-white transition-colors">{news.source}</div>
                <div className="flex-1 space-y-1">
                  <p className="text-[10px] text-gray-400 group-hover:text-gray-200 transition-colors">{news.text}</p>
                  <span className="text-[7px] text-gray-700 uppercase font-bold">{news.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Recommendation */}
        <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
             <MessageCircle className="w-4 h-4 text-orange-500" />
             <span className="text-[9px] font-bold text-orange-500 uppercase">Khuyên nghị Chiến thuật</span>
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            "Dựa trên bối cảnh này, chiến thuật 'Scalp' có rủi ro cao. Commander nên cân nhắc giữ lệnh 'Swing' dài hạn hơn để tránh nhiễu từ các đợt quét cá voi."
          </p>
        </div>
      </div>

      <div className="p-3 bg-black/40 border-t border-card-border flex items-center justify-between">
         <div className="flex items-center gap-2">
           <Newspaper className="w-3 h-3 text-gray-500" />
           <span className="text-[8px] text-gray-600 uppercase font-bold">Nguồn dữ liệu: 42 AI Nodes</span>
         </div>
         <span className="text-[8px] text-brand-primary font-bold animate-pulse">SINKING DATA...</span>
      </div>
    </div>
  );
}
