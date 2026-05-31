import { motion } from 'framer-motion';
import { Award, ChevronRight, Linkedin } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { cardReveal, fadeUp, staggerContainerSlow, viewport } from '../lib/animations';

const expandedProfiles = [
 {
 id: '1',
 certs: ['MBA – Strategic Leadership', 'AWS Certified Solutions Architect', 'Google Cloud Professional'],
 specializations: ['Business Strategy', 'AI-Driven Products', 'Enterprise Scale-Up'],
 experience: '12+ years',
 linkedin: 'https://linkedin.com',
 },
 {
 id: '2',
 certs: ['AWS Solutions Architect Pro', 'Google Cloud Professional'],
 specializations: ['Distributed Systems', 'Cloud Architecture', 'AI/ML Infrastructure'],
 experience: '10+ years',
 linkedin: 'https://linkedin.com',
 },
 {
 id: '3',
 certs: ['CISSP – Security Professional', 'Certified Scrum Master'],
 specializations: ['Secure Software Design', 'System Architecture', 'DevSecOps'],
 experience: '9+ years',
 linkedin: 'https://linkedin.com',
 },

 // ── Ethiopian Cybersecurity Lead ──
 {
 id: '4',
 certs: ['CISSP', 'CEH – Ethical Hacker', 'CompTIA Security+'],
 specializations: ['Threat Intelligence', 'Zero-Trust Architecture', 'Ethiopian Cyber Landscape'],
 experience: '8+ years',
 linkedin: 'https://linkedin.com',
 },

 // ── Ethiopian Engineering Team ──
 {
 id: '5',
 certs: ['AWS Developer Associate', 'Node.js Certified Developer'],
 specializations: ['Full-Stack Architecture', 'React/Next.js', 'Distributed Systems'],
 experience: '7+ years',
 linkedin: 'https://linkedin.com',
 },
 {
 id: '6',
 certs: ['Meta Frontend Developer', 'Google UX Design'],
 specializations: ['React/TypeScript', 'UI Component Systems', 'Performance Optimization'],
 experience: '6+ years',
 linkedin: 'https://linkedin.com',
 },
 {
 id: '7',
 certs: ['TensorFlow Developer', 'AWS Machine Learning Specialty'],
 specializations: ['Natural Language Processing', 'Computer Vision', 'LLM Fine-Tuning'],
 experience: '5+ years',
 linkedin: 'https://linkedin.com',
 },
 {
 id: '8',
 certs: ['CKA – Kubernetes Admin', 'HashiCorp Terraform Associate'],
 specializations: ['CI/CD Automation', 'Kubernetes', 'Multi-Cloud Architecture'],
 experience: '7+ years',
 linkedin: 'https://linkedin.com',
 },
 {
 id: '9',
 certs: ['Golang Developer Certified', 'MongoDB Associate DBA'],
 specializations: ['Microservices Design', 'Event-Driven Systems', 'API Development'],
 experience: '5+ years',
 linkedin: 'https://linkedin.com',
 },
 {
 id: '10',
 certs: ['OSCP – Pen Testing', 'AWS Security Specialty'],
 specializations: ['Penetration Testing', 'Compliance Audits', 'Incident Response'],
 experience: '6+ years',
 linkedin: 'https://linkedin.com',
 },
  {
   id: '11',
   certs: ['React Native Certified', 'Flutter Developer'],
   specializations: ['Cross-Platform Dev', 'Mobile UI/UX', 'App Performance'],
   experience: '4+ years',
   linkedin: 'https://linkedin.com',
  },
  {
   id: '12',
   certs: ['Python for Data Science', 'Tableau Desktop Specialist', 'SQL Advanced'],
   specializations: ['Data Visualization', 'Business Intelligence', 'ETL Pipelines'],
   experience: '3+ years',
   linkedin: 'https://linkedin.com',
  },
  {
   id: '13',
   certs: ['OSCP – Pen Testing', 'CEH – Ethical Hacker', 'CompTIA Security+'],
   specializations: ['Vulnerability Assessment', 'Cloud Security', 'Incident Response'],
   experience: '5+ years',
   linkedin: 'https://linkedin.com',
  },
  {
   id: '14',
   certs: ['AWS Developer Associate', 'Node.js Certified Developer'],
   specializations: ['API Design', 'Serverless Architecture', 'Database Optimization'],
   experience: '4+ years',
   linkedin: 'https://linkedin.com',
  },
  {
   id: '15',
   certs: ['ISTQB Certified Tester', 'Selenium WebDriver', 'JMeter'],
   specializations: ['Test Automation', 'Performance Testing', 'CI/CD Quality Gates'],
   experience: '3+ years',
   linkedin: 'https://linkedin.com',
  }];

const CompanyLeadership = () => {
 const { team } = useSite();

 return (
 <section id="leadership" className="py-32 bg-[#02040a] border-t border-white/[0.05] relative overflow-hidden">

 {/* Glow */}
 <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#F5A800]/5 blur-[140px] rounded-full pointer-events-none" />
 <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8b5cf6]/5 blur-[120px] rounded-full pointer-events-none" />

 <div className="container relative z-10">

 {/* Header */}
 <motion.div
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={viewport}
 className="mb-20 flex flex-col items-center text-center"
 >
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
 <span className="text-[11px] font-bold text-white/60 uppercase tracking-[0.2em]">The People</span>
 </div>
 <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-none text-white mb-5">
 Meet Our <span className="text-white/40">Leadership</span>
 </h2>
 <p className="text-white/50 text-lg max-w-xl font-medium">
 Seasoned experts who've built, scaled, and secured systems across two continents.
 </p>
 </motion.div>

 {/* Grid */}
 <motion.div
 variants={staggerContainerSlow}
 initial="hidden"
 whileInView="visible"
 viewport={viewport}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
 >
 {team.map((member, i) => {
 const profile = expandedProfiles.find(p => p.id === member.id) || expandedProfiles[i % expandedProfiles.length];
 return (
 <motion.div
 key={i}
 variants={cardReveal}
 className="group relative card-hud p-0 overflow-hidden flex flex-col hover:border-white/20 transition-all duration-500"
 >
 {/* Photo */}
 <div className="relative aspect-[4/3] overflow-hidden m-2 rounded-[16px]">
 <img
 src={member.img}
 alt={member.name}
 className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 scale-100 group-hover:scale-[1.04] transition-all duration-700"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80" />

 {/* LinkedIn */}
 <a
 href={profile.linkedin}
 target="_blank"
 rel="noopener noreferrer"
 onClick={e => e.stopPropagation()}
 className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
 >
 <Linkedin size={13} />
 </a>
 </div>

 {/* Info */}
 <div className="p-6 flex flex-col flex-1 relative z-10">
 <div className="mb-4">
 <h3 className="text-xl font-black text-white tracking-tight mb-1">{member.name}</h3>
 <div className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">{member.role}</div>
 </div>

 <p className="text-white/40 text-xs leading-relaxed mb-6 flex-1 font-medium">{member.bio}</p>

 {/* Experience */}
 <div className="flex items-center gap-2 mb-6">
 <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] " />
 <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{profile.experience} experience</span>
 </div>

 {/* Specializations */}
 <div className="mb-6">
 <div className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-3">Specializations</div>
 <div className="flex flex-wrap gap-1.5">
 {profile.specializations.map((s, j) => (
 <span key={j} className="px-2 py-1 bg-white/[0.03] text-white/60 text-[9px] font-bold rounded-full border border-white/10">
 {s}
 </span>
 ))}
 </div>
 </div>

 {/* Certs */}
 <div className="pt-4 border-t border-white/[0.05]">
 <div className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-3 flex items-center gap-1.5">
 <Award size={10} className="text-white/50" /> Certifications
 </div>
 <div className="space-y-2">
 {profile.certs.map((c, j) => (
 <div key={j} className="flex items-start gap-2">
 <ChevronRight size={10} className="text-white/40 shrink-0 mt-0.5" />
 <span className="text-white/40 text-[10px] font-medium leading-snug">{c}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </motion.div>
 );
 })}
 </motion.div>
 </div>
 </section>
 );
};

export default CompanyLeadership;
