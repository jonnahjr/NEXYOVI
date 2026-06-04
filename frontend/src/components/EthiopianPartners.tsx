import { motion } from 'framer-motion';

import ethioLogo from '../assets/ethio_transparent.png';
import cbeLogo from '../assets/cbe_transparent.png';
import insaLogo from '../assets/Insa-09_transparent.png';

interface Partner {
  name: string;
  desc: string;
  abbr: string;
  logo?: string;
}

const partners: Partner[] = [
  { name: 'Ethio Telecom', desc: 'National telecommunications', abbr: 'ET', logo: ethioLogo },
  { name: 'Commercial Bank of Ethiopia', desc: 'State-owned banking', abbr: 'CBE', logo: cbeLogo },
  { name: 'Ethiopian Airlines', desc: 'National aviation carrier', abbr: 'EAL' },
  { name: 'INSA', desc: 'Information Network Security', abbr: 'INSA', logo: insaLogo },
  { name: 'Awash Bank', desc: 'Private commercial banking', abbr: 'AB' },
  { name: 'Dashen Bank', desc: 'Private banking & finance', abbr: 'DB' },
  { name: 'Safaricom Ethiopia', desc: 'Telecom & mobile money', abbr: 'SAF' },
  { name: 'EEA', desc: 'Ethiopian Electric Authority', abbr: 'EEA' },
];

const PartnerIcon = ({ partner }: { partner: Partner }) => {
  if (partner.logo) {
    return (
      <img
        src={partner.logo}
        alt={partner.name}            className="h-10 md:h-14 w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
      />
    );
  }
  return (
    <span className="text-lg md:text-2xl font-black text-slate-300 group-hover:text-[#F5A800] transition-colors duration-500 tracking-widest">
      {partner.abbr}
    </span>
  );
};

export default function EthiopianPartners() {
  return (
    <section className="relative py-20 md:py-24 bg-[#FCFBF8] border-t border-slate-200 overflow-hidden">

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F5A800] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Partnership Network</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-[-0.03em] mb-4">
            Working With Ethiopia's <span className="text-[#F5A800]">Leading Organizations</span>
          </h2>
          <p className="text-slate-500 text-base font-medium max-w-xl mx-auto">
            Collaborating with Ethiopia's top institutions and enterprises to drive digital transformation across the continent.
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ ease: 'linear', duration: 35, repeat: Infinity }}
            className="flex items-center gap-10 md:gap-14 min-w-max py-4"
          >
            {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className="group flex items-center justify-center shrink-0 cursor-default"
              >
                <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center shrink-0">
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
