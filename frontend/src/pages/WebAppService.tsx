import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, LayoutDashboard, ShieldCheck, Zap, Users, Code2, Server, MonitorSmartphone } from 'lucide-react';
import { staggerContainer, EASE_EXPO, revealUp } from '../lib/animations';

export default function WebAppService() {
 return (
 <>
 {/* ── HERO ── */}
 <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04]">
 <div className="absolute inset-0 z-0 pointer-events-none">
 <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-[#0ea5e9]/10 blur-[120px] rounded-full mix-blend-screen" />
 <div className="absolute inset-0 opacity-[0.03]"
 style={{
 backgroundImage: `linear-gradient(rgba(14,165,233,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.6) 1px, transparent 1px)`,
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
 <div className="badge w-fit !bg-[#0ea5e9]/10 !border-[#0ea5e9]/30 !text-[#38bdf8]">
 <Globe size={12} />
 Web Applications
 </div>
 </motion.div>

 <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[0.95] tracking-tight mb-8">
 Scalable Web<br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9]">Platforms.</span>
 </motion.h1>

 <motion.p variants={revealUp} className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
 We build enterprise-grade web platforms, SaaS products, customer portals, and internal dashboards engineered for performance and reliability.
 </motion.p>

 <motion.div variants={revealUp}>
              <Link to="/contact" className="group btn-cyan text-[14px] px-8 py-4">
                <span className="relative z-10">Start Your Web Project</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
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
 { t: 'SaaS Products', d: 'Multi-tenant SaaS platforms with subscription management, role-based access, and enterprise security built in.', i: Server },
 { t: 'Customer Portals', d: 'Self-service portals that reduce support load and give clients real-time access to their data, invoices, and tickets.', i: Users },
 { t: 'Enterprise Dashboards', d: 'Operational command centers — custom analytics dashboards, BI tools, and admin panels for decision makers.', i: LayoutDashboard },
 { t: 'Progressive Web Apps', d: 'Offline-capable, installable PWAs that deliver native-like experiences across all devices and browsers.', i: MonitorSmartphone },
 { t: 'API-First Architectures', d: 'Headless frontends backed by robust REST and GraphQL APIs for maximum flexibility and third-party integrations.', i: Code2 },
 { t: 'Performance Engineering', d: 'Core Web Vitals optimization, CDN setup, SSR/SSG strategies, and sub-100ms load times at global scale.', i: Zap }].map(({ t, d, i: Icon }) => (
 <motion.div
 key={t}
 initial={{ opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-60px' }}
 transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
 className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#0ea5e9]/30 hover:shadow-md transition-all duration-300"
 >
 <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 flex items-center justify-center mb-6">
 <Icon size={22} className="text-[#0284c7]" />
 </div>
 <h3 className="text-slate-900 font-black text-lg mb-3">{t}</h3>
 <p className="text-slate-500 text-[14px] leading-relaxed">{d}</p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* ── CTA ── */}
 <section className="py-24 bg-white border-t border-slate-200">
 <div className="container text-center">
 <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Ready to build your web platform?</h2>
 <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto">Let's turn your requirements into a scalable, secure, and beautiful web application.</p>
            <Link to="/contact" className="group btn-dark text-[15px] px-10 py-5 mt-10">
              <span className="relative z-10">Get a Free Consultation</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
 </div>
 </section>
 </>
 );
}
