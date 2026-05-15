import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';
import { MessageSquare, Send, Users, Shield, TrendingUp } from 'lucide-react';

export default function CommunityFeed() {
  const { communityMessages, addMessage, profile } = useStore();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage({
      sender: profile.name,
      avatarColor: profile.avatarColor,
      text: input
    });
    setInput('');
  };

  return (
    <div className="h-full bg-card-bg border border-card-border rounded-lg flex flex-col overflow-hidden font-mono">
      <div className="p-3 border-b border-card-border flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
          <Users className="w-3 h-3 text-brand-primary" />
          <h2 className="text-[10px] uppercase tracking-widest font-bold text-white">Mạng lưới MIRO-NET</h2>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[8px] text-green-500 font-bold animate-pulse">4,281 TRỰC TUYẾN</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll p-4 space-y-4 flex flex-col-reverse">
        <AnimatePresence initial={false}>
          {communityMessages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3 group"
            >
              <div 
                className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-black shrink-0 shadow-lg shadow-black/50"
                style={{ backgroundColor: msg.avatarColor }}
              >
                {msg.sender.substring(0, 1)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-brand-primary uppercase tracking-wider">{msg.sender}</span>
                  <span className="text-[7px] text-gray-600">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                  {msg.asset && (
                    <span className="text-[7px] bg-brand-primary/10 text-brand-primary px-1 rounded border border-brand-primary/20">
                      {msg.asset}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-gray-300 leading-relaxed bg-white/5 p-2 rounded-r-lg rounded-bl-lg border border-white/5 group-hover:border-white/10 transition-colors">
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-3 bg-black/40 border-t border-card-border">
        <div className="flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Gửi tin nhắn tới mạng lưới..."
            className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-[10px] text-white outline-none focus:border-brand-primary transition-colors"
          />
          <button 
            onClick={handleSend}
            className="p-2 bg-brand-primary hover:bg-brand-primary/80 text-black rounded transition-colors"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
