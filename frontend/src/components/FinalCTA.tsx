import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

export default function FinalCTA() {
  const { settings } = useSite();
  const viewport = { once: true, margin: '-100px' };

  return (
    <section className="relative bg-[#02040a] py-28 md:py-36 overflow-hidden section-divider-dark">
      {/* Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#F5A800]/5 rounded-full blur-[120px] pointer-events-none" />

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
            Ready to scale?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">
              Let's talk.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 font-medium"
          >
            Book your 45-minute strategy session today. We take on a limited number of new clients each quarter to ensure maximum quality and dedicated attention.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <a
              href="mailto:contact@nexyovi.com"
              className="group btn-gold btn-gold-pulse text-[15px] px-9 py-[14px]"
            >
              <span className="relative z-10">Book a 45-min strategy session</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>

            <a
              href={`mailto:${settings.email}`}
              className="group btn-ghost text-[14px] px-8 py-[13px]"
            >
              <Calendar size={16} className="relative z-10 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Or email us directly</span>
            </a>
          </motion.div>

          {/* Benefit bullets */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3"
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
        </div>
      </div>
    </section>
  );
}
