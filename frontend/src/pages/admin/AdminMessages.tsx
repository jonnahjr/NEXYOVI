import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
 Mail, Search, Trash2, ChevronRight, 
 X, MessageSquare, Clock, User, Building,
 CheckCircle2, Trash, Quote, ArrowLeft
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const AdminMessages = () => {
 const { messages, deleteMessage } = useSite();
 const [selectedMsg, setSelectedMsg] = useState<any>(null);
 const [searchQuery, setSearchQuery] = useState('');

 const filtered = messages.filter(m => 
 m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
 m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
 m.message.toLowerCase().includes(searchQuery.toLowerCase())
 );

 if (selectedMsg) {
 return (
 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 max-w-6xl mx-auto">
 <div className="flex items-center gap-4">
 <button onClick={() => setSelectedMsg(null)} className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/40 hover:bg-white/[0.08] hover:text-white transition-all">
 <ArrowLeft size={18} />
 </button>
 <div>
 <h1 className="text-2xl font-bold text-white tracking-tight">Inquiry Details</h1>
 <p className="text-sm text-white/40 mt-0.5">Transmission ID: {selectedMsg.id}</p>
 </div>
 </div>

 <div className="bg-[#0D1220] border border-white/[0.08] rounded-2xl overflow-hidden p-6 md:p-8 space-y-6 md:space-y-8">
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
 <div className="lg:col-span-1 space-y-4 md:space-y-6">
 <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 md:p-6 space-y-5">
 <div>
 <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Lead Identity</div>
 <div className="text-lg font-bold text-white">{selectedMsg.name}</div>
 </div>
 <div>
 <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Communication Node</div>
 <div className="text-sm font-semibold text-[#F5A800] break-all">{selectedMsg.email}</div>
 </div>
 <div>
 <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Organization / Company</div>
 <div className="text-sm font-semibold text-white/60">{selectedMsg.company || 'Not Specified'}</div>
 </div>
 <div className="pt-4 border-t border-white/[0.04]">
 <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Received Timestamp</div>
 <div className="text-sm font-semibold text-white/40">{selectedMsg.created_at ? new Date(selectedMsg.created_at).toLocaleString() : 'Just now'}</div>
 </div>
 </div>
 
 <button 
 onClick={() => { deleteMessage(selectedMsg.id); setSelectedMsg(null); }}
 className="w-full h-11 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
 >
 <Trash size={16} /> Delete Intel Report
 </button>
 </div>

 <div className="lg:col-span-2 space-y-6">
 <div className="bg-white/[0.02] border border-white/5 rounded-[24px] p-6 md:p-8 relative h-full min-h-[300px]">
 <Quote className="absolute top-6 right-6 text-white/[0.03]" size={60} />
 <div className="text-xs font-bold text-[#F5A800] uppercase tracking-[0.2em] mb-6">Decrypted Message Content</div>
 <div className="text-sm md:text-base text-white/80 leading-relaxed font-medium italic">
 "{selectedMsg.message}"
 </div>
 </div>
 </div>
 </div>
 
 <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
 <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
 <div className="text-xs font-semibold text-white/40 uppercase tracking-wider leading-relaxed">
 Security verified. Transmission received through the <span className="text-white">Nexyovi Global Contact Terminal</span>. No anomalies detected.
 </div>
 </div>
 </div>
 </motion.div>
 );
 }

 return (
 <div className="space-y-6 max-w-6xl mx-auto">
 {/* Header */}
 <div className="flex items-center justify-between">
 <div>
 <h1 className="text-2xl font-bold text-white tracking-tight">Incoming Intelligence</h1>
 <p className="text-sm text-white/40 mt-0.5">{messages.length} inquiries received</p>
 </div>
 </div>

 {/* Search */}
 <div className="relative">
 <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
 <input 
 value={searchQuery} 
 onChange={e => setSearchQuery(e.target.value)} 
 placeholder="Search by name, email or content..." 
 className="w-full h-12 pl-11 pr-4 bg-[#0D1220] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all " 
 />
 </div>

 {/* Messages Table */}
 <div className="bg-[#0D1220] border border-white/[0.08] rounded-2xl overflow-hidden ">
 <div className="grid grid-cols-12 px-6 py-3 border-b border-white/[0.06] text-xs font-bold text-white/30 uppercase tracking-widest">
 <div className="col-span-5 md:col-span-4">Sender</div>
 <div className="col-span-3 hidden md:block">Service</div>
 <div className="col-span-5 md:col-span-3">Received</div>
 <div className="col-span-2 text-right">Actions</div>
 </div>
 
 {filtered.length > 0 ? filtered.map((msg) => (
 <motion.div 
 key={msg.id}
 layout
 onClick={() => setSelectedMsg(msg)}
 className="grid grid-cols-12 items-center px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group cursor-pointer last:border-0"
 >
 <div className="col-span-5 md:col-span-4 flex items-center gap-4">
 <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20 group-hover:bg-[#F5A800]/10 group-hover:text-[#F5A800] group-hover:border-[#F5A800]/20 transition-all shrink-0">
 <Mail size={16} />
 </div>
 <div className="min-w-0 pr-4">
 <div className="text-sm font-bold text-white truncate">{msg.name}</div>
 <div className="text-xs text-white/40 truncate mt-0.5">{msg.email}</div>
 </div>
 </div>
 <div className="col-span-3 hidden md:block">
 <span className="text-xs font-bold text-[#F5A800] bg-[#F5A800]/10 px-2.5 py-1 rounded-md border border-[#F5A800]/20 uppercase tracking-widest">
 {msg.service || 'General'}
 </span>
 </div>
 <div className="col-span-5 md:col-span-3 flex items-center gap-2 text-sm font-medium text-white/60">
 <Clock size={14} className="text-white/20 shrink-0" />
 <span className="truncate">{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'Now'}</span>
 </div>
 <div className="col-span-2 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
 <button 
 onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
 className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 text-white/40 flex items-center justify-center transition-all"
 >
 <Trash2 size={14} />
 </button>
 <ChevronRight size={16} className="text-white/20 group-hover:text-[#F5A800]" />
 </div>
 </motion.div>
 )) : (
 <div className="py-16 text-center">
 <Mail size={32} className="mx-auto mb-3 text-white/10" />
 <div className="text-sm text-white/40">No intelligence records found.</div>
 </div>
 )}
 </div>
 </div>
 );
};

export default AdminMessages;
