import { motion } from 'framer-motion';
import { Activity, Globe, Server } from 'lucide-react';

import ethio from '../assets/ethio_transparent.png';
import cbe from '../assets/cbe_transparent.png';
import zemen from '../assets/zemen-bank-logo_transparent.png';
import insa from '../assets/Insa-09_transparent.png';
import global from '../assets/global_transparent.png';
import aau from '../assets/aau-02_transparent.png';
import aastu from '../assets/aastu-01_transparent.png';
import bdu from '../assets/bdu-05.png';
import hawasa from '../assets/Hawasa-08_transparent.png';
import hp from '../assets/hp-22_transparent.png';
import ibm from '../assets/ibm-17_transparent.png';
import oracle from '../assets/oracle-21_transparent.png';
import aws from '../assets/aws-25_transparent.png';
import anthropic from '../assets/Anthropic.webp';
import asoriba from '../assets/Asoriba.png';
import completeFarmer from '../assets/Complete Farmer.webp';
import contrails from '../assets/Contrails AI.webp';
import freshworks from '../assets/Freshworks.jpg';
import harvey from '../assets/Harvey AI.avif';
import kudobuzz from '../assets/Kudobuzz.png';
import paladin from '../assets/Paladin Drones.webp';
import panjaya from '../assets/Panjaya.png';
import poolside from '../assets/Poolside AI.png';
import replit from '../assets/Replit.png';
import stackblitz from '../assets/StackBlitz.webp';
import tcs from '../assets/TCS (Tata Consultancy Services).png';
import yampa from '../assets/Yampa.png';
import zoho from '../assets/Zoho.png';

const clients = [
  { name: 'Commercial Bank of Ethiopia', logo: cbe },
  { name: 'Zemen Bank', logo: zemen },
  { name: 'INSA', logo: insa },
  { name: 'Global Bank', logo: global },
  { name: 'Addis Ababa University', logo: aau },
  { name: 'AASTU', logo: aastu },
  { name: 'Bahir Dar University', logo: bdu },
  { name: 'Ethio Telecom', logo: ethio },
  { name: 'Hawassa University', logo: hawasa },
  { name: 'HP', logo: hp },
  { name: 'IBM', logo: ibm },
  { name: 'Oracle', logo: oracle },
  { name: 'AWS', logo: aws },
  { name: 'Anthropic', logo: anthropic },
  { name: 'Asoriba', logo: asoriba },
  { name: 'Complete Farmer', logo: completeFarmer },
  { name: 'Contrails AI', logo: contrails },
  { name: 'Freshworks', logo: freshworks },
  { name: 'Harvey AI', logo: harvey },
  { name: 'Kudobuzz', logo: kudobuzz },
  { name: 'Paladin Drones', logo: paladin },
  { name: 'Panjaya', logo: panjaya },
  { name: 'Poolside AI', logo: poolside },
  { name: 'Replit', logo: replit },
  { name: 'StackBlitz', logo: stackblitz },
  { name: 'TCS', logo: tcs },
  { name: 'Yampa', logo: yampa },
  { name: 'Zoho', logo: zoho },
];

const techLogos = [
  { name: 'Palantir', url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Palantir_Technologies_logo.svg' },
  { name: 'Anduril', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Anduril_Industries_Logo.svg' },
  { name: 'OpenAI', url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
];

export default function TrustLogos() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Heading — compact, subtle */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h2 className="text-slate-500 text-xs font-bold uppercase tracking-[0.25em]">
            Technologies & Organizations We've Worked With
          </h2>
        </motion.div>

        {/* Client logos — auto-scrolling marquee, non-stop */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ ease: 'linear', duration: 50, repeat: Infinity }}
              className="flex items-center gap-10 md:gap-14 min-w-max"
            >
              {[...clients, ...clients].map((client, i) => (
                <div key={i} className="flex items-center justify-center shrink-0">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-7 md:h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}