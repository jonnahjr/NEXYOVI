import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart3, Database, ShieldAlert, Cpu } from 'lucide-react';
import { staggerContainer, EASE_EXPO, revealUp } from '../lib/animations';
import { Link } from 'react-router-dom';

const caseStudies = [
 {
 id: 'financial-ledger',
 title: 'High-Frequency Trading Ledger',
 client: 'Global Financial Institution',
 icon: Database,
 desc: 'Architected a distributed ledger capable of processing 1M+ transactions per second with cryptographic verification and zero data loss.',
 metrics: [
 { label: 'Throughput', value: '1M+ TPS' },
 { label: 'Latency', value: '<2ms' },
 { label: 'Uptime', value: '100%' }
 ],
 color: '#06b6d4',
 bg: 'from-[#06b6d4]/10 to-transparent',
 },
 {
 id: 'defense-network',
 title: 'Zero-Trust Defense Network',
 client: 'National Security Contractor',
 icon: ShieldAlert,
 desc: 'Re-engineered perimeter defenses and implemented a zero-trust architecture neutralizing advanced persistent threats across global outposts.',
 metrics: [
 { label: 'Threat Blocks', value: '50M/mo' },
 { label: 'Breaches', value: 'Zero' },
 { label: 'Auth Time', value: '<50ms' }
 ],
 color: '#ef4444',
 bg: 'from-[#ef4444]/10 to-transparent',
 },
 {
 id: 'ai-predictive',
 title: 'Predictive Global Supply Chain',
 client: 'International Logistics Firm',
 icon: Cpu,
 desc: 'Deployed an autonomous AI routing system connecting 100,000+ IoT nodes to predict weather delays and optimize shipping routes in real-time.',
 metrics: [
 { label: 'Efficiency Gain', value: '35%' },
 { label: 'IoT Nodes', value: '100k+' },
 { label: 'Cost Reduction', value: '$40M' }
 ],
 color: '#10b981',
 bg: 'from-[#10b981]/10 to-transparent',
 },
 {
 id: 'cloud-scale',
 title: 'Cloud Scalability Engine',
 client: 'Top 10 E-Commerce Platform',
 icon: BarChart3,
 desc: 'Migrated monolithic infrastructure to a multi-region serverless architecture that auto-scales dynamically during Black Friday load events.',
 metrics: [
 { label: 'Peak Concurrency', value: '5M Users' },
 { label: 'Cost Savings', value: '60%' },
 { label: 'Deploy Time', value: '5 Mins' }
 ],
 color: '#8b5cf6',
 bg: 'from-[#8b5cf6]/10 to-transparent',
 }
];

export default function Portfolio() {
 const containerRef = useRef<HTMLDivElement>(null);
 
 return (
 <div className="bg-[#02040a] min-h-screen text-white font-sans selection:bg-[#F5A800]/30 overflow-x-clip" ref={containerRef}>
 
 {/* ── HERO ── */}
 <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04]">
 <div className="absolute inset-0 z-0 pointer-events-none">
 <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-[#F5A800]/10 blur-[120px] rounded-full mix-blend-screen" />
 <div className="absolute inset-0 opacity-[0.03] animate-grid-drift"
 style={{
 backgroundImage: `linear-gradient(rgba(37,99,235,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.6) 1px, transparent 1px)`,
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
 <BarChart3 size={12} />
 Case Studies
 </div>
 </motion.div>

 <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[0.95] tracking-tight mb-8">
 Mission <span className="text-gradient-aurora">Outcomes.</span>
 </motion.h1>

 <motion.p variants={revealUp} className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
 Review our classified enterprise deployments, architectural upgrades, and strategic technical victories for leading global organizations.
 </motion.p>
 </motion.div>
 </div>
 </section>

 {/* ── STICKY STACKING CASE STUDIES ── */}
 <section className="relative py-24 bg-[#050816]">
 <div className="container mx-auto px-4 md:px-6 lg:px-12">
 
 <div className="relative w-full pb-[10vh]">
 {caseStudies.map((study, i) => {
 const Icon = study.icon;
 // Calculate sticky top position based on index to create a stacked deck effect
 const topOffset = 120 + (i * 40); 
 
 return (
 <div 
 key={study.id} 
 className="sticky w-full"
 style={{ top: `${topOffset}px`, zIndex: 10 + i, marginBottom: '60px' }}
 >
 <motion.div
 initial={{ opacity: 0, y: 50 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-10%' }}
 transition={{ duration: 0.7, ease: EASE_EXPO }}
 className="w-full min-h-[500px] md:min-h-[400px] rounded-[32px] md:rounded-[40px] overflow-hidden relative border border-white/10 group"
 >
 {/* Dark gradient base */}
 <div className="absolute inset-0 bg-[#0A0D18]" />
 
 {/* Colored glow layer */}
 <div className={`absolute inset-0 bg-gradient-to-br ${study.bg} opacity-20`} />
 
 {/* Radial highlight on hover */}
 <div 
 className="absolute top-0 right-0 w-[500px] h-[500px] blur-[100px] rounded-full mix-blend-screen opacity-0 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none translate-x-1/3 -translate-y-1/3"
 style={{ backgroundColor: study.color }}
 />

 {/* Technical Grid Overlay */}
 <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
 style={{
 backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
 backgroundSize: '40px 40px',
 }} />

 {/* Content Layout */}
 <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 p-8 md:p-12 h-full items-center">
 
 {/* Left Content (Text) */}
 <div className="lg:col-span-7">
 <div className="flex flex-wrap items-center gap-4 mb-8">
 <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center backdrop-blur-md" style={{ color: study.color }}>
 <Icon size={24} />
 </div>
 <div>
 <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] block mb-1 opacity-60" style={{ color: study.color }}>
 Project {i + 1} // Classified
 </span>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
 {study.title}
 </h2>
 </div>
 </div>

 <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-black/40 border border-white/5 backdrop-blur-sm">
 <div className="w-2 h-2 rounded-full animate-pulse " style={{ backgroundColor: study.color, color: study.color }} />
 <span className="text-sm font-bold text-white/80">Client: {study.client}</span>
 </div>

 <p className="text-[#9CA3AF] text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-medium">
 {study.desc}
 </p>

 {/* Link to detail page using dummy AI/Security routes for now, could be dynamic */}
 <Link to={`/case-studies/${i === 1 ? 'ai-smart-logistics' : 'global-bank-security'}`} className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-black uppercase tracking-widest text-xs shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(245,168,0,0.15)] group/btn ">
 Access Full Briefing <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
 </Link>
 </div>

 {/* Right Content (Metrics HUD) */}
 <div className="lg:col-span-5 h-full relative">
 <div className="absolute inset-0 bg-black/20 rounded-[24px] border border-white/5 backdrop-blur-md p-8 flex flex-col justify-center">
 
 <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
 <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">System Telemetry</span>
 <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Live</span>
 </div>

 <div className="flex flex-col gap-8">
 {study.metrics.map((metric, j) => (
 <div key={j} className="relative group/metric">
 <div className="text-[11px] font-black uppercase tracking-widest text-white/40 mb-2 group-hover/metric:text-white/80 transition-colors">{metric.label}</div>
 <div className="flex items-end gap-4"><div className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                {metric.value}
              </div>
              {/* Decorative chart bar */}
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                <div className="h-full rounded-full" style={{ width: `${70 + j * 10}%`, backgroundColor: study.color }} />
              </div>
 </div>
 </div>
 ))}
 </div>

 </div>
 </div>

 </div>
 </motion.div>
 </div>
 );
 })}
 </div>

 </div>
 </section>

 </div>
 );
}
