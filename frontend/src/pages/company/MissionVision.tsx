import { motion } from 'framer-motion';
import { Compass, Globe, Target } from 'lucide-react';

const MissionVision = () => {
 return (
 <div className="bg-slate-50 min-h-screen pt-32 pb-24 theme-light">
 <section className="relative px-6 mb-20 overflow-hidden">
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#F5A800]/10 blur-[120px] rounded-full pointer-events-none" />

 <div className="container mx-auto max-w-4xl text-center relative z-10">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
 >
 <Target size={14} className="text-[#F5A800]" />
 <span className="text-[#9CA3AF] text-xs font-black uppercase tracking-widest">Mission & Vision</span>
 </motion.div>

 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
 >
 Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">the Future.</span>
 </motion.h1>

 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-[#9CA3AF] text-lg max-w-2xl mx-auto"
 >
 We build the critical infrastructure that empowers organizations to operate at scale, innovate continuously, and solve the world's most complex challenges.
 </motion.p>
 </div>
 </section>

 <section className="container mx-auto px-6 max-w-5xl">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 }}
 className="p-10 rounded-3xl bg-[#111827]/60 border border-white/[0.06] relative overflow-hidden"
 >
 <div className="absolute top-0 right-0 p-8 opacity-5">
 <Compass size={120} />
 </div>
 <h3 className="text-2xl font-black text-white mb-4 relative z-10">Our Mission</h3>
 <p className="text-[#9CA3AF] leading-relaxed relative z-10">
 To democratize access to enterprise-grade engineering by delivering scalable, secure, and intelligent systems that eliminate technical debt and accelerate growth for businesses worldwide.
 </p>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.4 }}
 className="p-10 rounded-3xl bg-[#111827]/60 border border-white/[0.06] relative overflow-hidden"
 >
 <div className="absolute top-0 right-0 p-8 opacity-5">
 <Globe size={120} />
 </div>
 <h3 className="text-2xl font-black text-white mb-4 relative z-10">Our Vision</h3>
 <p className="text-[#9CA3AF] leading-relaxed relative z-10">
 To be the fundamental technology layer powering the next century of digital innovation, where seamless, robust software infrastructure is treated as a basic utility for every enterprise.
 </p>
 </motion.div>
 </div>
 </section>
 </div>
 );
};

export default MissionVision;
