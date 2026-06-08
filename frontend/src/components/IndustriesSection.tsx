import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    Building2,
    Cpu,
    GraduationCap,
    HeartPulse,
    ShoppingCart,
    Truck,
    Zap
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fadeUp, viewport } from '../lib/animations';

const industries = [
    {
        id: 'fintech',
        icon: Zap,
        title: 'FinTech',
        subtitle: 'Financial Technology',
        desc: 'High-throughput payment processing, core banking modernization, and real-time fraud detection systems engineered for regulatory compliance and transaction reliability at scale.',
        accent: '#F5A800',
        metrics: [
            { value: 'PCI-DSS', label: 'Level 1 Compliant' },
            { value: 'Banking APIs', label: 'Open Banking Ready' },
            { value: 'Fraud Detection', label: 'Real-Time AI' },
        ],
        tags: ['Payments', 'Banking APIs', 'Fraud Detection'],
        cta: 'View Industry',
    },
    {
        id: 'healthtech',
        icon: HeartPulse,
        title: 'HealthTech',
        subtitle: 'Healthcare Technology',
        desc: 'HIPAA-compliant telemedicine platforms, interoperable EHR systems, and AI-powered clinical decision support tools.',
        accent: '#10b981',
        metrics: [
            { value: 'HIPAA', label: 'Compliant Architecture' },
            { value: 'HL7 FHIR', label: 'EHR Integration' },
            { value: '256-Bit', label: 'Encryption Standard' },
        ],
        tags: ['Telemedicine', 'EHR Integration', 'Clinical AI'],
        cta: 'View Industry',
    },
    {
        id: 'government',
        icon: Building2,
        title: 'Government',
        subtitle: 'Public Sector',
        desc: 'Sovereign digital identity platforms, e-government service portals, and secure national infrastructure.',
        accent: '#8b5cf6',
        metrics: [
            { value: 'Digital Identity', label: 'National ID Systems' },
            { value: 'E-Services', label: 'Citizen Portals' },
            { value: 'SOC-2', label: 'Security Certified' },
        ],
        tags: ['Digital Services', 'Identity Systems', 'Citizen Portals'],
        cta: 'Explore Sector',
    },
    {
        id: 'logistics',
        icon: Truck,
        title: 'Logistics',
        subtitle: 'Supply Chain',
        desc: 'Real-time supply chain visibility platforms, fleet management systems, and logistics optimization engines.',
        accent: '#f59e0b',
        metrics: [
            { value: 'Fleet Tracking', label: 'Real-Time GPS' },
            { value: 'Route Optimization', label: 'AI-Powered' },
            { value: 'Supply Chain', label: 'End-to-End Visibility' },
        ],
        tags: ['Fleet Tracking', 'Route Optimization', 'Supply Chain'],
        cta: 'View Industry',
    },
    {
        id: 'retail',
        icon: ShoppingCart,
        title: 'Retail',
        subtitle: 'Commerce',
        desc: 'Omnichannel commerce platforms, AI-driven personalization engines, and real-time inventory systems.',
        accent: '#06b6d4',
        metrics: [
            { value: 'Omnichannel', label: 'Unified Commerce' },
            { value: 'AI Personalization', label: 'Recommendation Engine' },
            { value: 'PCI-DSS', label: 'Compliant' },
        ],
        tags: ['Omnichannel Commerce', 'AI Personalization', 'Inventory Management'],
        cta: 'View Industry',
    },
    {
        id: 'education',
        icon: GraduationCap,
        title: 'Education',
        subtitle: 'Learning',
        desc: 'Scalable learning management platforms, virtual classroom infrastructure, and AI tutoring systems.',
        accent: '#ec4899',
        metrics: [
            { value: 'LMS', label: 'Learning Platform' },
            { value: 'Student Info', label: 'Management Systems' },
            { value: 'WCAG', label: 'Accessibility Compliant' },
        ],
        tags: ['LMS', 'Student Information Systems', 'Assessments'],
        cta: 'View Industry',
    },
    {
        id: 'manufacturing',
        icon: Cpu,
        title: 'Manufacturing',
        subtitle: 'Industry 4.0',
        desc: 'Smart factory systems, computer vision quality control, and predictive maintenance platforms.',
        accent: '#ef4444',
        metrics: [
            { value: 'IIoT', label: 'Connected Factory' },
            { value: 'AI QC', label: 'Vision Inspection' },
            { value: 'Predictive', label: 'Maintenance AI' },
        ],
        tags: ['Smart Factory', 'Predictive Maintenance', 'Quality Control'],
        cta: 'View Industry',
    },
    {
        id: 'energy',
        icon: Zap,
        title: 'Energy',
        subtitle: 'Critical Infrastructure',
        desc: 'Smart grid management platforms, renewable energy optimization, and SCADA security systems.',
        accent: '#eab308',
        metrics: [
            { value: 'SCADA', label: 'Security' },
            { value: 'Smart Grid', label: 'Real-Time Management' },
            { value: 'IEC', label: '62443 Certified' },
        ],
        tags: ['Smart Grid', 'Renewable Energy', 'Critical Infrastructure'],
        cta: 'View Industry',
    },
];

const IndustriesSection = () => {
    const [active, setActive] = useState(1);

    return (
        <section className="relative bg-[#FCFBF8] py-32 section-divider-light overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
                    backgroundSize: '150px 150px',
                }}
            />

            <div className="container relative z-10 max-w-6xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="lg:w-1/3"
                    >
                        <div className="lg:sticky lg:top-32">
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-[-0.04em] leading-[0.92] mb-6">
                                Industries <br />
                                <span className="block text-center -translate-x-4">We</span>
                                <span className="text-[#F5A800]">Empower</span>
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed max-w-md mb-10 font-medium">
                                Deep domain expertise across our core verticals — building solutions that understand your industry.
                            </p>

                            <Link
                                to="/industries"
                                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-slate-950 text-white font-bold text-[15px] transition-all hover:scale-105 hover:bg-[#F5A800] hover:text-black"
                            >
                                Explore All Verticals
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </motion.div>

                    <div className="lg:w-2/3 flex flex-col gap-6">
                        {industries.map((ind, i) => {
                            const isActive = i === active;
                            const Icon = ind.icon;

                            return (
                                <div
                                    key={ind.id}
                                    onMouseEnter={() => setActive(i)}
                                    className={`group cursor-pointer relative overflow-hidden transition-all duration-700 border rounded-[24px] ${isActive ? 'bg-white border-slate-200 shadow-[0_16px_30px_-18px_rgba(0,0,0,0.04)]' : 'bg-white/40 border-slate-200/50 hover:bg-white/80 hover:border-slate-200 shadow-sm'}`}
                                >
                                    {/* Active Glow Gradient */}
                                    <div
                                        className="absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none"
                                        style={{ background: `radial-gradient(circle at 50% 50%, ${ind.accent}0A 0%, transparent 50%)`, opacity: isActive ? 1 : 0 }}
                                    />

                                    <div className="py-3.5 lg:py-4 px-4 lg:px-6 relative z-10 flex flex-col">

                                        {/* Row Header (Always visible) */}
                                        <div className="flex items-center justify-between gap-5">
                                             <div className="flex items-center gap-4 lg:gap-6">
                                                 <h3 className={`text-xl md:text-2xl lg:text-[28px] font-black tracking-[-0.02em] transition-all duration-500 ${isActive ? 'text-slate-900 translate-x-1.5' : 'text-slate-500 group-hover:text-slate-800'}`}>
                                                    {ind.title}
                                                </h3>
                                            </div>

                                            {!isActive && (
                                                <ArrowRight size={20} className="text-slate-400 group-hover:text-[#F5A800] transition-colors hidden md:block" />
                                            )}
                                        </div>

                                        {/* Expandable Content Area */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pt-3 pb-0 flex flex-col lg:flex-row gap-6 lg:items-start pl-10 lg:pl-12">

                                                        {/* Left: Description & Tags */}
                                                        <div className="flex-1 border-l-2 border-slate-100 pl-4 lg:pl-5">
                                                            <div className="flex items-center gap-2 mb-4">
                                                                <div className="w-8 h-8 rounded-full bg-[#F8F5EB] border border-slate-200 flex items-center justify-center">
                                                                    <Icon size={14} style={{ color: ind.accent }} />
                                                                </div>
                                                                <div className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: ind.accent }}>
                                                                    {ind.subtitle}
                                                                </div>
                                                            </div>

                                                            <p className="text-slate-600 text-[13px] leading-relaxed mb-5 max-w-lg font-medium">
                                                                {ind.desc}
                                                            </p>

                                                            <div className="flex flex-wrap gap-2">
                                                                {ind.tags.map((tag) => (
                                                                    <span key={tag} className="px-2.5 py-1 rounded-full bg-[#F8F5EB] border border-slate-200 text-slate-600 text-[9px] font-bold uppercase tracking-wider">
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Right: Metrics & CTA */}
                                                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-40 shrink-0">
                                                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 w-full">
                                                                {ind.metrics.map(m => (
                                                                    <div key={m.label} className="bg-[#F8F5EB] border border-slate-200/60 rounded-lg p-1.5 md:p-2 flex flex-col justify-center">
                                                                        <div className="text-sm font-bold text-slate-900 tracking-tight">{m.value}</div>
                                                                        <div className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-500 mt-0.5">{m.label}</div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <Link
                                                                to="/industries"
                                                                className="mt-1 w-full lg:w-auto px-3 py-2 rounded-lg bg-[#F5A800] text-black font-bold text-[10px] flex items-center justify-between hover:scale-105 transition-all group/btn shadow-md shadow-[#F5A800]/20"
                                                            >
                                                                {ind.cta}
                                                                <ArrowRight size={12} className="text-black/60 group-hover/btn:text-black group-hover/btn:translate-x-1 transition-all" />
                                                            </Link>
                                                        </div>

                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default IndustriesSection;
