import { Cpu, Wifi, Shield, Settings as SettingsIcon } from 'lucide-react';
import { useStore } from '../store/useStore';

interface DashboardHeaderProps {
  onOpenSettings?: () => void;
}

export default function DashboardHeader({ onOpenSettings }: DashboardHeaderProps) {
  const { selectedAsset, marketData, latency, dataSource, profile, portfolio } = useStore();
  const currentPrice = marketData.length > 0 
    ? marketData[marketData.length - 1].price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '---';

  const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

  return (
    <header className="h-14 lg:h-16 border-b border-card-border bg-[#0B0F14] flex items-center justify-between px-4 lg:px-6 backdrop-blur-md z-50 shrink-0 font-mono">
      <div className="flex items-center gap-4 lg:gap-10">
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-black text-black shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            style={{ backgroundColor: profile.avatarColor }}
          >
            {profile.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="text-[10px] lg:text-[11px] font-black text-white tracking-[0.1em]">{profile.name.toUpperCase()}</span>
              <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-[2px] bg-brand-primary/5 border border-brand-primary/20">
                <div className={`w-1 h-1 rounded-full ${dataSource === 'LIVE' ? 'bg-brand-primary animate-pulse' : 'bg-brand-secondary'}`} />
                <span className={`text-[7px] font-black uppercase tracking-widest ${dataSource === 'LIVE' ? 'text-brand-primary' : 'text-brand-secondary'}`}>
                  {dataSource}
                </span>
              </div>
            </div>
            <span className="text-[9px] font-medium text-gray-600 tracking-[0.4em] uppercase mt-0.5">MIRO_OS // V4.8</span>
          </div>
        </div>

        <div className="hidden sm:flex gap-8">
          <div className="flex flex-col">
            <span className="data-label text-gray-600">Available Capital</span>
            <span className="text-[11px] text-white font-black tracking-tight">${portfolio.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex flex-col">
            <span className="data-label text-gray-600">Network Latency</span>
            <div className="flex items-center gap-2">
               <span className="text-[11px] text-brand-primary font-black tracking-tighter">{latency}</span>
               <div className="flex gap-0.5 items-end h-2">
                  <div className="w-[1px] h-[30%] bg-brand-primary" />
                  <div className="w-[1px] h-[60%] bg-brand-primary" />
                  <div className="w-[1px] h-[100%] bg-brand-primary" />
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-4 overflow-x-auto no-scrollbar py-1">
        {[
          { label: 'WTI', color: 'text-brand-primary', borderColor: 'border-brand-primary/30' },
          { label: 'BTC', color: 'text-orange-400', borderColor: 'border-orange-400/30' },
          { label: 'ETH', color: 'text-indigo-400', borderColor: 'border-indigo-400/30' },
          { label: 'GOLD', color: 'text-yellow-400', borderColor: 'border-yellow-400/30' },
        ].map((asset) => (
          <div 
            key={asset.label} 
            className={`flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-sm border transition-all duration-500 ${selectedAsset === asset.label ? `${asset.borderColor} bg-white/[0.02]` : 'border-white/5 opacity-40 hover:opacity-100'} shrink-0`}
          >
            <span className="text-[8px] font-black text-gray-500 tracking-tighter">{asset.label}</span>
            <span className={`text-[10px] font-black ${asset.color} tracking-tighter`}>
              {selectedAsset === asset.label ? `$${currentPrice}` : '---'}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex gap-4 border-r border-white/5 pr-4">
          <Wifi className="w-3.5 h-3.5 text-brand-primary opacity-70" />
          <Shield className="w-3.5 h-3.5 text-gray-600" />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-black text-white tracking-widest">{time}</span>
            <span className="hidden sm:inline text-[7px] font-black text-gray-700 tracking-[0.2em] uppercase">SECURE_NODE_TX</span>
          </div>
          <button 
            onClick={onOpenSettings}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-full transition-all text-gray-500 hover:text-brand-primary"
          >
            <SettingsIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
