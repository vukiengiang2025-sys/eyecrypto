import { Cpu, Wifi, Shield, Globe } from 'lucide-react';

export default function DashboardHeader() {
  const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

  return (
    <header className="h-14 lg:h-16 border-b border-card-border bg-black/40 flex items-center justify-between px-4 lg:px-6 backdrop-blur-md z-50 shrink-0">
      <div className="flex items-center gap-4 lg:gap-8">
        <div className="flex flex-col">
          <span className="text-[8px] lg:text-[10px] font-mono text-brand-primary tracking-[0.2em] font-bold">EPUS 4.7</span>
          <span className="text-[12px] lg:text-[14px] font-display font-extrabold tracking-tighter text-white whitespace-nowrap uppercase">Hệ thống MIRO</span>
        </div>

        <div className="hidden sm:flex gap-4 lg:gap-6">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-gray-500 uppercase">Độ trễ</span>
            <span className="text-[10px] font-mono text-brand-primary">2.4ms</span>
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-[8px] font-mono text-gray-500 uppercase">Độ ổn định</span>
            <span className="text-[10px] font-mono text-brand-primary">99.7%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-4 overflow-x-auto no-scrollbar py-1">
        {[
          { label: 'WTI', price: '83.67', color: 'text-brand-primary' },
          { label: 'BTC', price: '64,120', color: 'text-orange-400' },
          { label: 'ETH', price: '3,450', color: 'text-indigo-400' },
          { label: 'GOLD', price: '2,380', color: 'text-yellow-400' },
        ].map((asset) => (
          <div key={asset.label} className="flex items-center gap-2 px-2 lg:px-3 py-1 bg-white/5 rounded border border-white/10 shrink-0">
            <span className="text-[9px] lg:text-[10px] font-mono text-gray-500">{asset.label}:</span>
            <span className={`text-[10px] lg:text-[11px] font-mono ${asset.color}`}>${asset.price}</span>
            <div className={`w-1 h-1 rounded-full animate-ping ${asset.color.replace('text-', 'bg-')}`} />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        <div className="hidden sm:flex gap-3">
          <Wifi className="w-4 h-4 text-brand-primary" />
          <Shield className="w-4 h-4 text-gray-500" />
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[10px] font-mono text-gray-400">{time}</span>
          <span className="hidden sm:inline text-[8px] font-mono text-gray-600 uppercase">LƯỚI v4</span>
        </div>
      </div>
    </header>
  );
}
