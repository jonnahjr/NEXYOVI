import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Brain, Handshake, Layers, Users } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface EngagementModel {
  num: string;
  title: string;
  desc: string;
  bestFor: string;
  clientType: string;
  duration: string;
  pricing: string;
  accent: string;
  icon: LucideIcon;
}

const models: EngagementModel[] = [
  {
    num: '01',
    title: 'Project-Based Delivery',
    desc: 'Fixed-scope, fixed-budget engagements for clearly defined initiatives. We handle end-to-end delivery from specification to deployment.',
    bestFor: 'MVPs, feature builds, platform migrations, and defined-scope initiatives',
    clientType: 'Startups to enterprises with well-defined requirements',
    duration: '8–24 weeks',
    pricing: 'Custom pricing',
    accent: '#0ea5e9',
    icon: Layers,
  },
  {
    num: '02',
    title: 'Dedicated Engineering Teams',
    desc: 'Elite engineers embedded within your organization, working as an extension of your team with full access to our technical leadership.',
    bestFor: 'Ongoing product development, platform maintenance, and long-term roadmaps',
    clientType: 'Scale-ups and enterprises needing sustained engineering capacity',
    duration: '3–24+ months',
    pricing: 'Custom pricing',
    accent: '#f97316',
    icon: Users,
  },
  {
    num: '03',
    title: 'Fractional CTO Services',
    desc: 'Executive technical leadership on a flexible basis — architecture oversight, team building, technology strategy, and investor-grade roadmaps.',
    bestFor: 'Organizations that need senior technical direction without a full-time executive hire',
    clientType: 'Early-stage startups, SMBs, and teams in transition',
    duration: 'Ongoing — 2–20 hrs/week',
    pricing: 'Custom pricing',
    accent: '#3b82f6',
    icon: Brain,
  },
  {
    num: '04',
    title: 'Long-Term Strategic Partnerships',
    desc: 'Deep, multi-year partnerships where we operate as your core engineering organization — building platforms, running infrastructure, and driving continuous innovation.',
    bestFor: 'Organizations building complex platforms requiring sustained, deep technical investment',
    clientType: 'Enterprises, government institutions, and high-growth technology companies',
    duration: '12–48+ months',
    pricing: 'Custom pricing',
    accent: '#a855f7',
    icon: Handshake,
  },
];

const detailItems = (model: typeof models[0]) => [
  { label: 'Best For', value: model.bestFor },
  { label: 'Client Type', value: model.clientType },
  { label: 'Duration', value: model.duration, highlight: true },
];

export default function EngagementModels() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Always use scroll to update
    const idx = Math.min(
      models.length - 1,
      Math.floor(v * models.length)
    );
    setActiveIndex(idx);
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FCFBF8]"
      style={{ height: `${models.length * 60}vh` }}
    >
      {/* Dark diagonal stripes */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(135deg, transparent 0%, transparent 30%, #000000 30%, #000000 36%, transparent 36%, transparent 66%, #000000 66%, #000000 72%, transparent 72%, transparent 100%)`,
        }}
      />

      {/* Sticky wrapper */}
      <div className="sticky top-0 h-screen z-10 flex items-center overflow-hidden">
        <div className="container max-w-[1200px] mx-auto px-6 w-full">

          {/* ── TOP HEADER ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.18em]">How We Engage</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95]">
                Flexible engagement models <br />
                <span className="bg-gradient-to-r from-[#F5A800] to-amber-400 bg-clip-text text-transparent">for every stage</span>
              </h2>
            </div>
          </motion.div>

          {/* ── MAIN CONTENT: LEFT NAV + RIGHT PANEL ──── */}
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-0 lg:gap-16 items-start relative">

            {/* LEFT: Number nav */}
            <div className="hidden lg:flex flex-col gap-0 z-30 relative">
              {models.map((model, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={model.num}
                    className="relative flex items-stretch z-30 transition-all duration-300"
                  >
                    {/* Vertical progress track */}
                    <div className="flex flex-col items-center mr-5" style={{ width: '2px' }}>
                      {/* Top connector */}
                      <div
                        className="w-[2px] flex-1 transition-colors duration-500"
                        style={{ backgroundColor: i === 0 ? 'transparent' : (i <= activeIndex ? model.accent : '#e2e8f0') }}
                      />
                      {/* Icon dot — Projects page style */}
                      <div
                        className="relative w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 overflow-hidden transition-all duration-300 my-1"
                        style={{
                          backgroundColor: isActive ? `${model.accent}18` : '#F8F5EB',
                          borderColor: isActive ? `${model.accent}50` : '#e2e8f0',
                          boxShadow: isActive ? `0 0 0 4px ${model.accent}15` : 'none',
                          transform: isActive ? 'scale(1.15)' : 'scale(1)',
                          marginLeft: '-18px',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                        {(() => { const Icon = model.icon; return <Icon size={15} style={{ color: isActive ? model.accent : '#94a3b8' }} className="relative z-10 transition-colors duration-300" />; })()}
                      </div>
                      {/* Bottom connector */}
                      <div
                        className="w-[2px] flex-1 transition-colors duration-500"
                        style={{ backgroundColor: i >= models.length - 1 ? 'transparent' : (i < activeIndex ? models[i + 1].accent : '#e2e8f0') }}
                      />
                    </div>

                    {/* Number + label */}
                    <div
                      className="py-5 transition-all duration-300"
                      style={{ opacity: isActive ? 1 : 0.5 }}
                    >
                      <div
                        className="text-[14px] font-bold leading-snug transition-colors duration-300"
                        style={{ color: isActive ? '#0f172a' : '#64748b' }}
                      >
                        {model.title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* MOBILE: Bottom nav */}
            <div className="lg:hidden flex overflow-x-auto gap-3 pb-6 mb-6">
              {models.map((model, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={model.num}
                    className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? `${model.accent}18` : '#F8F5EB',
                      borderColor: isActive ? `${model.accent}50` : '#e2e8f0',
                    }}
                  >
                    {(() => { const Icon = model.icon; return <Icon size={14} style={{ color: isActive ? model.accent : '#94a3b8' }} />; })()}
                    <span
                      className="text-[11px] font-bold"
                      style={{ color: isActive ? '#0f172a' : '#94a3b8' }}
                    >
                      {model.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Active content panel */}
            <div ref={contentRef} className="relative min-h-[340px] flex items-center z-10">
              {models.map((model, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.div
                    key={model.num}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 16,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    {/* Mobile number badge */}
                    <div className="flex items-center gap-3 mb-4 lg:hidden">
                      <span
                        className="text-[10px] font-bold tracking-[0.22em] uppercase"
                        style={{ color: model.accent }}
                      >
                        / {model.num}
                      </span>
                      <div className="h-[1px] flex-1 bg-slate-200" />
                    </div>

                    {/* Icon — Projects page style (light bg, accent color) */}
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10, scale: isActive ? 1 : 0.85 }}
                      transition={{ duration: 0.45, delay: 0.02, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-11 h-11 rounded-full border flex items-center justify-center overflow-hidden mb-5 shadow-sm"
                      style={{
                        backgroundColor: `${model.accent}15`,
                        borderColor: `${model.accent}40`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
                      {(() => { const Icon = model.icon; return <Icon size={18} style={{ color: model.accent }} className="relative z-10" />; })()}
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                      transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="text-3xl md:text-4xl font-black text-slate-950 tracking-[-0.03em] leading-[1.05] mb-4"
                    >
                      {model.title}
                    </motion.h3>

                    {/* Desc */}
                    <motion.p
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="text-slate-500 text-base md:text-lg leading-relaxed font-medium mb-8 max-w-xl"
                    >
                      {model.desc}
                    </motion.p>

                    {/* Detail items — staggered */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 mb-8">
                      {detailItems(model).map((item, di) => (
                        <motion.div
                          key={item.label}
                          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                          transition={{ duration: 0.45, delay: 0.15 + di * 0.07, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-1.5"
                        >
                          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                            {item.label}
                          </div>
                          <div
                            className="text-[13px] leading-relaxed font-medium"
                            style={{ color: item.highlight ? model.accent : '#475569' }}
                          >
                            {item.value}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Divider line */}
                    <motion.div
                      animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      style={{ transformOrigin: 'left', backgroundColor: model.accent }}
                      className="h-[1.5px] w-full max-w-xl mb-7 rounded-full"
                    />

                    {/* CTA */}
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                      transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        to="/contact#inquiry"
                        className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#F5A800] text-black text-[13px] font-bold hover:bg-[#FFD166] transition-all duration-300 hover:scale-105"
                      >
                        <span>Book a strategy session</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
