import { motion } from 'framer-motion';
import { Ban, Clock, MessageCircle, ShieldOff, Zap, Users, ShieldCheck, ArrowRight } from 'lucide-react';

const comparisons = [
 {
  problem: { icon: Clock, label: 'Slow vendors', desc: 'Projects drag on for months with no end in sight' },
  solution: { icon: Zap, label: 'Faster delivery', desc: 'Agile execution that ships in weeks, not quarters' },
 },
 {
  problem: { icon: MessageCircle, label: 'Poor communication', desc: 'Left in the dark with infrequent updates' },
  solution: { icon: Users, label: 'Senior engineers', desc: 'Principal-level talent on every engagement' },
 },
 {
  problem: { icon: ShieldOff, label: 'Security concerns', desc: 'Unknown practices and compliance gaps' },
  solution: { icon: ShieldCheck, label: 'Security-first architecture', desc: 'Built with zero trust, encryption, and compliance guardrails from day one' },
 },
];

const containerVariants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.15 } },
};

const rowVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function WhySwitchSection() {
 return (
  <section className="relative py-28 bg-[#02040a] border-t border-white/[0.04] overflow-hidden">
   <div className="absolute inset-0 z-0">
    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[160px]" />
    <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[160px]" />
   </div>

   <div className="container max-w-5xl mx-auto relative z-10 px-6">
    {/* Header */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5 }}
     className="text-center mb-16"
    >
     <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
      <span className="w-2 h-2 rounded-full bg-[#F5A800] animate-pulse" />
      <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-[0.2em]">Why Switch</span>
     </div>
     <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
      Why companies choose{' '}
      <span className="bg-gradient-to-r from-[#F5A800] to-amber-400 bg-clip-text text-transparent">Nexyovi</span>
     </h2>
     <p className="mt-4 text-lg text-white/40 max-w-xl mx-auto">
      The old way of working is failing. Here's what's changing—and why.
     </p>
    </motion.div>

    {/* Column headers */}
    <div className="hidden md:grid grid-cols-12 gap-4 mb-8 px-2">
     <div className="col-span-5 flex items-center gap-2">
      <Ban size={12} className="text-red-400" />
      <span className="text-xs font-black uppercase tracking-[0.2em] text-red-400/70">The Old Way</span>
     </div>
     <div className="col-span-2 text-center" />
     <div className="col-span-5 flex items-center gap-2 justify-end">
      <ArrowRight size={12} className="text-emerald-400" />
      <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400/70">The Nexyovi Way</span>
     </div>
    </div>

    {/* Comparison rows */}
    <motion.div
     variants={containerVariants}
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true, margin: '-60px' }}
     className="space-y-4"
    >
     {comparisons.map((pair, i) => {
      const ProblemIcon = pair.problem.icon;
      const SolutionIcon = pair.solution.icon;
      return (
       <motion.div
        key={i}
        variants={rowVariants}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch"
       >
        {/* Problem */}
        <div className="col-span-5 group relative overflow-hidden rounded-[20px] border border-red-500/10 bg-red-500/[0.03] p-5 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/[0.06]">
         <div className="relative z-10 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
           <ProblemIcon size={16} className="text-red-400" />
          </div>
          <div>
           <div className="font-bold text-white text-sm">{pair.problem.label}</div>
           <div className="text-xs text-white/40 mt-0.5">{pair.problem.desc}</div>
          </div>
         </div>
         <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-red-500/5 blur-2xl pointer-events-none" />
        </div>

        {/* VS */}
        <div className="col-span-2 flex items-center justify-center">
         <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center">
          <span className="text-[10px] font-black text-white/40">VS</span>
         </div>
        </div>

        {/* Solution */}
        <div className="col-span-5 group relative overflow-hidden rounded-[20px] border border-emerald-500/10 bg-emerald-500/[0.03] p-5 transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/[0.06]">
         <div className="relative z-10 flex items-start gap-3 justify-end text-right">
          <div className="order-2 w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
           <SolutionIcon size={16} className="text-emerald-400" />
          </div>
          <div className="order-1">
           <div className="font-bold text-white text-sm">{pair.solution.label}</div>
           <div className="text-xs text-white/40 mt-0.5">{pair.solution.desc}</div>
          </div>
         </div>
         <div className="absolute -left-4 -bottom-4 w-20 h-20 rounded-full bg-emerald-500/5 blur-2xl pointer-events-none" />
        </div>
       </motion.div>
      );
     })}
    </motion.div>
   </div>
  </section>
 );
}
