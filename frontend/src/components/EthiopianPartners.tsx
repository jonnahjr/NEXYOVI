import { motion } from 'framer-motion';

import ethioLogo from '../assets/ethio_transparent.png';
import globalLogo from '../assets/global_transparent.png';
import awsLogo from '../assets/aws-25_transparent.png';
import hpLogo from '../assets/hp-22_transparent.png';
import ibmLogo from '../assets/ibm-17_transparent.png';
import microsoftLogo from '../assets/microsoft-19.png';
import oracleLogo from '../assets/oracle-21_transparent.png';
import nvidiaLogo from '../assets/nvidia-28.png';
import asoribaLogo from '../assets/Asoriba.png';
import completeFarmerLogo from '../assets/Complete Farmer.webp';
import contrailsAiLogo from '../assets/Contrails AI.webp';
import freshworksLogo from '../assets/Freshworks.jpg';
import harveyAiLogo from '../assets/Harvey AI.avif';
import kudobuzzLogo from '../assets/Kudobuzz.png';
import paladinDronesLogo from '../assets/Paladin Drones.webp';
import panjayaLogo from '../assets/Panjaya.png';
import poolsideAiLogo from '../assets/Poolside AI.png';
import replitLogo from '../assets/Replit.png';
import stackblitzLogo from '../assets/StackBlitz.webp';
import tcsLogo from '../assets/TCS (Tata Consultancy Services).png';
import yampaLogo from '../assets/Yampa.png';
import zohoLogo from '../assets/Zoho.png';

interface Partner {
  name: string;
  desc: string;
  abbr: string;
  logo: string;
}

const partners: Partner[] = [
  { name: 'Ethio Telecom', desc: '', abbr: '', logo: ethioLogo },
  { name: 'AWS', desc: '', abbr: '', logo: awsLogo },
  { name: 'HP', desc: '', abbr: '', logo: hpLogo },
  { name: 'IBM', desc: '', abbr: '', logo: ibmLogo },
  { name: 'Microsoft', desc: '', abbr: '', logo: microsoftLogo },
  { name: 'Oracle', desc: '', abbr: '', logo: oracleLogo },
  { name: 'NVIDIA', desc: '', abbr: '', logo: nvidiaLogo },
  { name: 'Asoriba', desc: '', abbr: '', logo: asoribaLogo },
  { name: 'Complete Farmer', desc: '', abbr: '', logo: completeFarmerLogo },
  { name: 'Contrails AI', desc: '', abbr: '', logo: contrailsAiLogo },
  { name: 'Freshworks', desc: '', abbr: '', logo: freshworksLogo },
  { name: 'Harvey AI', desc: '', abbr: '', logo: harveyAiLogo },
  { name: 'Kudobuzz', desc: '', abbr: '', logo: kudobuzzLogo },
  { name: 'Paladin Drones', desc: '', abbr: '', logo: paladinDronesLogo },
  { name: 'Panjaya', desc: '', abbr: '', logo: panjayaLogo },
  { name: 'Poolside AI', desc: '', abbr: '', logo: poolsideAiLogo },
  { name: 'Replit', desc: '', abbr: '', logo: replitLogo },
  { name: 'StackBlitz', desc: '', abbr: '', logo: stackblitzLogo },
  { name: 'TCS', desc: '', abbr: '', logo: tcsLogo },
  { name: 'Yampa', desc: '', abbr: '', logo: yampaLogo },
  { name: 'Zoho', desc: '', abbr: '', logo: zohoLogo },
];

const PartnerIcon = ({ partner }: { partner: Partner }) => {
  return (
    <img
      src={partner.logo}
      alt={partner.name}
      className="h-8 md:h-10 w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
    />
  );
};

export default function EthiopianPartners() {
  return (
    <section className="relative py-10 md:py-14 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-100 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#F5A800] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Technologies We Work With</span>
          </div>
        </motion.div>

        {/* Marquee */}
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ ease: 'linear', duration: 35, repeat: Infinity }}
            className="flex items-center gap-6 md:gap-8 min-w-max py-2"
          >
            {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className="group flex items-center justify-center shrink-0 cursor-default"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shrink-0">
                  <PartnerIcon partner={partner} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>


    </section>
  );
}
