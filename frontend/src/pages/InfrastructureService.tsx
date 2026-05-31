import { motion } from 'framer-motion';
import { Activity, ArrowRight, Cloud, Network, Scale, Server, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE_EXPO, revealUp, staggerContainer } from '../lib/animations';

export default function InfrastructureService() {
 return (
 <>

 {/* ── HERO ── */}
 <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04]">
 <div className="absolute inset-0 z-0 pointer-events-none">
 <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-[#0ea5e9]/10 blur-[120px] rounded-full mix-blend-screen" />
 <div className="absolute inset-0 opacity-[0.03] animate-grid-drift"
 style={{
 backgroundImage: `linear-gradient(rgba(14,165,233,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.6) 1px, transparent 1px)`,
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
 <div className="badge w-fit !bg-[#0ea5e9]/10 !border-[#0ea5e9]/30 !text-[#38bdf8]">
 <Server size={12} />
 Infrastructure Division
 </div>
 </motion.div>

 <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[0.95] tracking-tight mb-8">
 Infrastructure & <br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9]">Networking.</span>
 </motion.h1>

 <motion.p variants={revealUp} className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
 Cloud architecture, high-performance servers, enterprise networking, and 24/7 monitoring systems built for 99.99% availability.
 </motion.p>

 <motion.div variants={revealUp}>
 <Link to="/contact" className="btn-primary group !bg-[#0ea5e9]/20 !border-[#0ea5e9]/40 !text-white">
 Scale Your Infrastructure
 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
 { t: 'Cloud Architecture', d: 'Multi-region AWS, Azure, and GCP deployments configured for high availability and disaster recovery.', i: Cloud },
 { t: 'Server Infrastructure', d: 'Bare-metal virtualization, Kubernetes clusters, and container orchestration for massive scale.', i: Server },
 { t: 'Enterprise Networking', d: 'SD-WAN, zero-trust network access, and secure global connectivity for distributed teams.', i: Network },
 { t: 'Reliability Engineering', d: 'Automated CI/CD pipelines, chaos engineering, and proactive fault tolerance systems.', i: ShieldCheck },
 { t: '24/7 Monitoring', d: 'Comprehensive telemetry, distributed tracing, and real-time alerting for immediate incident response.', i: Activity },
 { t: 'Auto-Scaling Systems', d: 'Dynamic resource provisioning that scales instantly with demand to optimize costs and performance.', i: Scale }].map((cap, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-50px' }}
 transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_EXPO }}
 className="card-hud p-8 group border-[#0ea5e9]/10 hover:border-[#0ea5e9]/30 bg-white border border-slate-200"
 >
 <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 flex items-center justify-center text-[#0284c7] mb-6 group-hover:bg-[#0ea5e9]/20 transition-all">
 <cap.i size={20} />
 </div>
 <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-[#0284c7] transition-colors">{cap.t}</h3>
 <p className="text-slate-500 text-sm leading-relaxed">{cap.d}</p>
 </motion.div>
 ))}
 </div>

 </div>
 </section>

 </>
 );
}
