import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Mail, Phone } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function FinalCTA() {
  const { settings } = useSite();
  const viewport = { once: true, margin: '-100px' };
  const email = settings?.email || 'info@nexyovi.com';
  const phone = settings?.phone || '+251938617252';
  const strategySubject = encodeURIComponent('Strategy session request');

  return (
    <section className="relative bg-[#02040a] py-20 md:py-28 overflow-hidden section-divider-dark">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(245,168,0,0.12),transparent_34%,rgba(20,184,166,0.08)_72%,transparent)]" />
      <div className="container relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">Let's Build Together</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-[0.95] mb-6"
            >
              Ready to scale?{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Let's talk.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl font-medium"
            >
              Book your strategy session today. We take on a limited number of new clients each quarter to ensure maximum quality and dedicated attention.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-5 md:p-6 shadow-[0_24px_70px_rgba(0,0,0,0.32)]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5A800]/70 to-transparent" />
            <div className="space-y-5">
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#02040a]/70 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5A800] text-black">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/45">Strategy session</p>
                  <p className="mt-1 text-xl font-black leading-tight text-white">Book your strategy session today.</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex min-h-[76px] items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-medium leading-snug text-white/70">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-500" />
                  AI audit + 2-3 ROI ideas
                </div>
                <div className="flex min-h-[76px] items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-medium leading-snug text-white/70">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-500" />
                  Prioritized roadmap outline, zero cost
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${email}?subject=${strategySubject}`}
                  className="btn-gold group flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl text-[14px] font-bold"
                >
                  <Mail size={17} />
                  Email us
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={`tel:${phone}`}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] text-[14px] font-bold text-white transition-colors hover:border-[#F5A800]/40 hover:text-[#F5A800]"
                >
                  <Phone size={17} />
                  Call now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
