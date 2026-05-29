import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    subtitle: 'Foundation',
    title: 'Discover & Define',
    desc: 'We embed with your team to map your technology landscape, surface vulnerabilities, and architect a precise roadmap.',
    tags: ['Technical Audit', 'Gap Analysis', 'Planning'],
    accent: '#06b6d4',
  },
  {
    number: '02',
    subtitle: 'Execution',
    title: 'Engineer & Build',
    desc: 'Elite engineers build enterprise-grade AI systems, cloud infrastructure, and software platforms — fast and secure.',
    tags: ['Agile Sprints', 'CI/CD Pipelines', 'Code Reviews'],
    accent: '#F5A800',
  },
  {
    number: '03',
    subtitle: 'Growth',
    title: 'Deploy & Scale',
    desc: 'We launch with military-grade precision — zero-downtime deployments, global scaling, and continuous optimization.',
    tags: ['Global Rollout', 'Zero-Trust', 'Auto-Scaling'],
    accent: '#10b981',
  },
  {
    number: '04',
    subtitle: 'Excellence',
    title: 'Protect & Evolve',
    desc: 'Ongoing monitoring, threat hunting, and iterative improvement ensure your systems stay ahead — always secure.',
    tags: ['24/7 Monitoring', 'Threat Hunting', 'Improvement'],
    accent: '#8b5cf6',
  },
];

function PillarCard({ step, index }: { step: typeof steps[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.15, type: 'spring', bounce: 0.4 }}
      className="group relative h-full"
    >
      <div className="relative h-full flex flex-col justify-between p-8 xl:p-10 rounded-[32px] border border-white/[0.06] bg-[#0a0a0e] overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]">

        {/* Hover Ambient Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${step.accent}20 0%, transparent 60%)` }}
        />

        {/* Top Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[4px] opacity-30 group-hover:opacity-100 transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100"
          style={{ background: `linear-gradient(90deg, ${step.accent}, transparent)` }}
        />

        {/* Massive Ghost Number */}
        <div
          className="absolute -bottom-8 -right-4 text-[140px] font-black leading-none select-none pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-4"
          style={{
            color: 'transparent',
            WebkitTextStroke: `2px ${step.accent}15`,
          }}
        >
          {step.number}
        </div>

        {/* Content Top */}
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border shadow-inner transition-colors duration-500 group-hover:bg-white/10"
              style={{ color: step.accent, borderColor: `${step.accent}40`, backgroundColor: `${step.accent}10` }}
            >
              {step.number}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 group-hover:text-white/80 transition-colors">
              {step.subtitle}
            </span>
          </div>

          <div>
            <h3 className="text-2xl xl:text-3xl font-bold text-white mb-4 tracking-[-0.02em] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
              {step.title}
            </h3>
            <p className="text-white/60 text-sm xl:text-base leading-relaxed font-medium">
              {step.desc}
            </p>
          </div>
        </div>

        {/* Tags Bottom */}
        <div className="relative z-10 flex flex-wrap gap-2 mt-12">
          {step.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 group-hover:border-white/20 group-hover:text-white/90"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  );
}

const CoreDisciplines = () => {
  return (
    <section className="relative bg-[#02040a] py-32 overflow-hidden border-t border-white/[0.04]">

      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundSize: '150px 150px',
        }}
      />

      <div className="container relative z-10 max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.8)]" />
              <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-[0.3em]">
                Our Foundation
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-6">
              Disciplines
            </h2>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed font-medium">
              Four pillars of modern digital transformation — delivered with unmatched engineering depth and precision.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              to="/services"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold text-[13px] uppercase tracking-widest transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105"
            >
              Explore All Services
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#F5A800]" />
            </Link>
          </motion.div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <PillarCard key={step.number} step={step} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoreDisciplines;
