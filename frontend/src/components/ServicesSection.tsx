import { motion } from 'framer-motion';
import {
    ArrowRight,
    BrainCircuit,
    Cloud,
    Code,
    Database,
    Lightbulb,
    Smartphone,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
    {
        id: 'software',
        title: 'Software Development',
        desc: 'Custom web platforms and SaaS products, delivered end-to-end by senior engineers.',
        icon: Code,
        accent: '#F5A800',
        glow: 'rgba(245,168,0,0.12)',
        differentiator: 'Senior engineers only, no junior allocation',
        href: '/services/software',
    },
    {
        id: 'ai',
        title: 'AI & Automation',
        desc: 'AI and automation systems that create measurable ROI and operational efficiency.',
        icon: BrainCircuit,
        accent: '#8b5cf6',
        glow: 'rgba(139,92,246,0.12)',
        differentiator: 'Production-ready AI, not just demos',
        href: '/services/ai',
    },
    {
        id: 'mobile',
        title: 'Mobile Applications',
        desc: 'Native iOS and Android apps with cross-platform flexibility and great performance.',
        icon: Smartphone,
        accent: '#10b981',
        glow: 'rgba(16,185,129,0.12)',
        differentiator: 'Native performance, cross-platform flexibility',
        href: '/services/apps',
    },
    {
        id: 'cloud',
        title: 'Cloud & Infrastructure',
        desc: 'Scalable, secure infrastructure with 99.9% uptime and automated DevOps.',
        icon: Cloud,
        accent: '#06b6d4',
        glow: 'rgba(6,182,212,0.12)',
        differentiator: '99.9% uptime SLA guaranteed',
        href: '/services/infrastructure',
    },
    {
        id: 'data',
        title: 'Data & Analytics',
        desc: 'Real-time data pipelines, dashboards, and business intelligence you can trust.',
        icon: Database,
        accent: '#3b82f6',
        glow: 'rgba(59,130,246,0.12)',
        differentiator: 'Real-time data pipelines you can trust',
        href: '/services/data',
    },
    {
        id: 'consulting',
        title: 'IT Consulting',
        desc: 'Honest architecture reviews and technology strategy with no sales pressure.',
        icon: Lightbulb,
        accent: '#ec4899',
        glow: 'rgba(236,72,153,0.12)',
        differentiator: 'Honest advice, no sales pressure',
        href: '/contact',
    }];

const ServicesSection = () => {
    return (
        <section className="relative bg-[#FCFBF8] py-32 border-t border-slate-200">
            <div className="container relative z-10">

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

                    {/* Left Column: Sticky Header */}
                    <div className="lg:w-1/3">
                        <div className="lg:sticky lg:top-32">
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-[-0.04em] leading-[0.92] mb-6">
                                Full-Stack <br />
                                <span className="block text-center -translate-x-4">Digital</span>
                                <span className="text-[#F5A800]">Services</span>
                            </h2>

                            <p className="text-slate-600 text-lg leading-relaxed max-w-md mb-10 font-medium">
                                From software and AI to infrastructure and strategy — we deliver end-to-end digital solutions for modern businesses.
                            </p>

                            <Link
                                to="/services"
                                id="services-explore-all"
                                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-slate-950 text-white font-bold text-[15px] transition-all hover:scale-105 hover:bg-[#F5A800] hover:text-black"
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
                                    className="sticky group relative flex flex-col md:flex-row gap-4 md:gap-6 p-6 md:p-8 bg-white border border-slate-200 rounded-[24px] hover:border-[#F5A800]/30 transition-all duration-500 overflow-hidden shadow-[0_2px_20px_-8px_rgba(0,0,0,0.04)]"
                                    style={{ top: `${topOffset}px`, zIndex: i + 10 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="relative w-12 h-12 rounded-[14px] bg-[#030303] flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#F5A800]/40 transition-all duration-300 shadow-sm overflow-hidden z-10">
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                                        <Icon size={20} className="text-zinc-400 group-hover:text-[#F5A800] transition-colors relative z-10" />
                                    </div>

                                    <div className="flex flex-col relative z-10 w-full">
                                        <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight mb-2 group-hover:text-[#F5A800] transition-colors">
                                            {s.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-3 font-medium max-w-lg">
                                            {s.desc}
                                        </p>
                                        <p className="text-xs md:text-sm font-bold text-slate-900" style={{ color: s.accent }}>
                                            {s.differentiator}
                                        </p>
                                    </div>

                                    {/* Arrow Icon */}
                                    <div className="absolute top-6 right-6 w-8 h-8 rounded-xl bg-[#030303] border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 hidden md:flex z-10 overflow-hidden shadow-sm">
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                                        <ArrowRight size={12} className="relative z-10 text-zinc-400 group-hover:text-[#F5A800]" />
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
