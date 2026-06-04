import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Chatbot = () => {
 const [chatOpen, setChatOpen] = useState(false);
 const [inputValue, setInputValue] = useState('');
 const { toast } = useToast();

 const handleSend = () => {
   if (!inputValue.trim()) return;
   toast('Connecting to live support agent...', 'info');
   setInputValue('');
 };

 return (
 <div className="fixed bottom-6 right-6 z-50">
 <AnimatePresence>
 {chatOpen && (
 <motion.div 
 initial={{ opacity: 0, y: 20, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 20, scale: 0.95 }}
 className="absolute bottom-20 right-0 w-[320px] bg-[#111827] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
 >
 <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-[#F5A800] flex items-center justify-center text-white font-bold text-xs relative">
 N
 <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-black" />
 </div>
 <div>
 <h4 className="text-white font-bold text-xs">Nexyovi Assistant</h4>
 <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">Online</p>
 </div>
 </div>
 <button onClick={() => setChatOpen(false)} className="text-white/40 hover:text-white transition-colors">
 <X size={20} />
 </button>
 </div>
 <div className="p-5 h-[200px] bg-black/40">
 <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tl-sm p-4 w-[90%]">
 <p className="text-white/90 text-sm leading-relaxed">Hi! 👋 How can we help you transform your business today?</p>
 </div>
 </div>
 <div className="p-4 border-t border-white/10 bg-white/5 relative">
 <input 
    type="text" 
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
    placeholder="Type your message..." 
    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 pb-3 pr-10 text-sm text-white focus:outline-none focus:border-[#F5A800] transition-colors" 
  />
 <button onClick={handleSend} className="absolute right-7 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"><Send size={16}/></button>
 </div>
 </motion.div>
 )}
 </AnimatePresence>

 <button 
 onClick={() => setChatOpen(!chatOpen)}
 className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
 chatOpen ? 'bg-white/10 border border-white/20 text-white' : 'bg-[#F5A800] text-white '
 }`}
 >
 {chatOpen ? <X size={24} /> : <div className="w-6 h-6 rounded-full border-[3px] border-white relative"><div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-white"/></div>}
 </button>
 </div>
 );
};

export default Chatbot;
