import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Cloud, Globe2, Cpu, Activity } from 'lucide-react';

const tags = [
 { label: '24/7', subtitle: 'Monitoring', icon: Activity },
 { label: 'Security-First', subtitle: 'Engineering', icon: ShieldCheck },
 { label: 'Global', subtitle: 'Operations', icon: Globe2 },
 { label: 'Cloud', subtitle: 'Native', icon: Cloud },
 { label: 'AI', subtitle: 'Powered', icon: Sparkles },
 { label: 'High-Performance', subtitle: 'Compute', icon: Cpu },
];

const row1 = [
 'Commercial Bank of Ethiopia', 'Zemen Bank', 'INSA',
 'Addis Ababa University', 'AASTU', 'Bahir Dar University', 'Hawassa University',
 'Ethio Telecom', 'HP', 'IBM', 'Oracle', 'AWS', 'TCS',
];

const row2 = [
 'Anthropic', 'Asoriba', 'Complete Farmer', 'Contrails AI',
 'Freshworks', 'Harvey AI', 'Kudobuzz', 'Paladin Drones',
 'Panjaya', 'Poolside AI', 'Replit', 'StackBlitz', 'Yampa', 'Zoho',
];

const MarqueeRow = ({ items, reverse = false, speed = 40 }: { items: string[]; reverse?: boolean; speed?: number }) => {
 const duration = 100 / speed * 30;
 return (
  <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
   <div
    className="flex w-max gap-12 py-3"
    style={{
     animation: `marquee ${duration}s linear infinite${reverse ? ' reverse' : ''}`,
    }}
   >
    {[...items, ...items, ...items].map((item, i) => (
     <div
      key={`${item}-${i}`}
      className="flex items-center gap-3 px-5 py-3 rounded-xl bg-black border border-white/10 hover:border-[#F5A800]/40 transition-all duration-300 group cursor-default shrink-0"
     >
      <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] group-hover:text-white/50 transition-colors">Trusted by</span>
      <span className="text-[15px] font-black text-white tracking-tight group-hover:text-[#F5A800] transition-colors whitespace-nowrap">
       {item}
      </span>
     </div>
    ))}
   </div>
  </div>
 );
};

const TrustedByMarquee = () => {
 return (
  <section className="relative py-20 md:py-24 bg-[#02040a] border-t border-white/[0.05] overflow-hidden">
   {/* Background glows */}
   <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[300px] bg-[#F5A800]/5 rounded-full blur-[120px]" />
    <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[300px] bg-[#8b5cf6]/5 rounded-full blur-[120px]" />
   </div>

   <div className="container max-w-6xl mx-auto px-6 relative z-10">
    {/* Header */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
     className="text-center mb-10"
    >
     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Trusted Partners</span>
     </div>
     <h2 className="text-3xl md:text-4xl font-black text-white tracking-[-0.03em] leading-tight">
      Trusted by fast companies{' '}
      <span className="text-white/40">across the globe.</span>
     </h2>
    </motion.div>

    {/* Two-row marquee — local partners top, global partners bottom */}
    <div className="space-y-3">
     <MarqueeRow items={row1} speed={1.0} />
     <MarqueeRow items={row2} reverse speed={1.0} />
    </div>

    {/* Tags row — smaller black boxes with icons */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.6, delay: 0.2 }}
     className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
     {tags.map((t, i) => {
      const Icon = t.icon;
      return (
       <div
        key={i}
        className="group flex items-center gap-2 px-3.5 py-2 rounded-lg bg-black border border-white/10 hover:border-[#F5A800]/40 transition-all duration-300 cursor-default"
       >
        <Icon size={12} className="text-[#F5A800] shrink-0" />
        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/40 group-hover:text-white/70 transition-colors">
         {t.label}
        </span>
        <span className="w-1 h-1 rounded-full bg-white/15" />
        <span className="text-[10px] font-bold tracking-wide text-white/70 group-hover:text-white transition-colors">
         {t.subtitle}
        </span>
       </div>
      );
     })}
    </motion.div>
   </div>

   {/* CSS keyframes (scoped via global since we use [mask-image] on the inner div) */}
   <style>{`
    @keyframes marquee {
     from { transform: translateX(0); }
     to { transform: translateX(-33.333%); }
    }
   `}</style>
  </section>
 );
};

export default TrustedByMarquee;
