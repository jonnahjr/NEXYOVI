import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  ChevronRight,
  Clock,
  Cloud,
  Cpu,
  Database,
  Globe,
  GraduationCap,
  HeartPulse,
  Layers,
  Lock,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Stethoscope,
  TrendingUp,
  Truck,
  Users,
  Wifi,
} from 'lucide-react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { EASE_EXPO, EASE_CINEMA, staggerContainer, viewport } from '../lib/animations';
import TextReveal from '../components/TextReveal';
import { useToast } from '../context/ToastContext';

import market1 from '../assets/market/1.webp';
import market2 from '../assets/market/2.webp';
import market3 from '../assets/market/3.webp';
import market4 from '../assets/market/4.webp';
import market5 from '../assets/market/5.webp';
import market6 from '../assets/market/6.webp';

import locate1 from '../assets/location/1.webp';
import locate2 from '../assets/location/2.webp';
import locate3 from '../assets/location/3.webp';
import locate4 from '../assets/location/4.webp';
import locate5 from '../assets/location/5.webp';
import locate6 from '../assets/location/6.webp';
import locate7 from '../assets/location/7.webp';

import tele1 from '../assets/tele/1.webp';
import tele2 from '../assets/tele/2.webp';
import tele3 from '../assets/tele/3.webp';
import tele4 from '../assets/tele/4.webp';

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

// ── Project Color Mapping (Light/Dark Theme Support) ──────────
const projectColorMap: Record<string, { light: { accent: string; bg: string; border: string; icon: string }; dark: { accent: string; bg: string; border: string; icon: string } }> = {
  'neural-sentinel': {
    light: { accent: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600' },
    dark: { accent: 'dark:text-amber-400', bg: 'dark:bg-amber-950/20', border: 'dark:border-amber-900', icon: 'dark:text-amber-400' }
  },
  'quantum-ledger': {
    light: { accent: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600' },
    dark: { accent: 'dark:text-purple-400', bg: 'dark:bg-purple-950/20', border: 'dark:border-purple-900', icon: 'dark:text-purple-400' }
  },
  'apex-cloud': {
    light: { accent: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200', icon: 'text-cyan-600' },
    dark: { accent: 'dark:text-cyan-400', bg: 'dark:bg-cyan-950/20', border: 'dark:border-cyan-900', icon: 'dark:text-cyan-400' }
  },
  'ion-network': {
    light: { accent: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600' },
    dark: { accent: 'dark:text-emerald-400', bg: 'dark:bg-emerald-950/20', border: 'dark:border-emerald-900', icon: 'dark:text-emerald-400' }
  },
  'cipher-vault': {
    light: { accent: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600' },
    dark: { accent: 'dark:text-red-400', bg: 'dark:bg-red-950/20', border: 'dark:border-red-900', icon: 'dark:text-red-400' }
  },
  'prism-ai': {
    light: { accent: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600' },
    dark: { accent: 'dark:text-orange-400', bg: 'dark:bg-orange-950/20', border: 'dark:border-orange-900', icon: 'dark:text-orange-400' }
  },
  'pharmaflow': {
    light: { accent: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600' },
    dark: { accent: 'dark:text-emerald-400', bg: 'dark:bg-emerald-950/20', border: 'dark:border-emerald-900', icon: 'dark:text-emerald-400' }
  },
  'stockvue': {
    light: { accent: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600' },
    dark: { accent: 'dark:text-orange-400', bg: 'dark:bg-orange-950/20', border: 'dark:border-orange-900', icon: 'dark:text-orange-400' }
  },
  'biteorder': {
    light: { accent: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', icon: 'text-teal-600' },
    dark: { accent: 'dark:text-teal-400', bg: 'dark:bg-teal-950/20', border: 'dark:border-teal-900', icon: 'dark:text-teal-400' }
  },
  'tablereserve': {
    light: { accent: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-200', icon: 'text-pink-600' },
    dark: { accent: 'dark:text-pink-400', bg: 'dark:bg-pink-950/20', border: 'dark:border-pink-900', icon: 'dark:text-pink-400' }
  },
};

function getProjectColorClass(projectId: string): string {
  const colors = projectColorMap[projectId] || projectColorMap['neural-sentinel'];
  return `${colors.light.bg} ${colors.dark.bg}`;
}

function getProjectAccentClass(projectId: string): string {
  const colors = projectColorMap[projectId] || projectColorMap['neural-sentinel'];
  return `${colors.light.accent} ${colors.dark.accent}`;
}

function getProjectBorderClass(projectId: string): string {
  const colors = projectColorMap[projectId] || projectColorMap['neural-sentinel'];
  return `${colors.light.border} ${colors.dark.border}`;
}

function getProjectIconClass(projectId: string): string {
  const colors = projectColorMap[projectId] || projectColorMap['neural-sentinel'];
  return `${colors.light.icon} ${colors.dark.icon}`;
}

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
      className="group relative rounded-[28px] overflow-hidden border bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 transition-all duration-500 cursor-pointer"
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
            className={`relative w-11 h-11 rounded-[14px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden shadow-sm transition-all duration-300 ${getProjectBorderClass(project.id)}`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            <Icon size={18} className={`relative z-10 text-slate-400 dark:text-slate-500 group-hover:${getProjectIconClass(project.id)} transition-colors duration-300`} />
          </motion.div>
        </div>

        {/* Category + Year */}
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${getProjectAccentClass(project.id)}`}>
            {project.category}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-black text-slate-950 dark:text-white tracking-tight mb-1 leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-4">{project.subtitle}</p>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Metrics strip */}
        <div className={`flex flex-col gap-2 mb-6 p-4 rounded-2xl ${getProjectColorClass(project.id)} border ${getProjectBorderClass(project.id)}`}>
          {project.metrics.map((m) => (
            <div key={m.label} className="flex items-center gap-2">
              <div className={`w-1 h-1 rounded-full ${getProjectAccentClass(project.id)} shrink-0`} />
              <span className={`text-sm font-semibold text-slate-700 dark:text-slate-300`}>{m.value}</span>
            </div>
          ))}
        </div>

        {/* Impact + CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
          <motion.div className="flex items-center gap-2" whileHover={{ x: 3 }}>
            <TrendingUp size={12} className={getProjectAccentClass(project.id)} />
            <span className={`text-[11px] font-bold ${getProjectAccentClass(project.id)}`}>{project.impact}</span>
          </motion.div>
          <Link
            to={`/projects/${project.id}`}
            className={`group/btn flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${getProjectAccentClass(project.id)}`}
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
    <div className="bg-white dark:bg-[#02040a] min-h-screen text-slate-950 dark:text-white font-sans selection:bg-amber-600/30 dark:selection:bg-amber-400/30 overflow-x-clip transition-colors duration-300">


      {/* ═══════════════════════════════════════════════════════════
          HERO — Matching Services Page Style
          ═══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="dark relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02040a] transition-colors duration-300"
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
            <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-black tracking-[-0.04em] leading-[0.9] text-slate-950 dark:text-white">
              Engineering the{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 dark:from-amber-400 via-amber-500 dark:via-amber-300 to-amber-600 dark:to-amber-400">
                Future,
              </span>
            </h1>
          </TextReveal>
          <TextReveal delay={0.15}>
            <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-black tracking-[-0.04em] leading-[0.9] mb-6">
              <span className="text-slate-400 dark:text-white/20">One Reference at a Time.</span>
            </h1>
          </TextReveal>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE_EXPO }}
            className="text-slate-600 dark:text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-10"
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

          {/* ── Stat Text — Company Hero style ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: EASE_EXPO }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-slate-200 dark:border-white/10 pt-8"
          >
            {[
              { val: 24, suffix: '/7', label: 'Monitoring & Support' },
              { val: 8, suffix: '', label: 'Industries Served' },
              { val: 6, suffix: '+', label: 'Service Verticals' },
            ].map((item) => (
              <span key={item.label} className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-600 dark:text-white/60">
                <Counter value={item.val} suffix={item.suffix} duration={2.5} />{' '}{item.label}
              </span>
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
      <section className="relative overflow-hidden border-t border-slate-200 dark:border-white/[0.05] py-16 bg-slate-50 dark:bg-[#02040a] transition-colors duration-300">
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
                  <div className="text-2xl md:text-3xl font-black text-slate-950 dark:text-white mb-1">
                    <Counter value={stat.value} duration={2.5} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-white/40">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SOLUTION PORTFOLIO — Products & Platforms Grid
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.5px, transparent 0.5px)', backgroundSize: '28px 28px' }} />
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="max-w-2xl mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Solution Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-6">
              Products & Platforms{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">Built by Nexyovi.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              { name: 'AI Business OS (ERP + CRM + POS)', icon: Briefcase, desc: 'Unified business operating system combining ERP, CRM, and POS into a single AI-powered platform for end-to-end operational management.', tags: ['ERP', 'CRM', 'POS'] },
              { name: 'AI Healthcare Platform', icon: HeartPulse, desc: 'Intelligent healthcare platform integrating clinical workflows, diagnostics, patient records, and telehealth with AI-driven decision support.', tags: ['AI Diagnostics', 'Clinical', 'Telehealth'] },
              { name: 'Government Digital Platform', icon: Building2, desc: 'Sovereign digital infrastructure for citizen services, identity management, e-governance, and secure public sector operations.', tags: ['E-Gov', 'Digital ID', 'Citizen Services'] },
              { name: 'AI Accounting Platform', icon: TrendingUp, desc: 'Automated accounting and financial management platform with AI-powered reconciliation, reporting, and compliance monitoring.', tags: ['Automation', 'Reconciliation', 'Compliance'] },
              { name: 'Construction ERP', icon: Building2, desc: 'Enterprise resource planning tailored for construction — project costing, subcontractor management, materials tracking, and compliance.', tags: ['Project Costing', 'Subcontractor', 'Compliance'] },
              { name: 'Manufacturing ERP', icon: Cpu, desc: 'Full-featured ERP for manufacturing operations including MRP, shop floor control, quality management, and supply chain integration.', tags: ['MRP', 'Shop Floor', 'Quality Mgmt'] },
              { name: 'Logistics Platform', icon: Truck, desc: 'End-to-end logistics management platform with real-time tracking, route optimization, carrier management, and delivery analytics.', tags: ['Tracking', 'Route Optimization', 'Carrier Mgmt'] },
              { name: 'Agriculture AI Platform', icon: Sprout, desc: 'AI-powered precision agriculture platform for crop monitoring, yield prediction, resource optimization, and supply chain traceability.', tags: ['Precision Ag', 'Yield Prediction', 'Traceability'] },
              { name: 'B2B Marketplace', icon: Globe, desc: 'Multi-vendor B2B marketplace platform with catalog management, procurement workflows, payment processing, and seller analytics.', tags: ['Multi-Vendor', 'Procurement', 'Payments'] },
              { name: 'Hospital Information System (HIS)', icon: Stethoscope, desc: 'Comprehensive HIS covering patient management, EHR, billing, pharmacy, lab, radiology, and clinical decision support.', tags: ['EHR', 'Patient Mgmt', 'Clinical'] },
              { name: 'Digital Pharmacy', icon: HeartPulse, desc: 'End-to-end digital pharmacy platform with prescription management, inventory tracking, refill automation, and patient engagement.', tags: ['Prescriptions', 'Inventory', 'Refill Auto'] },
              { name: 'School ERP', icon: GraduationCap, desc: 'Complete school management system with student info, attendance, grading, timetable, fee management, and parent communication.', tags: ['Student Info', 'Grading', 'Parent Portal'] },
              { name: 'Telepsychiatry Platform', icon: Globe, desc: 'HIPAA-compliant telepsychiatry platform with video consultations, e-prescribing, scheduling, and integrated patient records.', tags: ['Telehealth', 'E-Prescribing', 'Scheduling'] },
              { name: 'Fleet Management System', icon: Truck, desc: 'Real-time fleet tracking, maintenance scheduling, fuel management, driver performance monitoring, and compliance reporting.', tags: ['GPS Tracking', 'Maintenance', 'Fuel Mgmt'] },
              { name: 'Warehouse Management System (WMS)', icon: Layers, desc: 'Advanced WMS with inventory control, pick/pack/ship workflows, barcode scanning, and real-time warehouse analytics.', tags: ['Inventory', 'Pick/Pack', 'Barcode'] },
              { name: 'Property Management System (PMS)', icon: Building2, desc: 'Property management platform with tenant management, lease tracking, maintenance requests, rent collection, and financial reporting.', tags: ['Tenant Mgmt', 'Lease Tracking', 'Rent'] },
              { name: 'Restaurant POS', icon: ShoppingCart, desc: 'Modern restaurant POS with table management, online ordering, kitchen display, payment processing, and sales analytics.', tags: ['Table Mgmt', 'Online Ordering', 'Payments'] },
              { name: 'Hotel Management System (HMS)', icon: Building2, desc: 'Complete HMS with booking engine, front desk operations, housekeeping, channel management, and guest experience tools.', tags: ['Booking', 'Front Desk', 'Channel Mgmt'] },
              { name: 'AI Recruitment Platform', icon: Users, desc: 'AI-driven recruitment platform with candidate sourcing, resume parsing, skill matching, interview scheduling, and analytics.', tags: ['Sourcing', 'Resume Parsing', 'Skill Match'] },
              { name: 'AI Legal Platform', icon: ShieldCheck, desc: 'Legal practice management with AI-powered document review, contract analysis, case management, and compliance tracking.', tags: ['Document Review', 'Contract Analysis', 'Case Mgmt'] },
              { name: 'E-Commerce Platform', icon: ShoppingCart, desc: 'Full-featured e-commerce platform with product catalog, cart, checkout, payment processing, and order management.', tags: ['Catalog', 'Checkout', 'Order Mgmt'] },
              { name: 'Customer Relationship Management (CRM)', icon: Users, desc: 'Enterprise CRM with lead tracking, deal pipeline, customer analytics, and integrated communication tools.', tags: ['Leads', 'Pipeline', 'Analytics'] },
              { name: 'Learning Management System (LMS)', icon: GraduationCap, desc: 'Scalable LMS with course creation, virtual classrooms, assessments, certifications, and student analytics.', tags: ['Courses', 'Assessments', 'Certifications'] },
              { name: 'Supply Chain Management System', icon: Truck, desc: 'End-to-end supply chain platform with demand forecasting, sourcing, procurement, and supplier collaboration.', tags: ['Forecasting', 'Sourcing', 'Procurement'] },
              { name: 'Document Management System (DMS)', icon: Layers, desc: 'Enterprise DMS with document capture, indexing, version control, workflow automation, and secure archiving.', tags: ['Version Control', 'Workflow', 'Archiving'] },
              { name: 'Asset Management Platform', icon: Briefcase, desc: 'Comprehensive asset lifecycle management with tracking, maintenance scheduling, depreciation, and audit reporting.', tags: ['Lifecycle', 'Maintenance', 'Audit'] },
              { name: 'Project Management Software', icon: TrendingUp, desc: 'Full-featured project management platform with task tracking, Gantt charts, resource management, and team collaboration.', tags: ['Tasks', 'Gantt', 'Collaboration'] },
              { name: 'Help Desk & Ticketing System', icon: Users, desc: 'ITIL-compliant help desk platform with ticket management, SLA tracking, knowledge base, and self-service portal.', tags: ['Tickets', 'SLA', 'Knowledge Base'] },
              { name: 'Business Intelligence Dashboard', icon: TrendingUp, desc: 'Interactive BI platform with drag-and-drop dashboards, real-time data visualization, and embedded analytics.', tags: ['Dashboards', 'Visualization', 'Analytics'] },
              { name: 'Payment Gateway Platform', icon: ShieldCheck, desc: 'Secure payment gateway with multi-currency support, fraud detection, recurring billing, and PCI-DSS compliance.', tags: ['Payments', 'Fraud Detection', 'PCI-DSS'] },
              { name: 'Insurance Management System', icon: Building2, desc: 'Core insurance platform with policy management, claims processing, underwriting, and agent/broker portals.', tags: ['Policies', 'Claims', 'Underwriting'] },
              { name: 'Microfinance Banking System', icon: Building2, desc: 'Digital microfinance platform with loan origination, savings, group lending, mobile money, and regulatory reporting.', tags: ['Loans', 'Savings', 'Mobile Money'] },
              { name: 'HR & Payroll Management', icon: Users, desc: 'Complete HR platform with employee records, payroll processing, benefits administration, time tracking, and performance reviews.', tags: ['Payroll', 'Benefits', 'Performance'] },
              { name: 'E-Procurement Platform', icon: Globe, desc: 'Digital procurement platform with supplier management, RFQ/RFP workflows, contract management, and spend analytics.', tags: ['Suppliers', 'RFQ', 'Contracts'] },
              { name: 'Content Management System (CMS)', icon: Layers, desc: 'Enterprise CMS with drag-and-drop page builder, multi-site management, SEO tools, and content personalization.', tags: ['Page Builder', 'Multi-Site', 'SEO'] },
              { name: 'Telehealth Platform', icon: HeartPulse, desc: 'HIPAA-compliant telehealth platform with video consultations, remote monitoring, e-prescriptions, and patient portal.', tags: ['Telehealth', 'Remote Monitoring', 'E-Rx'] },
              { name: 'Energy Management System', icon: Cpu, desc: 'Smart energy management system with real-time monitoring, consumption analytics, demand forecasting, and grid optimization.', tags: ['Monitoring', 'Analytics', 'Grid Opt'] },
              { name: 'Smart City Platform', icon: Globe, desc: 'Integrated smart city platform for traffic management, public safety, utilities monitoring, and citizen engagement.', tags: ['Traffic', 'Public Safety', 'Utilities'] },
              { name: 'Marketing Automation Platform', icon: TrendingUp, desc: 'AI-powered marketing automation with campaign management, lead scoring, email marketing, and customer journey mapping.', tags: ['Campaigns', 'Lead Scoring', 'Email'] },
              { name: 'Customer Data Platform (CDP)', icon: Database, desc: 'Unified customer data platform with identity resolution, audience segmentation, real-time profiles, and analytics.', tags: ['Identity', 'Segmentation', 'Profiles'] },
              { name: 'Compliance & Audit Management', icon: ShieldCheck, desc: 'Enterprise compliance platform with policy management, risk assessment, audit trails, and regulatory reporting.', tags: ['Policy', 'Risk', 'Audit'] },
              { name: 'IoT Device Management Platform', icon: Wifi, desc: 'Scalable IoT platform with device provisioning, telemetry ingestion, edge computing, and real-time monitoring.', tags: ['Devices', 'Telemetry', 'Edge'] },
              { name: 'E-Library Management System', icon: GraduationCap, desc: 'Digital library platform with catalog management, patron services, digital lending, and inter-library integration.', tags: ['Catalog', 'Lending', 'Patron'] },
              { name: 'Field Service Management', icon: Truck, desc: 'Field service platform with dispatch scheduling, mobile workforce management, GPS tracking, and work order management.', tags: ['Dispatch', 'Workforce', 'Work Orders'] },
              { name: 'PharmaFlow — Pharmacy & Prescription Management', icon: Layers, desc: 'A comprehensive pharmacy management system handling inventory tracking, prescription fulfillment, regulatory compliance, and patient records. Built with HIPAA-compliant architecture and real-time stock alerts for operational efficiency.', tags: ['Inventory', 'HIPAA', 'Analytics'] },
              { name: 'StockVue — Real-Time Inventory Management', icon: Clock, desc: 'A real-time inventory and stock management platform for retail and warehouse operations. Provides multi-warehouse tracking, automated reordering based on demand forecasting, and comprehensive analytics dashboards.', tags: ['Real-Time', 'Analytics', 'Automation'] },
              { name: 'BiteOrder — Restaurant Website & Online Ordering', icon: TrendingUp, desc: 'A complete restaurant digital platform featuring custom websites, online ordering, table reservations, and POS integration. Includes real-time order tracking, menu management, and customer analytics for hospitality businesses.', tags: ['Online Ordering', 'Reservations', 'POS'] },
              { name: 'TableReserve — Smart Reservation & Booking System', icon: Users, desc: 'An intelligent reservation and booking management system for restaurants, hotels, and event venues. Features real-time availability, automated reminders, waitlist management, and comprehensive customer relationship tools.', tags: ['Booking', 'CRM', 'Calendar'] },
            ].map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={ind.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.6, ease: EASE_EXPO }}
                  className="group relative cursor-pointer"
                >
                  <div className="relative h-full p-6 rounded-[24px] bg-white border border-slate-200 transition-all duration-500 group-hover:border-[#F5A800]/40 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-[16px] bg-slate-100 border border-slate-200 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-[#F5A800]/30">
                          <Icon size={20} className="text-slate-950 group-hover:text-[#F5A800] transition-colors duration-300" />
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-slate-950 tracking-[-0.02em] group-hover:text-[#F5A800] transition-colors duration-300 mb-2">{ind.name}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3 mb-3">{ind.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {ind.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/request-demo?product=${encodeURIComponent(ind.name)}`}
                        className="inline-flex items-center gap-1 text-[#F5A800] hover:text-[#e09a00] font-bold text-sm transition-colors"
                      >
                        Request Demo
                        <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>




      {/* ═══════════════════════════════════════════════════════════
          REFERENCE ARCHITECTURES — Industries style
          ═══════════════════════════════════════════════════════════ */}
      <section className="dark relative py-32 bg-[#02040a] border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="max-w-2xl mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Reference Architectures</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
              Engineering{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">Patterns.</span>
            </h2>
            <p className="text-white/50 text-lg font-medium max-w-xl">
              Reference architectures we reuse across client engagements — proven patterns for AI security, post-quantum cryptography, multi-region infrastructure, and more.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.filter(p => ['neural-sentinel', 'quantum-ledger', 'apex-cloud', 'ion-network', 'cipher-vault', 'prism-ai'].includes(p.id)).map((project, i) => {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: EASE_EXPO }}
                  className="group relative cursor-pointer"
                >
                  <div className="relative h-full p-8 rounded-[24px] bg-white/[0.02] border border-white/10 transition-all duration-500 group-hover:border-[#F5A800]/40 group-hover:bg-white/[0.04] overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{color: project.color}}>{project.category}</span>
                        <span className="text-[10px] text-white/40 font-mono">{project.year}</span>
                      </div>
                      <h3 className="text-xl font-black text-white tracking-[-0.02em] group-hover:text-[#F5A800] transition-colors duration-300 mb-2">{project.title} — {project.subtitle}</h3>
                      <p className="text-white/50 text-sm leading-relaxed font-medium line-clamp-3 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link to={`/request-demo?product=${encodeURIComponent(project.title + ' — ' + project.subtitle)}`} className="inline-flex items-center gap-1 text-[#F5A800] hover:text-[#e09a00] font-bold text-sm transition-colors">
                        Request Demo
                        <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURED CLIENT SOLUTIONS — Industries style
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.5px, transparent 0.5px)', backgroundSize: '28px 28px' }} />
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="max-w-2xl mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Featured Client Solutions</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-6">
              Products Built by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">Nexyovi.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROJECTS.filter(p => ['pharmaflow', 'stockvue', 'biteorder', 'tablereserve'].includes(p.id)).map((project, i) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: EASE_EXPO }}
                  className="group relative cursor-pointer"
                >
                  <div className="relative h-full p-6 rounded-[24px] bg-white border border-slate-200 transition-all duration-500 group-hover:border-[#F5A800]/40 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-[16px] bg-slate-100 border border-slate-200 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-[#F5A800]/30">
                          <Icon size={20} className="text-slate-600 group-hover:text-[#F5A800] transition-colors duration-300" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{project.category}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{project.year}</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-950 tracking-[-0.02em] group-hover:text-[#F5A800] transition-colors duration-300 mb-2">{project.title} — {project.subtitle}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] mb-4">
                        {project.metrics.map(m => (
                          <span key={m.label} className="font-semibold text-slate-700">{m.value}</span>
                        ))}
                      </div>
                      <Link to={`/request-demo?product=${encodeURIComponent(project.title + ' — ' + project.subtitle)}`} className="inline-flex items-center gap-1 text-[#F5A800] hover:text-[#e09a00] font-bold text-sm transition-colors">
                        Request Demo
                        <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURED PRODUCT: NEXI MARKETS
          ═══════════════════════════════════════════════════════════ */}
      <section className="dark relative py-24 overflow-hidden border-t border-slate-200 dark:border-white/10 bg-[#02040a] transition-colors duration-300">
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 dark:text-white/60">Nexyovi</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-[-0.04em] leading-[0.95] mb-4">
                  Nexi <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 dark:from-amber-400 to-amber-400 dark:to-amber-300">Markets</span>
                </h2>
                <p className="text-slate-500 dark:text-white/50 text-lg font-medium leading-relaxed max-w-xl">
                  Everything you need. Delivered to you.
                </p>
              </motion.div>

              <motion.p variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.05, ease: EASE_EXPO } },
              }} className="text-slate-600 dark:text-white/50 text-base leading-relaxed mb-6 max-w-md">
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
                    <div className="relative w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-lg group-hover:border-amber-600/40 dark:group-hover:border-amber-400/40 transition-all duration-300 cursor-default overflow-hidden shadow-sm">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                      <span className="relative z-10 text-slate-600 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{cat.icon}</span>
                    </div>
                    <span className="text-slate-600 dark:text-white/40 text-[9px] font-bold">{cat.label}</span>
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
                  { icon: '🌍', title: 'Built for Ethiopia', desc: 'Tailored for local needs.' },
                ].map((f) => (
                  <motion.div
                    key={f.title}
                    whileHover={{ y: -4, borderColor: 'var(--color-accent)' }}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:bg-amber-50 dark:hover:bg-amber-400/5 transition-all duration-300"
                  >
                    <span className="text-lg">{f.icon}</span>
                    <p className="text-slate-950 dark:text-white font-bold text-[12px] mt-1 mb-0.5">{f.title}</p>
                    <p className="text-slate-600 dark:text-white/50 text-[10px] leading-snug">{f.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.18, ease: EASE_EXPO } },
              }} className="flex flex-wrap gap-2 mb-6">
                {['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-[8px] bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-white/50">{tech}</span>
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
      <section className="dark relative py-24 overflow-hidden border-t border-slate-200 dark:border-white/10 bg-[#02040a] transition-colors duration-300">
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 dark:text-white/60">Nexyovi</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-[-0.04em] leading-[0.95] mb-4">
                  Nexi <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 dark:from-amber-400 to-amber-400 dark:to-amber-300">Locate</span>
                </h2>
                <p className="text-slate-500 dark:text-white/50 text-lg font-medium leading-relaxed max-w-xl">
                  Explore. Discover. Experience Addis.
                </p>
              </motion.div>

              <motion.p variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.05, ease: EASE_EXPO } },
              }} className="text-slate-600 dark:text-white/50 text-base leading-relaxed mb-6 max-w-md">
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
                    <div className="relative w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-lg group-hover:border-orange-600/40 dark:group-hover:border-orange-400/40 transition-all duration-300 cursor-default overflow-hidden shadow-sm">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                      <span className="relative z-10 text-slate-600 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{cat.icon}</span>
                    </div>
                    <span className="text-slate-600 dark:text-white/40 text-[9px] font-bold">{cat.label}</span>
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
                  { icon: '🌍', title: 'Built for Ethiopia', desc: 'Made for Addis Ababa.' },
                ].map((f) => (
                  <motion.div
                    key={f.title}
                    whileHover={{ y: -4, borderColor: 'var(--color-accent)' }}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:bg-orange-50 dark:hover:bg-orange-400/5 transition-all duration-300"
                  >
                    <span className="text-lg">{f.icon}</span>
                    <p className="text-slate-950 dark:text-white font-bold text-[12px] mt-1 mb-0.5">{f.title}</p>
                    <p className="text-slate-600 dark:text-white/50 text-[10px] leading-snug">{f.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.18, ease: EASE_EXPO } },
              }} className="flex flex-wrap gap-2 mb-6">
                {['React Native', 'Node.js', 'PostGIS', 'Google Maps API'].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-[8px] bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-white/50">{tech}</span>
                ))}
              </motion.div>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.18, ease: EASE_EXPO } },
              }} className="flex flex-wrap gap-2 mb-6">
                {['React', 'WebRTC', 'FastAPI', 'PostgreSQL'].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-[8px] bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-white/50">{tech}</span>
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
      <section className="dark relative py-24 overflow-hidden border-t border-slate-200 dark:border-white/10 bg-[#02040a] transition-colors duration-300">
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 dark:text-white/60">Tele-Psychiatry</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-[-0.04em] leading-[0.95] mb-4">
                  Your Mental Well-being,{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 dark:from-amber-400 to-amber-400 dark:to-amber-300">Our Priority.</span>
                </h2>
                <p className="text-slate-500 dark:text-white/50 text-lg font-medium leading-relaxed max-w-xl">
                  Connect with licensed psychiatrists and therapists through secure online consultations.
                </p>
              </motion.div>

              <motion.p variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.05, ease: EASE_EXPO } },
              }} className="text-slate-600 dark:text-white/50 text-base leading-relaxed mb-6 max-w-md">
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
                    <div className="relative w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-lg group-hover:border-teal-600/40 dark:group-hover:border-teal-400/40 transition-all duration-300 cursor-default overflow-hidden shadow-sm">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                      <span className="relative z-10 text-slate-600 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{cat.icon}</span>
                    </div>
                    <span className="text-slate-600 dark:text-white/40 text-[9px] font-bold">{cat.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.15, ease: EASE_EXPO } },
              }} className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: '🌍', title: 'Built for Ethiopia', desc: 'Made for Ethiopian patients and providers.' },
                  { icon: '🛡️', title: '100% Confidential', desc: 'Your privacy is protected by design.' },
                  { icon: '📹', title: 'Video Consultations', desc: 'Face-to-face care from anywhere.' },
                  { icon: '📅', title: 'Flexible Scheduling', desc: 'Book appointments that work for you.' },
                ].map((f) => (
                  <motion.div
                    key={f.title}
                    whileHover={{ y: -4, borderColor: 'var(--color-accent)' }}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:bg-teal-50 dark:hover:bg-teal-400/5 transition-all duration-300"
                  >
                    <span className="text-lg">{f.icon}</span>
                    <p className="text-slate-950 dark:text-white font-bold text-[12px] mt-1 mb-0.5">{f.title}</p>
                    <p className="text-slate-600 dark:text-white/50 text-[10px] leading-snug">{f.desc}</p>
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
      {/* ═══════════════════════════════════════════════════════════
          CTA SECTION — Dark
          ═══════════════════════════════════════════════════════════ */}
      <section className="dark relative py-32 bg-[#02040a] border-t border-slate-200 dark:border-white/5 overflow-hidden section-divider-dark transition-colors duration-300">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-amber-400/8 dark:bg-amber-400/8 blur-[140px] rounded-full" />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 dark:text-white/60">Let's Build Together</span>
            </motion.div>

            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-[-0.04em] leading-[0.95] mb-6">
                Start an{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 dark:from-amber-400 to-amber-400 dark:to-amber-300">Engineering Strategy</span>
                Session
              </h2>
            </TextReveal>

            <TextReveal delay={0.1}>
              <p className="text-slate-500 dark:text-white/50 text-lg font-medium leading-relaxed mb-12 max-w-xl">
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
