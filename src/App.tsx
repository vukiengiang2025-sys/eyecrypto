import { useState, useEffect, useMemo } from 'react';
import DashboardHeader from './components/DashboardHeader';
import PriceChart from './components/PriceChart';
import RelationshipGraph from './components/RelationshipGraph';
import AIAgentPanel from './components/AIAgentPanel';
import TradeTerminal from './components/TradeTerminal';
import SettingsPanel from './components/SettingsPanel';
import PortfolioAnalytics from './components/PortfolioAnalytics';
import CommunityFeed from './components/CommunityFeed';
import CopyTrading from './components/CopyTrading';
import AutoBotPanel from './components/AutoBotPanel';
import CognitiveEvolution from './components/CognitiveEvolution';
import MarketBattlefield from './components/MarketBattlefield';
import PsychologyDashboard from './components/PsychologyDashboard';
import MarketNarrator from './components/MarketNarrator';
import BlackBoxAnalysis from './components/BlackBoxAnalysis';
import GlobalIntelligence from './components/GlobalIntelligence';
import RiskIsolation from './components/RiskIsolation';
import NeuralVisualizer from './components/NeuralVisualizer';
import ApexTerminal from './components/ApexTerminal';
import QuantumForecast from './components/QuantumForecast';
import SovereigntyControl from './components/SovereigntyControl';
import SynergyMetrics from './components/SynergyMetrics';
import SingularityCore from './components/SingularityCore';
import UniversalOversight from './components/UniversalOversight';
import TranscendenceView from './components/TranscendenceView';
import { AssetSymbol, GraphNode, GraphLink } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Activity, Zap, Server, TrendingUp, Share2, MessageSquare, List, Settings, ShieldCheck, Users, Bot, Brain, Target, UserCheck, Radio, Database, Globe, ShieldAlert, Cpu, Sparkles, HeartPulse, Terminal, Eye, Infinity } from 'lucide-react';
import { useStore } from './store/useStore';
import { marketService } from './services/marketService';

type TabType = 'market' | 'graph' | 'ai' | 'social' | 'bot' | 'evolution' | 'battlefield' | 'psycho' | 'narrative' | 'blackbox' | 'intelligence' | 'risk' | 'neural' | 'apex' | 'quantum' | 'sovereign' | 'synergy' | 'singularity' | 'universal' | 'transcendence' | 'health' | 'settings';
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
  const [centerTab, setCenterTab] = useState<'graph' | 'neural' | 'apex' | 'quantum' | 'sovereign' | 'synergy' | 'singularity' | 'universal' | 'transcendence'>('graph');

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
    <div className="h-screen w-screen flex flex-col bg-dashboard-bg overflow-hidden safe-area-inset relative cyber-grid">
      <div className="scanline" />
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
          
          {/* Left Column - Stats & Psychology */}
          <div className="col-span-3 row-span-12 flex flex-col gap-4 overflow-hidden">
            <div className="h-[25%] shrink-0">
               <PortfolioAnalytics />
            </div>
            <div className="h-[25%] shrink-0">
               <PsychologyDashboard />
            </div>
            <div className="flex-1 overflow-hidden">
              <AIAgentPanel selectedAsset={selectedAsset} />
            </div>
          </div>

          {/* Center - Main Visuals */}
          <div className="col-span-6 row-span-12 flex flex-col gap-4 overflow-hidden">
            <div className="h-[55%] shrink-0">
               <PriceChart 
                 data={marketData} 
                 title={`Dòng Nhận thức Thị trường :: ${selectedAsset}_INDEX`}
                 selectedAsset={selectedAsset}
                 onAssetChange={setSelectedAsset} 
               />
            </div>
            <div className="flex-1 overflow-hidden bg-card-bg border border-card-border rounded-lg flex flex-col">
               <div className="p-2 border-b border-card-border flex items-center justify-center gap-4 bg-black/20">
                  {[
                    { id: 'graph', label: 'MẠNG LƯỚI', icon: <Layers className="w-3 h-3" /> },
                    { id: 'neural', label: 'SYNAPSE', icon: <Share2 className="w-3 h-3" /> },
                    { id: 'apex', label: 'APEX', icon: <Target className="w-3 h-3" /> },
                    { id: 'quantum', label: 'ĐA VŨ TRỤ', icon: <Sparkles className="w-3 h-3" /> },
                    { id: 'sovereign', label: 'TỰ QUYẾT', icon: <ShieldCheck className="w-3 h-3" /> },
                    { id: 'synergy', label: 'HỢP NHẤT', icon: <HeartPulse className="w-3 h-3" /> },
                    { id: 'singularity', label: 'KỲ ĐIỂM', icon: <Zap className="w-3 h-3" /> },
                    { id: 'universal', label: 'TỔNG QUAN', icon: <Eye className="w-3 h-3" /> },
                    { id: 'transcendence', label: 'SIÊU VIỆT', icon: <Infinity className="w-3 h-3" /> },
                  ].map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => setCenterTab(tab.id as any)}
                      className={`flex items-center gap-2 text-[9px] font-black uppercase px-3 py-1 rounded transition-all ${
                        centerTab === tab.id ? 'bg-brand-primary text-black shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
               </div>
               <div className="flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {centerTab === 'graph' && (
                      <motion.div key="graph" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                        <RelationshipGraph nodes={graphData.nodes} links={graphData.links} />
                      </motion.div>
                    )}
                    {centerTab === 'neural' && (
                      <motion.div key="neural" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                        <NeuralVisualizer />
                      </motion.div>
                    )}
                    {centerTab === 'apex' && (
                      <motion.div key="apex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                        <ApexTerminal />
                      </motion.div>
                    )}
                    {centerTab === 'quantum' && (
                      <motion.div key="quantum" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                        <QuantumForecast />
                      </motion.div>
                    )}
                    {centerTab === 'sovereign' && (
                      <motion.div key="sovereign" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                        <SovereigntyControl />
                      </motion.div>
                    )}
                    {centerTab === 'synergy' && (
                      <motion.div key="synergy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                        <SynergyMetrics />
                      </motion.div>
                    )}
                    {centerTab === 'singularity' && (
                      <motion.div key="singularity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                        <SingularityCore />
                      </motion.div>
                    )}
                    {centerTab === 'universal' && (
                      <motion.div key="universal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                        <UniversalOversight />
                      </motion.div>
                    )}
                    {centerTab === 'transcendence' && (
                      <motion.div key="transcendence" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                        <TranscendenceView />
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>
          </div>

          {/* Right Column - Execution & Intelligence */}
          <div className="col-span-3 row-span-12 flex flex-col gap-4 overflow-hidden">
             <div className="h-[25%] shrink-0">
                <TradeTerminal />
             </div>
             
             <div className="h-[25%] shrink-0">
                <MarketBattlefield />
             </div>

             <div className="h-[25%] shrink-0 overflow-hidden">
                <BlackBoxAnalysis />
             </div>

             <div className="flex-1 overflow-hidden">
                <MarketNarrator />
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
              {activeTab === 'health' && (
                <motion.div 
                  key="health"
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  <PortfolioAnalytics />
                </motion.div>
              )}
              {activeTab === 'social' && (
                <motion.div 
                  key="social"
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col gap-4"
                >
                  <div className="h-1/2">
                    <CommunityFeed />
                  </div>
                  <div className="flex-1">
                    <CopyTrading />
                  </div>
                </motion.div>
              )}
              {activeTab === 'bot' && (
                <motion.div 
                  key="bot"
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <AutoBotPanel />
                </motion.div>
              )}
              {activeTab === 'evolution' && (
                <motion.div 
                  key="evolution"
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  <CognitiveEvolution />
                </motion.div>
              )}
              {activeTab === 'battlefield' && (
                <motion.div 
                  key="battlefield"
                  initial={{ opacity: 0, scale: 1.1 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <MarketBattlefield />
                </motion.div>
              )}
              {activeTab === 'psycho' && (
                <motion.div 
                  key="psycho"
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full"
                >
                  <PsychologyDashboard />
                </motion.div>
              )}
              {activeTab === 'narrative' && (
                <motion.div 
                  key="narrative"
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  <MarketNarrator />
                </motion.div>
              )}
              {activeTab === 'synergy' && (
                <motion.div 
                  key="synergy"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <SynergyMetrics />
                </motion.div>
              )}
              {activeTab === 'sovereign' && (
                <motion.div 
                  key="sovereign"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <SovereigntyControl />
                </motion.div>
              )}
              {activeTab === 'quantum' && (
                <motion.div 
                  key="quantum"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <QuantumForecast />
                </motion.div>
              )}
              {activeTab === 'intelligence' && (
                <motion.div 
                  key="intelligence"
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <GlobalIntelligence />
                </motion.div>
              )}
              {activeTab === 'singularity' && (
                <motion.div 
                  key="singularity"
                  initial={{ opacity: 0, scale: 1.2 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="h-full"
                >
                  <SingularityCore />
                </motion.div>
              )}
              {activeTab === 'universal' && (
                <motion.div 
                  key="universal"
                  initial={{ opacity: 0, scale: 1.2 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="h-full"
                >
                  <UniversalOversight />
                </motion.div>
              )}
              {activeTab === 'transcendence' && (
                <motion.div 
                  key="transcendence"
                  initial={{ opacity: 0, scale: 1.2 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="h-full"
                >
                  <TranscendenceView />
                </motion.div>
              )}
              {activeTab === 'risk' && (
                <motion.div 
                  key="risk"
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full"
                >
                  <RiskIsolation />
                </motion.div>
              )}
              {activeTab === 'neural' && (
                <motion.div 
                  key="neural"
                  initial={{ opacity: 0, scale: 1.1 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <NeuralVisualizer />
                </motion.div>
              )}
              {activeTab === 'apex' && (
                <motion.div 
                  key="apex"
                  initial={{ opacity: 0, y: -20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 20 }}
                  className="h-full"
                >
                  <ApexTerminal />
                </motion.div>
              )}
              {activeTab === 'blackbox' && (
                <motion.div 
                  key="blackbox"
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  <BlackBoxAnalysis />
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
          <nav className="h-16 bg-card-bg border-t border-card-border flex items-center px-2 pb-safe bg-opacity-95 backdrop-blur-lg shrink-0 overflow-x-auto no-scrollbar">
            {[
              { id: 'market', icon: <TrendingUp className="w-5 h-5"/>, label: 'Thị trường' },
              { id: 'ai', icon: <MessageSquare className="w-5 h-5"/>, label: 'AI MIRO' },
              { id: 'apex', icon: <Cpu className="w-5 h-5"/>, label: 'APEX' },
              { id: 'quantum', icon: <Sparkles className="w-5 h-5"/>, label: 'DỰ BÁO' },
              { id: 'sovereign', icon: <ShieldCheck className="w-5 h-5"/>, label: 'TỰ QUYẾT' },
              { id: 'synergy', icon: <HeartPulse className="w-5 h-5"/>, label: 'HỢP NHẤT' },
              { id: 'battlefield', icon: <Target className="w-5 h-5"/>, label: 'CHIẾN TRƯỜNG' },
              { id: 'narrative', icon: <Radio className="w-5 h-5"/>, label: 'TỔNG HỢP' },
              { id: 'intelligence', icon: <Globe className="w-5 h-5"/>, label: 'TÌNH BÁO' },
              { id: 'universal', icon: <Eye className="w-5 h-5"/>, label: 'TỔNG QUAN' },
              { id: 'transcendence', icon: <Infinity className="w-5 h-5"/>, label: 'SIÊU VIỆT' },
              { id: 'singularity', icon: <Zap className="w-5 h-5"/>, label: 'KỲ ĐIỂM' },
              { id: 'risk', icon: <ShieldAlert className="w-5 h-5"/>, label: 'RỦI RO' },
              { id: 'neural', icon: <Share2 className="w-5 h-5"/>, label: 'SYNAPSE' },
              { id: 'blackbox', icon: <Database className="w-5 h-5"/>, label: 'HỘP ĐEN' },
              { id: 'bot', icon: <Bot className="w-5 h-5"/>, label: 'BOT' },
              { id: 'social', icon: <Users className="w-5 h-5"/>, label: 'XÃ HỘI' },
              { id: 'evolution', icon: <Brain className="w-5 h-5"/>, label: 'TIẾN HÓA' },
              { id: 'psycho', icon: <UserCheck className="w-5 h-5"/>, label: 'TÂM LÝ' },
              { id: 'health', icon: <ShieldCheck className="w-5 h-5"/>, label: 'HỒ SƠ' },
              { id: 'settings', icon: <Settings className="w-5 h-5"/>, label: 'CÀI ĐẶT' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex flex-col items-center gap-1 min-w-[70px] transition-all shrink-0 ${activeTab === tab.id ? 'text-brand-primary scale-110' : 'text-gray-500'}`}
              >
                {tab.icon}
                <span className="text-[7px] font-mono uppercase tracking-tighter font-bold">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </main>

      <div className="h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary opacity-20 animate-pulse shrink-0" />
    </div>
  );
}
