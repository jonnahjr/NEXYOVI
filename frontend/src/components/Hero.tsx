import { motion } from 'framer-motion';
import { BrainCircuit, Globe, MonitorSmartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE_EXPO, staggerContainer } from '../lib/animations';
import { CTAButton } from './CTAButton';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4';

const Hero = () => {
  // Hardcoded hero content for reliability and performance
  const mainHeadline = 'The engineering partner Africa\'s fastest companies trust to build — and ship.';
  const statLine = 'Custom software deployed across multiple industries.';
  const ctaPrimary = 'Book a free strategy session';
  const ctaSecondary = 'See our services';

  return (
    <section className="relative bg-[#FCFBF8] overflow-hidden theme-light">
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
        <div className="absolute inset-0 bg-black/10" />
      </div>
      {/* ── Content ── */}
      <div className="relative z-10">

        {/* ════════════════════════════════════════ */}
        {/* Hero Headline + CTAs */}
        {/* ════════════════════════════════════════ */}
        <div className="min-h-screen flex flex-col justify-end pb-8 sm:pb-10 md:pb-12 lg:pb-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 pt-24 sm:pt-28 md:pt-32 lg:pt-32"
          >
            <div className="max-w-[680px]">
              {/* Stat Line */}
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1, ease: EASE_EXPO as any } } }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-200/60 border border-slate-300 mb-6 sm:mb-8"
              >
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#F5A800]" />
                <span className="text-slate-600 font-bold text-xs sm:text-sm tracking-wide">{statLine}</span>
              </motion.p>

              {/* Main Headline */}
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: EASE_EXPO as any } } }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95]"
              >
                The engineering partner Africa's fastest companies trust
                <span className="text-[#F5A800]"> to build — and ship.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: EASE_EXPO as any } } }}
                className="text-slate-500 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed font-medium mb-6 sm:mb-8 mt-2 sm:mt-4"
              >
                We help startups, enterprises, and public institutions design, build, and scale mission-critical digital products.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6, ease: EASE_EXPO }}
                className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4"
              >
                {/* ── Primary CTA ── */}
                <CTAButton
                  className="group btn-gold btn-gold-pulse text-sm sm:text-base px-6 sm:px-10 py-3 sm:py-5 inline-flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
                >
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-[10%] left-[-30%] w-[38%] skew-x-[-18deg] rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent blur-md z-20"
                    animate={{ x: ['-150%', '340%'] }}
                    transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
                  />
                  <span className="relative z-10 font-bold">{ctaPrimary}</span>
                </CTAButton>

                {/* ── Secondary CTA: See our services ── */}
                <Link
                  to="/services"
                  id="hero-cta-see-services"
                  className="group btn-ghost text-sm sm:text-base px-6 sm:px-10 py-3 sm:py-5 w-full sm:w-auto text-center"
                >
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-[12%] left-[-34%] w-[40%] skew-x-[-18deg] rounded-full bg-gradient-to-r from-transparent via-black/10 to-transparent blur-lg z-20"
                    animate={{ x: ['-150%', '345%'] }}
                    transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
                  />
                  <span className="relative z-10">{ctaSecondary}</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats & Companies on the right/bottom ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: EASE_EXPO }}
        className="absolute right-4 sm:right-6 md:right-8 lg:right-16 xl:right-24 2xl:right-32 bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-24 hidden md:flex flex-col items-end gap-4 sm:gap-5 lg:gap-6 z-20"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 lg:gap-6 xl:gap-8 2xl:gap-10 sm:gap-8 lg:gap-10">
          {[
            { icon: <MonitorSmartphone size={16} sm:size={18} lg:size={20} className="text-black" />, label: 'Web Platforms', sub: 'Mobile Apps' },
            { icon: <BrainCircuit size={16} sm:size={18} lg:size={20} className="text-black" />, label: 'AI Systems', sub: 'Automation' },
            { icon: <Globe size={16} sm:size={18} lg:size={20} className="text-black" />, label: 'Infrastructure', sub: 'Cloud' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + i * 0.15, duration: 0.6, ease: EASE_EXPO }}
              className="flex items-center gap-2 sm:gap-3 cursor-default shrink-0"
            >
              <span className="flex items-center justify-center text-base sm:text-lg">{item.icon}</span>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-black text-black leading-none mb-0.5">{item.label}</span>
                <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-black">{item.sub}</span>
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
