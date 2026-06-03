import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Cloud, Server, Database, Activity, Lock, Cpu } from 'lucide-react';
import { staggerContainer, EASE_EXPO, revealUp } from '../lib/animations';

export default function CloudService() {
 return (
 <>
 
 {/* ── HERO ── */}
 <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04]">
 <div className="absolute inset-0 z-0 pointer-events-none">
 <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-[#8b5cf6]/10 blur-[120px] rounded-full mix-blend-screen" />
 <div className="absolute inset-0 opacity-[0.03] animate-grid-drift"
 style={{
 backgroundImage: `linear-gradient(rgba(139,92,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.6) 1px, transparent 1px)`,
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
 <div className="badge w-fit !bg-[#8b5cf6]/10 !border-[#8b5cf6]/30 !text-[#a78bfa]">
 <Cloud size={12} />
 Cloud Architecture
 </div>
 </motion.div>

 <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[0.95] tracking-tight mb-8">
 Elastic <br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6]">Cloud Infrastructure.</span>
 </motion.h1>

 <motion.p variants={revealUp} className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
 Transform your enterprise with multi-region, zero-trust cloud architectures optimized for extreme scalability and reliability.
 </motion.p>

 <motion.div variants={revealUp}>
              <Link to="/contact" className="group btn-accent text-[14px] px-8 py-4">
                <span className="relative z-10">Start Cloud Migration</span>
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
 { t: 'Multi-Cloud Deployments', d: 'Distributed architectures across AWS, Azure, and GCP preventing vendor lock-in and ensuring absolute resilience.', i: Cloud },
 { t: 'Infrastructure as Code', d: 'Automated provisioning using Terraform to ensure mathematically precise, repeatable deployments.', i: Server },
 { t: 'Cloud Security Posture', d: 'Continuous monitoring and automated remediation of cloud configurations to prevent data exposure.', i: Lock },
 { t: 'Serverless Compute', d: 'Event-driven execution models that scale instantly to infinite demand without server management overhead.', i: Cpu },
 { t: 'Distributed Databases', d: 'Globally replicated, low-latency database systems guaranteeing strong consistency and high availability.', i: Database },
 { t: 'Cloud Optimization', d: 'Financial operations (FinOps) tuning to drastically reduce cloud spend while improving performance.', i: Activity }].map((cap, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-50px' }}
 transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_EXPO }}
 className="card-hud p-8 group border-[#8b5cf6]/10 hover:border-[#8b5cf6]/30 bg-white border border-slate-200"
 >
 <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#7c3aed] mb-6 group-hover:bg-[#8b5cf6]/20 transition-all">
 <cap.i size={20} />
 </div>
 <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-[#7c3aed] transition-colors">{cap.t}</h3>
 <p className="text-slate-500 text-sm leading-relaxed">{cap.d}</p>
 </motion.div>
 ))}
 </div>

 </div>
 </section>

 </>
 );
}
