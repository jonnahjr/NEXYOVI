import React from 'react';
import { motion } from 'framer-motion';
import KnowledgeDocs from '../components/KnowledgeDocs'; // Re-use the existing security component context
import CTASection from '../components/CTASection';

const SecurityPage = () => {
 return (
 <div className="theme-light bg-slate-50 pt-20">
 <section className="py-32 relative overflow-hidden">
 <div className="container-narrow relative z-10">
 <motion.h1 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-slate-900 font-bold text-7xl mb-8 tracking-tighter"
 >
 Cyber Security <span className="text-red-500">& Audits</span>
 </motion.h1>
 <p className="text-slate-500 text-2xl max-w-3xl leading-relaxed mb-12">
 Enterprise-grade protection for your digital infrastructure. We specialize in identifying risks before they become threats.
 </p>
 </div>
 <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none" />
 </section>
 
 <KnowledgeDocs />
 
 <section className="py-32 bg-slate-50">
 <div className="container-narrow">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
 <div className="p-8 rounded-3xl bg-white border border-slate-200">
 <h3 className="text-slate-900 font-bold text-xl mb-4">Vulnerability Scanning</h3>
 <p className="text-slate-500">Automated and manual checks for the latest exploits and security holes.</p>
 </div>
 <div className="p-8 rounded-3xl bg-white border border-slate-200">
 <h3 className="text-slate-900 font-bold text-xl mb-4">Compliance Audit</h3>
 <p className="text-slate-500">Ensuring your systems meet ISO 27001, SOC2, and regional requirements.</p>
 </div>
 <div className="p-8 rounded-3xl bg-white border border-slate-200">
 <h3 className="text-slate-900 font-bold text-xl mb-4">Incident Response</h3>
 <p className="text-slate-500">24/7 support for when the unthinkable happens. We restore and harden.</p>
 </div>
 </div>
 </div>
 </section>

 <CTASection />
 </div>
 );
};

export default SecurityPage;

