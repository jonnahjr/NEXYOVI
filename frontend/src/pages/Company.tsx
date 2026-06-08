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
  ShieldCheck,
  Target,
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
  { icon: Shield, title: 'Engineering Integrity', desc: 'Every line of code, every architecture decision holds to the highest standard of quality and security.', accent: '#F5A800' },
  { icon: Zap, title: 'Relentless Velocity', desc: 'Speed is a feature. We ship enterprise-grade solutions fast, delivering typical enterprise MVPs in 8–12 weeks without sacrificing quality.', accent: '#f59e0b' },
  { icon: Globe, title: 'Global Ambition', desc: 'African innovation engineered to compete and win on the world stage. Great technology knows no borders.', accent: '#10b981' },
  { icon: Users, title: 'Deep Partnership', desc: 'Not vendors, but technical co-founders committed to your mission and outcomes.', accent: '#8b5cf6' },
  { icon: Code2, title: 'Technical Excellence', desc: 'Mastery is non-negotiable. We focus deeply on architecture, performance, and scalability in everything we ship.', accent: '#06b6d4' },
  { icon: Heart, title: 'Client Focus', desc: 'Your success is our success. We measure our performance entirely by the quantifiable improvements we deliver.', accent: '#ec4899' },
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
  const engineeringDeliveryTeam = [
    'Mikayel Alemu',
    'Sara Denbel',
    'Henok Alemu',
    'Betelhem Assefa',
    'Nahom Girmachew',
    'Biruk Mamo',
    'Liya Wondesen',
    'Tsion Wondimu',
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
              {' '}for organizations that can't afford to ship slow.
            </h1>
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
          2. OUR STORY
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6 relative z-10">

          {/* ── Badge ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Our Story</span>
            </div>
          </motion.div>

          {/* ── Stats Row ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-16 grid max-w-2xl grid-cols-3 gap-6"
          >
            {[
              { number: '10+', label: 'Enterprise Platforms' },
              { number: '20+', label: 'Elite Engineers' },
              { number: '4', label: 'Countries Served' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <span className="text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">
                  {stat.number}
                </span>
                <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.15em] text-white/35">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Story ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl"
          >
            <div className="space-y-6">
              <p className="text-base leading-[1.7] text-white/60 md:text-lg">
                Founded in Addis Ababa in 2024 by Yonas Bogale, Nexyovi was built with a simple mission: help organizations leverage technology to solve complex challenges, operate more efficiently, and grow with confidence.
              </p>
              <p className="text-base leading-[1.7] text-white/50 md:text-lg">
                What began as a focused software studio quickly evolved into a multidisciplinary engineering company specializing in custom software, artificial intelligence, cloud infrastructure, cybersecurity, and digital transformation.
              </p>
              <p className="text-base leading-[1.7] text-white/60 md:text-lg">
                Today, Nexyovi partners with startups, enterprises, government organizations, and mission-driven businesses across Africa and beyond — designing, building, and maintaining secure, scalable, production-ready digital systems that deliver measurable outcomes.
              </p>
              <p className="text-base leading-[1.7] text-white/50 md:text-lg">
                From enterprise applications and AI-powered platforms to cloud-native infrastructure and mission-critical systems, we combine deep engineering expertise with a long-term commitment to client success.
              </p>

              {/* Vision */}
              <div className="pt-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/25">Vision</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                </div>
                <p className="text-center text-base italic leading-relaxed text-white/70 md:text-lg">
                  "Our vision is to build technology that creates lasting impact — starting in Africa, built for the world."
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>



      {/* ═══════════════════════════════════════
          3. TESTIMONIALS
         ═══════════════════════════════════════ */}
      <TestimonialSection />

      {/* ═══════════════════════════════════════
          4. MISSION & VISION — Dark
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#02040a] section-divider-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#F5A800]/8 rounded-full blur-[140px]" />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Why We Exist</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95]">
              Mission &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Vision.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_EXPO }}
            className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10"
          >
            {/* ── Mission ── */}
            <div className="p-10 md:p-12 lg:p-14">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-[-0.03em] leading-[1.1] mb-5">
                Our Mission
              </h3>

              <p className="text-white/50 text-base leading-relaxed">
                To deliver enterprise-grade software engineering, AI development, and cloud infrastructure services that help modern organizations build secure, scalable digital systems and achieve measurable business outcomes today.
              </p>
            </div>

            {/* ── Vision ── */}
            <div className="p-10 md:p-12 lg:p-14">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-[-0.03em] leading-[1.1] mb-5">
                Our Vision
              </h3>

              <p className="text-white/50 text-base leading-relaxed">
                To be Africa's leading engineering partner — powering the next generation of global technology companies and institutions with world-class infrastructure and innovation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. CORE PRINCIPLES — Creamy White
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Core Principles" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Built on{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Principles.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg font-medium max-w-xl mx-auto">Uncompromising standards that guide our engineering and define every partnership.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  className="group bg-white rounded-[20px] border border-slate-200 p-6 md:p-8 text-center hover:border-[#F5A800]/40 transition-all duration-500"
                >
                  <div className="relative w-12 h-12 rounded-xl bg-[#030303] border border-white/10 flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-sm group-hover:border-[#F5A800]/40 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                    <Icon size={22} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors" />
                  </div>
                  <h3 className="text-lg font-black text-slate-950 mb-2 tracking-tight">{v.title}</h3>
                  <p className="text-slate-500 text-[12px] leading-relaxed font-medium">{v.desc}</p>
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
                  className="group bg-white rounded-[20px] border border-slate-200 p-6 md:p-8 text-center hover:border-[#F5A800]/40 transition-all duration-500"
                >
                  <div className="relative w-11 h-11 rounded-xl bg-[#030303] border border-white/10 flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-sm group-hover:border-[#F5A800]/40 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                    <Icon size={20} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors" />
                  </div>
                  <h3 className="text-lg font-black text-slate-950 mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 text-[12px] leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7. LEADERSHIP / TEAM — Enterprise Structure
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

          <div className="mx-auto mb-4 flex max-w-4xl flex-col items-center text-center">
            <div className="h-4 w-px bg-gradient-to-b from-white/[0.14] to-white/[0.03]" />
            <div className="my-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/[0.03] text-white/35">
              <svg width="7" height="7" viewBox="0 0 12 12" fill="none">
                <path d="M6 10L2 4h8L6 10z" fill="currentColor" />
              </svg>
            </div>
            <div className="h-4 w-px bg-gradient-to-b from-white/[0.14] to-white/[0.03]" />
          </div>

          {/* ═══════════════════════════════════
              TIER 3 — ENGINEERING & DELIVERY TEAM
          ═══════════════════════════════════ */}
          {engineeringDeliveryTeam.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6 text-center"
              >
                <h3 className="text-lg font-black tracking-[-0.02em] text-white">Engineering &amp; Delivery Team</h3>
                <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-white/45">
                  Cross-functional specialists delivering software engineering, AI systems, infrastructure, security, and product execution.
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-4">
                {engineeringDeliveryTeam.map((member: any) => (
                  <div key={member.id} className="text-center">
                    <div className="mx-auto mb-1 h-10 w-10 overflow-hidden rounded-full">
                      {member.img ? (
                        <img src={member.img} alt={member.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[11px] font-black text-white/70" style={{ backgroundColor: member.color || '#8b5cf6' }}>
                          {member.initials || member.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    <h5 className="text-[13px] font-semibold text-white">{member.name}</h5>
                    <p className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.12em] text-white/42">{member.role}</p>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-0.5 text-[10px] font-medium text-white/30 transition-all duration-300 hover:text-[#8fc3f4]"
                      >
                        <Linkedin size={8} />
                        LinkedIn
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 max-w-3xl text-center"
          >
            <div className="rounded-xl bg-white/[0.025] px-4 py-3 backdrop-blur-md">
              <p className="text-xs leading-relaxed text-white/45">
                Supported by a distributed team of software engineers, AI specialists, designers, DevOps engineers, and infrastructure experts operating across multiple regions.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          8. SECURITY & COMPLIANCE — Creamy White
         ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <SectionBadge label="Security & Compliance" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-4">
              Security-First{' '}<span className="text-slate-400">Engineering.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg font-medium max-w-xl mx-auto">Security is embedded at every layer of our engineering process — from architecture design through deployment and operations.</motion.p>
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
              <motion.div key={item.title} variants={fadeUp} className="group p-6 rounded-[24px] bg-white border border-slate-200 hover:border-[#F5A800]/40 transition-all duration-500">
                <div className="relative w-11 h-11 rounded-2xl bg-[#030303] border border-white/10 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-[#F5A800]/40 transition-all duration-500 mb-5">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                  <ShieldCheck size={20} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors" />
                </div>
                <h3 className="text-lg font-black text-slate-950 mb-2 group-hover:text-[#F5A800] transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          9. HOW WE ENGAGE — Light Section (near CTA)
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
                    <div className="relative w-12 h-12 rounded-2xl bg-[#030303] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden shadow-sm group-hover:border-[#F5A800]/40 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                      <Icon size={22} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800] transition-colors" />
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
          10. FINAL CTA — Dark Section
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
