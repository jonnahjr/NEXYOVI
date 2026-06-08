import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle2, Phone } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { viewport } from '../lib/animations';

const HeroTrustSection = () => {
  const { settings } = useSite();

  return (
    <section className="relative bg-[#02040a] py-28 md:py-36 overflow-hidden border-t border-white/[0.05]">
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#F5A800]/5 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#6366f1]/4 rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
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
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.03em] leading-[0.95] mb-6"
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
            className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl mb-12 font-medium"
          >
            Book your strategy session today. We take on a limited number of new clients each quarter to ensure maximum quality and dedicated attention.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-14"
          >
            <a
              href={`mailto:${settings.email || 'contact@nexyovi.com'}`}
              id="cta-strategy-session"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-slate-950 font-black text-[14px] uppercase tracking-widest transition-all duration-300 hover:bg-[#F5A800] hover:scale-105 hover:text-white hover:shadow-[0_0_40px_rgba(245,168,0,0.2)]"
            >
              <span className="relative z-10">Book Your Strategy Session</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={`tel:${settings.phone || '+251911234567'}`}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-white/[0.03] border border-white/[0.10] text-white/70 font-bold text-[13px] uppercase tracking-widest transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.20] hover:text-white"
            >
              <Phone size={16} className="text-white/40 group-hover:text-white transition-colors" />
              Call Now
            </a>
          </motion.div>

          {/* Strategy Session Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-8 md:p-10"
          >
            {/* Card glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#F5A800]/8 blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5A800]/10 border border-[#F5A800]/20 mb-4">
                  <CheckCircle2 size={12} className="text-[#F5A800]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5A800]">Strategy Session</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-[-0.02em] mb-2">
                  Book your strategy session today.
                </h3>
                <p className="text-white/40 text-sm font-medium">
                  AI audit + 2-3 ROI ideas · Prioritized roadmap outline, zero cost
                </p>
              </div>

              <a
                href={`mailto:${settings.email || 'contact@nexyovi.com'}`}
                className="group shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F5A800] text-slate-950 font-black text-[11px] uppercase tracking-widest transition-all duration-300 hover:bg-[#FFD166] hover:scale-105 hover:shadow-[0_0_30px_rgba(245,168,0,0.3)]"
              >
                <span>Secure Your Session</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroTrustSection;
