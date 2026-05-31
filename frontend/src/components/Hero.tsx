import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { EASE_EXPO, staggerContainer } from '../lib/animations';
import heroVideo from '../assets/video_2026-05-30_13-07-57.mp4';

const Hero = () => {
 const containerRef = useRef<HTMLElement>(null);
 const { scrollY } = useScroll();

 const contentY = useTransform(scrollY, [0, 700], [0, -80]);
 const opacity = useTransform(scrollY, [0, 500], [1, 0]);

 return (
 <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#02040a] pt-20 pb-40">

 {/* ── Background atmosphere ── */}
 <div className="absolute inset-0 z-0 pointer-events-none">
  <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#F5A800]/10 rounded-full blur-[160px]" />
  <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/8 rounded-full blur-[140px]" />
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-[#02040a] to-transparent opacity-60" />
 </div>

 {/* ── Bottom fade ── */}
 <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent z-10 pointer-events-none" />

 {/* ── Main Content: Split Layout ── */}
 <motion.div style={{ y: contentY, opacity }} className="container relative z-20 w-full px-6 lg:px-24">
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20 items-center min-h-[70vh]">

   {/* ── Left: Text Content ── */}
   <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    className="lg:col-span-2 lg:pr-4 max-w-[640px]"
   >
    {/* Headline */}
    <motion.h1
     variants={{ hidden: { opacity: 0, scale: 0.9, filter: 'blur(10px)' }, visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] } } }}
     className="text-[42px] md:text-[58px] lg:text-[68px] font-black text-white tracking-[-0.04em] leading-[1.0] mb-8"
    >
     We build the AI <br />
     your team <br />
     <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">actually trusts.</span>
    </motion.h1>

    {/* Subheadline */}
    <motion.p
     variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.2, ease: EASE_EXPO } } }}
     className="text-[17px] md:text-[19px] text-white/60 font-medium leading-[1.7] mb-12 max-w-[540px]"
    >
     No black boxes. No hallucinated answers. Just verified intelligence pulled from the tools you already use.
    </motion.p>

    {/* CTA Buttons */}
    <motion.div
     variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: EASE_EXPO } } }}
     className="flex flex-wrap items-center gap-4"
    >
     <Link to="/contact" id="hero-cta-start-project" className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-[15px] transition-all hover:scale-105">
      Get started
      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
     </Link>
     <Link to="/company" id="hero-cta-capabilities" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold text-[15px] transition-all hover:bg-white/10 hover:border-white/20">
      See our story
     </Link>
    </motion.div>
   </motion.div>

   {/* ── Right: Video Showcase Card ── */}
   <motion.div
    initial={{ opacity: 0, x: 60 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    className="relative lg:col-span-3 lg:pl-4"
   >
    {/* Glow behind the card */}
    <div className="absolute -inset-8 bg-[#F5A800]/20 rounded-[32px] blur-[60px] opacity-60" />

    {/* Card frame — borderless, smooth */}
    <div className="relative rounded-[24px] overflow-hidden bg-[#02040a]/20 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
     {/* Video */}
     <video
      autoPlay
      muted
      loop
      playsInline
      className="w-full aspect-[16/9] object-cover"
      style={{ filter: 'contrast(1.1) brightness(1.04) saturate(1.08)', transform: 'translate3d(0,0,0)', willChange: 'transform', backfaceVisibility: 'hidden' }}
     >
      <source src={heroVideo} type="video/mp4" />
     </video>
    </div>
   </motion.div>

  </div>
 </motion.div>

 </section>
 );
};

export default Hero;
