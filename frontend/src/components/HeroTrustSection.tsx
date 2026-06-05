import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle2, ShieldCheck, TrendingUp, Zap } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { viewport } from '../lib/animations';

const checklist = [
  {
    text: "Production-ready delivery",
    icon: Zap,
    desc: "Deployed with CI/CD, monitoring, and rollback capabilities from day one.",
  },
  {
    text: "Security-first engineering",
    icon: ShieldCheck,
    desc: "Built with secure coding practices, compliance readiness, and proper safeguards.",
  },
  {
    text: "Measurable business outcomes",
    icon: TrendingUp,
    desc: "Every project tied to clear metrics and transparent business impact.",
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
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const HeroTrustSection = () => {
  const { settings } = useSite();

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
              Why Clients Choose Nexyovi
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-[-0.03em] leading-[0.95] mb-6"
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
            className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-16 font-medium"
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
              to="/contact#inquiry"
              id="cta-start-project"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-[14px] shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-[#F5A800] hover:scale-105 hover:shadow-[0_8px_30px_rgba(245,168,0,0.25)] hover:-translate-y-0.5"
            >
              <span className="relative z-10">Book a strategy session</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={`mailto:${settings.email}`}
              id="cta-book-call"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-900 font-bold text-[14px] shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-all duration-300 hover:bg-slate-100 hover:border-slate-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(245,168,0,0.1)] hover:-translate-y-0.5"
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
                  className="group relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#F5A800]/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="relative w-10 h-10 shrink-0 rounded-xl bg-[#030303] border border-white/10 flex items-center justify-center overflow-hidden shadow-sm transition-all duration-300 group-hover:border-[#F5A800]/40">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                      <Icon size={18} strokeWidth={2} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1 tracking-tight group-hover:text-[#F5A800] transition-colors">
                        {item.text}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
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
        </div>
      </section>

      {/* ─── DARK CTA SECTION ─── */}
      <section className="relative bg-[#02040a] py-28 md:py-36 overflow-hidden border-t border-white/5">
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
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.03em] leading-[0.95] mb-8"
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
              className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12 font-medium"
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
              <a
                href="mailto:contact@nexyovi.com"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-[14px] shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-300 hover:bg-[#F5A800] hover:scale-105 hover:text-white hover:shadow-[0_8px_30px_rgba(245,168,0,0.2)] hover:-translate-y-0.5"
              >
                <span className="relative z-10">Secure Your Strategy Session</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-[14px] transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(245,168,0,0.1)] hover:-translate-y-0.5"
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
