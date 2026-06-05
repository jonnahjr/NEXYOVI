import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import c1 from '../assets/c1.jpg';
import c2 from '../assets/c2.jpg';

const projects = [
 {
 title: 'Aura Intelligence Platform',
 category: 'AI & Data Science',
 desc: 'Distributed ML pipeline for predictive maintenance in industrial manufacturing clusters.',
 image: c1,
 metrics: ['70% Reduced Downtime', 'Sub-10ms Latency']
 },
 {
 title: 'SEC-Net Global Firewall',
 category: 'Cybersecurity',
 desc: 'Advanced zero-trust network infrastructure for secure cross-continental data transmission.',
 image: c2,
 metrics: ['Enterprise-grade Threat Mitigation', 'AI-Driven Auditing']
 }
];
import { useSite } from '../context/SiteContext';

const PortfolioPreview = () => {
  const { siteContent } = useSite();
  const displayProjects = siteContent?.portfolio && siteContent.portfolio.length > 0 
    ? siteContent.portfolio.map((p: any, i: number) => ({
        ...p,
        image: projects[i]?.image || c1, // Keep local images for now
        metrics: p.metrics.split(',').map((m: string) => m.trim())
      }))
    : projects;
 return (
 <section id="portfolio" className="py-40 bg-[#060709] overflow-hidden">
 <div className="container-wide">
 <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
 <motion.div 
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 className="flex-1"
 >
 <h2 className="text-white font-bold text-[64px] md:text-[84px] tracking-tighter leading-[0.9] mb-8">
 Mission <br/> <span className="text-white/40 italic">Accomplished.</span>
 </h2>
 <p className="text-[#a1a1a6] text-xl max-w-xl leading-relaxed">
 We deliver concrete results for global enterprises. Explore our portfolio of high-impact engineering milestones.
 </p>
 </motion.div>
 <Link 
 to="/portfolio" 
 className="group inline-flex items-center gap-4 text-white font-bold text-sm uppercase tracking-[0.3em] pb-4 border-b border-white/20 hover:border-white transition-all"
 >
 Explore all Work <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
 </Link>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
 {displayProjects.map((project: any, i: number) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="group relative"
 >
 <div className="relative aspect-[16/10] rounded-[64px] overflow-hidden border border-white/10">
 <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
 
 <div className="absolute top-10 right-10 flex gap-4">
 {project.metrics.map((m, idx) => (
 <div key={idx} className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-black uppercase tracking-widest text-white">
 {m}
 </div>
 ))}
 </div>

 <div className="absolute bottom-12 left-12 right-12">
 <p className="text-white/40 text-xs font-black uppercase tracking-[0.4em] mb-4">{project.category}</p>
 <h3 className="text-white font-black text-4xl tracking-tighter mb-6">{project.title}</h3>
 <p className="text-white/60 text-lg leading-relaxed max-w-md group-hover:text-white transition-colors">
 {project.desc}
 </p>
 </div>
 
 <Link to={`/portfolio#${i}`} className="absolute top-10 left-10 w-14 h-14 rounded-full bg-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 hover:rotate-45">
 <ExternalLink size={24} className="text-black" />
 </Link>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 );
};

export default PortfolioPreview;

