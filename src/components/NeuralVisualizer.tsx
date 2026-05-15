import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { Share2, Zap, Brain, Binary, Cpu } from 'lucide-react';

export default function NeuralVisualizer() {
  const { neuralNodes } = useStore();

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono text-white relative">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20 relative z-10">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-brand-primary" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold">Ma trận Synapse [NEURAL_VIS]</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/30">
           <Cpu className="w-3 h-3 text-brand-primary animate-spin" />
           <span className="text-[8px] font-bold text-brand-primary">PROCESSING</span>
        </div>
      </div>

      <div className="flex-1 relative bg-black/40 p-4">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Connection Lines (Faked for visual style) */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
           <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 2" />
           <line x1="20%" y1="70%" x2="50%" y2="50%" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 2" />
           <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="#22d3ee" strokeWidth="2" />
           <motion.circle 
             r="2" fill="#22d3ee"
             animate={{ cx: ['20%', '50%', '80%'], cy: ['30%', '50%', '50%'] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           />
        </svg>

        <div className="h-full flex justify-around items-center h-full relative z-10">
          {['INPUT', 'PROCESSING', 'DIRECTIVE'].map((layer) => (
             <div key={layer} className="flex flex-col gap-8 items-center">
                <span className="text-[7px] text-gray-500 font-black uppercase tracking-widest mb-2">{layer}</span>
                <div className="flex flex-col gap-6">
                  {neuralNodes.filter(n => n.layer === layer).map((node) => (
                    <motion.div 
                      key={node.id}
                      animate={{ 
                        boxShadow: `0 0 ${node.activity * 15}px rgba(34, 211, 238, ${node.activity})`,
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                      className={`w-12 h-12 rounded border flex flex-col items-center justify-center p-1 bg-black/80 transition-colors ${
                        node.activity > 0.7 ? 'border-brand-primary' : 'border-white/10'
                      }`}
                    >
                      <Zap className={`w-3 h-3 mb-1 ${node.activity > 0.7 ? 'text-brand-primary' : 'text-gray-700'}`} />
                      <span className="text-[7px] font-black text-center">{node.label}</span>
                      <div className="w-full h-[2px] bg-white/5 rounded-full mt-1 overflow-hidden">
                         <div className="h-full bg-brand-primary" style={{ width: `${node.activity * 100}%` }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
             </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-black/60 border-t border-card-border flex items-center justify-between text-[8px] uppercase font-bold">
         <div className="flex items-center gap-2">
            <Brain className="w-3 h-3 text-brand-primary" />
            <span className="text-gray-500">Neuro-Traffic: 1.2 GB/s</span>
         </div>
         <div className="flex items-center gap-2">
            <Binary className="w-3 h-3 text-brand-primary" />
            <span className="text-brand-primary">Entropy: 0.0034</span>
         </div>
      </div>
    </div>
  );
}
