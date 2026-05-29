import { motion } from 'framer-motion';
import { ArrowRight, Box, Code, Combine, ShieldCheck, Terminal, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE_EXPO, revealUp, staggerContainer } from '../lib/animations';

export default function SoftwareService() {
  return (
    <>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04] bg-[#02040a]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#F5A800]/5 blur-[120px] rounded-full mix-blend-screen" />
        </div>

        <div className="container relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <motion.div variants={revealUp} className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#F5A800]/20 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A800]">Software Engineering</span>
              </div>
            </motion.div>

            <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[1.05] tracking-[-0.04em] mb-8 text-white">
              Enterprise <br className="hidden md:block" />
              <span className="text-white/40">Architectures.</span>
            </motion.h1>

            <motion.p variants={revealUp} className="text-white/50 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
              We engineer mission-critical software systems designed for absolute scalability, extreme performance, and military-grade security.
            </motion.p>

            <motion.div variants={revealUp}>
              <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black text-[12px] uppercase tracking-widest transition-all hover:scale-105 group">
                Architect Your System
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES ── */}
      <section className="py-24 bg-[#0b0b14] relative z-10">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

            {/* Left Column: Sticky Header */}
            <div className="lg:w-1/3">
              <div className="lg:sticky lg:top-32">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#F5A800]/20 mb-6 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_6px_rgba(245,168,0,0.8)]" />
                  <span className="text-[11px] font-bold text-[#F5A800] uppercase tracking-widest">Core Capabilities</span>
                </div>

                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-6">
                  Custom <br />
                  Core <br />
                  <span className="text-[#F5A800]">Systems</span>
                </h2>
              </div>
            </div>

            {/* Right Column: Stacking Cards */}
            <div className="lg:w-2/3 flex flex-col gap-6 pb-[20vh]">
              {[
                { t: 'Custom Core Systems', d: 'Designing and delivering bespoke ERPs, payment ledgers, inventory controls, and operations platforms engineered around your exact workflows, compliance rules, and KPI requirements.', i: Terminal },
                { t: 'Microservices Design', d: 'Architecting independent, domain-focused services with resilient inter-service communication, auto-scaling boundaries, and fault-isolated deployment pipelines for continuous delivery.', i: Box },
                { t: 'Legacy Modernization', d: 'Transforming aging monoliths through incremental refactoring, API wrapping, and cloud-native replatforming to preserve business continuity while raising agility and maintainability.', i: Combine },
                { t: 'API Development', d: 'Building secure, enterprise-grade REST and GraphQL interfaces with strong authentication, rate controls, and versioned contracts that simplify integration across systems.', i: Zap },
                { t: 'Secure by Design', d: 'Embedding DevSecOps into the delivery lifecycle, combining threat modeling, automated scanning, and secure coding practices to harden systems from architecture through deployment.', i: ShieldCheck },
                { t: 'High-Performance UIs', d: 'Crafting responsive, data-rich dashboards and command centers using React, WebGL, and performance-first UI patterns for fast, decision-ready user experiences.', i: Code },
              ].map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: 0.1, duration: 0.6, ease: EASE_EXPO }}
                  className="sticky card-hud p-10 group hover:border-[#F5A800]/30 hover:bg-white/[0.02] transition-all duration-500 flex flex-col md:flex-row gap-8 items-start shadow-[0_-10px_30px_rgba(0,0,0,0.5)] border-t border-[#ffffff10]"
                  style={{ top: `${120 + i * 20}px`, zIndex: i + 10 }}
                >
                  <div className="w-16 h-16 rounded-[20px] bg-[#F5A800]/5 border border-[#F5A800]/20 flex items-center justify-center text-[#FFD166] shrink-0 group-hover:bg-[#F5A800]/20 group-hover:border-[#F5A800]/40 transition-all shadow-[0_0_20px_rgba(245,168,0,0.1)]">
                    <cap.i size={28} className="group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex flex-col w-full">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight group-hover:text-[#F5A800] transition-colors">{cap.t}</h3>
                    <p className="text-white/60 text-lg font-medium leading-relaxed max-w-lg">{cap.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </section>

    </>
  );
}
