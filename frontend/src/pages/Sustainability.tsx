import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Globe, Sun, Wind, Recycle, Zap } from 'lucide-react';
import CTASection from '../components/CTASection';

const SustainabilityPage = () => {
 return (
 <div className="theme-light bg-slate-50">
 {/* Hero */}
 <section className="relative min-h-screen flex flex-col justify-center pt-40 pb-32 overflow-hidden border-b border-slate-200 bg-gradient-to-b from-green-50 to-slate-50">
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_70%)]" />
 <div className="container-narrow relative z-10 text-center">
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-bold tracking-widest uppercase"
 >
 <Leaf size={16} /> Tech for Good
 </motion.div>
 <motion.h1 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-[64px] md:text-[84px] font-bold leading-none tracking-tighter mb-8"
 >
 Sustainable <br/> <span className="text-slate-400">Technology.</span>
 </motion.h1>
 <p className="text-[#797d86] text-xl max-w-2xl mx-auto leading-relaxed mb-12">
 Nexyovi is committed to reducing the carbon footprint of global computing. We build efficient architectures that power progress without costing the planet.
 </p>
 </div>
 </section>

 {/* Initiatives */}
 <section className="py-32">
 <div className="container-narrow">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
 {[
 { icon: <Sun size={24} />, title: 'Green Infrastructure', desc: 'Deploying our servers in zero-emission data centers.' },
 { icon: <Zap size={24} />, title: 'Energy Efficiency', desc: 'Optimizing code to reduce CPU cycles and power consumption.' },
 { icon: <Recycle size={24} />, title: 'Circular Hardware', desc: 'Implementing strict e-waste management in all our hubs.' }
 ].map((p, i) => (
 <motion.div 
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="p-10 rounded-[40px] bg-white/[0.02] border border-white/[0.05] text-center"
 >
 <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8">
 <div className="text-green-500">{p.icon}</div>
 </div>
 <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
 <p className="text-white/50 leading-relaxed">{p.desc}</p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* Impact Row */}
 <section className="py-40 bg-green-50 border-y border-slate-200 overflow-hidden">
 <div className="container-narrow">
 <div className="flex flex-col lg:flex-row items-center gap-20">
 <div className="flex-1">
 <h2 className="text-[52px] font-bold tracking-tighter leading-none mb-8">Building a <br/>Better World.</h2>
 <p className="text-slate-500 text-lg leading-relaxed mb-10">
 Our commitment goes beyond code. We actively invest in local tech education in Ethiopia and support sustainable energy projects in the regions we operate.
 </p>
 <div className="grid grid-cols-2 gap-8">
 <div>
 <div className="text-3xl font-bold text-green-700 mb-1">0%</div>
 <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Net Carbon Goal</p>
 </div>
 <div>
 <div className="text-3xl font-bold text-green-700 mb-1">10k+</div>
 <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Hours Mentoring</p>
 </div>
 </div>
 </div>
 <div className="flex-1 relative aspect-square">
 <div className="absolute inset-0 bg-green-500/5 blur-[120px] rounded-full" />
 <div className="relative h-full w-full rounded-full border border-green-500/10 flex items-center justify-center">
 <Globe size={150} className="text-green-500/20 animate-pulse" />
 </div>
 </div>
 </div>
 </div>
 </section>

 <CTASection />
 </div>
 );
};

export default SustainabilityPage;

