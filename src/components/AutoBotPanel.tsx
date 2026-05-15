import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Bot, Zap, Shield, Settings2, Power, AlertTriangle, TrendingUp, Cpu } from 'lucide-react';

export default function AutoBotPanel() {
  const { botConfig, updateBotConfig } = useStore();

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-brand-primary" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold text-white">Lõi Tự hành MIRO-AUTO</h2>
        </div>
        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded border ${botConfig.isActive ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
           <div className={`w-1.5 h-1.5 rounded-full ${botConfig.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
           <span className={`text-[8px] font-bold ${botConfig.isActive ? 'text-green-500' : 'text-red-500'}`}>
             {botConfig.isActive ? 'ACTIVE' : 'OFFLINE'}
           </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-6">
        {/* Toggle Button */}
        <button 
          onClick={() => updateBotConfig({ isActive: !botConfig.isActive })}
          className={`w-full py-4 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all group ${
            botConfig.isActive 
            ? 'bg-brand-primary/10 border-brand-primary shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
            : 'bg-white/5 border-white/10 grayscale hover:grayscale-0'
          }`}
        >
          <Power className={`w-6 h-6 ${botConfig.isActive ? 'text-brand-primary' : 'text-gray-500'}`} />
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${botConfig.isActive ? 'text-brand-primary' : 'text-gray-500'}`}>
            {botConfig.isActive ? 'NGẮT KẾT NỐI HỆ THỐNG' : 'KÍCH HOẠT TỰ HÀNH'}
          </span>
        </button>

        {/* Strategy Config */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Settings2 className="w-3 h-3 text-gray-500" />
            <h3 className="text-[9px] font-bold text-white uppercase tracking-wider">Cấu hình Chiến lược</h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(['TREND', 'SCALPING', 'SWING'] as const).map((s) => (
              <button
                key={s}
                onClick={() => updateBotConfig({ strategy: s })}
                className={`py-2 rounded text-[8px] font-bold border transition-colors ${
                  botConfig.strategy === s 
                  ? 'bg-brand-primary text-black border-brand-primary' 
                  : 'bg-white/5 text-gray-500 border-white/10 hover:border-brand-primary/50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-[8px] uppercase">
              <span className="text-gray-500">Độ xông xáo (Aggressiveness)</span>
              <span className="text-brand-primary font-bold">{botConfig.riskTolerance}/5</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="5" 
              value={botConfig.riskTolerance}
              onChange={(e) => updateBotConfig({ riskTolerance: parseInt(e.target.value) })}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[8px] uppercase">
              <span className="text-gray-500">Max Drawdown Bảo vệ</span>
              <span className="text-brand-secondary font-bold">{botConfig.maxDrawdown}%</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={botConfig.maxDrawdown}
              onChange={(e) => updateBotConfig({ maxDrawdown: parseInt(e.target.value) })}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-secondary"
            />
          </div>
        </div>

        {/* Status Logs */}
        <div className="bg-black/40 border border-white/5 rounded p-3 space-y-2">
          <div className="flex items-center gap-2 mb-1">
             <Cpu className="w-3 h-3 text-brand-primary" />
             <span className="text-[8px] text-gray-500 uppercase font-bold">Log Trạng thái Thuật toán</span>
          </div>
          <div className="space-y-1.5 opacity-60">
            <div className="flex gap-2 text-[8px] font-mono">
              <span className="text-brand-primary">[0]</span>
              <span className="text-gray-400">Đang khởi tạo ma trận rủi ro...</span>
            </div>
            <div className="flex gap-2 text-[8px] font-mono">
              <span className="text-brand-primary">[1]</span>
              <span className="text-gray-400">Đã thiết lập rào chắn thanh lý tại -{botConfig.maxDrawdown}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-brand-primary/5 border-t border-card-border flex items-center gap-3">
        <Shield className="w-4 h-4 text-brand-primary shrink-0" />
        <p className="text-[9px] text-gray-400 leading-tight">
          Hệ thống bảo vệ "Futures Defense" sẽ tự động đóng vị thế nếu biến động vượt quá ngưỡng cho phép của thuật toán.
        </p>
      </div>
    </div>
  );
}
