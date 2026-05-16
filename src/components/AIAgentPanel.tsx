import { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, Activity, RefreshCw, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
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

      // Stage 11: Trigger Consensus Cycle
      storeRef.runConsensusCycle(currentPrice);
      
      // Stage 12: Trigger Risk Governance Check
      storeRef.checkRiskGovernance();
      
      // Stage 13: Memory Logic (Random simulation of learning)
      if (Math.random() > 0.8) {
        storeRef.commitToMemory({
          regime: storeRef.riskGovernance.regime,
          outcome: result.metaCognition.reliabilityScore > 80 ? 'SUCCESS' : 'NEUTRAL',
          context: `Sự kết hợp giữa ${result.primaryStrategy} và ${result.metaCognition.confidenceScore}% confidence.`,
          learnings: [`Độ tin cậy đạt ${result.metaCognition.reliabilityScore}%.`],
          importance: Math.floor(result.metaCognition.reliabilityScore)
        });
      }
      
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
  const consensus = useStore(state => state.consensus);

  return (
    <div className="h-full flex flex-col bg-panel-bg border border-card-border rounded-lg overflow-hidden relative font-mono">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,210,255,0.03),transparent)] pointer-events-none" />
      
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Brain className="w-3 h-3 text-brand-primary" />
          <h2 className="panel-title">Miro Intelligence Node [SENTIENT_CORE]</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-brand-primary/5 border border-brand-primary/20">
             <div className="w-1 h-1 rounded-full bg-brand-primary animate-pulse" />
             <span className="text-[7px] font-black text-brand-primary uppercase tracking-[0.2em]">{loading ? 'SOLVING' : 'STABLE'}</span>
          </div>
          <button 
            onClick={analyzeMarket}
            disabled={loading}
            className="p-1 hover:bg-white/5 rounded-full transition-all disabled:opacity-30"
          >
            <RefreshCw className={`w-3 h-3 text-gray-500 ${loading ? 'animate-spin text-brand-primary' : ''}`} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-6 bg-panel-bg/40 backdrop-blur-sm relative z-10">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-48 flex flex-col items-center justify-center gap-4 border border-dashed border-white/5 rounded-sm bg-black/20"
            >
              <div className="relative">
                 <RefreshCw className="w-10 h-10 text-brand-primary opacity-20 animate-spin" />
                 <Brain className="absolute inset-0 m-auto w-5 h-5 text-brand-primary animate-pulse" />
              </div>
              <div className="space-y-1 text-center">
                 <p className="text-[9px] font-black text-brand-primary uppercase tracking-[0.4em] ml-[0.4em]">Deciphering Flux</p>
                 <div className="flex gap-0.5 justify-center">
                    <motion.div animate={{ height: [2, 6, 2] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 bg-brand-primary/40" />
                    <motion.div animate={{ height: [4, 2, 4] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-0.5 bg-brand-primary/40" />
                    <motion.div animate={{ height: [1, 8, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-0.5 bg-brand-primary/40" />
                 </div>
              </div>
            </motion.div>
          ) : aiAnalysis ? (
            <motion.div 
              key="analysis"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Tactical Overview */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/40 border border-white/5 p-3 rounded-sm group hover:border-brand-primary/20 transition-all">
                  <span className="data-label opacity-40 block mb-2">Market Sentiment</span>
                  <div className="flex items-center justify-between">
                     <span className={`text-[12px] font-black tracking-widest ${aiAnalysis.sentiment === 'BULLISH' ? 'text-brand-primary underline decoration-brand-primary/30' : aiAnalysis.sentiment === 'BEARISH' ? 'text-brand-risk underline decoration-brand-risk/30' : 'text-brand-accent'}`}>
                       {aiAnalysis.sentiment}
                     </span>
                     {aiAnalysis.sentiment === 'BULLISH' ? <TrendingUp className="w-3 h-3 text-brand-primary" /> : <TrendingDown className="w-3 h-3 text-brand-risk" />}
                  </div>
                </div>
                <div className="bg-black/40 border border-white/5 p-3 rounded-sm group hover:border-brand-primary/20 transition-all">
                  <span className="data-label opacity-40 block mb-2">System Risk</span>
                  <span className={`text-[12px] font-black tracking-widest ${
                    aiAnalysis.riskLevel === 'CRITICAL' ? 'text-brand-risk' :
                    aiAnalysis.riskLevel === 'HIGH' ? 'text-brand-risk/80' :
                    aiAnalysis.riskLevel === 'MEDIUM' ? 'text-brand-accent' : 'text-brand-primary'
                  }`}>
                    {aiAnalysis.riskLevel}
                  </span>
                </div>
              </div>

              {/* Cognitive Alignment Meter */}
              <div className="space-y-2">
                 <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest">
                    <span className="text-gray-500">Neural Calibration</span>
                    <span className="text-brand-primary">{aiAnalysis.confidence}%</span>
                 </div>
                 <div className="h-0.5 bg-white/5 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${aiAnalysis.confidence}%` }}
                      className="absolute h-full bg-brand-primary shadow-[0_0_8px_#00D2FF]"
                    />
                 </div>
              </div>

              {/* The Directive Panel */}
              <div className="bg-brand-primary/[0.03] border-l border-brand-primary/40 p-4 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-[0.02]">
                    <Sparkles className="w-20 h-20 text-brand-primary" />
                 </div>
                 <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                    <span className="text-[8px] font-black text-brand-primary uppercase tracking-[0.3em]">STRATEGIC_DIRECTIVE</span>
                 </div>
                 <p className="text-[11px] leading-relaxed text-[#E2E8F0] font-medium italic tracking-tight uppercase">
                    "{aiAnalysis.directive}"
                 </p>
              </div>

              {/* Reasoning Engine (The Matrix) */}
              <div className="space-y-3">
                 <div className="flex items-center gap-2">
                    <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">Logic_Synthesis_Log</span>
                    <div className="h-[1px] flex-1 bg-white/5" />
                 </div>
                 <div className="space-y-2.5">
                    {aiAnalysis.reasoning.map((reason, idx) => (
                      <div key={idx} className="flex gap-3 text-[9px] group">
                        <span className="text-brand-primary font-black opacity-40 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                        <span className="text-gray-500 group-hover:text-gray-300 transition-colors uppercase tracking-tight leading-normal">
                          {reason}
                        </span>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-sm bg-black/20">
              <Brain className="w-8 h-8 mb-6 opacity-5" />
              <button 
                onClick={analyzeMarket}
                className="group relative px-6 py-2 overflow-hidden border border-brand-primary/20 hover:border-brand-primary transition-all rounded-sm"
              >
                <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-brand-primary/10 transition-all" />
                <span className="relative text-[9px] font-black uppercase tracking-[0.4em] text-brand-primary ml-[0.4em]">Initiate_Neural_Core</span>
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-black border-t border-card-border p-2 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/30" />
            <span className="text-[8px] font-black text-gray-700 uppercase leading-none">Kernel: Secured_4.8_A</span>
         </div>
         <Activity className="w-2.5 h-2.5 text-brand-primary/40" />
      </div>
    </div>
  );
}

