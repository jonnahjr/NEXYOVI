import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Layers, Zap, Lock, MonitorSmartphone, Code2, Cpu } from 'lucide-react';
import { staggerContainer, EASE_EXPO, revealUp } from '../lib/animations';

export default function AppDevService() {
 return (
 <>
 
 {/* ── HERO ── */}
 <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04]">
 <div className="absolute inset-0 z-0 pointer-events-none">
 <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-[#8b5cf6]/10 blur-[120px] rounded-full mix-blend-screen" />
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
 <Smartphone size={12} />
 Mobile Applications
 </div>
 </motion.div>

 <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[0.95] tracking-tight mb-8">
 Cross-Platform <br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6]">Ecosystems.</span>
 </motion.h1>

 <motion.p variants={revealUp} className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
 We create secure, high-performance mobile applications that extend your enterprise capabilities to the edge of the network.
 </motion.p>

 <motion.div variants={revealUp}>
 <Link to="/contact" className="btn-primary group !bg-[#8b5cf6]/20 !border-[#8b5cf6]/40 hover:!bg-[#8b5cf6]/30 !text-white">
 Build Your Application
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
 { t: 'Native iOS & Android', d: 'High-performance, platform-specific applications utilizing Swift and Kotlin for absolute bare-metal speed.', i: MonitorSmartphone },
 { t: 'Cross-Platform Frameworks', d: 'Efficient development using React Native and Flutter to deploy unified codebases simultaneously.', i: Layers },
 { t: 'Edge Computing Integration', d: 'Apps engineered to run local ML models and process data at the edge for offline capabilities.', i: Cpu },
 { t: 'Mobile Security', d: 'Enterprise mobility management (EMM) integration, biometric auth, and secure local enclaves.', i: Lock },
 { t: 'Real-Time Sync', d: 'WebSocket and GraphQL subscriptions for instantaneous data synchronization with central servers.', i: Zap },
 { t: 'Progressive Web Apps', d: 'App-like experiences deployed directly through the browser bypassing app store bottlenecks.', i: Code2 }].map((cap, i) => (
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
