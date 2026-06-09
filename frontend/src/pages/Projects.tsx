import { AnimatePresence, animate, motion, useInView, useMotionValue, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronRight,
  Clock,
  Cloud,
  Cpu,
  Database,
  Globe,
  Layers,
  Lock,
  ShieldCheck,
  TrendingUp,
  Users,
  Wifi,
} from 'lucide-react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { EASE_EXPO, EASE_CINEMA, staggerContainer, viewport } from '../lib/animations';
import TextReveal from '../components/TextReveal';
import { useToast } from '../context/ToastContext';

import market1 from '../assets/market/1.png';
import market2 from '../assets/market/2.png';
import market3 from '../assets/market/3.png';
import market4 from '../assets/market/4.png';
import market5 from '../assets/market/5.png';
import market6 from '../assets/market/6.png';

import locate1 from '../assets/location/1.png';
import locate2 from '../assets/location/2.png';
import locate3 from '../assets/location/3.png';
import locate4 from '../assets/location/4.png';
import locate5 from '../assets/location/5.png';
import locate6 from '../assets/location/6.png';
import locate7 from '../assets/location/7.png';

import tele1 from '../assets/tele/1.png';
import tele2 from '../assets/tele/2.png';
import tele3 from '../assets/tele/3.png';
import tele4 from '../assets/tele/4.png';

// ── Animated Counter ─────────────────────────────────────────
const Counter = ({ value, duration = 2, decimals = 0, suffix = '' }: { value: number; duration?: number; decimals?: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals) + suffix);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration, ease: 'easeOut' });
    }
  }, [isInView, value, duration, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};



// ── Types ─────────────────────────────────────────────────────
type Category = 'All' | 'Software' | 'AI Systems' | 'Infrastructure' | 'Data Systems' | 'Security';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: Category | 'AI/ML';
  tags: string[];
  icon: React.ElementType;
  color: string;
  glow: string;
  gradient: string;
  year: string;
  status: 'Live' | 'In Progress' | 'Completed';
  impact: string;
  description: string;
  metrics: { label: string; value: string }[];
  featured?: boolean;
}

// ── Data ──────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 'neural-sentinel',
    title: 'Neural Sentinel',
    subtitle: 'AI-Powered Threat Defense',
    category: 'AI Systems',
    tags: ['LLM', 'Threat Detection', 'Real-Time'],
    icon: ShieldCheck,
    color: '#F5A800',
    glow: 'rgba(245,168,0,0.15)',
    gradient: 'from-[#F5A800]/20 via-[#F5A800]/5 to-transparent',
    year: '2024',
    status: 'Live',
    impact: 'Enterprise threat prevention',
    description:
      'An autonomous defense engine trained on behavioral analysis and threat intelligence. It identifies zero-day exploits by detecting anomalous patterns in real-time network traffic.',
    metrics: [
      { label: 'Detection', value: 'Real-Time Threat Detection' },
      { label: 'Analysis', value: 'Behavioral Anomaly Analysis' },
      { label: 'Protection', value: 'Zero-Day Identification' }],
    featured: true,
  },
  {
    id: 'quantum-ledger',
    title: 'Quantum Ledger',
    subtitle: 'Post-Quantum Settlement Network',
    category: 'Data Systems',
    tags: ['Blockchain', 'Cryptography', 'Payments'],
    icon: Database,
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.15)',
    gradient: 'from-[#8b5cf6]/20 via-[#8b5cf6]/5 to-transparent',
    year: '2024',
    status: 'Live',
    impact: 'High-volume transaction processing',
    description:
      'A cryptographically hardened settlement network built for the post-quantum era. Uses lattice-based cryptography to future-proof transactions against upcoming quantum computing threats.',
    metrics: [
      { label: 'Security', value: 'Post-Quantum Cryptography' },
      { label: 'Standard', value: 'NIST Lattice L5' },
      { label: 'Integrity', value: 'Immutable Audit Trail' }],
  },
  {
    id: 'apex-cloud',
    title: 'Apex Cloud',
    subtitle: 'Global Multi-Region Infrastructure',
    category: 'Software',
    tags: ['Kubernetes', 'Multi-Region', 'Orchestration'],
    icon: Cloud,
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.15)',
    gradient: 'from-[#06b6d4]/20 via-[#06b6d4]/5 to-transparent',
    year: '2023',
    status: 'Live',
    impact: '99.99% uptime record',
    description:
      'An enterprise-grade cloud operating system enabling organizations to run workloads across 14 regions with zero vendor lock-in, automated failover, and millisecond geo-routing.',
    metrics: [
      { label: 'Architecture', value: 'Multi-Region Mesh' },
      { label: 'Failover', value: 'Automated Geo-Routing' },
      { label: 'Deployment', value: 'Zero Lock-In' }],
  },
  {
    id: 'ion-network',
    title: 'ION Network',
    subtitle: 'Metro Data Center Backbone',
    category: 'Infrastructure',
    tags: ['SD-WAN', 'Fiber', 'Low-Latency'],
    icon: Wifi,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
    gradient: 'from-[#10b981]/20 via-[#10b981]/5 to-transparent',
    year: '2024',
    status: 'In Progress',
    impact: '8 cities connected',
    description:
      'A privately operated SD-WAN backbone connecting metropolitan data centers with low-latency cross-region routing, purpose-built for latency-critical financial workloads.',
    metrics: [
      { label: 'Connectivity', value: 'SD-WAN Backbone' },
      { label: 'Latency', value: 'Sub-2ms Routing' },
      { label: 'Resilience', value: 'N+2 Redundancy' }],
  },
  {
    id: 'cipher-vault',
    title: 'CipherVault',
    subtitle: 'Cloud HSM as a Service',
    category: 'Security',
    tags: ['HSM', 'Key Management', 'FIPS 140-3'],
    icon: Lock,
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.15)',
    gradient: 'from-[#ef4444]/20 via-[#ef4444]/5 to-transparent',
    year: '2023',
    status: 'Live',
    impact: '120+ organizations secured',
    description:
      'A cloud-native HSM service replacing costly on-prem hardware. Delivers FIPS 140-3 Level 3 cryptographic operations via API — from key generation to certificate signing — at enterprise scale.',
    metrics: [
      { label: 'Compliance', value: 'FIPS 140-3 L3' },
      { label: 'Delivery', value: 'API-First HSM' },
      { label: 'Coverage', value: 'Key Mgmt & Signing' }],
  },
  {
    id: 'prism-ai',
    title: 'Prism AI',
    subtitle: 'Predictive Infrastructure Operations',
    category: 'AI Systems',
    tags: ['AI Ops', 'Predictive', 'Automation'],
    icon: Cpu,
    color: '#f97316',
    glow: 'rgba(249,115,22,0.15)',
    gradient: 'from-[#f97316]/20 via-[#f97316]/5 to-transparent',
    year: '2024',
    status: 'Live',
    impact: '$2.8M outage costs prevented',
    description:
      'A self-learning operations engine that predicts infrastructure failures before they occur. It autonomously re-routes traffic, provisions capacity, and updates runbooks — no human required.',
    metrics: [
      { label: 'Intelligence', value: 'Predictive AI Ops' },
      { label: 'Response', value: 'Auto-Remediation' },
      { label: 'Scope', value: 'Cross-Stack Coverage' }],
  },
  {
    id: 'pharmaflow',
    title: 'PharmaFlow',
    subtitle: 'Pharmacy & Prescription Management',
    category: 'Data Systems',
    tags: ['Inventory', 'HIPAA', 'Analytics'],
    icon: Layers,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
    gradient: 'from-[#10b981]/20 via-[#10b981]/5 to-transparent',
    year: '2024',
    status: 'Live',
    impact: '200+ pharmacies onboarded',
    description:
      'A comprehensive pharmacy management system handling inventory tracking, prescription fulfillment, regulatory compliance, and patient records. Built with HIPAA-compliant architecture and real-time stock alerts for operational efficiency.',
    metrics: [
      { label: 'Pharmacies', value: '200+' },
      { label: 'Rx Processed/mo', value: '50K+' },
      { label: 'Stock Accuracy', value: '99.8%' }],
  },
  {
    id: 'stockvue',
    title: 'StockVue',
    subtitle: 'Real-Time Inventory Management',
    category: 'Software',
    tags: ['Real-Time', 'Analytics', 'Automation'],
    icon: Clock,
    color: '#f97316',
    glow: 'rgba(249,115,22,0.15)',
    gradient: 'from-[#f97316]/20 via-[#f97316]/5 to-transparent',
    year: '2024',
    status: 'Live',
    impact: '40% reduction in stockouts',
    description:
      'A real-time inventory and stock management platform for retail and warehouse operations. Provides multi-warehouse tracking, automated reordering based on demand forecasting, and comprehensive analytics dashboards.',
    metrics: [
      { label: 'Stockouts Reduced', value: '40%' },
      { label: 'SKUs Tracked', value: '1M+' },
      { label: 'Warehouses', value: '50+' }],
  },
  {
    id: 'biteorder',
    title: 'BiteOrder',
    subtitle: 'Restaurant Website & Online Ordering',
    category: 'Software',
    tags: ['Online Ordering', 'Reservations', 'POS'],
    icon: TrendingUp,
    color: '#14b8a6',
    glow: 'rgba(20,184,166,0.15)',
    gradient: 'from-[#14b8a6]/20 via-[#14b8a6]/5 to-transparent',
    year: '2024',
    status: 'Live',
    impact: '300+ restaurant partners',
    description:
      'A complete restaurant digital platform featuring custom websites, online ordering, table reservations, and POS integration. Includes real-time order tracking, menu management, and customer analytics for hospitality businesses.',
    metrics: [
      { label: 'Restaurants', value: '300+' },
      { label: 'Orders/mo', value: '120K+' },
      { label: 'Revenue Increase', value: '35%' }],
  },
  {
    id: 'tablereserve',
    title: 'TableReserve',
    subtitle: 'Smart Reservation & Booking System',
    category: 'Software',
    tags: ['Booking', 'CRM', 'Calendar'],
    icon: Users,
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.15)',
    gradient: 'from-[#ec4899]/20 via-[#ec4899]/5 to-transparent',
    year: '2024',
    status: 'Live',
    impact: '1M+ reservations managed',
    description:
      'An intelligent reservation and booking management system for restaurants, hotels, and event venues. Features real-time availability, automated reminders, waitlist management, and comprehensive customer relationship tools.',
    metrics: [
      { label: 'Reservations', value: '1M+' },
      { label: 'Venues', value: '500+' },
      { label: 'No-Show Rate', value: '<4%' }],
  },
];

// ── Sub-components ────────────────────────────────────────────

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const Icon = project.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_EXPO, delay: index * 0.06 } },
      }}
      className="group relative rounded-[28px] overflow-hidden border border-slate-200 bg-white transition-all duration-500 cursor-pointer"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        transform: isHovered
          ? `rotateX(${mousePos.y * -6}deg) rotateY(${mousePos.x * 6}deg) translateY(-8px)`
          : 'rotateX(0deg) rotateY(0deg) translateY(0px)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Gradient wash */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 pointer-events-none`} />

      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative w-11 h-11 rounded-[14px] bg-[#030303] border border-white/10 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-[#F5A800]/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            <Icon size={18} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors duration-300" />
          </motion.div>
        </div>

        {/* Category + Year */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: project.color }}>
            {project.category}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight mb-1 leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 font-medium mb-4">{project.subtitle}</p>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Metrics strip */}
        <div className="flex flex-col gap-2 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#F5A800] shrink-0" />
              <span className="text-sm font-semibold text-slate-700">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Impact + CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <motion.div className="flex items-center gap-2" whileHover={{ x: 3 }}>
            <TrendingUp size={12} style={{ color: project.color }} />
            <span className="text-[11px] font-bold text-slate-500">{project.impact}</span>
          </motion.div>
          <Link
            to={`/projects/${project.id}`}
            className="group/btn flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest transition-all duration-300"
            style={{ color: project.color }}
          >
            View Project
            <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// ── Draggable Slider ──────────────────────────────────────────
const DraggableSlider = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    ref.current.dataset.isDown = 'true';
    ref.current.style.cursor = 'grabbing';
    ref.current.dataset.startX = (e.pageX - ref.current.offsetLeft).toString();
    ref.current.dataset.scrollLeft = ref.current.scrollLeft.toString();
  };
  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.dataset.isDown = 'false';
    ref.current.style.cursor = 'grab';
  };
  const onMouseUp = () => {
    if (!ref.current) return;
    ref.current.dataset.isDown = 'false';
    ref.current.style.cursor = 'grab';
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || ref.current.dataset.isDown !== 'true') return;
    e.preventDefault();
    const startX = parseFloat(ref.current.dataset.startX || '0');
    const scrollLeft = parseFloat(ref.current.dataset.scrollLeft || '0');
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 3;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      style={{
        cursor: 'grab',
        maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
      }}
      className={`flex overflow-x-auto gap-2 pb-4 px-4 w-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${className || ''}`}
    >
      {children}
    </div>
  );
};

// ── FeatureItem ───────────────────────────────────────────────
const FeatureItem = ({ icon, label }: { icon: string; label: string }) => (
  <motion.div
    whileHover={{ x: 6 }}
    className="flex items-center gap-3 hover:-translate-y-0.5 transition-transform"
  >
    <div className="relative w-9 h-9 rounded-xl bg-[#030303] border border-white/10 flex items-center justify-center text-base shrink-0 overflow-hidden shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
      <span className="relative z-10 text-zinc-400">{icon}</span>
    </div>
    <span className="text-white/60 font-semibold text-sm">{label}</span>
  </motion.div>
);

// ── StoreButton ───────────────────────────────────────────────
const StoreButton = ({ dark = false, platform = 'app-store' }: { dark?: boolean; platform: 'app-store' | 'google-play' }) => {
  const isGoogle = platform === 'google-play';
  const bg = isGoogle ? 'bg-slate-900 text-white' : dark ? 'bg-white/10 border border-white/20' : 'bg-black text-white';
  const textColor = isGoogle ? 'text-white' : dark ? 'text-white' : 'text-white';
  const { toast } = useToast();

  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        toast(`Opening in ${isGoogle ? 'Google Play Store' : 'App Store'}...`, 'info');
      }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm select-none ${bg} ${textColor}`}
    >
      {isGoogle ? (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.18 23.76c.35.2.75.21 1.12.02l12.6-7.16-2.85-2.87L3.18 23.76zM.5 1.63C.19 1.99 0 2.52 0 3.21v17.57c0 .7.19 1.22.5 1.58l.08.08 9.85-9.85v-.23L.58 1.55.5 1.63zM20.52 10.7l-2.6-1.48-3.18 3.18 3.18 3.18 2.62-1.49c.75-.43.75-1.12 0-1.53l-.02.14zM4.3.24L16.9 7.4l-2.85 2.85L3.18.26C3.54.07 3.94.08 4.3.24z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      )}
      <div className="text-left leading-tight">
        <div className="text-[9px] font-medium opacity-70">{isGoogle ? 'GET IT ON' : 'Download on the'}</div>
        <div className="text-[13px] font-black tracking-tight">{isGoogle ? 'Google Play' : 'App Store'}</div>
      </div>
    </motion.button>
  );
};

// ══════════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════════



// ══════════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════════

export default function Projects() {


  // ── Filter State ──
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const filterLabels = ['All', 'Software', 'AI', 'Data', 'Infrastructure', 'Security'];

  const categoryMap: Record<string, string> = {
    'AI Systems': 'AI',
    'Software': 'Software',
    'Data Systems': 'Data',
    'Infrastructure': 'Infrastructure',
    'Security': 'Security',
  };

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => categoryMap[p.category] === activeFilter);


  // ── Hero Parallax (matching Services page) ──
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.8], ['blur(0px)', 'blur(6px)']);

  // ── Stats ──
  const stats = [
    { label: 'Projects Delivered', value: 50, suffix: '+' },
    { label: 'Organizations Served', value: 20, suffix: '+' },
    { label: 'Industries', value: 8, suffix: '' },
    { label: 'Service Verticals', value: 6, suffix: '+' },
  ];

  return (
    <div className="bg-[#02040a] min-h-screen text-white font-sans selection:bg-[#F5A800]/30 overflow-x-clip">


      {/* ═══════════════════════════════════════════════════════════
          HERO — Matching Services Page Style
          ═══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02040a]"
      >
        {/* Clean bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#02040a] to-transparent z-[2] pointer-events-none" />

        {/* ── Main Hero Content ── */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, filter: heroBlur }}
          className="relative z-10 container max-w-5xl mx-auto px-6 text-center pt-32 pb-24"
        >
          {/* Headline — TextReveal split into two lines (matching Services) */}
          <TextReveal className="mb-2">
            <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-black tracking-[-0.04em] leading-[0.9] text-white">
              Engineering the{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">
                Future,
              </span>
            </h1>
          </TextReveal>
          <TextReveal delay={0.15}>
            <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-black tracking-[-0.04em] leading-[0.9] mb-6">
              <span className="text-white/20">One Reference at a Time.</span>
            </h1>
          </TextReveal>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE_EXPO }}
            className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-10"
          >
            From AI-powered defense platforms to post-quantum settlement networks — explore our reference architectures and production applications.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: EASE_EXPO }}
            className="flex flex-wrap items-center justify-center gap-4 mb-20"
          >
            <Link to="/contact#inquiry" className="group btn-gold text-[14px] px-8 py-4">
              <span className="relative z-10">Book a strategy session</span>
              <ChevronRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/projects" className="group btn-ghost text-[14px] px-8 py-4">
              <span className="relative z-10">Case Studies</span>
              <ArrowUpRight size={14} className="relative z-10" />
            </Link>
          </motion.div>

          {/* ── Floating Stat Pills ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: EASE_EXPO }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { val: 24, suffix: '/7', label: 'Monitoring & Support', color: '#10b981' },
              { val: 8, suffix: '', label: 'Industries Served', color: '#F5A800' },
              { val: 6, suffix: '+', label: 'Service Verticals', color: '#8b5cf6' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4 + i * 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
                whileHover={{ scale: 1.05, y: -12 }}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-xl transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-baseline gap-0.5">
                  <span className="text-lg font-black" style={{ color: item.color }}>
                    <Counter value={item.val} suffix={item.suffix} duration={2.5} />
                  </span>
                </div>
                <span className="text-[11px] text-white/40 font-bold uppercase tracking-wider">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator — matching Services */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STATS BAR — Animated Counters
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-white/[0.05] py-16 bg-[#02040a]">
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat) => {
              return (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_EXPO } },
                  }}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">
                    <Counter value={stat.value} duration={2.5} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          REFERENCE ARCHITECTURES
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-28 bg-[#FCFBF8] border-t border-slate-200">
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Reference Architectures</span>
            </motion.div>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE_EXPO } },
              }}
              className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight"
            >
              Engineering
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] to-[#FFD166]"> Patterns</span>
              <span className="text-slate-400 text-lg md:text-xl font-medium block mt-2 max-w-2xl">Reference architectures we reuse across client engagements — proven patterns for AI security, post-quantum cryptography, multi-region infrastructure, and more.</span>
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
              }}
              className="text-slate-400 text-sm leading-relaxed mt-6 max-w-3xl border-l-2 border-[#F5A800]/30 pl-4"
            >
              These reference architectures represent engineering patterns, system designs, and solution blueprints that inform our client engagements. They are included to demonstrate technical capabilities and architectural approaches.
            </motion.p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE_EXPO }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {filterLabels.map((label) => (
              <button
                key={label}
                onClick={() => setActiveFilter(label)}
                className={`px-4 py-2 rounded-[10px] text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === label
                    ? 'bg-[#F5A800] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-500 hover:border-[#F5A800]/40 hover:text-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {PROJECTS.filter(p => !['pharmaflow', 'stockvue', 'biteorder', 'tablereserve'].includes(p.id) && (activeFilter === 'All' || categoryMap[p.category] === activeFilter)).map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURED CLIENT SOLUTIONS
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-28 bg-[#FCFBF8] border-t border-slate-200">
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Featured Client Solutions</span>
            </motion.div>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE_EXPO } },
              }}
              className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight"
            >
              Products Built by{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Nexyovi</span>
            </motion.h2>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {PROJECTS.filter(p => ['pharmaflow', 'stockvue', 'biteorder', 'tablereserve'].includes(p.id)).map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURED PRODUCT: NEXI MARKETS
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden border-t border-white/10 bg-[#02040a]">
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* LEFT: Screens */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative flex items-center order-2 lg:order-1"
            >
              <DraggableSlider className="-mx-4 md:-mx-8 lg:!w-[calc(100%+50vw)] lg:-ml-[50vw] lg:pl-[50vw]">
                {[market1, market2, market3, market4, market5, market6].map((img, i) => (
                  <motion.img
                    key={i}
                    src={img}
                    draggable={false}
                    className="w-[280px] xl:w-[320px] 2xl:w-[360px] h-auto object-contain shrink-0 snap-center rounded-2xl"
                    whileHover={{ scale: 1.04, y: -8 }}
                    transition={{ duration: 0.25 }}
                    alt={`Nexi Market Screen ${i + 1}`}
                  />
                ))}
              </DraggableSlider>
            </motion.div>

            {/* RIGHT: Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
              className="flex flex-col order-1 lg:order-2"
            >
              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EXPO } },
              }} className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Nexyovi</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.95] tracking-tight">
                  Nexi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Markets</span>
                </h2>
                <p className="text-white/40 text-xl font-semibold mt-3 leading-snug">
                  Everything you need.<br />Delivered to you.
                </p>
              </motion.div>

              <motion.p variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.05, ease: EASE_EXPO } },
              }} className="text-white/50 text-base leading-relaxed mb-6 max-w-md">
                Nexi Markets is your all-in-one shopping destination offering millions of products across categories with fast delivery, secure payments, and unbeatable deals.
              </motion.p>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1, ease: EASE_EXPO } },
              }} className="flex gap-3 mb-6 flex-wrap">
                {[
                  { icon: '📦', label: 'Millions of Products' }, { icon: '🚚', label: 'Fast Delivery' },
                  { icon: '🔒', label: 'Secure Payments' }, { icon: '⭐', label: '4.8/5 Rating' },
                ].map((cat) => (
                  <motion.div
                    key={cat.label}
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="relative w-10 h-10 rounded-2xl bg-[#030303] border border-white/10 flex items-center justify-center text-lg group-hover:border-[#F5A800]/40 transition-all duration-300 cursor-default overflow-hidden shadow-sm">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                      <span className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors">{cat.icon}</span>
                    </div>
                    <span className="text-white/40 text-[9px] font-bold">{cat.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.15, ease: EASE_EXPO } },
              }} className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: '🛒', title: 'Millions of Products', desc: 'Shop across dozens of categories.' },
                  { icon: '🚚', title: 'Fast Delivery', desc: 'Reliable shipping right to your door.' },
                  { icon: '🔒', title: 'Secure Payments', desc: 'Protected transactions every time.' },
                  { icon: '🇪🇹', title: 'Built for Ethiopia', desc: 'Tailored for local needs.' },
                ].map((f) => (
                  <motion.div
                    key={f.title}
                    whileHover={{ y: -4, borderColor: '#F5A800' }}
                    className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-[#F5A800]/5 transition-all duration-300"
                  >
                    <span className="text-lg">{f.icon}</span>
                    <p className="text-white font-bold text-[12px] mt-1 mb-0.5">{f.title}</p>
                    <p className="text-white/50 text-[10px] leading-snug">{f.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.18, ease: EASE_EXPO } },
              }} className="flex flex-wrap gap-2 mb-6">
                {['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/50">{tech}</span>
                ))}
              </motion.div>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: EASE_EXPO } },
              }} className="flex flex-wrap gap-3">
                <StoreButton platform="app-store" />
                <StoreButton platform="google-play" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURED PRODUCT: NEXI LOCATE
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden border-t border-white/10 bg-[#02040a]">
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* LEFT: Screens */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative flex items-center order-2 lg:order-1"
            >
              <DraggableSlider className="-mx-4 md:-mx-8 lg:!w-[calc(100%+50vw)] lg:-ml-[50vw] lg:pl-[50vw]">
                {[locate1, locate2, locate3, locate4, locate5, locate6, locate7].map((img, i) => (
                  <motion.img
                    key={i}
                    src={img}
                    draggable={false}
                    className="w-[280px] xl:w-[320px] 2xl:w-[360px] h-auto object-contain shrink-0 snap-center rounded-2xl"
                    whileHover={{ scale: 1.04, y: -8 }}
                    transition={{ duration: 0.25 }}
                    alt={`Nexi Locate Screen ${i + 1}`}
                  />
                ))}
              </DraggableSlider>
            </motion.div>

            {/* RIGHT: Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
              className="flex flex-col order-1 lg:order-2"
            >
              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EXPO } },
              }} className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Nexyovi</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.95] tracking-tight">
                  Nexi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] to-[#f59e0b]">Locate</span>
                </h2>
                <p className="text-white/40 text-xl font-semibold mt-3 leading-snug">
                  Explore. Discover.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] to-[#f59e0b]">Experience Addis.</span>
                </p>
              </motion.div>

              <motion.p variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.05, ease: EASE_EXPO } },
              }} className="text-white/50 text-base leading-relaxed mb-6 max-w-md">
                Nexi Locate helps you discover the best places near you in Addis Ababa. Restaurants, cafes, hotels, gyms, clubs, spots and more. Rate, review and share your favorite places.
              </motion.p>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1, ease: EASE_EXPO } },
              }} className="flex gap-3 mb-6 flex-wrap">
                {[
                  { icon: '🍽', label: 'Restaurants' }, { icon: '☕', label: 'Cafes' },
                  { icon: '🏨', label: 'Hotels' }, { icon: '💪', label: 'Gyms' },
                  { icon: '📍', label: 'Spots' }, { icon: '🎵', label: 'Fun & Clubs' },
                ].map((cat) => (
                  <motion.div
                    key={cat.label}
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="relative w-10 h-10 rounded-2xl bg-[#030303] border border-white/10 flex items-center justify-center text-lg group-hover:border-[#ea580c]/40 transition-all duration-300 cursor-default overflow-hidden shadow-sm">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                      <span className="relative z-10 text-zinc-400 group-hover:text-[#ea580c] transition-colors">{cat.icon}</span>
                    </div>
                    <span className="text-white/40 text-[9px] font-bold">{cat.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.15, ease: EASE_EXPO } },
              }} className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: '📍', title: 'Discover Nearby', desc: 'Find the best places around you.' },
                  { icon: '➕', title: 'Add Your Places', desc: 'Add favorites for others to discover.' },
                  { icon: '⭐', title: 'Rate & Review', desc: 'Share your experience.' },
                  { icon: '🇪🇹', title: 'Built for Ethiopia', desc: 'Made for Addis Ababa.' },
                ].map((f) => (
                  <motion.div
                    key={f.title}
                    whileHover={{ y: -4, borderColor: '#ea580c' }}
                    className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-[#ea580c]/5 transition-all duration-300"
                  >
                    <span className="text-lg">{f.icon}</span>
                    <p className="text-white font-bold text-[12px] mt-1 mb-0.5">{f.title}</p>
                    <p className="text-white/50 text-[10px] leading-snug">{f.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.18, ease: EASE_EXPO } },
              }} className="flex flex-wrap gap-2 mb-6">
                {['React Native', 'Node.js', 'PostGIS', 'Google Maps API'].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/50">{tech}</span>
                ))}
              </motion.div>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.18, ease: EASE_EXPO } },
              }} className="flex flex-wrap gap-2 mb-6">
                {['React', 'WebRTC', 'FastAPI', 'PostgreSQL'].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/50">{tech}</span>
                ))}
              </motion.div>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: EASE_EXPO } },
              }} className="flex flex-wrap gap-3">
                <StoreButton platform="app-store" />
                <StoreButton platform="google-play" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURED PRODUCT: TELE-PSYCHIATRY
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden border-t border-white/10 bg-[#02040a]">
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* LEFT: Screens */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative flex items-center order-2 lg:order-1"
            >
              <DraggableSlider className="-mx-4 md:-mx-8 lg:!w-[calc(100%+50vw)] lg:-ml-[50vw] lg:pl-[50vw]">
                {[tele1, tele2, tele3, tele4].map((img, i) => (
                  <motion.img
                    key={i}
                    src={img}
                    draggable={false}
                    className="w-[280px] xl:w-[320px] 2xl:w-[360px] h-auto object-contain shrink-0 snap-center rounded-2xl"
                    whileHover={{ scale: 1.04, y: -8 }}
                    transition={{ duration: 0.25 }}
                    alt={`Tele-Psychiatry Screen ${i + 1}`}
                  />
                ))}
              </DraggableSlider>
            </motion.div>

            {/* RIGHT: Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
              className="flex flex-col order-1 lg:order-2"
            >
              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EXPO } },
              }} className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Nexyovi</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d9488] to-[#2dd4bf] flex items-center justify-center text-lg"
                  >🧠</motion.div>
                  <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.95] tracking-tight">
                    Tele-<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d9488] to-[#2dd4bf]">Psychiatry</span>
                  </h2>
                </div>
                <p className="text-white/40 text-xl font-semibold mt-1 leading-snug">
                  Your Mental Well-being,<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d9488] to-[#2dd4bf]">Our Priority.</span>
                </p>
              </motion.div>

              <motion.p variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.05, ease: EASE_EXPO } },
              }} className="text-white/50 text-base leading-relaxed mb-6 max-w-md">
                Connect with licensed psychiatrists and therapists across Ethiopia through secure online consultations.
              </motion.p>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1, ease: EASE_EXPO } },
              }} className="flex gap-3 mb-6 flex-wrap">
                {[
                  { icon: '📹', label: 'Online Consultations' }, { icon: '📅', label: 'Easy Appointments' },
                  { icon: '🔒', label: 'Private & Secure' }, { icon: '👨‍⚕️', label: 'Wide Range' },
                  { icon: '💬', label: '24/7 Support' },
                ].map((cat) => (
                  <motion.div
                    key={cat.label}
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="relative w-10 h-10 rounded-2xl bg-[#030303] border border-white/10 flex items-center justify-center text-lg group-hover:border-[#0d9488]/40 transition-all duration-300 cursor-default overflow-hidden shadow-sm">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                      <span className="relative z-10 text-zinc-400 group-hover:text-[#0d9488] transition-colors">{cat.icon}</span>
                    </div>
                    <span className="text-white/40 text-[9px] font-bold">{cat.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.15, ease: EASE_EXPO } },
              }} className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: '🇪🇹', title: 'Built for Ethiopia', desc: 'Made for Ethiopian patients and providers.' },
                  { icon: '🛡️', title: '100% Confidential', desc: 'Your privacy is protected by design.' },
                  { icon: '📹', title: 'Video Consultations', desc: 'Face-to-face care from anywhere.' },
                  { icon: '📅', title: 'Flexible Scheduling', desc: 'Book appointments that work for you.' },
                ].map((f) => (
                  <motion.div
                    key={f.title}
                    whileHover={{ y: -4, borderColor: '#0d9488' }}
                    className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-[#0d9488]/5 transition-all duration-300"
                  >
                    <span className="text-lg">{f.icon}</span>
                    <p className="text-white font-bold text-[12px] mt-1 mb-0.5">{f.title}</p>
                    <p className="text-white/50 text-[10px] leading-snug">{f.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: EASE_EXPO } },
              }} className="flex flex-wrap gap-3">
                <StoreButton platform="app-store" />
                <StoreButton platform="google-play" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA SECTION — Dark
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#02040a] border-t border-white/5 overflow-hidden section-divider-dark">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#F5A800]/8 blur-[140px] rounded-full" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#F5A800]/20 backdrop-blur-md mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.6)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A800]">Let's Build Together</span>
            </motion.div>

            <TextReveal>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] mb-8 text-white">
                Start an{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Engineering Strategy</span>
                <br />
                Session
              </h2>
            </TextReveal>

            <TextReveal delay={0.1}>
              <p className="text-white/50 text-lg leading-relaxed mb-12 max-w-xl font-medium">
                Meet directly with a senior architect to review requirements, identify risks, and outline the fastest path to production.
              </p>
            </TextReveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6, ease: EASE_EXPO }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link to="/contact#inquiry" className="group btn-gold text-[14px] px-8 py-4">
                <span className="relative z-10">Book a strategy session</span>
                <ChevronRight size={14} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
              <Link to="/services" className="group btn-ghost text-[14px] px-8 py-4">
                <span className="relative z-10">Explore Services</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
