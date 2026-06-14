import { motion } from 'framer-motion';
import {
  Box,
  BrainCircuit,
  Code2,
  Cog,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Network,
  Terminal,
  Workflow,
  Zap
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

const ContainerIcon = ({ size, className }: { size?: number; className?: string }) => (
  <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 4v16" />
    <path d="M4 9h16" />
    <path d="M4 15h16" />
  </svg>
);

const defaultCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#61DAFB',
    items: [
      { name: 'React', color: '#61DAFB', icon: Code2 },
      { name: 'Next.js', color: '#ffffff', icon: Globe },
      { name: 'TypeScript', color: '#3178C6', icon: Terminal },
      { name: 'Tailwind CSS', color: '#06B6D4', icon: Cog }
    ]
  },
  {
    id: 'backend',
    label: 'Backend',
    color: '#10b981',
    items: [
      { name: 'Node.js', color: '#339933', icon: Box },
      { name: 'Python', color: '#3776AB', icon: Terminal },
      { name: 'FastAPI', color: '#009688', icon: Zap },
      { name: '.NET', color: '#512BD4', icon: Cpu }
    ]
  },
  {
    id: 'cloud',
    label: 'Cloud & Infrastructure',
    color: '#8b5cf6',
    items: [
      { name: 'AWS', color: '#FF9900', icon: Globe },
      { name: 'Azure', color: '#0078D4', icon: Globe },
      { name: 'Docker', color: '#2496ED', icon: ContainerIcon },
      { name: 'Kubernetes', color: '#326CE5', icon: Box },
      { name: 'Terraform', color: '#7B42BC', icon: GitBranch }
    ]
  },
  {
    id: 'ai',
    label: 'AI & Data',
    color: '#F5A800',
    items: [
      { name: 'OpenAI', color: '#412991', icon: BrainCircuit },
      { name: 'Anthropic', color: '#7C3AED', icon: BrainCircuit },
      { name: 'LangGraph', color: '#FF6B6B', icon: Workflow },
      { name: 'Vector Databases', color: '#47A248', icon: Database },
      { name: 'RAG Systems', color: '#FFD700', icon: Network },
      { name: 'AI Agents', color: '#00D4AA', icon: Cpu }
    ]
  }
];

export default function TechnologiesSection() {
  const { siteContent } = useSite();
  const categories = siteContent?.technologies?.categories || defaultCategories;
  const badge = siteContent?.technologies?.badge || 'Engineering Stack';
  const title = siteContent?.technologies?.title || 'Technologies We Build With';
  const subtitle = siteContent?.technologies?.subtitle || 'Modern, battle-tested technologies we use to architect and deliver production-grade systems for startups, enterprises, and government organizations.';

  return (
    <section className="relative bg-[#02040a] py-16 md:py-20 section-divider-dark overflow-hidden">
      {/* Grid background - only show on larger screens */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase">{badge}</span>
          </div>
          <h2 className="text-[clamp(24px,7vw,48px)] font-black text-white tracking-[-0.02em] leading-[1.05] mb-3 sm:mb-4">
            {title.includes('We Build With') ? (
              <>{title.split('We Build With')[0]}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">We Build With</span></>
            ) : title}
          </h2>
          <p className="text-white/45 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium px-2">{subtitle}</p>
        </motion.div>

        {/* Tech Constellation Grid */}
        <div className="space-y-10 md:space-y-12">
          {(categories as any[]).map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #F5A80030, transparent)' }} />
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F5A800' }} />
                  <span className="text-[13px] font-black uppercase tracking-[0.25em]" style={{ color: '#F5A800' }}>{cat.label}</span>
                </div>
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #F5A80030, transparent)' }} />
              </div>

              {/* Tech items */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {cat.items.map((item: any, itemIdx: number) => {
                  return (
                    <motion.div
                      key={`${cat.id}-${item.name}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.3, delay: itemIdx * 0.05 }}
                      className="relative flex flex-col items-center"
                    >
                      {/* Icon */}
                      <item.icon
                        size={28}
                        className="transition-all duration-300 text-white"
                      />

                      {/* Tooltip name */}
                      <span className="text-[10px] font-semibold whitespace-nowrap text-white/60">
                        {item.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}
