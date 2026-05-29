import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

/* ─── 3D-style CSS Icon Components ─── */

const BrainIcon = () => (
  <div className="relative w-[110px] h-[110px] flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-[#8B5CF6]/10 blur-2xl" />
    <div className="absolute -bottom-4 w-full h-6 bg-[#8B5CF6]/20 blur-lg rounded-full" />
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" className="drop-shadow-[0_0_16px_rgba(139,92,246,0.8)] relative z-10">
      <defs>
        <radialGradient id="brainGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="60%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#4C1D95" />
        </radialGradient>
      </defs>
      <ellipse cx="45" cy="38" rx="28" ry="26" fill="url(#brainGrad)" />
      <path d="M17 38 Q10 28 17 20 Q24 12 32 18" stroke="#C4B5FD" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M73 38 Q80 28 73 20 Q66 12 58 18" stroke="#C4B5FD" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M25 28 Q28 22 35 24 Q40 20 45 24" stroke="#DDD6FE" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M65 28 Q62 22 55 24 Q50 20 45 24" stroke="#DDD6FE" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="45" y1="18" x2="45" y2="58" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="3 3" />
      <ellipse cx="45" cy="60" rx="18" ry="6" fill="#8B5CF6" opacity="0.4" />
      <ellipse cx="45" cy="62" rx="12" ry="4" fill="#8B5CF6" opacity="0.6" />
      <rect x="27" y="60" width="36" height="12" rx="3" fill="#1E1040" />
      <rect x="29" y="72" width="32" height="3" rx="1.5" fill="#6D28D9" />
    </svg>
  </div>
);

const CloudIcon = () => (
  <div className="relative w-[110px] h-[110px] flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-[#FFBF33]/10 blur-2xl" />
    <div className="absolute -bottom-4 w-full h-6 bg-[#FFBF33]/20 blur-lg rounded-full" />
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" className="drop-shadow-[0_0_16px_rgba(59,130,246,0.8)] relative z-10">
      <defs>
        <radialGradient id="cloudGrad" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="55%" stopColor="#FFBF33" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
      </defs>
      <path d="M62 52 Q72 52 72 42 Q72 32 62 30 Q62 20 52 18 Q40 16 36 26 Q28 26 26 34 Q22 34 22 42 Q22 52 32 52 Z" fill="url(#cloudGrad)" />
      <path d="M34 52 Q30 58 34 62 L56 62 Q60 58 56 52" fill="#1E40AF" />
      <line x1="45" y1="62" x2="45" y2="70" stroke="#FFD166" strokeWidth="2" />
      <ellipse cx="45" cy="70" rx="14" ry="4" fill="#1D4ED8" opacity="0.5" />
      <ellipse cx="45" cy="71" rx="9" ry="2.5" fill="#FFBF33" opacity="0.7" />
      <path d="M36 40 Q40 36 44 40 Q48 36 52 40" stroke="#BAE6FD" strokeWidth="1.5" fill="none" />
    </svg>
  </div>
);

const ShieldIcon = () => (
  <div className="relative w-[110px] h-[110px] flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-[#0EA5E9]/10 blur-2xl" />
    <div className="absolute -bottom-4 w-full h-6 bg-[#0EA5E9]/20 blur-lg rounded-full" />
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" className="drop-shadow-[0_0_16px_rgba(14,165,233,0.8)] relative z-10">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
      </defs>
      <path d="M45 14 L68 24 L68 46 Q68 62 45 72 Q22 62 22 46 L22 24 Z" fill="url(#shieldGrad)" />
      <path d="M45 20 L62 28 L62 46 Q62 58 45 66 Q28 58 28 46 L28 28 Z" fill="#0369A1" opacity="0.5" />
      <rect x="38" y="38" width="14" height="14" rx="2" fill="#E0F2FE" />
      <rect x="40" y="34" width="10" height="8" rx="5" fill="none" stroke="#E0F2FE" strokeWidth="2" />
      <circle cx="45" cy="45" r="2" fill="#0369A1" />
      <ellipse cx="45" cy="74" rx="14" ry="4" fill="#0EA5E9" opacity="0.4" />
      <ellipse cx="45" cy="75" rx="9" ry="2.5" fill="#0EA5E9" opacity="0.6" />
    </svg>
  </div>
);

const ChartIcon = () => (
  <div className="relative w-[110px] h-[110px] flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-[#8B5CF6]/10 blur-2xl" />
    <div className="absolute -bottom-4 w-full h-6 bg-[#8B5CF6]/20 blur-lg rounded-full" />
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" className="drop-shadow-[0_0_16px_rgba(139,92,246,0.8)] relative z-10">
      <defs>
        <linearGradient id="bar1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="bar2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
        <linearGradient id="bar3Grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DDD6FE" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* Base platform */}
      <ellipse cx="45" cy="68" rx="30" ry="8" fill="#1E1040" />
      <ellipse cx="45" cy="67" rx="28" ry="7" fill="#2D1B69" />
      {/* Bars */}
      <rect x="20" y="40" width="14" height="27" rx="3" fill="url(#bar2Grad)" />
      <rect x="38" y="26" width="14" height="41" rx="3" fill="url(#bar1Grad)" />
      <rect x="56" y="34" width="14" height="33" rx="3" fill="url(#bar3Grad)" />
      {/* Top glow dots */}
      <circle cx="27" cy="39" r="3" fill="#C4B5FD" />
      <circle cx="45" cy="25" r="3" fill="#DDD6FE" />
      <circle cx="63" cy="33" r="3" fill="#A78BFA" />
      {/* Trend line */}
      <path d="M27 39 L45 25 L63 33" stroke="#DDD6FE" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

const CodeIcon = () => (
  <div className="relative w-[110px] h-[110px] flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-[#FFBF33]/10 blur-2xl" />
    <div className="absolute -bottom-4 w-full h-6 bg-[#FFBF33]/20 blur-lg rounded-full" />
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" className="drop-shadow-[0_0_16px_rgba(59,130,246,0.8)] relative z-10">
      <defs>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      {/* Monitor body */}
      <rect x="14" y="16" width="62" height="44" rx="6" fill="url(#screenGrad)" stroke="#FFBF33" strokeWidth="1.5" />
      {/* Screen content */}
      <rect x="18" y="20" width="54" height="36" rx="3" fill="#0F172A" />
      {/* Code lines */}
      <rect x="22" y="25" width="18" height="3" rx="1.5" fill="#FFD166" />
      <rect x="22" y="31" width="30" height="3" rx="1.5" fill="#A78BFA" />
      <rect x="22" y="37" width="22" height="3" rx="1.5" fill="#34D399" opacity="0.7" />
      <rect x="22" y="43" width="26" height="3" rx="1.5" fill="#FFD166" opacity="0.6" />
      <rect x="22" y="49" width="16" height="3" rx="1.5" fill="#A78BFA" opacity="0.5" />
      {/* Monitor stand */}
      <rect x="40" y="60" width="10" height="8" rx="2" fill="#1E3A8A" />
      <rect x="30" y="68" width="30" height="4" rx="2" fill="#1E3A8A" />
      {/* Platform */}
      <ellipse cx="45" cy="73" rx="20" ry="5" fill="#1E40AF" opacity="0.5" />
      <ellipse cx="45" cy="74" rx="14" ry="3" fill="#FFBF33" opacity="0.6" />
    </svg>
  </div>
);

const KnightIcon = () => (
  <div className="relative w-[110px] h-[110px] flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-[#FFBF33]/10 blur-2xl" />
    <div className="absolute -bottom-4 w-full h-6 bg-[#FFBF33]/20 blur-lg rounded-full" />
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" className="drop-shadow-[0_0_16px_rgba(59,130,246,0.8)] relative z-10">
      <defs>
        <linearGradient id="knightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE4A0" />
          <stop offset="50%" stopColor="#FFBF33" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      {/* Chess piece base */}
      <ellipse cx="45" cy="70" rx="20" ry="6" fill="#1E3A8A" />
      <rect x="28" y="64" width="34" height="8" rx="3" fill="#1E40AF" />
      <rect x="30" y="58" width="30" height="8" rx="3" fill="#1D4ED8" />
      {/* Knight head/body */}
      <path d="M38 58 Q36 46 40 38 Q44 30 42 22 Q46 18 52 22 Q56 26 54 32 Q58 30 60 36 Q58 42 54 44 Q56 48 54 58 Z" fill="url(#knightGrad)" />
      {/* Eye */}
      <circle cx="48" cy="28" r="2.5" fill="#1E3A8A" />
      <circle cx="48" cy="28" r="1.5" fill="#0F172A" />
      {/* Mane detail */}
      <path d="M40 36 Q44 34 48 36 Q52 38 54 36" stroke="#BAE6FD" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M38 44 Q42 42 46 44" stroke="#BAE6FD" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

const cards = [
  {
    title: 'AI & Automation',
    desc: 'Intelligent systems that learn, adapt, and drive results.',
    icon: <BrainIcon />,
    glow: '139,92,246',
  },
  {
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure for modern businesses.',
    icon: <CloudIcon />,
    glow: '59,130,246',
  },
  {
    title: 'Cybersecurity',
    desc: 'Protected systems and data in an evolving world.',
    icon: <ShieldIcon />,
    glow: '14,165,233',
  },
  {
    title: 'Data & Analytics',
    desc: 'Turn data into insights and drive smarter decisions.',
    icon: <ChartIcon />,
    glow: '139,92,246',
  },
  {
    title: 'Software Development',
    desc: 'Custom software built for performance and growth.',
    icon: <CodeIcon />,
    glow: '59,130,246',
  },
  {
    title: 'Consulting',
    desc: 'Strategic guidance to transform your business.',
    icon: <KnightIcon />,
    glow: '59,130,246',
  },
];

const FeatureCards = () => {
  return (
    <section className="bg-[#030712] relative z-40 overflow-hidden border-t border-white/[0.04]">
      <div className="w-full overflow-x-auto hide-scrollbar">
        <div className="flex items-stretch min-w-max lg:min-w-0 lg:grid lg:grid-cols-6 divide-x divide-white/[0.05]">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative group flex flex-col justify-between min-w-[220px] lg:min-w-0 cursor-pointer overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #0D1626 0%, #080F1E 100%)',
                minHeight: '340px',
                padding: '32px 28px 28px',
              }}
            >
              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 100%, rgba(${card.glow},0.15) 0%, transparent 70%)`,
                }}
              />

              {/* Top border highlight on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, rgba(${card.glow},0.9), transparent)` }}
              />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-white font-black text-[16px] leading-snug mb-2 group-hover:text-white transition-colors tracking-tight">
                  {card.title}
                </h3>
                <p className="text-white/40 text-[12px] leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>

              {/* 3D Icon */}
              <div className="relative z-10 flex flex-col items-center mt-6">
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {card.icon}
                </motion.div>
              </div>

              {/* Arrow button */}
              <div className="relative z-10 flex justify-end mt-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-300"
                >
                  <ChevronRight size={15} className="text-white/40 group-hover:text-white transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
