import React from 'react';
import { motion } from 'framer-motion';

// Imports
import ethio from '../assets/ethio_transparent.png';
import cbe from '../assets/cbe_transparent.png';
import zemen from '../assets/zemen-bank-logo_transparent.png';
import insa from '../assets/Insa-09_transparent.png';
import global from '../assets/global_transparent.png';
import aau from '../assets/aau-02_transparent.png';
import aastu from '../assets/aastu-01_transparent.png';
import bdu from '../assets/bdu-05.png';
import hawassa from '../assets/Hawasa-08_transparent.png';
import aws from '../assets/aws-25_transparent.png';
import hp from '../assets/hp-22_transparent.png';
import ibm from '../assets/ibm-17_transparent.png';
import microsoft from '../assets/microsoft-19.png';
import oracle from '../assets/oracle-21_transparent.png';
import nvidia from '../assets/nvidia-28.png';

const partners = [
 { name: 'Ethio Telecom', logo: ethio },
 { name: 'Commercial Bank of Ethiopia', logo: cbe },
 { name: 'Zemen Bank', logo: zemen },
 { name: 'INSA', logo: insa },
 { name: 'Addis Ababa University', logo: aau },
 { name: 'AASTU', logo: aastu },
 { name: 'Bahir Dar University', logo: bdu },
 { name: 'Hawassa University', logo: hawassa },
 { name: 'AWS', logo: aws },
 { name: 'HP', logo: hp },
 { name: 'IBM', logo: ibm },
 { name: 'Microsoft', logo: microsoft },
 { name: 'Oracle', logo: oracle },
 { name: 'NVIDIA', logo: nvidia }
];

const PartnerCarousel = () => {
 return (
 <section className="relative bg-[#FCFBF8] py-20 overflow-hidden">
 {/* Subtle background pattern */}
 <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(37,99,235,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
 
 <div className="container mx-auto px-6 lg:px-12 relative z-10">
 <div className="text-center mb-16">
 <motion.h4 
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="text-xs font-black text-[#F5A800] uppercase tracking-[0.3em] mb-3"
 >
 Trusted by
 </motion.h4>
 
 <motion.h2 
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.1 }}
 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter"
 >
 Enterprises, Institutions & Technology Leaders
 </motion.h2>
 </div>

 <div className="relative z-10 flex overflow-hidden">
 {/* Gradient fades for seamless border transition */}
 <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#FCFBF8] to-transparent z-20 pointer-events-none" />
 <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#FCFBF8] to-transparent z-20 pointer-events-none" />

 <motion.div 
 className="flex whitespace-nowrap items-center py-4"
 animate={{ x: ["0%", "-50%"] }}
 transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
 >
 {/* Multi-pass for seamless looping */}
 {[...partners, ...partners].map((partner, i) => (
 <div 
 key={i} 
 className="flex flex-col items-center justify-center px-6 lg:px-8 group min-w-[140px] lg:min-w-[200px] cursor-default"
 >
 <img 
 src={partner.logo} 
 alt={partner.name} 
 className="h-[40px] lg:h-[50px] w-auto opacity-60 group-hover:opacity-80 transition-all duration-300 object-contain"
 onError={(e) => {
 const target = e.target as HTMLImageElement;
 target.style.display = 'none';
 const fallback = target.nextElementSibling as HTMLElement;
 if (fallback) fallback.style.display = 'block';
 }}
 />
 </div>
 ))}
 </motion.div>
 </div>
 </div>
 </section>
 );
};

export default PartnerCarousel;
