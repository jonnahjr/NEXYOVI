import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
 navigate('/admin');
 }
 };

 return (
 <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-6 relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
 {/* Glow Effects */}
 <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#F5A800]/10 blur-[120px] rounded-full pointer-events-none" />
 <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#4F46E5]/10 blur-[120px] rounded-full pointer-events-none" />
 
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="w-full max-w-[400px] bg-[#111827] border border-white/10 rounded-2xl p-8 relative z-10 "
 >
 <div className="flex flex-col items-center text-center mb-10">
 {settings?.logo_url ? (
 <img src={settings.logo_url} alt="Logo" className="h-10 mb-6 object-contain" />
 ) : (
 <div className="h-[40px] w-[160px] bg-[#f3a847] mb-6" style={{ WebkitMask: `url('${myLogo}') center / contain no-repeat`, mask: `url('${myLogo}') center / contain no-repeat` }} title="Nexyovi" />
 )}
 <h1 className="text-[22px] font-black text-white tracking-tight">Admin Portal</h1>
 <p className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-widest mt-2">Secure Access</p>
 </div>

 <form onSubmit={handleLogin} className="space-y-5">
 <div className="space-y-2">
 <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Email Address</label>
 <div className="relative">
 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
 <input 
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white text-base focus:border-[#F5A800] focus:ring-1 focus:ring-[#F5A800] outline-none transition-all placeholder:text-white/20"
 placeholder="admin@nexyovi.com"
 required
 />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Password</label>
 <div className="relative">
 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
 <input 
 type="password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white text-base focus:border-[#F5A800] focus:ring-1 focus:ring-[#F5A800] outline-none transition-all placeholder:text-white/20"
 placeholder="••••••••"
 required
 />
 </div>
 </div>

 {error && (
 <motion.div 
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium text-center"
 >
 {error}
 </motion.div>
 )}

 <button 
 type="submit"
 disabled={loading}
 className="w-full h-12 mt-4 bg-gradient-to-r from-[#F5A800] to-[#4F46E5] text-white text-sm font-black uppercase tracking-widest rounded-xl  transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
 >
 {loading ? 'Authenticating...' : 'Sign In'} 
 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
 </button>
 </form>

 <div className="mt-8 pt-6 border-t border-white/5 text-center">
 <div className="flex items-center justify-center gap-2 text-xs font-bold text-white/30 uppercase tracking-widest">
 <ShieldCheck size={14} className="text-[#10B981]" />
 Encrypted Connection
 </div>
 </div>
 </motion.div>
 </div>
 );
};

export default AdminLogin;
