import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, Map, BarChart2, Users, ShieldCheck, RefreshCw, BookOpen, TrendingUp } from 'lucide-react';
import { staggerContainer, revealUp } from '../lib/animations';

export default function ITConsultingService() {
 return (
 <>
 {/* ── HERO ── */}
 <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04]">
 <div className="absolute inset-0 z-0 pointer-events-none">
 <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-[#f59e0b]/10 blur-[120px] rounded-full mix-blend-screen" />
 <div className="absolute inset-0 opacity-[0.03]"
 style={{
 backgroundImage: `linear-gradient(rgba(245,158,11,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.6) 1px, transparent 1px)`,
 backgroundSize: '40px 40px',
 }} />
 </div>

 <div className="container relative z-10">
 <motion.div
 variants={staggerContainer}
 initial="hidden"
 animate="visible"
 className="flex flex-col items-center text-center max-w-4xl mx-auto"
 >
 <motion.div variants={revealUp} className="mb-8">
 <div className="badge w-fit !bg-[#f59e0b]/10 !border-[#f59e0b]/30 !text-[#fbbf24]">
 <Lightbulb size={12} />
 IT Consulting
 </div>
 </motion.div>

 <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[0.95] tracking-tight mb-8">
 Strategic Technology<br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]">Advisory.</span>
 </motion.h1>

 <motion.p variants={revealUp} className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
 We help businesses make smarter technology decisions — from digital transformation roadmaps to architecture reviews and engineering advisory.
 </motion.p>

 <motion.div variants={revealUp}>
 <Link to="/contact" className="btn-primary group !bg-[#f59e0b]/20 !border-[#f59e0b]/40 hover:!bg-[#f59e0b]/30 !text-white">
 Book a Strategy Session
 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
 </Link>
 </motion.div>
 </motion.div>
 </div>
 </section>

 {/* ── CORE CAPABILITIES ── */}
 <section className="py-24 bg-slate-50">
 <div className="container mx-auto px-6 lg:px-12">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {[
 { t: 'Technology Strategy', d: 'Define your multi-year technology roadmap — aligning engineering investments with business objectives and market demands.', i: Map },
 { t: 'Digital Transformation', d: 'Guide your organization from legacy systems to modern, cloud-native, data-driven operations with minimal disruption.', i: RefreshCw },
 { t: 'Architecture Reviews', d: 'Uncover bottlenecks, security gaps, and scaling risks in your current systems before they become costly problems.', i: BookOpen },
 { t: 'Engineering Advisory', d: 'Embedded senior engineering guidance for your internal teams — code reviews, process improvements, and technical leadership.', i: Users },
 { t: 'Vendor Selection', d: 'Unbiased evaluation of technology vendors, platforms, and tools to ensure the right fit for your requirements and budget.', i: ShieldCheck },
 { t: 'Growth & Scaling Plans', d: 'Prepare your technology stack for the next stage of growth — whether that is 10x traffic, new markets, or new product lines.', i: TrendingUp }].map(({ t, d, i: Icon }) => (
 <motion.div
 key={t}
 initial={{ opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-60px' }}
 transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
 className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#f59e0b]/30 hover:shadow-md transition-all duration-300"
 >
 <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center mb-6">
 <Icon size={22} className="text-[#d97706]" />
 </div>
 <h3 className="text-slate-900 font-black text-lg mb-3">{t}</h3>
 <p className="text-slate-500 text-[14px] leading-relaxed">{d}</p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* ── WHY CONSULTING ── */}
 <section className="py-24 bg-white border-t border-slate-200">
 <div className="container">
 <div className="max-w-3xl mx-auto text-center mb-16">
 <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Why work with our advisors?</h2>
 <p className="text-slate-500 text-lg">Our consultants are active engineers — not slide-deck theorists. Every recommendation comes backed by hands-on implementation experience.</p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
 {[
 { stat: '50+', label: 'Projects Delivered', sub: 'across Ethiopia & beyond' },
 { stat: '8', label: 'Technical Disciplines', sub: 'under one roof' },
 { stat: '100%', label: 'Actionable Output', sub: 'no fluff, only results' }].map(({ stat, label, sub }) => (
 <div key={label} className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-200">
 <div className="text-5xl font-black text-[#d97706] mb-2">{stat}</div>
 <div className="text-slate-900 font-bold text-lg mb-1">{label}</div>
 <div className="text-slate-500 text-sm">{sub}</div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── CTA ── */}
 <section className="py-24 bg-slate-50 border-t border-slate-200">
 <div className="container text-center">
 <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Let's talk strategy.</h2>
 <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto">Book a free 30-minute consultation with one of our senior engineers.</p>
 <Link to="/contact" className="btn-3d-amber">Schedule a Call <ArrowRight size={14} /></Link>
 </div>
 </section>
 </>
 );
}
