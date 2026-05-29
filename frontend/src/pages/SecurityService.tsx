import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldAlert, Crosshair, Lock, Search, Activity, Server, FileDigit } from 'lucide-react';
import { staggerContainer, EASE_EXPO, revealUp } from '../lib/animations';

export default function SecurityService() {
  return (
    <>
      
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#ef4444]/10 blur-[120px] rounded-full mix-blend-screen" />
          {/* Radar background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] rounded-full border border-[#ef4444]/5 opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border border-[#ef4444]/10 opacity-20 animate-pulse-ring" />
          <div className="absolute inset-0 opacity-[0.03] animate-grid-drift"
            style={{
              backgroundImage: `linear-gradient(rgba(239,68,68,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.6) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }} />
        </div>

        <div className="container relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <motion.div variants={revealUp} className="mb-8">
              <div className="badge-red w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse shadow-[0_0_8px_#ef4444]" />
                Defense Protocol
              </div>
            </motion.div>

            <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[0.95] tracking-tight mb-8">
              Military-Grade <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f87171] to-[#ef4444]">Cyber Defense.</span>
            </motion.h1>

            <motion.p variants={revealUp} className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
              We deploy advanced cyber defense ecosystems designed to anticipate, detect, and neutralize nation-state level threats before they penetrate your perimeter.
            </motion.p>

            <motion.div variants={revealUp}>
               <Link to="/contact" className="btn-primary group !bg-[#ef4444]/10 !border-[#ef4444]/30 !shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:!bg-[#ef4444]/20 hover:!shadow-[0_0_40px_rgba(239,68,68,0.4)] !text-[#f87171]">
                 Engage Security Team
                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES ── */}
      <section className="py-24 bg-[#F8F5EB] border-t border-slate-200">
        <div className="container mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: 'Penetration Testing', d: 'Controlled, military-grade simulated attacks to identify and patch vulnerabilities before adversaries exploit them.', i: Crosshair },
              { t: 'Zero-Trust Architecture', d: 'Continuous verification systems requiring strict authentication for every user and device, regardless of location.', i: Lock },
              { t: 'SOC Operations', d: '24/7/365 active threat monitoring, hunting, and incident response managed by elite security engineers.', i: ShieldAlert },
              { t: 'Vulnerability Assessment', d: 'Comprehensive scanning and architectural review of enterprise networks, cloud instances, and applications.', i: Search },
              { t: 'Endpoint Protection', d: 'Next-generation EDR deployment blocking malware, ransomware, and advanced persistent threats at the source.', i: Server },
              { t: 'Compliance & Auditing', d: 'Ensuring alignment with ISO 27001, SOC-2, GDPR, and other global regulatory frameworks.', i: FileDigit },
            ].map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_EXPO }}
                className="card-hud p-8 group bg-white border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.06)] rounded-[32px] hover:shadow-[0_25px_80px_rgba(15,23,42,0.1)] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 mb-6 group-hover:bg-slate-200 transition-all">
                  <cap.i size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-4 tracking-tight">{cap.t}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{cap.d}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── LIVE METRICS / DASHBOARD ── */}
      <section className="py-24 bg-[#F8F5EB] relative overflow-hidden border-t border-slate-200">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             
             <div>
                <div className="text-slate-700 text-xs font-black uppercase tracking-[0.4em] mb-4">Command Center</div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight mb-6">Real-Time Threat Visualization.</h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-8">
                  Our Security Operations Center (SOC) provides complete visibility into your enterprise perimeter, automatically neutralizing anomalous behavior through advanced SIEM protocols.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                   <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Response Time</div>
                      <div className="text-3xl font-mono font-black text-slate-950">&lt; 5ms</div>
                   </div>
                   <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Threat Block Rate</div>
                      <div className="text-3xl font-mono font-black text-slate-950">99.99%</div>
                   </div>
                </div>
             </div>

             {/* Animated Dashboard Visual */}
             <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[24px] bg-white border border-slate-200 overflow-hidden card-hud shadow-[0_20px_60px_rgba(15,23,42,0.08)] flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(148,163,184,0.12)_0%,_transparent_70%)]" />
                
                {/* Radar Line */}
                <div className="absolute w-[80%] h-[80%] rounded-full animate-radar origin-center pointer-events-none">
                  <div className="w-1/2 h-1/2 bg-gradient-to-br from-transparent via-transparent to-slate-300/40 rounded-tl-full border-l-2 border-slate-300" />
                </div>

                <Activity size={48} className="text-slate-700 animate-pulse" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 flex justify-between items-center shadow-sm">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.25)]" />
                      <span className="text-[10px] font-mono font-black text-slate-700 uppercase tracking-widest">System Secure</span>
                   </div>
                   <div className="text-[10px] font-mono text-slate-500">NODE_ACTIVE</div>
                </div>
             </div>

          </div>
        </div>
      </section>

    </>
  );
}
