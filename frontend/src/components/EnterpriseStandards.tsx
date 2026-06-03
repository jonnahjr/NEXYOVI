import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const standards = [
 'Security-First Development',
 'Cloud Native Architecture',
 'CI/CD Automation',
 'Disaster Recovery',
 'Infrastructure as Code',
 'Observability & Monitoring',
 'Compliance Ready',
 'Documentation Included'
];

const containerVariants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
 hidden: { opacity: 0, x: -20 },
 visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function EnterpriseStandards() {
 return (
  <section className="bg-slate-50 py-24 border-t border-slate-200">
   <div className="container max-w-5xl mx-auto px-6">
    
    <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
     
     {/* Left: Heading */}
     <div className="md:w-1/3">
      <motion.div
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.6 }}
      >
       <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
        Enterprise Standards
       </h2>
       <p className="text-slate-500 mt-4 font-medium leading-relaxed">
        Every system we build adheres to strict engineering principles designed for scale, security, and resilience.
       </p>
      </motion.div>
     </div>

     {/* Right: Grid */}
     <div className="md:w-2/3">
      <motion.div 
       variants={containerVariants}
       initial="hidden"
       whileInView="visible"
       viewport={{ once: true, margin: '-50px' }}
       className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6"
      >
       {standards.map((standard, i) => (
        <motion.div 
         key={i} 
         variants={itemVariants}
         className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#F5A800]/40 transition-colors duration-300"
        >
         <CheckCircle2 size={24} className="text-[#F5A800] shrink-0" />
         <span className="font-bold text-slate-700 text-[15px]">{standard}</span>
        </motion.div>
       ))}
      </motion.div>
     </div>

    </div>
   </div>
  </section>
 );
}
