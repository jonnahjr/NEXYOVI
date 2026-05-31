import { motion } from 'framer-motion';
import { ArrowRight, Bot, BrainCircuit, Cpu, LineChart, Network, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE_EXPO, revealUp, staggerContainer } from '../lib/animations';

export default function AIService() {
 return (
 <>

 {/* ── HERO ── */}
 <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04] bg-[#02040a]">
 <div className="absolute inset-0 z-0 pointer-events-none">
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#06b6d4]/5 blur-[120px] rounded-full mix-blend-screen" />
 </div>

 <div className="container relative z-10">
 <motion.div
 variants={staggerContainer}
 initial="hidden"
 animate="visible"
 className="flex flex-col items-center text-center max-w-4xl mx-auto"
 >
 <motion.div variants={revealUp} className="mb-8">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#06b6d4]/20 backdrop-blur-md">
 <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
 <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#06b6d4]">Artificial Intelligence</span>
 </div>
 </motion.div>

 <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[1.05] tracking-[-0.04em] mb-8 text-white">
 Enterprise <br className="hidden md:block" />
 <span className="text-white/40">Neural Intelligence.</span>
 </motion.h1>

 <motion.p variants={revealUp} className="text-white/50 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
 Transform raw enterprise data into predictive operational intelligence with advanced machine learning pipelines and custom LLM architectures.
 </motion.p>

 <motion.div variants={revealUp}>
 <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black text-[12px] uppercase tracking-widest transition-all hover:scale-105 group">
 Deploy AI Systems
 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
 </Link>
 </motion.div>
 </motion.div>
 </div>
 </section>

 {/* ── CORE CAPABILITIES ── */}
 <section className="py-24 bg-slate-50">
 <div className="container mx-auto px-6 lg:px-12">

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {[
 { t: 'Custom LLM Integration', d: 'Enterprise-grade language models trained on proprietary corporate data securely within your private cloud.', i: Bot },
 { t: 'Predictive Analytics', d: 'Forecasting models utilizing massive datasets for strategic foresight, demand prediction, and risk mitigation.', i: LineChart },
 { t: 'Intelligent Automation', d: 'Replacing manual bottlenecks with autonomous workflow agents capable of complex decision-making.', i: Zap },
 { t: 'Computer Vision', d: 'Visual intelligence systems for manufacturing quality control, security monitoring, and spatial analysis.', i: Cpu },
 { t: 'Neural Architectures', d: 'Deep learning frameworks designed for high-dimensional data processing and pattern recognition.', i: BrainCircuit },
 { t: 'AI Data Pipelines', d: 'Automated ELT systems preparing massive structured and unstructured datasets for machine learning consumption.', i: Network }].map((cap, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-50px' }}
 transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_EXPO }}
 className="card-hud p-8 group hover:border-[#06b6d4]/30 bg-white border border-slate-200"
 >
 <div className="w-12 h-12 rounded-[14px] bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center text-[#06b6d4] mb-6 group-hover:bg-[#06b6d4]/20 transition-all">
 <cap.i size={20} />
 </div>
 <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight transition-colors">{cap.t}</h3>
 <p className="text-slate-500 text-sm font-medium leading-relaxed">{cap.d}</p>
 </motion.div>
 ))}
 </div>

 </div>
 </section>

 </>
 );
}
