import { motion } from 'framer-motion';
import aws from '../assets/aws-25_transparent.png';
import microsoft from '../assets/microsoft-19.png';
import oracle from '../assets/oracle-21_transparent.png';
import ibm from '../assets/ibm-17_transparent.png';
import hp from '../assets/hp-22_transparent.png';
import nvidia from '../assets/nvidia-28.png';

const partners = [
 { name: 'AWS', logo: aws },
 { name: 'Microsoft', logo: microsoft },
 { name: 'Oracle', logo: oracle },
 { name: 'IBM', logo: ibm },
 { name: 'HP', logo: hp },
 { name: 'NVIDIA', logo: nvidia },
];

const staggerContainer = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
 hidden: { opacity: 0, y: 15 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function TechPartners() {
 return (
  <section className="relative py-20 bg-[#02040a] border-t border-white/[0.04] overflow-hidden">
   <div className="absolute inset-0 z-0">
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-gradient-to-r from-[#F5A800]/5 via-transparent to-[#8b5cf6]/5 blur-[100px]" />
   </div>

   <div className="container max-w-6xl mx-auto relative z-10 px-6">
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5 }}
     className="text-center mb-12"
    >
     <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
      <span className="w-2 h-2 rounded-full bg-[#F5A800] animate-pulse" />
      <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-[0.2em]">Technology Partners</span>
     </div>
     <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
      Built on the best
     </h2>
     <p className="mt-3 text-white/40 text-sm max-w-md mx-auto">
      We integrate with the platforms our customers already trust.
     </p>
    </motion.div>

    <motion.div
     variants={staggerContainer}
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true, margin: '-60px' }}
     className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
    >
     {partners.map((partner, i) => (
      <motion.div
       key={i}
       variants={fadeUp}
       className="group flex flex-col items-center gap-3"
      >
       <div className="w-20 h-20 md:w-24 md:h-24 rounded-[20px] border border-white/[0.06] bg-white/[0.02] flex items-center justify-center p-4 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
        <img
         src={partner.logo}
         alt={partner.name}
         className="w-full h-full object-contain opacity-40 group-hover:opacity-70 transition-opacity duration-300 grayscale"
        />
       </div>
       <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-white/50 transition-colors duration-300">
        {partner.name}
       </span>
      </motion.div>
     ))}
    </motion.div>
   </div>
  </section>
 );
}
