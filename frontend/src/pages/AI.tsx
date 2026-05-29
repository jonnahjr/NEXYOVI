import React from 'react';
import { motion } from 'framer-motion';
import MetaBrain from '../components/MetaBrain';
import CTASection from '../components/CTASection';

const AIPage = () => {
  return (
    <div className="bg-[#090A0C] pt-20">
      <section className="py-32 relative overflow-hidden">
         <div className="container-narrow relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white font-bold text-7xl mb-8 tracking-tighter"
            >
               AI & <span className="text-purple-500">Automation</span>
            </motion.h1>
            <p className="text-[#797d86] text-2xl max-w-3xl leading-relaxed mb-12">
               Nexyovi AI Core drives intelligent decision-making and automates complex workflows. We build custom LLMs and predictive models for the modern enterprise.
            </p>
         </div>
         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-500/5 to-transparent pointer-events-none" />
      </section>
      
      <MetaBrain />

      <CTASection />
    </div>
  );
};

export default AIPage;

