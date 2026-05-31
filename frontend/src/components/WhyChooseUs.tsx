import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Rocket } from 'lucide-react';
import workspace from '../assets/workspace_hero.png';

const WhyChooseUs = () => {
 const reasons = [
 {
 icon: <Shield className="text-emerald-500" size={24} />,
 title: 'Architectural Sovereignty',
 desc: 'We build systems that you own entirely, free from vendor lock-in and engineered for transparency.'
 },
 {
 icon: <Rocket className="text-blue-500" size={24} />,
 title: 'Elastic Velocity',
 desc: 'Our agile squads deliver production-grade features in weeks, not months, using modern CI/CD.'
 }
 ];

 return (
 <section className="bg-[#090B0E] py-32 border-b border-white/5 overflow-hidden">
 <div className="container mx-auto px-6 lg:px-12">
 <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
 <motion.div 
 initial={{ opacity: 0, x: -30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 className="flex-1 lg:max-w-xl"
 >
 <div className="inline-flex items-center gap-2 mb-6">
 <div className="w-2 h-2 rounded-full bg-blue-500" />
 <span className="text-blue-400 text-xs font-black uppercase tracking-[0.4em]">Why Nexyovi</span>
 </div>
 <h2 className="text-white font-black text-[48px] md:text-[64px] tracking-tighter leading-[1.0] mb-8">Why leaders <br/> <span className="text-white/40 italic">trust us.</span></h2>
 <p className="text-white/50 text-xl leading-relaxed mb-12 font-medium">
 Nexyovi is a modern software and AI development company. We help businesses build digital products, automate workflows, and modernize operations — without the overhead or the hype.
 </p>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {reasons.map((reason, i) => (
 <div key={i} className="group p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300">
 <div className="w-12 h-12 rounded-2xl bg-white/[0.02] flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/5 transition-colors">
 {reason.icon}
 </div>
 <h4 className="text-white font-bold text-xl mb-3 tracking-tight">{reason.title}</h4>
 <p className="text-white/40 text-sm leading-relaxed">{reason.desc}</p>
 </div>
 ))}
 </div>

 <div className="mt-16 flex gap-12 sm:gap-20 border-t border-white/10 pt-12">
 <div>
 <p className="text-4xl md:text-5xl font-black text-white leading-none tracking-tighter">30+</p>
 <p className="text-xs sm:text-[12px] uppercase tracking-widest font-bold text-white/40 mt-3">Elite Engineers</p>
 </div>
 <div>
 <p className="text-4xl md:text-5xl font-black text-white leading-none tracking-tighter">100%</p>
 <p className="text-xs sm:text-[12px] uppercase tracking-widest font-bold text-white/40 mt-3">Delivery Rate</p>
 </div>
 </div>
 </motion.div>

 <motion.div 
 initial={{ opacity: 0, scale: 0.95 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 className="flex-1 relative w-full"
 >
 <div className="absolute inset-0 bg-blue-500/10 blur-[150px] rounded-full translate-x-1/4" />
 <div className="relative rounded-[40px] md:rounded-[60px] overflow-hidden border border-white/10 group aspect-[4/3] lg:aspect-auto h-full">
 <img src={workspace} alt="Nexyovi Workspace" className="w-full h-full object-cover scale-[1.05] group-hover:scale-100 transition-transform duration-[2s]" />
 <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D]/80 via-transparent to-transparent pointer-events-none" />
 <div className="absolute top-8 right-8 bg-[#090A0C]/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
 <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Status</p>
 <p className="text-white font-bold text-xs flex items-center gap-2">
 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse " /> Operational
 </p>
 </div>
 </div>
 </motion.div>
 </div>
 </div>
 </section>
 );
};

export default WhyChooseUs;

