import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Target, Gauge, Brain, Handshake } from 'lucide-react';
import { useRef } from 'react';

const cards = [
 {
  icon: Target,
  title: 'Business-Focused Development',
  desc: 'Every project starts with business goals, not technology trends.',
  accent: '#F5A800',
 },
 {
  icon: Gauge,
  title: 'Built For Real Usage',
  desc: 'Production-ready software designed for real customers and daily operations.',
  accent: '#8b5cf6',
 },
 {
  icon: Brain,
  title: 'AI With Practical Impact',
  desc: 'Automation and AI solutions that reduce workload and improve efficiency.',
  accent: '#10b981',
 },
 {
  icon: Handshake,
  title: 'Long-Term Partnership',
  desc: 'Support, maintenance, improvements, and growth after launch.',
  accent: '#3b82f6',
 },
];

function computeOpacity(progress: number, index: number) {
 const mid = index / cards.length;
 const half = 0.5 / cards.length;
 const d = Math.abs(progress - mid);
 return d > half ? 0.3 : 1 - 0.7 * (d / half);
}

function computeScale(progress: number, index: number) {
 const mid = index / cards.length;
 const half = 0.5 / cards.length;
 const d = Math.abs(progress - mid);
 return d > half ? 0.92 : 1 - 0.08 * (d / half);
}

export default function WhyNexyoviSection() {
 const sectionRef = useRef<HTMLDivElement>(null);
 const cardsContainerRef = useRef<HTMLDivElement>(null);
 const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

 const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ['start start', 'end end'],
 });

 const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
 const imageGlow = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.9]);

 useMotionValueEvent(scrollYProgress, 'change', (v) => {
  if (cardsContainerRef.current) {
   cardsContainerRef.current.style.transform = `translateY(${-v * (cards.length - 1) * 460}px)`;
  }
  cards.forEach((_, i) => {
   const el = cardRefs.current[i];
   if (el) {
    el.style.opacity = String(computeOpacity(v, i));
    el.style.transform = `scale(${computeScale(v, i)})`;
   }
  });
 });

 return (
  <section ref={sectionRef} className="relative h-[200vh] bg-[#02040a] border-t border-white/[0.04]">
   <div className="absolute inset-0 z-0">
    <div className="absolute left-[5%] top-[10%] w-[600px] h-[600px] rounded-full bg-[#F5A800]/5 blur-[180px]" />
    <div className="absolute right-[10%] bottom-[10%] w-[500px] h-[500px] rounded-full bg-[#8b5cf6]/4 blur-[160px]" />
   </div>

   <div className="absolute inset-0 z-0 opacity-[0.015]" style={{
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 0.5px, transparent 0.5px)',
    backgroundSize: '28px 28px',
   }} />

   <div className="sticky top-0 h-screen overflow-hidden">
    <div className="container max-w-6xl mx-auto relative z-10 px-6 h-full flex flex-col justify-center">

     {/* Section label */}
     <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8"
     >
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
       <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#F5A800] animate-ping opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5A800]" />
       </span>
       <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
        Why Businesses Work With Nexyovi
       </span>
      </div>
     </motion.div>

     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center flex-1 min-h-0">

      {/* Left: Sticky Image */}
      <motion.div className="relative w-full overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0a0a0e]">
       <motion.div
        className="absolute -inset-4 rounded-[32px] pointer-events-none"
        style={{
         background: 'radial-gradient(circle at 50% 50%, #F5A800, transparent 60%)',
         opacity: imageGlow,
         filter: 'blur(40px)',
        }}
       />
       <div style={{ scale: imageScale }} className="w-full">
        <img
         src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=85&w=800&h=1050"
         alt="Software engineering team at work"
         className="w-full h-auto object-cover aspect-[4/5]"
        />
       </div>
       <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent pointer-events-none" />
       <div className="absolute inset-0 bg-gradient-to-r from-[#02040a]/30 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Right: Cards container — slides up */}
      <div className="relative overflow-hidden h-[420px]">
       <div ref={cardsContainerRef} className="absolute inset-0 space-y-6">
        {cards.map((card, i) => {
         const Icon = card.icon;
         return (
          <div
           key={card.title}
           ref={(el) => { cardRefs.current[i] = el; }}
           className="group relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 transition-all duration-500 hover:border-white/[0.12]"
          >
           <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: `radial-gradient(600px circle at 30% 50%, ${card.accent}12, transparent 60%)` }}
           />

           <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-4">
             <div
              className="w-12 h-12 rounded-[14px] flex items-center justify-center border transition-all duration-500"
              style={{ backgroundColor: `${card.accent}10`, borderColor: `${card.accent}25` }}
             >
              <Icon size={20} style={{ color: card.accent }} />
             </div>
             <span className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: `${card.accent}60` }}>
              0{i + 1}
             </span>
            </div>

            <div>
             <h3 className="text-[28px] md:text-[32px] font-black text-white tracking-[-0.02em] leading-[1.1] mb-4">
              {card.title}
             </h3>
             <p className="text-white/40 text-[15px] leading-relaxed max-w-lg">
              {card.desc}
             </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
             <div className="h-[2px] flex-1 max-w-[60px] rounded-full transition-all duration-500 group-hover:max-w-[100px]" style={{ backgroundColor: card.accent }} />
             <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ color: `${card.accent}80` }}>
              Learn more
             </span>
            </div>
           </div>
          </div>
         );
        })}
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
