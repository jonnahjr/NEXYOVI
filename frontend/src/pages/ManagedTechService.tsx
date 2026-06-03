import { motion } from 'framer-motion';
import { Activity, ArrowRight, Layers, PhoneCall, RefreshCw, ShieldCheck, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE_EXPO, revealUp, staggerContainer } from '../lib/animations';

export default function ManagedTechService() {
 return (
 <>

 {/* ── HERO ── */}
 <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04]">
 <div className="absolute inset-0 z-0 pointer-events-none">
 <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-[#10b981]/10 blur-[120px] rounded-full mix-blend-screen" />
 <div className="absolute inset-0 opacity-[0.03] animate-grid-drift"
 style={{
 backgroundImage: `linear-gradient(rgba(16,185,129,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.6) 1px, transparent 1px)`,
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
 <div className="badge w-fit !bg-[#10b981]/10 !border-[#10b981]/30 !text-[#34d399]">
 <Wrench size={12} />
 Managed Division
 </div>
 </motion.div>

 <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[0.95] tracking-tight mb-8">
 Managed <br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] to-[#10b981]">Technology.</span>
 </motion.h1>

 <motion.p variants={revealUp} className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
 Ongoing enterprise support, infrastructure maintenance, and SLA-backed management to ensure zero downtime.
 </motion.p>

 <motion.div variants={revealUp}>
              <Link to="/contact" className="group btn-dark text-[14px] px-8 py-4">
                <span className="relative z-10">Get Managed Support</span>
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
 { t: 'Infrastructure Maintenance', d: 'Continuous patching, tuning, and optimization of servers, databases, and network environments.', i: Layers },
 { t: 'SLA-backed Support', d: 'Guaranteed response times and robust Service Level Agreements ensuring your systems stay online.', i: ShieldCheck },
 { t: 'System Health Monitoring', d: 'Proactive 24/7 oversight identifying and resolving bottlenecks before they affect end users.', i: Activity },
 { t: 'Continuous Updates', d: 'Seamless rollout of security patches, feature upgrades, and zero-day threat mitigations.', i: RefreshCw },
 { t: 'Performance Tuning', d: 'Ongoing database index optimization, cache management, and architectural refactoring for speed.', i: Wrench },
 { t: 'Incident Response', d: 'Dedicated rapid-response teams mobilized instantly to counter breaches, outages, or data loss events.', i: PhoneCall }].map((cap, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-50px' }}
 transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_EXPO }}
 className="card-hud p-8 group border-[#10b981]/10 hover:border-[#10b981]/30 bg-white border border-slate-200"
 >
 <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#059669] mb-6 group-hover:bg-[#10b981]/20 transition-all">
 <cap.i size={20} />
 </div>
 <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-[#059669] transition-colors">{cap.t}</h3>
 <p className="text-slate-500 text-sm leading-relaxed">{cap.d}</p>
 </motion.div>
 ))}
 </div>

 </div>
 </section>

 </>
 );
}
