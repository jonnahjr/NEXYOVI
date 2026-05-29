import { motion } from 'framer-motion';
import { ChevronRight, Cloud, Cpu, Network, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE_EXPO, revealUp, staggerContainer } from '../lib/animations';

const features = [
  { title: 'Global Cloud Architecture', desc: 'Highly available, multi-region deployments engineered for absolute zero downtime.', icon: Cloud },
  { title: 'Enterprise Connectivity', desc: 'Secure, high-bandwidth SD-WAN and dedicated fiber routing systems.', icon: Network },
  { title: 'Server Automation', desc: 'Infrastructure as Code (IaC) deployment pipelines and auto-scaling.', icon: Server },
];

export default function NetworkInfraSection() {
  return (
    <section className="section-cinematic bg-[#F8F5EB] border-t border-slate-200">
      <div className="container relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Visual (Topology Map) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: EASE_EXPO }}
            className="order-2 lg:order-1 relative w-full aspect-square md:aspect-[4/3] lg:aspect-square"
          >
            <div className="absolute inset-0 rounded-[2rem] border border-slate-200 bg-white overflow-hidden flex items-center justify-center card-hud">

              {/* Background Glow */}
              <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(148,163,184,0.08)_0%,_transparent_70%)]" />

              {/* Topology Nodes */}
              <div className="relative w-full h-full max-w-md max-h-md">

                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px rgba(148,163,184,0.2))' }}>
                  {/* Diamond */}
                  <line x1="50%" y1="20%" x2="20%" y2="50%" stroke="rgba(148,163,184,0.4)" strokeWidth="2" />
                  <line x1="20%" y1="50%" x2="50%" y2="80%" stroke="rgba(148,163,184,0.4)" strokeWidth="2" />
                  <line x1="50%" y1="80%" x2="80%" y2="50%" stroke="rgba(148,163,184,0.4)" strokeWidth="2" />
                  <line x1="80%" y1="50%" x2="50%" y2="20%" stroke="rgba(148,163,184,0.4)" strokeWidth="2" />

                  {/* Cross */}
                  <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="rgba(148,163,184,0.4)" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="rgba(148,163,184,0.4)" strokeWidth="2" strokeDasharray="4 4" />

                  {/* Animated Data Packets */}
                  <circle r="3" fill="#475569" className="animate-data-flow">
                    <animate attributeName="cx" values="50%;20%" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="20%;50%" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle r="3" fill="#475569" className="animate-data-flow" style={{ animationDelay: '1s' }}>
                    <animate attributeName="cx" values="20%;50%" dur="3s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="50%;80%" dur="3s" begin="1s" repeatCount="indefinite" />
                  </circle>
                  <circle r="3" fill="#475569" className="animate-data-flow" style={{ animationDelay: '0.5s' }}>
                    <animate attributeName="cx" values="80%;50%" dur="3s" begin="0.5s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="50%;20%" dur="3s" begin="0.5s" repeatCount="indefinite" />
                  </circle>
                  <circle r="3" fill="#475569" className="animate-data-flow" style={{ animationDelay: '1.5s' }}>
                    <animate attributeName="cx" values="50%;80%" dur="3s" begin="1.5s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="80%;50%" dur="3s" begin="1.5s" repeatCount="indefinite" />
                  </circle>
                </svg>

                {/* Node: Top */}
                <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-[0_0_20px_rgba(148,163,184,0.25)] z-10">
                  <Cloud size={20} className="text-slate-700" />
                </div>

                {/* Node: Left */}
                <div className="absolute top-[50%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-[0_0_20px_rgba(148,163,184,0.25)] z-10">
                  <Server size={20} className="text-slate-700" />
                </div>

                {/* Node: Right */}
                <div className="absolute top-[50%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-[0_0_20px_rgba(148,163,184,0.25)] z-10">
                  <Database size={20} className="text-slate-700" />
                </div>

                {/* Node: Bottom */}
                <div className="absolute top-[80%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-[0_0_20px_rgba(148,163,184,0.25)] z-10">
                  <Cpu size={20} className="text-slate-700" />
                </div>

                {/* Center Core */}
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center shadow-[0_0_40px_rgba(148,163,184,0.25)] z-10 animate-pulse">
                  <Network size={24} className="text-slate-800" />
                </div>

              </div>

              {/* Status Overlay */}
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                <div className="w-2 h-2 rounded-full bg-slate-700 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">System Optimal</span>
              </div>

            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="order-1 lg:order-2"
          >
            <motion.div variants={revealUp} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[12px] font-medium tracking-wide">
                <Network size={14} />
                Network & Cloud Infrastructure
              </div>
            </motion.div>

            <motion.h2 variants={revealUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1] mb-6">
              Scalable Systems. <br />
              <span className="text-slate-600">Zero Downtime.</span>
            </motion.h2>

            <motion.p variants={revealUp} className="text-slate-700 text-[15px] font-medium leading-relaxed mb-10 max-w-lg">
              We design, build, and operate resilient enterprise networks and cloud environments capable of handling massive throughput with uncompromising reliability.
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-6 mb-12">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={i} variants={revealUp} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-slate-700" />
                    </div>
                    <div>
                      <h4 className="text-slate-950 font-bold text-[14px] mb-1">{feature.title}</h4>
                      <p className="text-slate-600 text-[13px] leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={revealUp}>
              <Link to="/services/networking" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-950 text-white font-medium text-[14px] transition-all hover:bg-slate-800">
                View Infrastructure Solutions
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function Database(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}
