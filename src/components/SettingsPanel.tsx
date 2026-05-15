import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Key, Lock, Eye, EyeOff, Save, Info, User, Palette, Activity } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function SettingsPanel() {
  const { credentials, setCredentials, profile, setProfile, portfolio, updatePortfolio } = useStore();
  const [formData, setFormData] = useState(credentials);
  const [profileData, setProfileData] = useState(profile);
  const [riskData, setRiskData] = useState({
    dailyLossLimit: portfolio.dailyLossLimit,
    maxLeverage: portfolio.maxLeverage
  });
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const toggleSecret = (field: string) => {
    setShowSecrets(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setCredentials(formData);
    setProfile(profileData);
    updatePortfolio(riskData);
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto terminal-scroll p-1 font-mono">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <Shield className="w-5 h-5 text-brand-primary" />
        <h2 className="text-sm font-bold text-white uppercase tracking-widest">Trung tâm Điều khiển & Cá nhân hóa</h2>
      </div>

      {/* Profile Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-3 bg-brand-primary rounded-full" />
          <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Hồ sơ Chỉ huy</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[9px] text-gray-500 uppercase flex items-center gap-1.5">
              <User className="w-3 h-3" /> Tên hiển thị
            </label>
            <input 
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value.toUpperCase() })}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-brand-primary focus:border-brand-primary outline-none transition-colors font-bold"
              placeholder="Nhập tên của bạn"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] text-gray-500 uppercase flex items-center gap-1.5">
              <Palette className="w-3 h-3" /> Màu đại diện
            </label>
            <div className="flex gap-2">
              {['#22d3ee', '#fbbf24', '#818cf8', '#f87171', '#34d399'].map(color => (
                <button
                  key={color}
                  onClick={() => setProfileData({ ...profileData, avatarColor: color })}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${profileData.avatarColor === color ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Risk Governance Section */}
      <section className="space-y-4 pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-3 bg-brand-primary rounded-full" />
          <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Quản trị Rủi ro & Giới hạn</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[9px] text-gray-500 uppercase flex items-center gap-1.5">
              <Shield className="w-3 h-3" /> Giới hạn lỗ hàng ngày (USD)
            </label>
            <input 
              type="number"
              value={riskData.dailyLossLimit}
              onChange={(e) => setRiskData({ ...riskData, dailyLossLimit: parseFloat(e.target.value) })}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-brand-primary outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] text-gray-500 uppercase flex items-center gap-1.5">
              <Activity className="w-3 h-3" /> Đòn bẩy tối đa (Default)
            </label>
            <select 
              value={riskData.maxLeverage}
              onChange={(e) => setRiskData({ ...riskData, maxLeverage: parseInt(e.target.value) })}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-brand-primary outline-none transition-colors appearance-none"
            >
              {[1, 3, 5, 10, 20, 50, 100].map(lev => (
                <option key={lev} value={lev} className="bg-dashboard-bg">{lev}x</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="bg-brand-primary/5 border border-brand-primary/20 p-3 rounded flex gap-2">
          <Lock className="w-3 h-3 text-brand-primary shrink-0 mt-0.5" />
          <p className="text-[9px] text-gray-400 italic leading-relaxed">
            Hệ thống sẽ tự động ngăn chặn (Execution Block) nếu lệnh vượt quá đòn bẩy cho phép hoặc chạm giới hạn lỗ hàng ngày.
          </p>
        </div>
      </section>

      <div className="bg-brand-primary/5 border border-brand-primary/20 p-4 rounded-lg flex gap-3">
        <Info className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
        <p className="text-[10px] text-gray-400 leading-relaxed italic">
          Các khóa API được lưu trữ cục bộ trong trình duyệt của bạn (localStorage). 
          Chúng sẽ được sử dụng để kết nối trực tiếp với sàn giao dịch thông qua API proxy an toàn.
        </p>
      </div>

      {/* AI Configuration Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-3 bg-brand-secondary rounded-full" />
          <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Trí tuệ Nhân tạo (Google Gemini AI)</h3>
        </div>
        
        <div className="bg-brand-secondary/5 border border-brand-secondary/20 p-3 rounded flex gap-2">
          <Info className="w-3 h-3 text-brand-secondary shrink-0 mt-0.5" />
          <p className="text-[9px] text-gray-400 italic">
            Sử dụng để cung cấp quyền truy cập cá nhân vào AI. Nếu không có, hệ thống sẽ sử dụng khóa mặc định.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] text-gray-500 uppercase flex items-center gap-1.5">
            <Key className="w-3 h-3" /> Gemini AI API Key
          </label>
          <div className="relative">
            <input 
              type={showSecrets.geminiKey ? "text" : "password"}
              value={formData.geminiKey}
              onChange={(e) => setFormData({ ...formData, geminiKey: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-brand-secondary outline-none transition-colors"
              placeholder="Nhập API Key từ Google AI Studio"
            />
            <button 
              onClick={() => toggleSecret('geminiKey')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-secondary"
            >
              {showSecrets.geminiKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </button>
          </div>
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noreferrer"
            className="text-[8px] text-brand-secondary hover:underline block mt-1"
          >
            Lấy API Key miễn phí tại đây (Google AI Studio)
          </a>
        </div>
      </section>

      {/* Binance Section */}
      <section className="space-y-4 pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-3 bg-yellow-400 rounded-full" />
          <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Giao dịch (Binance Exchange)</h3>
        </div>
        
        <div className="grid gap-4">
          <div className="space-y-1.5">
            <label className="text-[9px] text-gray-500 uppercase flex items-center gap-1.5">
              <Key className="w-3 h-3" /> API Key
            </label>
            <input 
              type="text"
              value={formData.binanceKey}
              onChange={(e) => setFormData({ ...formData, binanceKey: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-yellow-400 outline-none transition-colors"
              placeholder="Nhập Binance API Key"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] text-gray-500 uppercase flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> API Secret
            </label>
            <div className="relative">
              <input 
                type={showSecrets.binanceSecret ? "text" : "password"}
                value={formData.binanceSecret}
                onChange={(e) => setFormData({ ...formData, binanceSecret: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-yellow-400 outline-none transition-colors"
                placeholder="••••••••••••••••"
              />
              <button 
                onClick={() => toggleSecret('binanceSecret')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-400"
              >
                {showSecrets.binanceSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OKX Section */}
      <section className="space-y-4 pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-3 bg-brand-primary rounded-full" />
          <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Sàn Giao dịch (OKX Exchange)</h3>
        </div>
        
        <div className="grid gap-4">
          <div className="space-y-1.5">
            <label className="text-[9px] text-gray-500 uppercase flex items-center gap-1.5">
              <Key className="w-3 h-3" /> API Key
            </label>
            <input 
              type="text"
              value={formData.okxKey}
              onChange={(e) => setFormData({ ...formData, okxKey: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-brand-primary outline-none transition-colors"
              placeholder="Nhập OKX API Key"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] text-gray-500 uppercase flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> API Secret
            </label>
            <div className="relative">
              <input 
                type={showSecrets.okxSecret ? "text" : "password"}
                value={formData.okxSecret}
                onChange={(e) => setFormData({ ...formData, okxSecret: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-brand-primary outline-none transition-colors"
                placeholder="••••••••••••••••"
              />
              <button 
                onClick={() => toggleSecret('okxSecret')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-primary"
              >
                {showSecrets.okxSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] text-gray-500 uppercase flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Passphrase
            </label>
            <div className="relative">
              <input 
                type={showSecrets.okxPass ? "text" : "password"}
                value={formData.okxPassphrase}
                onChange={(e) => setFormData({ ...formData, okxPassphrase: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-brand-primary outline-none transition-colors"
                placeholder="••••••••"
              />
              <button 
                onClick={() => toggleSecret('okxPass')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-primary"
              >
                {showSecrets.okxPass ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>
      </section>


      <div className="mt-8 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded font-bold text-[11px] uppercase tracking-widest transition-all
            ${saveStatus === 'saved' ? 'bg-green-500 text-white' : 'bg-brand-primary text-black hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]'}`}
        >
          {saveStatus === 'saving' ? (
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : saveStatus === 'saved' ? (
            'Đã lưu thành công'
          ) : (
            <><Save className="w-4 h-4" /> Lưu Cấu hình</>
          )}
        </motion.button>
      </div>

      <div className="p-4 border-t border-white/5 mt-4">
        <p className="text-[8px] text-gray-600 text-center uppercase tracking-widest">
          Version 1.0.4-SENTIENT :: Secured via Client-Side Encryption
        </p>
      </div>
    </div>
  );
}
