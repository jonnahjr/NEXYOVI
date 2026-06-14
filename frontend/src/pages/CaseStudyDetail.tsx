import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Terminal, ShieldAlert, Cpu, Activity, Clock, Zap } from 'lucide-react';
import FinalCTA from '../components/FinalCTA';
import futureCity from '../assets/future_city.png';


const caseStudies = {
 'global-bank-security': {
 title: 'Global Bank Security Overhaul',
 client: 'Pan-African Financial Institution',
 category: 'Cyber Security',
 heroImage: futureCity,
 color: '#06b6d4',
 bg: 'from-[#06b6d4]/20 to-transparent',
 overview: 'A major pan-African bank required a complete overhaul of its legacy security infrastructure to comply with new international banking regulations and protect against sophisticated state-sponsored cyber threats.',
 challenge: 'The institution was operating on fragmented legacy systems across 14 countries, leading to significant vulnerabilities, high latency in cross-border transactions, and compliance gaps. The threat vector was constantly expanding with an average of 5,000 intrusion attempts daily.',
 solution: 'Nexyovi deployed a bespoke zero-trust architecture, implementing multi-layer encryption protocols, biometric access controls for internal systems, and an AI-driven real-time threat detection engine deployed across 14 geographic nodes.',
 telemetry: [
  { label: 'Uptime', value: 'Enterprise-grade', icon: Activity },
 { label: 'Latency', value: '12ms', icon: Clock },
 { label: 'Nodes', value: '14 Active', icon: Zap }
 ],
 results: [
 'Enterprise-grade Security Uptime achieved across all geographic nodes.',
 'Zero successful breaches in the 18 months post-deployment.',
 'Reduced cross-border transaction latency by 40%.',
 'Full compliance with PCI-DSS and GDPR equivalent standards.'
 ]
 },
 'ai-smart-logistics': {
 title: 'AI Smart Logistics Engine',
 client: 'Top-tier Logistics Provider',
 category: 'Artificial Intelligence',
 heroImage: futureCity,
 color: '#10b981',
 bg: 'from-[#10b981]/20 to-transparent',
 overview: 'A leading logistics company struggling with rising fuel costs and inefficient routing needed a modernized, AI-driven approach to their global supply chain management system.',
 challenge: 'Manual routing and rigid legacy algorithms were unable to adapt to real-time traffic, weather changes, and fluctuating delivery volumes, causing significant delays, fuel waste, and reduced operational margins.',
 solution: 'We engineered a custom neural search engine and predictive AI model that dynamically recalculates optimal routes based on millions of real-time data points, including weather APIs, IoT sensors, and fleet telemetry.',
 telemetry: [
 { label: 'Model Accuracy', value: '98.5%', icon: Cpu },
 { label: 'IoT Sensors', value: '100k+', icon: Activity },
 { label: 'Processing', value: '<50ms', icon: Clock }
 ],
 results: [
 '35% overall boost in global fleet routing efficiency.',
 'Reduced fuel consumption by 22% annually.',
 'Improved on-time delivery rates from 84% to 98.5%.',
 'Automated dispatching reduced manual planning hours by 70%.'
 ]
 },
 'tele-psychiatry': {
  title: 'Tele-Psychiatry Platform',
  client: 'National Health Ministry',
  category: 'HealthTech & Cloud',
heroImage: futureCity,

  color: '#8b5cf6',
  bg: 'from-[#8b5cf6]/20 to-transparent',
  overview: 'The National Health Ministry needed a secure, HIPAA-compliant telehealth platform to connect patients with psychiatric specialists across the country, especially in remote areas with limited access to mental health care.',
  challenge: 'Existing solutions lacked the necessary security protocols for sensitive psychiatric data, suffered from poor video quality in low-bandwidth regions, and had no integrated scheduling or prescription management, leading to fragmented care and high no-show rates.',
  solution: 'Nexyovi engineered a custom, end-to-end encrypted telehealth platform optimized for low-bandwidth environments. We integrated automated scheduling, secure e-prescribing, and an AI-assisted triage system to prioritize urgent cases.',
  telemetry: [
   { label: 'Uptime', value: '99.99%', icon: Activity },
  { label: 'Patients', value: '50k+', icon: Activity },
  { label: 'Satisfaction', value: '95%', icon: CheckCircle2 }
  ],
  results: [
  'Facilitated over 50,000 secure, HIPAA-compliant consultations.',
  'Achieved a 95% patient satisfaction rating.',
  'Reduced appointment no-show rates by 40% through automated SMS reminders.',
  'Expanded specialist access to 12 previously underserved rural regions.'
  ]
  }
};

const CaseStudyDetail = () => {
 const { id } = useParams<{ id: string }>();
 const study = id ? caseStudies[id as keyof typeof caseStudies] : null;

 // Boot sequence simulation
 const [bootSequence, setBootSequence] = useState(0);
 useEffect(() => {
 const timer = setInterval(() => {
 setBootSequence(prev => (prev < 100 ? prev + 10 : 100));
 }, 50);
 return () => clearInterval(timer);
 }, []);

 if (!study) {
 return (    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center">
 <Terminal size={48} className="text-red-500 mb-6 opacity-50" />
 <h1 className="text-4xl font-black tracking-widest uppercase text-white/50 mb-4">Classified File Not Found</h1>
 <Link to="/projects" className="text-[#F5A800] hover:text-slate-900 uppercase font-bold tracking-widest text-xs transition-colors">
 Return to Database
 </Link>
 </div>
 );
 }

 return (    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-[#F5A800]/30 overflow-x-clip">
 
 {/* ── MASSIVE HERO HEADER ── */}      <section className="relative min-h-[80vh] flex flex-col justify-end pb-24 pt-40 border-b border-slate-200">
 {/* Background Image / Glow */}
 {study.heroImage && (
 <div className="absolute inset-0 z-0 overflow-hidden">
 <motion.div
 initial={{ scale: 1.1, opacity: 0 }}
 animate={{ scale: 1, opacity: 0.4 }}
 transition={{ duration: 1.5, ease: "easeOut" }}
 className="w-full h-full"
 >
 <img src={study.heroImage} alt={study.title} className="w-full h-full object-cover grayscale mix-blend-luminosity" />
 </motion.div>
 <div className={`absolute inset-0 bg-gradient-to-t ${study.bg} opacity-80 mix-blend-screen`} />
 <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/80 to-transparent" />
 
 {/* Tech grid */}
 <div className="absolute inset-0 opacity-[0.05]"
 style={{
 backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
 backgroundSize: '40px 40px',
 }} />
 </div>
 )}

 <div className="container relative z-10 mx-auto px-6 lg:px-12">
 
 <Link to="/projects" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors mb-16">
 <ArrowLeft size={12} /> Back to Mission Logs
 </Link>

 <div className="grid lg:grid-cols-12 gap-12 items-end">
 <div className="lg:col-span-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 >
 <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md mb-8">
 <div className="w-2 h-2 rounded-full animate-pulse " style={{ backgroundColor: study.color, color: study.color }} />                  <span className="text-xs font-black uppercase tracking-widest text-slate-700">{study.category}</span>
 </div>

 <h1 className="text-5xl md:text-7xl lg:text-[80px] font-black tracking-tighter leading-[0.95] mb-8">
 {study.title}
 </h1>                  <div className="flex flex-wrap items-center gap-8 text-sm font-medium text-slate-500">
 <div className="flex flex-col"> <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Client Entity</span>
                            <span className="text-slate-900">{study.client}</span>
 </div>
 <div className="w-px h-8 bg-slate-200" />
 <div className="flex flex-col"> <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</span>
                            <span className="text-slate-900 flex items-center gap-2"><CheckCircle2 size={14} style={{ color: study.color }}/> Deployed & Active</span>
 </div>
 </div>
 </motion.div>
 </div>

 {/* Boot Sequence HUD */}
 <div className="lg:col-span-4 lg:text-right hidden md:block">
 <div className="inline-flex flex-col items-end"> <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">Decryption Sequence</span>
                              <div className="text-4xl font-mono font-black text-slate-700 mb-2">{bootSequence}%</div>
                              <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
 <div className="h-full bg-white transition-all duration-75" style={{ width: `${bootSequence}%` }} />
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* ── MISSION CONTENT ── */}      <section className="py-24 bg-slate-50 border-t border-slate-200">
 <div className="container mx-auto px-6 lg:px-12">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
 
 {/* Main Narrative */}
 <motion.div 
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="lg:col-span-8 space-y-20"
 >
 <div className="space-y-6">
 <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-4">
 <span className="w-8 h-px bg-slate-300" /> 01 // Overview
 </h2>
 <p className="text-slate-500 text-xl md:text-2xl leading-relaxed font-medium">
 {study.overview}
 </p>
 </div>
 
 <div className="space-y-6">
 <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-4">
 <span className="w-8 h-px bg-slate-300" /> 02 // The Threat Vector
 </h2>
 <p className="text-slate-500 text-lg leading-relaxed border-l-2 pl-6" style={{ borderColor: `${study.color}40` }}>
 {study.challenge}
 </p>
 </div>

 <div className="space-y-6">
 <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-4">
 <span className="w-8 h-px bg-slate-300" /> 03 // Our Architecture
 </h2>
 <div className="p-8 rounded-[24px] bg-white border border-slate-200 relative overflow-hidden group">
 <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${study.bg}`} />
 <p className="text-slate-500 text-lg leading-relaxed relative z-10">
 {study.solution}
 </p>
 </div>
 </div>
 </motion.div>

 {/* Sticky Sidebar HUD */}
 <motion.div 
 initial={{ opacity: 0, x: 20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="lg:col-span-4"
 >
 <div className="sticky top-32 space-y-8">
 
 {/* Live Telemetry Panel */}
 <div className="card-hud p-8 relative overflow-hidden">
 <div className="absolute inset-0 bg-black/40 z-0" />
 <div className="relative z-10">
 <div className="flex items-center gap-3 mb-8">
 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
 <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Live Telemetry</span>
 </div>
 
 <div className="space-y-6">
 {study.telemetry.map((t, i) => (
 <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4">
 <div className="flex items-center gap-3 text-[#9CA3AF]">
 <t.icon size={16} />
 <span className="text-xs font-bold uppercase tracking-widest">{t.label}</span>
 </div>
 <span className="font-mono text-white font-bold">{t.value}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Execution Results Panel */}
 <div className="card-hud p-8">
 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 dark:text-white/60 mb-8 border-b border-white/10 pb-4">Execution Results</h3>
 <ul className="space-y-6">
 {study.results.map((result, idx) => (
 <li key={idx} className="flex items-start gap-4">
 <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: study.color }} />
 <span className="text-[#D1D5DB] text-sm leading-relaxed font-medium">{result}</span>
 </li>
 ))}
 </ul>
 </div>

 </div>
 </motion.div>

 </div>
 </div>
 </section>
 
 <FinalCTA />
 </div>
 );
};

export default CaseStudyDetail;
