import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function GlobalPresence() {
 return (
  <section className="relative bg-[#02040a] py-20 border-t border-white/[0.04] overflow-hidden">
   {/* Background grid — subtle */}
   <div
    className="absolute inset-0 opacity-[0.02] pointer-events-none"
    style={{
     backgroundImage:
      'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
     backgroundSize: '48px 48px',
    }}
   />

   <div className="container max-w-4xl mx-auto relative z-10 px-6 text-center">
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.6 }}
    >
     {/* Section label */}
     <div className="inline-flex items-center gap-3 mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
      <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-[0.25em]">Distributed Team</span>
     </div>

     <h2 className="text-4xl md:text-6xl font-black text-white tracking-[-0.03em] leading-[0.95] mb-6">
      Distributed Team Across
      <br />
      <span className="text-white/40">Multiple Time Zones</span>
     </h2>
     <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto font-medium">
      Our remote-first team operates across time zones to support clients worldwide, ensuring continuous delivery and collaboration.
     </p>

     <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-10 flex items-center justify-center gap-3"
     >
      <Globe size={18} className="text-white/30" />
      <span className="text-[12px] text-white/40 font-medium">
       Async collaboration · Flexible coverage window
      </span>
     </motion.div>
    </motion.div>
   </div>
  </section>
 );
}
