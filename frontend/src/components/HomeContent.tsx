import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import {
 ChevronRight,
 Globe,
 Zap
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

// Import images
import dashboardMockup from '../assets/dashboard_mockup.png';
import IndustriesSection from './IndustriesSection';
import ServicesSection from './ServicesSection';

const fadeUp = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: { staggerChildren: 0.1 }
 }
};

const Counter = ({ value, duration = 2, decimals = 0, suffix = "" }: { value: number, duration?: number, decimals?: number, suffix?: string }) => {
 const count = useMotionValue(0);
 const rounded = useTransform(count, (latest) => latest.toFixed(decimals) + suffix);
 const ref = React.useRef(null);
 const isInView = useInView(ref, { once: true });

 React.useEffect(() => {
 if (isInView) {
 animate(count, value, { duration, ease: "easeOut" });
 }
 }, [isInView, value, duration, count]);

 return <motion.span ref={ref}>{rounded}</motion.span>;
};

const HomeContent = () => {
 return (
 <div className="bg-[#02040a] text-white overflow-hidden">
 {/* 3. CORE SERVICES */}
 <ServicesSection />

 {/* 4. INDUSTRIES WE SERVE */}
 <IndustriesSection />

 {/* 5. PORTFOLIO & CASE STUDY */}
 <section className="bg-[#f4f4f5] py-32 border-t border-slate-200">
 <div className="container mx-auto px-6 lg:px-12 relative z-10">

 {/* Header */}
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
 <div>
 <div className="flex items-center gap-2 mb-4">
 <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse " />
 <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-widest">Mission Accomplished</span>
 </div>
 <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95]">Production<br />Case Study</h2>
 </div>
 <p className="text-slate-600 text-lg leading-relaxed max-w-sm font-medium">
 Predictive Logistics Interface engineering for absolute scale and efficiency.
 </p>
 </motion.div>

 {/* Bento Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">

 {/* Main Visual Span 2 */}
 <motion.div
 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
 className="lg:col-span-2 relative bg-white rounded-[32px] border border-slate-200 p-2 flex flex-col justify-end min-h-[420px] overflow-hidden group  transition-all duration-500"
 >
 <div className="absolute inset-0 bg-[#F5A800]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[32px]" />
 <img src={dashboardMockup} alt="Logistics Dashboard" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 rounded-[32px]" />

 <div className="relative z-10 p-8 bg-gradient-to-t from-white via-white/80 to-transparent rounded-b-[32px]">
 <h4 className="text-2xl font-black text-slate-950 mb-2 tracking-tight">Real-time Telemetry Pipeline</h4>
 <p className="text-slate-600 text-sm font-medium">Ingesting 50k events/sec through Kafka into an interactive dashboard.</p>
 </div>
 </motion.div>

 {/* Stats Span 1 */}
 <motion.div
 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
 className="group bg-white rounded-[32px] border border-slate-200 p-8 flex flex-col justify-between hover:border-[#F5A800]/40  transition-all duration-500"
 >
 <div>
 <div className="relative w-14 h-14 rounded-[16px] bg-[#030303] border border-white/10 flex items-center justify-center mb-6 overflow-hidden shadow-sm group-hover:border-[#F5A800]/40 transition-all duration-300">
 <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
 <Zap size={22} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors" />
 </div>
 <h4 className="text-6xl font-black tracking-tighter text-slate-950 mb-2"><Counter value={35} suffix="%" /></h4>
 <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">Route Efficiency</p>
 </div>
 <div className="pt-6 border-t border-slate-100 mt-6">
 <p className="text-slate-500 text-sm leading-relaxed">Automated rerouting saved over 12,000 transit hours in Q1.</p>
 </div>
 </motion.div>

 {/* Location Span 1 */}
 <motion.div
 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
 className="group bg-white rounded-[32px] border border-slate-200 p-8 flex flex-col justify-between hover:border-[#F5A800]/40 transition-all duration-500"
 >
 <div>
 <div className="relative w-14 h-14 rounded-[16px] bg-[#030303] border border-white/10 flex items-center justify-center mb-6 overflow-hidden shadow-sm group-hover:border-[#F5A800]/40 transition-all duration-300">
 <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
 <Globe size={22} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors" />
 </div>
 <h4 className="text-2xl font-black text-slate-950 mb-2">Addis Ababa</h4>
 <p className="text-slate-500 text-sm font-medium">Global Engineering Operations</p>
 </div>
 </motion.div>

 {/* CTA Span 2 */}
 <motion.div
 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
 className="lg:col-span-2 bg-slate-950 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group"
 >
 <div className="absolute inset-0 bg-gradient-to-br from-[#F5A800]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
 <div className="relative z-10">
 <h4 className="text-2xl font-black text-white mb-2">Ready to examine the architecture?</h4>
 <p className="text-white/50 font-medium">Read the full technical breakdown in our portfolio.</p>
 </div>
 <Link to="/portfolio" className="relative z-10 inline-flex shrink-0 items-center gap-3 px-8 py-4 bg-white text-black hover:bg-[#F5A800] rounded-full font-black text-[12px] uppercase tracking-widest shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(245,168,0,0.2)]">
 Examine Details <ChevronRight size={16} />
 </Link>
 </motion.div>

 </div>
 </div>
 </section>




 </div>
 );
};

export default HomeContent;

