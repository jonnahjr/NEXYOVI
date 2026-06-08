import { motion } from 'framer-motion';

import ethioLogo from '../assets/ethio_transparent.png';
import awsLogo from '../assets/aws-25_transparent.png';
import ibmLogo from '../assets/ibm-17_transparent.png';
import microsoftLogo from '../assets/microsoft-19.png';
import oracleLogo from '../assets/oracle-21_transparent.png';
import nvidiaLogo from '../assets/nvidia-28.png';
import completeFarmerLogo from '../assets/Complete Farmer.webp';
import contrailsAiLogo from '../assets/Contrails AI.webp';
import harveyAiLogo from '../assets/Harvey AI.avif';
import paladinDronesLogo from '../assets/Paladin Drones.webp';

interface Partner {
  name: string;
  logo: string;
}

const allPartners: Partner[] = [
  { name: 'AWS', logo: awsLogo },
  { name: 'Microsoft Azure', logo: microsoftLogo },
  { name: 'IBM', logo: ibmLogo },
  { name: 'Oracle', logo: oracleLogo },
  { name: 'NVIDIA', logo: nvidiaLogo },
  { name: 'Ethio Telecom', logo: ethioLogo },
  { name: 'Complete Farmer', logo: completeFarmerLogo },
  { name: 'Contrails AI', logo: contrailsAiLogo },
  { name: 'Harvey AI', logo: harveyAiLogo },
  { name: 'Paladin Drones', logo: paladinDronesLogo },
];

const PartnerIcon = ({ partner }: { partner: Partner }) => {
  return (
    <img
      src={partner.logo}
      alt={partner.name}
      className="h-10 md:h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
    />
  );
};

export default function EthiopianPartners() {
  const maskStyle = {
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
    maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
  };

  return (
    <section className="relative py-12 md:py-16 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Trusted Clients & Partners Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500 mb-2">Trusted Clients & Partners</p>
            <p className="text-sm text-slate-400">Enterprise organizations across Africa & beyond</p>
          </motion.div>
          
          <div className="relative flex overflow-hidden" style={maskStyle}>
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
              className="flex items-center gap-10 md:gap-12 min-w-max py-2"
            >
              {[...allPartners, ...allPartners, ...allPartners].map((partner, i) => (
                <div
                  key={`partner-${i}`}
                  className="group flex items-center justify-center shrink-0 cursor-default"
                >
                  <div className="flex items-center justify-center shrink-0">
                    <PartnerIcon partner={partner} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
