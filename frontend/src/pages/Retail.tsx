import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, BarChart2, Package, Users, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

const solutions = [
 {
 id: '01', tag: 'Commerce Engine', title: 'Unified Retail Platforms',
 desc: 'End-to-end commerce infrastructure unifying online, in-store, and mobile channels into a single operational backbone. Real-time inventory sync across thousands of SKUs and locations.',
 specs: ['Omnichannel Architecture', 'Real-time Inventory Sync', 'Multi-currency Checkout'], icon: ShoppingBag
 },
 {
 id: '02', tag: 'Intelligence', title: 'AI Personalization',
 desc: 'Machine learning recommendation engines that analyze behavioral signals to surface hyper-relevant products, increasing basket size and customer lifetime value with every interaction.',
 specs: ['Behavioral Signal Analysis', 'Dynamic Pricing Engine', 'Churn Prediction Models'], icon: BarChart2
 },
 {
 id: '03', tag: 'Logistics', title: 'Supply Chain Ops',
 desc: 'Real-time visibility into your entire supply chain from supplier to last-mile delivery. Predictive demand forecasting reduces overstock by up to 40% and ensures fulfillment SLA compliance.',
 specs: ['Demand Forecasting AI', 'Last-Mile Optimization', 'Supplier Portal Integration'], icon: Package
 },
 {
 id: '04', tag: 'Engagement', title: 'Customer Experience',
 desc: 'Unified customer data platforms that aggregate purchase history, preferences, and service interactions to deliver seamless, personalized experiences across every touchpoint.',
 specs: ['360° Customer Profiles', 'Loyalty Program Automation', 'Omnichannel Support Desk'], icon: Users
 }
];

const compliance = ['PCI-DSS', 'GDPR', 'CCPA', 'ISO 27001', 'SOC 2', 'ADA/WCAG'];

const Retail = () => {
 const [activeSection, setActiveSection] = useState('01');
 useEffect(() => {
 const handleScroll = () => {
 solutions.forEach(s => {
 const el = document.getElementById(`section-${s.id}`);
 if (el) { const rect = el.getBoundingClientRect(); if (rect.top <= 200 && rect.bottom >= 200) setActiveSection(s.id); }
 });
 };
 window.addEventListener('scroll', handleScroll);
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);
 const scrollTo = (id: string) => document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

 return (
 <div className="bg-[#fcfcfc] min-h-screen text-black">

 {/* METRICS BAR — First thing visible */}
 <div className="pt-[80px] bg-slate-900">
 <div className="container mx-auto px-6 lg:px-16">
 <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
 {[{ value: '$8.1T', label: 'Global retail e-commerce by 2026' }, { value: '< 1s', label: 'Target page load for max conversion' }, { value: '99.95%', label: 'Uptime on peak sale events' }, { value: '3x', label: 'Revenue lift with AI personalization' }].map((m, i) => (
 <div key={i} className="py-10 px-8">
 <div className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2">{m.value}</div>
 <div className="text-xs font-bold uppercase tracking-widest text-white/50">{m.label}</div>
 </div>
 ))}
 </div>
 </div>
 </div>

 <div className="container mx-auto px-6 lg:px-16">
 <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-0">
 <div className="hidden lg:block border-r border-black/10">
 <div className="sticky top-[100px] py-20 pr-8 flex flex-col gap-1">
 <p className="text-xs font-black uppercase tracking-[0.4em] text-black/30 mb-6">Solutions Index</p>
 {solutions.map(s => (<button key={s.id} onClick={() => scrollTo(s.id)} className={`text-left py-3 text-xs font-black uppercase tracking-widest transition-all ${activeSection === s.id ? 'text-orange-600' : 'text-black/25 hover:text-black/60'}`}>{s.id} — {s.title}</button>))}
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
 <p className="text-xs font-black uppercase tracking-[0.4em] text-orange-600 mb-2">{s.tag}</p>
 <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black">{s.title}</h2>
 </div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16">
 <div>
 <p className="text-lg text-black/60 leading-relaxed mb-10">{s.desc}</p>
 <div className="space-y-4">{s.specs.map((spec, j) => (<div key={j} className="flex items-center gap-4 py-3 border-b border-black/5 last:border-0"><div className="w-1.5 h-1.5 rounded-full bg-orange-600" /><span className="text-xs font-bold uppercase tracking-widest text-black/60">{spec}</span></div>))}</div>
 </div>
 <div className="bg-[#090A0C] rounded-[32px] aspect-square flex items-center justify-center"><Icon size={100} className="text-white opacity-10" strokeWidth={0.5} /></div>
 </div>
 </motion.div>
 </div>
 );
 })}
 </div>
 </div>
 </div>

 <div className="border-t-2 border-slate-200 bg-slate-900 text-white">
 <div className="container mx-auto px-6 lg:px-16 py-20">
 <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-center">
 <div><p className="text-xs font-black uppercase tracking-[0.5em] text-orange-500 mb-4">Compliance Standards</p><h3 className="text-4xl font-bold tracking-tighter">Commerce<br/>Certified</h3></div>
 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{compliance.map((c, i) => (<div key={i} className="flex items-center gap-3 p-5 border border-white/5 rounded-2xl"><CheckCircle2 size={14} className="text-orange-500 shrink-0" /><span className="text-sm font-black uppercase tracking-widest text-white/60">{c}</span></div>))}</div>
 </div>
 </div>
 </div>

 <div className="bg-orange-600 text-white py-24 text-center">
 <p className="text-sm font-black uppercase tracking-[0.6em] text-white/50 mb-6">Ready to Scale</p>
 <h2 className="text-[50px] md:text-[70px] font-bold tracking-tighter leading-none mb-10">Commerce at<br/><span className="text-white/40 italic">any scale.</span></h2>
 <a href="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-orange-600 text-sm font-black uppercase tracking-widest rounded-full hover:bg-orange-50 transition-all">Contact the Engineering Team <ArrowRight size={16} /></a>
 </div>
 </div>
 );
};

export default Retail;

