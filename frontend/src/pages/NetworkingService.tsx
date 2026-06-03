import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Network, Server, Cloud, Activity, Lock, Cpu } from 'lucide-react';
import { staggerContainer, EASE_EXPO, revealUp } from '../lib/animations';

export default function NetworkingService() {
 return (
 <>
 
 {/* ── HERO ── */}
 <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04]">
 <div className="absolute inset-0 z-0 pointer-events-none">
 <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-[#F5A800]/10 blur-[120px] rounded-full mix-blend-screen" />
 <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#06b6d4]/10 blur-[120px] rounded-full mix-blend-screen" />
 <div className="absolute inset-0 opacity-[0.05] animate-grid-drift"
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
 <Network size={12} />
 Global Architecture
 </div>
 </motion.div>

 <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[0.95] tracking-tight mb-8">
 Scalable <span className="text-gradient-cyan">Networks.</span><br />
 Zero Downtime.
 </motion.h1>

 <motion.p variants={revealUp} className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
 We design, build, and operate resilient enterprise networks and cloud environments capable of handling massive throughput with uncompromising reliability.
 </motion.p>

 <motion.div variants={revealUp}>
              <Link to="/contact" className="group btn-cyan text-[14px] px-8 py-4">
                <span className="relative z-10">Architect Your Network</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
 </motion.div>
 </motion.div>
 </div>
 </section>

 {/* ── CORE CAPABILITIES ── */}
 <section className="py-24 bg-slate-50">
 <div className="container mx-auto px-6 lg:px-12">
 
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {[
 { t: 'Enterprise SD-WAN', d: 'Software-defined wide area networking for secure, high-bandwidth routing across global offices and data centers.', i: Network },
 { t: 'Cloud Infrastructure', d: 'Multi-region AWS, Azure, and GCP deployments engineered for absolute high-availability and disaster recovery.', i: Cloud },
 { t: 'Server Automation', d: 'Infrastructure as Code (IaC) utilizing Terraform and Ansible for rapid, reproducible, and error-free provisioning.', i: Server },
 { t: 'Edge Computing', d: 'Decentralized processing power pushing computation closer to data sources for sub-millisecond latency.', i: Cpu },
 { t: 'Network Security', d: 'Integrated next-gen firewalls, DPI (Deep Packet Inspection), and secure VPN gateways.', i: Lock },
 { t: 'Live Telemetry', d: 'Deep observability stacks providing real-time metrics, logging, and performance analysis.', i: Activity }].map((cap, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-50px' }}
 transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_EXPO }}
 className="card-hud p-8 group border-[#06b6d4]/10 hover:border-[#06b6d4]/30 bg-white border border-slate-200"
 >
 <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center text-[#0891b2] mb-6 group-hover:bg-[#06b6d4]/20 transition-all">
 <cap.i size={20} />
 </div>
 <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-[#0891b2] transition-colors">{cap.t}</h3>
 <p className="text-slate-500 text-sm leading-relaxed">{cap.d}</p>
 </motion.div>
 ))}
 </div>

 </div>
 </section>

 {/* ── TOPOLOGY MAP ── */}
 <section className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
 <div className="container mx-auto px-6 lg:px-12 relative z-10">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
 
 {/* Animated Topology Visual */}
 <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[24px] bg-slate-50 border border-slate-200 overflow-hidden card-hud flex items-center justify-center">
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.15)_0%,_transparent_70%)]" />
 
 {/* SVG Connections */}
 <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none" style={{ }}>
 <path d="M 50 20 L 20 50 L 50 80 L 80 50 Z" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
 <path d="M 50 20 L 50 80" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="0.5" strokeDasharray="1 1" vectorEffect="non-scaling-stroke" />
 <path d="M 20 50 L 80 50" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="0.5" strokeDasharray="1 1" vectorEffect="non-scaling-stroke" />
 <circle r="1" fill="#22d3ee" className="animate-data-flow"><animateMotion dur="2s" repeatCount="indefinite" path="M 50 20 L 20 50" /></circle>
 <circle r="1" fill="#22d3ee" className="animate-data-flow" style={{ animationDelay: '1s' }}><animateMotion dur="2s" repeatCount="indefinite" path="M 20 50 L 50 80" /></circle>
 <circle r="1" fill="#22d3ee" className="animate-data-flow" style={{ animationDelay: '0.5s' }}><animateMotion dur="2s" repeatCount="indefinite" path="M 80 50 L 50 20" /></circle>
 </svg>

 {/* Nodes */}
 <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#02040a] border border-[#06b6d4]/40 flex items-center justify-center z-10"><Cloud size={16} className="text-[#22d3ee]" /></div>
 <div className="absolute top-[50%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#02040a] border border-[#06b6d4]/40 flex items-center justify-center z-10"><Server size={16} className="text-[#22d3ee]" /></div>
 <div className="absolute top-[50%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#02040a] border border-[#06b6d4]/40 flex items-center justify-center z-10"><Lock size={16} className="text-[#22d3ee]" /></div>
 <div className="absolute top-[80%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#02040a] border border-[#06b6d4]/40 flex items-center justify-center z-10"><Cpu size={16} className="text-[#22d3ee]" /></div>
 
 {/* Center Core */}
 <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#06b6d4]/20 border-2 border-[#06b6d4] flex items-center justify-center z-10 animate-pulse">
 <Network size={20} className="text-white" />
 </div>
 </div>

 <div>
 <div className="text-[#0891b2] text-xs font-black uppercase tracking-[0.4em] mb-4">Architecture</div>
 <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Global Topology.</h2>
 <p className="text-slate-500 text-lg leading-relaxed mb-8">
 Visualize and control your entire infrastructure across hybrid and multi-cloud environments. We engineer for absolute resilience, ensuring single points of failure do not exist.
 </p>
 <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
 <div>
 <div className="text-[10px] font-black uppercase tracking-widest text-[#0891b2]/70 mb-1">Availability</div>
 <div className="text-3xl font-mono font-black text-slate-900">99.999%</div>
 </div>
 <div>
 <div className="text-[10px] font-black uppercase tracking-widest text-[#0891b2]/70 mb-1">Packet Loss</div>
 <div className="text-3xl font-mono font-black text-slate-900">0.00%</div>
 </div>
 </div>
 </div>

 </div>
 </div>
 </section>

 </>
 );
}
