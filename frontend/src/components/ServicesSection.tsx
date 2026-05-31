import { motion } from 'framer-motion';
import {
 ArrowRight,
 BrainCircuit,
 Code,
 Database,
 Cloud,
 Smartphone,
 Lightbulb,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
 {
 id: 'software',
 title: 'Software Development',
 desc: 'Web platforms, SaaS products, and custom business systems.',
 icon: Code,
 accent: '#F5A800',
 glow: 'rgba(245,168,0,0.12)',
 tags: ['Web Platforms', 'SaaS', 'Custom Systems'],
 href: '/services/software',
 },
 {
 id: 'ai',
 title: 'AI & Automation',
 desc: 'AI assistants, workflow automation, and intelligent business tools.',
 icon: BrainCircuit,
 accent: '#8b5cf6',
 glow: 'rgba(139,92,246,0.12)',
 tags: ['AI Assistants', 'Automation', 'Intelligent Tools'],
 href: '/services/ai',
 },
 {
 id: 'mobile',
 title: 'Mobile Applications',
 desc: 'iOS and Android applications for customers and internal teams.',
 icon: Smartphone,
 accent: '#10b981',
 glow: 'rgba(16,185,129,0.12)',
 tags: ['iOS', 'Android', 'Internal Tools'],
 href: '/services/apps',
 },
 {
 id: 'cloud',
 title: 'Cloud & Infrastructure',
 desc: 'Servers, DevOps, deployment, networking, and monitoring.',
 icon: Cloud,
 accent: '#06b6d4',
 glow: 'rgba(6,182,212,0.12)',
 tags: ['DevOps', 'Deployment', 'Monitoring'],
 href: '/services/infrastructure',
 },
 {
 id: 'data',
 title: 'Data & Analytics',
 desc: 'Dashboards, reporting, and business intelligence solutions.',
 icon: Database,
 accent: '#3b82f6',
 glow: 'rgba(59,130,246,0.12)',
 tags: ['Dashboards', 'Reporting', 'Business Intelligence'],
 href: '/services/data',
 },
 {
 id: 'consulting',
 title: 'IT Consulting',
 desc: 'Architecture reviews, technology strategy, and digital transformation.',
 icon: Lightbulb,
 accent: '#ec4899',
 glow: 'rgba(236,72,153,0.12)',
 tags: ['Strategy', 'Architecture', 'Transformation'],
 href: '/contact',
 }];

const ServicesSection = () => {
 return (
 <section className="relative bg-[#f4f4f5] py-32 border-t border-slate-200">
 <div className="container relative z-10">

 <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

 {/* Left Column: Sticky Header */}
 <div className="lg:w-1/3">
 <div className="lg:sticky lg:top-32">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse " />
  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">What We Build</span>
  </div>

  <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95] mb-6">
  Full-Stack <br />
  Digital <br />
  <span className="text-[#F5A800]">Services</span>
  </h2>

  <p className="text-slate-600 text-lg leading-relaxed max-w-sm mb-10 font-medium">
  From software and AI to infrastructure and strategy — we deliver end-to-end digital solutions for modern businesses.
  </p>

 <Link
 to="/services"
 id="services-explore-all"
 className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-[14px] transition-all hover:scale-105 hover:bg-[#F5A800]"
 >
 Explore All Capabilities
 <ArrowRight size={16} />
 </Link>
 </div>
 </div>

 {/* Right Column: Stacking Cards */}
 <div className="lg:w-2/3 flex flex-col gap-6 pb-[20vh]">
 {services.map((s, i) => {
 const Icon = s.icon;
 const topOffset = 120 + i * 20; // Creates the staggered stacking effect
 return (
 <motion.div
 key={s.id}
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-100px" }}
 transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="sticky group relative flex flex-col md:flex-row gap-8 p-10 bg-white border border-slate-200 rounded-[32px] hover:border-[#F5A800]/40 transition-all duration-500 overflow-hidden"
 style={{ top: `${topOffset}px`, zIndex: i + 10 }}
 >
 <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

 <div className="w-16 h-16 rounded-[20px] bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 group-hover:border-[#F5A800]/30 transition-colors relative z-10">
 <Icon size={28} className="text-slate-500 group-hover:text-[#F5A800] transition-colors" />
 </div>

 <div className="flex flex-col relative z-10 w-full">
 <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight mb-3 group-hover:text-[#F5A800] transition-colors">
 {s.title}
 </h3>
 <p className="text-slate-600 text-[15px] leading-relaxed mb-6 font-medium max-w-lg">
 {s.desc}
 </p>
 <div className="flex flex-wrap gap-2">
 {s.tags.map((tag) => (
 <span
 key={tag}
 className="text-[11px] font-bold px-4 py-2 rounded-full bg-slate-100 text-slate-600 uppercase tracking-widest border border-slate-200"
 >
 {tag}
 </span>
 ))}
 </div>
 </div>

 {/* Arrow Icon */}
 <div className="absolute top-10 right-10 w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 hidden md:flex z-10">
 <ArrowRight size={16} className="text-[#F5A800]" />
 </div>

 {/* Link wrapper */}
 <Link to={s.href} className="absolute inset-0 z-20" aria-label={`View ${s.title} services`} />
 </motion.div>
 );
 })}
 </div>

 </div>

 </div>
 </section>
 );
};

export default ServicesSection;
