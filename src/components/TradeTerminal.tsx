import { useState } from 'react';
import { Terminal, TrendingUp, TrendingDown, Zap, Cpu, Activity } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'motion/react';

export default function TradeTerminal() {
  const { selectedAsset, marketData, executeTrade, portfolio, singularity } = useStore();
  const [amount, setAmount] = useState('0.1');
  const [leverage, setLeverage] = useState(1);
  const currentPrice = marketData.length > 0 ? marketData[marketData.length - 1].price : 0;

  const handleOrder = (type: 'BUY' | 'SELL') => {
    if (!currentPrice || isNaN(parseFloat(amount))) return;
    
    executeTrade({
      asset: selectedAsset,
      type,
      price: currentPrice,
      amount: parseFloat(amount)
    });
  };

  return (
    <div className="h-full bg-panel-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-brand-primary" />
          <h2 className="panel-title">Buồng Thực thi [EXECUTION_PROX]</h2>
        </div>
        <div className="flex items-center gap-2 px-2 py-0.5 bg-brand-primary/5 rounded-sm border border-brand-primary/20">
          <Zap className="w-2.5 h-2.5 text-brand-primary animate-pulse" />
          <span className="text-[7px] font-black text-brand-primary uppercase tracking-widest">Low Latency</span>
        </div>
      </div>

      {/* Manual Trade Input */}
      <div className="p-4 bg-black/40 border-b border-white/5 space-y-4 relative z-10">
        {singularity.active && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 bg-brand-primary/10 backdrop-blur-[4px] flex items-center justify-center border border-brand-primary/40"
          >
            <div className="text-center px-6">
               <Cpu className="w-8 h-8 text-brand-primary mx-auto animate-pulse mb-3" />
               <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] block">AUTOMATED_OVERRIDE</span>
               <p className="text-[7px] text-white/60 uppercase mt-2 tracking-tight">Singularity Engine Controlling Execution Pathway</p>
            </div>
          </motion.div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="data-label text-gray-500">Asset Volume ({selectedAsset})</span>
            <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-sm px-3 py-2 text-xs text-white outline-none focus:border-brand-primary transition-all font-black"
            />
          </div>
          <div className="space-y-1.5">
            <span className="data-label text-gray-500">Target Leverage</span>
            <div className="relative">
              <select 
                value={leverage}
                onChange={(e) => setLeverage(parseInt(e.target.value))}
                className="w-full bg-black border border-white/10 rounded-sm px-3 py-2 text-xs text-white outline-none focus:border-brand-primary appearance-none transition-all font-black"
              >
                {[1, 2, 3, 5, 10, 20, 50, 100].filter(l => l <= portfolio.maxLeverage).map(l => (
                  <option key={l} value={l} className="bg-[#0B0F14]">{l}x</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] p-2.5 bg-black/60 rounded-sm border border-white/5">
           <div className="flex flex-col">
              <span className="data-label text-gray-600">Margin Est.</span>
              <span className="text-white font-black tracking-tight">
                ${((parseFloat(amount || '0') * currentPrice) / leverage).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
           </div>
           <div className="text-right flex flex-col">
              <span className="data-label text-gray-600">Order Risk</span>
              <div className="flex items-center gap-1.5 justify-end">
                 <div className="w-1 h-1 rounded-full bg-brand-primary shadow-[0_0_5px_#00D2FF]" />
                 <span className="text-brand-primary font-black uppercase">Low_Impact</span>
              </div>
           </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 pt-2">
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleOrder('BUY')}
            className="flex flex-col items-center justify-center gap-1.5 bg-brand-primary text-black font-black py-3 rounded-sm text-[9px] uppercase tracking-[0.2em] transition-all relative overflow-hidden"
          >
            <div className="flex items-center gap-2 z-10">
               <TrendingUp className="w-3 h-3" /> LONG_STRATEGY
            </div>
            <div className="absolute top-0 right-0 p-1 opacity-20">
               <Zap className="w-10 h-10 -mr-4 -mt-4 text-black" />
            </div>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleOrder('SELL')}
            className="flex flex-col items-center justify-center gap-1.5 bg-brand-risk text-white font-black py-3 rounded-sm text-[9px] uppercase tracking-[0.2em] transition-all relative overflow-hidden"
          >
            <div className="flex items-center gap-2 z-10">
               <TrendingDown className="w-3 h-3" /> SHORT_STRATEGY
            </div>
            <div className="absolute top-0 right-0 p-1 opacity-20">
               <Zap className="w-10 h-10 -mr-4 -mt-4 text-white" />
            </div>
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll text-[9px]">
        <table className="w-full text-left">
          <thead className="bg-[#0B0F14] sticky top-0 text-gray-600 uppercase z-10 border-b border-white/5">
            <tr>
              <th className="p-3 font-black tracking-widest">Trade Identifier</th>
              <th className="p-3 font-black tracking-widest text-right">Volume</th>
              <th className="p-3 font-black tracking-widest text-right">Fills</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {portfolio.orders.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-10 text-center text-gray-700 italic uppercase tracking-tighter text-[8px]">Standby for signal input... No active execution blocks found.</td>
              </tr>
            ) : (
              portfolio.orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-3 flex items-center gap-3">
                    <div className={`w-1 h-3 ${order.type === 'BUY' ? 'bg-brand-primary' : 'bg-brand-risk'}`} />
                    <div className="flex flex-col">
                       <span className="text-white font-black uppercase tracking-tight">{order.type} {order.asset}</span>
                       <span className="text-[6px] text-gray-700 font-bold uppercase tracking-widest">ID:{order.id.substring(0, 8)}</span>
                    </div>
                  </td>
                  <td className="p-3 text-right">
                     <span className="text-gray-400 font-black">{order.amount.toFixed(4)}</span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex flex-col items-end">
                       <span className="text-white font-black tracking-tighter">${order.price.toLocaleString()}</span>
                       <div className="flex items-center gap-1">
                          <Activity className={`w-1.5 h-1.5 ${order.type === 'BUY' ? 'text-brand-primary' : 'text-brand-risk'}`} />
                          <span className="text-[6px] text-gray-700 font-black uppercase">Settled</span>
                       </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
