import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { lazy, Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import avatarClarissa from '../assets/avatar_exec2.png';
import { EASE_EXPO, staggerContainer } from '../lib/animations';

const NeuralCanvas = lazy(() => import('./three/NeuralCanvas'));

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const contentY = useTransform(scrollY, [0, 700], [0, -80]);
  const canvasY = useTransform(scrollY, [0, 700], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02040a] pt-20 pb-40">

      {/* ── 3D Neural Canvas (Softened) ── */}
      <motion.div style={{ y: canvasY }} className="absolute inset-0 z-0 opacity-40 mix-blend-screen">
        <Suspense fallback={null}>
          <NeuralCanvas />
        </Suspense>
      </motion.div>

      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Very subtle top gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-[#111111] to-transparent opacity-50" />
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent z-10 pointer-events-none" />

      {/* Talk with Clarissa Floating Widget (Side End) */}
      <motion.a
        href="mailto:clarissa@sanjaya.com"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex absolute right-8 xl:right-16 top-1/3 -translate-y-1/2 items-center gap-4 p-3 pr-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all cursor-pointer group pointer-events-auto z-50"
      >
        <div className="relative shrink-0">
          <img src={avatarClarissa} alt="Clarissa" className="w-14 h-14 rounded-full object-cover border-2 border-[#02040a] shadow-inner" />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#02040a] shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-white font-bold text-[15px] tracking-tight group-hover:text-[#F5A800] transition-colors flex items-center gap-2">
            Talk with Clarissa
          </span>
          <span className="text-white/50 text-[10px] uppercase tracking-[0.15em] font-medium mt-0.5">
            Director of Sanjaya
          </span>
        </div>
        <div className="ml-2 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#F5A800]/20 group-hover:text-[#F5A800] transition-colors">
          <Phone size={16} className="text-white/50 group-hover:text-[#F5A800]" />
        </div>
      </motion.a>

      {/* Mobile Clarissa Widget (Bottom floating) */}
      <motion.a
        href="mailto:clarissa@sanjaya.com"
        className="flex lg:hidden fixed bottom-6 right-6 items-center justify-center p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 pointer-events-auto"
      >
        <div className="relative shrink-0">
          <img src={avatarClarissa} alt="Clarissa" className="w-12 h-12 rounded-full object-cover shadow-inner" />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#02040a]" />
        </div>
      </motion.a>

      {/* ── Main Content ── */}
      <motion.div style={{ y: contentY, opacity }} className="container relative z-20 w-full flex flex-col items-center">
        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F5A800]/15 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative max-w-[900px] flex flex-col items-center text-center mt-12"
        >

          {/* Headline */}
          <motion.h1
            variants={{ hidden: { opacity: 0, scale: 0.9, filter: 'blur(10px)' }, visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] } } }}
            className="text-[52px] md:text-[80px] lg:text-[100px] font-black text-white tracking-[-0.04em] leading-[0.9] mb-8 relative z-10"
          >
            We build the AI <br className="hidden md:block" />
            your team <br className="hidden lg:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">actually trusts.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.2, ease: EASE_EXPO } } }}
            className="text-[18px] md:text-[22px] text-white/60 font-medium leading-relaxed mb-12 max-w-[600px] relative z-10"
          >
            No black boxes. No hallucinated answers. Just verified intelligence pulled from the tools you already use.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: EASE_EXPO } } }}
            className="flex flex-wrap items-center justify-center gap-4 relative z-10 w-full"
          >
            <Link to="/contact" id="hero-cta-start-project" className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-[15px] transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(245,168,0,0.4)]">
              Get started
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link to="/company" id="hero-cta-capabilities" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold text-[15px] transition-all hover:bg-white/10 hover:border-white/20">
              See our story
            </Link>
          </motion.div>

        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
