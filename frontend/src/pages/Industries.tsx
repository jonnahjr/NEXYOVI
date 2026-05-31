import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Building2, Activity, ShieldAlert, HeartPulse, GraduationCap, Truck, Zap, ShoppingCart, ArrowRight } from 'lucide-react';
import { staggerContainer, EASE_EXPO, revealUp } from '../lib/animations';

const industries = [
 {
 id: 'finance',
 name: 'Financial Services',
 icon: Activity,
 desc: 'High-frequency trading infrastructure, core banking modernization, and secure blockchain networks engineered for zero latency and absolute transactional integrity.',
 metrics: ['Sub-millisecond latency', 'PCI-DSS Compliance', 'Encrypted Ledgers'],
 color: '#FFD166',
 bg: 'from-[#FFD166]/10 to-transparent',
 },
 {
  id: 'government',
  name: 'Government & Public Sector',
  icon: ShieldAlert,
  desc: 'Mission-critical systems, secure data platforms, and citizen service portals built on zero-trust architectures for public sector operations.',
  metrics: ['Zero-Trust Architecture', 'Data Encryption', 'Compliance Ready'],
  color: '#ef4444',
  bg: 'from-[#ef4444]/10 to-transparent',
 },
 {
 id: 'healthcare',
 name: 'Healthcare Systems',
 icon: HeartPulse,
 desc: 'Interoperable electronic health records (EHR), telemedicine platforms, and IoT medical device networks secured by strict data governance protocols.',
 metrics: ['HIPAA Ready', 'Real-time telemetry', 'Data Anonymization'],
 color: '#10b981',
 bg: 'from-[#10b981]/10 to-transparent',
 },
 {
 id: 'logistics',
 name: 'Global Logistics',
 icon: Truck,
 desc: 'Predictive supply chain routing, IoT fleet tracking, and automated warehouse management systems to optimize global operations.',
  metrics: ['Predictive Routing', 'Real-time IoT sync', 'High Availability'],
 color: '#f59e0b',
 bg: 'from-[#f59e0b]/10 to-transparent',
 },
 {
 id: 'energy',
 name: 'Energy & Utilities',
 icon: Zap,
 desc: 'Smart grid management, predictive maintenance models, and SCADA security solutions protecting critical national infrastructure.',
 metrics: ['SCADA Security', 'Predictive Maintenance', 'IoT Edge Compute'],
 color: '#eab308',
 bg: 'from-[#eab308]/10 to-transparent',
 },
 {
 id: 'manufacturing',
 name: 'Advanced Manufacturing',
 icon: Building2,
 desc: 'Industry 4.0 integrations, computer vision quality control, and robotic automation systems connected through edge networks.',
 metrics: ['Computer Vision QC', 'Edge Processing', 'Automated Workflows'],
 color: '#8b5cf6',
 bg: 'from-[#8b5cf6]/10 to-transparent',
 },
 {
 id: 'education',
 name: 'EdTech Platforms',
 icon: GraduationCap,
 desc: 'Scalable learning management systems (LMS) and virtual classrooms supporting millions of concurrent users globally.',
 metrics: ['High Concurrency', 'Video Streaming', 'Interactive Portals'],
 color: '#ec4899',
 bg: 'from-[#ec4899]/10 to-transparent',
 },
 {
 id: 'retail',
 name: 'Retail & E-Commerce',
 icon: ShoppingCart,
 desc: 'Omnichannel consumer platforms, inventory prediction AI, and highly available transaction processing systems.',
 metrics: ['Dynamic Auto-scaling', 'Predictive Inventory', 'Sub-second Loads'],
 color: '#06b6d4',
 bg: 'from-[#06b6d4]/10 to-transparent',
 }
];

export default function Industries() {
 const [activeSection, setActiveSection] = useState('finance');
 const { hash } = useLocation();

 useEffect(() => {
 if (hash) {
 const id = hash.replace('#', '');
 const element = document.getElementById(id);
 if (element) {
 setTimeout(() => {
 element.scrollIntoView({ behavior: 'smooth' });
 }, 500);
 }
 }
 }, [hash]);

 useEffect(() => {
 const observers: IntersectionObserver[] = [];
 industries.forEach(({ id }) => {
 const element = document.getElementById(id);
 if (element) {
 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 setActiveSection(id);
 }
 });
 },
 { rootMargin: '-20% 0px -60% 0px' }
 );
 observer.observe(element);
 observers.push(observer);
 }
 });
 return () => observers.forEach(obs => obs.disconnect());
 }, []);

 const scrollTo = (id: string) => {
 const element = document.getElementById(id);
 if (element) {
 const y = element.getBoundingClientRect().top + window.scrollY - 150;
 window.scrollTo({ top: y, behavior: 'smooth' });
 }
 };

 return (
 <div className="bg-slate-50 min-h-screen text-slate-900 font-sans overflow-x-clip">
 
 {/* ── HERO ── */}
 <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-slate-200">
 <div className="absolute inset-0 z-0 pointer-events-none">
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#F5A800]/5 blur-[120px] rounded-full" />
 <div className="absolute inset-0 opacity-[0.015]"
 style={{
 backgroundImage: `linear-gradient(rgba(245,168,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,168,0,0.3) 1px, transparent 1px)`,
 backgroundSize: '40px 40px',
 }} />
 </div>

 <div className="container relative z-10">
 <motion.div
 variants={staggerContainer}
 initial="hidden"
 animate="visible"
 className="flex flex-col items-center text-center max-w-4xl mx-auto"
 >
 <motion.div variants={revealUp} className="mb-8">
 <div className="badge w-fit">
 <Building2 size={12} />
 Global Sectors
 </div>
 </motion.div>
 <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black text-slate-900 leading-[0.95] tracking-tight mb-8">
 Domain <span className="text-gradient-aurora">Expertise.</span>
 </motion.h1>
 <motion.p variants={revealUp} className="text-slate-500 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
 We deploy specialized technology architectures engineered specifically for the regulatory, security, and operational demands of distinct global industries.
 </motion.p>
 </motion.div>
 </div>
 </section>

 {/* ── Sticky Sub-Navigation ── */}
 <div className="sticky top-[80px] md:top-[96px] z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
 <div className="max-w-[1400px] mx-auto px-4 py-3">
 <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-10">
 {industries.map(({ id, name }) => (
 <button
 key={id}
 onClick={() => scrollTo(id)}
 className={`text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-colors relative whitespace-nowrap ${
 activeSection === id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'
 }`}
 >
 {name}
 {activeSection === id && (
 <motion.div
 layoutId="activeIndustrySection"
 className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#F5A800] "
 transition={{ type: "spring", stiffness: 300, damping: 30 }}
 />
 )}
 </button>
 ))}
 </div>
 </div>
 </div>

 {/* ── INDUSTRIES CONTENT ── */}
 <div className="relative z-10 flex flex-col">
 {industries.map((ind, i) => {
 const Icon = ind.icon;
 return (
 <div id={ind.id} key={ind.id} className="scroll-mt-32 relative py-32 border-b border-slate-200/50">
 {/* Parallax Background Glow */}
 <div className="absolute inset-0 pointer-events-none overflow-hidden">
 <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl ${ind.bg} blur-[100px] rounded-full mix-blend-screen opacity-50`} />
 </div>

 <div className="container mx-auto px-6 lg:px-12 relative z-10">
 <div className="grid md:grid-cols-2 gap-16 items-center">
 
 <motion.div 
 initial={{ opacity: 0, x: -30 }} 
 whileInView={{ opacity: 1, x: 0 }} 
 viewport={{ once: true, margin: '-100px' }}
 transition={{ duration: 0.8, ease: EASE_EXPO }}
 >
 <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-8">
 <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: ind.color }} />
 <span className="text-xs font-black uppercase tracking-widest text-slate-600">Sector Profile</span>
 </div>
 
 <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
 {ind.name}
 </h2>
 
 <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium">
 {ind.desc}
 </p>

 <div className="space-y-4">
 {ind.metrics.map((m, j) => (
 <div key={j} className="flex items-center gap-4">
 <div className="w-6 h-6 rounded-md flex items-center justify-center bg-slate-100 border border-slate-200">
 <ArrowRight size={12} style={{ color: ind.color }} />
 </div>
 <span className="text-slate-700 font-bold">{m}</span>
 </div>
 ))}
 </div>
 </motion.div>

 <motion.div 
 initial={{ opacity: 0, scale: 0.95 }} 
 whileInView={{ opacity: 1, scale: 1 }} 
 viewport={{ once: true, margin: '-100px' }}
 transition={{ duration: 0.8, ease: EASE_EXPO }}
 className="relative aspect-square md:aspect-[4/3] rounded-[32px] overflow-hidden bg-white border border-slate-200 flex items-center justify-center group"
 >
 <div className="absolute inset-0 bg-white z-0" />
 
 {/* Inner graphic */}
 <div className="relative z-10 w-32 h-32 rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
 <Icon size={64} style={{ color: ind.color }} />
 </div>

 {/* Decorative HUD Elements */}
 <div className="absolute top-6 left-6 flex gap-2 z-10">
 <div className="w-2 h-2 bg-slate-300 rounded-full" />
 <div className="w-2 h-2 bg-slate-300 rounded-full" />
 </div>
 <div className="absolute bottom-6 right-6 text-[10px] font-mono text-slate-400 tracking-widest z-10">
 SEC_ID: {ind.id.toUpperCase()}_SYS
 </div>
 </motion.div>

 </div>
 </div>
 </div>
 );
 })}
 </div>

 </div>
 );
}
