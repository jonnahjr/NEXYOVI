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
  solution: { icon: ShieldCheck, label: 'Security-first architecture', desc: 'Built with modern security, encryption, and compliance guardrails from day one' },
 },
];

const containerVariants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.15 } },
};

const rowVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function WhySwitchSection() {
 return (
  <section className="relative py-40 bg-[rgba(0,0,0,0.4)] overflow-hidden">

   <div className="absolute inset-0 z-0">
    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-500/10 blur-[160px]" />
    <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[160px]" />
   </div>

   <div className="container max-w-5xl mx-auto relative z-10 px-6">
    {/* Header */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5 }}
     className="text-center mb-20"
    >
     <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-6">
      <span className="w-2 h-2 rounded-full bg-[#F5A800] animate-pulse" />
      <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-[0.2em]">Why Switch</span>
     </div>
     <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-[-0.03em] leading-[0.95]">
      Why companies choose{' '}
      <span className="bg-gradient-to-r from-[#F5A800] to-amber-500 bg-clip-text text-transparent">Nexyovi</span>
     </h2>
     <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto font-medium leading-relaxed">
      The old way of working is failing. Here's what's changing—and why.
     </p>
    </motion.div>

    {/* Column headers */}
    <div className="hidden md:grid grid-cols-12 gap-4 mb-8 px-2">
     <div className="col-span-5 flex items-center gap-2">
      <Ban size={12} className="text-red-500" />
      <span className="text-sm font-black uppercase tracking-[0.2em] text-red-600/80">The Old Way</span>
     </div>
     <div className="col-span-2 text-center" />
     <div className="col-span-5 flex items-center gap-2 justify-end">
      <ArrowRight size={12} className="text-emerald-500" />
      <span className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600/80">The Nexyovi Way</span>
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
        <div className="col-span-5 group relative overflow-hidden rounded-[20px] border border-red-200 bg-white shadow-lg p-5 transition-all duration-300 hover:shadow-xl hover:border-red-300">
         <div className="relative z-10 flex items-start gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-[#030303] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden shadow-sm group-hover:border-red-500/40 transition-all duration-300">
           <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
           <ProblemIcon size={16} className="text-zinc-400 group-hover:text-red-400 transition-colors relative z-10" />
          </div>
          <div>
           <div className="font-bold text-gray-900 text-sm">{pair.problem.label}</div>
           <div className="text-xs text-gray-500 mt-0.5 font-medium">{pair.problem.desc}</div>
          </div>
         </div>
         <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-red-500/5 blur-2xl pointer-events-none" />
        </div>

        {/* VS */}
        <div className="col-span-2 flex items-center justify-center">
         <div className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center">
          <span className="text-[10px] font-black text-gray-400">VS</span>
         </div>
        </div>

        {/* Solution */}
        <div className="col-span-5 group relative overflow-hidden rounded-[20px] border border-emerald-200 bg-white shadow-lg p-5 transition-all duration-300 hover:shadow-xl hover:border-emerald-300">
         <div className="relative z-10 flex items-start gap-3 justify-end text-right">
          <div className="order-2 relative w-10 h-10 rounded-xl bg-[#030303] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden shadow-sm group-hover:border-emerald-500/40 transition-all duration-300">
           <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
           <SolutionIcon size={16} className="text-zinc-400 group-hover:text-emerald-400 transition-colors relative z-10" />
          </div>
          <div className="order-1">
           <div className="font-bold text-gray-900 text-sm">{pair.solution.label}</div>
           <div className="text-xs text-gray-500 mt-0.5 font-medium">{pair.solution.desc}</div>
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
