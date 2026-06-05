import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import locate1 from '../assets/location/1.png';
import locate2 from '../assets/location/2.png';
import locate3 from '../assets/location/3.png';
import logisticsCase from '../assets/logistics_ai_case_study_1777103353905.png';
import market1 from '../assets/market/1.png';
import market2 from '../assets/market/2.png';
import market3 from '../assets/market/3.png';
import tele1 from '../assets/tele/1.png';
import tele2 from '../assets/tele/2.png';
import tele3 from '../assets/tele/3.png';
import workspaceCase from '../assets/workspace_case_study.png';

const projects = [
    {
        name: 'Nexi Market',
        desc: 'Multi-vendor e-commerce platform with millions of products.',
        outcome: 'Processed 2.1M transactions/year, reduced checkout time by 35%',
        screenshots: [market1, market2, market3],
        tags: ['Nexyovi Labs', 'E-Commerce', 'Mobile'],
        href: '/projects',
    },
    {
        name: 'Nexi Locate',
        desc: 'Location discovery app for restaurants, cafes, and more.',
        outcome: '200K+ active users, 4.8-star rating on app stores',
        screenshots: [locate1, locate2, locate3],
        tags: ['Nexyovi Labs', 'Maps', 'Mobile'],
        href: '/projects',
    },
    {
        name: 'Tele-Psychiatry',
        desc: 'Secure telehealth platform connecting patients with specialists.',
        outcome: 'HIPAA-compliant, facilitated 50K+ consultations, 95% patient satisfaction',
        screenshots: [tele1, tele2, tele3],
        tags: ['iOS', 'Android', 'Health'],
        href: '/projects/tele-psychiatry',
    },
    {
        name: 'Banking Security Platform',
        desc: 'Enterprise security and fraud detection for leading banks.',
        outcome: 'Reduced fraud detection time by 40%, processed 2M secure transactions/day',
        screenshots: [logisticsCase, workspaceCase],
        tags: ['FinTech', 'AI', 'Security'],
        href: '/projects/global-bank-security',
    },
];

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function FeaturedProjects() {
    return (
        <section className="relative bg-[#02040a] py-36 section-divider-dark overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute left-1/3 top-1/4 w-[500px] h-[500px] rounded-full bg-[#F5A800]/5 blur-[160px]" />
                <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[400px] rounded-full bg-[#8b5cf6]/5 blur-[140px]" />
            </div>

            <div className="container max-w-6xl mx-auto relative z-10 px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-end justify-between mb-12"
                >
                    <div>
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-5">
                            <span className="w-2 h-2 rounded-full bg-[#F5A800] animate-pulse" />
                            <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-[0.2em]">Featured Projects</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.04em] leading-[0.95]">
                            Products we've <br />
                            <span className="bg-gradient-to-r from-[#F5A800] to-amber-400 bg-clip-text text-transparent">shipped.</span>
                        </h2>
                    </div>
                    <Link
                        to="/projects"
                        className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-[13px] font-bold uppercase tracking-widest transition-all"
                    >
                        View All
                        <ArrowRight size={14} />
                    </Link>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
                >
                    {projects.map((project, i) => {
                        const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

                        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                        };

                        const handleMouseLeave = () => {
                            setMousePos({ x: -1000, y: -1000 });
                        };

                        return (
                            <motion.div
                                key={i}
                                variants={cardVariants}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className="group relative overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.05]"
                            >
                                {/* Hover Spotlight */}
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                                    style={{
                                        background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 168, 0, 0.08), transparent 40%)`
                                    }}
                                />

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Screenshot row */}
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center gap-2 px-3">
                                            {project.screenshots.map((img, j) => (
                                                <div
                                                    key={j}
                                                    className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-white/5 shadow-lg"
                                                    style={{
                                                        width: j === 1 ? '55%' : '40%',
                                                        aspectRatio: '9 / 19',
                                                        marginTop: j === 0 ? '12%' : j === 2 ? '12%' : 0,
                                                    }}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`${project.name} screen ${j + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        {/* Bottom fade */}
                                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#02040a] to-transparent pointer-events-none" />
                                    </div>

                                    {/* Info */}
                                    <div className="p-5 pt-3 flex flex-col flex-grow">
                                        <h3 className="text-white font-bold text-[15px] tracking-tight mb-1 group-hover:text-[#F5A800] transition-colors">
                                            {project.name}
                                        </h3>
                                        <p className="text-white/40 text-xs leading-relaxed mb-2 line-clamp-2">
                                            {project.desc}
                                        </p>
                                        {project.outcome && (
                                            <p className="text-[#F5A800] text-[11px] font-medium mb-4 leading-relaxed">
                                                {project.outcome}
                                            </p>
                                        )}
                                        <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/30 uppercase tracking-wider group-hover:border-white/[0.15] group-hover:text-white/60 transition-colors duration-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        {project.href !== '/projects' && (
                                            <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                                <span className="text-[11px] font-bold uppercase tracking-widest text-white">Read Case Study</span>
                                                <ArrowRight size={14} className="text-[#F5A800]" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Hover overlay link */}
                                <Link to={project.href} className="absolute inset-0 z-20" aria-label={`View ${project.name}`}>
                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ExternalLink size={12} className="text-[#F5A800]" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Mobile view all link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="md:hidden text-center mt-8"
                >
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 text-[13px] font-bold uppercase tracking-widest hover:text-white hover:border-white/20 transition-all"
                    >
                        View All Projects
                        <ArrowRight size={14} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
