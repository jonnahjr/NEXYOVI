import { motion } from 'framer-motion';
import { Activity, ArrowUpRight, BarChart3, Globe } from 'lucide-react';

const Impact = () => {
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
 <Activity size={14} className="text-[#F5A800]" />
 <span className="text-[#9CA3AF] text-xs font-black uppercase tracking-widest">Our Impact</span>
 </motion.div>

 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
 >
 Metrics that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Matter.</span>
 </motion.h1>

 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-[#9CA3AF] text-lg max-w-2xl mx-auto"
 >
 We measure our success entirely by the quantifiable improvements we deliver to our clients' operations, security, and bottom line.
 </motion.p>
 </div>
 </section>

 <section className="container mx-auto px-6 max-w-5xl">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {[
 {
 metric: "40%",
 label: "Average Cost Reduction",
 desc: "In cloud infrastructure spend for our enterprise clients via optimized architectures.",
 icon: BarChart3
 },
 {
metric: "Enterprise-grade",
  label: "Uptime Achieved",
  desc: "Across all Nexyovi-managed systems, ensuring critical system availability.",
 icon: ArrowUpRight
 },
 {
 metric: "50M+",
 label: "End Users Reached",
 desc: "Interacting securely with systems and platforms engineered by our teams.",
 icon: Globe
 }
 ].map((stat, i) => {
 const Icon = stat.icon;
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 + (i * 0.1) }}
 className="p-8 rounded-2xl bg-[#111827]/60 border border-white/[0.06]"
 >
 <div className="w-12 h-12 rounded-xl bg-[#F5A800]/10 flex items-center justify-center text-[#F5A800] mb-6">
 <Icon size={24} />
 </div>
 <h3 className="text-4xl font-black text-white mb-2">{stat.metric}</h3>
 <h4 className="text-sm font-bold text-white mb-3">{stat.label}</h4>
 <p className="text-[#9CA3AF] text-sm leading-relaxed">{stat.desc}</p>
 </motion.div>
 );
 })}
 </div>
 </section>
 </div>
 );
};

export default Impact;
