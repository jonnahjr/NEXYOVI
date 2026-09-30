import { motion } from 'framer-motion';
import { ArrowRight, Code2, ShieldCheck, BrainCircuit, Briefcase, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { CTAButton } from '../components/CTAButton';
import TextReveal from '../components/TextReveal';
import { fadeUp, staggerContainer } from '../lib/animations';
import { SITE } from '../lib/seo';

// ── Admin-managed CEO profile page (/about/yonas-bogale-sitotaw).
//    All content is editable in Admin → CEO Profile (section ids:
//    founderProfile, founderExpertise, founderCompany, founderLinks,
//    founderCta) and falls back to verified defaults. Keep the canonical
//    name spelling consistent with docs/SEO_STRATEGY.md §1.1 — the
//    schema.org Person node (name, alternateName, sameAs) is NOT
//    admin-editable by design, to protect entity consistency.

type ExpertiseIcon = typeof Code2;

const EXPERTISE_ICONS: ExpertiseIcon[] = [Code2, ShieldCheck, BrainCircuit, Briefcase];

const parseParagraphs = (raw: string): string[] =>
  raw.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export default function FounderProfile() {
  const { siteContent } = useSite();
  const fp = siteContent?.founderProfile || {};
  const fe = siteContent?.founderExpertise || {};
  const fc = siteContent?.founderCompany || {};
  const fl = siteContent?.founderLinks || {};
  const fcta = siteContent?.founderCta || {};

  const displayName = fp.name || 'Yonas Bogale Sitotaw';
  const badge = fp.badge || 'Founder & CEO of Nexyovi';
  const profileImage =
    fp.image || 'https://api.nexyovi.com/uploads/1781431549912-777697695.jpg';

  const heroIntro =
    fp.intro1 ||
    'Yonas Bogale Sitotaw — also known as Yonas Bogale or Yons — is the founder and chief executive officer of Nexyovi, a software development and AI company based in Addis Ababa, Ethiopia. His work spans software engineering, security engineering, cybersecurity, and artificial intelligence.';

  const whoParagraphs = parseParagraphs(
    fp.intro2 ||
      "Yonas Bogale Sitotaw is an Ethiopian technology entrepreneur and engineer. He founded Nexyovi in 2024 and leads the company as its chief executive officer. Nexyovi is a software development and AI company headquartered on Bole Road in Addis Ababa, Ethiopia, delivering enterprise software, artificial intelligence systems, cloud infrastructure, cybersecurity, and data platforms for organizations across Africa and beyond.\n\nAs founder and CEO, Yonas sets Nexyovi's technology strategy and engineering direction. His professional work centers on software development, software engineering, security engineering, cybersecurity, and AI engineering — the same practice areas that define Nexyovi's services."
  );

  const nameVariantsNote =
    fp.intro3 ||
    'He is known professionally by the full name Yonas Bogale Sitotaw and is also referred to as Yonas Bogale and Yons. These names refer to the same person.';

  const expertise = [
    {
      icon: EXPERTISE_ICONS[0],
      title: fe.e1Title || 'Software Development & Engineering',
      body:
        fe.e1Body ||
        "Nexyovi's engineering practice covers custom platforms, SaaS products, APIs, and legacy modernization. Yonas leads the company's engineering direction across these areas.",
    },
    {
      icon: EXPERTISE_ICONS[1],
      title: fe.e2Title || 'Security Engineering & Cybersecurity',
      body:
        fe.e2Body ||
        "Security-first design defines Nexyovi's delivery approach — zero-trust architecture, secure platforms, and protections for the systems the company builds and operates.",
    },
    {
      icon: EXPERTISE_ICONS[2],
      title: fe.e3Title || 'Artificial Intelligence & AI Engineering',
      body:
        fe.e3Body ||
        "Nexyovi builds production AI systems — machine learning pipelines, AI agents, and LLM integrations — under Yonas's leadership as founder and CEO.",
    },
    {
      icon: EXPERTISE_ICONS[3],
      title: fe.e4Title || 'Technology Entrepreneurship',
      body:
        fe.e4Body ||
        'Yonas founded Nexyovi in 2024 in Addis Ababa and leads the company as CEO, setting technology strategy and company direction.',
    },
  ];

  const companyHeading = fc.heading || 'What is Nexyovi?';
  const companyParagraphs = parseParagraphs(
    fc.para1 && fc.para2
      ? `${fc.para1}\n\n${fc.para2}`
      : fc.para1 ||
          "Nexyovi (legally Nexyovi Technologies) is a software development and AI company founded in 2024 and headquartered in Addis Ababa, Ethiopia. The company designs, builds, and operates enterprise software, artificial intelligence systems, cloud infrastructure, cybersecurity, and data platforms.\n\nYonas Bogale Sitotaw is the company's founder and chief executive officer. Explore the company's projects and case studies, the company story and leadership, or start a conversation with the team."
  );

  const officialProfiles = (
    [
      { url: fl.linkedin || SITE.founder.sameAs.find((u) => u.includes('linkedin')), label: 'LinkedIn' },
      { url: fl.github || SITE.founder.sameAs.find((u) => u.includes('github')), label: 'GitHub' },
      { url: fl.instagram || SITE.founder.sameAs.find((u) => u.includes('instagram')), label: 'Instagram' },
      { url: fl.facebook || SITE.founder.sameAs.find((u) => u.includes('facebook')), label: 'Facebook' },
    ] as { url?: string; label: string }[]
  ).filter((p): p is { url: string; label: string } => Boolean(p.url));

  const linksNote =
    fl.linksNote ||
    'These profiles belong to Yonas Bogale Sitotaw. Nexyovi does not publish or endorse any other accounts claiming to represent him.';

  const ctaHeading = fcta.heading || 'Work with Nexyovi';
  const ctaDesc =
    fcta.desc ||
    'Looking for the team behind Yonas? Nexyovi builds enterprise software, AI systems, and secure infrastructure for organizations across Africa and beyond.';

  return (
    <div className="bg-[#050816]">
      {/* ── HERO / IDENTITY ─────────────────────────────── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#F5A800]/8 rounded-full blur-[140px]" />
        </div>

        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-[1fr_360px] gap-12 items-center"
          >
            <div>
              <motion.p
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#F5A800]/20 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A800] mb-6"
              >
                {badge}
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-6"
              >
                {displayName}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-white/50 text-lg leading-relaxed max-w-2xl font-medium"
              >
                {heroIntro}
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="justify-self-center lg:justify-self-end">
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-[28px] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={profileImage}
                  alt={`${displayName}, ${badge}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHO HE IS / ROLE AT NEXYOVI ─────────────────── */}
      <section className="relative py-20 border-t border-white/[0.06]">
        <div className="container max-w-4xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <TextReveal>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-[-0.03em] leading-[1.05] mb-8">
                Who is {displayName}?
              </h2>
            </TextReveal>
            <motion.div variants={fadeUp} className="space-y-6 text-white/50 text-base md:text-lg leading-relaxed font-medium">
              {whoParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="mt-6 text-white/40 text-sm leading-relaxed">
              {nameVariantsNote}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── PROFESSIONAL AREAS ──────────────────────────── */}
      <section className="relative py-20 border-t border-white/[0.06]">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <TextReveal>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-[-0.03em] leading-[1.05] mb-4">
                {fe.heading || 'What does Yonas Bogale Sitotaw do?'}
              </h2>
            </TextReveal>
            <motion.p variants={fadeUp} className="text-white/50 text-lg leading-relaxed max-w-2xl mb-12 font-medium">
              {fe.subtitle || "His professional areas mirror Nexyovi's engineering practice."}
            </motion.p>

            <div className="grid md:grid-cols-2 gap-6">
              {expertise.map((area, i) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={area.title}
                    variants={fadeUp}
                    className="p-8 rounded-[24px] bg-white/[0.02] border border-white/[0.06] hover:border-[#F5A800]/30 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-[16px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center mb-5">
                      <Icon size={20} className="text-[#F5A800]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{area.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{area.body}</p>
                    {i % 2 === 0 && (
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-bold text-[#F5A800] hover:gap-2.5 transition-all duration-300"
                      >
                        Related Nexyovi services <ArrowRight size={13} />
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NEXYOVI: THE COMPANY HE FOUNDED ─────────────── */}
      <section className="relative py-20 border-t border-white/[0.06]">
        <div className="container max-w-4xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <TextReveal>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-[-0.03em] leading-[1.05] mb-8">
                {companyHeading}
              </h2>
            </TextReveal>
            <motion.div variants={fadeUp} className="space-y-6 text-white/50 text-base md:text-lg leading-relaxed font-medium">
              {companyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-8">
              <Link to="/projects" className="btn-ghost text-[13px] px-6 py-3">
                <span className="relative z-10">Projects &amp; case studies</span>
              </Link>
              <Link to="/company" className="btn-ghost text-[13px] px-6 py-3">
                <span className="relative z-10">Company story &amp; leadership</span>
              </Link>
              <Link to="/contact" className="btn-ghost text-[13px] px-6 py-3">
                <span className="relative z-10">Contact the team</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── OFFICIAL PROFILES ───────────────────────────── */}
      <section className="relative py-20 border-t border-white/[0.06]">
        <div className="container max-w-4xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <TextReveal>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-[-0.03em] leading-[1.05] mb-4">
                Official profiles
              </h2>
            </TextReveal>
            <motion.p variants={fadeUp} className="text-white/50 text-base md:text-lg leading-relaxed mb-10 font-medium">
              {linksNote}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-16">
              {officialProfiles.map((p) => (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.03] border border-white/10 text-sm font-bold text-white hover:border-[#F5A800]/40 hover:bg-white/[0.06] transition-all duration-300"
                >
                  {p.label} <ExternalLink size={14} className="text-[#F5A800]" />
                </a>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="p-8 rounded-[24px] bg-gradient-to-br from-[#F5A800]/10 to-transparent border border-[#F5A800]/20"
            >
              <h3 className="text-xl font-bold text-white mb-3">{ctaHeading}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xl">
                {ctaDesc}
              </p>
              <CTAButton className="group btn-gold text-[14px] px-8 py-3.5" aria-label="Book a strategy session with Nexyovi">
                <span className="relative z-10">Book a strategy session</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
