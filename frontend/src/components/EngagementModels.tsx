import { motion } from 'framer-motion';
import { ClipboardList, Users, Briefcase, Handshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const models = [
 {
  icon: ClipboardList,
  title: 'Project-Based Delivery',
  desc: 'Fixed-scope, fixed-budget engagements for clearly defined initiatives. We handle end-to-end delivery from specification to deployment.',
  bestFor: 'MVPs, feature builds, platform migrations, and defined-scope initiatives',
  clientType: 'Startups to enterprises with well-defined requirements',
  duration: '8–24 weeks',
 },
 {
  icon: Users,
  title: 'Dedicated Engineering Teams',
  desc: 'Elite engineers embedded within your organization, working as an extension of your team with full access to our technical leadership.',
  bestFor: 'Ongoing product development, platform maintenance, and long-term roadmaps',
  clientType: 'Scale-ups and enterprises needing sustained engineering capacity',
  duration: '3–24+ months',
 },
 {
  icon: Briefcase,
  title: 'Fractional CTO Services',
  desc: 'Executive technical leadership on a flexible basis — architecture oversight, team building, technology strategy, and investor-grade roadmaps.',
  bestFor: 'Organizations that need senior technical direction without a full-time executive hire',
  clientType: 'Early-stage startups, SMBs, and teams in transition',
  duration: 'Ongoing — 2–20 hrs/week',
 },
 {
  icon: Handshake,
  title: 'Long-Term Strategic Partnerships',
  desc: 'Deep, multi-year partnerships where we operate as your core engineering organization — building platforms, running infrastructure, and driving continuous innovation.',
  bestFor: 'Organizations building complex platforms requiring sustained, deep technical investment',
  clientType: 'Enterprises, government institutions, and high-growth technology companies',
  duration: '12–48+ months',
 },
];

const staggerContainer = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function EngagementModels() {
 return (
  <section className="relative bg-[#02040a] py-28 border-t border-white/[0.04] overflow-hidden">
   <div className="container max-w-[1200px] mx-auto relative z-10 px-6">
    {/* Header */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5 }}
     className="mb-16"
    >
     <div className="flex items-center gap-3 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
      <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-[0.25em]">How We Engage</span>
     </div>
     <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.03em] leading-[0.95] max-w-2xl">
      Flexible engagement models for every stage
     </h2>
     <p className="text-white/50 text-xl leading-relaxed max-w-2xl mt-8 font-medium">
      From a single project to a long-term strategic partnership — we structure each engagement around your specific needs and goals.
     </p>
    </motion.div>

    {/* Models Grid */}
    <motion.div
     variants={staggerContainer}
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true, margin: '-40px' }}
     className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
     {models.map((model, i) => {
      const Icon = model.icon;
      return (
       <motion.div
        key={i}
        variants={cardVariants}
        className="group relative p-10 lg:p-12 bg-white/[0.03] border border-white/10 rounded-[24px] transition-all duration-500 hover:bg-white/[0.05] hover:border-white/[0.15]"
       >
        {/* Top accent */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 space-y-5">
         <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[14px] border border-white/[0.08] bg-white/[0.03] flex items-center justify-center transition-all duration-300 group-hover:border-[#F5A800]/30 group-hover:bg-[#F5A800]/5">
           <Icon size={20} className="text-white/50 group-hover:text-[#F5A800] transition-colors duration-300" />
          </div>
          <span className="text-[11px] font-mono font-bold text-white/20">0{i + 1}</span>
         </div>

         <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{model.title}</h3>
         <p className="text-white/50 text-base md:text-lg leading-relaxed font-medium">{model.desc}</p>

         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.04]">
          <div>
           <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-1">Best For</div>
           <div className="text-[13px] text-white/60 leading-relaxed">{model.bestFor}</div>
          </div>
          <div>
           <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-1">Client Type</div>
           <div className="text-[13px] text-white/60 leading-relaxed">{model.clientType}</div>
          </div>
          <div>
           <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-1">Duration</div>
           <div className="text-[13px] text-[#F5A800] font-bold">{model.duration}</div>
         </div>
        </div>
        </div>
       </motion.div>
      );
     })}
    </motion.div>

    {/* Bottom CTA */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5, delay: 0.4 }}
     className="mt-12 text-center"
    >
     <Link
      to="/contact"
      className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#02040a] font-bold text-[14px] transition-all hover:bg-[#F5A800] hover:scale-105"
     >
      Discuss Your Engagement
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
     </Link>
    </motion.div>
  </div>
 </section>
 );
}
