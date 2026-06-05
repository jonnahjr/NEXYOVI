import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useSite } from '../context/SiteContext';
import { Server, Activity, ShieldCheck, Briefcase, Globe, Cpu } from 'lucide-react';

const metrics = [
 {
  headline: '99.9%',
  tags: ['High Availability', 'SLA'],
  sub: 'Infrastructure Uptime',
  icon: Server,
  color: '#F5A800',
 },
 {
  headline: '24/7',
  tags: ['Proactive', 'Response'],
  sub: 'System Monitoring',
  icon: Activity,
  color: '#8b5cf6',
 },
 {
  headline: 'Security-First',
  tags: ['Encrypted', 'Compliant'],
  sub: 'Engineering Standards',
  icon: ShieldCheck,
  color: '#10b981',
 },
 {
  headline: 'Multi-Industry',
  tags: ['FinTech', 'HealthTech', 'Gov'],
  sub: 'Domain Expertise',
  icon: Briefcase,
  color: '#ef4444',
 },
 {
  headline: 'Global',
  tags: ['Distributed', 'Scalable'],
  sub: 'Delivery Model',
  icon: Globe,
  color: '#3b82f6',
 },
 {
  headline: 'AI & Software',
  tags: ['Engineers', 'Architects'],
  sub: 'Specialist Teams',
  icon: Cpu,
  color: '#0ea5e9',
 },
];

const containerVariants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants = {
 hidden: { opacity: 0, y: 40, scale: 0.95 },
 visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function CompanyMetrics() {
 const sectionRef = useRef<HTMLElement>(null);
 const { siteContent } = useSite();

 const displayMetrics = metrics.map((m, i) => {
   if (siteContent?.metrics && siteContent.metrics[i]) {
     return { 
       ...m, 
       headline: siteContent.metrics[i].number || m.headline,
       sub: siteContent.metrics[i].label || m.sub
     };
   }
   return m;
 });

 return (
  <section ref={sectionRef} className="relative overflow-hidden bg-[#02040a] py-28 border-t border-b border-white/5">

   {/* Background glow orbs */}
   <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="absolute left-1/4 top-1/4 w-[600px] h-[600px] rounded-full bg-[#F5A800]/6 blur-[160px]" />
    <div className="absolute right-1/4 bottom-1/4 w-[500px] h-[500px] rounded-full bg-[#8b5cf6]/5 blur-[180px]" />
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] rounded-full bg-gradient-to-r from-[#F5A800]/4 via-transparent to-[#8b5cf6]/4 blur-[120px]" />
   </div>

   {/* Dot grid */}
   <div
    className="absolute inset-0 z-0 opacity-[0.025]"
    style={{
     backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 0.5px, transparent 0.5px)',
     backgroundSize: '28px 28px',
    }}
   />

   <div className="container max-w-6xl mx-auto relative z-10 px-6">

    {/* Section heading */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
     className="text-center mb-16"
    >
     <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.06] mb-8">
      <span className="relative flex h-2 w-2">
       <span className="absolute inline-flex h-full w-full rounded-full bg-[#F5A800] animate-ping opacity-75" />
       <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5A800]" />
      </span>
       <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Delivery Metrics</span>
     </div>
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.04em] leading-[0.95] max-w-2xl mx-auto">
       Built to{' '}
       <span className="bg-gradient-to-r from-[#F5A800] via-amber-400 to-[#8b5cf6] bg-clip-text text-transparent">
        deliver
       </span>
      </h2>
    </motion.div>

    {/* Metrics grid */}
     <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
     >
     {displayMetrics.map((metric, i) => {
      const Icon = metric.icon;
      return (
       <motion.div
        key={i}
        variants={cardVariants}
        className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-8 text-center transition-all duration-500 hover:border-white/15 hover:bg-white/[0.05]"
       >
        {/* Hover glow */}
        <div
         className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none"
         style={{
          background: `radial-gradient(600px circle at 50% 0%, ${metric.color}08, transparent)`,
         }}
        />

        {/* Animated scan line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent translate-y-[-100%] group-hover:translate-y-[400%] transition-transform duration-[1.5s] ease-out pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-5">

         {/* Icon */}
         <div
          className="w-12 h-12 rounded-[14px] flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:rotate-[6deg]"
          style={{
           background: `linear-gradient(135deg, ${metric.color}12, ${metric.color}04)`,
           borderColor: `${metric.color}25`,
          }}
         >
          <Icon size={20} style={{ color: metric.color }} strokeWidth={2} />
         </div>

         {/* Headline + Tags */}
         <div className="text-center">
          <div
           className="text-xl md:text-2xl font-black tracking-tight transition-colors duration-500 leading-tight"
           style={{ color: metric.color }}
          >
           {metric.headline}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
           {metric.tags.map((tag) => (
            <span
             key={tag}
             className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border border-white/[0.06] bg-white/[0.03] text-white/40"
            >
             {tag}
            </span>
           ))}
          </div>
          <div className="mt-3 text-[11px] font-medium text-white/25">
           {metric.sub}
          </div>
         </div>
        </div>

        {/* Corner accent */}
        <div
         className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none"
         style={{ background: `${metric.color}20` }}
        />

        {/* Bottom line */}
        <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
       </motion.div>
      );
     })}
    </motion.div>

    {/* Trust badges */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
     className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-16"
    >
     {['GDPR Compliant', 'Encrypted Infrastructure', 'Modern Security Practices'].map((cert, i) => (
      <div key={i} className="flex items-center gap-2 text-white/30 hover:text-white/50 transition-colors duration-300">
       <span className="w-1 h-1 rounded-full bg-emerald-500/60" />
       <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{cert}</span>
      </div>
     ))}
    </motion.div>
   </div>
  </section>
 );
}
