import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { ShieldAlert, TrendingUp, Wallet, PieChart, Activity, Zap } from 'lucide-react';

export default function PortfolioAnalytics() {
  const { portfolio, sovereignty } = useStore();
  
  const totalAssetValue = Object.entries(portfolio.assets).reduce((acc, [symbol, amount]) => {
    // Mock prices if not available in current context, usually we'd get them from marketData service
    const mockPrices: Record<string, number> = { BTC: 65000, ETH: 3500, WTI: 85, GOLD: 2300 };
    return acc + (amount * (mockPrices[symbol] || 0));
  }, 0);

  const equity = portfolio.balance + totalAssetValue;

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Activity className={`w-3 h-3 ${sovereignty.lockdownActive ? 'text-red-500 animate-pulse' : 'text-brand-primary'}`} />
          <h2 className="text-[10px] uppercase tracking-widest font-bold text-white">
            {sovereignty.lockdownActive ? 'Hệ thống Đã Khóa [LOCKDOWN]' : `Sức khỏe Tài khoản [SOV_${sovereignty.level}%]`}
          </h2>
        </div>
        <Zap className="w-3 h-3 text-brand-secondary animate-pulse" />
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-6">
        {/* Equity Overview */}
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <span className="text-[8px] text-gray-500 uppercase block mb-1">Tổng Tài sản (Equity)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-display font-black text-white">
                ${equity.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] text-green-500 font-bold">+{portfolio.pnlPercentage}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-black/30 border border-white/5 p-3 rounded">
              <div className="flex items-center gap-1.5 mb-1">
                <Wallet className="w-3 h-3 text-brand-primary" />
                <span className="text-[8px] text-gray-500 uppercase">Tiền mặt</span>
              </div>
              <span className="text-xs font-bold text-gray-200">
                ${portfolio.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="bg-black/30 border border-white/5 p-3 rounded">
              <div className="flex items-center gap-1.5 mb-1">
                <PieChart className="w-3 h-3 text-brand-secondary" />
                <span className="text-[8px] text-gray-500 uppercase">Vị thế</span>
              </div>
              <span className="text-xs font-bold text-gray-200">
                ${totalAssetValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        {/* Risk Management Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-3 h-3 text-orange-500" />
            <h3 className="text-[9px] font-bold text-white uppercase tracking-wider">Quản trị Rủi ro (AI)</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-[8px] uppercase">
                <span className="text-gray-500">Mức độ rủi ro hiện tại</span>
                <span className="text-green-500 font-bold">An toàn</span>
              </div>
              <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '25%' }}
                  className="h-full bg-green-500"
                />
              </div>
            </div>

            <div className="bg-orange-500/5 border border-orange-500/20 p-3 rounded text-[9px] leading-relaxed text-orange-200/80 italic">
              "AI đề xuất duy trì đòn bẩy dưới 5x trong bối cảnh CPI sắp công bố. Tỷ lệ Kelly Criterion cho lệnh tiếp theo: 2.45% Equity."
            </div>
          </div>
        </div>

        {/* Assets Allocation */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-3 h-3 text-brand-primary" />
            <h3 className="text-[9px] font-bold text-white uppercase tracking-wider">Phân bổ Danh mục</h3>
          </div>
          
          <div className="space-y-2">
            {Object.entries(portfolio.assets).map(([symbol, amount]) => (
              <div key={symbol} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5 hover:border-brand-primary/30 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  <span className="text-[10px] font-bold text-white">{symbol}</span>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-300">{amount.toLocaleString()} Units</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-2 bg-black/40 border-t border-card-border flex items-center justify-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[8px] text-gray-500 uppercase">Hệ thống Bảo vệ Vốn: ON</span>
      </div>
    </div>
  );
}
