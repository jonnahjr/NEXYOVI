import { motion } from 'framer-motion';
import { BrainCircuit, Code, Smartphone, Cloud, Shield, Database, Cog, Network, BarChart3, ArrowRight } from 'lucide-react';

const capabilities = [
 {
  icon: BrainCircuit,
  title: 'AI Systems',
  desc: 'Custom LLM integration, intelligent automation, and machine learning pipelines deployed at production scale.',
 },
 {
  icon: Code,
  title: 'Custom Software',
  desc: 'Mission-critical web platforms, SaaS products, and backend systems built for performance and reliability.',
 },
 {
  icon: Smartphone,
  title: 'Mobile Applications',
  desc: 'Native iOS and Android applications with offline-first architecture and real-time synchronization.',
 },
 {
  icon: Cloud,
  title: 'Cloud Infrastructure',
  desc: 'Multi-cloud architecture, Kubernetes orchestration, and auto-scaling infrastructure across AWS, Azure, and GCP.',
 },
 {
  icon: Shield,
  title: 'Cybersecurity',
  desc: 'Zero-trust architecture, penetration testing, compliance frameworks, and real-time threat detection systems.',
 },
 {
  icon: Database,
  title: 'Data Platforms',
  desc: 'Real-time data pipelines, data lakes, streaming analytics, and business intelligence infrastructure.',
 },
 {
  icon: Cog,
  title: 'DevOps Automation',
  desc: 'CI/CD pipelines, infrastructure as code, observability stacks, and incident response automation.',
 },
 {
  icon: Network,
  title: 'Enterprise Integrations',
  desc: 'API gateways, event-driven architectures, legacy system modernization, and third-party platform integration.',
 },
 {
  icon: BarChart3,
  title: 'Analytics & BI',
  desc: 'Real-time dashboards, predictive analytics, custom reporting engines, and data visualization platforms.',
 },
 {
  icon: ArrowRight,
  title: 'Modernization Programs',
  desc: 'Legacy system migration, cloud migration, technical debt reduction, and digital transformation roadmaps.',
 },
];

const containerVariants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function EnterpriseCapabilities() {
 return (
  <section className="relative bg-[#f4f4f5] py-36 border-t border-slate-200 overflow-hidden">
   {/* Subtle grid background */}
   <div
    className="absolute inset-0 opacity-[0.02] pointer-events-none"
    style={{
     backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
     backgroundSize: '64px 64px',
    }}
   />

   <div className="container max-w-[1400px] mx-auto relative z-10 px-6">
    {/* Header */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5 }}
     className="mb-16"
    >
     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Enterprise Capabilities</span>
     </div>
     <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-950 tracking-[-0.04em] leading-[0.9] max-w-3xl mb-8">
      What we build <br />
      <span className="text-[#F5A800]">& operate</span>
     </h2>
     <p className="text-slate-600 text-xl leading-relaxed max-w-2xl font-medium">
      Full-spectrum engineering across AI, infrastructure, security, and data — delivered at enterprise scale.
     </p>
    </motion.div>

    {/* Capabilities Grid */}
    <motion.div
     variants={containerVariants}
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true, margin: '-40px' }}
     className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-slate-200/50 rounded-[24px] overflow-hidden"
    >
     {capabilities.map((cap, i) => {
      const Icon = cap.icon;
      return (
       <motion.div
        key={i}
        variants={cardVariants}
        className="group relative bg-white p-8 transition-all duration-500 hover:border-[#F5A800]/40 hover:shadow-lg border border-transparent"
       >
        {/* Hover accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#F5A800] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        <div className="relative z-10">
         <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center mb-5 transition-all duration-300 group-hover:border-[#F5A800]/40 group-hover:bg-[#F5A800]/10">
          <Icon size={18} className="text-slate-600 group-hover:text-[#F5A800] transition-colors duration-300" />
         </div>
         <h3 className="text-slate-950 font-bold text-lg mb-3 tracking-tight">{cap.title}</h3>
         <p className="text-slate-600 text-base leading-relaxed font-medium">{cap.desc}</p>
        </div>
       </motion.div>
      );
     })}
    </motion.div>
   </div>
  </section>
 );
}
