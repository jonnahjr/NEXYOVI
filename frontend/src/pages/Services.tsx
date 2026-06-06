import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BarChart3,
  BrainCircuit,
  CheckCircle,
  Cloud,
  Code,
  Database,
  GitBranch,
  Layers,
  Lightbulb,
  Monitor,
  Network,
  ShieldAlert,
  Target,
  Terminal,
  Users,
  Zap
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  SiDocker,
  SiGo,
  SiGooglecloud,
  SiGraphql,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiRust,
  SiSvelte,
  SiTailwindcss,
  SiTensorflow,
  SiTerraform,
  SiTypescript,
  SiVuedotjs
} from 'react-icons/si';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

import { CTAButton } from '../components/CTAButton';
import TextReveal from '../components/TextReveal';
import { EASE_EXPO, viewport } from '../lib/animations';

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
    highlights: ['Custom Platforms', 'SaaS Architecture'],
    href: '/services/software',
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure & Networking',
    desc: 'Cloud architecture, zero-trust networks, server deployments, and continuous reliability engineering.',
    longDesc: 'Multi-cloud deployments, SD-WAN, edge computing, and IaC — engineered for high availability and low-latency performance across global operations.',
    icon: Network,
    accent: '#6366f1',
    glow: 'rgba(99,102,241,0.08)',
    tags: ['Cloud Architecture', 'Networking', 'IaC', 'Monitoring'],
    highlights: ['Cloud Native', 'Edge Computing'],
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
    highlights: ['LLM Deployments', 'ML Pipelines'],
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
    highlights: ['Zero Trust', 'Compliance'],
    href: '/services/security',
  },
  {
    id: 'data',
    title: 'Data Systems',
    desc: 'Real-time data lakes, streaming pipelines, business intelligence, and executive analytics dashboards.',
    longDesc: 'End-to-end data engineering — from Kafka streaming pipelines to data lakes and BI dashboards — turning raw data into operational insight and decision-ready reporting.',
    icon: Database,
    accent: '#0ea5e9',
    glow: 'rgba(14,165,233,0.08)',
    tags: ['Data Pipelines', 'Analytics', 'BI', 'Streaming'],
    highlights: ['Real-Time Analytics', 'Data Lakes'],
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
    highlights: ['24/7 Operations', 'SLA Backed'],
    href: '/services/managed',
  },
];

// ── Process Steps ─────────────────────────────────────────────
const processSteps = [
  { step: '01', title: 'Discovery & Audit', desc: 'Deep-dive audit of your current infrastructure, workflows, and business goals. We identify quick wins and long-term strategic opportunities.', icon: Target },
  { step: '02', title: 'Architecture Design', desc: 'We design a tailored solution architecture — selecting the right stack, patterns, and deployment strategy for your specific requirements.', icon: Layers },
  { step: '03', title: 'Build & Deploy', desc: 'Agile development with continuous delivery. Your team stays aligned through every sprint review. Production deployment with zero-downtime cutover.', icon: Zap },
  { step: '04', title: 'Monitor & Scale', desc: 'Post-launch observability, performance tuning, and iterative improvements. We build, transfer knowledge, and transition ownership with full documentation and training.', icon: BarChart3 },
];

// ── Metrics ───────────────────────────────────────────────────
const defaultMetrics = [
  { value: 24, suffix: '/7', label: 'Monitoring & Support' },
  { value: 12, suffix: '+', label: 'Core Engineering Practices' },
  { value: 6, suffix: '', label: 'Technology Domains' },
  { value: 0, suffix: '', label: 'Engineering-Led Delivery Teams', hideNumber: true },
];

// ── Differentiators ───────────────────────────────────────────
const differentiators = [
  { icon: Award, title: 'Senior Engineering Teams', desc: 'Every engagement is led by experienced architects with a track record of shipping enterprise-scale systems. No junior allocation.' },
  { icon: Users, title: 'True Partnership Model', desc: 'We embed with your team, transfer knowledge continuously, and ensure you own the system — not us.' },
  { icon: CheckCircle, title: 'Outcome-Based Delivery', desc: 'We optimize for business KPIs, not technical vanity metrics. Measurable ROI before we scale engagement.' },
];

// ── Technology Ecosystem ──────────────────────────────────────
interface TechItem {
  name: string;
  icon: React.ElementType;
  color: string;
}

const techEcosystem: {
  category: string;
  icon: React.ElementType;
  items: TechItem[];
}[] = [
    {
      category: 'Frontend', icon: Monitor,
      items: [
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'Vue', icon: SiVuedotjs, color: '#4FC08D' },
        { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Svelte', icon: SiSvelte, color: '#FF3E00' },
      ],
    },
    {
      category: 'Backend', icon: Terminal,
      items: [
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'Python', icon: SiPython, color: '#3776AB' },
        { name: 'Go', icon: SiGo, color: '#00ADD8' },
        { name: 'Rust', icon: SiRust, color: '#000000' },
        { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
        { name: 'Java', icon: SiOpenjdk, color: '#ED8B00' },
      ],
    },
    {
      category: 'Cloud & DevOps', icon: Cloud,
      items: [
        { name: 'AWS', icon: AwsIcon, color: '#FF9900' },
        { name: 'Azure', icon: AzureIcon, color: '#0078D4' },
        { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
        { name: 'Docker', icon: SiDocker, color: '#2496ED' },
        { name: 'Terraform', icon: SiTerraform, color: '#7B42BC' },
        { name: 'GCP', icon: SiGooglecloud, color: '#4285F4' },
      ],
    },
    {
      category: 'AI & Data', icon: BrainCircuit,
      items: [
        { name: 'OpenAI', icon: SiOpenai, color: '#412991' },
        { name: 'LangChain', icon: GitBranch, color: '#1C3C3C' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
        { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
        { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      ],
    },
  ];



// ══════════════════════════════════════════════════════════════
//  ANIMATED COUNTER
// ══════════════════════════════════════════════════════════════
function AnimatedCounter({ value, suffix, label, subtitle, index, light = false, hideNumber = false }: {
  value: number; suffix: string; label: string; subtitle?: string; index: number; light?: boolean; hideNumber?: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (!hasTriggered) return;
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
  }, [hasTriggered, value]);

  const formatDisplay = (num: number): string => {
    if (Number.isInteger(value) && num >= value - 1) return `${value}${suffix}`;
    return `${Math.floor(num)}${suffix}`;
  };

  return (
    <motion.div
      onViewportEnter={() => setHasTriggered(true)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ delay: index * 0.1, duration: 0.7, ease: EASE_EXPO }}
      className="text-center"
    >
      {!hideNumber && (
        <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2">
          <span className={`tabular-nums ${light ? 'text-slate-950' : 'text-white'} bg-clip-text ${light ? '' : 'text-transparent bg-gradient-to-r from-[#F5A800] to-[#FFD166]'}`}>
            {light ? `${value}${suffix}` : formatDisplay(display)}
          </span>
        </div>
      )}
      <div className={`text-sm md:text-base font-medium leading-relaxed ${light ? 'text-slate-500' : 'text-white/50'} ${hideNumber ? 'text-base md:text-lg font-bold text-slate-800' : ''}`}>
        {label}
      </div>
      {hideNumber && subtitle && (
        <div className={`text-xs md:text-sm font-medium mt-1 ${light ? 'text-slate-400' : 'text-white/40'}`}>
          {subtitle}
        </div>
      )}
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
          <div className="relative flex items-center justify-center w-14 h-14 rounded-[16px] bg-[#030303] border border-white/10 shrink-0 overflow-hidden shadow-sm transition-all duration-300 hover:border-[#F5A800]/40">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            <Icon size={20} className="relative z-10 text-zinc-400 hover:text-[#F5A800] transition-colors duration-300" />
          </div>
          {index < 3 && (
            <div className="hidden lg:block w-16 h-px bg-gradient-to-r from-[#F5A800]/30 to-transparent" />
          )}
        </div>

        <div className="flex-1">
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
//  INLINE BRAND SVG ICONS (for brands not in react-icons/si)
// ══════════════════════════════════════════════════════════════
function AwsIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z" />
    </svg>
  );
}

function AzureIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M22.379 23.343a1.62 1.62 0 0 0 1.536-2.14v.002L17.35 1.76A1.62 1.62 0 0 0 15.816.657H8.184A1.62 1.62 0 0 0 6.65 1.76L.086 21.204a1.62 1.62 0 0 0 1.536 2.139h4.741a1.62 1.62 0 0 0 1.535-1.103l.977-2.892 4.947 3.675c.28.208.618.32.966.32m-3.084-12.531 3.624 10.739a.54.54 0 0 1-.51.713v-.001h-.03a.54.54 0 0 1-.322-.106l-9.287-6.9h4.853m6.313 7.006c.116-.326.13-.694.007-1.058L9.79 1.76a1.722 1.722 0 0 0-.007-.02h6.034a.54.54 0 0 1 .512.366l6.562 19.445a.54.54 0 0 1-.338.684z" />
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════
//  TECH STACK BADGE — compact
// ══════════════════════════════════════════════════════════════
function TechCategory({ category, icon: Icon, items }: {
  category: string; icon: React.ElementType; items: TechItem[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, ease: EASE_EXPO }}
      className="p-8 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 transition-colors duration-300"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="relative w-12 h-12 rounded-[16px] bg-[#030303] border border-white/10 flex items-center justify-center overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
          <Icon size={20} className="relative z-10 text-zinc-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{category}</h3>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {items.map((item, i) => {
          const BrandIcon = item.icon;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ delay: i * 0.1, duration: 0.4, ease: EASE_EXPO }}
              className="flex items-center gap-2.5 text-sm font-medium text-slate-500"
            >
              <div className="w-8 h-8 rounded-[10px] bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                <BrandIcon size={16} style={{ color: item.color }} />
              </div>
              <span className="leading-snug">
                {item.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
//  SERVICE CARD — Clean Minimal Design
// ══════════════════════════════════════════════════════════════
function ServiceCard({ service, index }: { service: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ delay: index * 0.08, duration: 0.6, ease: EASE_EXPO }}
      className="group"
    >
      <div className="relative flex flex-col bg-white/[0.02] border border-white/[0.06] rounded-[28px] p-7 md:p-8 overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] hover:border-white/[0.12] h-full">
        {/* Grain texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none" />

        {/* Accent border glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[28px]"
          style={{
            boxShadow: `inset 0 0 0 1px ${service.accent}25, 0 0 20px ${service.accent}08`
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-[#F5A800]">
            {service.title}
          </h3>

          {/* Highlights pills */}
          {service.highlights && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {service.highlights.map((h: string) => (
                <span
                  key={h}
                  className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md"
                  style={{ background: `${service.accent}15`, color: service.accent, border: `1px solid ${service.accent}25` }}
                >
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-white/40 text-sm leading-relaxed mb-5 flex-grow group-hover:text-white/60 transition-colors duration-300">
            {service.longDesc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {service.tags.slice(0, 4).map((tag: string) => (
              <span
                key={tag}
                className="text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest bg-white/[0.03] border border-white/[0.06] text-white/35 transition-all duration-300 group-hover:bg-white/[0.06] group-hover:border-white/[0.12] group-hover:text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Service */}
          <div className="flex items-center gap-2 pt-4 border-t border-white/5">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 transition-all duration-300 group-hover:text-[#F5A800]">
              View Service
              <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
        {/* Full-card Link overlay */}
        <Link to={service.href} className="absolute inset-0 z-20" aria-label={`View ${service.title} services`} />
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
//  PAGE
// ══════════════════════════════════════════════════════════════
export default function Services() {
  const { siteContent } = useSite();

  const displayServices = services.map(s => {
    if (siteContent?.services) {
      const match = siteContent.services.find((ms: any) => ms.id === s.id);
      if (match) {
        return { ...s, title: match.title, desc: match.desc, longDesc: match.longDesc || s.longDesc };
      }
    }
    return s;
  });

  const displayMetrics = siteContent?.byTheNumbers || defaultMetrics;

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


      {/* ══════════════════════════════════════════════════════
          HERO — dark with atmosphere glows
          ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02040a]"
      >
        {/* Clean bottom fade to next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#02040a] to-transparent z-[2] pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, filter: heroBlur }}
          className="relative z-10 container max-w-5xl mx-auto px-6 text-center pt-32 pb-24"
        >
          <TextReveal className="mb-2">
            <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-black tracking-[-0.04em] leading-[0.9] text-white">
              Enterprise Technology.
            </h1>
          </TextReveal>
          <TextReveal delay={0.15}>
            <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-black tracking-[-0.04em] leading-[0.9] mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">Production-ready systems. Built for scale.</span>
            </h1>
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE_EXPO }}
            className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-10"
          >
            We design, build, and operate enterprise software, AI systems, and cloud infrastructure for organizations that need secure, scalable technology.<br className="hidden md:block" />
            <span className="text-white/80">Engineering-led delivery teams — no outsourcing layers.</span>
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
            <CTAButton
              className="group btn-ghost text-[14px] px-8 py-4"
            >
              <span className="relative z-10">Book a strategy session</span>
            </CTAButton>
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
          SERVICES GRID — Cinematic Card Redesign
          ══════════════════════════════════════════════════════ */}
      <section id="services-grid" className="relative bg-[#02040a] py-32 overflow-hidden section-divider-dark">
        {/* Animated background — subtle glowing particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-[#F5A800]/4 blur-[180px] rounded-full" />
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#6366f1]/4 blur-[140px] rounded-full" />
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 0.5px, transparent 0.5px)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* ── Section Header ── */}
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.6)]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/60">What We Build</span>
                <span className="w-px h-3 bg-white/10" />
                <span className="text-[11px] font-bold text-[#F5A800]">6 Disciplines</span>
              </motion.div>

              <TextReveal>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.04em] leading-[0.92] mb-4">
                  Full-Spectrum <br className="hidden md:block" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">Engineering.</span>
                </h2>
              </TextReveal>

              <TextReveal delay={0.1}>
                <p className="text-white/50 text-lg md:text-xl leading-relaxed font-medium max-w-xl">
                  From architecture to deployment to ongoing operations — every capability your organization needs to build, secure, and scale.
                </p>
              </TextReveal>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              className="pb-2 hidden lg:block"
            >
              <Link
                to="/contact#inquiry"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] text-white/80 font-bold text-[13px] uppercase tracking-wider transition-all duration-300 hover:bg-white/[0.08] hover:border-[#F5A800]/30 hover:text-white"
              >
                Need a custom solution?
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* ── Services Grid — Equal-width 3-column card grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayServices.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            className="mt-12 text-center lg:hidden"
          >
            <Link
              to="/contact#inquiry"
              className="group inline-flex items-center justify-center w-full gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] text-white/80 font-bold text-[13px] uppercase tracking-wider transition-all duration-300 hover:bg-white/[0.08] hover:border-[#F5A800]/30 hover:text-white"
            >
              Need a custom solution?
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          SERVICE DETAILS — Dark
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#F5A800]/6 rounded-full blur-[140px]" />
        </div>
        <div className="container max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.6, ease: EASE_EXPO }} className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Service Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
              What Each Service <span className="text-[#F5A800]">Includes.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[24px] bg-white/[0.03] border border-white/[0.08]">
              <h3 className="text-xl font-bold text-white mb-4">Software Engineering</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Custom Web Applications</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">SaaS Platform Development</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Legacy System Modernization</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Enterprise API Architecture</span></li>
              </ul>
            </div>
            <div className="p-8 rounded-[24px] bg-white/[0.03] border border-white/[0.08]">
              <h3 className="text-xl font-bold text-white mb-4">Artificial Intelligence</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Custom LLM Integrations</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">AI Agents & Workflow Automation</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Predictive Machine Learning Models</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Computer Vision Systems</span></li>
              </ul>
            </div>
            <div className="p-8 rounded-[24px] bg-white/[0.03] border border-white/[0.08]">
              <h3 className="text-xl font-bold text-white mb-4">Cloud & DevOps</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Infrastructure as Code (IaC)</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">CI/CD Pipeline Design</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Cloud Migration Strategy</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Kubernetes & Container Orchestration</span></li>
              </ul>
            </div>
            <div className="p-8 rounded-[24px] bg-white/[0.03] border border-white/[0.08]">
              <h3 className="text-xl font-bold text-white mb-4">Cybersecurity</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Zero-Trust Architecture</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Penetration Testing</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Compliance Audits (ISO, SOC 2, HIPAA)</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Threat Monitoring & Response</span></li>
              </ul>
            </div>
            <div className="p-8 rounded-[24px] bg-white/[0.03] border border-white/[0.08]">
              <h3 className="text-xl font-bold text-white mb-4">Data Systems</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Streaming Data Pipelines</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Real-Time Analytics & BI</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Modern Data Lakes & Warehouses</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Data Governance & Access Controls</span></li>
              </ul>
            </div>
            <div className="p-8 rounded-[24px] bg-white/[0.03] border border-white/[0.08]">
              <h3 className="text-xl font-bold text-white mb-4">Managed Technology</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">24/7 Monitoring & Support</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">SLA-Backed Maintenance</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Reliability Engineering</span></li>
                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-[#F5A800]" /> <span className="text-sm font-medium text-white/50">Technical Advisory & Roadmapping</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════════════════════
          HOW WE DELIVER — Process (white bg)
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#f9f6f0] border-t border-[#e8e2d8]">
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
          TECHNOLOGY ECOSYSTEM — creamy white
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#F5A800]/4 rounded-full blur-[100px]" />
        </div>

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
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Technology Ecosystem</span>
            </div>
            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
                Modern Stack.{' '}
                <span className="text-[#F5A800]">Proven Tools.</span>
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="text-slate-500 text-lg leading-relaxed max-w-xl font-medium">
                We select the right tools for each project based on reliability, maintainability, and fit for your operating environment.
              </p>
            </TextReveal>
          </motion.div>
        </div>


        <div className="container max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techEcosystem.map((cat, i) => (
              <TechCategory key={cat.category} category={cat.category} icon={cat.icon} items={cat.items} />
            ))}
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════════════════════
          BY THE NUMBERS (dark)
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5A800]/5 via-transparent to-transparent pointer-events-none" />

        <div className="container max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">By the Numbers</span>
            </div>
            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
                Engineered for Impact.
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="text-white/50 text-lg leading-relaxed font-medium">
                Measurable results across every engagement.
              </p>
            </TextReveal>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {displayMetrics.map((metric, i) => (
              <AnimatedCounter key={metric.label} {...metric} index={i} light={false} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY NEXYOVI — Differentiators (creamy white)
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">
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
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Why Choose Us</span>
            </div>
            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
                Built{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Different.</span>
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="text-slate-600 text-lg leading-relaxed max-w-xl font-medium">
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
                  className="group p-8 rounded-[20px] bg-white border border-slate-200 hover:border-[#F5A800]/40 transition-all duration-500"
                >
                  <div className="relative w-12 h-12 rounded-[14px] bg-[#030303] border border-white/10 flex items-center justify-center mb-5 overflow-hidden shadow-sm group-hover:border-[#F5A800]/40 group-hover:scale-110 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                    <Icon size={22} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 mb-3 group-hover:text-[#F5A800] transition-colors duration-300">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>




      {/* ══════════════════════════════════════════════════════
          ENGAGEMENT MODELS
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.6, ease: EASE_EXPO }} className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">How We Partner</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Flexible <span className="text-[#F5A800]">Engagement.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 transition-colors duration-300">
              <div className="relative w-12 h-12 rounded-[16px] bg-[#030303] border border-white/10 flex items-center justify-center mb-5 overflow-hidden shadow-sm"><div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" /><Target size={20} className="relative z-10 text-zinc-400" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Project Delivery</h3>
              <p className="text-sm font-medium text-slate-500">End-to-end delivery of a specific scope with defined milestones and outcomes.</p>
            </div>
            <div className="p-8 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 transition-colors duration-300">
              <div className="relative w-12 h-12 rounded-[16px] bg-[#030303] border border-white/10 flex items-center justify-center mb-5 overflow-hidden shadow-sm"><div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" /><Users size={20} className="relative z-10 text-zinc-400" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Dedicated Teams</h3>
              <p className="text-sm font-medium text-slate-500">A scalable engineering squad embedded within your organization.</p>
            </div>
            <div className="p-8 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 transition-colors duration-300">
              <div className="relative w-12 h-12 rounded-[16px] bg-[#030303] border border-white/10 flex items-center justify-center mb-5 overflow-hidden shadow-sm"><div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" /><Lightbulb size={20} className="relative z-10 text-zinc-400" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Technical Consulting</h3>
              <p className="text-sm font-medium text-slate-500">Strategic architecture guidance and audits from our senior technical leadership.</p>
            </div>
            <div className="p-8 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 transition-colors duration-300">
              <div className="relative w-12 h-12 rounded-[16px] bg-[#030303] border border-white/10 flex items-center justify-center mb-5 overflow-hidden shadow-sm"><div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" /><Cloud size={20} className="relative z-10 text-zinc-400" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Managed Operations</h3>
              <p className="text-sm font-medium text-slate-500">24/7 proactive monitoring, infrastructure maintenance, and reliability engineering.</p>
            </div>
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
                Let's Build{' '}
                <span className="text-[#F5A800]">Your Next System</span>
              </h2>
            </TextReveal>

            <TextReveal delay={0.1}>
              <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-8 font-medium">
                Tell us about your project. We'll put together a free strategy session with a senior architect — no sales process — just technical guidance.
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
                'Free strategy session',
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
              <CTAButton
                className="group btn-gold text-[15px] px-10 py-4"
              >
                <span className="relative z-10">Book a strategy session</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              </CTAButton>
              <CTAButton
                className="group btn-ghost text-[15px] px-10 py-4"
              >
                <span className="relative z-10">Email Us Directly</span>
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
