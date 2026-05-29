import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import SecurityService from './SecurityService';
import SoftwareService from './SoftwareService';
import NetworkingService from './NetworkingService';
import AIService from './AIService';
import CloudService from './CloudService';
import DataService from './DataService';
import AppDevService from './AppDevService';
import TechStackMarquee from '../components/TechStackMarquee';

const servicesMap = [
  { id: 'security', label: 'Cyber Defense', Component: SecurityService },
  { id: 'software', label: 'Software', Component: SoftwareService },
  { id: 'ai', label: 'AI', Component: AIService },
  { id: 'cloud', label: 'Cloud', Component: CloudService },
  { id: 'networking', label: 'Networking', Component: NetworkingService },
  { id: 'data', label: 'Data', Component: DataService },
  { id: 'apps', label: 'Apps', Component: AppDevService },
];

export default function Services() {
  const [activeSection, setActiveSection] = useState('security');
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, [hash]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    servicesMap.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { rootMargin: '-20% 0px -60% 0px' }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#02040a] min-h-screen relative overflow-x-clip text-white">
      
      {/* ── Sticky Sub-Navigation ── */}
      <div className="sticky top-[80px] md:top-[96px] z-50 w-full border-b border-white/[0.04] bg-[#02040a]/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-10">
            {servicesMap.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-colors relative whitespace-nowrap ${
                  activeSection === id ? 'text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                {label}
                {activeSection === id && (
                  <motion.div
                    layoutId="activeServiceSection"
                    className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#F5A800] shadow-[0_0_10px_#F5A800]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="relative z-10 flex flex-col">
        {servicesMap.map(({ id, Component }) => (
          <div id={id} key={id} className="scroll-mt-32">
            <Component />
          </div>
        ))}
      </div>

      <TechStackMarquee />
    </div>
  );
}
