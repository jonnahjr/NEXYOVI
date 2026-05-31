import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
 Globe, Mail, Phone, MapPin, 
 Twitter, Linkedin, Github, Youtube, Instagram, 
 Slack, Send, Save, CheckCircle2, Zap, Image as ImageIcon, UploadCloud
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { supabase } from '../../lib/supabase';

const AdminSettings = () => {
 const { settings, updateSettings } = useSite();
 const [formData, setFormData] = useState(settings);
 const [isSaved, setIsSaved] = useState(false);
 const [isUploading, setIsUploading] = useState(false);

 const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
 if (!e.target.files || e.target.files.length === 0) return;
 const file = e.target.files[0];
 
 setIsUploading(true);
 try {
 const fileExt = file.name.split('.').pop();
 const fileName = `logo_${Math.random()}.${fileExt}`;
 const filePath = `settings/${fileName}`;

 const { error: uploadError } = await supabase.storage
 .from('nexyovi_assets')
 .upload(filePath, file);

 if (uploadError) throw uploadError;

 const { data } = supabase.storage
 .from('nexyovi_assets')
 .getPublicUrl(filePath);

 setFormData({ ...formData, logo_url: data.publicUrl });
 } catch (error) {
 console.error('Error uploading logo:', error);
 alert('Error uploading logo.');
 } finally {
 setIsUploading(false);
 }
 };

 const handleSave = (e: React.FormEvent) => {
 e.preventDefault();
 updateSettings(formData);
 setIsSaved(true);
 setTimeout(() => setIsSaved(false), 3000);
 };

 return (
 <div className="space-y-6 max-w-6xl mx-auto">
 {/* Header */}
 <div className="flex items-center justify-between">
 <div>
 <h1 className="text-2xl font-bold text-white tracking-tight">Global Configuration</h1>
 <p className="text-sm text-white/40 mt-0.5">Manage brand identity and connectivity nodes</p>
 </div>
 <button 
 onClick={handleSave}
 className="flex items-center gap-1.5 h-10 px-6 bg-[#F5A800] text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all /20"
 >
 {isSaved ? <CheckCircle2 size={16} /> : <Save size={16} />}
 {isSaved ? 'Synchronized' : 'Save Changes'}
 </button>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 {/* Core Identity */}
 <div className="space-y-6">
 <div className="bg-[#0D1220] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6 ">
 <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
 <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
 <Globe size={18} />
 </div>
 <h3 className="text-lg font-bold text-white">Brand Identity</h3>
 </div>
 
 <div className="space-y-5">
 <div className="space-y-2">
 <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Organization Name</label>
 <input 
 type="text" 
 value={formData.siteName}
 onChange={(e) => setFormData({...formData, siteName: e.target.value})}
 className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm font-semibold text-white outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Main Website Logo</label>
 <div className="flex gap-4 items-center">
 <div className="w-16 h-16 rounded-xl bg-[#070B14] border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
 {formData.logo_url ? (
 <img src={formData.logo_url} alt="Logo" className="w-full h-full object-contain p-2" />
 ) : (
 <ImageIcon size={20} className="text-white/20" />
 )}
 </div>
 <label className={`h-11 px-6 flex items-center justify-center gap-2 rounded-xl border border-white/10 font-bold transition-all cursor-pointer text-sm ${isUploading ? 'bg-white/10 text-white/50' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20'}`}>
 <UploadCloud size={16} />
 {isUploading ? 'Uploading...' : 'Upload Logo'}
 <input 
 type="file" 
 accept="image/*"
 className="hidden" 
 onChange={handleLogoUpload}
 disabled={isUploading}
 />
 </label>
 </div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
 <div className="space-y-2">
 <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Command Email</label>
 <div className="relative">
 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
 <input 
 type="email" 
 value={formData.email}
 onChange={(e) => setFormData({...formData, email: e.target.value})}
 className="w-full h-11 pl-11 pr-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm font-semibold text-white outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all"
 />
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Global Phone</label>
 <div className="relative">
 <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
 <input 
 type="text" 
 value={formData.phone}
 onChange={(e) => setFormData({...formData, phone: e.target.value})}
 className="w-full h-11 pl-11 pr-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm font-semibold text-white outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all"
 />
 </div>
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Primary Hub Address</label>
 <div className="relative">
 <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
 <input 
 type="text" 
 value={formData.address}
 onChange={(e) => setFormData({...formData, address: e.target.value})}
 className="w-full h-11 pl-11 pr-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm font-semibold text-white outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all"
 />
 </div>
 </div>
 </div>
 </div>

 <div className="bg-[#F5A800]/5 border border-[#F5A800]/10 p-6 rounded-2xl text-[#F5A800]/80">
 <div className="flex items-center gap-3 mb-2">
 <Zap size={18} className="fill-current" />
 <h3 className="text-sm font-bold uppercase tracking-widest text-[#F5A800]">Real-time Synchronization</h3>
 </div>
 <p className="text-xs font-medium leading-relaxed text-[#F5A800]/60">
 Changes are instantly broadcasted to the entire network. All global contact nodes and footer links will update in real-time.
 </p>
 </div>
 </div>

 {/* Social Network Nodes */}
 <div className="bg-[#0D1220] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6 h-fit">
 <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
 <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
 <Send size={18} />
 </div>
 <h3 className="text-lg font-bold text-white">Social Connectivity</h3>
 </div>

 <div className="space-y-4">
 {[
 { key: 'twitter', label: 'X (Twitter)', icon: Twitter },
 { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
 { key: 'github', label: 'GitHub', icon: Github },
 { key: 'youtube', label: 'YouTube', icon: Youtube },
 { key: 'instagram', label: 'Instagram', icon: Instagram },
 { key: 'discord', label: 'Discord', icon: Send },
 { key: 'slack', label: 'Slack', icon: Slack }].map((node) => (
 <div key={node.key} className="space-y-2">
 <div className="flex items-center justify-between px-1">
 <label className="text-xs font-bold text-white/30 uppercase tracking-widest">{node.label}</label>
 </div>
 <div className="relative group">
 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#F5A800] transition-colors">
 <node.icon size={14} />
 </div>
 <input 
 type="text" 
 value={formData.socials[node.key]}
 onChange={(e) => setFormData({
 ...formData, 
 socials: { ...formData.socials, [node.key]: e.target.value }
 })}
 className="w-full h-11 pl-11 pr-4 bg-white/[0.02] border border-white/[0.05] rounded-xl text-sm font-semibold text-white/60 outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all font-mono"
 placeholder="https://..."
 />
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 );
};

export default AdminSettings;
