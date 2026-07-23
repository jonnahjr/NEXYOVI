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
import CompanyStory from '../components/CompanyStory';
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
  const founder = team.find((m: any) => m.role && m.role.toLowerCase().includes('founder')) || team[0];
  
  const isLeaderRole = (role: string) => {
    if (!role) return false;
    const r = role.toLowerCase();
    return r.includes('chief') || r.includes('cto') || r.includes('cpo') || r.includes('vp') || r.includes('vice president');
  };

  const executiveLeadership = team.filter((m: any) => m !== founder && isLeaderRole(m.role));
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
    <div className="min-h-screen bg-white dark:bg-[#050816] transition-colors duration-300">

      {/* ═══════════════════════════════════════
          1. HERO — Dark · Glow Orbs · Scroll Parallax
         ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="dark relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02040a] transition-colors duration-300"
      >
        {/* Clean bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#02040a] to-transparent z-[2] pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 container max-w-5xl mx-auto px-6 text-center pt-32 pb-24"
        >
          <TextReveal className="mb-10">
              <h1 className="text-[42px] md:text-[60px] lg:text-[76px] font-black tracking-[-0.03em] leading-[1.05] text-slate-950 dark:text-white max-w-5xl mx-auto">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 dark:from-amber-400 via-amber-500 dark:via-amber-300 to-amber-600 dark:to-amber-400">
                  Africa's engineering partner
                </span>
                {' '}for mission-critical software systems.
              </h1>
              <p className="text-slate-600 dark:text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-6 font-medium">
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
            className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-slate-200 dark:border-white/10 pt-8"
          >
            {[
              { label: '10+ Enterprise Platforms', highlight: true },
              { label: '20+ Elite Engineers', highlight: true },
              { label: '4 Countries', highlight: true },
              { label: 'Banking · Government · Telecom · Health', highlight: false },
            ].map((stat) => (
              <span key={stat.label} className={`text-[11px] font-bold uppercase tracking-[0.15em] ${stat.highlight ? 'text-slate-600 dark:text-white/60' : 'text-amber-700 dark:text-amber-300/70'}`}>
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
            <div className="w-px h-10 bg-gradient-to-b from-slate-300 dark:from-white/25 to-transparent" />
          </motion.div>
        </motion.div>
      </section>      {/* ═══════════════════════════════════════
           2. OUR STORY
          ═══════════════════════════════════════ */}
      <CompanyStory />

      {/* ═══════════════════════════════════════
           3. TESTIMONIALS
         ═══════════════════════════════════════ */}
      <TestimonialSection />

      {/* ═══════════════════════════════════════
           4. MISSION & VISION — Matching Our Story style
          ═══════════════════════════════════════ */}
      <section className="relative bg-[#FCFBF8] border-t border-slate-200 py-28 md:py-36 overflow-hidden">
        <div className="container max-w-4xl mx-auto px-6 relative z-10">

          {/* ── Label ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-8"
          >
            Why We Exist
          </motion.p>

          {/* ── Title ── */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE_EXPO }}
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.05] mb-14 text-slate-950"
          >
            Mission &{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">Vision.</span>
          </motion.h2>

          {/* ── Content: Mission & Vision in two columns ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_EXPO }}
            className="grid md:grid-cols-2 gap-16 mb-16"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-[-0.02em] leading-[1.1] mb-5">
                Our Mission
              </h3>
              <p className="text-slate-600 text-base md:text-lg leading-[1.8] font-[425]">
                To deliver enterprise software engineering, AI, and cloud infrastructure that helps organizations build and scale with confidence.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-[-0.02em] leading-[1.1] mb-5">
                Our Vision
              </h3>
              <p className="text-slate-600 text-base md:text-lg leading-[1.8] font-[425]">
                To build the technology infrastructure that powers Africa's next generation of global institutions — from fintech to government, healthcare to logistics — with world-class engineering, security, and reliability.
              </p>
            </div>
          </motion.div>



        </div>
      </section>

      {/* ═══════════════════════════════════════
           5. CORE PRINCIPLES — Dark
          ═══════════════════════════════════════ */}
      <section className="dark relative py-28 md:py-36 bg-[#02040a] section-divider-dark overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-400/5 dark:bg-amber-400/5 rounded-full blur-[140px]" />
        </div>
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.03] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-white/20" />
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-600 dark:text-white/50">Core Principles</span>
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-[-0.04em] leading-[0.95] mb-4">
              Built on{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 dark:from-amber-400 to-amber-400 dark:to-amber-300">Principles.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 dark:text-white/50 text-lg font-medium max-w-xl mx-auto">Uncompromising standards that guide our engineering and define every partnership.</motion.p>
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
                  <Icon size={18} className="mt-0.5 shrink-0 text-slate-500 dark:text-slate-400" />
                  <div>
                    <h3 className="text-sm font-black text-slate-950 dark:text-white mb-1 tracking-tight">{v.title}</h3>
                    <p className="text-slate-600 dark:text-white/45 text-[11px] leading-relaxed font-medium">{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. OUR CAPABILITIES — Matching Our Story style
         ═══════════════════════════════════════ */}
      <section className="relative bg-[#FCFBF8] border-t border-slate-200 py-28 md:py-36 overflow-hidden">
        <div className="container max-w-4xl mx-auto px-6 relative z-10">

          {/* ── Label ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-8"
          >
            Our Capabilities
          </motion.p>

          {/* ── Title ── */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE_EXPO }}
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.05] text-slate-950"
          >
            Full-Spectrum{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">Capabilities.</span>
          </motion.h2>

          {/* ── Subtitle ── */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_EXPO }}
            className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mb-14"
          >
            End-to-end capabilities across the full technology stack — from code to infrastructure.
          </motion.p>

          {/* ── Items grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE_EXPO }}
            className="grid md:grid-cols-2 gap-12"
          >
            {[
              { title: 'Full-Stack Engineering', desc: 'Web, mobile, and backend systems engineered for scale, performance, and maintainability.' },
              { title: 'AI & Automation Expertise', desc: 'Custom LLM integrations, intelligent agents, and workflow automation for real business problems.' },
              { title: 'Cloud-Native Delivery', desc: 'Multi-cloud architecture, Kubernetes orchestration, and serverless deployments at global scale.' },
              { title: 'Enterprise Security Practices', desc: 'Zero-trust principles, automated security scanning, and compliance-aware engineering built into every delivery.' },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-[-0.02em] mb-3">{item.title}</h3>
                <p className="text-slate-600 text-base md:text-lg leading-[1.8] font-[425]">{item.desc}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
           7. WHY NEXYOVI — Dark Section
          ═══════════════════════════════════════ */}
      <section className="dark relative py-28 md:py-36 bg-[#02040a] section-divider-dark overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-400/6 dark:bg-amber-400/6 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 dark:text-white/60">Why Nexyovi</span>
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-[-0.04em] leading-[0.95] mb-4">
              Different by{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 dark:from-amber-400 to-amber-400 dark:to-amber-300">Design.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 dark:text-white/50 text-lg font-medium max-w-xl mx-auto">We don't just write code — we take full ownership of outcomes.</motion.p>
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
                className="group rounded-[24px] border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02] p-8 transition-all duration-500 hover:border-[#F5A800]/30 dark:hover:border-[#F5A800]/30 hover:bg-slate-100 dark:hover:bg-white/[0.04]"
              >
                <h3 className="text-lg font-black text-slate-950 dark:text-white mb-3 tracking-tight group-hover:text-[#F5A800] dark:group-hover:text-[#F5A800] transition-colors">{item.title}</h3>
                <p className="text-slate-600 dark:text-white/45 text-sm leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           8. LEADERSHIP / TEAM — Enterprise Structure
         ═══════════════════════════════════════ */}
      <section className="dark relative py-16 md:py-24 bg-[#02040a] section-divider-dark overflow-hidden transition-colors duration-300">
        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `linear-gradient(rgba(180,83,9,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(180,83,9,0.3) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Ambient side glows — subtle */}
        <div className="pointer-events-none absolute left-0 top-1/3 h-[350px] w-[250px] rounded-full bg-amber-400/4 dark:bg-amber-400/4 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 bottom-1/3 h-[300px] w-[200px] rounded-full bg-purple-500/3 dark:bg-purple-500/3 blur-[80px]" />

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
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-white/[0.03] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 dark:text-white/60">{companyTeamBadge}</span>
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-[-0.04em] text-slate-950 dark:text-white">
              {companyTeamTitle.includes(companyTeamHighlight) ? (
                <>{companyTeamTitlePrefix}{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 dark:from-amber-400 to-amber-400 dark:to-amber-300">{companyTeamHighlight}</span></>
              ) : companyTeamTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-lg text-base font-medium leading-relaxed text-slate-600 dark:text-white/40">
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
              <div className="relative mx-auto mb-6 h-36 w-36 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.03] md:h-44 md:w-44">
                {founder.img ? (
                  <img src={founder.img} alt={founderName} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-5xl font-black text-slate-600 dark:text-white/70" style={{ backgroundColor: founder.color || 'rgb(217, 119, 6)' }}>
                    {founder.initials || 'YB'}
                  </div>
                )}
              </div>
              <h3 className="text-3xl font-black tracking-[-0.02em] text-slate-950 dark:text-white md:text-4xl mb-2">{founderName}</h3>
              <p className="text-sm font-medium text-amber-700 dark:text-amber-300 uppercase tracking-[0.2em] mb-4">{founderRole}</p>
              <p className="text-base leading-relaxed text-slate-600 dark:text-white/60 mb-6 max-w-md mx-auto">
                Visionary leader with 12+ years in tech and business strategy.
              </p>
              {founderLinkedin && (
                <a
                  href={founderLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-950/30 px-6 py-3 text-sm font-semibold text-blue-700 dark:text-blue-300 transition-all duration-300 hover:bg-blue-200 dark:hover:bg-blue-950/50"
                >
                  <Linkedin size={16} />
                  LinkedIn Profile
                </a>
              )}
            </motion.div>
          )}

          <div className="mx-auto mb-4 flex max-w-4xl flex-col items-center text-center">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/30">Founder &amp; CEO</span>
            <div className="my-1 h-4 w-px bg-gradient-to-b from-slate-300 dark:from-white/[0.16] to-slate-200 dark:to-white/[0.03]" />
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 dark:bg-white/[0.03] text-slate-500 dark:text-white/35">
              <svg width="7" height="7" viewBox="0 0 12 12" fill="none">
                <path d="M6 10L2 4h8L6 10z" fill="currentColor" />
              </svg>
            </div>
            <div className="my-1 h-4 w-px bg-gradient-to-b from-slate-300 dark:from-white/[0.16] to-slate-200 dark:to-white/[0.03]" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/30">Executive Leadership Team</span>
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
                  <div className="mx-auto mb-1 h-10 w-10 overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.04]">
                    {member.img ? (
                      <img src={member.img} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-600 dark:text-white/70" style={{ backgroundColor: member.color || 'rgb(139, 92, 246)' }}>
                        {member.initials || member.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-950 dark:text-white">{member.name}</h4>
                  <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-white/35">{member.role}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 dark:text-white/30 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-300"
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
      <section className="dark relative py-28 md:py-36 bg-[#02040a] section-divider-dark overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-400/6 dark:bg-amber-400/6 rounded-full blur-[140px]" />
        </div>

        <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-amber-600/20 dark:border-amber-400/20 backdrop-blur-md mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(217,119,6,0.6)] dark:shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">Get Started</span>
            </div>

            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-[-0.04em] leading-[0.95] mb-6">
                Ready to Build{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 dark:from-amber-400 via-amber-500 dark:via-amber-300 to-amber-600 dark:to-amber-400">
                  Something Critical?
                </span>
              </h2>
            </TextReveal>

            <TextReveal delay={0.1}>
              <p className="text-slate-600 dark:text-white/50 text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
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
