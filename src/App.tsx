import { useState, useEffect, useMemo } from 'react';
import DashboardHeader from './components/DashboardHeader';
import PriceChart from './components/PriceChart';
import RelationshipGraph from './components/RelationshipGraph';
import AIAgentPanel from './components/AIAgentPanel';
import TradeTerminal from './components/TradeTerminal';
import SettingsPanel from './components/SettingsPanel';
import { AssetSymbol, GraphNode, GraphLink } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Activity, Zap, Server, TrendingUp, Share2, MessageSquare, List, Settings } from 'lucide-react';
import { useStore } from './store/useStore';
import { marketService } from './services/marketService';

type TabType = 'market' | 'graph' | 'ai' | 'logs' | 'settings';
// ... rest of the constants ...

const ASSET_GRAPHS: Record<AssetSymbol, { nodes: GraphNode[], links: GraphLink[] }> = {
  WTI: {
    nodes: [
      { id: '1', group: 1, label: 'DẦU WTI', sentiment: 0.1 },
      { id: '2', group: 1, label: 'CUNG CẤP OPEC+', sentiment: -0.4 },
      { id: '3', group: 2, label: 'CĂNG THẲNG BIỂN ĐỎ', sentiment: -0.8 },
      { id: '4', group: 2, label: 'EO BIỂN HORST', sentiment: -0.6 },
      { id: '5', group: 3, label: 'GIÀN KHOAN MỸ', sentiment: 0.5 },
      { id: '6', group: 3, label: 'NHU CẦU SPR', sentiment: 0.3 },
      { id: '7', group: 1, label: 'PMI TRUNG QUỐC', sentiment: -0.2 },
      { id: '8', group: 2, label: 'TRỪNG PHẠT EU', sentiment: -0.5 },
    ],
    links: [
      { source: '1', target: '2', value: 2 },
      { source: '3', target: '1', value: 5 },
      { source: '4', target: '3', value: 3 },
      { source: '2', target: '5', value: 1 },
      { source: '1', target: '6', value: 2 },
      { source: '7', target: '1', value: 4 },
      { source: '8', target: '1', value: 3 },
    ]
  },
  BTC: {
    nodes: [
      { id: '1', group: 1, label: 'BITCOIN', sentiment: 0.6 },
      { id: '2', group: 1, label: 'ETF INFLOW', sentiment: 0.8 },
      { id: '3', group: 2, label: 'HALVING CYCLE', sentiment: 0.9 },
      { id: '4', group: 2, label: 'HASHRATE', sentiment: 0.4 },
      { id: '5', group: 3, label: 'LÃI SUẤT FED', sentiment: -0.3 },
      { id: '6', group: 3, label: 'MIKROSTRATEGY', sentiment: 0.7 },
      { id: '7', group: 1, label: 'S&P 500 CORR', sentiment: 0.2 },
      { id: '8', group: 2, label: 'QUY ĐỊNH SEC', sentiment: -0.1 },
    ],
    links: [
      { source: '1', target: '2', value: 5 },
      { source: '3', target: '1', value: 4 },
      { source: '5', target: '1', value: 3 },
      { source: '6', target: '1', value: 2 },
      { source: '2', target: '8', value: 1 },
      { source: '4', target: '1', value: 2 },
    ]
  },
  ETH: {
    nodes: [
      { id: '1', group: 1, label: 'ETHEREUM', sentiment: 0.4 },
      { id: '2', group: 1, label: 'LAYER 2 TVL', sentiment: 0.7 },
      { id: '3', group: 2, label: 'STAKING YIELD', sentiment: 0.5 },
      { id: '4', group: 2, label: 'BURN RATE', sentiment: 0.3 },
      { id: '5', group: 3, label: 'DAPP USAGE', sentiment: 0.6 },
      { id: '6', group: 3, label: 'ETF HYPES', sentiment: 0.8 },
      { id: '7', group: 1, label: 'GAS FEES', sentiment: -0.4 },
      { id: '8', group: 2, label: 'EIP-4844', sentiment: 0.9 },
    ],
    links: [
      { source: '1', target: '2', value: 4 },
      { source: '1', target: '3', value: 3 },
      { source: '4', target: '1', value: 2 },
      { source: '6', target: '1', value: 5 },
      { source: '8', target: '2', value: 3 },
    ]
  },
  GOLD: {
    nodes: [
      { id: '1', group: 1, label: 'VÀNG (XAU)', sentiment: 0.3 },
      { id: '2', group: 1, label: 'NGÂN HÀNG TRUNG ƯƠNG', sentiment: 0.6 },
      { id: '3', group: 2, label: 'LẠM PHÁT CPI', sentiment: 0.5 },
      { id: '4', group: 2, label: 'TRÁI PHIẾU MỸ', sentiment: -0.7 },
      { id: '5', group: 3, label: 'RỦI RO ĐỊA CHÍNH TRỊ', sentiment: 0.8 },
      { id: '6', group: 3, label: 'TỶ GIÁ USD', sentiment: -0.5 },
      { id: '7', group: 1, label: 'NHU CẦU TRANG SỨC', sentiment: 0.1 },
      { id: '8', group: 2, label: 'KHAI THÁC MỎ', sentiment: -0.1 },
    ],
    links: [
      { source: '1', target: '2', value: 4 },
      { source: '3', target: '1', value: 5 },
      { source: '4', target: '1', value: 4 },
      { source: '5', target: '1', value: 6 },
      { source: '6', target: '1', value: 3 },
    ]
  }
};

export default function App() {
  const { 
    selectedAsset, 
    setSelectedAsset, 
    marketData, 
    portfolio, 
    aiInsights,
    latency,
    buffer
  } = useStore();
  
  const [activeTab, setActiveTab] = useState<TabType>('market');

  const graphData = useMemo(() => ASSET_GRAPHS[selectedAsset], [selectedAsset]);

  useEffect(() => {
    marketService.startSimulation(selectedAsset);
  }, [selectedAsset]);

  const footerStats = useMemo(() => [
    { label: 'Độ trễ', value: latency, icon: <Zap className="w-3 h-3"/>, color: 'text-brand-primary' },
    { label: 'Dòng chảy', value: '0.811', icon: <Activity className="w-3 h-3"/>, color: 'text-indigo-400' },
    { label: 'Mảnh ghép', value: '293', icon: <Layers className="w-3 h-3"/>, color: 'text-yellow-400' },
    { label: 'Bộ đệm', value: buffer, icon: <Server className="w-3 h-3"/>, color: 'text-brand-primary' },
  ], [latency, buffer]);

  return (
    <div className="h-screen w-screen flex flex-col bg-dashboard-bg overflow-hidden safe-area-inset">
      <DashboardHeader onOpenSettings={() => setActiveTab('settings')} />

      <main className="flex-1 overflow-hidden relative">
        {/* Settings Overlay for Desktop */}
        <AnimatePresence>
          {activeTab === 'settings' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 lg:p-12"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-2xl h-full max-h-[80vh] bg-card-bg border border-card-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
              >
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <h2 className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest">Cấu hình Hệ thống</h2>
                  <button 
                    onClick={() => setActiveTab('market')}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    ĐÓNG [ESC]
                  </button>
                </div>
                <div className="flex-1 overflow-hidden p-6">
                  <SettingsPanel />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Layout - Only visible on LG+ screens */}
        <div className="hidden lg:grid h-full p-4 grid-cols-12 grid-rows-12 gap-4">
          
          {/* Left Column - Stats & AI */}
          <div className="col-span-3 row-span-12 flex flex-col gap-4">
            <div className="h-1/5">
               <div className="p-4 bg-card-bg border border-card-border rounded-lg h-full flex flex-col justify-center">
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Tổng Tài sản ròng</span>
                  <span className="text-2xl font-display font-extrabold text-white tracking-tight">
                    ${portfolio.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] font-mono text-brand-primary">+{portfolio.pnlPercentage}%</span>
                    <span className="text-[10px] font-mono text-gray-600">KỂ TỪ KHI KHỞI ĐỘNG</span>
                  </div>
               </div>
            </div>
            <div className="flex-1">
              <AIAgentPanel selectedAsset={selectedAsset} />
            </div>
            <div className="h-1/4">
               <TradeTerminal />
            </div>
          </div>

          {/* Center - Main Visuals */}
          <div className="col-span-6 row-span-12 flex flex-col gap-4">
            <div className="h-[45%]">
               <PriceChart 
                 data={marketData} 
                 title={`Dòng Nhận thức Thị trường :: ${selectedAsset}_INDEX`}
                 selectedAsset={selectedAsset}
                 onAssetChange={setSelectedAsset} 
               />
            </div>
            <div className="flex-1">
               <RelationshipGraph nodes={graphData.nodes} links={graphData.links} />
            </div>
            <div className="h-[10%] bg-black/40 border border-card-border rounded-lg flex items-center justify-around px-4">
                {footerStats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`${stat.color} opacity-40`}>{stat.icon}</div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono text-gray-500 uppercase">{stat.label}</span>
                      <span className="text-[10px] font-mono text-white font-bold">{stat.value}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Right Column - OSINT & Order Book */}
          <div className="col-span-3 row-span-12 flex flex-col gap-4">
             {/* OSINT Feed */}
             <div className="flex-1 bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden">
                <div className="p-3 border-b border-card-border bg-white/5">
                  <h3 className="text-[10px] font-mono uppercase font-bold text-brand-primary animate-pulse">Máy quét OSINT [TRỰC TIẾP]</h3>
                </div>
                <div className="flex-1 p-3 overflow-y-auto terminal-scroll space-y-3">
                   {aiInsights.map((msg, i) => (
                     <motion.div 
                       key={i}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       className="p-2 border-l-2 border-brand-primary/20 bg-white/5 text-[9px] font-mono leading-tight"
                     >
                       {msg}
                     </motion.div>
                   ))}
                </div>
             </div>

             {/* Metrics Grid */}
             <div className="h-1/3 grid grid-cols-2 gap-2">
                <div className="bg-brand-primary/5 border border-brand-primary/20 rounded p-3 flex flex-col justify-center text-center">
                   <span className="text-[8px] font-mono text-brand-primary uppercase">Rủi ro Tiếp xúc</span>
                   <span className="text-sm font-mono font-bold text-white">0.02456</span>
                </div>
                <div className="bg-brand-secondary/5 border border-brand-secondary/20 rounded p-3 flex flex-col justify-center text-center">
                   <span className="text-[8px] font-mono text-brand-secondary uppercase">Độ lệch Delta</span>
                   <span className="text-sm font-mono font-bold text-white">0.99A/S</span>
                </div>
                <div className="col-span-2 bg-white/5 border border-white/10 rounded p-4 flex flex-col">
                   <div className="flex justify-between items-end mb-1">
                     <span className="text-[8px] font-mono text-gray-500 uppercase">Độ ổn định cốt lõi</span>
                     <span className="text-[10px] font-mono text-brand-primary">99.8%</span>
                   </div>
                   <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-primary w-[99.8%]" />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Mobile Layout - Tabbed Navigation */}
        <div className="lg:hidden h-full flex flex-col">
          <div className="flex-1 overflow-hidden p-3 pt-4">
            <AnimatePresence mode="wait">
              {activeTab === 'market' && (
                <motion.div 
                  key="market"
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col gap-3"
                >
                  <div className="h-1/3 min-h-[200px]">
                    <PriceChart 
                      data={marketData} 
                      title={`Giá ${selectedAsset} Trực tiếp`}
                      selectedAsset={selectedAsset}
                      onAssetChange={setSelectedAsset}
                    />
                  </div>
                  <div className="flex-1">
                    <TradeTerminal />
                  </div>
                </motion.div>
              )}
              {activeTab === 'graph' && (
                <motion.div 
                  key="graph"
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <RelationshipGraph nodes={graphData.nodes} links={graphData.links} />
                </motion.div>
              )}
              {activeTab === 'ai' && (
                <motion.div 
                  key="ai"
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  <AIAgentPanel selectedAsset={selectedAsset} />
                </motion.div>
              )}
              {activeTab === 'logs' && (
                <motion.div 
                  key="logs"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="h-full bg-card-bg border border-card-border rounded-lg p-4 font-mono text-[10px]"
                >
                  <div className="flex flex-col h-full">
                    <h3 className="text-brand-primary mb-4 uppercase tracking-[0.2em] font-bold text-xs">MÁY QUÉT OSINT :: TRỰC TIẾP</h3>
                    <div className="flex-1 overflow-y-auto space-y-4 terminal-scroll pr-2">
                      {aiInsights.map((m, i) => (
                        <div key={i} className="flex flex-col gap-1 border-l border-brand-primary/30 pl-3">
                          <span className="text-gray-600 text-[8px]">[{new Date().toLocaleTimeString()}]</span>
                          <span className="text-gray-300 leading-relaxed">{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === 'settings' && (
                <motion.div 
                  key="settings"
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0 }}
                  className="h-full bg-card-bg border border-card-border rounded-lg p-4"
                >
                  <SettingsPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Tab Bar */}
          <nav className="h-16 bg-card-bg border-t border-card-border flex items-center justify-around px-2 pb-safe bg-opacity-95 backdrop-blur-lg shrink-0">
            {[
              { id: 'market', icon: <TrendingUp className="w-5 h-5"/>, label: 'Thị trường' },
              { id: 'graph', icon: <Share2 className="w-5 h-5"/>, label: 'Đồ thị' },
              { id: 'ai', icon: <MessageSquare className="w-5 h-5"/>, label: 'Nhận thức' },
              { id: 'settings', icon: <Settings className="w-5 h-5"/>, label: 'Cài đặt' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex flex-col items-center gap-1 w-1/4 transition-all ${activeTab === tab.id ? 'text-brand-primary scale-110' : 'text-gray-500'}`}
              >
                {tab.icon}
                <span className="text-[9px] font-mono uppercase tracking-tighter font-bold">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </main>

      <div className="h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary opacity-20 animate-pulse shrink-0" />
    </div>
  );
}
