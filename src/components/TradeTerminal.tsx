import { useState, useEffect } from 'react';
import { Trade } from '../types';
import { ArrowUpRight, ArrowDownLeft, Terminal } from 'lucide-react';

export default function TradeTerminal() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Initial trades
    const initialTrades: Trade[] = Array.from({ length: 15 }).map((_, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      symbol: "WTI/USD",
      side: Math.random() > 0.5 ? 'buy' : 'sell',
      price: 83 + Math.random(),
      amount: Math.random() * 10,
      time: new Date().toLocaleTimeString(),
      status: 'filled'
    }));
    setTrades(initialTrades);

    const interval = setInterval(() => {
      const newTrade: Trade = {
        id: Math.random().toString(36).substr(2, 9),
        symbol: "WTI/USD",
        side: Math.random() > 0.5 ? 'buy' : 'sell',
        price: 83 + Math.random(),
        amount: Math.random() * 10,
        time: new Date().toLocaleTimeString(),
        status: 'filled'
      };
      setTrades(prev => [newTrade, ...prev.slice(0, 20)]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col">
      <div className="p-3 border-b border-card-border flex items-center gap-2">
        <Terminal className="w-3 h-3 text-brand-primary" />
        <h2 className="text-[10px] font-mono uppercase tracking-widest font-bold">Nhật ký Thực thi</h2>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll font-mono text-[9px]">
        <table className="w-full text-left">
          <thead className="bg-black/50 sticky top-0 text-gray-500 uppercase">
            <tr>
              <th className="p-2">Thời gian</th>
              <th className="p-2 text-right">K.Lượng</th>
              <th className="p-2 text-right">Giá</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-2 text-gray-500">{trade.time}</td>
                <td className={`p-2 text-right ${trade.side === 'buy' ? 'text-brand-primary' : 'text-brand-secondary'}`}>
                   {trade.amount.toFixed(4)}
                </td>
                <td className="p-2 text-right flex items-center justify-end gap-1">
                  ${trade.price.toFixed(2)}
                  {trade.side === 'buy' ? 
                    <ArrowUpRight className="w-2 h-2 text-brand-primary" /> : 
                    <ArrowDownLeft className="w-2 h-2 text-brand-secondary" />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
