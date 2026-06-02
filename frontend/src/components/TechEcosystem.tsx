import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// Inline SVG brand logo components — monochrome style
function BrandLogo({ name }: { name: string }) {
  const style: Record<string, { node: ReactNode; bg: string }> = {
    AWS: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><path d="M14 28c-2.2-1.4-4.8-2-7.5-1.8-2.7.2-5.2 1.2-7.5 2.8l2.5 3c1.6-1.2 3.4-1.9 5.2-2 1.8-.1 3.6.3 5.3 1.3l2-3.3zm-5.5-7.5c-2.8-1.8-6-2.6-9.3-2.4-3.3.2-6.4 1.5-9.2 3.6l3 3.7c2-1.5 4.3-2.4 6.7-2.5 2.4-.1 4.8.5 7 1.8l2.8-4.2zM30 18c-1.5-1-3.2-1.5-5-1.4-3.5.2-6.7 2.2-8.5 5.2l3.5 2c1.2-2 3.4-3.2 5.8-3.3 1.2 0 2.4.3 3.5 1l1.7-3.5z" fill="white"/></>,
      bg: '#FF9900',
    },
    Azure: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><path d="M12 30l12-24 12 24H12zm4-3h16L20 12l-4 15z" fill="white"/></>,
      bg: '#0078D4',
    },
    GCP: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><path d="M28 14l5 3-5 3v-6zm-8 0l-5 3 5 3v-6zm4 8l5 3-5 3v-6zm-8 0l-5 3 5 3v-6zm12 8l5 3-5 3v-6zm-8 0l-5 3 5 3v-6z" fill="white"/></>,
      bg: '#4285F4',
    },
    OpenAI: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><path d="M24 14c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="white"/></>,
      bg: '#10a37f',
    },
    Anthropic: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><text x="24" y="30" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">A</text></>,
      bg: '#1a1a2e',
    },
    'Hugging Face': {
      node: <><rect width="48" height="48" rx="8" fill="none"/><path d="M16 18h16v4H16zm0 8h12v4H16z" fill="white"/></>,
      bg: '#FFD21E',
    },
    PostgreSQL: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><ellipse cx="24" cy="22" rx="8" ry="5" stroke="white" strokeWidth="1.5" fill="none"/><text x="24" y="18" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">SQL</text></>,
      bg: '#336791',
    },
    'Apache Kafka': {
      node: <><rect width="48" height="48" rx="8" fill="none"/><circle cx="24" cy="18" r="4" fill="white" opacity="0.8"/><circle cx="24" cy="30" r="4" fill="white" opacity="0.8"/><line x1="24" y1="22" x2="24" y2="26" stroke="white" strokeWidth="2"/></>,
      bg: '#0A0A0A',
    },
    Snowflake: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><path d="M24 14l2 4 2-4-2-4-2 4zm0 20l-2-4-2 4 2 4 2-4zm-8-14l-4-2 4-2 2 4-2 2zm16 0l4-2-4-2-2 4 2 2zm-12 8l-4 2 4 2 2-4-2-2zm8 0l4 2-4 2-2-4 2-2z" stroke="white" strokeWidth="1.5" fill="none"/></>,
      bg: '#29B5E8',
    },
    Cloudflare: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><text x="24" y="28" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CF</text></>,
      bg: '#F38020',
    },
    Vercel: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><polygon points="24,16 34,32 14,32" fill="white"/></>,
      bg: '#000',
    },
    Stripe: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><text x="24" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">S</text></>,
      bg: '#635BFF',
    },
    Kubernetes: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><circle cx="24" cy="24" r="6" stroke="white" strokeWidth="1.5" fill="none"/><path d="M24 18l-4 6h8l-4-6z" fill="white" opacity="0.6"/></>,
      bg: '#326CE5',
    },
    Terraform: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><text x="24" y="28" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">TF</text></>,
      bg: '#7B42BC',
    },
    Docker: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><text x="24" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">D</text></>,
      bg: '#2496ED',
    },
    TypeScript: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><text x="24" y="28" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">TS</text></>,
      bg: '#3178C6',
    },
    React: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><circle cx="24" cy="24" r="3" fill="white"/><ellipse cx="24" cy="24" rx="12" ry="4" stroke="white" strokeWidth="1" fill="none"/><ellipse cx="24" cy="24" rx="12" ry="4" stroke="white" strokeWidth="1" fill="none" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="12" ry="4" stroke="white" strokeWidth="1" fill="none" transform="rotate(120 24 24)"/></>,
      bg: '#282c34',
    },
    Rust: {
      node: <><rect width="48" height="48" rx="8" fill="none"/><text x="24" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">R</text></>,
      bg: '#000',
    },
  };
  const logo = style[name];
  if (!logo) return <div className="w-8 h-8 rounded-md bg-[#222]"/>;
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <rect width="48" height="48" rx="8" fill={logo.bg} />
      {logo.node}
    </svg>
  );
}

const techCategories = [
  {
    category: 'Cloud',
    items: [
      { name: 'AWS', desc: 'Compute, storage, serverless' },
      { name: 'Azure', desc: 'Enterprise cloud, AI services' },
      { name: 'GCP', desc: 'Data, ML, Kubernetes' },
    ],
  },
  {
    category: 'AI',
    items: [
      { name: 'OpenAI', desc: 'LLMs, embeddings, fine-tuning' },
      { name: 'Anthropic', desc: 'Safety, reasoning, Claude' },
      { name: 'Hugging Face', desc: 'Open-source models, pipelines' },
    ],
  },
  {
    category: 'Data',
    items: [
      { name: 'PostgreSQL', desc: 'Relational, vector, TimescaleDB' },
      { name: 'Apache Kafka', desc: 'Streaming, event-driven' },
      { name: 'Snowflake', desc: 'Data warehouse, analytics' },
    ],
  },
  {
    category: 'Security',
    items: [
      { name: 'Cloudflare', desc: 'CDN, DDoS, zero-trust' },
      { name: 'Vercel', desc: 'Edge, frontend deployment' },
      { name: 'Stripe', desc: 'Payments, billing, fintech' },
    ],
  },
  {
    category: 'Infrastructure',
    items: [
      { name: 'Kubernetes', desc: 'Orchestration, auto-scaling' },
      { name: 'Terraform', desc: 'Infrastructure as code' },
      { name: 'Docker', desc: 'Containers, CI/CD' },
    ],
  },
  {
    category: 'Development',
    items: [
      { name: 'TypeScript', desc: 'Type-safe, full-stack' },
      { name: 'React', desc: 'Web, mobile, desktop' },
      { name: 'Rust', desc: 'Systems, performance-critical' },
    ],
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

export default function TechEcosystem() {
  return (
    <section className="relative bg-[#02040a] py-36 border-t border-white/[0.04] overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container max-w-[1200px] mx-auto relative z-10 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
            <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-[0.25em]">Technology Ecosystem</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.04em] leading-[0.95]">
            Technologies we use
          </h2>
          <p className="mt-6 text-white/50 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
            Modern tools and platforms we integrate into every engagement — from cloud infrastructure to AI pipelines.
          </p>
        </motion.div>

        {/* Category Grid — Visual Card Layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {techCategories.map((cat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group p-6 bg-white/[0.03] border border-white/10 rounded-[16px] transition-all duration-500 hover:bg-white/[0.05] hover:border-white/15"
            >
              {/* Category label */}
              <div className="text-[9px] font-bold text-[#F5A800] uppercase tracking-[0.2em] mb-5 pb-3 border-b border-white/[0.06]">{cat.category}</div>
              {/* Items */}
              <div className="space-y-5">
                {cat.items.map((item, j) => {
                  return (
                    <div key={j} className="group/item flex items-start gap-3">
                      {/* Monochrome SVG brand block */}
                      <div className="w-8 h-8 rounded-md shrink-0 overflow-hidden">
                        <BrandLogo name={item.name} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white text-[14px] font-bold tracking-tight leading-tight">{item.name}</div>
                        <div className="text-white/25 text-[10px] font-medium mt-0.5 leading-tight">{item.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
