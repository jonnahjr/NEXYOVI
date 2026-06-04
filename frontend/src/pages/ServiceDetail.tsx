import { useParams, Navigate } from 'react-router-dom';
import { SERVICES } from '../constants/services';
import { motion } from 'framer-motion';
import { EASE_EXPO } from '../lib/animations';
import TextReveal from '../components/TextReveal';
import { CTAButton } from '../components/CTAButton';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function ServiceDetail() {
  const { serviceId } = useParams();
  
  if (!serviceId || !SERVICES[serviceId]) {
    return <Navigate to="/services" replace />;
  }

  const service = SERVICES[serviceId];
  const Icon = service.icon;

  return (
    <div className="bg-[#02040a] min-h-screen text-white pt-32 pb-24">
      <div className="container max-w-5xl mx-auto px-6">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_EXPO }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#F5A800]/20 backdrop-blur-md mb-8">
            <Icon size={14} className="text-[#F5A800]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A800]">
              Service Detail
            </span>
          </div>

          <TextReveal>
            <h1 className="text-4xl md:text-6xl font-black tracking-[-0.04em] mb-6">
              {service.title}
            </h1>
          </TextReveal>
          
          <TextReveal delay={0.1}>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {service.description}
            </p>
          </TextReveal>
        </motion.div>

        {/* Capabilities */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {service.capabilities.map((cap, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl"
              >
                <h3 className="text-lg font-bold text-[#F5A800] mb-2">{cap.title}</h3>
                <p className="text-white/60 text-sm">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Technology Stack</h2>
          <div className="flex flex-wrap gap-3">
            {service.techStack.map((tech, idx) => (
              <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Illustrative Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {service.caseStudies.map((study, idx) => (
              <div key={idx} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col gap-4">
                <h3 className="font-bold text-lg">{study.title}</h3>
                <div className="flex items-start gap-2 text-sm text-emerald-400">
                  <CheckCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{study.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-12 border-t border-white/10">
          <h2 className="text-3xl font-bold mb-6">Ready to start your project?</h2>
          <CTAButton className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5A800] text-black font-bold rounded-full hover:bg-[#F5A800]/90 transition-colors">
            Schedule Consultation <ArrowRight size={16} />
          </CTAButton>
        </div>

      </div>
    </div>
  );
}
