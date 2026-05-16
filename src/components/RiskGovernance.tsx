import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { ShieldAlert, Zap, Cpu, BarChart3, Activity, AlertTriangle, ShieldCheck, Thermometer, TrendingDown, Target } from 'lucide-react';

export default function RiskGovernance() {
  const { riskGovernance, updateRiskGovernance, psychology, portfolio } = useStore();

  const getRegimeColor = (regime: string) => {
    switch (regime) {
      case 'TRENDING_UP': return 'text-green-400';
      case 'TRENDING_DOWN': return 'text-red-400';
      case 'VOLATILE': return 'text-yellow-400';
      case 'LOW_LIQUIDITY': return 'text-purple-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className={`h-full bg-panel-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white transition-all duration-700 relative ${
      riskGovernance.survivalMode ? 'border-brand-risk ring-1 ring-brand-risk/20' : ''
    }`}>
      {/* Dynamic Risk Atmosphere Overlay */}
      <motion.div 
        animate={{ 
          opacity: (riskGovernance.portfolioStress / 100) * 0.4,
          backgroundColor: riskGovernance.survivalMode ? '#EF4444' : '#F59E0B'
        }}
        className="absolute inset-0 pointer-events-none z-0"
      />

      <div className="panel-header z-10">
        <div className="flex items-center gap-2">
          <ShieldAlert className={`w-3 h-3 ${riskGovernance.survivalMode ? 'text-brand-risk animate-pulse' : 'text-brand-primary'}`} />
          <h2 className="panel-title">Quản trị Rủi ro [RISK_GOVERNANCE]</h2>
        </div>
        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-sm border ${riskGovernance.survivalMode ? 'bg-brand-risk/10 border-brand-risk text-brand-risk' : 'bg-brand-primary/10 border-brand-primary/30 text-brand-primary'}`}>
           <span className="text-[7px] font-black uppercase tracking-widest">{riskGovernance.survivalMode ? 'SURVIVAL_ACTIVE' : 'READY'}</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col z-10 bg-panel-bg/60 backdrop-blur-sm">
        {/* Regime Monitoring */}
        <div className="p-3 bg-black/60 border-b border-white/5 grid grid-cols-2 gap-4">
           <div className="space-y-0.5">
              <span className="data-label">Market Dynamic State</span>
              <div className={`text-[10px] font-black flex items-center gap-2 ${getRegimeColor(riskGovernance.regime)}`}>
                 <Activity className="w-2.5 h-2.5" />
                 <span className="tracking-widest">{riskGovernance.regime}</span>
              </div>
           </div>
           <div className="flex flex-col items-end justify-center">
              <button 
                onClick={() => updateRiskGovernance({ survivalMode: !riskGovernance.survivalMode })}
                className={`flex items-center gap-2 px-2 py-1 rounded-sm border transition-all ${riskGovernance.survivalMode ? 'bg-brand-risk text-white border-brand-risk shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/20'}`}
              >
                 <Zap className="w-2.5 h-2.5" />
                 <span className="text-[7px] font-black uppercase tracking-tighter">Emergency Toggle</span>
              </button>
           </div>
        </div>

        {/* Tactical Parameters */}
        <div className="px-3 py-4 grid grid-cols-2 gap-3 border-b border-white/5">
           <div className="p-2.5 bg-black/40 rounded-sm border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                 <span className="data-label opacity-60">Leverage Opt.</span>
                 <span className="text-[9px] font-black text-white">{riskGovernance.maxLeverage}x</span>
              </div>
              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ width: `${(riskGovernance.maxLeverage / 20) * 100}%` }}
                   className={`h-full ${riskGovernance.maxLeverage > 10 ? 'bg-brand-accent' : 'bg-brand-primary'}`}
                 />
              </div>
           </div>

           <div className="p-2.5 bg-black/40 rounded-sm border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                 <span className="data-label opacity-60">Size Scale</span>
                 <span className="text-[9px] font-black text-white">{riskGovernance.positionSizingFactor}x</span>
              </div>
              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ width: `${(riskGovernance.positionSizingFactor / 2) * 100}%` }}
                   className={`h-full ${riskGovernance.positionSizingFactor < 0.5 ? 'bg-brand-risk' : 'bg-brand-primary'}`}
                 />
              </div>
           </div>
        </div>

        {/* Biometric Risk Signals */}
        <div className="flex-1 p-3 space-y-4 overflow-y-auto terminal-scroll">
           {/* Psychological Pressure */}
           <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-1.5">
                    <Thermometer className={`w-2.5 h-2.5 ${riskGovernance.psychologicalStressScore > 60 ? 'text-brand-risk animate-pulse' : 'text-brand-primary'}`} />
                    <span className="data-label">Psychological Load</span>
                 </div>
                 <span className={`text-[9px] font-black ${riskGovernance.psychologicalStressScore > 70 ? 'text-brand-risk' : 'text-white'}`}>
                    {riskGovernance.psychologicalStressScore}%
                 </span>
              </div>
              <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-0.5 h-1.5">
                 {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`transition-all duration-300 ${
                        (i + 1) * 5 <= riskGovernance.psychologicalStressScore 
                          ? (riskGovernance.psychologicalStressScore > 70 ? 'bg-brand-risk' : (riskGovernance.psychologicalStressScore > 40 ? 'bg-brand-accent' : 'bg-brand-primary')) 
                          : 'bg-white/5'
                      }`} 
                    />
                 ))}
              </div>
           </div>

           {/* Portfolio Heat Map */}
           <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-1.5">
                    <BarChart3 className="w-2.5 h-2.5 text-brand-primary" />
                    <span className="data-label">Portfolio Heat</span>
                 </div>
                 <span className="text-[9px] font-black text-white">{riskGovernance.portfolioStress}%</span>
              </div>
              <div className="h-1.5 bg-white/5 relative rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ width: `${riskGovernance.portfolioStress}%` }}
                   className={`h-full ${riskGovernance.portfolioStress > 80 ? 'bg-brand-risk shadow-[0_0_10px_#EF4444]' : 'bg-brand-primary'}`}
                 />
              </div>
           </div>

           {/* Active Safeguard Matrix */}
           <div className="grid grid-cols-1 gap-1">
              {[
                { name: 'DRAWDOWN_LOCK', active: true, desc: 'Locked at -3.5%' },
                { name: 'CORRELATION_GATE', active: riskGovernance.portfolioStress > 40, desc: 'Reducing ETH exposure' },
                { name: 'SURVIVAL_BUFFER', active: riskGovernance.survivalMode, desc: 'Liquidating non-core' },
              ].map(s => (
                <div key={s.name} className={`p-1.5 rounded-sm border flex items-center justify-between transition-all ${s.active ? 'bg-brand-primary/5 border-brand-primary/20' : 'bg-transparent border-white/5'}`}>
                   <div className="flex flex-col">
                      <span className={`text-[7px] font-black tracking-widest ${s.active ? 'text-brand-primary' : 'text-gray-600'}`}>{s.name}</span>
                      <span className="text-[5px] text-gray-500 uppercase tracking-tighter">{s.desc}</span>
                   </div>
                   <div className={`w-1 h-1 rounded-full ${s.active ? 'bg-brand-primary shadow-[0_0_5px_#00D2FF]' : 'bg-gray-800'}`} />
                </div>
              ))}
           </div>
        </div>

        {/* Global Safety Interface */}
        <div className="p-3 bg-black border-t border-card-border flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="flex flex-col">
                 <span className="data-label opacity-40">24H_PL</span>
                 <span className="text-[10px] font-black text-brand-risk">-$2.4K</span>
              </div>
              <div className="flex flex-col">
                 <span className="data-label opacity-40">MAX_DD</span>
                 <span className="text-[10px] font-black text-brand-accent">1.2%</span>
              </div>
           </div>
           <button className="flex items-center gap-1.5 group p-1.5 hover:bg-white/5 rounded transition-all">
              <ShieldCheck className="w-3 h-3 text-brand-primary" />
              <span className="text-[7px] font-black text-brand-primary uppercase tracking-[0.2em] border-b border-brand-primary/20">REPORT</span>
           </button>
        </div>
      </div>
    </div>
  );
}
