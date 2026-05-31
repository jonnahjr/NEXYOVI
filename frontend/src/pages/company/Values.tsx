import { motion } from 'framer-motion';
import { Code, Heart, ShieldCheck, Zap } from 'lucide-react';

const Values = () => {
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
 <Heart size={14} className="text-[#F5A800]" />
 <span className="text-[#9CA3AF] text-xs font-black uppercase tracking-widest">Our Values</span>
 </motion.div>

 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
 >
 Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Principles.</span>
 </motion.h1>

 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-[#9CA3AF] text-lg max-w-2xl mx-auto"
 >
 These are the uncompromising standards that guide our engineering, shape our culture, and define every partnership we build.
 </motion.p>
 </div>
 </section>

 <section className="container mx-auto px-6 max-w-6xl">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {[
 {
 icon: Code,
 title: "Engineering Excellence",
 desc: "We don't settle for 'good enough'. We build robust, elegant, and highly scalable solutions that stand the test of time."
 },
 {
 icon: ShieldCheck,
 title: "Uncompromising Security",
 desc: "Trust is our currency. Security and compliance are built into our architecture from line zero, never bolted on as an afterthought."
 },
 {
 icon: Zap,
 title: "Bias for Action",
 desc: "We move fast, iterate quickly, and deliver tangible value. We prefer working code over endless theoretical planning."
 },
 {
 icon: Heart,
 title: "Client Obsession",
 desc: "Your success is our success. We embed ourselves in your challenges and engineer solutions that directly drive your business goals."
 }
 ].map((val, i) => {
 const Icon = val.icon;
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 + (i * 0.1) }}
 className="p-8 rounded-2xl bg-[#111827]/60 border border-white/[0.06] hover:border-[#F5A800]/30 transition-all flex gap-6 items-start"
 >
 <div className="shrink-0 w-12 h-12 rounded-xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center text-[#F5A800]">
 <Icon size={24} />
 </div>
 <div>
 <h3 className="text-xl font-black text-white mb-2">{val.title}</h3>
 <p className="text-[#9CA3AF] text-sm leading-relaxed">{val.desc}</p>
 </div>
 </motion.div>
 );
 })}
 </div>
 </section>
 </div>
 );
};

export default Values;
