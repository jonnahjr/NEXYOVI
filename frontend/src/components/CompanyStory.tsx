import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeUp, viewport } from '../lib/animations';

const CompanyStory = () => {
 return (
 <section className="bg-[#02040a] py-24 relative overflow-hidden text-white">
 {/* Decorative gradients */}
 <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-[#F5A800] to-[#FFD166] pointer-events-none" />
 <div className="container mx-auto px-6 lg:px-12 relative z-10">
 {/* Header */}
 <motion.div
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={viewport}
 className="text-center mb-12"
 >
 <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
 Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Story</span>
 </h2>
 <p className="text-white/70 max-w-2xl mx-auto text-lg">
 From a bold vision in Addis Ababa to a global software and AI company — we help businesses build digital products, automate workflows, and modernize operations.
 </p>
 </motion.div>
 {/* Timeline */}
 <div className="max-w-3xl mx-auto relative">
 {/* Vertical Line */}
 <div className="absolute top-0 bottom-0 left-[27px] w-px bg-white/10" />

 <div className="space-y-12">
 {[
  { year: '2018', title: 'Founded', desc: 'Bootstrapped the first prototype in Addis Ababa, focusing on AI-driven automation for Ethiopian enterprises.' },
  { year: '2020', title: 'First Enterprise Clients', desc: 'Shipped production systems for government and financial sector clients, establishing our engineering reputation.' },
  { year: '2022', title: 'Expanding Horizons', desc: 'Grew our engineering team and expanded service offerings across cloud infrastructure, AI, and cybersecurity.' },
  { year: '2024', title: 'Enterprise Suite', desc: 'Released a full-stack platform serving finance, health, and government sectors across the region.' }].map((item, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={viewport}
 transition={{ delay: i * 0.15, duration: 0.6 }}
 className="relative pl-16 group"
 >
 {/* Node */}
 <div className="absolute left-[19px] top-1.5 w-4 h-4 rounded-full bg-[#02040a] border-2 border-white/20 group-hover:border-[#F5A800] transition-colors duration-300 z-10 " />
 
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3 group-hover:border-[#F5A800]/30 transition-colors">
 <span className="text-[10px] font-black text-[#F5A800] uppercase tracking-widest">{item.year}</span>
 </div>
 <h3 className="text-white font-black text-2xl tracking-tight mb-2 group-hover:text-[#F5A800] transition-colors">{item.title}</h3>
 <p className="text-white/60 text-base leading-relaxed max-w-xl">{item.desc}</p>
 </motion.div>
 ))}
 </div>
 </div>
 </div>
 </section>
 );
};

export default CompanyStory;
