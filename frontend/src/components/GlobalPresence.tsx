import { motion } from 'framer-motion';
import { MapPin, Globe, Radio } from 'lucide-react';
import WorldMap from './WorldMap';

const locations = [
 { city: 'Addis Ababa', role: 'Engineering Operations', flag: '🇪🇹' },
 { city: 'Remote Worldwide', role: 'Global Delivery Network', flag: '🌍' },
];

const metrics = [
 { label: 'Engineering Hubs', value: '2' },
 { label: 'Time Zones Covered', value: '8+' },
 { label: 'Remote Engineers', value: '85%' },
 { label: 'Delivery Success', value: '98%' },
];

export default function GlobalPresence() {
 return (
  <section className="relative bg-[#02040a] py-28 border-t border-white/[0.04] overflow-hidden">
   {/* Background grid — data viz aesthetic */}
   <div
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
     backgroundImage:
      'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
     backgroundSize: '48px 48px',
    }}
   />

   {/* Ambient glow */}
   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#F5A800]/3 via-transparent to-[#8b5cf6]/3 blur-[120px] pointer-events-none" />

   <div className="container max-w-[1200px] mx-auto relative z-10 px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

     {/* Left — World Map Visual */}
     <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
     >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
       <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
       <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-[0.25em]">Global Presence</span>
      </div>

      <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.03em] leading-[0.95] mb-8">
       Engineering across
       <br />
       <span className="text-white/40">time zones</span>
      </h2>
      <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-md mb-12 font-medium">
       Distributed engineering model combining in-office collaboration in Addis Ababa with a global remote workforce spanning 8+ time zones.
      </p>

      {/* World Map — from Contact page, sized smaller */}
      <div className="relative mb-10 max-w-md">
       <div className="overflow-hidden rounded-[32px]">
        <WorldMap />
       </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
       {metrics.map((m, i) => (
        <motion.div
         key={i}
         initial={{ opacity: 0, y: 10 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.4, delay: 0.1 * i }}
        >
         <div className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight">{m.value}</div>
         <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mt-1">{m.label}</div>
        </motion.div>
       ))}
      </div>
     </motion.div>

     {/* Right — Location Cards */}
     <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-4"
     >
      {/* Animated connection lines header */}
      <div className="flex items-center gap-3 mb-6">
       <Radio size={14} className="text-emerald-500 animate-pulse" />
       <span className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em]">Live — All Locations Operational</span>
      </div>

      {locations.map((loc, i) => (
       <motion.div
        key={i}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 * i }}
        className="group relative p-6 bg-white/[0.02] border border-white/[0.06] rounded-[20px] transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.12]"
       >
        <div className="flex items-center gap-4">
         <div className="w-12 h-12 rounded-[14px] border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-2xl shrink-0 group-hover:border-[#F5A800]/30 transition-all duration-300">
          <MapPin size={18} className="text-white/40 group-hover:text-[#F5A800] transition-colors duration-300" />
         </div>
         <div className="flex-1">
          <div className="flex items-center gap-2">
           <span className="text-xl font-bold text-white">{loc.city}</span>
           <span className="text-base">{loc.flag}</span>
          </div>
          <div className="text-[13px] text-white/40 font-medium">{loc.role}</div>
         </div>
         {/* Status dot */}
         <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse shrink-0" />
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
       </motion.div>
      ))}

      {/* Collaboration tag */}
      <motion.div
       initial={{ opacity: 0 }}
       whileInView={{ opacity: 1 }}
       viewport={{ once: true }}
       transition={{ delay: 0.6 }}
       className="flex items-center gap-3 pt-4"
      >
       <Globe size={14} className="text-white/20" />
       <span className="text-[11px] text-white/30 font-medium">
        Async collaboration · UTC-5 to UTC+3 · 24/7 coverage window
       </span>
      </motion.div>
     </motion.div>
    </div>
   </div>
  </section>
 );
}
