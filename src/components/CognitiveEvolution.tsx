import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Brain, Cpu, Database, Network, Binary, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function CognitiveEvolution() {
  const { aiAnalysis, cognitiveEvolution } = useStore();

  if (!aiAnalysis) return null;

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-brand-primary" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold text-white">Lõi Tiến hóa Nhận thức</h2>
        </div>
        <div className="flex items-center gap-2 text-[8px] text-brand-primary">
           <Binary className="w-3 h-3 animate-pulse" />
           <span>SYNAPSE_LINK: ACTIVE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-6">
        {/* Evolution Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/5 border border-white/10 p-2 rounded text-center">
            <span className="text-[7px] text-gray-500 uppercase block">Neurons</span>
            <span className="text-xs font-bold text-brand-primary">{cognitiveEvolution.activeNeurons.toLocaleString()}</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-2 rounded text-center">
            <span className="text-[7px] text-gray-500 uppercase block">Accuracy</span>
            <span className="text-xs font-bold text-green-500">{cognitiveEvolution.accuracyRate.toFixed(1)}%</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-2 rounded text-center">
            <span className="text-[7px] text-gray-500 uppercase block">Signals</span>
            <span className="text-xs font-bold text-white">{cognitiveEvolution.totalSignalsAnalyzed}</span>
          </div>
        </div>

        {/* Reliability vs Confidence */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-[8px] uppercase">
              <span className="text-gray-500">Độ tin cậy Tự đánh giá (Self-Reliability)</span>
              <span className="text-brand-secondary font-bold">{aiAnalysis.metaCognition.reliabilityScore}%</span>
            </div>
            <div className="h-1 bg-black/40 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${aiAnalysis.metaCognition.reliabilityScore}%` }}
                className="h-full bg-brand-secondary shadow-[0_0_8px_rgba(129,140,248,0.5)]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[8px] uppercase">
              <span className="text-gray-500">Tiến trình Học hỏi (Learning Progress)</span>
              <span className="text-orange-500 font-bold">{aiAnalysis.metaCognition.learningProgress}%</span>
            </div>
            <div className="h-1 bg-black/40 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${aiAnalysis.metaCognition.learningProgress}%` }}
                className="h-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"
              />
            </div>
          </div>
        </div>

        {/* Internal Conflicts (Explainability) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3 h-3 text-red-500" />
            <h3 className="text-[9px] font-bold text-white uppercase tracking-wider">Xung đột Nhận thức (Counter-Signals)</h3>
          </div>
          <div className="space-y-1.5">
            {aiAnalysis.metaCognition.internalConflicts.map((conflict, idx) => (
              <div key={idx} className="bg-red-500/5 border border-red-500/10 p-2 rounded text-[10px] text-red-200/70 border-l-2 border-l-red-500">
                {conflict}
              </div>
            ))}
          </div>
        </div>

        {/* AI Explanation */}
        <div className="bg-brand-primary/5 border border-brand-primary/20 p-3 rounded-lg relative overflow-hidden">
          <Database className="absolute bottom-0 right-0 w-12 h-12 -mb-4 -mr-4 text-brand-primary opacity-5" />
          <h4 className="text-[8px] font-bold text-brand-primary uppercase mb-2 flex items-center gap-1.5">
            <Binary className="w-3 h-3" /> MIRO_INTERNAL_LOGIC_EXPLANATION
          </h4>
          <p className="text-[10px] text-gray-300 italic leading-relaxed">
            "{aiAnalysis.metaCognition.explanation}"
          </p>
        </div>
      </div>

      <div className="p-3 bg-black/40 border-t border-card-border flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-green-500" />
          <span className="text-[8px] text-gray-500 uppercase">Audit Status: SECURE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3 h-3 text-brand-primary animate-spin" />
          <span className="text-[8px] text-gray-500 uppercase">Tier: SUPERINTELLIGENCE-BETA</span>
        </div>
      </div>
    </div>
  );
}
