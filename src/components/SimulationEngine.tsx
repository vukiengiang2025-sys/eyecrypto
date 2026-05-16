import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';
import { Zap, Play, RotateCcw, AlertTriangle, ShieldCheck, Activity, Globe, TrendingDown, Target, Brain } from 'lucide-react';

export default function SimulationEngine() {
  const { simulation, runScenarioSimulation, resetScenarios } = useStore();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'BLACK_SWAN': return 'text-brand-risk border-brand-risk/30 bg-brand-risk/5';
      case 'MACRO_SHOCK': return 'text-brand-accent border-brand-accent/30 bg-brand-accent/5';
      case 'LIQUIDITY_CASCADE': return 'text-purple-400 border-purple-400/30 bg-purple-400/5';
      default: return 'text-brand-primary border-brand-primary/30 bg-brand-primary/5';
    }
  };

  return (
    <div className="h-full bg-panel-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,210,255,0.02),transparent)] pointer-events-none" />
      
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Brain className="w-3 h-3 text-brand-primary" />
          <h2 className="panel-title">SIMULATION_CORE [SCENARIO_ENGINE_V1]</h2>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={resetScenarios}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 transition-all text-[7px] font-black tracking-widest uppercase"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            RE_INITIALIZE
          </button>
          <div className="flex items-center gap-2 px-2 py-0.5 bg-brand-primary/5 border border-brand-primary/20 rounded-sm">
             <Zap className="w-2.5 h-2.5 text-brand-primary animate-pulse" />
             <span className="text-[7px] font-black text-brand-primary uppercase tracking-[0.2em]">Live_Sync</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col bg-panel-bg/40">
        {/* Global Stability Matrix */}
        <div className="p-4 bg-black/40 border-b border-white/5 grid grid-cols-2 gap-8 relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
           
           <div className="space-y-2 relative z-10">
              <div className="flex items-center justify-between">
                 <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">Global Stability Index</span>
                 <span className={`text-sm font-black ${simulation.globalStabilityIndex > 70 ? 'text-brand-primary' : 'text-brand-risk'}`}>
                    {simulation.globalStabilityIndex}%
                 </span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden flex">
                 <motion.div 
                   animate={{ width: `${simulation.globalStabilityIndex}%` }}
                   className={`h-full ${simulation.globalStabilityIndex > 70 ? 'bg-brand-primary shadow-[0_0_8px_#00D2FF]' : 'bg-brand-risk shadow-[0_0_8px_#FF0055]'}`}
                 />
              </div>
           </div>
           <div className="space-y-2 relative z-10">
              <div className="flex items-center justify-between">
                 <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">Projected Volatility</span>
                 <span className="text-sm font-black text-brand-accent">{simulation.projectedVolatility}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ width: `${(simulation.projectedVolatility/50)*100}%` }}
                   className="h-full bg-brand-accent shadow-[0_0_8px_#F59E0B]"
                 />
              </div>
           </div>
        </div>

        {/* Scenarios List */}
        <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-4">
           {simulation.activeScenarios.map((scenario, i) => (
              <motion.div 
                key={scenario.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-sm border transition-all group overflow-hidden relative ${
                  scenario.status === 'COMPLETED' 
                    ? 'bg-brand-primary/[0.04] border-brand-primary/20' 
                    : 'bg-black/60 border-white/5 hover:border-brand-primary/40'
                }`}
              >
                 <div className="absolute top-0 right-0 p-1 opacity-5">
                    <Brain className="w-16 h-16 -mr-4 -mt-4" />
                 </div>

                 <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="flex items-center gap-3">
                       <div className={`px-2 py-0.5 border text-[7px] font-black uppercase tracking-widest rounded-sm ${getTypeColor(scenario.type)}`}>
                         {scenario.type}
                       </div>
                       <h3 className="text-[10px] font-black text-white/90 tracking-[0.1em] uppercase">{scenario.name}</h3>
                    </div>
                    {scenario.status === 'IDLE' ? (
                       <button 
                         onClick={() => runScenarioSimulation(scenario.id)}
                         className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary text-black text-[8px] font-black uppercase tracking-[0.2em] rounded-sm hover:scale-105 transition-all shadow-[0_0_10px_rgba(0,210,255,0.2)]"
                       >
                          <Play className="w-2.5 h-2.5 fill-current" />
                          RUN_SEQUENCE
                       </button>
                    ) : (
                       <div className="flex items-center gap-1.5 text-[8px] text-brand-primary font-black uppercase tracking-widest">
                          <ShieldCheck className="w-3 h-3" />
                          SYNTHESIZED
                       </div>
                    )}
                 </div>

                 <p className="text-[10px] text-[#A0AEC0] mb-5 leading-relaxed font-medium italic opacity-70">{scenario.description}</p>

                 <div className="grid grid-cols-3 gap-6 mb-4 relative z-10">
                    <div className="flex flex-col gap-1">
                       <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">PROBABILITY</span>
                       <span className="text-[12px] font-black text-white tracking-tighter">{scenario.probability}%</span>
                    </div>
                    <div className="flex flex-col gap-1">
                       <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">IMPACT_EST</span>
                       <span className="text-[12px] font-black text-brand-risk tracking-tighter">{scenario.impactScore}/100</span>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                       <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">RISK_TIER</span>
                       <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                          <span className="text-[10px] font-black text-brand-accent">CRITICAL</span>
                       </div>
                    </div>
                 </div>

                 <AnimatePresence>
                    {scenario.outcome && (
                       <motion.div 
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         className="mt-4 pt-4 border-t border-white/5 overflow-hidden"
                       >
                          <div className="flex items-center gap-2 mb-2">
                             <Target className="w-2.5 h-2.5 text-brand-primary" />
                             <span className="text-[7px] font-black text-brand-primary uppercase tracking-[0.3em]">SYNTHETIC_OUTCOME_ANALYSIS</span>
                          </div>
                          <div className="bg-brand-primary/[0.03] p-3 border border-brand-primary/10 rounded-sm relative overflow-hidden">
                             <p className="text-[9px] text-[#CBD5E0] italic font-medium leading-relaxed relative z-10">
                               {scenario.outcome}
                             </p>
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </motion.div>
           ))}
        </div>
      </div>

      <div className="p-2 bg-black border-t border-card-border flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <Globe className="w-2.5 h-2.5 text-gray-700" />
               <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">Lab_Status :: Operational</span>
            </div>
            <div className="flex items-center gap-2">
               <TrendingDown className="w-2.5 h-2.5 text-brand-risk/40" />
               <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">Defense_Array :: Armed</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <Activity className="w-3 h-3 text-brand-primary opacity-20" />
            <span className="text-[7px] font-black text-brand-primary/40 uppercase tracking-widest">Imagining Future Divergences...</span>
         </div>
      </div>
    </div>
  );
}
