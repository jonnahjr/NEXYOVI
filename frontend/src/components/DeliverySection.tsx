import { motion } from 'framer-motion';
import { Building2, Bot, Smartphone, Cloud, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const defaultItems = [
  {
    id: 'enterprise',
    icon: Building2,
    title: 'Enterprise Platforms',
    description: 'Custom business systems and internal enterprise applications built for reliability, scalability, and security at scale.',
    capabilities: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python'],
    color: 'text-slate-900',
    bgGlow: 'from-slate-900/5'
  },
  {
    id: 'ai',
    icon: Bot,
    title: 'AI Solutions',
    description: 'Production-ready AI systems, intelligent assistants, automation workflows, and machine learning platforms deployed in live environments.',
    capabilities: ['OpenAI', 'Anthropic', 'LangChain', 'RAG Pipelines', 'Vector DBs'],
    color: 'text-slate-900',
    bgGlow: 'from-slate-900/5'
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Native and cross-platform applications engineered for performance, user experience, and enterprise-grade security requirements.',
    capabilities: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    color: 'text-slate-900',
    bgGlow: 'from-slate-900/5'
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Transformations',
    description: 'End-to-end infrastructure modernization, cloud migration, and DevOps implementation for organizations transitioning from legacy systems.',
    capabilities: ['AWS', 'Azure', 'GCP', 'Terraform', 'Ansible'],
    color: 'text-slate-900',
    bgGlow: 'from-slate-900/5'
  }
];

export default function DeliverySection() {
  const { siteContent } = useSite();
  const items = siteContent?.delivery?.items || defaultItems;
  const badge = siteContent?.delivery?.badge || 'Track Record';
  const title = siteContent?.delivery?.title || 'Proven Delivery Across Critical Industries';
  const subtitle = siteContent?.delivery?.subtitle || 'Every engagement is measured by business impact, technical rigor, and long-term reliability. Here is how we deliver.';

  return (
    <section className="relative bg-[#FCFBF8] py-28 md:py-36 overflow-hidden section-divider-light">
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">{badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-[-0.02em] leading-[1.05] mb-5">
            {title.includes('Critical Industries') ? (
              <>{title.split('Critical Industries')[0]}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Critical Industries</span></>
            ) : title}
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">{subtitle}</p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item: any, i: number) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white border border-slate-200 rounded-3xl p-8 hover:border-slate-300 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color} bg-slate-100 border border-slate-200 mb-6`}>
                    <Icon size={22} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{item.description}</p>

                  <div className="space-y-2">
                    {item.capabilities.map((cap: string) => (
                      <div key={cap} className="flex items-center gap-2.5">
                        <CheckCircle2 size={14} className="shrink-0 text-[#F5A800]" />
                        <span className="text-sm text-slate-600">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
