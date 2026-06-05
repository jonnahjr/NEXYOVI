import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
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

const LEADERSHIP_IDS = new Set(['1', '2', '3', '16']);

const CompanyLeadership = () => {
  const { team } = useSite();

  const leaders = team.filter(m => LEADERSHIP_IDS.has(m.id));
  const engineers = team.filter(m => !LEADERSHIP_IDS.has(m.id));

  const MemberCard = ({ member, i, profile }: { member: any; i: number; profile: any }) => {
    const hasPhoto = !!member.img;
    return (
      <motion.div
        key={i}
        variants={cardReveal}
        className="group flex flex-col bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 rounded-2xl overflow-hidden flex-1 min-w-0"
      >
        {/* Avatar */}
        <div className="relative aspect-[4/3] overflow-hidden mx-3 mt-3 rounded-xl">
          {hasPhoto ? (
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 scale-100 group-hover:scale-[1.04] transition-all duration-700"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${member.color || '#F5A800'}22, ${member.color || '#F5A800'}44)` }}
            >
              <span
                className="text-4xl font-black tracking-tight"
                style={{ color: member.color || '#F5A800' }}
              >
                {member.initials || member.name?.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
          <a
            href={profile.linkedin !== '#' ? profile.linkedin : member.linkedin || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
          >
            <Linkedin size={12} />
          </a>
        </div>
        {/* Info */}
        <div className="px-4 pt-3 pb-4 flex flex-col flex-1">
          <h3 className="text-[14px] font-black text-white tracking-tight leading-tight mb-0.5">{member.name}</h3>
          <div
            className="text-[9px] font-black uppercase tracking-[0.18em] mb-2"
            style={{ color: member.color || '#F5A800' }}
          >
            {member.role}
          </div>
          <p className="text-white/40 text-[11px] leading-relaxed font-medium flex-1">{member.bio}</p>
        </div>
      </motion.div>
    );
  };

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
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
            <span className="text-[11px] font-bold text-white/60 uppercase tracking-[0.2em]">The People</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-none text-white mb-5">
            Meet Our <span className="text-white/40">Team</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl font-medium">
            Seasoned experts who've built, scaled, and secured systems across two continents.
          </p>
        </motion.div>

        {/* Leadership — 4-col grid */}
        {leaders.length > 0 && (
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            {leaders.map((member, i) => {
              const profile = expandedProfiles.find(p => p.id === member.id) || expandedProfiles[i % expandedProfiles.length];
              return <MemberCard key={member.id} member={member} i={i} profile={profile} />;
            })}
          </motion.div>
        )}
      </div>

      {/* Engineers — full-bleed, fills entire viewport width */}
      {engineers.length > 0 && (
        <div className="w-full px-4 lg:px-8">
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex gap-3"
          >
            {engineers.map((member, i) => {
              const profile = expandedProfiles.find(p => p.id === member.id) || expandedProfiles[(i + 4) % expandedProfiles.length];
              return <MemberCard key={member.id} member={member} i={i} profile={profile} />;
            })}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default CompanyLeadership;
