import React from 'react';
import { motion } from 'framer-motion';
import GithubSync from '../components/GithubSync';
import CTASection from '../components/CTASection';

const SoftwarePage = () => {
 return (
 <div className="theme-light bg-slate-50 pt-20">
 <section className="py-32 relative overflow-hidden">
 <div className="container-narrow relative z-10">
 <motion.h1 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-slate-900 font-bold text-7xl mb-8 tracking-tighter"
 >
 Software <span className="text-orange-500">Engineering</span>
 </motion.h1>
 <p className="text-slate-500 text-2xl max-w-3xl leading-relaxed mb-12">
 Custom applications and enterprise systems built with the latest technologies. We turn complex requirements into seamless digital experiences.
 </p>
 </div>
 <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-500/5 to-transparent pointer-events-none" />
 </section>
 
 <GithubSync />
 
 <section className="py-32 border-t border-white/[0.04]">
 <div className="container-narrow">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
 <div className="p-10 rounded-[32px] bg-white border border-slate-200">
 <h3 className="text-slate-900 font-bold text-2xl mb-4">Mobile App Development</h3>
 <p className="text-slate-500 text-lg">High-performance native and cross-platform apps for iOS and Android.</p>
 </div>
 <div className="p-10 rounded-[32px] bg-white border border-slate-200">
 <h3 className="text-slate-900 font-bold text-2xl mb-4">Cloud Native Architectures</h3>
 <p className="text-slate-500 text-lg">Scalable, distributed systems powered by AWS, Azure, and Google Cloud.</p>
 </div>
 </div>
 </div>
 </section>

 <CTASection />
 </div>
 );
};

export default SoftwarePage;

