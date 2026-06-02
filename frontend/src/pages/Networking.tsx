import React from 'react';
import { motion } from 'framer-motion';
import VirtualOffice from '../components/VirtualOffice';
import CTASection from '../components/CTASection';

const NetworkingPage = () => {
 return (
 <div className="theme-light bg-slate-50 pt-20">
 <section className="py-32 relative overflow-hidden">
 <div className="container-narrow relative z-10">
 <motion.h1 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-slate-900 font-bold text-7xl mb-8 tracking-tighter"
 >
 Global <span className="text-blue-500">Networking</span>
 </motion.h1>
 <p className="text-slate-500 text-2xl max-w-3xl leading-relaxed mb-12">
 The backbone of your enterprise. High-speed connectivity, fiber optics, and secure network infrastructure across Addis Ababa and global remote locations.
 </p>
 </div>
 <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none" />
 </section>
 
 <VirtualOffice />

 <section className="py-32 border-t border-white/[0.04]">
 <div className="container-narrow">
 <div className="grid grid-cols-1 gap-8">
 <div className="p-12 rounded-[40px] bg-white border border-slate-200">
 <h3 className="text-slate-900 font-bold text-3xl mb-6">Fiber Optic Installation</h3>
 <p className="text-slate-500 text-xl max-w-2xl">We deploy specialized fiber networks for corporate campuses, ensuring ultra-low latency and maximum bandwidth for critical operations.</p>
 </div>
 </div>
 </div>
 </section>

 <CTASection />
 </div>
 );
};

export default NetworkingPage;

