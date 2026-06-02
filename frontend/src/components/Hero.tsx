import { motion } from 'framer-motion';
import { ArrowRight, Activity, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE_EXPO, staggerContainer } from '../lib/animations';
import ethio from '../assets/ethio_transparent.png';
import cbe from '../assets/cbe_transparent.png';
import zemen from '../assets/zemen-bank-logo_transparent.png';
import insa from '../assets/Insa-09_transparent.png';
import global from '../assets/global_transparent.png';
import aau from '../assets/aau-02_transparent.png';
import aastu from '../assets/aastu-01_transparent.png';
import bdu from '../assets/bdu-05.png';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4';

const clients = [
  { name: 'Ethio Telecom', logo: ethio },
  { name: 'Commercial Bank of Ethiopia', logo: cbe },
  { name: 'Zemen Bank', logo: zemen },
  { name: 'INSA', logo: insa },
  { name: 'Global Bank', logo: global },
  { name: 'Addis Ababa University', logo: aau },
  { name: 'AASTU', logo: aastu },
  { name: 'Bahir Dar University', logo: bdu },
];

const Hero = () => {
  return (
    <section className="relative bg-[#02040a] overflow-hidden">
      {/* ── Video background (covers full Hero) ── */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* ── Content ── */}
      <div className="relative z-10">

        {/* ════════════════════════════════════════ */}
        {/* Hero Headline + CTAs + Trusted Logos */}
        {/* ════════════════════════════════════════ */}
        <div className="min-h-screen flex flex-col justify-end pb-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="px-8 sm:px-16 md:px-24 lg:px-32 pt-32"
          >
            <div className="max-w-[640px]">
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: EASE_EXPO as any } } }}
                className="text-[56px] md:text-[76px] lg:text-[88px] font-black text-white tracking-[-0.04em] leading-[0.95] mb-10"
              >
                Build Better <br />
                Software. <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">Faster.</span>
              </motion.h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.3, ease: EASE_EXPO as any } } }}
                className="text-[18px] md:text-[20px] text-white/80 font-medium leading-[1.8] mb-16 max-w-[560px]"
              >
                We design and develop custom software, AI solutions, web platforms, mobile applications, and modern IT infrastructure for growing businesses.
              </motion.p>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4, ease: EASE_EXPO as any } } }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link to="/contact" id="hero-cta-start-project" className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold text-[16px] transition-all hover:scale-105">
                  Start a Project
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/portfolio" id="hero-cta-view-work" className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white/10 border border-white/15 text-white font-bold text-[16px] transition-all hover:bg-white/15 hover:border-white/25">
                  View Our Work
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats & Companies on the right ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: EASE_EXPO }}
        className="absolute right-8 lg:right-16 xl:right-24 2xl:right-32 bottom-24 hidden lg:flex flex-col items-end gap-6 z-20"
      >
        <div className="flex flex-row items-center gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
          {[
            { icon: <Activity size={20} className="text-black" />, label: '24/7', sub: 'Monitoring' },
            { icon: <Shield size={20} className="text-black fill-black" />, label: 'Security-first', sub: 'Engineering' },
            { icon: <Globe size={20} className="text-black" />, label: 'Global', sub: 'Operations' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + i * 0.15, duration: 0.6, ease: EASE_EXPO }}
              className="flex items-center gap-3 cursor-default shrink-0"
            >
              <span className="flex items-center justify-center">{item.icon}</span>
              <div className="flex flex-col">
                <span className="text-sm font-black text-black leading-none mb-0.5">{item.label}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-black">{item.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>

      {/* ── Bottom gradient fade to content below ── */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#02040a] via-[#02040a]/60 to-transparent z-[5] pointer-events-none" />

    </section>
  );
};

export default Hero;
