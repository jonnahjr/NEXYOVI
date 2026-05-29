import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Lock, Database, Milestone, BarChart2, Filter } from 'lucide-react';

const features = [
  { id: 'mobile', icon: <RefreshCw size={16} />, title: 'Mobile App Dev', desc: 'Custom iOS and Android applications built for performance.' },
  { id: 'web', icon: <Lock size={16} />, title: 'Web Systems', desc: 'Scalable enterprise platforms and e-commerce solutions.' },
  { id: 'custom', icon: <Database size={16} />, title: 'Software Customization', desc: 'Adapting existing software to fit your unique business logic.' },
  { id: 'api', icon: <Milestone size={16} />, title: 'API Integration', desc: 'Seamlessly connecting your systems with third-party services.' },
  { id: 'cloud', icon: <BarChart2 size={16} />, title: 'Cloud Infrastructure', desc: 'Designing and managing robust cloud-native architectures.' },
  { id: 'consult', icon: <Filter size={16} />, title: 'IT Consultation', desc: 'Professional advice on software architecture and technology stack.' },
];

const GithubSync = () => {
  const [active, setActive] = useState('mobile');

  return (
    <section id="software" className="bg-[#080A0D] py-32 border-t border-white/5 overflow-hidden text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:max-w-xl"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-orange-400 text-xs font-black uppercase tracking-[0.4em]">Software Engineering</span>
            </div>
            <h2 className="text-white font-black text-[48px] md:text-[64px] tracking-tighter leading-[1.0] mb-8">
               Engineering <br /> <span className="text-white/40 italic">custom logic.</span>
            </h2>
            <p className="text-white/50 text-xl leading-relaxed mb-12 font-medium">
               From scalable enterprise platforms to low-latency mobile apps, we architect software that grows with you.
            </p>

            <div className="space-y-4">
              {features.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActive(f.id)}
                  className={`w-full group text-left px-8 py-6 rounded-[24px] md:rounded-[32px] transition-all duration-300 border ${
                    active === f.id ? 'border-orange-500/20 bg-white/[0.04]' : 'border-transparent hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${active === f.id ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-white/[0.02] text-white/50 border border-white/10'}`}>
                      {f.icon}
                    </div>
                    <div>
                      <p className={`text-lg font-bold transition-colors ${active === f.id ? 'text-white' : 'text-white/50'}`}>{f.title}</p>
                      {active === f.id && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-sm text-white/40 mt-1 max-w-xs leading-snug">
                          {f.desc}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full"
          >
            <div className="absolute inset-0 bg-orange-500/10 blur-[150px] rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none" />
            
            <div className="relative border border-white/10 rounded-[40px] md:rounded-[64px] bg-[#090B0E] p-4 md:p-[6px] shadow-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              
              <div className="relative bg-[#060709] rounded-[36px] md:rounded-[56px] p-8 md:p-12 border border-white/5 z-10 w-full h-full">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10 pb-8 border-b border-white/5">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-xl font-black text-orange-500 border border-orange-500/20">
                    N
                  </div>
                  <div>
                    <p className="text-base font-bold text-white tracking-tight">Mainframe v4</p>
                    <p className="text-xs md:text-xs text-white/50 font-black uppercase tracking-[0.3em]">Production Env Â· US-East-1</p>
                  </div>
                  <div className="ml-auto hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Live Sync</span>
                  </div>
                </div>

                {/* Project items */}
                <div className="space-y-4">
                  {[
                    { title: 'Payment Gateway Alpha', label: 'DEPLOYED', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
                    { title: 'Real-time Analytics Dashboard', label: 'REVIEW', color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
                    { title: 'Enterprise Auth Protocol', label: 'TESTING', color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' },
                    { title: 'Legacy Data Migration', label: 'IN PROGRESS', color: 'text-white/40 bg-white/5 border-white/10' },
                  ].map((issue, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white/[0.02] border border-white/5 group/item hover:border-white/10 transition-all">
                      <p className="text-sm font-semibold text-white/70">{issue.title}</p>
                      <span className={`shrink-0 text-xs font-black tracking-widest px-3 py-1.5 rounded-full border ${issue.color}`}>{issue.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Status Bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#060709] bg-white/10" />
                     ))}
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                       <p className="text-xs md:text-xs font-black text-white/50 uppercase tracking-widest">Response Time</p>
                       <p className="text-sm font-bold text-white">24ms</p>
                    </div>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
                      <RefreshCw size={20} className="text-orange-500" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GithubSync;

