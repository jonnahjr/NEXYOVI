import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Database, Smartphone, ShieldPlus, CheckCircle2, ArrowRight, Heart } from 'lucide-react';

const solutions = [
 {
 id: '01',
 tag: 'Data Management',
 title: 'Smart Health Records',
 desc: 'Centralized, ultra-secure Electronic Health Record (EHR) systems with granular access controls. Built for multi-provider environments with real-time interoperability across clinical departments.',
 specs: ['HL7/FHIR Compliant', 'Real-time Sync', 'Granular RBAC'],
 icon: Database
 },
 {
 id: '02',
 tag: 'Remote Care',
 title: 'Telemedicine Platforms',
 desc: 'Secure, high-fidelity video and data infrastructure bridging patients and specialists globally. HIPAA-compliant media streams with integrated scheduling, prescriptions, and care records.',
 specs: ['End-to-End Encrypted Video', 'E-Prescription Integration', 'Multi-device Compatible'],
 icon: Smartphone
 },
 {
 id: '03',
 tag: 'AI Diagnostics',
 title: 'Clinical Intelligence',
 desc: 'AI-assisted diagnostic tools that augment clinical decision-making with predictive imaging analysis, lab result interpretation, and risk stratification for high-priority patient cases.',
 specs: ['Imaging Pattern Recognition', 'Risk Stratification', 'Predictive Readmission Alerts'],
 icon: Activity
 },
 {
 id: '04',
 tag: 'Data Security',
 title: 'Extreme Privacy',
 desc: 'Multi-layered encryption architecture exceeding global HIPAA & GDPR standards. Includes automated audit logging, breach detection, and data residency controls for sovereign health data.',
 specs: ['Zero-Knowledge Proofs', 'Automated Audit Logs', 'Data Residency Control'],
 icon: ShieldPlus
 }
];

const compliance = ['HIPAA', 'GDPR', 'ISO 13485', 'SOC 2', 'HL7 FHIR', 'FDA 21 CFR'];

const HealthTech = () => {
 const [activeSection, setActiveSection] = useState('01');

 useEffect(() => {
 const handleScroll = () => {
 solutions.forEach(s => {
 const el = document.getElementById(`section-${s.id}`);
 if (el) {
 const rect = el.getBoundingClientRect();
 if (rect.top <= 200 && rect.bottom >= 200) setActiveSection(s.id);
 }
 });
 };
 window.addEventListener('scroll', handleScroll);
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 const scrollTo = (id: string) => {
 document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
 };

 return (
 <div className="bg-[#fcfcfc] min-h-screen text-black">

 {/* METRICS BAR — First thing visible */}
 <div className="pt-[80px] bg-slate-900">
 <div className="container mx-auto px-6 lg:px-16">
 <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
 {[
 { value: '4.5B+', label: 'Global patients impacted by health tech' },
 { value: 'HIPAA', label: 'End-to-end data compliance standard' },
 { value: '< 50ms', label: 'Real-time diagnostics response time' },
 { value: '256-bit', label: 'AES encryption for all patient data' }
 ].map((m, i) => (
 <div key={i} className="py-10 px-8">
 <div className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2">{m.value}</div>
 <div className="text-xs font-bold uppercase tracking-widest text-white/50">{m.label}</div>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* MAIN BODY */}
 <div className="container mx-auto px-6 lg:px-16">
 <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-0">
 <div className="hidden lg:block border-r border-black/10">
 <div className="sticky top-[100px] py-20 pr-8 flex flex-col gap-1">
 <p className="text-xs font-black uppercase tracking-[0.4em] text-black/30 mb-6">Solutions Index</p>
 {solutions.map(s => (
 <button key={s.id} onClick={() => scrollTo(s.id)}
 className={`text-left py-3 text-xs font-black uppercase tracking-widest transition-all ${activeSection === s.id ? 'text-emerald-600' : 'text-black/25 hover:text-black/60'}`}>
 {s.id} — {s.title}
 </button>
 ))}
 </div>
 </div>

 <div className="pl-0 lg:pl-16">
 {solutions.map((s, i) => {
 const Icon = s.icon;
 return (
 <div key={s.id} id={`section-${s.id}`} className={`py-24 border-b ${i < solutions.length - 1 ? 'border-black/10' : 'border-transparent'}`}>
 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
 <div className="flex items-start gap-6 mb-10">
 <span className="text-[80px] font-black leading-none text-black/5 tracking-tighter select-none">{s.id}</span>
 <div className="pt-4">
 <p className="text-xs font-black uppercase tracking-[0.4em] text-emerald-600 mb-2">{s.tag}</p>
 <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black">{s.title}</h2>
 </div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16">
 <div>
 <p className="text-lg text-black/60 leading-relaxed mb-10">{s.desc}</p>
 <div className="space-y-4">
 {s.specs.map((spec, j) => (
 <div key={j} className="flex items-center gap-4 py-3 border-b border-black/5 last:border-0">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
 <span className="text-xs font-bold uppercase tracking-widest text-black/60">{spec}</span>
 </div>
 ))}
 </div>
 </div>
 <div className="bg-[#090A0C] rounded-[32px] aspect-square flex items-center justify-center">
 <Icon size={100} className="text-white opacity-10" strokeWidth={0.5} />
 </div>
 </div>
 </motion.div>
 </div>
 );
 })}
 </div>
 </div>
 </div>

 {/* COMPLIANCE */}
 <div className="border-t-2 border-slate-200 bg-slate-900 text-white">
 <div className="container mx-auto px-6 lg:px-16 py-20">
 <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-center">
 <div>
 <p className="text-xs font-black uppercase tracking-[0.5em] text-emerald-500 mb-4">Regulatory Coverage</p>
 <h3 className="text-4xl font-bold tracking-tighter">Compliance<br/>Standards</h3>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
 {compliance.map((c, i) => (
 <div key={i} className="flex items-center gap-3 p-5 border border-white/5 rounded-2xl">
 <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
 <span className="text-sm font-black uppercase tracking-widest text-white/60">{c}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* CTA */}
 <div className="bg-emerald-600 text-white py-24 text-center">
 <p className="text-sm font-black uppercase tracking-[0.6em] text-white/50 mb-6">Ready to Deploy</p>
 <h2 className="text-[50px] md:text-[70px] font-bold tracking-tighter leading-none mb-10">
 Digitizing the<br/><span className="text-white/40 italic">Care Cycle.</span>
 </h2>
 <a href="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-emerald-600 text-sm font-black uppercase tracking-widest rounded-full hover:bg-emerald-50 transition-all">
 Contact the Engineering Team <ArrowRight size={16} />
 </a>
 </div>
 </div>
 );
};

export default HealthTech;

