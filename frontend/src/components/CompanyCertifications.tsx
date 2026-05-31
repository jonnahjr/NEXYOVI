import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const certs = [
 {
 name: 'ISO 27001',
 desc: 'Information Security Management',
 status: 'In Progress',
 },
 {
 name: 'SOC 2 Type II',
 desc: 'Security & Availability Controls',
 status: 'In Progress',
 },
 {
 name: 'GDPR',
 desc: 'EU Data Protection Regulation',
 status: 'Compliant',
 },
 {
 name: 'HIPAA',
 desc: 'Healthcare Data Security Standards',
 status: 'Compliant',
 },
 {
 name: 'AWS Partner',
 desc: 'Amazon Web Services Technology Partner',
 status: 'In Progress',
 },
 {
 name: 'Microsoft Partner',
 desc: 'Microsoft Cloud Solution Partner',
 status: 'In Progress',
 }];

const fadeUp = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0 }
};

const CompanyCertifications = () => {
 return (
 <section className="bg-[#02040a] py-32 border-t border-white/[0.05] relative overflow-hidden">
 {/* Ambient glow */}
 <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#F5A800]/5 blur-[100px] rounded-full pointer-events-none" />

 <div className="container mx-auto px-6 lg:px-12 relative z-10">

 {/* Header */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={fadeUp}
 className="mb-16 max-w-3xl"
 >
 <div className="text-[#F5A800] text-xs font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-4">
 <div className="w-10 h-px bg-[#F5A800]" />
 Trust & Compliance
 </div>
 <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-4">
 Certifications & Standards
 </h2>
 <p className="text-[#9CA3AF] text-lg font-medium leading-relaxed">
 We hold ourselves to the highest standards of security, privacy, and compliance — because your data and your clients deserve nothing less.
 </p>
 </motion.div>

 {/* Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {certs.map((cert, i) => (
 <motion.div
 key={i}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={{
 hidden: { opacity: 0, scale: 0.95, y: 20 },
 visible: { opacity: 1, scale: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }
 }}
 className="group p-6 rounded-[24px] bg-[#111827] border border-white/5 hover:border-[#F5A800]/40 transition-all duration-500 "
 >
 <div className="flex items-start justify-between mb-4">
 <div className="w-11 h-11 rounded-2xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center text-[#F5A800] group-hover:bg-[#F5A800] group-hover:text-white transition-all duration-500">
 <ShieldCheck size={20} />
 </div>
 <span
 className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${cert.status === 'Compliant'
 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
 : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
 }`}
 >
 {cert.status}
 </span>
 </div>

 <h3 className="text-lg font-black text-white mb-1 group-hover:text-[#F5A800] transition-colors">{cert.name}</h3>
 <p className="text-[#9CA3AF] text-sm font-medium">{cert.desc}</p>
 </motion.div>
 ))}
 </div>

 {/* Bottom note */}
 <motion.p
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={fadeUp}
 className="mt-10 text-center text-[#6B7280] text-xs font-medium"
 >
 Certifications marked "In Progress" are actively being pursued. Our architecture and practices already align with their requirements.
 </motion.p>
 </div>
 </section>
 );
};

export default CompanyCertifications;
