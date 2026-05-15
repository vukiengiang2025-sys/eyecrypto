import { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Terminal, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'motion/react';

export default function TradeTerminal() {
  const { selectedAsset, marketData, executeTrade, portfolio } = useStore();
  const [amount, setAmount] = useState('0.1');
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
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-brand-primary" />
          <h2 className="text-[10px] font-mono uppercase tracking-widest font-bold text-white">Buồng Thực thi Giao dịch</h2>
        </div>
        <div className="flex items-center gap-2 px-2 py-0.5 bg-brand-primary/10 rounded border border-brand-primary/20">
          <Zap className="w-2.5 h-2.5 text-brand-primary animate-pulse" />
          <span className="text-[8px] font-mono text-brand-primary uppercase">Tức thời</span>
        </div>
      </div>

      {/* Manual Trade Input */}
      <div className="p-4 bg-black/20 border-b border-card-border">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <span className="text-[8px] text-gray-500 uppercase font-bold">Lượng {selectedAsset}</span>
            <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded px-2 py-2 text-xs text-white outline-none focus:border-brand-primary"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[8px] text-gray-500 uppercase font-bold">Ước tính (USD)</span>
            <div className="w-full bg-black/40 border border-white/5 rounded px-2 py-2 text-xs text-gray-400">
              ${(parseFloat(amount || '0') * currentPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOrder('BUY')}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded text-[10px] uppercase transition-colors shadow-lg shadow-green-500/20"
          >
            <TrendingUp className="w-3 h-3" /> MUA {selectedAsset}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOrder('SELL')}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded text-[10px] uppercase transition-colors shadow-lg shadow-red-500/20"
          >
            <TrendingDown className="w-3 h-3" /> BÁN {selectedAsset}
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll font-mono text-[9px]">
        <table className="w-full text-left">
          <thead className="bg-black/50 sticky top-0 text-gray-500 uppercase z-10">
            <tr>
              <th className="p-2 border-b border-white/5">Lệnh</th>
              <th className="p-2 border-b border-white/5 text-right">K.Lượng</th>
              <th className="p-2 border-b border-white/5 text-right">Giá</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.orders.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-600 italic">Hệ thống sẵn sàng. Chưa có lệnh thực thi.</td>
              </tr>
            ) : (
              portfolio.orders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-2 flex items-center gap-2">
                    <span className={order.type === 'BUY' ? 'text-green-500' : 'text-red-500'}>
                      {order.type}
                    </span>
                    <span className="text-gray-600 font-bold">{order.asset}</span>
                  </td>
                  <td className="p-2 text-right text-gray-300">
                     {order.amount.toFixed(4)}
                  </td>
                  <td className="p-2 text-right flex items-center justify-end gap-1 text-white">
                    ${order.price.toLocaleString()}
                    {order.type === 'BUY' ? 
                      <ArrowUpRight className="w-2.5 h-2.5 text-green-500" /> : 
                      <ArrowDownLeft className="w-2.5 h-2.5 text-red-500" />
                    }
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
