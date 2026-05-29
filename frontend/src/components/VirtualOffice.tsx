import React, { useState } from 'react';
import { motion } from 'framer-motion';
import techAbstract from '../assets/tech_abstract.png';

const features = [
  {
    id: 'internet',
    title: 'Internet Installation',
    desc: "Fiber optic and high-speed wireless solutions for enterprises and homes.",
  },
  {
    id: 'networking',
    title: 'Network Infrastructure',
    desc: 'Scalable routing, switching, and firewall configuration for complex environments.',
  },
  {
    id: 'support',
    title: '24/7 Managed Services',
    desc: 'Proactive monitoring and maintenance to ensure zero downtime for your business.',
  },
];

const VirtualOffice = () => {
  const [active, setActive] = useState('internet');

  return (
    <section id="networking" className="bg-[#090B0E] py-32 border-b border-white/5 text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[40px] md:rounded-[64px] overflow-hidden border border-white/10 bg-[#060709] aspect-square order-2 lg:order-1 shadow-[0_50px_100px_rgba(0,0,0,0.4)] group"
          >
            <img src={techAbstract} alt="Technology Grid" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] opacity-20 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-transparent opacity-90" />
            
            <div className="relative z-10 w-full h-full p-8 md:p-12 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs md:text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-2">Global Infrastructure</span>
                  <span className="text-lg md:text-xl font-bold text-white tracking-tight">Addis-Miami Trunk</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-md">
                   <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                   <span className="text-xs md:text-xs text-blue-400 font-black uppercase tracking-widest hidden sm:inline">Active Line</span>
                </div>
              </div>

              <div className="flex-grow flex items-center justify-center">
                 <div className="text-center relative">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-0 bg-blue-500 rounded-full blur-[80px]" 
                    />
                    <div className="text-[80px] md:text-[120px] font-black text-white leading-none tracking-tighter opacity-[0.05] select-none">NODE</div>
                    <div className="text-xs md:text-[12px] font-mono text-blue-400/60 tracking-[0.4em] md:tracking-[0.8em] mt-4 uppercase">Encrypted Packet Stream</div>
                 </div>
              </div>

              <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs md:text-sm text-white/40 uppercase font-black tracking-widest">Throughput efficiency</span>
                  <span className="text-xs md:text-sm text-blue-400 font-mono font-bold tracking-tighter">1.2 TB/S</span>
                </div>
                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: '92%' }}
                     transition={{ duration: 2, delay: 0.5, ease: "circOut" }}
                     className="h-full bg-gradient-to-r from-blue-600 to-cyan-400" 
                   />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.4em]">IT Infrastructure</span>
            </div>
            <h2 className="text-white font-black text-[48px] md:text-[64px] tracking-tighter leading-[1.0] mb-8">
              The Backbone <br /> <span className="text-white/40 italic">of the Internet.</span>
            </h2>
            <p className="text-white/50 text-xl leading-relaxed mb-12 font-medium">
              We deploy the networking layer that powers thousands of concurrent connections. From fiber optics to secure SD-WAN.
            </p>

            <div className="space-y-4">
              {features.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActive(f.id)}
                  className={`w-full group text-left p-6 md:p-8 rounded-[32px] transition-all duration-300 border border-transparent ${
                    active === f.id ? 'bg-white/[0.04] border-white/10' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <p className={`text-lg md:text-xl font-bold mb-2 transition-colors ${active === f.id ? 'text-white' : 'text-white/50'}`}>
                    {f.title}
                  </p>
                  <p className={`text-sm md:text-[15px] leading-relaxed transition-colors ${active === f.id ? 'text-white/60' : 'text-white/50'}`}>
                    {f.desc}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VirtualOffice;

