import { motion } from 'framer-motion';
import {
 ArrowRight,
 Building2,
 DollarSign,
 Factory,
 GraduationCap,
 HeartPulse,
 ShoppingCart,
 Truck,
 Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const industries = [
 {
  id: 'fintech',
  icon: DollarSign,
  title: 'FinTech',
  subtitle: 'Financial Technology',
  desc: 'Ultra-low latency trading systems, secure payment gateways, and blockchain architectures built to PCI-DSS standards.',
  accent: '#10b981',
  glow: 'rgba(16,185,129,0.10)',
  metrics: [
   { value: '<1ms', label: 'Latency' },
   { value: 'PCI-DSS', label: 'Compliance' },
   { value: 'Enterprise', label: 'Uptime' }],
  tags: ['Smart Contracts', 'Payment APIs', 'Risk Analytics'],
 },
 {
  id: 'healthtech',
  icon: HeartPulse,
  title: 'HealthTech',
  subtitle: 'Healthcare Technology',
  desc: 'HIPAA-compliant data pipelines, secure telemedicine platforms, and predictive patient analytics systems.',
  accent: '#ef4444',
  glow: 'rgba(239,68,68,0.10)',
  metrics: [
   { value: 'HIPAA', label: 'Compliant' },
   { value: 'EHR', label: 'Integration' },
   { value: 'Real-Time', label: 'Analytics' }],
  tags: ['Telemedicine', 'Patient AI', 'EHR Systems'],
 },
 {
  id: 'logistics',
  icon: Truck,
  title: 'Logistics',
  subtitle: 'Supply Chain & Logistics',
  desc: 'Real-time supply chain visibility, predictive routing algorithms, and IoT fleet tracking at enterprise scale.',
  accent: '#f59e0b',
  glow: 'rgba(245,158,11,0.10)',
  metrics: [
   { value: '50K/s', label: 'Events' },
   { value: '35%', label: 'Efficiency ↑' },
   { value: 'IoT', label: 'Fleet Tracking' }],
  tags: ['Route AI', 'IoT Tracking', 'Warehouse Systems'],
 },
 {
  id: 'government',
  icon: Building2,
  title: 'Government',
  subtitle: 'Public Sector',
  desc: 'Secure, sovereign digital infrastructure for public institutions with highest-grade compliance and auditability.',
  accent: '#F5A800',
  glow: 'rgba(245,168,0,0.10)',
  metrics: [
   { value: 'Air-Gap', label: 'Capable' },
   { value: 'SOC-2', label: 'Ready' },
   { value: 'On-Prem', label: 'Deployments' }],
  tags: ['Sovereign Cloud', 'Identity & Access', 'Audit Trails'],
 },
 {
  id: 'education',
  icon: GraduationCap,
  title: 'Education',
  subtitle: 'EdTech Platforms',
  desc: 'Intelligent learning management systems, AI tutoring engines, and scalable campus digital infrastructure.',
  accent: '#8b5cf6',
  glow: 'rgba(139,92,246,0.10)',
  metrics: [
   { value: '100K+', label: 'Users Served' },
   { value: 'LMS', label: 'Platforms' },
   { value: 'AI', label: 'Tutoring' }],
  tags: ['LMS', 'AI Tutoring', 'Campus Systems'],
 },
 {
  id: 'manufacturing',
  icon: Factory,
  title: 'Manufacturing',
  subtitle: 'Industrial Automation',
  desc: 'Smart factory automation, predictive maintenance, and IIoT data platforms for modern industrial operations.',
  accent: '#06b6d4',
  glow: 'rgba(6,182,212,0.10)',
  metrics: [
   { value: 'IIoT', label: 'Integration' },
   { value: '40%', label: 'Downtime ↓' },
   { value: 'Edge', label: 'Computing' }],
  tags: ['Smart Factory', 'Predictive Maint.', 'IIoT'],
 },
 {
  id: 'retail',
  icon: ShoppingCart,
  title: 'Retail',
  subtitle: 'Commerce Technology',
  desc: 'Omnichannel commerce platforms, AI-driven personalization, and real-time inventory intelligence systems.',
  accent: '#ec4899',
  glow: 'rgba(236,72,153,0.10)',
  metrics: [
   { value: 'Omni', label: 'Channel' },
   { value: 'AI', label: 'Personalization' },
   { value: 'Real-Time', label: 'Inventory' }],
  tags: ['eCommerce', 'Personalization', 'Inventory AI'],
 },
 {
  id: 'energy',
  icon: Zap,
  title: 'Energy',
  subtitle: 'Energy & Utilities',
  desc: 'Smart grid management, renewable energy optimization, and critical infrastructure monitoring platforms.',
  accent: '#F5A800',
  glow: 'rgba(245,168,0,0.10)',
  metrics: [
   { value: 'Smart', label: 'Grid' },
   { value: 'SCADA', label: 'Integration' },
   { value: '24/7', label: 'Monitoring' }],
  tags: ['Smart Grid', 'SCADA', 'Renewables'],
 }];

const IndustriesSection = () => {
 return (
  <section className="relative bg-[#f4f4f5] py-32 border-t border-slate-200 overflow-hidden">

   {/* Subtle dot pattern */}
   <div
    className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
    style={{
     backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.5px, transparent 0.5px)',
     backgroundSize: '28px 28px',
    }}
   />

   <div className="container relative z-10 mx-auto px-6">

    {/* ── Section Header ── */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
     className="max-w-2xl mb-16"
    >
     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
       Solutions That Transform
      </span>
     </div>

     <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-[-0.04em] leading-[0.9] mb-6">
      Industries We{' '}
      <span className="text-[#F5A800]">Empower</span>
     </h2>

     <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
      Deep domain expertise across eight core industries — from fintech and healthcare to government and energy. We build solutions that understand your industry.
     </p>
    </motion.div>

    {/* ── Industry Cards Grid ── */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
     {industries.map((ind, i) => {
      const Icon = ind.icon;
      return (
       <motion.div
        key={ind.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
        className="group relative"
       >
        <div className="relative h-full p-6 rounded-[24px] bg-white border border-slate-200 transition-all duration-500 group-hover:border-[#F5A800]/40 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">

         {/* Hover radial glow */}
         <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${ind.glow}, transparent 70%)` }}
         />

         {/* Top accent bar */}
         <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, ${ind.accent}, transparent)` }}
         />

         {/* Card Content */}
         <div className="relative z-10 flex flex-col h-full">

          {/* Icon + Number */}
          <div className="flex items-center justify-between mb-5">
           <div className="w-12 h-12 rounded-[16px] bg-slate-100 border border-slate-200 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-[#F5A800]/30">
            <Icon size={20} className="text-slate-600 group-hover:text-[#F5A800] transition-colors duration-300" />
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-300">
            0{i + 1}
           </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-black text-slate-950 tracking-[-0.02em] mb-1 group-hover:text-[#F5A800] transition-colors duration-300">
           {ind.title}
          </h3>
          <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-3">
           {ind.subtitle}
          </div>

          {/* Description */}
          <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1 font-medium">
           {ind.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
           {ind.tags.map((tag) => (
            <span
             key={tag}
             className="text-[9px] font-bold uppercase tracking-[0.12em] px-2.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 group-hover:border-slate-300 group-hover:text-slate-600 transition-all duration-300"
            >
             {tag}
            </span>
           ))}
          </div>

          {/* Metrics Row */}
          <div className="flex gap-2 pt-4 border-t border-slate-100">
           {ind.metrics.map((m) => (
            <div
             key={m.label}
             className="flex-1 bg-slate-50 border border-slate-100 rounded-[10px] p-2 text-center group-hover:border-slate-200 transition-all duration-300"
            >
             <div className="text-sm font-bold text-slate-900 tracking-tight">{m.value}</div>
             <div className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400 mt-0.5">{m.label}</div>
            </div>
           ))}
          </div>

          {/* CTA */}
          <Link
           to="/industries"
           className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 group-hover:text-[#F5A800] transition-colors duration-300"
          >
            Explore Industry
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>

         </div>
        </div>
       </motion.div>
      );
     })}
    </div>

    {/* ── Bottom CTA ── */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
     className="mt-14 text-center"
    >
     <Link
      to="/industries"
      className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-slate-950 text-white font-bold text-[15px] transition-all hover:scale-105 hover:bg-[#F5A800] hover:shadow-[0_0_30px_rgba(245,168,0,0.15)]"
     >
      View All Industries
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
     </Link>
    </motion.div>

   </div>
  </section>
 );
};

export default IndustriesSection;
