import { motion } from 'framer-motion';
import { BrainCircuit, Globe, MonitorSmartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE_EXPO, staggerContainer } from '../lib/animations';
import { CTAButton } from './CTAButton';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4';

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
        <div className="absolute inset-0 bg-black/50" />
      </div>
      {/* ── Content ── */}
      <div className="relative z-10">

        {/* ════════════════════════════════════════ */}
        {/* Hero Headline + CTAs */}
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
                Ship production <br />
                grade software <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">faster.</span>
              </motion.h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.3, ease: EASE_EXPO as any } } }}
                className="text-[18px] md:text-[20px] text-white/80 font-medium leading-[1.8] mb-16 max-w-[560px]"
              >
                We build secure, scalable enterprise software, AI systems, and cloud infrastructure for organizations that can't afford to get it wrong.
              </motion.p>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4, ease: EASE_EXPO as any } } }}
                className="flex flex-wrap items-center gap-4"
              >
                {/* ── Primary CTA ── */}
                <CTAButton
                  className="group btn-gold btn-gold-pulse text-[16px] px-10 py-5 inline-flex items-center gap-2"
                >
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-[10%] left-[-30%] w-[38%] skew-x-[-18deg] rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent blur-md z-20"
                    animate={{ x: ['-150%', '340%'] }}
                    transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
                  />
                  <span className="relative z-10 font-bold">Book a 45-min strategy session</span>
                </CTAButton>

                {/* ── Secondary CTA ── */}
                <Link
                  to="/services"
                  id="hero-cta-view-work"
                  className="group btn-ghost text-[16px] px-10 py-5"
                >
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-[12%] left-[-34%] w-[40%] skew-x-[-18deg] rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent blur-lg z-20"
                    animate={{ x: ['-150%', '345%'] }}
                    transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
                  />
                  <span className="relative z-10">Explore Services</span>
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
            { icon: <MonitorSmartphone size={20} className="text-black" />, label: 'Web Platforms', sub: 'Mobile Apps' },
            { icon: <BrainCircuit size={20} className="text-black" />, label: 'AI Systems', sub: 'Automation' },
            { icon: <Globe size={20} className="text-black" />, label: 'Infrastructure', sub: 'Cloud' },
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


    </section>
  );
};

export default Hero;
