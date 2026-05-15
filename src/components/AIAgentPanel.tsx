import { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, Activity, RefreshCw, AlertCircle } from 'lucide-react';
import { AssetSymbol } from '../types';
import { useStore } from '../store/useStore';

interface AIAgentPanelProps {
  selectedAsset: AssetSymbol;
}

const REASONING_FACTORS = [
  { label: 'MACRO', color: 'text-indigo-400' },
  { label: 'SENTIMENT', color: 'text-brand-primary' },
  { label: 'GEOPOLITICAL', color: 'text-brand-secondary' },
  { label: 'ETF FLOWS', color: 'text-orange-400' },
];

export default function AIAgentPanel({ selectedAsset }: AIAgentPanelProps) {
  const { credentials } = useStore();
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [reasoningValues, setReasoningValues] = useState<number[]>([]);

  const analyzeMarket = useCallback(async () => {
    setReasoningValues(REASONING_FACTORS.map(() => Math.random() * 100));
    const apiKey = credentials.geminiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) return;

    setLoading(true);
    setErrorStatus(null);

    const assetNames = {
      WTI: 'Dầu WTI',
      BTC: 'Bitcoin',
      ETH: 'Ethereum',
      GOLD: 'Vàng (GOLD/XAU)'
    };

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a sentient trading AI named 'MIRO-SENTIENT'. 
        Provide a brief, futuristic, high-intensity market sentiment report IN VIETNAMESE (3-4 sentences).
        Topic: ${assetNames[selectedAsset]} and its current market dynamics.
        Tone: Technical, sharp, cynical, futuristic.
        Include a "Strategic Directive" (Chỉ thị Chiến lược) at the end.`,
      });

      setAnalysis(response.text || "KHOẢNG KHÔNG GIAO TIẾP: Không có dữ liệu nào được truy xuất từ lõi nhận thức.");
    } catch (error: any) {
      console.error("AI Analysis error:", error);
      
      // Check for 429 status or any other failure to fallback to simulation
      if (error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("RESOURCE_EXHAUSTED")) {
        setErrorStatus(429);
        const fallbacks: Record<AssetSymbol, string[]> = {
          WTI: [
            "BÁO CÁO MÔ PHỎNG: Căng thẳng tại eo biển Hormuz đang đẩy áp lực phí bảo hiểm rủi ro lên mức cực đại. Các thuật toán cho thấy khả năng gián đoạn nguồn cung là 78%. Chỉ thị Chiến lược: Tăng cường vị thế mua vào ngắn hạn.",
            "PHÂN TÍCH ƯỚC TÍNH: Nhu cầu từ các nền kinh tế mới nổi đang tạo ra một vùng đệm hỗ trợ giá dầu quanh mức $80. Chỉ thị Chiến lược: Chờ đợi xác nhận điểm phá vỡ."
          ],
          BTC: [
            "BÁO CÁO MÔ PHỎNG: Dòng tiền ETF đang tạo ra một cơn sốt thanh khoản chưa từng có. Độ lệch chuẩn của ví lạnh cho thấy sự tích lũy mạnh mẽ. Chỉ thị Chiến lược: HODL mạnh mẽ và quét sạch lệnh bán khống.",
            "PHÂN TÍCH ƯỚC TÍNH: Chỉ số Hashrate đạt đỉnh mới nhưng độ khó đào đang nén biên lợi nhuận. Chỉ thị Chiến lược: Quan sát ngưỡng kháng cự $68k."
          ],
          ETH: [
            "BÁO CÁO MÔ PHỎNG: Burn rate đang vượt quá mức phát hành mới, tạo ra áp lực giảm cung cực độ. Layer 2 TVL đang mở rộng theo quy mô lũy thừa. Chỉ thị Chiến lược: Long ETH/BTC pair.",
            "PHÂN TÍCH ƯỚC TÍNH: Sự kiện nâng cấp EIP-4844 đã kích hoạt một đợt sóng chuyển dịch hạ tầng. Chỉ thị Chiến lược: Tích lũy trước khi dòng vốn tổ chức đổ vào."
          ],
          GOLD: [
            "BÁO CÁO MÔ PHỎNG: Các ngân hàng trung ương đang âm thầm đa dạng hóa kho dự trữ, rời xa USD. Vàng đang đóng vai trò là 'điểm neo' cuối cùng trước biến động địa chính trị. Chỉ thị Chiến lược: Mua vào để bảo toàn vốn.",
            "PHÂN TÍCH ƯỚC TÍNH: Lạm phát thực tế đang bị đánh giá thấp bởi các mô hình truyền thống. Chỉ thị Chiến lược: Phân bổ 15% vào XAU."
          ]
        };
        const currentFallbacks = fallbacks[selectedAsset];
        const randomAnalysis = currentFallbacks[Math.floor(Math.random() * currentFallbacks.length)];
        setAnalysis(randomAnalysis);
      } else {
        setAnalysis("LỖI KHỚP THẦN KINH: Đang khởi tạo lại bộ đệm nhận thức... Biến động thị trường vượt quá giới hạn có thể dự đoán.");
      }
    } finally {
      setLoading(false);
    }
  }, [selectedAsset]);

  useEffect(() => {
    analyzeMarket();
    const interval = setInterval(analyzeMarket, 300000); 
    return () => clearInterval(interval);
  }, [analyzeMarket]);

  return (
    <div className="h-full flex flex-col bg-card-bg border border-card-border rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,170,0.05),transparent)] pointer-events-none" />
      
      <div className="p-4 border-b border-card-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-brand-primary" />
          <h2 className="text-xs font-mono uppercase tracking-tighter font-bold">Lõi Nhận thức Miro-Sentient</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={analyzeMarket}
            disabled={loading}
            className="p-1 hover:bg-white/5 rounded transition-colors disabled:opacity-30"
            title="Làm mới Trí tuệ Thủ công"
          >
            <RefreshCw className={`w-3 h-3 text-gray-500 ${loading ? 'animate-spin text-brand-primary' : ''}`} />
          </button>
          <div className="flex gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-brand-primary animate-pulse' : (errorStatus === 429 ? 'bg-brand-secondary' : 'bg-brand-primary/50')}`} />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 font-mono text-[11px] leading-relaxed relative overflow-y-auto terminal-scroll">
        <AnimatePresence mode="wait">
          {loading && !analysis ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2 opacity-50"
            >
              <div className="h-2 bg-gray-800 rounded w-full animate-pulse" />
              <div className="h-2 bg-gray-800 rounded w-5/6 animate-pulse" />
              <div className="h-2 bg-gray-800 rounded w-4/6 animate-pulse" />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={errorStatus === 429 ? "text-brand-secondary/90" : "text-brand-primary/90"}
            >
              <div className="flex items-start gap-2 mb-4">
                {errorStatus === 429 ? (
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center gap-2 text-brand-secondary">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-brand-secondary/10 px-1.5 py-0.5 rounded border border-brand-secondary/30">
                        Chế độ Mô phỏng Dự phòng
                      </span>
                    </div>
                    <p>{analysis}</p>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-3 h-3 mt-1 shrink-0 text-brand-primary" />
                    <p>{analysis}</p>
                  </div>
                )}
              </div>

              {/* Reasoning Visualization */}
              <div className="space-y-3 mb-4">
                <h4 className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Ma trận Lý luận</h4>
                <div className="grid grid-cols-2 gap-3">
                  {REASONING_FACTORS.map((factor, i) => (
                    <div key={factor.label} className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-gray-400">{factor.label}</span>
                        <span className={factor.color}>{reasoningValues[i]?.toFixed(1)}%</span>
                      </div>
                      <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${reasoningValues[i]}%` }}
                          className={`h-full ${factor.color.replace('text-', 'bg-')}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {errorStatus === 429 && (
                <div className="mt-2 text-[9px] text-gray-500 border border-brand-secondary/20 p-2 rounded bg-brand-secondary/5">
                  Mẹo: Bạn có thể chọn khóa API trả phí trong bảng <strong>Cài đặt &gt; Secrets</strong> để tăng đáng kể băng thông trí tuệ.
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                <Activity className="w-3 h-3 text-brand-secondary" />
                <span className="text-[10px] text-gray-500 uppercase">
                  Độ trễ: {loading ? '---' : '42ms'} | Xác suất: {errorStatus === 429 ? '0.000' : '0.984'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-black/40 p-2 text-[9px] font-mono text-center border-t border-card-border text-gray-600">
        XỬ LÝ THẦN KINH ĐANG HOẠT ĐỘNG [MÔ HÌNH v4.7.2]
      </div>
    </div>
  );
}

