import { motion } from 'framer-motion';

import aastu from '../assets/aastu-01_transparent.png';
import aau from '../assets/aau-02_transparent.png';
import anthropic from '../assets/Anthropic.webp';
import asoriba from '../assets/Asoriba.png';
import aws from '../assets/aws-25_transparent.png';
import bdu from '../assets/bdu-05.png';
import cbe from '../assets/cbe_transparent.png';
import completeFarmer from '../assets/Complete Farmer.webp';
import contrails from '../assets/Contrails AI.webp';
import ethio from '../assets/ethio_transparent.png';
import freshworks from '../assets/Freshworks.jpg';
import global from '../assets/global_transparent.png';
import harvey from '../assets/Harvey AI.avif';
import hawasa from '../assets/Hawasa-08_transparent.png';
import hp from '../assets/hp-22_transparent.png';
import ibm from '../assets/ibm-17_transparent.png';
import insa from '../assets/Insa-09_transparent.png';
import kudobuzz from '../assets/Kudobuzz.png';
import oracle from '../assets/oracle-21_transparent.png';
import paladin from '../assets/Paladin Drones.webp';
import panjaya from '../assets/Panjaya.png';
import poolside from '../assets/Poolside AI.png';
import replit from '../assets/Replit.png';
import stackblitz from '../assets/StackBlitz.webp';
import tcs from '../assets/TCS (Tata Consultancy Services).png';
import yampa from '../assets/Yampa.png';
import zemen from '../assets/zemen-bank-logo_transparent.png';
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

const techStack = [
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
  { name: 'Oracle', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg' },
  { name: 'OpenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
];

export default function TrustLogos() {
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-slate-500 text-xs font-bold uppercase tracking-[0.25em]">
            Trusted by organizations across Africa and the globe
          </h2>
        </motion.div>

        {/* Client Logos Marquee */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <motion.div
              animate={{ x: ['0%', '-100%'] }}
              transition={{ ease: 'linear', duration: 60, repeat: Infinity }}
              className="flex items-center gap-10 md:gap-14 min-w-max"
            >
              {clients.map((client, i) => (
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

        {/* Technologies & Platforms Section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-center mb-8"
        >
          <h2 className="text-slate-500 text-xs font-bold uppercase tracking-[0.25em]">
            Technologies & Platforms We Build With
          </h2>
        </motion.div>

        {/* Tech Stack Marquee */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="overflow-hidden"
          >
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
              className="flex items-center gap-12 md:gap-16 min-w-max"
            >
              {[...techStack, ...techStack].map((tech, i) => (
                <div key={i} className="flex items-center justify-center shrink-0 group">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="h-8 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
