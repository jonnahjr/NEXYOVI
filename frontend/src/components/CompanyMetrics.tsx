import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, staggerContainer } from '../lib/animations';

const metrics = [
  { value: '100+', label: 'Enterprise Deployments' },
  { value: '24/7', label: 'Active Monitoring' },
  { value: '4+', label: 'Global Operational Hubs' },
  { value: 'Zero', label: 'Critical Security Breaches' },
];

export default function CompanyMetrics() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden bg-[#02040a] border-t border-b border-white/5">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[700px] h-[260px] rounded-full bg-[#F5A800]/10 blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 w-[420px] h-[420px] rounded-full bg-[#8b5cf6]/10 blur-[140px]" />
      </div>

      <div className="container max-w-6xl mx-auto relative z-10 px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 text-center shadow-[0_30px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:border-[#F5A800]/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                <div className="text-5xl md:text-6xl font-black text-white group-hover:text-[#F5A800] tracking-tight transition-colors duration-300">
                  {metric.value}
                </div>
                <div className="text-sm uppercase tracking-[0.35em] text-white/60">
                  {metric.label}
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#F5A800] to-[#8b5cf6] opacity-80" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
