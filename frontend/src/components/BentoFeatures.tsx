import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Cpu, Lock, Terminal } from 'lucide-react';

const BentoFeatures = () => {
  return (
    <section className="py-40 bg-[#060709] overflow-hidden">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-white font-bold text-[64px] md:text-[84px] tracking-tighter leading-[0.9] mb-8">
              Engineering <br/> <span className="text-white/40 italic">at scale.</span>
            </h2>
            <p className="text-[#a1a1a6] text-xl max-w-xl leading-relaxed">
              We build systems that handle millions of requests while maintaining sub-millisecond latency. Our architecture is battle-tested in global markets.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[900px]">
          {/* Main Hero Bento Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="md:col-span-8 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.08] rounded-[64px] p-16 flex flex-col justify-between relative overflow-hidden group transition-all duration-500"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12)_0%,transparent_50%)]" />
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full group-hover:bg-blue-500/10 transition-colors duration-700" />
            
            <div className="relative z-10">
               <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-12 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                  <Shield size={32} className="text-blue-500" />
               </div>
               <h3 className="text-5xl font-bold text-white mb-8 tracking-tighter">Cyber-Resilient <br/> Infrastructure.</h3>
               <p className="text-[#86868b] text-lg max-w-md leading-relaxed">
                  Military-grade security protocols integrated directly into the infrastructure layer. We don't just secure apps; we secure the entire ecosystem.
               </p>
            </div>

            <div className="relative mt-16 bg-black/60 rounded-3xl border border-white/5 p-8 backdrop-blur-xl shadow-2xl">
               <div className="flex items-center gap-4 mb-6">
                  <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.3)]" />
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.3)]" />
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
                  </div>
                  <span className="text-sm font-mono text-white/50 uppercase tracking-[0.2em] font-bold">Nexyovi Security OS --active</span>
               </div>
               <div className="space-y-3 font-mono text-[12px]">
                  <p className="text-emerald-400 font-bold flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" /> SYSTEM_HARDENING: COMPLETE
                  </p>
                  <p className="text-white/40">AUDITING: Global endpoints in Addis & Miami...</p>
                  <p className="text-blue-400 font-semibold italic">THREAT_LEVEL: 0% Detected</p>
               </div>
            </div>
          </motion.div>

          {/* Right Column Grid */}
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 0.98 }}
              className="bg-[#0b0c0f] border border-white/[0.08] rounded-[64px] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group transition-all duration-500"
            >
               <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               <div className="relative z-10 flex flex-col items-center">
                  <Globe size={100} className="text-orange-500/20 mb-8 animate-pulse-slow group-hover:text-orange-500/30 transition-colors" />
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tighter">Global Hub <br/> Sync.</h3>
                  <p className="text-[#4a4b50] text-base leading-relaxed">
                    Zero-latency data parity between North America and East Africa.
                  </p>
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 0.98 }}
              className="bg-[#0b0c0f] border border-white/[0.08] rounded-[64px] p-12 flex flex-col justify-end relative overflow-hidden group transition-all duration-500"
            >
               <div className="absolute top-12 left-12 w-24 h-24 rounded-full bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-colors duration-700" />
               <Cpu size={48} className="text-purple-500/40 mb-8 group-hover:rotate-[30deg] group-hover:text-purple-500 transition-all duration-500" />
               <h3 className="text-3xl font-bold text-white mb-4 tracking-tighter">AI-Core <br/> Optimization.</h3>
               <p className="text-[#4a4b50] text-base leading-relaxed">
                  Self-healing systems architected by our proprietary ML engines.
               </p>
            </motion.div>
          </div>

          {/* Bottom Full-Width Bento Card */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             whileHover={{ y: -5 }}
             className="md:col-span-12 bg-gradient-to-r from-zinc-900 to-[#060709] border border-white/[0.08] rounded-[64px] p-16 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative group transition-all duration-500"
          >
             <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
             <div className="relative z-10 flex-1">
                <div className="text-emerald-500 font-black text-[96px] md:text-[120px] mb-2 leading-none tracking-tighter group-hover:scale-105 transition-transform duration-700">99.9%</div>
                <div className="text-white/40 uppercase tracking-[0.4em] text-sm font-bold pl-2">System Uptime Performance</div>
             </div>
             <div className="relative z-10 flex-1 border-l border-white/10 pl-16 py-4">
                <h3 className="text-4xl font-bold text-white mb-6 tracking-tighter">Stateless Architecture.</h3>
                <p className="text-[#636366] text-xl leading-relaxed font-medium">
                   Our decentralized systems are built to survive regional outages without dropping a single data packet. High availability is built-in, not added on.
                </p>
                <div className="mt-8 flex gap-4">
                   <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white/50 uppercase tracking-widest">Multi-Cloud</div>
                   <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white/50 uppercase tracking-widest">Serverless</div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;

