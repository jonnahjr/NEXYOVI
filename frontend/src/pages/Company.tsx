import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Briefcase, Check, Globe, Home, ShieldCheck, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

// Import all company sub-components
import CompanyCulture from '../components/CompanyCulture';
import CompanyHubs from '../components/CompanyHubs';
import CompanyLeadership from '../components/CompanyLeadership';
import CompanyMetrics from '../components/CompanyMetrics';
import CompanyStory from '../components/CompanyStory';
import CompanyValues from '../components/CompanyValues';
import EnterpriseTrustBar from '../components/EnterpriseTrustBar';
import FounderStory from '../components/FounderStory';
import PartnerCarousel from '../components/PartnerCarousel';
import { revealUp, staggerContainer, fadeUp } from '../lib/animations';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'story', label: 'Our Story' },
  { id: 'vision', label: 'Mission & Vision' },
  { id: 'values', label: 'Values' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'partners', label: 'Partners' },
  { id: 'impact', label: 'Impact' },
  { id: 'culture', label: 'Culture' },
  { id: 'careers', label: 'Careers' },
  { id: 'trust', label: 'Trust Center' },
];

export default function Company() {
  const [activeSection, setActiveSection] = useState('about');
  const { hash } = useLocation();
  const { team } = useSite();
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Handle URL hash navigation on mount
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500); // wait for render
      }
    }
  }, [hash]);

  // Intersection Observer to update active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { rootMargin: '-20% 0px -60% 0px' }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // offset for fixed navbars
      const y = element.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#02040a] min-h-screen relative">

      {/* ── Subtle Background ── */}
      <div className="absolute inset-0 pointer-events-none z-0" />

      {/* ── Sticky Sub-Navigation ── */}
      <div className="sticky top-[80px] md:top-[96px] z-40 w-full border-b border-white/5 bg-[#02040a]/90 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-10">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-[11px] font-medium uppercase tracking-widest transition-colors relative whitespace-nowrap ${activeSection === id ? 'text-white' : 'text-white/40 hover:text-white'
                  }`}
              >
                {label}
                {activeSection === id && (
                  <motion.div
                    layoutId="activeCompanySection"
                    className="absolute -bottom-4 left-0 right-0 h-px bg-white"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="relative z-10">

        {/* 0. ABOUT */}
        <div id="about" className="scroll-mt-32">
          <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04] bg-[#02040a]">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[680px] bg-[#F5A800]/10 blur-[140px] rounded-full mix-blend-screen" />
              <div className="absolute inset-0 opacity-[0.03] animate-grid-drift"
                style={{
                  backgroundImage: `linear-gradient(rgba(37,99,235,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.6) 1px, transparent 1px)`,
                  backgroundSize: '90px 90px',
                }}
              />
            </div>

            <div className="container relative z-10 max-w-4xl mx-auto text-center">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
                <motion.div variants={revealUp} className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.10] text-[11px] uppercase tracking-[0.2em] text-[#FFD166]">
                  About us
                </motion.div>

                <motion.h1 variants={revealUp} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95]">
                  We build the AI your team <span className="text-gradient-aurora">actually trusts.</span>
                </motion.h1>

                <motion.p variants={revealUp} className="text-[#9CA3AF] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                  No black boxes. No hallucinated answers. Just verified intelligence pulled from the tools you already use.
                </motion.p>

                <motion.div variants={revealUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-left">
                  {[
                    { label: 'Daily points processed', value: '100M+' },
                    { label: 'Founded', value: '2024' },
                    { label: 'Team members', value: `${team.length}+` },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6">
                      <div className="text-4xl font-black tracking-tight text-white mb-2">{stat.value}</div>
                      <div className="text-sm uppercase tracking-[0.22em] text-white/50">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section className="bg-[#F8F5EB] text-slate-950">
            <div className="container max-w-6xl mx-auto py-24">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
                  <div className="badge mb-4 bg-slate-100 text-slate-700 border border-slate-200">Hello</div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-950">
                    A team of engineers, designers, and operators obsessed with AI adoption.
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Most AI tools ask you to trust them blindly. Nexyovi was built on the opposite principle: every answer traces back to a source, every action requires context, and nothing fires without your team in the loop.
                  </p>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    We started after watching enterprise teams drown in tools that created more noise than clarity. The pattern was always the same: scattered knowledge, disconnected systems, and people spending half their day just finding information instead of acting.
                  </p>
                </motion.div>

                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4">
                  {[
                    {
                      title: 'Ship with Proof',
                      description: 'We don\'t launch features that sound good in a pitch but crumble in production. If we can\'t demonstrate it works, it doesn\'t ship.',
                      icon: Check,
                    },
                    {
                      title: 'Earn the Context',
                      description: 'We dig into how teams actually work before building anything for how we think they should.',
                      icon: Globe,
                    },
                    {
                      title: 'Default to Transparent',
                      description: 'Source attribution isn\'t a feature, it\'s a philosophy. Decisions come with reasoning, not just conclusions.',
                      icon: Home,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all hover:shadow-xl">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mb-5">
                          <Icon size={20} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-950 mb-3">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{item.description}</p>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        {/* 1. OUR STORY */}
        <div id="story" className="scroll-mt-32 bg-[#02040a] text-white border-t border-white/[0.05]">
          {/* Hero Intro */}
          <section className="min-h-screen flex flex-col justify-center pt-32 pb-16 px-6 relative overflow-hidden bg-[#02040a] text-white">
            <div className="container mx-auto max-w-5xl text-center relative z-10">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center">
                <motion.div variants={revealUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">Enterprise Intelligence Hub</span>
                </motion.div>
                <motion.h1 variants={revealUp} className="text-5xl md:text-7xl font-bold text-white tracking-[-0.04em] mb-8 leading-[1.05]">
                  Architecting <br className="hidden md:block" />
                  <span className="text-white/40">Tomorrow's Infrastructure.</span>
                </motion.h1>
                <motion.p variants={revealUp} className="text-white/80 text-lg md:text-xl font-medium max-w-[720px] leading-relaxed">
                  We are a global collective of strategists, researchers, and systems architects building the digital backbone of the most demanding enterprises on Earth.
                </motion.p>
              </motion.div>
            </div>
          </section>
          <FounderStory />
          <CompanyStory />
        </div>

        {/* 2. MISSION & VISION */}
        <div id="vision" className="scroll-mt-32 section bg-[#F8F5EB] relative border-t border-slate-200 text-slate-950">
          <div className="container max-w-5xl relative z-10 text-center">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={revealUp} className="w-16 h-16 mx-auto rounded-[16px] bg-slate-100 border border-slate-200 flex items-center justify-center mb-8">
                <Target size={28} className="text-slate-600" />
              </motion.div>
              <motion.h2 variants={revealUp} className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.04em] mb-8">
                Absolute Precision. <br />
                <span className="text-slate-600">Infinite Scale.</span>
              </motion.h2>
              <motion.div variants={revealUp} className="grid md:grid-cols-2 gap-4 text-left mt-16">
                <div className="rounded-[32px] p-8 md:col-span-1 bg-white border border-slate-200 shadow-sm">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">The Mission</span>
                  </div>
                  <p className="text-slate-700 text-lg leading-relaxed font-medium">
                    To engineer secure, intelligent, and infinitely scalable systems that empower enterprises to dominate their sectors without technological friction.
                  </p>
                </div>
                <div className="rounded-[32px] p-8 md:col-span-1 bg-white border border-slate-200 shadow-sm">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">The Vision</span>
                  </div>
                  <p className="text-slate-700 text-lg leading-relaxed font-medium">
                    A frictionless digital future where every global enterprise operates on zero-trust, AI-optimized infrastructure engineered by our collective.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* 3. VALUES */}
        <div id="values" className="scroll-mt-32 bg-[#F8F5EB] text-slate-950 border-t border-slate-200">
          <CompanyValues />
        </div>

        {/* 4. LEADERSHIP */}
        <div id="leadership" className="scroll-mt-32 bg-[#02040a]">
          <CompanyLeadership />
        </div>

        {/* 5. PARTNERS & CLIENTS */}
        <div id="partners" className="scroll-mt-32 pt-24 bg-[#F8F5EB] text-slate-950 border-t border-slate-200">
          <div className="container text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-950 tracking-tight mb-4">Global <span className="text-slate-600">Deployments.</span></h2>
            <p className="text-slate-600 font-medium max-w-xl mx-auto">Trusted by the world's most aggressive and innovative organizations.</p>
          </div>
          <EnterpriseTrustBar />
          <PartnerCarousel />
        </div>

        {/* 6. IMPACT */}
        <div id="impact" className="scroll-mt-32 bg-[#02040a] border-t border-white/[0.05]">
          <CompanyMetrics />
        </div>

        {/* 7. CULTURE */}
        <div id="culture" className="scroll-mt-32 bg-[#F8F5EB] text-slate-950 border-t border-slate-200">
          <CompanyCulture />
          <CompanyHubs />
        </div>

        {/* 8. CAREERS / OPEN ROLES */}
        <div id="careers" className="scroll-mt-32 section bg-[#02040a]">
          <div className="container max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-hud p-10 md:p-16 text-center relative overflow-hidden"
            >
              <Briefcase size={40} className="text-white/60 mx-auto mb-8" />
              <h2 className="text-4xl font-bold text-white tracking-[-0.04em] mb-6">Join the <span className="text-[#7a7a7a]">Collective.</span></h2>
              <p className="text-white/50 text-lg font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                We are constantly searching for elite engineers, visionary designers, and relentless problem-solvers to push the boundaries of enterprise technology.
              </p>
              <Link to="/careers" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black text-[12px] uppercase tracking-widest transition-all hover:scale-105 group">
                Explore Open Roles
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* 9. TRUST CENTER */}
        <div id="trust" className="scroll-mt-32 section border-t border-slate-200 bg-[#F8F5EB] text-slate-950">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
                  <ShieldCheck size={14} className="text-slate-500" />
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-[0.2em]">Trust & Compliance</span>
                </div>
                <h2 className="text-4xl font-bold text-slate-950 tracking-[-0.04em] mb-6">Military-Grade <br /><span className="text-slate-600">Security.</span></h2>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                  Our systems are audited by independent global security firms. We operate under strict zero-trust architectures and maintain compliance with international data protection frameworks.
                </p>
                <div className="space-y-4 mb-10">
                  {['SOC 2 Type II Certified', 'ISO 27001 Compliant', 'GDPR & HIPAA Ready', 'End-to-End Encryption'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-[6px] bg-slate-100 border border-slate-200 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                      </div>
                      <span className="text-slate-600 font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/legal" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950 text-white font-medium text-[12px] uppercase tracking-widest hover:bg-slate-800 transition-all group">
                  Enter Trust Center
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative aspect-square">
                <div className="absolute inset-0 card-hud flex items-center justify-center overflow-hidden">
                  <ShieldCheck size={100} className="text-white/20 relative z-10" />
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="absolute inset-0 animate-[spin_8s_linear_infinite] pointer-events-none" style={{ animationDelay: `-${i * 2.5}s` }}>
                      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/20" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

