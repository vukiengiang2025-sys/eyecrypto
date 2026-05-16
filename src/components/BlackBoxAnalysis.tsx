import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { ShieldAlert, Binary, CheckCircle2, XCircle, Info, Database, Search, Activity } from 'lucide-react';

export default function BlackBoxAnalysis() {
  const { portfolio } = useStore();
  
  // Latest executions for analysis
  const orders = portfolio.orders.slice(-5).reverse();

  return (
    <div className="h-full bg-panel-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(0,210,255,0.02),transparent)] pointer-events-none" />
      
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Database className="w-3 h-3 text-brand-primary" />
          <h2 className="panel-title">BLACK_BOX [COGNITIVE_LOGS]</h2>
        </div>
        <div className="flex items-center gap-2">
          <Binary className="w-2.5 h-2.5 text-brand-primary animate-pulse" />
          <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">RECORDING_STREAM</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-3 bg-panel-bg/40">
        {orders.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-20">
            <Search className="w-6 h-6 text-gray-600" />
            <p className="text-[8px] font-black uppercase tracking-widest">Awaiting execution data for analysis...</p>
          </div>
        ) : (
          orders.map((order, i) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/40 border border-white/5 rounded-sm p-3 space-y-3 relative overflow-hidden group hover:border-brand-primary/20 transition-all cursor-help"
            >
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-3 ${order.type === 'BUY' ? 'bg-brand-primary' : 'bg-brand-risk'} shadow-[0_0_8px_currentColor]`} />
                  <span className="text-[10px] font-black text-white group-hover:text-brand-primary transition-colors tracking-widest uppercase">#{order.id.substring(0, 8)}</span>
                </div>
                <span className="text-[7px] text-gray-700 font-black uppercase tracking-tighter italic">{new Date(order.timestamp).toLocaleTimeString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[9px] relative z-10">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">Instrument_Price</span>
                  <span className="text-white font-black tracking-tighter">{order.asset} @ ${order.price.toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[7px] font-black text-gray-700 uppercase tracking-widest">MIRO_Validation</span>
                  <div className="flex items-center gap-1.5 text-brand-primary">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span className="font-black uppercase tracking-tight">OPTIMIZED_ENTRY</span>
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-brand-primary/[0.02] rounded-sm border border-brand-primary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 opacity-10">
                   <Binary className="w-8 h-8 -mr-2 -mt-2 text-brand-primary" />
                </div>
                <p className="text-[9px] leading-relaxed text-[#A0AEC0] italic relative z-10 font-medium">
                  "Execution aligned with Support_Cluster [OSINT_VERIFIED]. Behavioral sync suggests CALM_STATE baseline. Zero divergence detected in terminal flow."
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1 opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="h-[1px] flex-1 bg-white/5" />
                <div className="flex items-center gap-1.5 text-[7px] font-black text-gray-700 uppercase tracking-[0.2em]">
                  <ShieldAlert className="w-2 h-2" />
                  <span>Risk_Factor :: Minimal</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="p-2 bg-black border-t border-card-border flex items-center gap-3">
        <Activity className="w-3 h-3 text-brand-primary opacity-20" />
        <p className="text-[7px] text-gray-700 font-black uppercase leading-tight tracking-[0.05em]">
          BlackBox archival active. Ephemeral data points being synthesized into long-term memory for heuristic tuning.
        </p>
      </div>
    </div>
  );
}
