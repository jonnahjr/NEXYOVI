import React from 'react';
import { motion } from 'framer-motion';
import { Box, Link2, Coins, ShieldCheck, Zap, Globe, Cpu, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';

const Web3Service = () => {
  const points = [
    { icon: <Link2 size={24} />, title: 'Smart Contracts', desc: 'Immutable, self-executing contracts for transparent operations.' },
    { icon: <Coins size={24} />, title: 'Tokenomics', desc: 'Design and deployment of custom enterprise tokens.' },
    { icon: <Box size={24} />, title: 'DApp Development', desc: 'Decentralized applications with zero points of failure.' },
    { icon: <ShieldCheck size={24} />, title: 'Security Audits', desc: 'Exposing vulnerabilities in blockchain architectures.' },
  ];

  return (
    <div className="bg-[#080703] text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center pt-40 pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.03)_0%,transparent_70%)]" />
        <div className="container-narrow relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-bold tracking-widest uppercase"
          >
            <Box size={16} /> Web3 & Blockchain
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[64px] md:text-[84px] font-bold leading-none tracking-tighter mb-8"
          >
            Decentralized <br/> <span className="text-white/40">Efficiency.</span>
          </motion.h1>
          <p className="text-[#797d86] text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Harness the power of blockchain to build trustless, high-security ecosystems. Nexyovi leads the way in enterprise Web3 implementation.
          </p>
          <div className="flex justify-center gap-4">
             <Link to="/contact" className="px-12 py-5 bg-yellow-500 text-black font-black uppercase tracking-widest text-[13px] rounded-2xl hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)]">Launch DApp</Link>
             <Link to="/contact" className="px-12 py-5 border-2 border-white/10 rounded-2xl hover:bg-white/5 transition-all text-white font-black uppercase tracking-widest text-[13px]">Audit Contract</Link>
          </div>
        </div>
      </section>

      {/* Points */}
      <section className="py-32">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {points.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[32px] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all"
              >
                <div className="text-yellow-500 mb-6">{p.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm font-medium">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry impact */}
      <section className="py-40 bg-zinc-950 border-y border-white/5">
        <div className="container-narrow">
           <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1">
                 <h2 className="text-[52px] font-bold tracking-tighter leading-none mb-8">Redefining <br/>Ownership.</h2>
                 <p className="text-white/40 text-lg leading-relaxed mb-10">
                    Blockchain is more than just currency; it is the infrastructure of trust. We implement Web3 solutions across Supply Chain, Real Estate, and Finance.
                 </p>
                 <div className="space-y-4">
                    {['Ethereum', 'Solana', 'Polygon', 'Hyperledger'].map(chain => (
                       <div key={chain} className="inline-block mr-4 mb-4 px-6 py-2 rounded-full border border-white/10 text-white/50 text-sm font-bold uppercase tracking-wider">{chain}</div>
                    ))}
                 </div>
              </div>
              <div className="flex-1 relative h-[300px] flex items-center justify-center">
                 <div className="w-full h-full border border-yellow-500/10 rounded-3xl relative overflow-hidden flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      className="w-40 h-40 border-2 border-dashed border-yellow-500/20 rounded-full flex items-center justify-center"
                    >
                       <Cpu size={40} className="text-yellow-500/20" />
                    </motion.div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.05)_0%,transparent_70%)]" />
                 </div>
              </div>
           </div>
        </div>
      </section>


    </div>
  );
};

export default Web3Service;

