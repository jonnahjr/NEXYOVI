import { motion } from 'framer-motion';
import { CheckCircle2, Code2, Globe, Shield, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cardReveal, fadeUp, staggerContainerSlow, viewport } from '../lib/animations';

const values = [
 {
 id: 'integrity',
 icon: Shield,
 title: 'Engineering Integrity',
 desc: 'We build to last — every line of code, every architecture decision holds to the highest standard.',
 accent: '#F5A800',
 },
 {
 id: 'velocity',
 icon: Zap,
 title: 'Relentless Velocity',
 desc: 'Speed is a feature. We ship enterprise-grade solutions faster than anyone in the market.',
 accent: '#f59e0b',
 },
 {
 id: 'global',
 icon: Globe,
 title: 'Global Ambition',
 desc: 'African innovation engineered to compete and win on the world stage.',
 accent: '#10b981',
 },
 {
 id: 'partnership',
 icon: Users,
 title: 'Deep Partnership',
 desc: 'We embed with your team — not as vendors, but as technical co-founders of your mission.',
 accent: '#8b5cf6',
 },
 {
 id: 'craft',
 icon: Code2,
 title: 'Technical Excellence',
 desc: 'Mastery is non-negotiable. We obsess over architecture, performance, and reliability.',
 accent: '#06b6d4',
 }];

const differentiators = [
 'Senior Engineers across multiple countries',
 'Enterprise Security on every engagement',
 'Dedicated technical lead per project',
 'Full IP transfer at project completion',
 'Agile delivery with continuous deployment',
 'Security-first architecture by default'];

const CompanyValues = () => {
 return (
 <section className="relative bg-[#f4f4f5] py-32 overflow-hidden border-t border-slate-200 text-slate-950">

 <div className="container relative z-10">

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
 
 {/* Left Column: Header & Guarantee */}
 <div className="lg:col-span-5 flex flex-col items-start">
 <motion.div
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={viewport}
 >
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
 <span className="text-[11px] font-bold text-slate-600 uppercase tracking-[0.2em]">Why Nexyovi</span>
 </div>
 <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-5">
 Built on What{' '}
 <span className="text-slate-500">Matters</span>
 </h2>
 <p className="text-slate-600 text-lg leading-relaxed mb-12">
 Five principles that shape every engagement, every architecture, and every line of code we write.
 </p>
 </motion.div>

 {/* Differentiators Card */}
 <motion.div
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={viewport}
 className="relative p-8 rounded-[28px] bg-white border border-slate-200 overflow-hidden w-full hover:border-[#F5A800]/40 transition-colors"
 >
 <div className="absolute inset-0 bg-gradient-to-br from-slate-100/80 to-transparent pointer-events-none" />
 <div className="inline-flex items-center gap-2 mb-8 relative z-10">
 <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse " />
 <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-[0.2em]">Our Guarantee</span>
 </div>
 <div className="space-y-5 relative z-10">
 {differentiators.map((d, i) => (
 <div key={i} className="flex items-start gap-4">
 <CheckCircle2 size={18} className="text-[#F5A800] shrink-0 mt-0.5" />
 <span className="text-slate-700 text-sm font-medium leading-relaxed">{d}</span>
 </div>
 ))}
 </div>
 </motion.div>
 </div>

 {/* Right Column: Vertical Stepper */}
 <div className="lg:col-span-7 relative">
 {/* Vertical Line */}
 <div className="absolute top-4 bottom-4 left-[23px] w-px bg-slate-200" />

 <div className="space-y-12">
 {values.map((v, i) => {
 const Icon = v.icon;
 return (
 <motion.div
 key={v.id}
 initial={{ opacity: 0, x: 20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={viewport}
 transition={{ delay: i * 0.1, duration: 0.5 }}
 className="relative pl-16 group"
 >
 {/* Icon Node */}
 <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-[#F5A800] group-hover:border-[#F5A800]/30 transition-colors z-10">
 <Icon size={20} />
 </div>

 <div className="pt-2">
 <h3 className="text-2xl font-bold text-slate-950 tracking-tight mb-3 group-hover:text-[#F5A800] transition-colors">{v.title}</h3>
 <p className="text-slate-600 text-base leading-relaxed font-medium max-w-xl">{v.desc}</p>
 </div>
 </motion.div>
 );
 })}
 </div>
 </div>
 </div>

 {/* CTA */}
 <motion.div
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={viewport}
 className="flex justify-center"
 >
 <Link to="/company" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-[12px] uppercase tracking-widest hover:bg-slate-800 transition-all">
 Learn more about Nexyovi
 <span className="text-white/80">→</span>
 </Link>
 </motion.div>
 </div>
 </section>
 );
};

export default CompanyValues;
