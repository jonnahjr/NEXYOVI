import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Building2, Activity, Globe, ShieldCheck } from 'lucide-react';

const metrics = [
 {
  value: 'Enterprise',
  label: 'Enterprise Deployments',
  icon: Building2,
  color: '#F5A800',
 },
 {
  value: 24,
  suffix: '/7',
  label: 'Active Monitoring',
  icon: Activity,
  color: '#3b82f6',
 },
 {
  value: 'Global',
  label: 'Operations',
  icon: Globe,
  color: '#8b5cf6',
 },
 {
  value: 'Zero',
  label: 'Critical Security Breaches',
  icon: ShieldCheck,
  color: '#10b981',
 },
];

function AnimatedCounter({ value, suffix, duration = 2.5 }: { value: number; suffix: string; duration?: number }) {
 const count = useMotionValue(0);
 const rounded = useTransform(count, (latest) => Math.floor(latest) + suffix);
 const ref = useRef(null);
 const isInView = useInView(ref, { once: true, margin: '-60px' });

 useEffect(() => {
  if (isInView) {
   animate(count, value, { duration, ease: [0.16, 1, 0.3, 1] });
  }
 }, [isInView, value, duration, count]);

 return <motion.span ref={ref} className="tabular-nums">{rounded}</motion.span>;
}

const containerVariants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants = {
 hidden: { opacity: 0, y: 40, scale: 0.95 },
 visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function CompanyMetrics() {
 const sectionRef = useRef<HTMLElement>(null);

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
     <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm mb-8">
      <span className="relative flex h-2 w-2">
       <span className="absolute inline-flex h-full w-full rounded-full bg-[#F5A800] animate-ping opacity-75" />
       <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5A800]" />
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">By The Numbers</span>
     </div>
     <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
      Proven at{' '}
      <span className="bg-gradient-to-r from-[#F5A800] via-amber-400 to-[#8b5cf6] bg-clip-text text-transparent">
       scale
      </span>
     </h2>
    </motion.div>

    {/* Metrics grid */}
    <motion.div
     variants={containerVariants}
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true, margin: '-60px' }}
     className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
     {metrics.map((metric, i) => {
      const Icon = metric.icon;
      return (
       <motion.div
        key={i}
        variants={cardVariants}
        className="group relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-8 text-center backdrop-blur-xl transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]"
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

         {/* Value + Label */}
         <div>
          <div
           className="text-5xl md:text-6xl font-black tracking-tight transition-colors duration-500"
           style={{ color: metric.color }}
          >
           {typeof metric.value === 'string' ? (
            <span>{metric.value}</span>
           ) : (
            <AnimatedCounter value={metric.value} suffix={metric.suffix} />
           )}
          </div>
          <div className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-white/60 transition-colors duration-500">
           {metric.label}
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
     {['GDPR Compliant', 'Encrypted Infrastructure', 'Zero Trust Architecture'].map((cert, i) => (
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
