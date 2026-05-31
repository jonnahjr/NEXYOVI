import { motion } from 'framer-motion';
import { CheckCircle2, FileText, Lock, Server, ShieldCheck } from 'lucide-react';

const TrustCenter = () => {
 return (
 <div className="bg-slate-50 min-h-screen pt-32 pb-24">
 {/* Hero Section */}
 <section className="relative px-6 mb-20 overflow-hidden">
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#F5A800]/10 blur-[120px] rounded-full pointer-events-none" />

 <div className="container mx-auto max-w-4xl text-center relative z-10">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200"
 >
 <ShieldCheck size={14} className="text-[#F5A800]" />
 <span className="text-slate-600 text-xs font-black uppercase tracking-widest">Nexyovi Trust Center</span>
 </motion.div>

 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter mb-6"
 >
 Security is not a feature. <br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">It's our foundation.</span>
 </motion.h1>

 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-500 text-lg max-w-2xl mx-auto"
 >
 Learn about our security practices, compliance certifications, and how we protect your enterprise data across global regions.
 </motion.p>
 </div>
 </section>

 {/* Trust Pillars */}
 <section className="container mx-auto px-6 max-w-5xl mb-24">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {[
 {
 icon: Lock,
 title: "Data Protection",
 desc: "Enterprise-grade AES-256 encryption at rest and TLS 1.3 in transit. Zero-trust architecture deployed across all environments."
 },
 {
 icon: Server,
 title: "Infrastructure",
 desc: "High-availability multi-region deployments with enterprise-grade SLA. DDoS protection and automated threat mitigation."
 },
 {
 icon: FileText,
 title: "Compliance",
 desc: "Aligned with GDPR, HIPAA, and SOC2 standards. Regular third-party audits and continuous compliance monitoring."
 }
 ].map((pillar, i) => {
 const Icon = pillar.icon;
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 + (i * 0.1) }}
 className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#F5A800]/30 transition-all hover:shadow-md"
 >
 <div className="w-12 h-12 rounded-xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center text-[#F5A800] mb-6">
 <Icon size={24} />
 </div>
 <h3 className="text-xl font-black text-slate-950 mb-3">{pillar.title}</h3>
 <p className="text-slate-500 text-sm leading-relaxed">{pillar.desc}</p>
 </motion.div>
 );
 })}
 </div>
 </section>

 {/* Policies List */}
 <section className="container mx-auto px-6 max-w-3xl">
 <div className="text-[#F5A800] text-xs font-black uppercase tracking-[0.4em] mb-4">Legal & Policies</div>
 <h2 className="text-3xl font-black text-slate-950 mb-8">Official Documentation</h2>

 <div className="space-y-4">
 {[
 "Privacy Policy",
 "Terms of Service",
 "Service Level Agreement (SLA)",
 "Data Processing Agreement (DPA)",
 "Acceptable Use Policy",
 "Cookie Policy"
 ].map((doc, i) => (
 <a
 key={i}
 href="#"
 className="group flex items-center justify-between p-5 rounded-xl bg-white border border-slate-200 hover:border-[#F5A800]/30 hover:shadow-md transition-all"
 >
 <div className="flex items-center gap-4">
 <CheckCircle2 size={18} className="text-[#F5A800]" />
 <span className="text-white font-medium">{doc}</span>
 </div>
 <span className="text-[#FFD166] text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Read</span>
 </a>
 ))}
 </div>
 </section>
 </div>
 );
};

export default TrustCenter;
