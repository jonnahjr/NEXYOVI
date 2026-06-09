import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Cloud,
  Code2,
  Cpu,
  Globe,
  Heart,
  Linkedin,
  Shield,
  Users,
  Zap,
} from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import TestimonialSection from '../components/TestimonialSection';
import TextReveal from '../components/TextReveal';
import { useSite } from '../context/SiteContext';
import { EASE_EXPO, fadeUp, staggerContainer } from '../lib/animations';

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════ */

const values = [
  { icon: Shield, title: 'Security as Foundation', desc: 'Security is not a feature — it\'s the foundation. Every system is built with zero-trust principles, encryption by default, and compliance-ready architecture.', accent: '#F5A800' },
  { icon: Zap, title: 'Precision Over Speed', desc: 'We ship with precision, not speed for speed\'s sake. Fast delivery means nothing without reliability, security, and the right architecture underneath.', accent: '#f59e0b' },
  { icon: Globe, title: 'Global Ambition', desc: 'African innovation engineered to compete on the world stage. Great technology knows no borders.', accent: '#10b981' },
  { icon: Users, title: 'Deep Partnership', desc: 'Not vendors, but technical co-founders committed to your mission and outcomes.', accent: '#8b5cf6' },
  { icon: Code2, title: 'Technical Excellence', desc: 'Mastery is non-negotiable. We focus deeply on architecture, performance, and maintainability in everything we ship.', accent: '#06b6d4' },
  { icon: Heart, title: 'Client Success', desc: 'Your success is our success. We measure our performance by the quantifiable improvements we deliver.', accent: '#ec4899' },
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

export default function Company() {
  const { team, settings, siteContent } = useSite();
  const about = siteContent?.about || {};
  const companyTeam = siteContent?.companyTeam || {};
  const aboutTagline = about.tagline || "Africa's engineering partner for organizations that can't afford to ship slow.";
  const aboutDescription = about.description || 'Nexyovi is an elite software engineering firm headquartered in Addis Ababa, Ethiopia, with a global delivery footprint.';
  const founded = about.founded || '2012';
  const headquarters = about.headquarters || 'Addis Ababa, Ethiopia';
  const clients = about.clients || '50+';
  const normalizeTeamValue = (value: string = '') => value.toLowerCase().replace(/\s+/g, ' ').trim();
  const teamByName = new Map<string, any>();
  team.forEach((member: any) => {
    const key = normalizeTeamValue(member.name);
    if (key && !teamByName.has(key)) {
      teamByName.set(key, member);
    }
  });
  const founder = team.find((m: any) => m.id === '1') || teamByName.get(normalizeTeamValue('Yonas Bogale'));
  const executiveLeadership = [
    'Amanuel Tesfaye',
    'Selamawit Hailu',
    'Eyerusalem Bogale',
  ]
    .map((name) => teamByName.get(normalizeTeamValue(name)))
    .filter(Boolean);
  const companyTeamBadge = companyTeam.badge || 'Our Team';
  const companyTeamTitle = companyTeam.title || 'Meet the Team.';
  const companyTeamHighlight = companyTeam.highlight || 'Team.';
  const companyTeamTitlePrefix = companyTeamTitle.includes(companyTeamHighlight)
    ? companyTeamTitle.replace(companyTeamHighlight, '').trim()
    : companyTeamTitle.trim();
  const companyTeamDescription = companyTeam.description || 'Leadership team overseeing software engineering, AI innovation, and cloud infrastructure delivery across global markets.';
  const founderName = companyTeam.founder_name || founder?.name || 'Yonas Bogale';
  const founderRole = companyTeam.founder_role || founder?.role || 'Founder & CEO';
  const founderBio = companyTeam.founder_bio || founder?.bio || "Leading Nexyovi's mission to build practical software, AI solutions, and digital infrastructure for modern businesses.";
  const founderButton = companyTeam.founder_button || 'LinkedIn Profile';
  const founderLinkedin = founder?.linkedin || 'https://www.linkedin.com/in/yonas-bogale/';
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════════════════════════════
          1. HERO — Dark · Glow Orbs · Scroll Parallax
         ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02040a]"
      >
        {/* Clean bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#02040a] to-transparent z-[2] pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 container max-w-5xl mx-auto px-6 text-center pt-32 pb-24"
        >
          <TextReveal className="mb-10">
              <h1 className="text-[42px] md:text-[60px] lg:text-[76px] font-black tracking-[-0.03em] leading-[1.05] text-white max-w-5xl mx-auto">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">
                  Africa's engineering partner
                </span>
                {' '}for mission-critical software systems.
              </h1>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-6 font-medium">
                We design and build secure, scalable platforms for organizations that can't afford to fail.
              </p>
          </TextReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: EASE_EXPO }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/contact#inquiry" className="group btn-gold text-[15px] px-10 py-5">
              <span className="relative z-10">Book a strategy session</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <Link to="/services" className="group btn-ghost text-[15px] px-10 py-5">
              <span className="relative z-10">Explore Services</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: EASE_EXPO }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-white/10 pt-8"
          >
            {[
              { label: '10+ Enterprise Platforms', highlight: true },
              { label: '20+ Elite Engineers', highlight: true },
              { label: '4 Countries', highlight: true },
              { label: 'Banking · Government · Telecom · Health', highlight: false },
            ].map((stat) => (
              <span key={stat.label} className={`text-[11px] font-bold uppercase tracking-[0.15em] ${stat.highlight ? 'text-white/60' : 'text-[#F5A800]/70'}`}>
                {stat.label}
              </span>
            ))}
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
           2. OUR STORY — Creamy White
          ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6 relative z-10">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <SectionBadge label="Our Story" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Built in{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Addis Ababa.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg font-medium max-w-2xl mx-auto">
              From a focused software studio to a cross-continental engineering force.
            </motion.p>
          </motion.div>

          {/* ── Stats Row ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mx-auto mb-16 grid max-w-2xl grid-cols-3 gap-6"
          >
            {[
              { number: '10+', label: 'Enterprise Platforms' },
              { number: '20+', label: 'Elite Engineers' },
              { number: '4', label: 'Countries Served' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center"
              >
                <span className="text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
                  {stat.number}
                </span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Story ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mx-auto max-w-3xl"
          >
            <div className="space-y-6">
              <motion.p variants={fadeUp} className="text-base leading-[1.8] text-slate-600 md:text-lg">
                Founded in Addis Ababa in 2024 by Yonas Bogale, Nexyovi was built with a simple mission: help organizations leverage technology to solve complex challenges, operate more efficiently, and grow with confidence.
              </motion.p>
              <motion.p variants={fadeUp} className="text-base leading-[1.8] text-slate-500 md:text-lg">
                What began as a focused software studio quickly evolved into a multidisciplinary engineering company specializing in custom software, artificial intelligence, cloud infrastructure, cybersecurity, and digital transformation.
              </motion.p>
              <motion.p variants={fadeUp} className="text-base leading-[1.8] text-slate-600 md:text-lg">
                Today, Nexyovi partners with startups, enterprises, government organizations, and mission-driven businesses across Africa and beyond — designing, building, and maintaining production-ready digital systems that deliver measurable outcomes.
              </motion.p>
              <motion.p variants={fadeUp} className="text-base leading-[1.8] text-slate-500 md:text-lg">
                From enterprise applications and AI-powered platforms to cloud-native infrastructure and mission-critical systems, we combine deep engineering expertise with a long-term commitment to client success.
              </motion.p>
            </div>
          </motion.div>

          {/* ── Vision Block ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_EXPO }}
            className="mx-auto mt-14 max-w-3xl rounded-[24px] border border-slate-200 bg-white p-8 md:p-10 text-center"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Vision</span>
            <p className="mt-4 text-xl md:text-2xl font-semibold leading-relaxed text-slate-800 italic">
              "Our vision is to build technology that creates lasting impact — starting in Africa, built for the world."
            </p>
          </motion.div>

        </div>
      </section>



      {/* ═══════════════════════════════════════
          3. TESTIMONIALS
         ═══════════════════════════════════════ */}
      <TestimonialSection />

      {/* ═══════════════════════════════════════
           4. MISSION & VISION — Creamy White
          ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <SectionBadge label="Why We Exist" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95]">
              Mission &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Vision.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200"
          >
            <motion.div variants={fadeUp} className="p-10 md:p-12 lg:p-14">
              <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-[-0.03em] leading-[1.1] mb-5">
                Our Mission
              </h3>
              <p className="text-slate-500 text-base leading-relaxed">
                To deliver enterprise software engineering, AI, and cloud infrastructure that helps organizations build and scale with confidence.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="p-10 md:p-12 lg:p-14">
              <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-[-0.03em] leading-[1.1] mb-5">
                Our Vision
              </h3>
              <p className="text-slate-500 text-base leading-relaxed">
                To build the technology infrastructure that powers Africa's next generation of global institutions — from fintech to government, healthcare to logistics — with world-class engineering, security, and reliability.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           5. CORE PRINCIPLES — Dark
          ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F5A800]/5 rounded-full blur-[140px]" />
        </div>
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Core Principles</span>
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
              Built on{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Principles.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-lg font-medium max-w-xl mx-auto">Uncompromising standards that guide our engineering and define every partnership.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-wrap justify-center gap-x-10 gap-y-8">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  className="flex items-start gap-4 max-w-[260px]"
                >
                  <Icon size={18} className="mt-0.5 shrink-0 text-zinc-400" />
                  <div>
                    <h3 className="text-sm font-black text-white mb-1 tracking-tight">{v.title}</h3>
                    <p className="text-white/45 text-[11px] leading-relaxed font-medium">{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. OUR CAPABILITIES — Creamy White
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Our Capabilities" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Full-Spectrum{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Capabilities.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg font-medium max-w-xl mx-auto">End-to-end capabilities across the full technology stack — from code to infrastructure.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
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
                  className="text-center"
                >
                  <h3 className="text-sm font-black text-slate-950 mb-1 tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed font-medium max-w-[180px]">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           7. WHY NEXYOVI — Dark Section
          ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#F5A800]/6 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Why Nexyovi</span>
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">
              Different by{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Design.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-lg font-medium max-w-xl mx-auto">We don't just write code — we take full ownership of outcomes.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'We Own Outcomes, Not Just Tickets', desc: 'We measure success by what ships, performs, and endures. Every engagement is structured around deliverables, milestones, and measurable impact — not billable hours.' },
              { title: 'Deep Engineering, Not Generalists', desc: 'Our team is built around specialization — security, AI, cloud infrastructure, and full-stack development. You get experts, not generalist consultants.' },
              { title: 'African Roots, Global Standards', desc: 'Built in Ethiopia, delivering at world-class level. We combine deep local context with international engineering practices, compliance, and security standards.' },
              { title: 'Long-Term Partnership, Not Vendorship', desc: 'We embed with your team, understand your mission, and stay accountable for the long haul. Our best work happens in multi-year relationships, not one-off projects.' },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-500 hover:border-[#F5A800]/30 hover:bg-white/[0.04]"
              >
                <h3 className="text-lg font-black text-white mb-3 tracking-tight group-hover:text-[#F5A800] transition-colors">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           8. LEADERSHIP / TEAM — Enterprise Structure
         ═══════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 bg-[#02040a] section-divider-dark overflow-hidden">
        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `linear-gradient(rgba(245,168,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,168,0,0.3) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Ambient side glows — subtle */}
        <div className="pointer-events-none absolute left-0 top-1/3 h-[350px] w-[250px] rounded-full bg-[#F5A800]/4 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 bottom-1/3 h-[300px] w-[200px] rounded-full bg-[#8b5cf6]/3 blur-[80px]" />

        <div className="container max-w-full mx-auto px-4 relative z-10">

          {/* ═══════════════════════════════════
              SECTION HEADER
          ═══════════════════════════════════ */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-10 text-center"
          >
            <motion.div variants={fadeUp} className="mb-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F5A800]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">{companyTeamBadge}</span>
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-[-0.04em] text-white">
              {companyTeamTitle.includes(companyTeamHighlight) ? (
                <>{companyTeamTitlePrefix}{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">{companyTeamHighlight}</span></>
              ) : companyTeamTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-lg text-base font-medium leading-relaxed text-white/40">
              {companyTeamDescription}
            </motion.p>
          </motion.div>

          {/* ═══════════════════════════════════
              TIER 1 — FOUNDER & CEO
          ═══════════════════════════════════ */}
          {founder && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mb-12 max-w-2xl text-center"
            >
              <div className="relative mx-auto mb-6 h-36 w-36 overflow-hidden rounded-full bg-white/[0.03] md:h-44 md:w-44">
                {founder.img ? (
                  <img src={founder.img} alt={founderName} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-5xl font-black text-white/70" style={{ backgroundColor: founder.color || '#F5A800' }}>
                    {founder.initials || 'YB'}
                  </div>
                )}
              </div>
              <h3 className="text-3xl font-black tracking-[-0.02em] text-white md:text-4xl mb-2">{founderName}</h3>
              <p className="text-sm font-medium text-[#F5A800] uppercase tracking-[0.2em] mb-4">{founderRole}</p>
              <p className="text-base leading-relaxed text-white/60 mb-6 max-w-md mx-auto">
                Visionary leader with 12+ years in tech and business strategy.
              </p>
              {founderLinkedin && (
                <a
                  href={founderLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0a66c2]/10 px-6 py-3 text-sm font-semibold text-[#8fc3f4] transition-all duration-300 hover:bg-[#0a66c2]/20"
                >
                  <Linkedin size={16} />
                  LinkedIn Profile
                </a>
              )}
            </motion.div>
          )}

          <div className="mx-auto mb-4 flex max-w-4xl flex-col items-center text-center">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Founder &amp; CEO</span>
            <div className="my-1 h-4 w-px bg-gradient-to-b from-white/[0.16] to-white/[0.03]" />
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/[0.03] text-white/35">
              <svg width="7" height="7" viewBox="0 0 12 12" fill="none">
                <path d="M6 10L2 4h8L6 10z" fill="currentColor" />
              </svg>
            </div>
            <div className="my-1 h-4 w-px bg-gradient-to-b from-white/[0.16] to-white/[0.03]" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Executive Leadership Team</span>
          </div>

          {/* ═══════════════════════════════════
              TIER 2 — EXECUTIVE LEADERSHIP
          ═══════════════════════════════════ */}
          {executiveLeadership.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={staggerContainer}
              className="mx-auto mb-8 grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-3"
            >
              {executiveLeadership.map((member: any) => (
                <motion.div
                  key={member.id}
                  variants={fadeUp}
                  className="text-center"
                >
                  <div className="mx-auto mb-1 h-10 w-10 overflow-hidden rounded-full bg-white/[0.04]">
                    {member.img ? (
                      <img src={member.img} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white/70" style={{ backgroundColor: member.color || '#8b5cf6' }}>
                        {member.initials || member.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">{member.name}</h4>
                  <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-white/35">{member.role}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-white/30 transition-all duration-300 hover:text-[#8fc3f4]"
                    >
                      <Linkedin size={10} />
                      LinkedIn
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
           9. FINAL CTA — Dark Section
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
              <Link to="/contact#inquiry" className="group btn-gold text-[15px] px-10 py-5">
                <span className="relative z-10">Start a Project</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
              <a href="mailto:contact@nexyovi.com" className="group btn-ghost text-[15px] px-10 py-5">
                <Calendar size={16} className="relative z-10 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">Or email us directly</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
