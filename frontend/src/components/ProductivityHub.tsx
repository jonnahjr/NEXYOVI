import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
 {
 id: 'digital',
 title: 'Digital Transformation.',
 desc: 'Bypassing current limitations with future-proof digital strategies.',
 },
 {
 id: 'security',
 title: 'Security Architecture.',
 desc: 'Building unshakable foundations for your data and user privacy.',
 },
 {
 id: 'agile',
 title: 'Agile Development.',
 desc: 'Rapid deployment of scalable applications using cutting-edge tech.',
 },
 {
 id: 'integration',
 title: 'System Integration.',
 desc: 'Connecting disparate platforms into a unified, powerful ecosystem.',
 }];

const ProductivityHub = () => {
 const [active, setActive] = useState('digital');

 return (
 <section id="capabilities" className="bg-[#090A0C] py-40 relative overflow-hidden">
 <div className="container-narrow">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="mb-16"
 >
 <h2 className="text-white font-bold text-[52px] leading-dense tracking-tighter mb-5">
 Ultimate Tech Prowess
 </h2>
 <p className="text-[#797d86] text-18 max-w-[580px] leading-snug tracking-snug">
 Nexyovi is a multi-disciplinary tech powerhouse. From cloud migration to proprietary AI, we deliver the most advanced IT solutions in the market.
 </p>
 </motion.div>

 <div className="grid grid-cols-1 lg:grid-cols-[264px_1fr] gap-16 items-start">
 {/* Feature list */}
 <div className="flex flex-col gap-0">
 {features.map((f) => (
 <button
 key={f.id}
 onClick={() => setActive(f.id)}
 className={`text-left px-4 py-4 rounded-xl transition-all duration-200 border-l-2 ${
 active === f.id
 ? 'border-white bg-white/[0.03]'
 : 'border-transparent hover:bg-white/[0.02]'
 }`}
 >
 <span className={`text-[15px] font-medium transition-colors ${active === f.id ? 'text-white' : 'text-[#797d86]'}`}>
 {f.title}&nbsp;
 <span className="font-normal text-[#4a4b50]">{f.desc}</span>
 </span>
 </button>
 ))}
 </div>

 {/* Feature Visual */}
 <AnimatePresence mode="wait">
 <motion.div
 key={active}
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.95 }}
 transition={{ duration: 0.3 }}
 className="relative rounded-[20px] overflow-hidden border border-white/[0.06] bg-[#0F1014] aspect-[4/3] flex items-center justify-center"
 >
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
 <div className="text-center z-10 px-8">
 <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-6">
 <div className="w-6 h-6 rounded bg-white/80" />
 </div>
 <p className="text-white font-semibold text-[18px] mb-2 tracking-tight">
 {features.find(f => f.id === active)?.title}
 </p>
 <p className="text-[#797d86] text-[14px] leading-relaxed max-w-xs mx-auto">
 {features.find(f => f.id === active)?.desc}
 </p>
 </div>
 </motion.div>
 </AnimatePresence>
 </div>
 </div>
 </section>
 );
};

export default ProductivityHub;

