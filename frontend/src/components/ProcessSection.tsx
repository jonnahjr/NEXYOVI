import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';

const steps = [
 { num: '01', label: 'Discovery', desc: 'We learn your business, goals, and technical landscape before writing a single line of code.', emoji: '🔍' },
 { num: '02', label: 'Planning', desc: 'We map out architecture, milestones, and timelines tied to your specific KPIs and deadlines.', emoji: '📋' },
 { num: '03', label: 'Design', desc: 'We craft the UX, interface, and system blueprint with production-scale thinking from day one.', emoji: '🎨' },
 { num: '04', label: 'Development', desc: 'We build in agile sprints with continuous delivery — real code, real data, real progress.', emoji: '⚡' },
 { num: '05', label: 'Testing', desc: 'We validate quality, security, and performance against real-world edge cases and traffic patterns.', emoji: '✅' },
 { num: '06', label: 'Deployment', desc: 'We ship to production with zero-downtime cutover, monitoring, and rollback procedures in place.', emoji: '🚀' },
];

export default function ProcessSection() {
 const sectionRef = useRef<HTMLDivElement>(null);

 const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ['start start', 'end end'],
 });

 const activeIndex = useTransform(scrollYProgress, [0, 1], [0, steps.length - 1]);

 const [currentStep, setCurrentStep] = useState(steps[0]);
 useMotionValueEvent(activeIndex, 'change', (latest) => {
  setCurrentStep(steps[Math.max(0, Math.min(Math.round(latest), steps.length - 1))]);
 });

 const cardsContainerRef = useRef<HTMLDivElement>(null);
 const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

 const computeOpacity = useCallback((progress: number, index: number) => {
  const mid = index / steps.length;
  const half = 0.5 / steps.length;
  const d = Math.abs(progress - mid);
  return d > half ? 0.3 : 1 - 0.7 * (d / half);
 }, []);

 const computeScale = useCallback((progress: number, index: number) => {
  const mid = index / steps.length;
  const half = 0.5 / steps.length;
  const d = Math.abs(progress - mid);
  return d > half ? 0.92 : 1 - 0.08 * (d / half);
 }, []);

 const leftScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

 useMotionValueEvent(scrollYProgress, 'change', (v) => {
  if (cardsContainerRef.current) {
   cardsContainerRef.current.style.transform = `translateY(${-v * (steps.length - 1) * 460}px)`;
  }
  steps.forEach((_, i) => {
   const el = cardRefs.current[i];
   if (el) {
    el.style.opacity = String(computeOpacity(v, i));
    el.style.transform = `scale(${computeScale(v, i)})`;
   }
  });
 });

 return (
  <section ref={sectionRef} className="relative h-[600vh] bg-[#02040a] border-t border-white/[0.04]">
   {/* Orb backgrounds */}
   <div className="absolute inset-0 z-0">
    <div className="absolute left-[5%] top-[10%] w-[600px] h-[600px] rounded-full bg-[#8b5cf6]/5 blur-[180px]" />
    <div className="absolute right-[10%] bottom-[10%] w-[500px] h-[500px] rounded-full bg-[#F5A800]/4 blur-[160px]" />
   </div>

   {/* Dot grid overlay */}
   <div
    className="absolute inset-0 z-0 opacity-[0.015]"
    style={{
     backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 0.5px, transparent 0.5px)',
     backgroundSize: '28px 28px',
    }}
   />

   <div className="sticky top-0 h-screen overflow-hidden">
    <div className="container max-w-6xl mx-auto relative z-10 px-6 h-full flex flex-col justify-center">
     {/* Section label */}
     <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-10"
     >
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
       <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#8b5cf6] animate-ping opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8b5cf6]" />
       </span>
       <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
        Our Process
       </span>
      </div>
     </motion.div>

     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center flex-1 min-h-0">
      {/* Left: Active step visual */}
      <motion.div
       className="relative flex flex-col items-center justify-center h-full py-12"
       style={{ scale: leftScale }}
      >
       {/* Large emoji */}
       <motion.div
        key={currentStep.emoji}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="text-[120px] md:text-[160px] leading-none mb-6"
       >
        {currentStep.emoji}
       </motion.div>

       {/* Step number */}
       <motion.div
        key={currentStep.num}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="text-[64px] md:text-[80px] font-black text-white/10 leading-none tracking-tighter mb-4"
       >
        {currentStep.num}
       </motion.div>

       {/* Step label */}
       <motion.div
        key={currentStep.label}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="text-center"
       >
        <h3 className="text-[28px] md:text-[36px] font-black text-white tracking-tight leading-tight">
         {currentStep.label}
        </h3>
        <p className="text-white/40 text-[15px] leading-relaxed mt-3 max-w-sm mx-auto">
         {currentStep.desc}
        </p>
       </motion.div>

       {/* Step indicator dots */}
       <div className="flex items-center gap-2 mt-8">
        {steps.map((s, i) => {
         const isActive = s.num === currentStep.num;
         return (
          <div
           key={s.num}
           className={`rounded-full transition-all duration-500 ${
            isActive ? 'w-8 h-2 bg-[#8b5cf6]' : 'w-2 h-2 bg-white/[0.12]'
           }`}
          />
         );
        })}
       </div>
      </motion.div>

      {/* Right: Cards container */}
      <div className="relative overflow-hidden h-[420px]">
       <div ref={cardsContainerRef} className="absolute inset-0 space-y-6">
        {steps.map((step, i) => (
         <div
          key={step.num}
          ref={(el) => { cardRefs.current[i] = el; }}
          className="group relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 transition-all duration-500 hover:border-white/[0.12]"
         >
          <div
           className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
           style={{ background: `radial-gradient(600px circle at 30% 50%, ${i < 2 ? '#8b5cf6' : i < 4 ? '#F5A800' : '#10b981'}12, transparent 60%)` }}
          />

          <div className="relative z-10 space-y-5">
           <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[16px] flex items-center justify-center text-2xl bg-white/[0.04] border border-white/[0.06]">
             {step.emoji}
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20">
             {step.num}
            </span>
           </div>

           <div>
            <h3 className="text-[28px] md:text-[32px] font-black text-white tracking-[-0.02em] leading-[1.1] mb-4">
             {step.label}
            </h3>
            <p className="text-white/40 text-[15px] leading-relaxed max-w-lg">
             {step.desc}
            </p>
           </div>

           <div className="flex items-center gap-3 pt-2">
            <div className="h-[2px] flex-1 max-w-[60px] rounded-full transition-all duration-500 group-hover:max-w-[100px] bg-white/20" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white/40">
             Current phase
            </span>
           </div>
          </div>
         </div>
        ))}
       </div>
      </div>
     </div>

     {/* Bottom fade */}
     <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#02040a] to-transparent pointer-events-none z-20" />
    </div>
   </div>
  </section>
 );
}
