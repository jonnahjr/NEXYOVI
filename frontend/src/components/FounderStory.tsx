import { motion } from 'framer-motion';
import { useRef } from 'react';
import yonasImg from '../assets/yonas.jpg';

export default function FounderStory() {
 const sectionRef = useRef<HTMLElement>(null);

 return (
  <section ref={sectionRef} className="relative bg-[#02040a] py-28 border-t border-white/[0.04] overflow-hidden">

   {/* Orb backgrounds */}
   <div className="absolute inset-0 z-0">
    <div className="absolute left-1/4 top-1/4 w-[500px] h-[500px] rounded-full bg-[#F5A800]/4 blur-[160px]" />
    <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[400px] rounded-full bg-[#8b5cf6]/3 blur-[140px]" />
   </div>

   {/* Dot grid */}
   <div
    className="absolute inset-0 z-0 opacity-[0.015]"
    style={{
     backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 0.5px, transparent 0.5px)',
     backgroundSize: '28px 28px',
    }}
   />

   <div className="container max-w-6xl mx-auto relative z-10 px-6">

    {/* Section label */}
    <motion.div
     initial={{ opacity: 0, y: 15 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5 }}
     className="mb-16"
    >
     <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.06]">
      <span className="relative flex h-2 w-2">
       <span className="absolute inline-flex h-full w-full rounded-full bg-[#F5A800] animate-ping opacity-75" />
       <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5A800]" />
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Meet The Founder</span>
     </div>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-center">

     {/* Left: Image */}
     <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
     >
      <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 border border-white/[0.08] bg-[#0a0a0e]">
       {/* Glow */}
       <div className="absolute -inset-4 rounded-[32px] pointer-events-none opacity-40" style={{
        background: 'radial-gradient(circle at 50% 50%, #F5A800, transparent 60%)',
        filter: 'blur(40px)',
       }} />
       <img
        src={yonasImg}
        alt="Yonas Bogale – Founder & CEO of Nexyovi"
        className="w-full h-full object-cover object-top relative"
       />
       <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent pointer-events-none" />
       <div className="absolute bottom-5 left-5 right-5">
        <div className="px-4 py-3 rounded-2xl border border-white/[0.08] bg-[#0a0a0e]/70 backdrop-blur-xl">
         <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Founder & CEO</div>
         <div className="text-lg font-black text-white mt-0.5">Yonas Bogale</div>
        </div>
       </div>
      </div>
     </motion.div>

     {/* Right: Content */}
     <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
     >
      <div className="flex items-start gap-6 mb-8">
       <span className="text-[72px] md:text-[96px] font-black text-white/[0.04] leading-none tracking-tighter select-none">7</span>
       <div className="pt-2">
        <h2 className="text-[42px] md:text-[52px] font-black text-white tracking-[-0.03em] leading-[1.05]">
         Yonas Bogale
        </h2>
        <div className="text-[13px] font-bold text-white/30 tracking-[0.2em] uppercase mt-1">Founder & CEO</div>
       </div>
      </div>

      <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8">
       Passionate about building practical technology that helps organizations grow faster, operate smarter, and compete in a digital-first world.
      </p>

      <div className="h-px w-full bg-white/[0.06] my-6" />

      <p className="text-white/40 text-base md:text-lg leading-relaxed">
       Nexyovi was founded to help businesses access modern software engineering, AI capabilities, and digital infrastructure without the complexity of large consulting firms.
      </p>
     </motion.div>

    </div>
   </div>
  </section>
 );
}
