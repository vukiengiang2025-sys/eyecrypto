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
  const { credentials, profile } = useStore();
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
      
      const { selectedAsset, profile, psychology, portfolio } = useStore.getState();
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are 'MIRO-SENTIENT', a hyper-intelligent AI crypto trading system.
        Analyze the current market for ${assetNames[selectedAsset]}.
        User: ${profile.name} (Rank: ${profile.rank})
        User Psychology: Mood=${psychology.currentMood}, TradeFrequency=${psychology.tradeFrequency}
        Portfolio: PnL=${portfolio.pnlPercentage}%
        
        REQUIRED JSON OUTPUT FORMAT:
        {
          "sentiment": "BULLISH" | "BEARISH" | "NEUTRAL",
          "confidence": number (0-100),
          "directive": "VIETNAMESE String (Strategic directive)",
          "reasoning": ["VIETNAMESE Reason 1", "Reason 2", "Reason 3"],
          "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
          "metaCognition": {
            "reliabilityScore": number (0-100),
            "learningProgress": number,
            "internalConflicts": ["Conflict"],
            "explanation": "Brief explanation"
          },
          "psychologyAlert": "VIETNAMESE String (Optional alert about user's mental state if risky)"
        }
        
        Tone: Cyberpunk, technical, brief but powerful. AI insights must be in VIETNAMESE.`,
        config: {
          responseMimeType: "application/json",
        }
      });

      const jsonStr = response.text || "{}";
      const result = JSON.parse(jsonStr);
      setAnalysis(result.directive);
      
      const storeRef = useStore.getState();
      storeRef.setAiAnalysis(result);
      storeRef.incrementEvolution(result.confidence > 70);
      storeRef.addAIInsight(`PHÂN TÍCH MIRO: ${result.directive}`);
      
      // Stage 6: Update APEX and Neural Core
      storeRef.refreshNeuralActivity();
      
      // Stage 7: Update Sovereignty, Synergy and Quantum
      const currentPrice = storeRef.marketData.length > 0 ? storeRef.marketData[storeRef.marketData.length - 1].price : 0;
      storeRef.generateQuantumPaths(currentPrice);
      
      storeRef.updateSynergy({
        synchronization: Math.min(100, Math.max(0, storeRef.synergy.synchronization + (Math.random() - 0.4) * 5)),
        trustBond: Math.min(100, Math.max(0, storeRef.synergy.trustBond + (result.confidence > 70 ? 2 : -1))),
      });

      storeRef.updateApexDirective({
        score: result.confidence,
        consensus: result.sentiment === 'BULLISH' ? 'STRIKE' : result.sentiment === 'BEARISH' ? 'DEFEND' : 'WAIT',
        subDirectives: {
          market: Math.floor(Math.random() * 20) + 60,
          psychology: storeRef.psychology.currentMood === 'CALM' ? 95 : 45,
          battlefield: Math.floor(Math.random() * 40) + 40,
          global: Math.floor(Math.random() * 30) + 70
        }
      });
      
      if (result.metaCognition.reliabilityScore > 85) {
        storeRef.addAIInsight(`TIẾN HÓA: Độ tin cậy lõi đạt ${result.metaCognition.reliabilityScore}%`);
      }
    } catch (error: any) {
      console.error("AI Analysis error:", error);
      setErrorStatus(500);
      setAnalysis("LỖI KHỚP THẦN KINH: Đang khởi tạo lại bộ đệm nhận thức... Biến động thị trường vượt quá giới hạn có thể dự đoán.");
    } finally {
      setLoading(false);
    }
  }, [selectedAsset, credentials.geminiKey, profile.name, profile.rank]);

  useEffect(() => {
    analyzeMarket();
    const interval = setInterval(analyzeMarket, 300000); 
    return () => clearInterval(interval);
  }, [analyzeMarket]);

  const aiAnalysis = useStore(state => state.aiAnalysis);

  return (
    <div className="h-full flex flex-col bg-card-bg border border-card-border rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,170,0.05),transparent)] pointer-events-none" />
      
      <div className="p-4 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-brand-primary" />
          <h2 className="text-xs font-mono uppercase tracking-tighter font-bold text-white">MIRO Intelligence Core</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={analyzeMarket}
            disabled={loading}
            className="p-1 hover:bg-white/5 rounded transition-colors disabled:opacity-30"
          >
            <RefreshCw className={`w-3 h-3 text-gray-500 ${loading ? 'animate-spin text-brand-primary' : ''}`} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-40 flex flex-col items-center justify-center gap-4 border border-dashed border-white/10 rounded-lg"
            >
              <RefreshCw className="w-8 h-8 text-brand-primary animate-spin" />
              <p className="text-[10px] font-mono text-brand-primary animate-pulse uppercase tracking-widest">Đang giải mã luồng dữ liệu...</p>
            </motion.div>
          ) : aiAnalysis ? (
            <motion.div 
              key="analysis"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-12 h-12 -mr-6 -mt-6 rounded-full blur-xl opacity-20 ${aiAnalysis.sentiment === 'BULLISH' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-[8px] text-gray-500 uppercase block mb-1 font-bold">Cảm quan Thị trường</span>
                  <span className={`text-sm font-display font-black uppercase tracking-tighter ${aiAnalysis.sentiment === 'BULLISH' ? 'text-green-500' : aiAnalysis.sentiment === 'BEARISH' ? 'text-red-500' : 'text-yellow-500'}`}>
                    {aiAnalysis.sentiment}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg relative overflow-hidden">
                  <span className="text-[8px] text-gray-500 uppercase block mb-1 font-bold">Rủi ro Hệ thống</span>
                  <span className={`text-sm font-display font-black uppercase tracking-tighter ${
                    aiAnalysis.riskLevel === 'CRITICAL' ? 'text-red-600' :
                    aiAnalysis.riskLevel === 'HIGH' ? 'text-red-500' :
                    aiAnalysis.riskLevel === 'MEDIUM' ? 'text-orange-500' : 'text-green-500'
                  }`}>
                    {aiAnalysis.riskLevel}
                  </span>
                </div>
              </div>

              {/* Confidence Gauge */}
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[8px] text-gray-500 uppercase font-bold tracking-widest">Độ tin cậy Thuật toán</span>
                  <span className="text-[10px] font-mono text-brand-primary font-bold">{aiAnalysis.confidence}%</span>
                </div>
                <div className="h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5 p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${aiAnalysis.confidence}%` }}
                    className="h-full bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                  />
                </div>
              </div>

              {/* Main Insight */}
              <div className="bg-brand-primary/5 border-l-2 border-brand-primary p-4 rounded-r relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-5">
                  <Brain className="w-16 h-16" />
                </div>
                <h3 className="text-[9px] font-bold text-brand-primary uppercase mb-2 flex items-center gap-2">
                   <Sparkles className="w-3 h-3" /> MIRO_DIRECTIVE_SENTIENT
                </h3>
                <p className="text-[12px] leading-relaxed text-gray-100 font-medium whitespace-pre-wrap italic shadow-sm">
                  "{aiAnalysis.directive}"
                </p>
              </div>

              {/* Reasoning Logs */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[8px] text-gray-500 uppercase font-bold tracking-widest">Logic Breakdown</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="space-y-2 px-2">
                  {aiAnalysis.reasoning.map((reason, idx) => (
                    <div key={idx} className="flex gap-3 text-[10px] text-gray-400 group">
                      <span className="text-brand-primary group-hover:animate-pulse">[{idx + 1}]</span>
                      <span className="group-hover:text-white transition-colors">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-40 flex flex-col items-center justify-center text-gray-600 border border-dashed border-white/5 rounded-lg bg-black/20">
              <Brain className="w-8 h-8 mb-4 opacity-10 animate-pulse" />
              <button 
                onClick={analyzeMarket}
                className="text-[9px] uppercase font-mono tracking-widest text-brand-primary hover:underline border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 rounded"
              >
                KHỞI TẠO LÕI THẦN KINH
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-black/60 p-2 text-[9px] font-mono text-center border-t border-card-border text-gray-600 flex items-center justify-center gap-3">
        <Activity className="w-3 h-3 text-brand-primary animate-pulse" />
        <span>SENTIENT ENGINE v4.8 :: SECURED</span>
      </div>
    </div>
  );
}

