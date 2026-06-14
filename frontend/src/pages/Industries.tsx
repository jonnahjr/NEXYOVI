import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle,
  ChevronRight,
  Cloud,
  Code,
  Cpu,
  Database,
  GraduationCap,
  HeartPulse,
  Layers, Network,
  Shield,
  ShoppingCart,
  Smartphone,
  Target,
  Truck,
  Users,
  Zap
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CTAButton } from '../components/CTAButton';
import TextReveal from '../components/TextReveal';
import { EASE_EXPO } from '../lib/animations';

// ── Data ──────────────────────────────────────────────────────
const industries = [
  {
    id: 'fintech', name: 'FinTech', icon: Activity, accent: '#F5A800',
    desc: 'Core banking systems, payment processing platforms, and financial intelligence infrastructure engineered for regulatory compliance and high throughput.',
    challenges: ['Legacy core banking migration with zero downtime', 'Real-time fraud detection at transaction scale', 'Multi-regulatory compliance (PCI-DSS, PSD2, SOC 2)', 'High-frequency payment processing reliability'],
    systems: ['Payment Gateways & Switch Systems', 'Fraud Detection ML Pipelines', 'Core Banking Modernization Platforms', 'KYC/AML Identity Verification'],
    compliance: ['Supports PCI-DSS', 'Supports SOC 2', 'PSD2', 'Supports ISO 27001'],
    outcomes: ['Reduced transaction processing latency', 'Automated regulatory reporting', 'Real-time fraud prevention at scale', 'Uninterrupted payment operations'],
  },
  {
    id: 'healthtech', name: 'HealthTech', icon: HeartPulse, accent: '#10b981',
    desc: 'HIPAA-compliant data platforms, telemedicine infrastructure, EHR interoperability systems, and clinical decision support tools.',
    challenges: ['Protected health information (PHI) security across systems', 'EHR interoperability between legacy and modern platforms', 'Telemedicine infrastructure reliability and compliance', 'Clinical data standardization (HL7 FHIR)'],
    systems: ['Telemedicine & Remote Care Platforms', 'EHR Integration & Interoperability Layers', 'Clinical Decision Support Systems', 'Patient Data Lakes & Analytics'],
    compliance: ['HIPAA', 'GDPR', 'HL7 FHIR', 'SOC 2 Type II'],
    outcomes: ['Secure cross-provider data exchange', 'Reduced patient readmission via predictive analytics', 'Compliant telemedicine deployment at scale', 'Unified patient records across touchpoints'],
  },
  {
    id: 'govtech', name: 'GovTech', icon: Building2, accent: '#8b5cf6',
    desc: 'Secure digital public infrastructure, citizen identity systems, e-government portals, and sovereign cloud platforms for national institutions.',
    challenges: ['Sovereign data residency and cross-border compliance', 'Citizen identity management at national population scale', 'Legacy government system modernization', 'National security threat detection and response'],
    systems: ['Digital Identity & Biometric Systems', 'E-Government Service Portals', 'Sovereign Cloud Infrastructure', 'National Security Operations Centers'],
    compliance: ['NIST CSF', 'ISO 27001', 'GDPR', 'National Data Sovereignty Requirements'],
    outcomes: ['Streamlined citizen service delivery', 'Reduced identity fraud through biometric verification', 'Compliant data sovereignty architecture', 'Modernized government digital infrastructure'],
  },
  {
    id: 'logistics', name: 'Logistics', icon: Truck, accent: '#f59e0b',
    desc: 'Real-time supply chain visibility platforms, fleet management systems, warehouse automation, and logistics optimization engines.',
    challenges: ['End-to-end supply chain visibility across disparate systems', 'Real-time fleet tracking in low-connectivity environments', 'Warehouse management system integration', 'Predictive demand and route optimization'],
    systems: ['Supply Chain Control Towers', 'IoT Fleet Tracking & Telematics', 'Warehouse Management Systems', 'Route Optimization Engines'],
    compliance: ['ISO 27001', 'GDPR', 'Industry-Specific Logistics Standards'],
    outcomes: ['Reduced delivery times through route optimization', 'Real-time inventory visibility across locations', 'Lower operational costs via predictive maintenance', 'Automated warehouse operations'],
  },
  {
    id: 'retail', name: 'Retail', icon: ShoppingCart, accent: '#06b6d4',
    desc: 'Omnichannel commerce platforms, AI-driven personalization engines, real-time inventory systems, and unified customer data infrastructure.',
    challenges: ['Unified commerce across online, in-store, and mobile channels', 'Real-time inventory accuracy across distributed locations', 'Customer data fragmentation and personalization at scale', 'Peak traffic handling during sales events'],
    systems: ['Omnichannel Commerce Platforms', 'AI Personalization & Recommendation Engines', 'Inventory Management & Demand Forecasting', 'Customer Data Platforms (CDPs)'],
    compliance: ['PCI-DSS', 'GDPR', 'CCPA', 'ADA/WCAG Accessibility'],
    outcomes: ['Increased average order value through AI recommendations', 'Reduced stockouts with real-time inventory visibility', 'Seamless cross-channel customer experience', 'Scalable infrastructure for traffic spikes'],
  },
  {
    id: 'education', name: 'Education', icon: GraduationCap, accent: '#ec4899',
    desc: 'Scalable learning management platforms, virtual classroom infrastructure, AI tutoring systems, and campus digital transformation.',
    challenges: ['Scalable online learning infrastructure for large student populations', 'Virtual classroom reliability and engagement', 'Student data privacy and regulatory compliance', 'Legacy campus system modernization'],
    systems: ['Learning Management Platforms', 'Virtual Classroom & Video Infrastructure', 'AI-Powered Tutoring & Assessment Engines', 'Student Information Systems'],
    compliance: ['GDPR', 'FERPA', 'COPPA', 'WCAG Accessibility'],
    outcomes: ['Scalable learning platforms serving thousands of concurrent users', 'Improved student outcomes through AI-assisted learning', 'Secure student data management', 'Modernized campus technology stack'],
  },
  {
    id: 'manufacturing', name: 'Manufacturing', icon: Cpu, accent: '#ef4444',
    maturity: 'Emerging Vertical',
    desc: 'Smart factory systems, computer vision quality control, predictive maintenance platforms, and industrial IoT data infrastructure.',
    challenges: ['Legacy industrial control system integration with modern IT', 'Real-time quality monitoring across production lines', 'Predictive maintenance to reduce unplanned downtime', 'Industrial IoT data ingestion and processing at scale'],
    systems: ['IIoT Data Platforms & Edge Computing', 'Computer Vision Quality Control Systems', 'Predictive Maintenance Engines', 'Manufacturing Execution Systems (MES)'],
    compliance: ['ISO 27001', 'IEC 62443', 'GDPR', 'Industry-Specific Manufacturing Standards'],
    outcomes: ['Reduced unplanned downtime through predictive maintenance', 'Improved quality yield with AI-powered visual inspection', 'Real-time production line visibility', 'Optimized supply chain and inventory management'],
  },
  {
    id: 'energy', name: 'Energy', icon: Zap, accent: '#eab308',
    maturity: 'Emerging Vertical',
    desc: 'Smart grid management platforms, renewable energy optimization, SCADA security, and critical infrastructure monitoring systems.',
    challenges: ['Critical infrastructure cybersecurity and threat detection', 'Renewable energy integration with existing grid infrastructure', 'SCADA system modernization and secure remote access', 'Real-time energy consumption monitoring and optimization'],
    systems: ['Smart Grid Management Platforms', 'SCADA Security & Monitoring', 'Renewable Energy Management Systems', 'Energy Analytics & Consumption Optimization'],
    compliance: ['IEC 62443', 'NIST CSF', 'ISO 27001', 'Critical Infrastructure Protection Standards'],
    outcomes: ['Improved grid reliability through real-time monitoring', 'Optimized renewable energy integration', 'Reduced security incidents via proactive threat detection', 'Lower operational costs through energy optimization'],
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
  { icon: Activity, accent: '#F5A800', badge: 'Illustrative Project', title: 'Payment Infrastructure Modernization', industry: 'FinTech', desc: 'Architected and deployed a PCI-DSS Level 1 compliant payment switch system for a regional financial institution. Migrated legacy core banking systems to a microservice architecture with zero unscheduled downtime during cutover.', tech: ['Go', 'Kafka', 'PostgreSQL', 'Terraform'], outcome: 'Reduced average transaction processing time from 1.2s to 180ms. Achieved PCI-DSS Level 1 certification within the first operating quarter.' },
  { icon: HeartPulse, accent: '#10b981', badge: 'Illustrative Project', title: 'National Telemedicine Network', industry: 'HealthTech', desc: 'Designed and deployed a HIPAA-compliant telemedicine platform connecting 12 regional hospitals with remote diagnostic capabilities. Built on HL7 FHIR standards for seamless EHR integration.', tech: ['React', 'WebRTC', 'Python', 'FHIR'], outcome: 'Connected 40+ clinical departments across 12 hospitals. Reduced patient transfer time by 60% through remote specialist consultations.' },
  { icon: Truck, accent: '#f59e0b', badge: 'Illustrative Project', title: 'Supply Chain Visibility Platform', industry: 'Logistics', desc: 'Built a real-time supply chain control tower integrating data from 800+ vehicles, 14 warehouses, and 3 port terminals into a single operational dashboard with predictive ETAs.', tech: ['IoT', 'Node.js', 'Redis', 'GCP'], outcome: 'Reduced average delivery window from 4 hours to 45 minutes. Lowered fuel costs by 18% through route optimization algorithms.' },
  { icon: Building2, accent: '#8b5cf6', badge: 'Illustrative Project', title: 'Digital Identity & Citizen Portal', industry: 'GovTech', desc: 'Developed a sovereign digital identity platform and citizen services portal for a national government. Air-gapped deployment with biometric verification and offline-capable architecture for rural accessibility.', tech: ['Rust', 'PostgreSQL', 'Terraform', 'Air-Gapped'], outcome: 'Onboarded 500K+ citizens in the first year. Achieved 100% audit compliance on data sovereignty requirements.' },
  { icon: ShoppingCart, accent: '#06b6d4', badge: 'Illustrative Project', title: 'Omnichannel Commerce Core', industry: 'Retail', desc: 'Designed a unified commerce platform connecting e-commerce, point-of-sale, and inventory systems with real-time stock visibility and AI-driven merchandising workflows.', tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'], outcome: 'Reduced stockout incidents by 35% and cut checkout abandonment during peak traffic by 22% across connected commerce channels.' },
  { icon: GraduationCap, accent: '#ec4899', badge: 'Illustrative Project', title: 'Digital Learning Operations Platform', industry: 'Education', desc: 'Created a scalable student learning platform with virtual classroom delivery, progress analytics, and secure student record integrations for multi-campus institutions.', tech: ['React', 'Python', 'WebRTC', 'PostgreSQL'], outcome: 'Cut faculty reporting time by 40% and improved on-time learner progress tracking by 28% across participating programs.' },
  { icon: Cpu, accent: '#ef4444', badge: 'Illustrative Project', title: 'Factory Visibility & Quality Monitoring', industry: 'Manufacturing', desc: 'Deployed an industrial IoT platform across 3 production lines, combining machine telemetry, edge ingestion, and computer vision inspection to reduce defects and improve uptime.', tech: ['Python', 'MQTT', 'OpenCV', 'Azure IoT'], outcome: 'Reduced defect rates by 22% in the first quarter through AI-powered visual inspection. Cut root-cause detection time from hours to under 5 minutes across 3 production lines.' },
  { icon: Zap, accent: '#eab308', badge: 'Illustrative Project', title: 'Grid Monitoring & SCADA Security Layer', industry: 'Energy', desc: 'Architected and deployed a real-time grid monitoring platform for distributed energy assets with SCADA observability, anomaly detection, and secure role-based remote access.', tech: ['Kafka', 'TimescaleDB', 'Grafana', 'Terraform'], outcome: 'Reduced incident detection time from 45 minutes to under 2 minutes. Achieved 99.5% uptime on SCADA monitoring stack across 200+ distributed energy sites.' },
];

const deliveryLocations = [
  { city: 'Addis Ababa', role: 'Engineering Operations', desc: 'Core engineering, infrastructure, and AI research hub.', x: 37, y: 8 },
  { city: 'Miami', role: 'Business & Partnerships', desc: 'Strategic partnerships, business development, and client relations.', x: 30, y: 55 },
  { city: 'Remote', role: 'Global Delivery', desc: 'Distributed engineering teams across multiple time zones.', x: 48, y: 42 },
];

const whyPillars = [
  { icon: Code, title: 'Engineering-First Culture', desc: 'Every engagement is led by senior engineers who write code, review architecture, and own delivery. No sales engineers, no junior allocation — just experienced builders who ship.', accent: '#F5A800' },
  { icon: Shield, title: 'Security-First Architecture', desc: 'Zero-trust by default. Every system is designed with security at every layer — infrastructure, application code, data, and access. Compliance frameworks are embedded, not bolted on.', accent: '#10b981' },
  { icon: BrainCircuit, title: 'AI & Automation Expertise', desc: 'We build intelligent systems that process data, detect patterns, and automate complex workflows. From ML pipelines to LLM integrations, we apply AI where it creates measurable business value.', accent: '#8b5cf6' },
  { icon: Users, title: 'Long-Term Partnership Model', desc: 'We embed with your team, transfer knowledge continuously, and remain engaged long after launch. Our goal is to make your team self-sufficient — not dependent on us.', accent: '#F5A800' },
];

const techCapabilities = [
  'AI Systems', 'Custom Software', 'Cloud Infrastructure', 'Data Platforms',
  'Cybersecurity', 'DevOps & SRE', 'Mobile Applications', 'Enterprise Integrations', 'Automation'
];

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

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
          ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02040a]">
        {/* Clean bottom fade to next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#02040a] to-transparent z-[2] pointer-events-none" />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 container max-w-5xl mx-auto px-6 text-center pt-32 pb-24">
          <TextReveal>
            <h1 className="text-[48px] md:text-[72px] lg:text-[88px] font-black tracking-[-0.04em] leading-[0.92] text-white">
              Engineering for{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">Regulated Industries.</span>
            </h1>
          </TextReveal>

          <TextReveal delay={0.15}>
            <p className="text-white/50 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed mt-8 mb-12">
              Custom software, AI systems, and cloud infrastructure built for the compliance, security, and operational requirements of fintech, healthcare, government, and enterprise markets.
            </p>
          </TextReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6, ease: EASE_EXPO }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#industries-overview" className="group btn-gold text-[15px] px-10 py-5">
              <span className="relative z-10">Explore Industries</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="mailto:contact@nexyovi.com" className="group btn-ghost text-[15px] px-10 py-5">
              <span className="relative z-10">Schedule a Consultation</span>
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6, ease: EASE_EXPO }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-12 pt-8 border-t border-white/5"
          >
            {[
              { label: 'Industry Coverage', sub: '8 Industries' },
              { label: 'Enterprise & Public Sector' },
              { label: 'Security-First Engineering' },
              { label: 'AI-Native Delivery' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-[#F5A800]" />
                <div className="text-left">
                  <div className="text-white text-sm font-bold">{item.label}</div>
                  {item.sub && <div className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{item.sub}</div>}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
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
              Eight core industries. Deep domain expertise across regulated and operationally complex sectors. We understand the unique challenges, regulations, and opportunities of each vertical.
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
                    <div className="relative z-10">                        <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-[16px] bg-slate-100 border border-slate-200 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-[#F5A800]/30">
                          <Icon size={20} className="text-slate-600 group-hover:text-[#F5A800] transition-colors duration-300" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-black text-slate-950 tracking-[-0.02em] group-hover:text-[#F5A800] transition-colors duration-300">{ind.name}</h3>
                        {ind.maturity && (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">
                            {ind.maturity}
                          </span>
                        )}
                      </div>
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
      <section id="industry-expertise" className="relative py-32 bg-white border-t border-slate-200 overflow-hidden">
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
              Select an industry to explore the specific challenges, systems, compliance needs, and business outcomes we design for.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Industry Selector */}
            <div className="lg:col-span-2 flex flex-col gap-2" role="tablist" aria-label="Industry selector">
              {industries.map((ind) => {
                const Icon = ind.icon;
                const isActive = activeIndustry === ind.id;
                return (
                  <button
                    type="button"
                    key={ind.id}
                    onClick={() => setActiveIndustry(ind.id)}
                    onFocus={() => setActiveIndustry(ind.id)}
                    id={`industry-tab-${ind.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`industry-panel-${ind.id}`}
                    className={`group flex items-center gap-4 px-5 py-4 rounded-[16px] text-left transition-all duration-300 ${isActive ? 'bg-slate-100 border border-slate-200 shadow-sm' : 'bg-transparent border border-transparent hover:bg-slate-50 hover:border-slate-100'
                      }`}
                  >
                    <div className={`relative w-10 h-10 rounded-[12px] bg-[#030303] border flex items-center justify-center overflow-hidden shadow-sm transition-all duration-300 ${isActive ? 'border-[#F5A800]/40' : 'border-white/10 group-hover:border-[#F5A800]/40'
                      }`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                      <Icon size={18} className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-[#F5A800]' : 'text-zinc-400 group-hover:text-[#F5A800]'}`} />
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
                      role="tabpanel"
                      id={`industry-panel-${ind.id}`}
                      aria-labelledby={`industry-tab-${ind.id}`}
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="relative w-14 h-14 rounded-[18px] bg-[#030303] border border-white/10 flex items-center justify-center overflow-hidden shadow-sm transition-all duration-300 hover:border-[#F5A800]/40">
                          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                          <Icon size={28} className="relative z-10 text-zinc-400 hover:text-[#F5A800] transition-colors duration-300" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Industry Profile</div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">{ind.name}</h3>
                            {ind.maturity && (
                              <span className="inline-flex items-center rounded-full bg-slate-200 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                                {ind.maturity}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 font-medium">{ind.desc}</p>

                      {/* Challenges */}
                      <div className="mb-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 mb-5">Key Operational Challenges</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {ind.challenges.map((challenge) => (
                            <div key={challenge} className="flex items-center gap-3 p-4 rounded-[14px] bg-white border border-slate-200 group hover:border-[#F5A800]/30 transition-all duration-300">
                              <div className="relative w-8 h-8 rounded-[8px] bg-[#030303] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden shadow-sm group-hover:border-[#F5A800]/40 transition-colors duration-300">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                                <CheckCircle size={14} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors duration-300" />
                              </div>
                              <span className="text-slate-700 text-sm font-bold">{challenge}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Systems We Build */}
                      <div className="mb-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 mb-5">Systems We Build</h4>
                        <div className="flex flex-wrap gap-2">
                          {ind.systems.map((system) => (
                            <span key={system} className="text-[11px] font-bold px-3 py-2 rounded-full bg-white border border-slate-200 text-slate-600">
                              {system}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Compliance */}
                      <div className="mb-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 mb-5">Security & Compliance</h4>
                        <div className="flex flex-wrap gap-2">
                          {ind.compliance.map((c) => (
                            <span key={c} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full" style={{ background: `${ind.accent}10`, color: ind.accent, border: `1px solid ${ind.accent}25` }}>
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Outcomes */}
                      <div className="mb-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 mb-5">Expected Business Outcomes</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {ind.outcomes.map((outcome) => (
                            <div key={outcome} className="flex items-center gap-3 p-3 rounded-[12px] bg-white border border-slate-200">
                              <div className="w-6 h-6 rounded-[6px] flex items-center justify-center shrink-0" style={{ background: `${ind.accent}15` }}>
                                <Target size={12} style={{ color: ind.accent }} />
                              </div>
                              <span className="text-slate-600 text-xs font-bold">{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <a href="mailto:contact@nexyovi.com" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[#F5A800] hover:text-[#e09a00] transition-colors duration-300">
                        Discuss Your {ind.name} Project
                        <ArrowRight size={14} />
                      </a>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          SECTION NEW — COMPLIANCE & SECURITY (dark)
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5A800]/6 blur-[140px] rounded-full" />
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.6)]" />
              <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest">Sector-Specific Compliance</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-6">
              Built for Regulated <span className="text-[#F5A800]">Environments.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed max-w-xl font-medium">
              We engineer systems that meet the strictest security and compliance standards by default, ensuring your data is protected and auditable.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
            {industries.map((ind, i) => (
              <motion.div key={ind.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4, ease: EASE_EXPO }}>
                <div className="text-[#F5A800] text-sm font-black uppercase tracking-widest mb-3">{ind.name}</div>
                <div className="flex flex-col gap-1.5">
                  {(ind.compliance || []).map((c: string) => (
                    <div key={c} className="text-white/60 text-xs font-medium">{c}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-10 max-w-xl">
            All systems are engineered to support PCI-DSS, HIPAA, SOC 2, and ISO 27001 requirements. Compliance validation is performed in partnership with your compliance team and third-party auditors.
          </p>
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
              The following examples represent the types of systems we design and deliver across industries. Each project reflects a real engagement with measurable outcomes.
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
                    <div className="relative w-11 h-11 rounded-[14px] bg-[#030303] border border-white/10 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-[#F5A800]/40 transition-colors duration-300">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                      <Icon size={20} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{cs.industry}</span>
                      </div>
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
          SECTION NEW — TECHNOLOGIES BY INDUSTRY (dark)
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/8 rounded-full blur-[140px]" />
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Technologies by Industry</span>
            </div>
            <TextReveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-[-0.04em] leading-[0.95]">
                Right Stack.{' '}<span className="text-[#F5A800]">Right Industry.</span>
              </h2>
            </TextReveal>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { industry: 'FinTech', tech: ['Go', 'Kafka', 'PostgreSQL', 'Terraform'] },
              { industry: 'HealthTech', tech: ['FHIR', 'Python', 'React', 'WebRTC'] },
              { industry: 'GovTech', tech: ['Rust', 'PostgreSQL', 'Terraform', 'Air-Gapped'] },
              { industry: 'Energy', tech: ['Kafka', 'TimescaleDB', 'Grafana', 'MQTT'] },
            ].map((item) => (
              <motion.div
                key={item.industry}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE_EXPO }}
                className="p-6 rounded-[16px] bg-white/[0.02] border border-white/[0.06]"
              >
                <h3 className="text-sm font-bold text-white mb-3">{item.industry}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {item.tech.map((t) => (
                    <span key={t} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/40">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
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
                  <div className="relative w-11 h-11 rounded-[14px] bg-[#030303] border border-white/10 flex items-center justify-center mb-4 overflow-hidden shadow-sm group-hover:border-[#F5A800]/40 group-hover:scale-110 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                    <Icon size={20} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors duration-300" />
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
          SECTION NEW — ARCHITECTURE DIAGRAM (creamy white)
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">
        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Our Delivery Lifecycle</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95]">
              From Challenge to <span className="text-[#F5A800]">Outcome.</span>
            </h2>
          </motion.div>
          <div className="flex items-center justify-center gap-1.5 md:gap-2 max-w-6xl mx-auto">
            {[
              { label: 'Industry\nChallenges' },
              { label: 'Discovery\n& Audit' },
              { label: 'Architecture\nDesign' },
              { label: 'Engineering\n& Build' },
              { label: 'Deployment' },
              { label: 'Operations\n& Scale' },
              { label: 'Outcomes' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: EASE_EXPO }}
                className="flex items-center gap-2 md:gap-3"
              >
                <div className="px-3 py-2.5 rounded-[12px] bg-white border border-slate-200 shadow-sm hover:border-[#F5A800]/40 hover:shadow-md transition-all duration-300">
                  <span className="text-[10px] md:text-[12px] font-bold text-slate-700 whitespace-pre-line leading-tight text-center block">{item.label}</span>
                </div>
                {i < 6 && (
                  <svg className="w-4 h-4 text-[#F5A800] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION NEW — OUR APPROACH TO TECHNOLOGY (creamy white)
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">
        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Our Approach to Technology</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95]">
              Build. Secure. <span className="text-[#F5A800]">Operate. Scale.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Build', desc: 'Custom software, AI systems, and cloud platforms engineered for performance and maintainability.' },
              { step: '02', title: 'Secure', desc: 'Security-first architecture with zero-trust, encryption, and embedded compliance frameworks.' },
              { step: '03', title: 'Operate', desc: '24/7 monitoring, incident response, and reliability engineering for production systems.' },
              { step: '04', title: 'Scale', desc: 'Cloud-native growth architecture designed to handle 10x traffic without re-architecture.' },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE_EXPO }}
                className="p-6 rounded-[16px] bg-white border border-slate-200 text-center"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 9 — WHY ORGANIZATIONS CHOOSE NEXYOVI
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5A800]/5 via-transparent to-transparent pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest">Why Organizations Choose Nexyovi</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-6">
              Engineered for{' '}
              <span className="text-[#F5A800]">Enterprise Impact.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed font-medium">
              Organizations across regulated industries choose Nexyovi for our engineering discipline, security architecture, and commitment to long-term outcomes over short-term deliverables.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_EXPO }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={18} className="text-[#F5A800] shrink-0" />
                    <h3 className="text-base font-bold text-white">{p.title}</h3>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <CTAButton className="group inline-flex items-center gap-2 text-[#F5A800] font-bold text-sm tracking-wide">
                    {p.title === 'Engineering-First Culture' && 'Explore Our Services'}
                    {p.title === 'Security-First Architecture' && 'View Security Practices'}
                    {p.title === 'AI & Automation Expertise' && 'Explore AI Services'}
                    {p.title === 'Long-Term Partnership Model' && 'Start a Project'}
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </CTAButton>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          SECTION 8 — HOW WE WORK
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">
        <div className="container relative z-10 mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_EXPO }} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">How We Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-6">
              Engineering <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">Excellence.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              We integrate seamlessly with your operations to deliver robust solutions.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div className="group p-8 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 hover:bg-slate-50 transition-all duration-500">
              <div className="relative w-12 h-12 rounded-[16px] bg-[#030303] border border-white/10 flex items-center justify-center mb-5 overflow-hidden shadow-sm group-hover:border-[#F5A800]/40 group-hover:scale-110 transition-all duration-500"><div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" /><Users size={22} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors duration-300" /></div>
              <h3 className="text-slate-950 font-black text-xl mb-1">Dedicated Tech Lead</h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">A senior architect oversees your entire engagement from discovery to deployment.</p>
            </motion.div>
            <motion.div className="group p-8 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 hover:bg-slate-50 transition-all duration-500">
              <div className="relative w-12 h-12 rounded-[16px] bg-[#030303] border border-white/10 flex items-center justify-center mb-5 overflow-hidden shadow-sm group-hover:border-[#F5A800]/40 group-hover:scale-110 transition-all duration-500"><div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" /><Network size={22} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors duration-300" /></div>
              <h3 className="text-slate-950 font-black text-xl mb-1">Distributed Teams</h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">Delivery coverage across East Africa, Europe, and North America for extended overlap windows, faster responses, and smoother handoffs.</p>
            </motion.div>
            <motion.div className="group p-8 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 hover:bg-slate-50 transition-all duration-500">
              <div className="relative w-12 h-12 rounded-[16px] bg-[#030303] border border-white/10 flex items-center justify-center mb-5 overflow-hidden shadow-sm group-hover:border-[#F5A800]/40 group-hover:scale-110 transition-all duration-500"><div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" /><Code size={22} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors duration-300" /></div>
              <h3 className="text-slate-950 font-black text-xl mb-1">Agile Delivery</h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">Iterative development with continuous integration and transparent progress tracking.</p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════════════════════
          SECTION 10 — FINAL CTA (dark)
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#F5A800]/6 rounded-full blur-[140px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE_EXPO }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#F5A800]/20 backdrop-blur-md mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.6)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A800]">Discuss Your Project</span>
            </div>

            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-6">
                Let's Engineer{' '}
                <span className="text-[#F5A800]">Your Solution.</span>
              </h2>
            </TextReveal>

            <TextReveal delay={0.1}>
              <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
                Tell us about your industry, your challenges, and your goals. We'll put together a technical strategy session with a senior architect — no sales pitch, just engineering guidance.
              </p>
            </TextReveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6, ease: EASE_EXPO }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <CTAButton className="group btn-gold text-[15px] px-10 py-5">
                <span className="relative z-10">Schedule a Consultation</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              </CTAButton>
              <CTAButton className="group btn-ghost text-[15px] px-10 py-5">
                <span className="relative z-10">Request a Technical Brief</span>
              </CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-6 mt-10"
            >
              {['Free 45-minute strategy session', 'Senior architect assigned to your project', 'No obligation, strict NDA'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#F5A800]" />
                  <span className="text-white/50 text-sm font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
