import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Compass,
  Cpu,
  Database,
  FileCode,
  Globe,
  Heart,
  Lightbulb,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Network,
  Shield,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import React, { lazy, Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import PartnerCarousel from '../components/PartnerCarousel';
import bankCaseStudy from '../assets/bank_security_case_study_1777103333442.png';
import logisticsCaseStudy from '../assets/logistics_ai_case_study_1777103353905.png';
import workspaceCaseStudy from '../assets/workspace_case_study.png';

const NeuralCanvas = lazy(() => import('../components/three/NeuralCanvas'));
const WorldMap = lazy(() => import('../components/WorldMap'));

/* ═══════════════════════════════════════════
   Animated Counter
   ═══════════════════════════════════════════ */
const Counter = ({ value, duration = 2, decimals = 0, suffix = '' }: { value: number; duration?: number; decimals?: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals) + suffix);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      animate(count, value, { duration, ease: 'easeOut' });
    }
  }, [isInView, value, duration, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

/* ═══════════════════════════════════════════
   Animation Variants
   ═══════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const heroReveal = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(12px)' },
  visible: {
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */
const timeline = [
  { year: '2020', title: 'Founded in Addis Ababa', desc: 'Bootstrapped from a co-working space with a vision to build enterprise-grade software for African and global markets.' },
  { year: '2021', title: 'First Enterprise Client', desc: 'Secured our first Fortune 500 client, deploying a custom cybersecurity framework across their entire infrastructure.' },
  { year: '2022', title: 'Miami Engineering Hub', desc: 'Opened a US-based engineering hub in Miami, bridging African talent with American markets and adding 30+ senior engineers.' },
  { year: '2023', title: 'Full-Suite Platform', desc: 'Launched comprehensive service divisions covering AI, data engineering, cloud infrastructure, and managed technology.' },
  { year: '2024', title: 'Global Expansion', desc: 'Crossed 100+ enterprise deployments, 50+ technology stacks, and achieved 99.99% infrastructure availability across all systems.' },
];

const byTheNumbers = [
  { value: 100, label: 'Enterprise Deployments', suffix: '+', icon: Building2 },
  { value: 99.99, label: 'Infrastructure Uptime', suffix: '%', icon: ShieldCheck, decimals: 2 },
  { value: 50, label: 'Technology Stacks', suffix: '+', icon: Code2 },
  { value: 500, label: 'Million Transactions', suffix: 'M+', icon: Zap },
  { value: 24, label: 'Monitoring Coverage', suffix: '/7', icon: Target },
  { value: 12, label: 'Countries Served', suffix: '', icon: Globe },
];

const differentiators = [
  { icon: Zap, title: 'Velocity Without Compromise', desc: 'Enterprise-grade solutions shipped faster than any competitor — without sacrificing security, quality, or architecture integrity.', accent: '#F5A800' },
  { icon: Globe, title: 'Bi-Continental Engineering', desc: 'Our East Africa + US model means your project never sleeps. Around-the-clock development cycles cut delivery time in half.', accent: '#10b981' },
  { icon: Shield, title: 'Security-First Architecture', desc: 'Every system is built with zero-trust principles, end-to-end encryption, and compliance frameworks embedded from day one.', accent: '#8b5cf6' },
  { icon: Users, title: 'Embedded Partnership', desc: "We don't hand off deliverables — we embed as your technical co-founders, obsessing over outcomes as if your business were our own.", accent: '#06b6d4' },
  { icon: Target, title: 'Measurable ROI', desc: 'Every engagement is tied to quantifiable KPIs — latency reduction, cost savings, deployment velocity, and infrastructure reliability.', accent: '#ec4899' },
];

const caseStudies = [
  {
    title: 'National Banking Security Platform',
    industry: 'FinTech',
    users: '2.4M+',
    tech: 'React, Node.js, AWS',
    result: '65% faster transaction processing',
    image: bankCaseStudy,
    desc: 'Architected a zero-trust security infrastructure for one of East Africa\'s largest financial institutions, processing millions of daily transactions with military-grade encryption.',
  },
  {
    title: 'Predictive Logistics Intelligence',
    industry: 'Logistics & Supply Chain',
    users: '50K+',
    tech: 'Python, Kafka, TensorFlow',
    result: '35% route efficiency improvement',
    image: logisticsCaseStudy,
    desc: 'Built an AI-driven logistics platform that ingests 50K events/second, enabling real-time rerouting and predictive maintenance for a continental transport network.',
  },
  {
    title: 'Enterprise Workspace Mesh',
    industry: 'Government',
    users: '120K+',
    tech: 'React, Go, Kubernetes',
    result: '80% faster deployment cycles',
    image: workspaceCaseStudy,
    desc: 'Designed and deployed a secure digital workspace platform for a government agency, connecting 120K+ employees across 500+ locations with zero-trust access.',
  },
];

const values = [
  { icon: Shield, title: 'Engineering Integrity', desc: 'Every line of code, every architecture decision holds to the highest standard of quality and security.', accent: '#F5A800' },
  { icon: Zap, title: 'Relentless Velocity', desc: 'Speed is a feature. We ship enterprise-grade solutions faster than anyone in the market, without sacrificing quality.', accent: '#f59e0b' },
  { icon: Globe, title: 'Global Ambition', desc: 'African innovation engineered to compete and win on the world stage. Great technology knows no borders.', accent: '#10b981' },
  { icon: Users, title: 'Deep Partnership', desc: 'Not vendors but technical co-founders committed to your mission and outcomes.', accent: '#8b5cf6' },
  { icon: Code2, title: 'Technical Excellence', desc: 'Mastery is non-negotiable. We obsess over architecture, performance, and scalability in everything we ship.', accent: '#06b6d4' },
  { icon: Heart, title: 'Client Obsession', desc: 'Your success is our success. We measure our performance entirely by the quantifiable improvements we deliver.', accent: '#ec4899' },
];

const techEcosystem = [
  { category: 'Frontend', icon: Code2, items: ['React', 'Next.js', 'Angular', 'Vue.js', 'Flutter'], accent: '#06b6d4' },
  { category: 'Backend', icon: FileCode, items: ['Node.js', 'Python', 'Java', 'Go', 'Rust'], accent: '#8b5cf6' },
  { category: 'Cloud', icon: Cloud, items: ['AWS', 'Azure', 'Google Cloud', 'DigitalOcean', 'Vercel'], accent: '#F5A800' },
  { category: 'DevOps', icon: Network, items: ['Docker', 'Kubernetes', 'Terraform', 'Ansible', 'CI/CD'], accent: '#ec4899' },
  { category: 'AI & Data', icon: Cpu, items: ['OpenAI', 'LangChain', 'TensorFlow', 'PyTorch', 'Vector DB'], accent: '#10b981' },
  { category: 'Databases', icon: Database, items: ['PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'Elasticsearch'], accent: '#f59e0b' },
];

const culturePillars = [
  { icon: Users, stat: '50+', statLabel: 'Engineers', title: 'Team Collaboration', desc: 'Cross-functional squads across Addis Ababa and Miami work in synchronized sprints.' },
  { icon: Zap, stat: '2wk', statLabel: 'Sprint Cycle', title: 'Agile Execution', desc: 'Two-week sprints with daily async standups, CI/CD pipelines, and rigorous code review standards.' },
  { icon: Lightbulb, stat: '20%', statLabel: 'R&D Time', title: 'Innovation Mindset', desc: '20% of engineering time dedicated to R&D and internal hackathons.' },
  { icon: Globe, stat: '4+', statLabel: 'Countries', title: 'Global Operations', desc: 'Our bi-continental model means your project never sleeps.' },
];

const deliverySteps = [
  { step: '01', title: 'Discovery & Audit', desc: 'Deep-dive into your current infrastructure, codebase, security posture, and business objectives.', icon: Search },
  { step: '02', title: 'Architecture Design', desc: 'We design a scalable, secure architecture tailored to your specific requirements and growth trajectory.', icon: Compass },
  { step: '03', title: 'Security Review', desc: 'Zero-trust principles applied at every layer — threat modeling, compliance mapping, and risk assessment.', icon: Lock },
  { step: '04', title: 'Development Sprint', desc: 'Agile, CI/CD-driven development with daily progress tracking, code reviews, and continuous integration.', icon: Code2 },
  { step: '05', title: 'QA & Testing', desc: 'Automated testing suites, load testing, penetration testing, and user acceptance validation.', icon: CheckCircle2 },
  { step: '06', title: 'Deployment', desc: 'Zero-downtime deployment with rollback capabilities, blue-green strategy, and performance monitoring.', icon: Rocket },
  { step: '07', title: 'Monitoring & Support', desc: '24/7 infrastructure monitoring, incident response, and dedicated support with SLA guarantees.', icon: BarChart3 },
];

const certs = [
  { name: 'ISO 27001', desc: 'Information Security Management', status: 'In Progress' },
  { name: 'SOC 2 Type II', desc: 'Security & Availability Controls', status: 'In Progress' },
  { name: 'GDPR', desc: 'EU Data Protection Regulation', status: 'Compliant' },
  { name: 'HIPAA', desc: 'Healthcare Data Privacy & Security', status: 'Compliant' },
  { name: 'AWS Partner', desc: 'Amazon Web Services Partner Network', status: 'In Progress' },
  { name: 'Microsoft Partner', desc: 'Microsoft Cloud Solution Partner', status: 'In Progress' },
];

const insights = [
  { icon: Cpu, title: 'AI Trends 2026', desc: 'How enterprises are deploying LLMs in production — patterns, pitfalls, and reference architectures.', tag: 'Research', date: 'May 2026' },
  { icon: Shield, title: 'Cybersecurity Landscape', desc: 'Zero-trust adoption across African financial institutions: challenges and solutions.', tag: 'Report', date: 'Apr 2026' },
  { icon: Cloud, title: 'Cloud Architecture Guide', desc: 'Multi-region deployment strategies for regulated industries with compliance requirements.', tag: 'Guide', date: 'Mar 2026' },
];

const companyStatItems = [
  { value: 100, label: 'Enterprise Deployments', suffix: '+', icon: BarChart3 },
  { value: 50, label: 'Technology Stacks', suffix: '+', icon: Code2 },
  { value: 99.99, label: 'Infrastructure Availability', suffix: '%', icon: ShieldCheck, decimals: 2 },
  { value: 24, label: 'Active Monitoring', suffix: '/7', icon: Target },
];

const expandedProfiles = [
  { id: '1', certs: ['MBA – Strategic Leadership', 'AWS Certified Solutions Architect', 'Google Cloud Professional'], specializations: ['Business Strategy', 'AI-Driven Products', 'Enterprise Scale-Up'], experience: '12+ years' },
  { id: '2', certs: ['AWS Solutions Architect Pro', 'Google Cloud Professional', 'Kubernetes CKA'], specializations: ['Distributed Systems', 'Cloud Architecture', 'AI/ML Infrastructure'], experience: '10+ years' },
  { id: '3', certs: ['CISSP – Security Professional', 'Certified Scrum Master', 'Azure Developer Associate'], specializations: ['Secure Software Design', 'System Architecture', 'DevSecOps'], experience: '9+ years' },
  { id: '4', certs: ['CISSP', 'CEH – Ethical Hacker', 'CompTIA Security+'], specializations: ['Threat Intelligence', 'Zero-Trust Architecture', 'Digital Forensics'], experience: '11+ years' },
];

/* ═══════════════════════════════════════════
   Section Badge Helper
   ═══════════════════════════════════════════ */
const SectionBadge = ({ label, dark }: { label: string; dark?: boolean }) => (
  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${dark ? 'bg-white/[0.03] border border-white/[0.08]' : 'bg-slate-100 border border-slate-200'}`}>
    <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dark ? 'text-white/60' : 'text-slate-600'}`}>{label}</span>
  </div>
);

/* ═══════════════════════════════════════════
   Search icon for delivery steps
   ═══════════════════════════════════════════ */
function Search({ size }: { size?: number }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function Rocket({ size }: { size?: number }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Company Page Component
   ═══════════════════════════════════════════ */
export default function Company() {
  const { team, jobs } = useSite();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 800], [0, -100]);
  const canvasY = useTransform(scrollY, [0, 800], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const featuredJobs = jobs.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f4f4f5]">

      {/* ═══════════════════════════════════════
          1. HERO — Dark · 3D NeuralCanvas · Scroll Parallax
         ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#02040a]">
        <motion.div style={{ y: canvasY }} className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <NeuralCanvas />
          </Suspense>
          <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/60 via-[#02040a]/30 to-[#02040a]" />
        </motion.div>

        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[#F5A800]/10 rounded-full blur-[160px]" />
          <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/8 rounded-full blur-[140px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(245,168,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(245,168,0,0.8) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#02040a] via-[#02040a]/80 to-transparent z-10 pointer-events-none" />

        <motion.div style={{ y: contentY, opacity: heroOpacity }} className="relative z-20 container max-w-5xl mx-auto px-6 pt-24">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center text-center">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.10] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#FFD166]">About Nexyovi</span>
            </motion.div>

            <motion.h1 variants={heroReveal} className="text-5xl md:text-7xl lg:text-[84px] font-black text-white tracking-[-0.04em] leading-[1.0] mb-8 max-w-5xl">
              Engineering the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">
                Future of Enterprise.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[18px] md:text-[20px] text-white/50 font-medium leading-relaxed mb-10 max-w-2xl">
              A global collective of engineers, strategists, and systems architects building
              mission-critical technology for businesses, governments, and organizations worldwide.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-20">
              <Link to="/contact" className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-[15px] transition-all hover:scale-105">
                Start a Project
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold text-[15px] transition-all hover:bg-white/10">
                Explore Services
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-4xl">
              {companyStatItems.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-4 md:p-5 text-center">
                    <Icon size={18} className="text-[#F5A800] mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-black text-white tracking-tight">
                      <Counter value={stat.value} suffix={stat.suffix} duration={2.5} decimals={stat.decimals || 0} />
                    </div>
                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-[9px] font-medium text-white/20 uppercase tracking-[0.25em]">Scroll</span>
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          2. OUR STORY — Creamy White · Timeline
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#f4f4f5] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5A800]/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8b5cf6]/5 rounded-full blur-[100px]" />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Our Journey" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              From{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Vision</span> to Enterprise.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg font-medium max-w-xl mx-auto">
              What started as a bold idea in an Addis Ababa co-working space is now a global technology collective.
            </motion.p>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute top-0 bottom-0 left-[27px] w-px bg-gradient-to-b from-[#F5A800]/40 via-slate-300 to-slate-300/40" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="relative pl-16 group"
                >
                  <div className="absolute left-[19px] top-1.5 w-4 h-4 rounded-full bg-[#f4f4f5] border-2 border-slate-300 group-hover:border-[#F5A800] transition-colors duration-300 z-10">
                    <motion.div className="absolute inset-1 rounded-full bg-[#F5A800]" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 + 0.3, duration: 0.3 }} />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 mb-3 group-hover:border-[#F5A800]/30 transition-colors">
                    <span className="text-[10px] font-black text-[#F5A800] uppercase tracking-widest">{item.year}</span>
                  </div>
                  <h3 className="text-slate-950 font-black text-2xl tracking-tight mb-2 group-hover:text-[#F5A800] transition-colors">{item.title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed max-w-xl">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. BY THE NUMBERS — Light Section · Impact Stats
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-white border-t border-slate-200 overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="By the Numbers" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Impact that{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Speaks.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
              Measurable results across every engagement.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {byTheNumbers.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-center group hover:border-[#F5A800]/30 hover:-translate-y-1 transition-all duration-500"
                >
                  <Icon size={20} className="text-[#F5A800] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    <Counter value={stat.value} suffix={stat.suffix} duration={2.5} decimals={(stat as any).decimals || 0} />
                  </div>
                  <div className="text-[9px] font-medium text-slate-400 uppercase tracking-wider mt-2">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Client success metrics */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { metric: '43%', label: 'Avg. Infrastructure Cost Reduction' },
              { metric: '99.99%', label: 'Infrastructure Uptime Achieved' },
              { metric: '3.2M', label: 'Monthly Users Served' },
              { metric: '80%', label: 'Faster Deployment Cycles' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center"
              >
                <div className="text-2xl font-black text-[#F5A800] mb-1">{item.metric}</div>
                <div className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. MISSION, VISION & WHY NEXYOVI — Creamy White
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#F5A800]/4 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-6 mb-16">
            <motion.div variants={fadeUp} className="relative p-10 md:p-12 rounded-[32px] bg-gradient-to-br from-white to-[#f4f4f5] border border-slate-200 overflow-hidden group hover:border-[#F5A800]/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]"><Compass size={160} /></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-6"><Compass size={28} className="text-[#F5A800]" /></div>
                <h3 className="text-3xl font-black text-slate-950 mb-4">Our Mission</h3>
                <p className="text-slate-600 text-lg leading-relaxed">To democratize access to enterprise-grade engineering by delivering scalable, secure, and intelligent systems that eliminate technical debt and accelerate growth for businesses worldwide.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative p-10 md:p-12 rounded-[32px] bg-gradient-to-br from-white to-[#f4f4f5] border border-slate-200 overflow-hidden group hover:border-[#F5A800]/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]"><Target size={160} /></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center mb-6"><Target size={28} className="text-[#10b981]" /></div>
                <h3 className="text-3xl font-black text-slate-950 mb-4">Our Vision</h3>
                <p className="text-slate-600 text-lg leading-relaxed">To be the fundamental technology layer powering the next century of digital innovation, where seamless, robust software infrastructure is treated as a basic utility for every enterprise worldwide.</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Why Nexyovi" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95]">
              Five Reasons to{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Choose Us.</span>
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {differentiators.map((d) => {
              const Icon = d.icon;
              return (
                <motion.div key={d.title} variants={fadeUp} className="group relative p-6 rounded-[20px] bg-white border border-slate-200 hover:border-[#F5A800]/30 transition-all duration-500 text-center">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${d.accent}12`, color: d.accent }}><Icon size={20} /></div>
                  <h3 className="text-sm font-black text-slate-950 mb-2 leading-tight">{d.title}</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed font-medium">{d.desc}</p>
                  <div className="mt-4 h-[2px] w-0 group-hover:w-full transition-all duration-500 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${d.accent}, transparent)` }} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. CASE STUDIES — Creamy White · Enterprise Proof
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#F5A800]/4 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Enterprise Case Studies" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Built for{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Scale.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg font-medium max-w-xl mx-auto">
              Real deployments. Real results. Engineering that makes a measurable difference.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="group bg-white rounded-[24px] border border-slate-200 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[#F5A800]/30"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img src={cs.image} alt={cs.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-slate-700">{cs.industry}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black text-slate-950 mb-3 leading-tight group-hover:text-[#F5A800] transition-colors">{cs.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{cs.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="px-2.5 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-full border border-slate-200">{cs.tech}</span>
                    <span className="px-2.5 py-1 bg-[#F5A800]/5 text-[#F5A800] text-[10px] font-bold rounded-full border border-[#F5A800]/20">{cs.users} users</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#10b981] font-bold text-sm">
                    <CheckCircle2 size={14} />
                    <span>{cs.result}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 text-white text-[12px] font-black uppercase tracking-widest transition-all hover:bg-[#F5A800] hover:scale-105">
              View All Projects <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. CORE PRINCIPLES — Light Section
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Core Principles" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Built on{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Principles.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg font-medium max-w-xl mx-auto">Uncompromising standards that guide our engineering and define every partnership.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} variants={fadeUp} className="group relative rounded-[24px] border border-slate-200 bg-white p-8 overflow-hidden cursor-default hover:border-[#F5A800]/30 transition-all duration-500">
                  <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `linear-gradient(90deg, ${v.accent}, transparent)` }} />
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${v.accent}12`, borderColor: `${v.accent}25`, color: v.accent }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{v.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7. TECHNOLOGY ECOSYSTEM — Creamy White
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[#8b5cf6]/4 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Our Technology Ecosystem" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Technologies We{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Engineer With.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg font-medium max-w-xl mx-auto">
              Modern tooling across the full stack — from frontend to infrastructure.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techEcosystem.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.category} variants={fadeUp} className="group bg-white rounded-[20px] border border-slate-200 p-6 hover:border-[#F5A800]/30 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.accent}12`, color: cat.accent }}>
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-black text-slate-950">{cat.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-bold group-hover:border-[#F5A800]/20 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          8. LEADERSHIP — Creamy White
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#F5A800]/5 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8b5cf6]/5 blur-[100px] rounded-full" />
        </div>
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Engineering Leadership" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              The{' '}<span className="text-slate-500">Collective.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg font-medium max-w-xl mx-auto">
              {team.length} professionals across two continents, united by a mission to engineer the future.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => {
              const profile = expandedProfiles.find((p) => p.id === member.id) || expandedProfiles[i % expandedProfiles.length];
              return (
                <motion.div key={member.id} variants={fadeUp} className="group bg-white rounded-[24px] border border-slate-200 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[#F5A800]/30">
                  <div className="relative aspect-[4/3] overflow-hidden m-3 rounded-[16px] bg-slate-100">
                    {member.img ? (
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 text-4xl font-black">?</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-200/60 via-transparent to-transparent opacity-80" />
                    <a href="#" className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0A66C2] hover:bg-white transition-all"><Linkedin size={13} /></a>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-slate-950 tracking-tight mb-0.5">{member.name}</h3>
                    <p className="text-[#F5A800] text-[10px] font-black uppercase tracking-[0.2em] mb-3">{member.role}</p>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed mb-4">{member.bio}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{profile.experience} experience</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {profile.specializations.map((s, j) => (
                        <span key={j} className="px-2 py-1 bg-slate-50 text-slate-500 text-[9px] font-bold rounded-full border border-slate-200">{s}</span>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Award size={10} /> Certifications</div>
                      {profile.certs.slice(0, 2).map((c, j) => (
                        <div key={j} className="flex items-start gap-2 mb-1">
                          <CheckCircle2 size={10} className="text-[#10b981] shrink-0 mt-0.5" />
                          <span className="text-slate-500 text-[10px] font-medium">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          9. ENTERPRISE DELIVERY FRAMEWORK — Light Section
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-white border-t border-slate-200 overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Enterprise Delivery Framework" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              How We{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Deliver.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
              A proven 7-step framework — from discovery to ongoing support.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {deliverySteps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="group relative rounded-[20px] border border-slate-200 bg-white p-6 overflow-hidden hover:border-[#F5A800]/30 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 text-[80px] font-black text-slate-200 leading-none -mr-2 -mt-4 select-none">{step.step}</div>
                  <div className="w-10 h-10 rounded-xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center text-[#F5A800] mb-5 group-hover:bg-[#F5A800] group-hover:text-white transition-all duration-300">
                    <StepIcon size={18} />
                  </div>
                  <div className="text-[10px] font-black text-[#F5A800] uppercase tracking-widest mb-2">{step.step}</div>
                  <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          10. CULTURE — Creamy White
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F5A800]/5 blur-[150px] rounded-full" />
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#8b5cf6]/5 blur-[120px] rounded-full" />
        </div>
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="How We Work" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Culture is our{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Infrastructure.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg font-medium max-w-xl mx-auto">The practices, values, and rhythms that make Nexyovi exceptional.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {culturePillars.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} variants={fadeUp} className="group relative p-6 bg-white rounded-2xl border border-slate-200 hover:border-[#F5A800]/30 transition-all duration-500 overflow-hidden">
                  <div className="w-11 h-11 rounded-xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center text-[#F5A800] mb-5 group-hover:bg-[#F5A800] group-hover:text-white transition-all duration-300"><Icon size={20} /></div>
                  <div className="text-2xl font-black text-slate-950 mb-0.5">{p.stat}</div>
                  <div className="text-[#F5A800] text-[10px] font-black uppercase tracking-widest mb-4">{p.statLabel}</div>
                  <h3 className="text-base font-black text-slate-950 mb-3">{p.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          11. TRUST & CERTIFICATIONS — Creamy White
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#F5A800]/5 blur-[100px] rounded-full" />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Trust & Compliance" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Certifications{' '}<span className="text-slate-500">& Standards.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg font-medium max-w-xl mx-auto">We hold ourselves to the highest standards of security, privacy, and compliance — worldwide.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map((cert) => (
              <motion.div key={cert.name} variants={fadeUp} className="group p-6 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 transition-all duration-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center text-[#F5A800] group-hover:bg-[#F5A800] group-hover:text-white transition-all duration-500"><ShieldCheck size={20} /></div>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${cert.status === 'Compliant' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-amber-50 border-amber-200 text-amber-600'}`}>{cert.status}</span>
                </div>
                <h3 className="text-lg font-black text-slate-950 mb-1 group-hover:text-[#F5A800] transition-colors">{cert.name}</h3>
                <p className="text-slate-500 text-sm font-medium">{cert.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/legal" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 text-white text-[12px] font-black uppercase tracking-widest transition-all hover:bg-[#F5A800] hover:scale-105">
              Visit Trust Center <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          12. OPEN POSITIONS — Creamy White
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Join the Team" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Join{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Nexyovi.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg font-medium max-w-xl mx-auto">
              Build the future of enterprise technology with us.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3 max-w-3xl mx-auto">
            {featuredJobs.length > 0 ? (
              featuredJobs.map((job, i) => (
                <motion.div
                  key={job.id || i}
                  variants={fadeUp}
                  className="group bg-white rounded-[16px] border border-slate-200 p-5 hover:border-[#F5A800]/30 transition-all duration-500"
                >
                  <Link to={`/careers/${job.id}`} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center text-[#F5A800] shrink-0"><Briefcase size={18} /></div>
                      <div className="text-left">
                        <h3 className="text-base font-black text-slate-950 group-hover:text-[#F5A800] transition-colors">{job.title}</h3>
                        <div className="flex items-center gap-3 text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-0.5">
                          <span>{job.dept}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span>{job.location}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-[#F5A800] group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.p variants={fadeUp} className="text-center text-slate-400 text-sm font-medium">No open positions at this time. Check back soon.</motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link to="/careers" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 text-white text-[12px] font-black uppercase tracking-widest transition-all hover:bg-[#F5A800] hover:scale-105">
              View All Openings <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          13. THOUGHT LEADERSHIP — Light Section
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Thought Leadership" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Insights &{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Research.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
              Engineering knowledge shared with the community.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-4">
            {insights.map((article, i) => {
              const Icon = article.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group relative rounded-[24px] border border-slate-200 bg-white p-8 overflow-hidden hover:border-[#F5A800]/30 transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center text-[#F5A800] group-hover:bg-[#F5A800] group-hover:text-white transition-all duration-500"><Icon size={22} /></div>
                    <span className="text-[9px] font-black text-[#F5A800] uppercase tracking-widest px-3 py-1 rounded-full bg-[#F5A800]/10 border border-[#F5A800]/20">{article.tag}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-[#F5A800] transition-colors">{article.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">{article.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className="text-slate-400 text-[10px] font-medium">{article.date}</span>
                    <span className="text-[#F5A800] text-[10px] font-black uppercase tracking-widest group-hover:gap-2 transition-all flex items-center gap-1">
                      Read <ArrowRight size={10} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          14. GLOBAL HUBS — Creamy White · WorldMap
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#8b5cf6]/5 rounded-full blur-[160px]" />
        </div>
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Global Presence" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Two Continents.{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">One Mission.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg font-medium max-w-xl mx-auto">Engineering hubs in Addis Ababa and Miami, delivering around-the-clock innovation.</motion.p>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-[24px] overflow-hidden border border-slate-200">
            <Suspense fallback={<div className="aspect-[2/1] bg-[#02040A] flex items-center justify-center"><div className="text-white/20 text-sm font-medium">Loading map...</div></div>}>
              <WorldMap />
            </Suspense>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 divide-x divide-slate-200 rounded-[24px] overflow-hidden border border-slate-200 bg-white mt-0" style={{ marginTop: -1 }}>
            <div className="p-8 text-center">
              <div className="text-sm font-bold text-[#F5A800] uppercase tracking-widest mb-2"><MapPin size={14} className="inline mr-1" /> Headquarters</div>
              <div className="text-xl font-black text-slate-950 mb-1">Addis Ababa, Ethiopia</div>
              <p className="text-slate-500 text-sm font-medium">Bole District · East Africa Hub</p>
            </div>
            <div className="p-8 text-center">
              <div className="text-sm font-bold text-[#F5A800] uppercase tracking-widest mb-2"><MapPin size={14} className="inline mr-1" /> Remote Hub</div>
              <div className="text-xl font-black text-slate-950 mb-1">Miami, USA</div>
              <p className="text-slate-500 text-sm font-medium">Florida · Americas Hub</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          15. CLIENTS & PARTNERS — Creamy White
         ═══════════════════════════════════════ */}
      <PartnerCarousel />

      {/* ═══════════════════════════════════════
          16. FINAL CTA — Light Section
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-white border-t border-slate-200 overflow-hidden">
        <div className="container max-w-4xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-12 md:p-20 text-center overflow-hidden">
            <div className="relative z-10">
              <motion.div variants={fadeUp} className="w-16 h-16 rounded-2xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mx-auto mb-8"><Mail size={24} className="text-[#F5A800]" /></motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-6">
                Let's Build{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Together.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 text-lg leading-relaxed max-w-lg mx-auto mb-10">
                From ideation to enterprise deployment — our engineers become your team, shipping critical infrastructure faster than you thought possible.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-[15px] transition-all hover:scale-105 hover:bg-[#F5A800]">
                  Start a Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[15px] transition-all hover:bg-slate-200">
                  View Services
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
