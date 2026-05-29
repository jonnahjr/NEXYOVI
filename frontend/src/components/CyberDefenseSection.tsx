import { motion } from 'framer-motion';
import { ChevronRight, Crosshair, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE_EXPO, revealUp, staggerContainer } from '../lib/animations';

const capabilities = [
  { title: 'Penetration Testing', desc: 'Military-grade vulnerability assessment and exploitation simulation.' },
  { title: 'SOC Operations', desc: '24/7/365 active threat monitoring, hunting, and incident response.' },
  { title: 'Zero-Trust Architecture', desc: 'Continuous verification systems for identity and access management.' },
  { title: 'Endpoint Protection', desc: 'Next-gen EDR deployment blocking advanced persistent threats.' },
];

export default function CyberDefenseSection() {
  return (
    <section className="section-cinematic bg-[#F8F5EB] border-t border-slate-200">
      <div className="container relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={revealUp} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[12px] font-medium tracking-wide">
                <Shield size={14} />
                Cyber Defense Operations
              </div>
            </motion.div>

            <motion.h2 variants={revealUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1] mb-6">
              Military-Grade <br />
              <span className="text-slate-600">Threat Neutralization.</span>
            </motion.h2>

            <motion.p variants={revealUp} className="text-slate-700 text-[15px] font-medium leading-relaxed mb-10 max-w-lg">
              We deploy advanced cyber defense ecosystems designed to anticipate, detect, and neutralize nation-state level threats before they penetrate your perimeter.
            </motion.p>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {capabilities.map((cap, i) => (
                <motion.div key={i} variants={revealUp} className="flex gap-4 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-slate-200 transition-colors">
                    <Crosshair size={14} className="text-slate-700" />
                  </div>
                  <div>
                    <h4 className="text-slate-950 font-bold text-[14px] mb-1">{cap.title}</h4>
                    <p className="text-slate-600 text-[13px] leading-relaxed">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={revealUp}>
              <Link to="/services/security" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-950 text-white font-medium text-[14px] transition-all hover:bg-slate-800">
                Explore Defense Systems
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: EASE_EXPO }}
            className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square"
          >
            {/* Visual Container */}
            <div className="absolute inset-0 rounded-[2rem] border border-slate-200 bg-white overflow-hidden flex items-center justify-center">

              {/* Radar Grid */}
              <div className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `linear-gradient(rgba(148,163,184,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.4) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                  backgroundPosition: 'center center'
                }}
              />

              {/* Radar Circles */}
              <div className="absolute w-[80%] h-[80%] rounded-full border border-slate-200" />
              <div className="absolute w-[50%] h-[50%] rounded-full border border-slate-300" />
              <div className="absolute w-[20%] h-[20%] rounded-full border border-slate-300 bg-slate-100" />

              {/* Radar Sweep Animation */}
              <div className="absolute w-[80%] h-[80%] rounded-full animate-radar origin-center pointer-events-none">
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-transparent via-transparent to-slate-200/30 rounded-tl-full border-l border-slate-300" />
              </div>

              {/* Center Icon */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-[0_0_30px_rgba(148,163,184,0.15)]">
                <Shield size={24} className="text-slate-700" />
              </div>

              {/* Floating UI Elements */}
              <div className="absolute top-8 left-8 card-hud px-4 py-3 flex items-center gap-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
                <div className="text-[10px] font-mono text-slate-600">Perimeter Secure</div>
              </div>

              <div className="absolute bottom-12 right-8 card-hud px-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="text-[10px] font-medium text-slate-600 mb-1">Threat Level</div>
                <div className="text-xl font-mono font-bold text-slate-950">LOW_02</div>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-slate-200" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-slate-200" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-slate-200" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-slate-200" />
            </div>

            {/* Glow backing */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-slate-100 blur-[100px] rounded-full -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
