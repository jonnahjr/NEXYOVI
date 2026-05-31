import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
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

const NeuralCanvas = lazy(() => import('../components/three/NeuralCanvas'));

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
const focusAreas = [
  { title: 'Software Development', desc: 'Custom platforms, SaaS products, and business systems built for growth.' },
  { title: 'AI & Automation', desc: 'Intelligent tools, workflow automation, and LLM-powered solutions.' },
  { title: 'Cloud & Infrastructure', desc: 'Servers, DevOps, deployment pipelines, and monitoring.' },
  { title: 'Mobile Applications', desc: 'iOS and Android apps for customers and internal teams.' },
  { title: 'Data & Analytics', desc: 'Dashboards, reporting, and business intelligence.' },
  { title: 'Technology Consulting', desc: 'Architecture reviews, strategy, and digital transformation.' },
];

const featuredProjects = [
  { title: 'Nexi Market', desc: 'Marketplace platform for online commerce.', tag: 'Platform' },
  { title: 'Nexi Locate', desc: 'Location discovery platform for Addis Ababa.', tag: 'Discovery' },
  { title: 'Tele-Psychiatry', desc: 'Digital healthcare consultation platform.', tag: 'Healthcare' },
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

/* ═══════════════════════════════════════════
   Section Badge Helper
   ═══════════════════════════════════════════ */
const SectionBadge = ({ label, dark }: { label: string; dark?: boolean }) => (
  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${dark ? 'bg-white/[0.03] border border-white/[0.08]' : 'bg-slate-100 border border-slate-200'}`}>
    <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dark ? 'text-white/60' : 'text-slate-600'}`}>{label}</span>
  </div>
);

/* ═══════════════════════════════════════════
   Inline SVG icons
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
              Modern software.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">
                Smarter AI.
              </span>
              {' '}Real results.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[18px] md:text-[20px] text-white/50 font-medium leading-relaxed mb-10 max-w-2xl">
              A modern software and AI development company helping businesses build
              digital products, automate workflows, and modernize operations.
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
          2. OUR STORY — Dark
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#02040a] border-t border-white/[0.05] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5A800]/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8b5cf6]/8 rounded-full blur-[100px]" />
        </div>
        <div className="container max-w-4xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Our Story" dark />
            </motion.div>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
              Nexyovi was founded to help businesses access high-quality software engineering, AI development, cloud infrastructure, and digital transformation services without the complexity of large consulting firms.
            </motion.p>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto">
              Today we partner with startups, growing businesses, and organizations to build software products, automate operations, and modernize technology systems.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. WHAT WE FOCUS ON — Light Section
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-white border-t border-slate-200 overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="What We Focus On" />
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {focusAreas.map((area) => (
              <motion.div
                key={area.title}
                variants={fadeUp}
                className="group rounded-[20px] border border-slate-200 bg-white p-6 hover:border-[#F5A800]/30 transition-all duration-500"
              >
                <h3 className="text-lg font-black text-slate-950 mb-2 group-hover:text-[#F5A800] transition-colors">{area.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{area.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. MISSION & VISION — Creamy White
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#f4f4f5] border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#F5A800]/4 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeUp} className="relative p-10 md:p-12 rounded-[32px] bg-gradient-to-br from-white to-[#f4f4f5] border border-slate-200 overflow-hidden group hover:border-[#F5A800]/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]"><Compass size={160} /></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-6"><Compass size={28} className="text-[#F5A800]" /></div>
                <h3 className="text-3xl font-black text-slate-950 mb-4">Our Mission</h3>
                <p className="text-slate-600 text-lg leading-relaxed">To help every business — from startup to enterprise — build better digital products, automate complex workflows, and modernize operations with modern software and AI.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative p-10 md:p-12 rounded-[32px] bg-gradient-to-br from-white to-[#f4f4f5] border border-slate-200 overflow-hidden group hover:border-[#F5A800]/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]"><Target size={160} /></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center mb-6"><Target size={28} className="text-[#10b981]" /></div>
                <h3 className="text-3xl font-black text-slate-950 mb-4">Our Vision</h3>
                <p className="text-slate-600 text-lg leading-relaxed">To be the trusted partner that makes modern software and AI accessible, practical, and impactful for every organization — no hype, just results.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. FEATURED PROJECTS — Dark Section
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#02040a] border-t border-white/[0.05] overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Featured Projects" dark />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
              Products We{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Built.</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-white/[0.03] rounded-[24px] border border-white/[0.08] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#F5A800]/30 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#F5A800] group-hover:text-white transition-all duration-300">
                  <Code2 size={24} className="text-[#F5A800] group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] font-black text-[#F5A800] uppercase tracking-widest mb-2 block">{project.tag}</span>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#F5A800] transition-colors">{project.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-medium">{project.desc}</p>
              </motion.div>
            ))}
          </div>
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
          7. TECHNOLOGY ECOSYSTEM — Dark Section
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#02040a] border-t border-white/[0.05] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[#8b5cf6]/8 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Our Technology Ecosystem" dark />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
              Technologies We{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Engineer With.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-lg font-medium max-w-xl mx-auto">
              Modern tooling across the full stack — from frontend to infrastructure.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techEcosystem.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.category} variants={fadeUp} className="group bg-white/[0.03] rounded-[20px] border border-white/[0.08] p-6 hover:border-[#F5A800]/30 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.accent}15`, color: cat.accent }}>
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-black text-white">{cat.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/40 text-[11px] font-bold group-hover:border-[#F5A800]/20 transition-all">
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
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Leadership" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Meet the{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Team.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
              Engineers, designers, and strategists working across two continents.
            </motion.p>
          </motion.div>

          {/* Founder spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <div className="w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden border-2 border-[#F5A800]/20">
              {team.find((m: any) => m.id === '1')?.img ? (
                <img src={team.find((m: any) => m.id === '1')?.img} alt="Yonas Bogale" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#F5A800]/10 flex items-center justify-center">
                  <span className="text-3xl font-black text-[#F5A800]">YB</span>
                </div>
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight mb-1">Yonas Bogale</h2>
            <p className="text-[#F5A800] text-[12px] font-black uppercase tracking-[0.2em] mb-4">Founder & CEO</p>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
              Leading Nexyovi's mission to build practical software, AI solutions, and digital infrastructure for modern businesses.
            </p>
          </motion.div>

          {/* Team grid */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.filter((m: any) => m.id !== '1').map((member: any) => (
              <motion.div
                key={member.id}
                variants={fadeUp}
                className="group bg-white rounded-[24px] border border-slate-200 p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#F5A800]/30"
              >
                <div className="w-20 h-20 rounded-full mx-auto mb-5 overflow-hidden border-2 border-transparent group-hover:border-[#F5A800]/30 transition-all duration-500">
                  {member.img ? (
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-black text-xl" style={{ backgroundColor: member.color || '#8b5cf6' }}>
                      {member.initials || member.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-black text-slate-950 mb-0.5 group-hover:text-[#F5A800] transition-colors">{member.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-3">{member.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">{member.bio}</p>
              </motion.div>
            ))}
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
          10. TRUST & CERTIFICATIONS — Dark Section
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#02040a] border-t border-white/[0.05] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#F5A800]/8 blur-[100px] rounded-full" />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Trust & Compliance" dark />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
              Certifications{' '}<span className="text-white/40">& Standards.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-lg font-medium max-w-xl mx-auto">We hold ourselves to the highest standards of security, privacy, and compliance — worldwide.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map((cert) => (
              <motion.div key={cert.name} variants={fadeUp} className="group p-6 rounded-[24px] bg-white/[0.03] border border-white/[0.08] hover:border-[#F5A800]/40 transition-all duration-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center text-[#F5A800] group-hover:bg-[#F5A800] group-hover:text-white transition-all duration-500"><ShieldCheck size={20} /></div>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${cert.status === 'Compliant' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>{cert.status}</span>
                </div>
                <h3 className="text-lg font-black text-white mb-1 group-hover:text-[#F5A800] transition-colors">{cert.name}</h3>
                <p className="text-white/50 text-sm font-medium">{cert.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          11. CAREERS — Dark Section
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#02040a] border-t border-white/[0.05] overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Careers" dark />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
              Join the{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Team.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-lg font-medium max-w-xl mx-auto">Build modern software and AI solutions with a team that ships, learns, and grows together.</motion.p>
          </motion.div>

          {featuredJobs.length > 0 ? (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-4 max-w-3xl mx-auto">
              {featuredJobs.map((job: any) => (
                <motion.div key={job.id} variants={fadeUp} className="group relative bg-white/[0.03] rounded-[20px] border border-white/[0.08] p-6 transition-all duration-500 hover:border-[#F5A800]/30 hover:-translate-y-0.5 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-[#F5A800] transition-colors">{job.title}</h3>
                    <p className="text-white/40 text-sm font-medium mt-1">{job.department} · {job.location}</p>
                  </div>
                  <Link to={`/jobs/${job.id}`} className="shrink-0 w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 group-hover:bg-[#F5A800] group-hover:text-white group-hover:border-[#F5A800] transition-all duration-300">
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={fadeUp} className="text-center pt-4">
                <Link to="/careers" className="inline-flex items-center gap-2 text-[#F5A800] font-black text-[12px] uppercase tracking-widest hover:gap-3 transition-all">
                  View All Openings <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div variants={fadeUp} className="text-center">
              <p className="text-white/30 text-lg font-medium">No open positions right now. Check back soon.</p>
            </motion.div>
          )}
        </div>
      </section>

    </div>
  );
}
