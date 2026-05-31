import { motion } from 'framer-motion';
import ethio from '../assets/ethio_transparent.png';
import cbe from '../assets/cbe_transparent.png';
import zemen from '../assets/zemen-bank-logo_transparent.png';
import insa from '../assets/Insa-09_transparent.png';
import global from '../assets/global_transparent.png';
import aau from '../assets/aau-02_transparent.png';
import aastu from '../assets/aastu-01_transparent.png';
import bdu from '../assets/bdu-05.png';
import hawassa from '../assets/Hawasa-08_transparent.png';

const clients = [
 { name: 'Ethio Telecom', logo: ethio },
 { name: 'Commercial Bank of Ethiopia', logo: cbe },
 { name: 'Zemen Bank', logo: zemen },
 { name: 'INSA', logo: insa },
 { name: 'Global Bank', logo: global },
 { name: 'Addis Ababa University', logo: aau },
 { name: 'AASTU', logo: aastu },
 { name: 'Bahir Dar University', logo: bdu },
 { name: 'Hawassa University', logo: hawassa },
];

export default function ClientLogos() {
 return (
  <section className="relative py-16 bg-[#02040a] border-b border-white/[0.04] overflow-hidden">
   <div className="container mx-auto px-6">
    <motion.div
     initial={{ opacity: 0, y: 10 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5 }}
     className="text-center mb-10"
    >
     <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
      Trusted by leading organisations
     </span>
    </motion.div>

    <div className="relative">
     <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#02040a] to-transparent z-10 pointer-events-none" />
     <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#02040a] to-transparent z-10 pointer-events-none" />

     <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
      className="flex items-center gap-12 md:gap-16 min-w-max"
     >
      {[...clients, ...clients].map((client, i) => (
       <div key={i} className="flex items-center justify-center shrink-0">
        <img
         src={client.logo}
         alt={client.name}
         className="h-8 md:h-10 w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale"
        />
       </div>
      ))}
     </motion.div>
    </div>
   </div>
  </section>
 );
}
