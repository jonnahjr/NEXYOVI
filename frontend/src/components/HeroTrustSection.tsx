import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle2, ShieldCheck, Zap, TrendingUp, Cloud, Users, BarChart3, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { viewport } from '../lib/animations';

const checklist = [
 {
   text: "Systems aligned to business KPIs",
   icon: TrendingUp,
   desc: "Every system tied to measurable outcomes — customer LTV, conversion rates, churn reduction, or operational savings.",
 },
 {
   text: "Built for scale, not demos",
   icon: Cloud,
   desc: "Architected for real-world production: 99.9% uptime, auto-scaling, and edge-case resilience from day one.",
 },
 {
   text: "Measurable and defensible ROI",
   icon: BarChart3,
   desc: "Clear metrics, transparent reporting, and documented business impact you can take to leadership.",
 },
 {
   text: "Production-ready from day one",
   icon: Zap,
   desc: "No research projects masquerading as solutions. Deployed with CI/CD, monitoring, and rollback capabilities.",
 },
 {
   text: "Senior-driven team execution",
   icon: Users,
   desc: "Your project led by engineers who've shipped at Google, Amazon, and enterprise scale — not juniors learning on the job.",
 },
 {
   text: "Built-in live system monitor",
   icon: Activity,
   desc: "Real-time observability into every deployment: latency, throughput, error rates, and system health at a glance.",
 },
];

const staggerCard = {
 hidden: { opacity: 0, y: 30 },
 visible: (i: number) => ({
   opacity: 1,
   y: 0,
   transition: {
     delay: 0.08 + i * 0.07,
     duration: 0.6,
     ease: [0.16, 1, 0.3, 1],
   },
 }),
};

const HeroTrustSection = () => {
 return (
   <>
     {/* ─── CHECKLIST SECTION — Light glass cards ─── */}
     <section className="relative bg-[#f0f0f0] py-28 md:py-36 overflow-hidden border-t border-slate-200">
       {/* Subtle grid pattern */}
       <div
         className="absolute inset-0 opacity-[0.03] pointer-events-none"
         style={{
           backgroundImage:
             'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
           backgroundSize: '48px 48px',
         }}
       />

       <div className="container relative z-10 max-w-[1400px] mx-auto px-6">
         {/* Section label */}
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={viewport}
           className="flex items-center gap-2 mb-6"
         >
           <div className="w-2 h-2 rounded-full bg-slate-900" />
           <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
             Available for New Projects
           </span>
         </motion.div>

         {/* Heading */}
         <motion.h2
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={viewport}
           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
           className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.03em] leading-[1.05] mb-4"
         >
           Ready to build
           <br />
           the{' '}
           <span className="text-slate-400">future?</span>
         </motion.h2>

         {/* Description */}
         <motion.p
           initial={{ opacity: 0, y: 16 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={viewport}
           transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
           className="text-slate-600 text-[16px] leading-relaxed max-w-2xl mb-12 font-medium"
         >
           Let's engineer the next breakthrough for your enterprise — from
           initial scoping to global deployment. We move fast and build to last.
         </motion.p>

         {/* CTA Buttons */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={viewport}
           transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col sm:flex-row gap-4 mb-16"
         >
           <Link
             to="/contact"
             id="cta-start-project"
             className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-[14px] transition-all hover:bg-[#F5A800] hover:scale-105"
           >
             <span className="relative z-10">Start a Project</span>
             <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
           </Link>

           <a
             href="mailto:info@nexyovi.com"
             id="cta-book-call"
             className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-900 font-bold text-[14px] transition-all hover:bg-slate-100 hover:border-slate-300 hover:scale-105"
           >
             <Calendar size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
             Book a Call
           </a>
         </motion.div>

         {/* Checklist Grid — 3 columns on desktop */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {checklist.map((item, i) => {
             const Icon = item.icon;
             return (
               <motion.div
                 key={i}
                 custom={i}
                 variants={staggerCard}
                 initial="hidden"
                 whileInView="visible"
                 viewport={viewport}
                 whileHover={{ y: -4, transition: { duration: 0.2 } }}
                 className="group relative p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200 hover:border-[#F5A800]/40 transition-all duration-300 cursor-pointer"
               >
                 <div className="flex items-start gap-4">
                   {/* Icon */}
                   <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 transition-all duration-300 group-hover:bg-[#F5A800] group-hover:text-white group-hover:border-[#F5A800]">
                     <Icon size={18} strokeWidth={2} />
                   </div>

                   {/* Content */}
                   <div className="flex-1 min-w-0">
                     <h3 className="text-[15px] font-bold text-slate-900 mb-1 tracking-tight group-hover:text-[#F5A800] transition-colors">
                       {item.text}
                     </h3>
                     <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                       {item.desc}
                     </p>
                   </div>
                 </div>

                 {/* Bottom accent line */}
                 <div className="absolute bottom-0 left-6 right-6 h-px bg-slate-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
               </motion.div>
             );
           })}
         </div>

         {/* Trust badge */}
         <motion.div
           initial={{ opacity: 0, y: 16 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={viewport}
           transition={{ delay: 0.6, duration: 0.5 }}
           className="mt-10 p-5 rounded-2xl bg-white/50 border border-slate-200 flex items-start gap-4"
         >
           <ShieldCheck size={20} className="text-slate-400 shrink-0 mt-0.5" />
           <p className="text-slate-600 text-[14px] leading-relaxed font-medium">
             <span className="text-slate-900 font-bold">Enterprise-grade guarantee.</span>{' '}
             Our systems are delivered with full documentation, architectural blueprints, and compliance readiness.
           </p>
         </motion.div>
       </div>
     </section>

     {/* ─── DARK CTA SECTION ─── */}
     <section className="relative bg-[#02040a] py-28 md:py-36 overflow-hidden border-t border-white/5">
       {/* Atmosphere */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#F5A800]/5 rounded-full blur-[120px] pointer-events-none" />

       <div className="container relative z-10 max-w-[1400px] mx-auto px-6">
         <div className="max-w-3xl mx-auto text-center">
           {/* Badge */}
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={viewport}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
           >
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">
               Let's Build Together
             </span>
           </motion.div>

           {/* Heading */}
           <motion.h2
             initial={{ opacity: 0, y: 24 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={viewport}
             transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
             className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-[1.05] mb-6"
           >
             From vision to{' '}
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">
               production
             </span>
             .
           </motion.h2>

           {/* Description */}
           <motion.p
             initial={{ opacity: 0, y: 16 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={viewport}
             transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="text-white/50 text-[16px] leading-relaxed max-w-xl mx-auto mb-10 font-medium"
           >
             Book a no-pressure 45-minute strategy session. We'll review your current setup, identify 2–3 high-impact opportunities, and give you a clear next-step plan — at zero cost or obligation.
           </motion.p>

           {/* Benefit bullets */}
           <motion.div
             initial={{ opacity: 0, y: 16 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={viewport}
             transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
             className="flex flex-wrap items-center justify-center gap-3 mb-10"
           >
             {[
               "AI audit + 2–3 ROI ideas in 45 min",
               "Prioritized roadmap outline, zero cost",
               "Strict NDA, fully confidential",
             ].map((benefit, i) => (
               <div
                 key={i}
                 className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-[13px] font-medium"
               >
                 <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                 {benefit}
               </div>
             ))}
           </motion.div>

           {/* CTA Buttons */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={viewport}
             transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
             className="flex flex-col sm:flex-row items-center justify-center gap-4"
           >
             <Link
               to="/contact"
               className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-[14px] transition-all hover:bg-[#F5A800] hover:scale-105 hover:text-white"
             >
               <span className="relative z-10">Secure Your Strategy Session</span>
               <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
             </Link>

             <a
               href="mailto:info@nexyovi.com"
               className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-[14px] transition-all hover:bg-white/10 hover:border-white/20"
             >
               <Calendar size={16} className="text-white/60 group-hover:text-white transition-colors" />
               Or email us directly
             </a>
           </motion.div>
         </div>
       </div>
     </section>
   </>
 );
};

export default HeroTrustSection;
