import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  Calendar,
  ChevronDown,
  Cloud,
  Code2,
  Compass,
  Cpu,
  Globe,
  Heart,
  Landmark,
  Linkedin,
  Rocket,
  Shield,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { EASE_EXPO, fadeUp, staggerContainer } from '../lib/animations';
import TextReveal from '../components/TextReveal';


/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */

const featuredProjects = [
  { title: 'Enterprise ERP Platform', desc: 'Full-suite enterprise resource planning system handling inventory, procurement, HR, and financial operations for multi-location organizations.', tag: 'Enterprise Systems', outcome: 'Integrated 12 departments, reduced reporting time by 70%' },
  { title: 'AI Customer Support System', desc: 'Intelligent customer service platform with LLM-powered triage, sentiment analysis, and automated resolution for enterprise support teams.', tag: 'Artificial Intelligence', outcome: 'Automated 45% of support tickets, reduced response time by 60%' },
  { title: 'Logistics Management Platform', desc: 'Real-time fleet tracking, route optimization, warehouse management, and supply chain visibility platform for logistics operators.', tag: 'Logistics', outcome: 'Tracked 2,000+ fleet vehicles, optimized routes saving 30% in fuel costs' },
  { title: 'FinTech Payment Infrastructure', desc: 'High-throughput payment processing platform handling millions of transactions with sub-second settlement and PCI-compliant security.', tag: 'FinTech', outcome: 'Processed 3M+ transactions/month with 99.99% uptime' },
  { title: 'Healthcare Management System', desc: 'HIPAA-compliant hospital management platform with EHR, telemedicine, patient scheduling, and integrated billing workflows.', tag: 'Healthcare', outcome: 'Managed 100K+ patient records, reduced scheduling conflicts by 55%' },
];

const values = [
  { icon: Shield, title: 'Engineering Integrity', desc: 'Every line of code, every architecture decision holds to the highest standard of quality and security.', accent: '#F5A800' },
  { icon: Zap, title: 'Relentless Velocity', desc: 'Speed is a feature. We ship enterprise-grade solutions faster than anyone in the market, without sacrificing quality.', accent: '#f59e0b' },
  { icon: Globe, title: 'Global Ambition', desc: 'African innovation engineered to compete and win on the world stage. Great technology knows no borders.', accent: '#10b981' },
  { icon: Users, title: 'Deep Partnership', desc: 'Not vendors but technical co-founders committed to your mission and outcomes.', accent: '#8b5cf6' },
  { icon: Code2, title: 'Technical Excellence', desc: 'Mastery is non-negotiable. We obsess over architecture, performance, and scalability in everything we ship.', accent: '#06b6d4' },
  { icon: Heart, title: 'Client Obsession', desc: 'Your success is our success. We measure our performance entirely by the quantifiable improvements we deliver.', accent: '#ec4899' },
];

/* ═══════════════════════════════════════════
   Section Badge Helper
   ═══════════════════════════════════════════ */
const SectionBadge = ({ label, dark }: { label: string; dark?: boolean }) => (
  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${dark ? 'bg-white/[0.03] border border-white/[0.08]' : 'bg-white border border-slate-200 shadow-sm'}`}>
    <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${dark ? 'text-white/60' : 'text-slate-700'}`}>{label}</span>
  </div>
);

/* ═══════════════════════════════════════════
   Company Page Component
   ═══════════════════════════════════════════ */
function OrganizationsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="max-w-xl mx-auto"
    >
      {[
        { icon: Rocket, label: 'Startups', desc: 'MVP acceleration, product launches, and scaling engineering teams' },
        { icon: Heart, label: 'NGOs & Non-Profits', desc: 'Mission-critical systems, donor platforms, and operational tools' },
        { icon: ShieldCheck, label: 'Healthcare Providers', desc: 'HIPAA-compliant platforms, telemedicine, and patient analytics' },
        { icon: Landmark, label: 'Financial Institutions', desc: 'Payment infrastructure, fraud detection, and regulatory compliance' },
        { icon: Building2, label: 'Government Organizations', desc: 'Secure digital infrastructure, identity systems, and citizen services' },
      ].map((item, i) => {
        const Icon = item.icon;
        const isOpen = openIndex === i;

        return (
          <motion.div key={item.label} variants={fadeUp} className="mb-3">
            <button
              type="button"
              onClick={() => toggle(i)}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-[20px] bg-white border border-slate-200 hover:border-[#F5A800]/30 transition-all duration-300 text-left group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center shrink-0 text-[#F5A800] group-hover:bg-[#F5A800] group-hover:text-white transition-all duration-300">
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-black text-slate-950 tracking-tight group-hover:text-[#F5A800] transition-colors text-left">
                  {item.label}
                </h3>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-[#F5A800]/10 group-hover:border-[#F5A800]/30 transition-colors"
              >
                <ChevronDown size={14} className="text-slate-500" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 pt-3">
                    <div className="pl-[60px]">
                      <p className="text-slate-500 text-[13px] leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function Company() {
  const { team, settings } = useSite();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <div className="min-h-screen bg-[#f4f4f5]">

      {/* ═══════════════════════════════════════
          1. HERO — Dark · Glow Orbs · Scroll Parallax
         ═══════════════════════════════════════ */}
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
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 container max-w-5xl mx-auto px-6 text-center pt-32 pb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#F5A800]/20 backdrop-blur-md mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.6)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A800]">About Nexyovi</span>
          </motion.div>

          <TextReveal className="mb-10">
            <h1 className="text-[42px] md:text-[60px] lg:text-[76px] font-black tracking-[-0.03em] leading-[1.05] text-white max-w-5xl mx-auto">
              We build{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">
                software systems
              </span>
              , AI platforms, and{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">
                cloud infrastructure
              </span>
              {' '}that power modern organizations.
            </h1>
          </TextReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: EASE_EXPO }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/contact" className="group btn-gold text-[15px] px-10 py-5">
              <span className="relative z-10">Start a Project</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <Link to="/services" className="group btn-ghost text-[15px] px-10 py-5">
              <span className="relative z-10">Explore Services</span>
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

      {/* ═══════════════════════════════════════
          2. OUR STORY — Dark
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5A800]/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8b5cf6]/8 rounded-full blur-[100px]" />
        </div>
        <div className="container max-w-4xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Our Story" dark />
            </motion.div>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
              Founded in 2024, Nexyovi was built to help businesses access high-quality software engineering, AI development, cloud infrastructure, and digital transformation services without the complexity of large consulting firms.
            </motion.p>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto">
              Today we help startups, enterprises, public institutions, and mission-driven organizations design, build, and scale modern digital systems.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. ORGANIZATIONS WE SUPPORT — Light Section
         ═══════════════════════════════════════ */}
      <section className="relative py-20 md:py-24 bg-white section-divider-light overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#F5A800]/5 blur-[100px] rounded-full" />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-10">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Organizations We Support" />
            </motion.div>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
              From high-growth startups to government institutions — we deliver engineering that moves organizations forward.
            </motion.p>
          </motion.div>

          <OrganizationsAccordion />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. FEATURED PROJECTS — Dark Section (proof first)
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Featured Projects" dark />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
              Products We{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Built.</span>
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group bg-white/[0.03] rounded-[24px] border border-white/[0.08] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#F5A800]/30 text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-5 group-hover:bg-[#F5A800] group-hover:text-white transition-all duration-300">
                  <Code2 size={22} className="text-[#F5A800] group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] font-black text-[#F5A800] uppercase tracking-widest mb-2 block">{project.tag}</span>
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#F5A800] transition-colors">{project.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-medium">{project.desc}</p>
                {project.outcome && (
                  <p className="text-[#F5A800]/80 text-[12px] font-semibold mt-4 leading-relaxed">
                    {project.outcome}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. MISSION & VISION — Light Section
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-white section-divider-light overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#F5A800]/4 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeUp} className="relative p-10 md:p-12 rounded-[32px] bg-gradient-to-br from-white to-[#f4f4f5] border border-slate-200 overflow-hidden group hover:border-[#F5A800]/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]"><Compass size={160} /></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-6"><Compass size={28} className="text-[#F5A800]" /></div>
                <h3 className="text-3xl font-black text-slate-950 mb-4">Our Mission</h3>
                <p className="text-slate-600 text-lg leading-relaxed">To build software systems, AI platforms, and cloud infrastructure that power modern organizations — delivering enterprise-grade engineering that moves businesses forward across Africa and beyond.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative p-10 md:p-12 rounded-[32px] bg-gradient-to-br from-white to-[#f4f4f5] border border-slate-200 overflow-hidden group hover:border-[#F5A800]/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]"><Target size={160} /></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center mb-6"><Target size={28} className="text-[#10b981]" /></div>
                <h3 className="text-3xl font-black text-slate-950 mb-4">Our Vision</h3>
                <p className="text-slate-600 text-lg leading-relaxed">To be Africa's most trusted engineering partner — known for shipping enterprise-grade systems that are secure, scalable, and built to last. No hype, just measurable results.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. CORE PRINCIPLES — Light Section
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-white section-divider-light overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Core Principles" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Built on{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Principles.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg font-medium max-w-xl mx-auto">Uncompromising standards that guide our engineering and define every partnership.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          7. LEADERSHIP / TEAM — Light Section
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-white section-divider-light overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#F5A800]/5 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8b5cf6]/5 blur-[100px] rounded-full" />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Our Team" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Meet the{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Team.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
              Leadership team overseeing software engineering, AI innovation, and cloud infrastructure delivery across global markets.
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

          {/* Leadership grid — CTO, Head of Engineering, Head of Product */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[2, 3].map((id) => {
              const member = team.find((m: any) => m.id === String(id));
              if (!member) return null;
              return (
                <motion.div
                  key={member.id}
                  variants={fadeUp}
                  className="group bg-white rounded-[24px] border border-slate-200 p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#F5A800]/30"
                >
                  <div className="w-24 h-24 rounded-full mx-auto mb-5 overflow-hidden border-2 border-transparent group-hover:border-[#F5A800]/30 transition-all duration-500">
                    {member.img ? (
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-black text-2xl" style={{ backgroundColor: member.color || '#8b5cf6' }}>
                        {member.initials || member.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-black text-slate-950 mb-0.5 group-hover:text-[#F5A800] transition-colors">{member.name}</h3>
                  <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#F5A800] mb-3">{member.role}</p>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium max-w-xs mx-auto mb-4">{member.bio}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a66c2]/10 border border-[#0a66c2]/20 text-[#0a66c2] text-[11px] font-bold hover:bg-[#0a66c2]/20 transition-all"
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                      <Linkedin size={12} />
                      LinkedIn
                    </a>
                  )}
                </motion.div>
              );
            })}

            {/* Head of Product placeholder card */}
            <motion.div
              variants={fadeUp}
              className="group bg-white rounded-[24px] border border-slate-200 p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#F5A800]/30"
            >
              <div className="w-24 h-24 rounded-full mx-auto mb-5 overflow-hidden border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center group-hover:border-[#F5A800]/40 transition-all duration-500">
                <span className="text-2xl font-black text-slate-300 group-hover:text-[#F5A800]/60 transition-colors">HP</span>
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-0.5 group-hover:text-[#F5A800] transition-colors">Head of Product</h3>
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 mb-3">Open Position</p>
              <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-xs mx-auto italic">Joining the leadership team soon.</p>
            </motion.div>
          </motion.div>

          {/* Distributed team note */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mt-10 max-w-2xl mx-auto"
          >
            <div className="relative px-8 py-6 rounded-[20px] bg-white border border-slate-200">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-[#F5A800] to-transparent" />
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Supported by a distributed team of software engineers, AI specialists, designers, DevOps engineers, and infrastructure experts across multiple regions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          8. OUR CAPABILITIES — Dark Section (trimmed)
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-[#F5A800]/8 rounded-full blur-[140px]" />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Our Capabilities" dark />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
              Full-Spectrum{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Capabilities.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-lg font-medium max-w-xl mx-auto">End-to-end capabilities across the full technology stack — from code to infrastructure.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Full-Stack Engineering', desc: 'Web, mobile, and backend systems engineered for scale, performance, and maintainability.', icon: Code2 },
              { title: 'AI & Automation Expertise', desc: 'Custom LLM integrations, intelligent agents, and workflow automation for real business problems.', icon: Cpu },
              { title: 'Cloud-Native Delivery', desc: 'Multi-cloud architecture, Kubernetes orchestration, and serverless deployments at global scale.', icon: Cloud },
              { title: 'Enterprise Security Practices', desc: 'Zero-trust principles, automated security scanning, and compliance-aware engineering built into every delivery.', icon: Shield },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="group bg-white/[0.03] rounded-[20px] border border-white/[0.08] p-6 md:p-8 text-center hover:border-[#F5A800]/30 transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mx-auto mb-4 text-[#F5A800] group-hover:bg-[#F5A800] group-hover:text-white transition-all duration-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-black text-white mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-white/40 text-[12px] leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          9. SECURITY & COMPLIANCE — Dark Section
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#F5A800]/8 blur-[100px] rounded-full" />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Security & Compliance" dark />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
              Security-First{' '}<span className="text-white/40">Engineering.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-lg font-medium max-w-xl mx-auto">Security is embedded at every layer of our engineering process — from architecture design through deployment and operations.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Security-First Development Practices', desc: 'Threat modeling, secure coding standards, and automated vulnerability scanning integrated into every stage of our development lifecycle.' },
              { title: 'GDPR-Aware Engineering', desc: 'Data protection by design and default — privacy controls, consent management, and data handling aligned with EU GDPR requirements.' },
              { title: 'HIPAA-Conscious Architecture', desc: 'Architecture patterns designed to support PHI data handling, access controls, audit logging, and business associate agreement readiness.' },
              { title: 'Zero-Trust Infrastructure Principles', desc: 'No implicit trust — every access request is authenticated, authorized, and continuously validated regardless of network location.' },
              { title: 'Enterprise Security Reviews', desc: 'Regular third-party security assessments, penetration testing, and architecture reviews to identify and remediate risks proactively.' },
              { title: 'Secure SDLC & CI/CD', desc: 'Automated security gates in our pipelines — from dependency scanning and SAST to container image signing and supply chain verification.' },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="group p-6 rounded-[24px] bg-white/[0.03] border border-white/[0.08] hover:border-[#F5A800]/40 transition-all duration-500">
                <div className="w-11 h-11 rounded-2xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center text-[#F5A800] group-hover:bg-[#F5A800] group-hover:text-white transition-all duration-500 mb-5"><ShieldCheck size={20} /></div>
                <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#F5A800] transition-colors">{item.title}</h3>
                <p className="text-white/50 text-sm font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          10. HOW WE ENGAGE — Light Section (near CTA)
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-white section-divider-light overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#F5A800]/5 blur-[120px] rounded-full" />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.div variants={fadeUp}>
              <SectionBadge label="How We Engage" />
            </motion.div>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
              Four proven engagement models designed to match your organization's goals, timeline, and level of technical ownership.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: Users, title: 'Dedicated Teams', desc: 'Embedded engineers working alongside your organization as a seamless extension of your team. Full access to our technical leadership and engineering practices.' },
              { icon: Target, title: 'Project Delivery', desc: 'Fixed-scope, milestone-driven execution with clear deliverables, timelines, and budgets. End-to-end delivery from specification to deployment.' },
              { icon: Code2, title: 'Technical Consulting', desc: 'Architecture reviews, AI strategy, cloud modernization roadmaps, and security assessments led by senior engineers and domain experts.' },
              { icon: Shield, title: 'Managed Operations', desc: 'Ongoing monitoring, infrastructure maintenance, incident response, and production support with SLA-backed reliability guarantees.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="group relative rounded-[24px] border border-slate-200 bg-white p-8 transition-all duration-500 hover:border-[#F5A800]/30 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center text-[#F5A800] group-hover:bg-[#F5A800] group-hover:text-white transition-all duration-300 shrink-0">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-xl font-black text-slate-950 tracking-tight group-hover:text-[#F5A800] transition-colors">{item.title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          11. FINAL CTA — Dark Section
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#F5A800]/6 rounded-full blur-[140px]" />
        </div>

        <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#F5A800]/20 backdrop-blur-md mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.6)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A800]">Get Started</span>
            </div>

            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-6">
                Ready to Build{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">
                  Something Critical?
                </span>
              </h2>
            </TextReveal>

            <TextReveal delay={0.1}>
              <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
                Whether you're launching a new product, modernizing legacy systems, or integrating AI into operations,
                Nexyovi provides the engineering expertise to make it happen.
              </p>
            </TextReveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link to="/contact" className="group btn-gold text-[15px] px-10 py-5">
                <span className="relative z-10">Start a Project</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
              <Link to="/contact" className="group btn-ghost text-[15px] px-10 py-5">
                <Calendar size={16} className="relative z-10 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">Schedule a Consultation</span>
              </Link>
              <a
                href={`mailto:${settings.email}`}
                className="group btn-ghost text-[14px] px-8 py-[13px]"
              >
                <span className="relative z-10">Or email us directly</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}