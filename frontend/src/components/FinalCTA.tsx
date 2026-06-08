import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle2, Clock, HeartHandshake, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

const deliverables = [
  { label: '45-minute strategy session with senior engineers', hint: 'A focused session with our technical leadership to understand your goals, challenges, and constraints.' },
  { label: 'Technical feasibility assessment', hint: 'Our engineers evaluate your technical requirements, existing infrastructure, and potential integration points.' },
  { label: 'Architecture recommendations', hint: 'High-level system design recommendations covering scalability, security, performance, and maintainability.' },
  { label: 'AI and automation opportunities', hint: 'Identification of areas where AI and automation can deliver measurable efficiency gains.' },
  { label: 'Initial delivery roadmap', hint: 'A phased delivery plan with milestones, timelines, resource requirements, and risk mitigation strategies.' },
  { label: 'Budget and timeline guidance', hint: 'Transparent budgetary estimates and realistic timeline projections based on your specific requirements.' },
];

const trustIndicators = [
  { icon: Clock, label: 'Response within 24 hours', hint: 'We acknowledge and respond to all inquiries within 24 hours, typically sooner.' },
  { icon: Shield, label: 'NDA available upon request', hint: 'We routinely sign NDAs to protect your confidential information and intellectual property.' },
  { icon: Users, label: 'Senior engineers only', hint: 'Every engagement is led by senior engineers with 8+ years of experience — no junior staffing.' },
  { icon: HeartHandshake, label: 'Long-term support available', hint: 'We provide ongoing maintenance, monitoring, and strategic guidance beyond initial delivery.' },
];

function Tooltip({ children, hint }: { children: React.ReactNode; hint: string }) {
  return (
    <div className="group/tip relative inline-block">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-xl border border-white/10 bg-[#0a0a0e]/95 backdrop-blur-xl px-3.5 py-2.5 opacity-0 transition-all duration-200 group-hover/tip:opacity-100 group-hover/tip:translate-y-0 translate-y-1 shadow-xl">
        <p className="text-[11px] leading-relaxed text-white/70 font-medium">{hint}</p>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0a0a0e]/95" />
      </div>
    </div>
  );
}

export default function FinalCTA() {
  const { settings } = useSite();
  const viewport = { once: true, margin: '-100px' };
  const email = settings?.email || 'info@nexyovi.com';
  const strategySubject = encodeURIComponent('Strategy session request');
  const discoverySubject = encodeURIComponent('Discovery call request');

  return (
    <section className="relative bg-[#02040a] py-28 md:py-36 overflow-hidden section-divider-dark">
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(245,168,0,0.08),transparent_34%,rgba(20,184,166,0.05)_72%,transparent)] pointer-events-none" />

      <div className="container relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">

          {/* ── Left: Value Proposition ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase">Engineering Partnership</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.03em] leading-[0.92] mb-8"
            >
              Let's Build{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">
                What's Next.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl font-medium mb-10"
            >
              Whether you're launching a new product, modernizing legacy infrastructure, implementing AI systems, or scaling an existing platform, our team helps turn complex ideas into secure, production-ready solutions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-10"
            >
              <Link
                to={`/contact?type=strategy-session#inquiry`}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-black text-[12px] uppercase tracking-widest transition-all duration-300 hover:bg-[#F5A800] hover:scale-105 hover:text-white hover:shadow-[0_0_40px_rgba(245,168,0,0.2)]"
              >
                <span className="relative z-10">Book Strategy Session</span>
                <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={`/contact?type=discovery-call#inquiry`}
                className="group relative inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/15 text-white/60 font-bold text-[11px] uppercase tracking-widest transition-all duration-300 hover:bg-white/[0.06] hover:border-white/25 hover:text-white"
              >
                <Calendar size={14} />
                Schedule a Discovery Call
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              {trustIndicators.map((item) => {
                const Icon = item.icon;
                return (
                  <Tooltip key={item.label} hint={item.hint}>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] cursor-default">
                      <Icon size={11} className="text-[#F5A800]/70" />
                      <span className="text-[10px] font-medium text-white/45 whitespace-nowrap">{item.label}</span>
                    </div>
                  </Tooltip>
                );
              })}
            </motion.div>
          </div>

          {/* ── Right: Strategy Session Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5A800]/60 to-transparent" />
            <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#F5A800]/6 blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5A800]/8 border border-[#F5A800]/15 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5A800]">What Clients Receive</span>
              </div>

              <div className="space-y-3 mb-8">
                {deliverables.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.35, delay: 0.3 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Tooltip hint={item.hint}>
                      <div className="flex items-start gap-3 cursor-default">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#F5A800]" />
                        <span className="text-white/70 text-sm font-medium leading-snug">{item.label}</span>
                      </div>
                    </Tooltip>
                  </motion.div>
                ))}
              </div>

              <Link
                to={`/contact?type=strategy-session#inquiry`}
                className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-950 font-black text-[13px] uppercase tracking-widest transition-all duration-300 hover:bg-[#F5A800] hover:scale-[1.02] hover:text-white hover:shadow-[0_0_40px_rgba(245,168,0,0.15)]"
              >
                <span className="relative z-10">Book Strategy Session</span>
                <ArrowRight size={15} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/trust-center"
                className="block text-center text-[10px] text-white/30 mt-4 font-medium tracking-wide hover:text-white/50 transition-colors"
              >
                Response within 24 hours · NDA available upon request
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
