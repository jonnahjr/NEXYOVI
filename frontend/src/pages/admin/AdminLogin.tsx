import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import { supabase } from '../../lib/supabase';
import myLogo from '../../assets/logo 1.png';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { settings } = useSite();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message || 'Invalid email or password');
      setLoading(false);
    } else {
      setTimeout(() => navigate('/admin', { replace: true }), 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#02040a] via-[#050816] to-[#02040a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[-25%] right-[-15%] w-[600px] h-[600px] bg-[#F5A800]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-25%] left-[-15%] w-[600px] h-[600px] bg-[#6366f1]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-gradient-to-br from-[#050816]/95 to-[#02040a]/95 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F5A800]/15 to-transparent rounded-full blur-3xl" />
          
          <div className="flex flex-col items-center text-center mb-10 relative">
            {settings?.logo_url ? (
              <img src={settings.logo_url} alt="Logo" className="h-12 mb-6 object-contain" />
            ) : (
              <div className="h-14 w-14 bg-gradient-to-br from-[#F5A800] to-[#ffb700] mb-6 rounded-2xl flex items-center justify-center shadow-lg shadow-[#F5A800]/30">
                <ShieldCheck size={30} className="text-white" />
              </div>
            )}
            <h1 className="text-2xl font-black text-white tracking-tight mb-2">Admin Portal</h1>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-[0.25em]">Secure Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-7">
            <div className="space-y-3">
              <label className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/35 group-focus-within:text-[#F5A800] transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 pl-14 pr-5 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white text-base outline-none focus:border-[#F5A800]/60 focus:ring-2 focus:ring-[#F5A800]/20 transition-all duration-300 placeholder:text-white/20 group-hover:border-white/[0.12]"
                  placeholder="admin@nexyovi.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/35 group-focus-within:text-[#F5A800] transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 pl-14 pr-5 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white text-base outline-none focus:border-[#F5A800]/60 focus:ring-2 focus:ring-[#F5A800]/20 transition-all duration-300 placeholder:text-white/20 group-hover:border-white/[0.12]"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="px-5 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium text-center flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={16} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={loading}
              className="w-full h-14 mt-2 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-white text-sm font-black uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-[#F5A800]/30 group disabled:opacity-50 disabled:hover:shadow-none"
            >
              {loading ? 'Authenticating...' : 'Sign In'} 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-white/[0.06] text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-white/35 uppercase tracking-[0.2em]">
              <ShieldCheck size={16} className="text-emerald-400" />
              Encrypted Connection
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
