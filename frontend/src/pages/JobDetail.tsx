import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
 ArrowLeft, MapPin, Briefcase, Clock, CheckCircle2, 
 Upload, Send, Monitor, Shield, Zap, Globe2, Mail, X 
} from 'lucide-react';
import Navbar from '../components/Navbar';


import { useSite } from '../context/SiteContext';

const JobDetail = () => {
 const { jobs } = useSite();
 const { id } = useParams();
 const job = jobs.find(j => j.id === id);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);

 useEffect(() => {
 window.scrollTo(0, 0);
 }, []);

 if (!job) return <div>Job not found</div>;

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);
 setTimeout(() => {
 setIsSubmitting(false);
 setIsSuccess(true);
 }, 2000);
 };

 return (
 <div className="bg-[#FDFCF8] text-[#1A1A1A] min-h-screen font-sans selection:bg-yellow-500/30">
 <Navbar />

 {/* ── HERO SECTION (BLACK) ── */}
 <section className="bg-[#080A0D] pt-40 pb-24 relative overflow-hidden">
 <div className="absolute inset-0 opacity-10 pointer-events-none">
 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
 </div>

 <div className="container mx-auto px-6 lg:px-24 relative z-10">
 <Link 
 to="/careers" 
 className="inline-flex items-center gap-3 text-yellow-500 text-xs font-black uppercase tracking-[0.3em] mb-12 hover:gap-5 transition-all"
 >
 <ArrowLeft size={14} /> Back to Open Positions
 </Link>

 <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
 <div className="max-w-4xl">
 <div className="flex items-center gap-4 mb-6">
 <span className="px-4 py-1.5 bg-yellow-500/10 text-yellow-500 text-xs font-black uppercase tracking-widest rounded-full border border-yellow-500/20">
 {job.dept}
 </span>
 <span className="text-white/40 text-xs font-black uppercase tracking-widest">
 Registry ID: {job.id}
 </span>
 </div>
 <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.9]">
 {job.title}
 </h1>
 <div className="flex flex-wrap items-center gap-8 mt-12 text-white/40 text-sm font-bold uppercase tracking-widest">
 <div className="flex items-center gap-3">
 <MapPin size={18} className="text-yellow-500" />
 {job.location}
 </div>
 <div className="flex items-center gap-3">
 <Briefcase size={18} className="text-yellow-500" />
 {job.type}
 </div>
 <div className="flex items-center gap-3">
 <Clock size={18} className="text-yellow-500" />
 Posted 2 days ago
 </div>
 </div>
 </div>
 <button 
 onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
 className="px-12 py-6 bg-yellow-500 text-black text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all /20 whitespace-nowrap"
 >
 Apply For This Role
 </button>
 </div>
 </div>
 </section>

 {/* ── THE MISSION (CREAMY) ── */}
 <section className="py-32 bg-[#FDFCF8]">
 <div className="container mx-auto px-6 lg:px-24">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
 <div className="lg:col-span-8">
 <h2 className="text-yellow-600 text-xs font-black uppercase tracking-[0.4em] mb-8">The Mission</h2>
 <p className="text-2xl md:text-3xl font-bold leading-tight text-[#1A1A1A] mb-12">
 {job.desc}
 </p>
 
 <div className="space-y-16 mt-20">
 <div>
 <h4 className="text-xl font-black text-[#1A1A1A] uppercase tracking-tighter mb-8 flex items-center gap-4">
 <div className="w-8 h-[2px] bg-yellow-500" /> Key Responsibilities
 </h4>
 <ul className="grid grid-cols-1 md:grid-cols-1 gap-6">
 {job.responsibilities.map((r, i) => (
 <li key={i} className="flex gap-6 p-6 bg-white rounded-3xl border border-black/5 group hover:border-yellow-500/20 transition-all">
 <div className="w-10 h-10 rounded-2xl bg-yellow-500/5 flex items-center justify-center text-yellow-600 font-black shrink-0">
 0{i + 1}
 </div>
 <span className="text-black/60 text-base leading-relaxed group-hover:text-black transition-colors">{r}</span>
 </li>
 ))}
 </ul>
 </div>

 <div>
 <h4 className="text-xl font-black text-[#1A1A1A] uppercase tracking-tighter mb-8 flex items-center gap-4">
 <div className="w-8 h-[2px] bg-yellow-500" /> Technical Requirements
 </h4>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {job.requirements.map((req, i) => (
 <div key={i} className="flex items-center gap-4 p-6 bg-[#080A0D] rounded-3xl group">
 <CheckCircle2 size={20} className="text-yellow-500 shrink-0" />
 <span className="text-white/60 text-[13px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">{req}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>

 <div className="lg:col-span-4">
 <div className="sticky top-40 bg-white rounded-[40px] p-10 border border-black/5 /5">
 <h4 className="text-xs font-black uppercase tracking-[0.3em] text-black/20 mb-8">At a Glance</h4>
 <div className="space-y-8">
 <div className="flex items-center justify-between">
 <span className="text-sm font-bold uppercase text-black/40">Equity</span>
 <span className="text-xs font-black uppercase">0.1% - 0.5%</span>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-sm font-bold uppercase text-black/40">Bonus</span>
 <span className="text-xs font-black uppercase">Performance Based</span>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-sm font-bold uppercase text-black/40">Hardware</span>
 <span className="text-xs font-black uppercase">Pro Workstation</span>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-sm font-bold uppercase text-black/40">Vacation</span>
 <span className="text-xs font-black uppercase">Unlimited PTO</span>
 </div>
 </div>
 <div className="mt-12 pt-8 border-t border-black/5">
 <div className="text-xs font-black text-yellow-600 uppercase tracking-widest mb-4">Hiring Manager</div>
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-2xl bg-black/5 overflow-hidden">
 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
 </div>
 <div>
 <div className="text-sm font-black uppercase">Marcus Thorne</div>
 <div className="text-xs font-bold text-black/40 uppercase">VP Engineering</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* ── APPLICATION FORM (BLACK) ── */}
 <section id="apply-form" className="py-32 bg-[#080A0D] border-t border-white/5">
 <div className="container mx-auto px-6 lg:px-24">
 <div className="max-w-4xl mx-auto">
 <div className="text-center mb-20">
 <div className="text-yellow-500 text-xs font-black uppercase tracking-[0.5em] mb-6">Apply Now</div>
 <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
 Join the <span className="text-yellow-500 italic">Network.</span>
 </h2>
 </div>

 <AnimatePresence mode="wait">
 {!isSuccess ? (
 <motion.form 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.95 }}
 onSubmit={handleSubmit}
 className="grid grid-cols-1 md:grid-cols-2 gap-8"
 >
 <div className="space-y-2">
 <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-4">Full Name</label>
 <input 
 required
 type="text" 
 placeholder="John Doe" 
 className="w-full h-16 px-8 bg-white/5 border border-white/10 rounded-3xl text-white focus:border-yellow-500 outline-none transition-all placeholder:text-white/10 font-bold"
 />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-4">Email Address</label>
 <input 
 required
 type="email" 
 placeholder="john@example.com" 
 className="w-full h-16 px-8 bg-white/5 border border-white/10 rounded-3xl text-white focus:border-yellow-500 outline-none transition-all placeholder:text-white/10 font-bold"
 />
 </div>
 <div className="md:col-span-2 space-y-2">
 <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-4">Portfolio / LinkedIn / GitHub</label>
 <input 
 required
 type="text" 
 placeholder="https://..." 
 className="w-full h-16 px-8 bg-white/5 border border-white/10 rounded-3xl text-white focus:border-yellow-500 outline-none transition-all placeholder:text-white/10 font-bold"
 />
 </div>
 <div className="md:col-span-2">
 <div className="w-full p-12 bg-white/[0.02] border-2 border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center group hover:border-yellow-500/30 transition-all cursor-pointer">
 <Upload className="text-white/40 mb-4 group-hover:text-yellow-500 transition-colors" size={40} />
 <div className="text-sm font-black text-white uppercase tracking-widest">Upload your Resume</div>
 <div className="text-xs font-bold text-white/40 uppercase tracking-widest mt-2">PDF, DOCX (Max 5MB)</div>
 <input type="file" className="hidden" />
 </div>
 </div>
 <div className="md:col-span-2 pt-8">
 <button 
 disabled={isSubmitting}
 type="submit"
 className="w-full py-6 bg-yellow-500 text-black text-xs font-black uppercase tracking-[0.3em] rounded-full hover:bg-white transition-all /20 flex items-center justify-center gap-4 disabled:opacity-50"
 >
 {isSubmitting ? (
 <>
 <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
 <Zap size={18} />
 </motion.div>
 Deploying Application...
 </>
 ) : (
 <>
 Submit Application <Send size={16} />
 </>
 )}
 </button>
 </div>
 </motion.form>
 ) : (
 <motion.div 
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="bg-yellow-500 p-16 rounded-[60px] text-center"
 >
 <div className="w-24 h-24 rounded-full bg-black/10 flex items-center justify-center mx-auto mb-8">
 <CheckCircle2 size={48} className="text-black" />
 </div>
 <h3 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter mb-4">Application Deployed</h3>
 <p className="text-black/60 text-lg font-medium max-w-md mx-auto">
 Your technical dossier has been sent to our engineering leadership. We'll be in touch soon.
 </p>
 <button 
 onClick={() => setIsSuccess(false)}
 className="mt-12 px-10 py-4 bg-black text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all"
 >
 Send Another Response
 </button>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </div>
 </section>


 </div>
 );
};

export default JobDetail;

