import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { ShieldCheck, Zap, AlertTriangle, Cpu, Users, BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function ConsensusMatrix() {
  const { agents, consensus, marketData, runConsensusCycle } = useStore();
  const currentPrice = marketData.length > 0 ? marketData[marketData.length - 1].price : 0;

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'BULLISH': return 'text-green-500';
      case 'BEARISH': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'BULLISH': return <TrendingUp className="w-3 h-3" />;
      case 'BEARISH': return <TrendingDown className="w-3 h-3" />;
      default: return <Minus className="w-3 h-3" />;
    }
  };

  return (
    <div className="h-full bg-panel-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white relative">
      {/* Background Tension Glow */}
      <div className={`absolute inset-0 opacity-5 pointer-events-none transition-all duration-1000 ${consensus.agreementRate < 40 ? 'bg-red-500' : 'bg-brand-primary'}`} />

      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Users className="w-3 h-3 text-brand-primary" />
          <h2 className="panel-title">Ma trận Đồng thuận [CONSENSUS_MATRIX]</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-brand-primary/10 border border-brand-primary/20">
           <Cpu className="w-2.5 h-2.5 text-brand-primary animate-pulse" />
           <span className="text-[7px] font-black text-brand-primary tracking-tighter">AGENT_CLUSTER_ACTIVE</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col relative z-10">
        {/* Consensus Header Stats */}
        <div className="p-3 grid grid-cols-2 gap-3 border-b border-white/5 bg-black/40">
           <div className="space-y-0.5">
              <span className="data-label text-gray-500">Chỉ số Đồng thuận</span>
              <div className="flex items-baseline gap-1">
                 <span className="text-xl font-black text-brand-primary tracking-tighter">{consensus.overallScore}</span>
                 <span className="text-[8px] text-gray-600 font-bold tracking-widest">/100 [CFD]</span>
              </div>
           </div>
           <div className="space-y-0.5">
              <span className="data-label text-gray-500">Tỷ lệ Nhất quán</span>
              <div className="flex items-baseline gap-1">
                 <span className="text-xl font-black text-[#E2E8F0] tracking-tighter">{consensus.agreementRate}%</span>
                 <span className="text-[8px] text-gray-600 font-bold tracking-widest">AGR_FLW</span>
              </div>
           </div>
        </div>

        {/* Agents Debate Visualization */}
        <div className="flex-1 overflow-y-auto terminal-scroll p-3 space-y-2 relative">
           {/* Connecting Line */}
           <div className="absolute left-[22px] top-4 bottom-4 w-[1px] bg-white/5 pointer-events-none" />

           {agents.map((agent, i) => (
              <motion.div 
                key={agent.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-2.5 rounded-sm border transition-all relative ${
                  consensus.primaryDriver === agent.name 
                    ? 'bg-brand-primary/5 border-brand-primary/40' 
                    : 'bg-black/20 border-white/5'
                }`}
              >
                 <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                       <div className={`w-1 h-1 rounded-full ${agent.confidence > 75 ? 'bg-brand-primary' : 'bg-gray-700'}`} />
                       <span className={`text-[8px] font-black tracking-[0.1em] ${consensus.primaryDriver === agent.name ? 'text-brand-primary' : 'text-gray-400'}`}>
                         {agent.name.toUpperCase()}
                       </span>
                    </div>
                    <div className={`flex items-center gap-1 px-1 py-0.5 rounded-[2px] bg-black/50 border border-white/10 ${getSignalColor(agent.signal)}`}>
                       {getSignalIcon(agent.signal)}
                       <span className="text-[6px] font-black">{agent.signal}</span>
                    </div>
                 </div>
                 
                 <div className="flex gap-2">
                    <p className="flex-1 text-[8px] text-gray-500 font-medium leading-relaxed uppercase tracking-tight">
                      <span className="text-gray-700 mr-1 text-[7px]">[LOG]:</span>
                      {agent.reason}
                    </p>
                    <div className="text-right shrink-0">
                       <span className="text-[12px] font-black text-white/90">{agent.confidence}</span>
                       <span className="text-[7px] text-gray-600 font-black ml-0.5">%</span>
                    </div>
                 </div>

                 {/* Influence Bar */}
                 <div className="mt-2 h-[1px] w-full bg-white/5 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${agent.confidence}%` }}
                      className={`absolute h-full ${agent.confidence > 80 ? 'bg-brand-primary' : (agent.confidence > 50 ? 'bg-brand-primary/40' : 'bg-gray-800')}`}
                    />
                 </div>
              </motion.div>
           ))}
        </div>

        {/* Validation Footnote */}
        <div className="p-3 bg-black/40 border-t border-card-border">
           <div className="flex items-center justify-between mb-3">
              <div>
                 <span className="data-label">Chi phối bởi:</span>
                 <div className="text-[9px] font-black text-brand-primary uppercase tracking-widest">{consensus.primaryDriver}</div>
              </div>
              <div className="text-right">
                 <span className="data-label">Điểm Vô hiệu:</span>
                 <div className="text-[9px] font-black text-brand-risk tracking-tighter">${consensus.invalidationPoint.toLocaleString()}</div>
              </div>
           </div>

           <button 
             onClick={() => runConsensusCycle(currentPrice)}
             className="w-full py-2 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-[8px] font-black uppercase tracking-[0.3em] rounded-sm hover:bg-brand-primary hover:text-black transition-all group overflow-hidden relative"
           >
             <span className="relative z-10">RUN_SYNTHESIS_CYCLE</span>
             <motion.div 
               className="absolute inset-0 bg-brand-primary/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
             />
           </button>
        </div>
      </div>
    </div>
  );
}
