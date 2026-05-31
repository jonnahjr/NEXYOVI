import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Code, BrainCircuit, Smartphone, Cloud, BarChart3 } from 'lucide-react';
import { useRef, useState } from 'react';

const cards = [
  {
    icon: Code,
    title: 'Software Development',
    desc: 'Custom web platforms, internal business systems, SaaS products, and enterprise applications built for long-term growth.',
    accent: '#F5A800',
  },
  {
    icon: BrainCircuit,
    title: 'AI & Automation',
    desc: 'AI assistants, workflow automation, LLM integrations, and intelligent systems designed around real business processes.',
    accent: '#8b5cf6',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    desc: 'Modern iOS and Android experiences engineered for performance, usability, and scalability.',
    accent: '#10b981',
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    desc: 'Cloud deployment, server architecture, DevOps, networking, monitoring, and operational reliability.',
    accent: '#3b82f6',
  },
  {
    icon: BarChart3,
    title: 'Data & Analytics',
    desc: 'Transform raw business data into dashboards, reports, insights, and better decisions.',
    accent: '#ec4899',
  },

];

export default function WhyNexyoviSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const slideUp = useTransform(scrollYProgress, [0, 1], [0, -(cards.length - 1) * 100]);
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, cards.length - 1]);

  const imageScaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const imageGlow = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.9]);

  const [currentTitle, setCurrentTitle] = useState(cards[0].title);
  useMotionValueEvent(activeIndex, 'change', (latest) => {
    setCurrentTitle(cards[Math.max(0, Math.min(Math.round(latest), cards.length - 1))].title);
  });

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-[#02040a] border-t border-white/[0.04]">
     <div className="absolute inset-0 z-0">
      <div className="absolute left-[5%] top-[10%] w-[600px] h-[600px] rounded-full bg-[#F5A800]/5 blur-[180px]" />
      <div className="absolute right-[10%] bottom-[10%] w-[500px] h-[500px] rounded-full bg-[#8b5cf6]/4 blur-[160px]" />
     </div>

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
        className="mb-8"
       >
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
         <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#F5A800] animate-ping opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5A800]" />
         </span>
         <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
          Why Growing Businesses Choose Nexyovi
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
         <div style={{ scale: imageScaleRaw }} className="w-full">
          <img
           src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=85&w=800&h=1050"
           alt="Software engineering team at work"
           className="w-full h-auto object-cover aspect-[4/5]"
          />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent pointer-events-none" />
         <div className="absolute inset-0 bg-gradient-to-r from-[#02040a]/30 via-transparent to-transparent pointer-events-none" />

         {/* Active card label overlay */}
         <div className="absolute bottom-6 left-6 right-6 z-10">
          <div className="px-4 py-3 rounded-2xl border border-white/[0.08] bg-[#0a0a0e]/70 backdrop-blur-xl">
           <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
             <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 animate-ping opacity-75" />
             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
             <span className="text-[11px] text-white/50 font-medium block">
             {currentTitle}
            </span>
           </div>
          </div>
         </div>


        </motion.div>

       {/* Right: Cards container — slides up */}
       <div className="relative overflow-hidden h-[420px]">
        <motion.div className="absolute inset-0 space-y-6" style={{ y: slideUp }}>
         {cards.map((card, i) => {
          const Icon = card.icon;
          const cardOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
          return (
           <motion.div
            key={card.title}
            className="group relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 transition-all duration-500 hover:border-white/[0.12]"
            style={{ opacity: cardOpacity }}
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
           </motion.div>
          );
         })}
        </motion.div>
       </div>
      </div>

     {/* Bottom fade */}
     <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#02040a] to-transparent pointer-events-none z-20" />
    </div>
   </div>
  </section>
 );
}
