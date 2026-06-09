import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Shield, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

const trustItems = [
  { icon: Clock, label: 'Response within 24 hours' },
  { icon: Shield, label: 'NDA available upon request' },
  { icon: Users, label: 'Senior engineers only' },
  { icon: HeartHandshake, label: 'Long-term support available' }
];

export default function FinalCTA() {
  const { settings, siteContent } = useSite();
  const cta = siteContent?.finalCta || {};
  const headline = cta.headline || "Let's Build What's Next.";
  const description = cta.description || "Whether you're launching a new platform, modernizing infrastructure, implementing AI systems, or scaling an existing product, our team helps turn complex ideas into secure, production-ready solutions.";
  const primaryLabel = cta.primaryLabel || 'Book Strategy Session';
  const primaryPath = cta.primaryPath || '/contact?type=strategy-session#inquiry';
  const secondaryLabel = cta.secondaryLabel || 'Explore Our Work';
  const secondaryPath = cta.secondaryPath || '/projects';
  const trustItems_ = cta.trustIndicators || trustItems;

  return (
    <section className="relative bg-[#02040a] py-28 md:py-36 overflow-hidden section-divider-dark">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#F5A800]/10 via-[#6366f1]/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/8 via-transparent to-transparent blur-[100px] pointer-events-none" />

      <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase">Strategic Engineering Partnership</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.03em] leading-[0.92] mb-8"
        >
          {headline.includes("'s Next") || headline.includes("'s Next.") ? (
            <>
              {headline.substring(0, headline.lastIndexOf("'s") + 2)}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">
                {headline.substring(headline.lastIndexOf("'s") + 2).replace(/^ /, '')}
              </span>
            </>
          ) : (
            headline
          )}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/55 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium mb-10"
        >
          {description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            to={primaryPath}
            className="group btn-gold text-[12px] md:text-[13px] px-8 py-4 inline-flex items-center gap-2"
          >
            <span className="relative z-10">{primaryLabel}</span>
            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
          <Link
            to={secondaryPath}
            className="group btn-ghost text-[12px] md:text-[13px] px-8 py-4 inline-flex items-center gap-2"
          >
            <Calendar size={14} className="relative z-10" />
            {secondaryLabel}
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {trustItems_.map((item: any) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]"
              >
                <Icon size={11} className="text-[#F5A800]/70" />
                <span className="text-[10px] font-medium text-white/45 whitespace-nowrap">{item.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
