import React from 'react';
import { motion } from 'framer-motion';
import CTASection from '../components/CTASection';

const FoundersPage = () => {
 return (
 <div className="bg-slate-50 text-slate-900 pt-20 theme-light">
 <section className="relative min-h-screen flex flex-col justify-center pt-40 pb-32 overflow-hidden border-b border-slate-200 bg-[#050608]">
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.02)_0%,transparent_70%)]" />
 <div className="container-narrow relative z-10 text-center">
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="w-40 h-40 rounded-[48px] bg-gradient-to-tr from-orange-500/20 to-transparent border border-orange-500/20 mx-auto mb-10 flex items-center justify-center text-5xl font-black text-white "
 >
 YB
 </motion.div>
 <motion.h1 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-white font-bold text-[84px] mb-6 tracking-tighter leading-none"
 >
 Yonas <span className="text-white/50">Bogale.</span>
 </motion.h1>
 <p className="text-orange-500 font-mono uppercase tracking-[0.4em] mb-12 text-xs font-bold">Founder & CEO, Nexyovi Global</p>
 <p className="text-[#797d86] text-3xl max-w-3xl mx-auto leading-tight font-medium italic">
 "Technology is the bridge between our current reality and our greatest ambitions."
 </p>
 </div>
 </section>

 <section className="py-24 border-t border-slate-200">
 <div className="container-narrow">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
 <div>
 <h2 className="text-slate-900 font-bold text-3xl mb-8">The Vision</h2>
 <p className="text-slate-600 text-lg leading-relaxed mb-6">
 Yonas Bogale founded Nexyovi with a mission to bridge the digital gap in emerging markets while providing world-class tech services to global clients. 
 </p>
 <p className="text-slate-600 text-lg leading-relaxed">
 Under his leadership, the company has grown from a local startup to an international technology firm operating between Addis Ababa and Miami.
 </p>
 </div>
 <div className="space-y-12">
 <div>
 <h3 className="text-slate-900 font-bold text-xl mb-4 tracking-tight">Addis Ababa Headquarters</h3>
 <p className="text-slate-500 leading-relaxed">Focusing on regional digital transformation, fiber optic infrastructure, and localized software solutions.</p>
 </div>
 <div>
 <h3 className="text-slate-900 font-bold text-xl mb-4 tracking-tight">Miami Operations</h3>
 <p className="text-slate-500 leading-relaxed">Specializing in global Cyber Security audits, AI innovation, and international consulting services.</p>
 </div>
 </div>
 </div>
 </div>
 </section>

 <CTASection />
 </div>
 );
};

export default FoundersPage;

