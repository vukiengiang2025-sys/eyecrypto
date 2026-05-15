import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { ShieldAlert, Skull, Ghost, Lock, Zap, AlertTriangle, Power } from 'lucide-react';

const ICON_MAP = {
  Skull: <Skull className="w-5 h-5" />,
  Ghost: <Ghost className="w-5 h-5" />,
  Lock: <Lock className="w-5 h-5" />,
};

export default function RiskIsolation() {
  const { controlProtocols, toggleProtocol } = useStore();

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-500" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold">Hệ thống Cô lập Rủi ro [RISK_ISO]</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30">
           <Zap className="w-3 h-3 text-red-500 animate-pulse" />
           <span className="text-[8px] font-bold text-red-500">ARMED</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-4">
        {controlProtocols.map((protocol) => (
          <motion.div 
            key={protocol.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border transition-all cursor-pointer relative overflow-hidden group ${
              protocol.status === 'ACTIVE' 
                ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
             onClick={() => toggleProtocol(protocol.id)}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${protocol.status === 'ACTIVE' ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-500'}`}>
                {ICON_MAP[protocol.icon as keyof typeof ICON_MAP]}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider">{protocol.name}</h3>
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${protocol.status === 'ACTIVE' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {protocol.status}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed font-sans">
                  {protocol.description}
                </p>
              </div>
            </div>
            
            {/* Action Bar */}
            <div className="mt-3 pt-3 border-t border-white/5 flex justify-end">
               <button className={`flex items-center gap-2 text-[9px] font-black uppercase px-3 py-1 rounded transition-colors ${
                 protocol.status === 'ACTIVE' ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-500 group-hover:bg-brand-primary group-hover:text-black'
               }`}>
                 <Power className="w-3 h-3" />
                 {protocol.status === 'ACTIVE' ? 'DISENGAGE' : 'ACTIVATE'}
               </button>
            </div>

            {/* Scanning Effect if Active */}
            {protocol.status === 'ACTIVE' && (
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent pointer-events-none"
              />
            )}
          </motion.div>
        ))}

        <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-lg flex items-start gap-3">
           <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
           <div className="space-y-1">
             <span className="text-[9px] font-bold text-red-500 uppercase">CẢNH BÁO HỆ THỐNG</span>
             <p className="text-[9px] text-gray-400 leading-relaxed italic font-sans text-justify">
               Sử dụng các giao thức cô lập có thể ảnh hưởng đến lợi nhuận tức thời nhưng bảo vệ vốn của bạn trước các biến động "Thiên nga đen". MIRO khuyến nghị luôn bật Giao thức Tự động khóa.
             </p>
           </div>
        </div>
      </div>

      <div className="p-3 bg-black/40 border-t border-card-border flex items-center justify-between">
         <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
           <span className="text-[8px] text-gray-600 uppercase font-bold tracking-tighter">Monitoring Sub-Space frequencies...</span>
         </div>
      </div>
    </div>
  );
}
