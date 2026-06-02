import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const outcomes = [
 {
  industry: 'Fintech Platform',
  metric: '80%',
  result: 'Reduced processing time',
  accent: '#10b981',
 },
 {
  industry: 'Logistics System',
  metric: '50,000+',
  result: 'Events handled per second',
  accent: '#f59e0b',
 },
 {
  industry: 'Healthcare Portal',
  metric: '3x',
  result: 'Improved patient engagement',
  accent: '#3b82f6',
 },
 {
  industry: 'Government Platform',
  metric: '100%',
  result: 'Digitized critical workflows',
  accent: '#F5A800',
 },
];

export default function ClientOutcomes() {
 return (
  <section className="bg-[#02040a] py-32 border-y border-white/[0.05] relative overflow-hidden">
   
   <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
    backgroundSize: '32px 32px'
   }} />

   <div className="container max-w-7xl mx-auto px-6 relative z-10">
    
    <motion.div 
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     className="mb-20 text-center max-w-2xl mx-auto"
    >
     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
      <span className="w-2 h-2 rounded-full bg-[#F5A800] animate-pulse" />
      <span className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">
       Client Outcomes
      </span>
     </div>
     <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
      Real results for <span className="text-[#F5A800]">real business</span>
     </h2>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
     {outcomes.map((outcome, i) => (
      <motion.div
       key={i}
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ delay: i * 0.1, duration: 0.6 }}
       className="group relative rounded-[24px] bg-white/[0.03] border border-white/10 p-8 hover:bg-white/[0.06] transition-all duration-500 overflow-hidden"
      >
       <div 
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-[40px]" 
        style={{ background: outcome.accent }} 
       />

       <div className="relative z-10">
        <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 mb-8 flex justify-between items-center">
         {outcome.industry}
         <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: outcome.accent }} />
        </div>
        
        <div 
         className="text-5xl md:text-6xl font-black tracking-tighter mb-4"
         style={{ color: outcome.accent }}
        >
         {outcome.metric}
        </div>
        
        <p className="text-white/80 text-[15px] font-medium leading-relaxed">
         {outcome.result}
        </p>
       </div>
      </motion.div>
     ))}
    </div>

   </div>
  </section>
 );
}
