import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LiveMonitor = () => {
 const [logs, setLogs] = useState<string[]>([
 '> INITIALIZING NEXYOVI CORE...',
 '> CONNECTING TO GLOBAL_GATEWAY... DONE',
 '> SYNCHRONIZING MIAMI_EDG_01... DONE',
 '> SECURITY MASKING: ACTIVE']);

 useEffect(() => {
 const messages = [
 '> ENCRYPTION HANDSHAKE: SUCCESS',
 '> LOAD BALANCER: OPTIMIZED',
 '> THREAT SCRUBBED: 14.2kb',
 '> LATENCY: 8ms [OPTIMAL]',
 '> CLOUD UPLINK: STABLE',
 '> NODE_SYNC: PEER_VERIFIED'];

 const interval = setInterval(() => {
 setLogs((prev) => [...prev.slice(-12), messages[Math.floor(Math.random() * messages.length)]]);
 }, 2500);

 return () => clearInterval(interval);
 }, []);

 return (
 <section className="py-40 bg-[#060709] border-y border-white/5 relative overflow-hidden">
 <div className="container-narrow">
 <div className="text-center mb-20">
 <motion.div 
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="flex items-center justify-center gap-3 mb-6"
 >
 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse " />
 <span className="text-emerald-500 font-bold uppercase tracking-[0.4em] text-xs">Real-time Operations</span>
 </motion.div>
 <h2 className="text-white font-bold text-[52px] md:text-[64px] tracking-tighter leading-none mb-6">Live System <br/> <span className="text-white/40">Observability.</span></h2>
 </div>

 <div className="relative group">
 {/* Terminal Container */}
 <motion.div 
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="bg-[#090A0C] border border-white/[0.08] rounded-[40px] overflow-hidden transition-all duration-700 group-hover:border-white/20"
 >
 <div className="bg-white/[0.03] px-10 py-5 border-b border-white/[0.05] flex items-center justify-between">
 <div className="flex gap-2">
 <div className="w-3 h-3 rounded-full bg-red-500/20" />
 <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
 <div className="w-3 h-3 rounded-full bg-green-500/20" />
 </div>
 <div className="flex items-center gap-4">
 <span className="text-xs font-mono text-white/10 uppercase tracking-[0.3em] font-bold">Session: ACTIVE_NODE_77</span>
 <div className="h-4 w-px bg-white/10" />
 <span className="text-xs font-mono text-white/50 font-bold">v3.9.2-stable</span>
 </div>
 </div>
 <div className="p-12 font-mono text-[13px] space-y-3 h-[400px] overflow-hidden relative">
 <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#090A0C] to-transparent z-10 pointer-events-none" />
 {logs.map((log, i) => (
 <motion.div 
 initial={{ opacity: 0, x: -5 }} 
 animate={{ opacity: 1, x: 0 }} 
 key={i} 
 className="flex items-start"
 >
 <span className="text-white/10 mr-4 select-none">[{new Date().toLocaleTimeString()}]</span>
 <span className={log.includes('SUCCESS') || log.includes('DONE') ? 'text-emerald-400 font-bold' : 'text-white/50 tracking-tight'}>
 {log}
 </span>
 </motion.div>
 ))}
 <motion.div 
 animate={{ opacity: [1, 0] }} 
 transition={{ repeat: Infinity, duration: 1 }}
 className="inline-block w-1.5 h-4 bg-emerald-500 ml-2 translate-y-1 "
 />
 </div>
 </motion.div>
 
 {/* Floating Info Panels */}
 <motion.div 
 initial={{ opacity: 0, x: 20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 className="absolute -right-12 top-20 bg-blue-600 text-white p-8 rounded-[40px] z-20 hidden lg:block border border-white/20 backdrop-blur-xl"
 >
 <div className="text-xs font-black uppercase tracking-[0.3em] text-white/50 mb-4">Core Velocity</div>
 <div className="text-4xl font-black tracking-tighter mb-2">2.4M</div>
 <div className="text-xs font-bold uppercase tracking-widest text-white/70">Verified REQ/SEC</div>
 </motion.div>

 <motion.div 
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 className="absolute -left-12 bottom-20 bg-emerald-600 text-white p-8 rounded-[40px] z-20 hidden lg:block border border-white/20 backdrop-blur-xl"
 >
 <div className="text-xs font-black uppercase tracking-[0.3em] text-white/50 mb-4">Security Level</div>
 <div className="text-4xl font-black tracking-tighter mb-2">MAX</div>
 <div className="text-xs font-bold uppercase tracking-widest text-white/70">Active Hardening</div>
 </motion.div>
 </div>
 </div>
 </section>
 );
};

export default LiveMonitor;

