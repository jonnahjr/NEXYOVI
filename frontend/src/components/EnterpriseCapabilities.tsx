import { motion } from 'framer-motion';
import { BarChart3, BrainCircuit, Cloud, Code, Cog, Database, Network, Shield, Smartphone } from 'lucide-react';

const capabilities = [
  {
    icon: BrainCircuit,
    title: 'AI Systems',
    desc: 'Custom LLM integration, intelligent automation, and machine learning pipelines deployed at production scale.',
    tag: 'Automation',
  },
  {
    icon: Code,
    title: 'Custom Software',
    desc: 'Mission-critical web platforms, SaaS products, and backend systems built for performance and reliability.',
    tag: 'Platforms',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    desc: 'Native iOS and Android applications with offline-first architecture and real-time synchronization.',
    tag: 'Mobile',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    desc: 'Multi-cloud architecture, Kubernetes orchestration, and auto-scaling infrastructure across AWS, Azure, and GCP.',
    tag: 'Infrastructure',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    desc: 'Zero-trust architecture, penetration testing, compliance frameworks, and real-time threat detection systems.',
    tag: 'Security',
  },
  {
    icon: Database,
    title: 'Data Platforms',
    desc: 'Real-time data pipelines, data lakes, streaming analytics, and business intelligence infrastructure.',
    tag: 'Data',
  },
  {
    icon: Cog,
    title: 'DevOps Automation',
    desc: 'CI/CD pipelines, infrastructure as code, observability stacks, and incident response automation.',
    tag: 'Operations',
  },
  {
    icon: Network,
    title: 'Enterprise Integrations',
    desc: 'API gateways, event-driven architectures, legacy system modernization, and third-party platform integration.',
    tag: 'Systems',
  },
  {
    icon: BarChart3,
    title: 'Analytics & BI',
    desc: 'Real-time dashboards, predictive analytics, custom reporting engines, and data visualization platforms.',
    tag: 'Insights',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function EnterpriseCapabilities() {
  return (
    <section className="relative bg-[#f4f4f5] py-24 border-t border-slate-200 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.18) 0.6px, transparent 0.6px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container max-w-7xl mx-auto relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Enterprise Capabilities</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-[-0.04em] leading-[0.92] mb-6">
            What We Build
            <br />
            <span className="text-[#F5A800]">& Operate</span>
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Enterprise delivery across software, infrastructure, security, and AI, shaped to feel simple, stable, and ready for real operations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-10 rounded-[30px] border border-slate-200 bg-white p-6 md:p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Designed For Scale
              </div>
              <h3 className="mt-5 max-w-3xl text-2xl md:text-4xl font-black tracking-[-0.04em] leading-[0.98] text-slate-950">
                Practical systems for companies that need to ship, secure, and operate without unnecessary complexity.
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                ['AI + Software', 'Product and automation delivery'],
                ['Cloud + Security', 'Infrastructure with governance'],
                ['Data + Operations', 'Dashboards, pipelines, and uptime'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{title}</div>
                  <p className="mt-2.5 text-sm leading-relaxed font-medium text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
