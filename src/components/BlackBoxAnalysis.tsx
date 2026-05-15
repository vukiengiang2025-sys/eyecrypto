import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { ShieldAlert, Binary, CheckCircle2, XCircle, Info, Database, Search } from 'lucide-react';

export default function BlackBoxAnalysis() {
  const { blackBox, portfolio } = useStore();
  
  // Dummy data if empty
  const orders = portfolio.orders.slice(0, 5);

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-brand-primary" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold">Hộp đen Phân tích [BLACK_BOX]</h2>
        </div>
        <div className="flex items-center gap-2">
          <Binary className="w-3 h-3 text-brand-primary animate-pulse" />
          <span className="text-[8px] text-gray-500 uppercase">Ghi nhận Lệnh Cuối</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-4">
        {orders.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-50">
            <Search className="w-8 h-8 text-gray-600" />
            <p className="text-[10px] uppercase tracking-tighter">Chưa có dữ liệu giao dịch để phân tích.</p>
          </div>
        ) : (
          orders.map((order, i) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${order.type === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {order.type}
                  </span>
                  <span className="text-[10px] font-bold text-gray-300">#{order.id}</span>
                </div>
                <span className="text-[8px] text-gray-600 italic">{new Date(order.timestamp).toLocaleTimeString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[9px]">
                <div className="space-y-1">
                  <span className="text-gray-500 uppercase block">Tài sản</span>
                  <span className="text-white font-bold">{order.asset} @ ${order.price.toFixed(2)}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 uppercase block">Đánh giá MIRO</span>
                  <div className="flex items-center gap-1 text-brand-primary">
                    <CheckCircle2 className="w-3 h-3" />
                    <span className="font-bold">TỐI ƯU (OPTIMAL)</span>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-black/40 rounded border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-[8px] font-black text-brand-primary mb-1">
                  <Binary className="w-2.5 h-2.5" />
                  <span>TRUY XUẤT LÝ DO (LOG_REASONING)</span>
                </div>
                <p className="text-[10px] leading-relaxed text-gray-400 italic">
                  "Lệnh được khớp tại vùng hỗ trợ OSINT xác nhận. Phân tích Psychology cho thấy người dùng đang ở trạng thái CALM (Tĩnh lặng), giúp giảm thiểu nhiễu loạn trong thực thi. Khối lượng khớp lệnh khớp với dung sai thanh khoản."
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <div className="flex-1 h-[1px] bg-white/10" />
                <div className="flex items-center gap-1.5 text-[8px] text-gray-500">
                  <ShieldAlert className="w-2.5 h-2.5" />
                  <span>Yếu tố rủi ro: THẤP</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="p-3 bg-brand-primary/5 border-t border-card-border flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-brand-primary/20 flex items-center justify-center shrink-0">
          <Search className="w-4 h-4 text-brand-primary" />
        </div>
        <p className="text-[9px] text-gray-400 leading-tight">
          Hộp đen lưu trữ toàn bộ lịch sử quyết định. MIRO-SENTIENT sẽ tự động học hỏi từ những sai lầm của bạn để tinh chỉnh các thuật toán tương lai.
        </p>
      </div>
    </div>
  );
}
