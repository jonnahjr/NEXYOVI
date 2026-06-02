import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Building2, Activity, HeartPulse, GraduationCap, Truck, Zap,
  ShoppingCart, CheckCircle, Server, Shield, Cpu, Users, Target,
  BarChart3, Code, Cloud, Database, Smartphone, BrainCircuit,
  Layers, Network, ChevronRight, Clock, MapPin
} from 'lucide-react';
import { EASE_EXPO } from '../lib/animations';

// ── Data ──────────────────────────────────────────────────────
const industries = [
  {
    id: 'fintech', name: 'FinTech', icon: Activity, accent: '#F5A800',
    desc: 'High-frequency trading systems, secure payment gateways, core banking modernization, and blockchain infrastructure engineered for zero latency.',
    challenges: ['Fraud Detection & Prevention', 'Regulatory Compliance (PCI-DSS)', 'Payment Processing at Scale', 'Risk Management Systems'],
  },
  {
    id: 'healthtech', name: 'HealthTech', icon: HeartPulse, accent: '#10b981',
    desc: 'HIPAA-compliant data pipelines, telemedicine platforms, interoperable EHR systems, and predictive patient analytics.',
    challenges: ['Patient Data Security & Privacy', 'Telemedicine Infrastructure', 'EHR Interoperability', 'Healthcare Compliance (HIPAA)'],
  },
  {
    id: 'govtech', name: 'GovTech', icon: Building2, accent: '#8b5cf6',
    desc: 'Secure digital infrastructure for public institutions, citizen service portals, identity systems, and sovereign cloud platforms.',
    challenges: ['Digital Public Services', 'Identity & Access Management', 'National Security Standards', 'Infrastructure Modernization'],
  },
  {
    id: 'logistics', name: 'Logistics', icon: Truck, accent: '#f59e0b',
    desc: 'Real-time supply chain visibility, predictive routing algorithms, IoT fleet tracking, and automated warehouse management.',
    challenges: ['Supply Chain Visibility', 'Real-time IoT Tracking', 'Route Optimization', 'Warehouse Automation'],
  },
  {
    id: 'education', name: 'Education', icon: GraduationCap, accent: '#ec4899',
    desc: 'Scalable LMS platforms, AI-powered tutoring engines, virtual classrooms, and campus digital infrastructure.',
    challenges: ['Scalable Learning Platforms', 'AI-Powered Tutoring', 'Virtual Classroom Infrastructure', 'Student Data Analytics'],
  },
  {
    id: 'retail', name: 'Retail', icon: ShoppingCart, accent: '#06b6d4',
    desc: 'Omnichannel commerce platforms, AI-driven personalization engines, real-time inventory intelligence, and payment systems.',
    challenges: ['Omnichannel Commerce', 'AI Personalization', 'Real-time Inventory', 'Payment Processing'],
  },
  {
    id: 'manufacturing', name: 'Manufacturing', icon: Cpu, accent: '#ef4444',
    desc: 'Smart factory automation, computer vision quality control, predictive maintenance, and IIoT data platforms.',
    challenges: ['Smart Factory Automation', 'Quality Control via AI', 'Predictive Maintenance', 'Industrial IoT Integration'],
  },
  {
    id: 'energy', name: 'Energy', icon: Zap, accent: '#eab308',
    desc: 'Smart grid management, renewable energy optimization, SCADA security, and critical infrastructure monitoring.',
    challenges: ['Smart Grid Management', 'Renewable Energy Optimization', 'SCADA Security', 'Infrastructure Monitoring'],
  },
];

const solutions = [
  { icon: Code, title: 'Custom Software Platforms', desc: 'Enterprise-grade platforms built for scale, security, and maintainability across your entire operation.' },
  { icon: BrainCircuit, title: 'AI & Machine Learning Systems', desc: 'Intelligent systems that automate workflows, detect patterns, and drive data-informed decisions.' },
  { icon: Smartphone, title: 'Mobile Applications', desc: 'Native and cross-platform mobile apps for customer engagement and internal workforce productivity.' },
  { icon: Database, title: 'Data Platforms', desc: 'Real-time data lakes, streaming pipelines, BI dashboards, and analytics infrastructure.' },
  { icon: Cloud, title: 'Cloud Infrastructure', desc: 'Multi-cloud architecture, Kubernetes orchestration, and serverless deployments at global scale.' },
  { icon: Shield, title: 'Cybersecurity', desc: 'Zero-trust architectures, penetration testing, compliance frameworks, and 24/7 threat monitoring.' },
  { icon: Layers, title: 'Enterprise Integrations', desc: 'API gateways, legacy system modernization, and seamless third-party platform integrations.' },
  { icon: Network, title: 'DevOps & Reliability', desc: 'CI/CD pipelines, infrastructure as code, observability, and site reliability engineering.' },
];

const caseStudies = [
  { icon: Activity, accent: '#F5A800', title: 'FinTech Payment Platform', industry: 'FinTech', desc: 'Built a high-frequency payment processing platform handling $2B+ in monthly transaction volume with sub-10ms latency.', tech: ['Go', 'Kafka', 'PostgreSQL', 'AWS'], outcome: '99.99% uptime, 60% reduction in processing costs' },
  { icon: HeartPulse, accent: '#10b981', title: 'Telemedicine Platform', industry: 'HealthTech', desc: 'Designed and deployed a HIPAA-compliant telemedicine platform serving 500K+ patients across East Africa.', tech: ['React', 'WebRTC', 'Python', 'FHIR'], outcome: '500K+ patients served, 40+ hospitals connected' },
  { icon: Truck, accent: '#f59e0b', title: 'Logistics Intelligence System', industry: 'Logistics', desc: 'Real-time fleet tracking and predictive routing system reducing delivery times by 35% across 2,000+ vehicles.', tech: ['IoT', 'Node.js', 'Redis', 'GCP'], outcome: '35% faster deliveries, 20% fuel cost reduction' },
  { icon: Building2, accent: '#8b5cf6', title: 'Government Digital Services', industry: 'GovTech', desc: 'Sovereign digital identity platform and citizen service portal for a national government.', tech: ['Rust', 'PostgreSQL', 'Terraform', 'Air-Gapped'], outcome: '2M+ citizens onboarded, 100% audit compliance' },
];

const deliveryLocations = [
  { city: 'Addis Ababa', role: 'Engineering Operations', desc: 'Core engineering, infrastructure, and AI research hub.', x: 37, y: 8 },
  { city: 'Miami', role: 'Business & Partnerships', desc: 'Strategic partnerships, business development, and client relations.', x: 30, y: 55 },
  { city: 'Remote', role: 'Global Delivery', desc: 'Distributed engineering teams across multiple time zones.', x: 48, y: 42 },
];

const whyPillars = [
  { icon: Target, title: 'Industry Expertise', desc: 'Deep domain knowledge across 8 core industries — we understand your business before we write a line of code.', accent: '#F5A800' },
  { icon: Shield, title: 'Security-First Engineering', desc: 'Zero-trust by default. Every system is architected with security at every layer — from infrastructure to application code.', accent: '#10b981' },
  { icon: BrainCircuit, title: 'AI & Automation Leadership', desc: 'We don\'t just build software — we build intelligent systems that learn, adapt, and automate complex workflows.', accent: '#8b5cf6' },
  { icon: Users, title: 'Long-Term Partnerships', desc: 'We embed with your team, transfer knowledge, and stay engaged long after launch. Your success is our success.', accent: '#F5A800' },
];

const metrics = [
  { value: '99.9%', label: 'Availability', icon: Server },
  { value: 'Enterprise', label: 'Security Standards', icon: Shield },
  { value: 'Scalable', label: 'Architecture', icon: BarChart3 },
  { value: 'Cloud-Native', label: 'Systems', icon: Cloud },
  { value: 'Real-Time', label: 'Analytics', icon: Activity },
  { value: 'Automation', label: 'Driven Operations', icon: Clock },
];

const techCapabilities = [
  'AI Systems', 'Custom Software', 'Cloud Infrastructure', 'Data Platforms',
  'Cybersecurity', 'DevOps & SRE', 'Mobile Applications', 'Enterprise Integrations', 'Automation'
];

function TextReveal({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <div className={`overflow-hidden ${className || ''}`}>
      <motion.div
        initial={{ y: '100%', clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ y: 0, clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: EASE_EXPO }}
      >
        {children}
      </motion.div>
    </div>
  );
}

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
    <div className="fixed inset-0 pointer-events-none z-[999] transition-none hidden lg:block"
      style={{ background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(245,168,0,0.03), transparent 40%)` }} />
  );
}

function AnimatedCounter({ value, label, icon: Icon, index }: {
  value: string; label: string; icon: React.ElementType; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: EASE_EXPO }}
      className="group relative p-6 rounded-[20px] bg-white border border-slate-200 hover:border-[#F5A800]/30 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
    >
      <div className="w-10 h-10 rounded-[12px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-4 group-hover:bg-[#F5A800]/20 group-hover:scale-110 transition-all duration-500">
        <Icon size={18} className="text-[#F5A800]" />
      </div>
      <div className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight mb-1">{value}</div>
      <div className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
//  PAGE
// ══════════════════════════════════════════════════════════════
export default function Industries() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeIndustry, setActiveIndustry] = useState('fintech');

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <div className="bg-slate-50 min-h-screen overflow-x-clip">
      <MouseGlow />

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
          ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02040a]">
        {/* Animated grid lines */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path d="M0 200 L1440 200 M0 400 L1440 400 M0 600 L1440 600 M0 800 L1440 800" stroke="rgba(245,168,0,0.15)" strokeWidth="0.5" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
            <motion.path d="M200 0 L200 900 M500 0 L500 900 M800 0 L800 900 M1100 0 L1100 900 M1400 0 L1400 900" stroke="rgba(245,168,0,0.1)" strokeWidth="0.5" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} />
            {/* Data flow dots — wrapped in motion.g to avoid framer-motion SVG attribute issues */}
            <motion.g animate={{ x: [0, 300, 600, 900], opacity: [0, 1, 1, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
              <circle cx="300" cy="300" r="3" fill="#F5A800" />
            </motion.g>
            <motion.g animate={{ x: [0, -300, -600, -900], opacity: [0, 1, 1, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
              <circle cx="1200" cy="600" r="3" fill="#F5A800" />
            </motion.g>
            <motion.g animate={{ x: [0, 200, 400, 600], y: [0, -200, -400, -500], opacity: [0, 1, 1, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>
              <circle cx="600" cy="700" r="2" fill="#8b5cf6" />
            </motion.g>
          </svg>
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#F5A800]/10 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/8 rounded-full blur-[140px]" />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#02040a]/30 via-transparent to-[#02040a]/85 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#02040a_80%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#02040a] to-transparent z-[2] pointer-events-none" />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 container max-w-5xl mx-auto px-6 text-center pt-32 pb-24">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#F5A800]/20 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.6)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A800]">Global Industry Expertise</span>
          </motion.div>

          <TextReveal>
            <h1 className="text-[48px] md:text-[72px] lg:text-[88px] font-black tracking-[-0.04em] leading-[0.92] text-white">
              Engineering Solutions For{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">Complex Industries.</span>
            </h1>
          </TextReveal>

          <TextReveal delay={0.15}>
            <p className="text-white/50 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed mt-8 mb-12">
              We deploy specialized software, AI systems, cloud infrastructure, and digital platforms engineered specifically for the regulatory, operational, and security demands of modern industries.
            </p>
          </TextReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6, ease: EASE_EXPO }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#industries-overview" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-black font-bold text-[15px] transition-all hover:scale-105 hover:bg-[#FFD166] hover:shadow-[0_0_40px_rgba(245,168,0,0.2)]">
              Explore Industries
              <ArrowRight size={16} />
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white font-bold text-[15px] transition-all hover:bg-white/10 hover:border-white/20">
              Start a Project
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/25">Scroll to explore</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — INDUSTRIES OVERVIEW
          ══════════════════════════════════════════════════════ */}
      <section id="industries-overview" className="relative py-32 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.5px, transparent 0.5px)', backgroundSize: '28px 28px' }} />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Industries We Serve</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-[-0.04em] leading-[0.92] mb-6">
              Deep Domain{' '}
              <span className="text-[#F5A800]">Expertise.</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
              Eight core industries. Decades of combined experience. We understand the unique challenges, regulations, and opportunities of each sector.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={ind.id}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: EASE_EXPO }}
                  onMouseEnter={() => setActiveIndustry(ind.id)}
                  className="group relative cursor-pointer"
                >
                  <div className="relative h-full p-6 rounded-[24px] bg-white border border-slate-200 transition-all duration-500 group-hover:border-[#F5A800]/40 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${ind.accent}15, transparent 70%)` }} />
                    <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg, ${ind.accent}, transparent)` }} />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-[16px] bg-slate-100 border border-slate-200 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-[#F5A800]/30">
                          <Icon size={20} className="text-slate-600 group-hover:text-[#F5A800] transition-colors duration-300" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-300">0{i + 1}</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-950 tracking-[-0.02em] mb-1 group-hover:text-[#F5A800] transition-colors duration-300">{ind.name}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3">{ind.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — INDUSTRY EXPERTISE PANEL
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-white border-t border-slate-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F5A800]/3 blur-[120px] rounded-full pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Industry Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-6">
              Every Industry Has{' '}
              <span className="text-[#F5A800]">Unique Challenges.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl font-medium">
              Select an industry to see the specific challenges we solve and the technical depth we bring.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Industry Selector */}
            <div className="lg:col-span-2 flex flex-col gap-2">
              {industries.map((ind) => {
                const Icon = ind.icon;
                const isActive = activeIndustry === ind.id;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setActiveIndustry(ind.id)}
                    className={`group flex items-center gap-4 px-5 py-4 rounded-[16px] text-left transition-all duration-300 ${
                      isActive ? 'bg-slate-100 border border-slate-200 shadow-sm' : 'bg-transparent border border-transparent hover:bg-slate-50 hover:border-slate-100'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center transition-all duration-300 ${
                      isActive ? 'bg-[#F5A800]/10 border border-[#F5A800]/30' : 'bg-slate-100 border border-slate-200'
                    }`}>
                      <Icon size={18} className={isActive ? 'text-[#F5A800]' : 'text-slate-500'} />
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold text-sm transition-colors duration-300 ${isActive ? 'text-slate-950' : 'text-slate-600'}`}>{ind.name}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <ChevronRight size={10} className={`transition-all duration-300 ${isActive ? 'text-[#F5A800] opacity-100' : 'text-slate-300 opacity-0'}`} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">View Challenges</span>
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Challenge Panel */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {industries.filter(i => i.id === activeIndustry).map((ind) => {
                  const Icon = ind.icon;
                  return (
                    <motion.div
                      key={ind.id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: EASE_EXPO }}
                      className="p-8 md:p-12 rounded-[32px] bg-slate-50 border border-slate-200 h-full"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-[18px] flex items-center justify-center" style={{ background: `${ind.accent}15`, border: `1px solid ${ind.accent}30` }}>
                          <Icon size={28} style={{ color: ind.accent }} />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Industry Profile</div>
                          <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">{ind.name}</h3>
                        </div>
                      </div>

                      <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 font-medium">{ind.desc}</p>

                      <div className="mb-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 mb-5">Key Challenges We Solve</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {ind.challenges.map((challenge) => (
                            <div key={challenge} className="flex items-center gap-3 p-4 rounded-[14px] bg-white border border-slate-200 group hover:border-[#F5A800]/30 transition-all duration-300">
                              <div className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 transition-colors duration-300" style={{ background: `${ind.accent}12` }}>
                                <CheckCircle size={14} style={{ color: ind.accent }} />
                              </div>
                              <span className="text-slate-700 text-sm font-bold">{challenge}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link to="/contact" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[#F5A800] hover:text-[#e09a00] transition-colors duration-300">
                        Discuss Your {ind.name} Project
                        <ArrowRight size={14} />
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — SOLUTIONS WE DELIVER
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.5px, transparent 0.5px)', backgroundSize: '28px 28px' }} />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">What We Deliver</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-6">
              Full-Spectrum{' '}
              <span className="text-[#F5A800]">Solutions.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl font-medium">
              From custom software to AI systems to cloud infrastructure — we deliver end-to-end solutions across every industry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((sol, i) => {
              const Icon = sol.icon;
              return (
                <motion.div
                  key={sol.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: EASE_EXPO }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="group p-6 rounded-[20px] bg-white border border-slate-200 hover:border-[#F5A800]/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-[14px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-4 group-hover:bg-[#F5A800]/20 group-hover:scale-110 transition-all duration-500">
                    <Icon size={20} className="text-[#F5A800]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#F5A800] transition-colors duration-300">{sol.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{sol.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — INDUSTRY METRICS
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-white border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5A800]/2 via-transparent to-transparent pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="max-w-2xl mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-6">
              Built for{' '}
              <span className="text-[#F5A800]">Enterprise Standards.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl font-medium">
              Every system we build meets the highest standards for performance, security, and reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((m, i) => (
              <AnimatedCounter key={m.label} {...m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — TECHNOLOGY CAPABILITIES
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#02040a] border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8b5cf6]/5 blur-[140px] rounded-full" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.6)]" />
              <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-widest">Technology Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-6">
              Capabilities Across{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">Every Industry.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed max-w-xl font-medium">
              Our technology stack is industry-agnostic — we apply the right tools and architectures for each unique challenge.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {techCapabilities.map((cap, i) => (
              <motion.div
                key={cap}
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: EASE_EXPO }}
                className="group relative p-5 rounded-[16px] bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-[#F5A800]/30 transition-all duration-500"
              >
                <div className="text-white/80 font-bold text-sm group-hover:text-[#F5A800] transition-colors duration-300">{cap}</div>
                <div className="mt-2 flex gap-1">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#F5A800]/30 transition-colors duration-300" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Industry-Capability Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE_EXPO }}
            className="mt-16 p-8 md:p-10 rounded-[24px] bg-white/[0.02] border border-white/5"
          >
            <h3 className="text-white font-black text-xl mb-6">Industry-Capability Matrix</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {industries.map((ind) => (
                <div key={ind.id} className="flex items-center gap-2 p-3 rounded-[10px] bg-white/[0.03] border border-white/5">
                  <ind.icon size={12} style={{ color: ind.accent }} />
                  <span className="text-white/60 text-[11px] font-bold uppercase tracking-wider">{ind.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — FEATURED CASE STUDIES
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-white border-t border-slate-200 overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#10b981]/3 blur-[120px] rounded-full pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Featured Case Studies</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-6">
              Real Results.{' '}
              <span className="text-[#F5A800]">Real Impact.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl font-medium">
              Measurable outcomes across industries — from fintech to government.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((cs, i) => {
              const Icon = cs.icon;
              return (
                <motion.div
                  key={cs.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_EXPO }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="group p-8 rounded-[24px] bg-slate-50 border border-slate-200 hover:border-[#F5A800]/30 hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-[14px] flex items-center justify-center" style={{ background: `${cs.accent}12`, border: `1px solid ${cs.accent}25` }}>
                      <Icon size={20} style={{ color: cs.accent }} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{cs.industry}</div>
                      <h3 className="text-lg font-black text-slate-950 tracking-tight group-hover:text-[#F5A800] transition-colors duration-300">{cs.title}</h3>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-5 font-medium">{cs.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cs.tech.map((t) => (
                      <span key={t} className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500">{t}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                    <CheckCircle size={12} style={{ color: cs.accent }} />
                    <span className="text-slate-700 text-[12px] font-bold">{cs.outcome}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — GLOBAL DELIVERY MODEL
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#02040a] border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#F5A800]/3 blur-[150px] rounded-full" />
          {/* World map dots */}
          <svg className="w-full h-full opacity-10" viewBox="0 0 1440 600" fill="none">
            <motion.circle cx="370" cy="280" r="4" fill="#F5A800" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
            <motion.circle cx="1080" cy="250" r="4" fill="#F5A800" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
            <motion.circle cx="720" cy="320" r="4" fill="#F5A800" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }} />
            <motion.path d="M370 280 L1080 250 L720 320 Z" stroke="rgba(245,168,0,0.2)" strokeWidth="0.5" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.6)]" />
              <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-widest">Global Delivery</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-6">
              Global Delivery.{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">Local Understanding.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed font-medium">
              Engineering teams across the globe, working as one unified unit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {deliveryLocations.map((loc, i) => (
              <motion.div
                key={loc.city}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_EXPO }}
                className="group p-8 rounded-[24px] bg-white/[0.03] border border-white/10 hover:border-[#F5A800]/30 hover:bg-white/[0.06] transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-[16px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                  <MapPin size={22} className="text-[#F5A800]" />
                </div>
                <h3 className="text-white font-black text-xl mb-1">{loc.city}</h3>
                <div className="text-[#F5A800]/80 text-[11px] font-bold uppercase tracking-wider mb-3">{loc.role}</div>
                <p className="text-white/50 text-sm leading-relaxed">{loc.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, ease: EASE_EXPO }}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            {['24/7 Collaboration', 'Distributed Engineering', 'Multi-Timezone Support'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle size={14} className="text-[#F5A800]" />
                <span className="text-white/60 text-sm font-bold">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 9 — WHY NEXYOVI
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.5px, transparent 0.5px)', backgroundSize: '28px 28px' }} />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Why Nexyovi</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-6">
              Built Different.{' '}
              <span className="text-[#F5A800]">Built Better.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Four pillars that define how we engineer solutions for complex industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_EXPO }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group p-8 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-[18px] flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                    style={{ background: `${p.accent}12`, border: `1px solid ${p.accent}25` }}>
                    <Icon size={26} style={{ color: p.accent }} />
                  </div>
                  <h3 className="text-xl font-black text-slate-950 tracking-tight mb-4 group-hover:text-[#F5A800] transition-colors duration-300">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 10 — FINAL CTA
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-white border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5A800]/2 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#F5A800]/3 blur-[100px] rounded-full pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE_EXPO }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5A800]/10 border border-[#F5A800]/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.6)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A800]">Ready to Build</span>
            </div>

            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-6">
                Build The Next Industry-Leading{' '}
                <span className="text-[#F5A800]">Platform.</span>
              </h2>
            </TextReveal>

            <TextReveal delay={0.1}>
              <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
                Partner with Nexyovi to engineer software, AI systems, and digital infrastructure designed for long-term success.
              </p>
            </TextReveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6, ease: EASE_EXPO }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link to="/contact" className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-slate-950 text-white font-bold text-[15px] transition-all hover:scale-105 hover:bg-[#F5A800] hover:shadow-[0_0_30px_rgba(245,168,0,0.2)]">
                Start a Project
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white border border-slate-200 text-slate-800 font-bold text-[15px] transition-all hover:border-[#F5A800]/40 hover:text-[#F5A800]">
                Schedule a Strategy Session
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
