import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code, Network, Lightbulb, ShieldAlert, Database, Cloud,
  Layers, Target, Zap, BarChart3, Award, Users, CheckCircle, Quote,
  Star,  Monitor, Terminal, BrainCircuit

} from 'lucide-react';

import { EASE_EXPO, EASE_CINEMA, viewport } from '../lib/animations';
import TextReveal from '../components/TextReveal';

// ── Service Data ──────────────────────────────────────────────
const services = [
  {
    id: 'software',
    title: 'Software Engineering',
    desc: 'Custom platforms, SaaS products, and enterprise applications engineered for massive concurrency and global scale.',
    longDesc: 'We design and deliver bespoke systems — from microservice architectures to monolithic refactors — with CI/CD pipelines, observability, and security embedded from day one.',
    icon: Code,
    accent: '#F5A800',
    glow: 'rgba(245,168,0,0.08)',
    tags: ['Enterprise Systems', 'SaaS Products', 'Microservices', 'API Design'],
    href: '/services/software',
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure & Networking',
    desc: 'Cloud architecture, zero-trust networks, server deployments, and continuous reliability engineering.',
    longDesc: 'Multi-cloud deployments, SD-WAN, edge computing, and IaC — engineered for high availability and sub-millisecond latency across global operations.',
    icon: Network,
    accent: '#6366f1',
    glow: 'rgba(99,102,241,0.08)',
    tags: ['Cloud Architecture', 'Networking', 'IaC', 'Monitoring'],
    href: '/services/networking',
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    desc: 'Predictive models, intelligent agents, and custom LLM integrations that automate complex workflows.',
    longDesc: 'Production-grade ML pipelines, NLP systems, computer vision, and LLM deployments with continuous monitoring, drift detection, and automated retraining.',
    icon: Lightbulb,
    accent: '#8b5cf6',
    glow: 'rgba(139,92,246,0.08)',
    tags: ['AI Agents', 'ML Pipelines', 'LLM Ops', 'Automation'],
    href: '/services/ai',
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    desc: 'Security audits, infrastructure hardening, compliance, penetration testing, and continuous threat monitoring.',
    longDesc: 'Zero-trust architectures, SOC operations, penetration testing, and compliance frameworks (ISO 27001, SOC 2, GDPR) — protecting your enterprise at every layer.',
    icon: ShieldAlert,
    accent: '#10b981',
    glow: 'rgba(16,185,129,0.08)',
    tags: ['Pen Testing', 'Zero-Trust', 'Compliance', 'SOC'],
    href: '/services/security',
  },
  {
    id: 'data',
    title: 'Data Systems',
    desc: 'Real-time data lakes, streaming pipelines, business intelligence, and executive analytics dashboards.',
    longDesc: 'End-to-end data engineering — from Kafka streaming pipelines to data lakes and BI dashboards — turning raw data into actionable executive intelligence.',
    icon: Database,
    accent: '#0ea5e9',
    glow: 'rgba(14,165,233,0.08)',
    tags: ['Data Pipelines', 'Analytics', 'BI', 'Streaming'],
    href: '/services/data',
  },
  {
    id: 'managed',
    title: 'Managed Technology',
    desc: 'Ongoing support, system maintenance, reliability engineering, and technical advisory for your operations.',
    longDesc: '24/7 managed infrastructure, SLA-backed support, reliability engineering, and strategic technical advisory to keep your systems running at peak performance.',
    icon: Cloud,
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.08)',
    tags: ['24/7 Support', 'Maintenance', 'Reliability', 'Advisory'],
    href: '/contact',
  },
];

// ── Process Steps ─────────────────────────────────────────────
const processSteps = [
  { step: '01', title: 'Discovery & Audit', desc: 'Deep-dive audit of your current infrastructure, workflows, and business goals. We identify quick wins and long-term strategic opportunities.', icon: Target },
  { step: '02', title: 'Architecture Design', desc: 'We design a tailored solution architecture — selecting the right stack, patterns, and deployment strategy for your specific requirements.', icon: Layers },
  { step: '03', title: 'Build & Deploy', desc: 'Agile development with continuous delivery. Your team shadows every sprint. Production deployment with zero-downtime cutover.', icon: Zap },
  { step: '04', title: 'Monitor & Scale', desc: 'Post-launch observability, performance tuning, and iterative improvements. We build, transfer knowledge, and transition ownership with full documentation and training.', icon: BarChart3 },
];

// ── Metrics ───────────────────────────────────────────────────
const metrics = [
  { value: 247, suffix: '', label: 'System Monitoring & Support' },
  { value: 6, suffix: '+', label: 'Core Engineering Disciplines' },
  { value: 15, suffix: '+', label: 'Global Delivery Coverage' },
  { value: 4, suffix: '', label: 'Production-Grade Systems' },
];

// ── Differentiators ───────────────────────────────────────────
const differentiators = [
  { icon: Award, title: 'Senior Engineering Teams', desc: 'Every engagement is led by experienced architects with a track record of shipping enterprise-scale systems. No junior allocation.' },
  { icon: Users, title: 'True Partnership Model', desc: 'We embed with your team, transfer knowledge continuously, and ensure you own the system — not us.' },
  { icon: CheckCircle, title: 'Outcome-Based Delivery', desc: 'We optimize for business KPIs, not technical vanity metrics. Measurable ROI before we scale engagement.' },
];

// ── Testimonials ──────────────────────────────────────────────
const testimonials = [
  { quote: 'We unified our data pipelines and deployed real-time fraud detection, reducing fraud by 82% within months.', name: 'Emily Carter', role: 'VP of Data Science', company: 'Enterprise Fintech' },
  { quote: 'Approved POC to production in 90 days. Built, deployed, and scaled with full MLOps — $10.7M saved in year one.', name: 'Sarah Chen', role: 'VP of Engineering', company: 'Enterprise SaaS' },
  { quote: 'They delivered compliant, explainable systems that actually run in production — with full governance and regulatory approval.', name: 'Arif Rahman', role: 'Head of Data & AI', company: 'HealthTech Leader' },
];

// ── Technology Ecosystem ──────────────────────────────────────
const techEcosystem = [
  { category: 'Frontend', icon: Monitor, items: ['React', 'Next.js', 'TypeScript'] },
  { category: 'Backend', icon: Terminal, items: ['Node.js', 'Python', 'Go'] },
  { category: 'Cloud & DevOps', icon: Cloud, items: ['AWS', 'Azure', 'Kubernetes'] },
  { category: 'AI & Data', icon: BrainCircuit, items: ['OpenAI', 'LangChain', 'PostgreSQL'] },
];



// ══════════════════════════════════════════════════════════════
//  ANIMATED COUNTER
// ══════════════════════════════════════════════════════════════
function AnimatedCounter({ value, suffix, label, index, light = false }: {
  value: number; suffix: string; label: string; index: number; light?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const totalSteps = duration / step;
    const increment = value / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, step);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatDisplay = (num: number): string => {
    if (value === 247) {
      const whole = Math.floor(num);
      return `24/${whole > 6 ? '7' : whole}`;
    }
    if (Number.isInteger(value) && num >= value - 1) return `${value}${suffix}`;
    return `${Math.floor(num)}${suffix}`;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ delay: index * 0.1, duration: 0.7, ease: EASE_EXPO }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2">
        <span className={`tabular-nums ${light ? 'text-slate-950' : 'text-white'} bg-clip-text ${light ? '' : 'text-transparent bg-gradient-to-r from-[#F5A800] to-[#FFD166]'}`}>
          {light ? (value === 247 ? '24/7' : `${value}${suffix}`) : formatDisplay(display)}
        </span>
      </div>
      <div className={`text-sm md:text-base font-medium ${light ? 'text-slate-500' : 'text-white/50'}`}>{label}</div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
//  SERVICE CARD
// ══════════════════════════════════════════════════════════════
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewport}
      transition={{ delay: index * 0.08, duration: 0.7, ease: EASE_EXPO }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="group relative cursor-pointer"
    >
      <Link to={service.href} className="block h-full">
        <div className="relative h-full p-8 rounded-[20px] bg-white/[0.03] border border-white/[0.08] transition-all duration-500 group-hover:border-[#F5A800]/40 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.3),_0_0_40px_rgba(245,168,0,0.06)] overflow-hidden">
          {/* Hover radial glow */}
          <div
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${service.glow}, transparent 70%)` }}
          />

          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
          />

          {/* Icon */}
          <div className="relative mb-6">
            <div
              className="w-14 h-14 rounded-[16px] flex items-center justify-center transition-all duration-500 group-hover:scale-110"
              style={{ background: `${service.accent}12`, border: `1px solid ${service.accent}25` }}
            >
              <Icon size={24} style={{ color: service.accent }} />
            </div>
          </div>

          {/* Title */}
          <h3 className="relative text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#F5A800] transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="relative text-white/50 text-sm leading-relaxed mb-6 line-clamp-3">
            {service.longDesc}
          </p>

          {/* Tags */}
          <div className="relative flex flex-wrap gap-2 mb-6">
            {service.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/[0.08] text-white/30 bg-white/[0.04] group-hover:border-white/[0.15] group-hover:text-white/60 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="relative flex items-center gap-2 text-white/30 group-hover:text-[#F5A800] transition-colors duration-300">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em]">View Details</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
//  PROCESS STEP
// ══════════════════════════════════════════════════════════════
function ProcessStep({ step, title, desc, icon: Icon, index }: {
  step: string; title: string; desc: string; icon: React.ElementType; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ delay: index * 0.15, duration: 0.7, ease: EASE_EXPO }}
      className="relative"
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-5">
        <div className="flex items-center gap-4 lg:flex-col lg:items-center">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#F5A800]/10 border border-[#F5A800]/20 shrink-0 transition-all duration-300 hover:bg-[#F5A800]/20 hover:border-[#F5A800]/40">
            <Icon size={20} className="text-[#F5A800]" />
          </div>
          {index < 3 && (
            <div className="hidden lg:block w-16 h-px bg-gradient-to-r from-[#F5A800]/30 to-transparent" />
          )}
        </div>

        <div className="flex-1">
          <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#F5A800]/70 mb-1">{step}</div>
          <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{desc}</p>
        </div>
      </div>

      {index < 3 && (
        <div className="lg:hidden absolute left-7 top-14 w-px h-8 bg-gradient-to-b from-[#F5A800]/30 to-transparent pointer-events-none" />
      )}
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
//  TECH STACK BADGE — compact
// ══════════════════════════════════════════════════════════════
function TechCategory({ category, icon: Icon, items }: {
  category: string; icon: React.ElementType; items: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, ease: EASE_EXPO }}
      className="p-4 rounded-[16px] bg-white/[0.03] border border-white/[0.08] hover:border-[#F5A800]/30 transition-all duration-300"
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-[10px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center shrink-0">
          <Icon size={14} className="text-[#F5A800]" />
        </div>
        <h3 className="text-[11px] font-bold text-white/70 uppercase tracking-wider">{category}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/40 text-[10px] font-bold hover:bg-[#F5A800]/10 hover:border-[#F5A800]/30 hover:text-[#F5A800] transition-all duration-200"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
//  MOUSE GLOW
// ══════════════════════════════════════════════════════════════
function MouseGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  const handleMouse = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[999] transition-none hidden lg:block"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(245,168,0,0.03), transparent 40%)`,
      }}
    />
  );
}

// ══════════════════════════════════════════════════════════════
//  PAGE
// ══════════════════════════════════════════════════════════════
export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  // ── Hero parallax ──
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.8], ['blur(0px)', 'blur(6px)']);

  return (
    <div ref={containerRef} className="bg-slate-50 min-h-screen overflow-x-clip">
      {/* Mouse-following glow */}
      <MouseGlow />

      {/* ══════════════════════════════════════════════════════
          HERO — dark with atmosphere glows
          ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02040a]"
      >
        {/* ── Atmosphere glow orbs ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#F5A800]/10 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/8 rounded-full blur-[140px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-[#02040a] to-transparent opacity-60" />
        </div>

        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#02040a]/30 via-transparent to-[#02040a]/85 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#02040a_80%)] pointer-events-none" />

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#02040a] to-transparent z-[2] pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, filter: heroBlur }}
          className="relative z-10 container max-w-5xl mx-auto px-6 text-center pt-32 pb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#F5A800]/20 backdrop-blur-md mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.6)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A800]">Full-Spectrum Engineering</span>
          </motion.div>

          <TextReveal className="mb-2">
            <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-black tracking-[-0.04em] leading-[0.9] text-white">
              Enterprise Technology.
            </h1>
          </TextReveal>
          <TextReveal delay={0.15}>
            <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-black tracking-[-0.04em] leading-[0.9] mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">Production-Ready.</span>
            </h1>
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE_EXPO }}
            className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-10"
          >
            Eight core engineering disciplines — from software and infrastructure to AI and security —<br className="hidden md:block" />
            delivered by senior teams who have shipped at global scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: EASE_EXPO }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#services-grid"
              className="group btn-gold text-[14px] px-8 py-4"
            >
              <span className="relative z-10">View All Services</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/contact"
              className="group btn-ghost text-[14px] px-8 py-4"
            >
              <span className="relative z-10">Start a Project</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES GRID — dark section
          ══════════════════════════════════════════════════════ */}
      <section id="services-grid" className="relative py-32 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[700px] h-[500px] bg-[#F5A800]/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#8b5cf6]/5 rounded-full blur-[100px]" />
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="max-w-2xl mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">What We Build</span>
            </div>
            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
                Full-Spectrum{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Engineering.</span>
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="text-white/50 text-lg leading-relaxed max-w-xl font-medium">
                From architecture to deployment to ongoing operations — every capability your organization needs to build, secure, and scale.
              </p>
            </TextReveal>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="mt-14 text-center"
          >
            <Link
              to="/contact"
              className="group btn-gold text-[14px] px-8 py-4"
            >
              <span className="relative z-10">Need a custom solution? Let's talk</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW WE DELIVER — Process (white bg)
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-white border-t border-slate-200">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#6366f1]/3 blur-[120px] rounded-full pointer-events-none" />

        <div className="container max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="max-w-2xl mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">How We Deliver</span>
            </div>
            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
                From Discovery to Scale.
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="text-slate-500 text-lg leading-relaxed max-w-xl font-medium">
                A proven methodology. From first conversation to production deployment — every engagement follows the same disciplined framework.
              </p>
            </TextReveal>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {processSteps.map((step, i) => (
              <ProcessStep key={step.step} {...step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TECHNOLOGY ECOSYSTEM — dark
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#F5A800]/6 rounded-full blur-[100px]" />
        </div>

        <div className="container max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="max-w-2xl mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Technology Ecosystem</span>
            </div>
            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
                Modern Stack.{' '}
                <span className="text-[#F5A800]">Proven Tools.</span>
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="text-white/50 text-lg leading-relaxed max-w-xl font-medium">
                We select the right tools for each project — from battle-tested frameworks to cutting-edge platforms.
              </p>
            </TextReveal>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {techEcosystem.map((cat) => (
              <TechCategory key={cat.category} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BY THE NUMBERS (white bg)
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-white border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5A800]/2 via-transparent to-transparent pointer-events-none" />

        <div className="container max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">By the Numbers</span>
            </div>
            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
                Engineered for Impact.
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                Measurable results across every engagement.
              </p>
            </TextReveal>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {metrics.map((metric, i) => (
              <AnimatedCounter key={metric.label} {...metric} index={i} light />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY NEXYOVI — Differentiators (dark)
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#F5A800]/8 rounded-full blur-[120px]" />
        </div>

        <div className="container max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="max-w-2xl mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Why Choose Us</span>
            </div>
            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
                Built{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Different.</span>
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="text-white/50 text-lg leading-relaxed max-w-xl font-medium">
                Not a consultancy. Not an agency. An engineering partner that ships.
              </p>
            </TextReveal>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: EASE_EXPO }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="group p-8 rounded-[20px] bg-white/[0.03] border border-white/[0.08] hover:border-[#F5A800]/30 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-[14px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-5 group-hover:bg-[#F5A800] group-hover:text-white group-hover:scale-110 transition-all duration-500">
                    <Icon size={22} className="text-[#F5A800] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#F5A800] transition-colors duration-300">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS (white bg)
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-white border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#8b5cf6]/1 via-transparent to-transparent pointer-events-none" />

        <div className="container max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Client Results</span>
            </div>
            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
                Trusted by{' '}
                <span className="text-[#F5A800]">Industry Leaders.</span>
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                Results speak louder than promises.
              </p>
            </TextReveal>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ delay: i * 0.12, duration: 0.7, ease: EASE_EXPO }}
                className="group relative p-8 rounded-[20px] bg-slate-50 border border-slate-200 hover:border-[#F5A800]/30 transition-all duration-500"
              >
                <Quote size={20} className="text-[#F5A800]/20 mb-4 group-hover:text-[#F5A800]/30 transition-colors duration-300" />

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} className="text-[#F5A800] fill-[#F5A800]" />
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 group-hover:text-slate-700 transition-colors duration-300">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="pt-4 border-t border-slate-200">
                  <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                  <div className="text-slate-400 text-xs">{item.role}</div>
                  <div className="text-[#F5A800]/70 text-xs mt-0.5">{item.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA SECTION — dark
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#F5A800]/8 rounded-full blur-[140px]" />
        </div>

        <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#F5A800]/20 backdrop-blur-md mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.6)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A800]">Ready for Real Results</span>
            </div>

            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-6">
                Ready to Build Something{' '}
                <span className="text-[#F5A800]">Extraordinary?</span>
              </h2>
            </TextReveal>

            <TextReveal delay={0.1}>
              <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-8 font-medium">
                Tell us about your project. We'll put together a free strategy session with a senior architect — no pitches, just honest guidance.
              </p>
            </TextReveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: 0.25, duration: 0.6, ease: EASE_EXPO }}
              className="flex flex-wrap justify-center gap-6 mb-10"
            >
              {[
                'Free 45-min strategy session',
                'Prioritized roadmap outline',
                'Strict NDA, fully confidential',
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#F5A800] shrink-0" />
                  <span className="text-white/50 text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: 0.35, duration: 0.6, ease: EASE_EXPO }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                to="/contact"
                className="group btn-gold text-[15px] px-10 py-4"
              >
                <span className="relative z-10">Start a Project</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
              <Link
                to="/company"
                className="group btn-ghost text-[15px] px-10 py-4"
              >
                <span className="relative z-10">Learn About Us</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
