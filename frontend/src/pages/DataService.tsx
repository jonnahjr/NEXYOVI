import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, Network, LineChart, Cpu, LayoutGrid, ShieldCheck } from 'lucide-react';
import { staggerContainer, EASE_EXPO, revealUp } from '../lib/animations';

export default function DataService() {
  return (
    <>
      
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-[#10b981]/10 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 opacity-[0.03] animate-grid-drift"
            style={{
              backgroundImage: `linear-gradient(rgba(16,185,129,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.6) 1px, transparent 1px)`,
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
              <div className="badge w-fit !bg-[#10b981]/10 !border-[#10b981]/30 !text-[#34d399]">
                <Database size={12} />
                Data & Analytics
              </div>
            </motion.div>

            <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[0.95] tracking-tight mb-8">
              Data Flow <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] to-[#10b981]">Engineering.</span>
            </motion.h1>

            <motion.p variants={revealUp} className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
              We design real-time data pipelines and analytics platforms that turn massive enterprise datasets into immediate operational advantages.
            </motion.p>

            <motion.div variants={revealUp}>
               <Link to="/contact" className="btn-primary group !bg-[#10b981]/20 !border-[#10b981]/40 !shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:!bg-[#10b981]/30 hover:!shadow-[0_0_40px_rgba(16,185,129,0.5)] !text-white">
                 Build Data Systems
                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES ── */}
      <section className="py-24 bg-[#050816]">
        <div className="container mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: 'Enterprise Data Lakes', d: 'Scalable repositories aggregating structured and unstructured data across your entire organization.', i: Database },
              { t: 'Streaming Pipelines', d: 'Real-time event processing using Kafka and Flink for immediate reaction to market shifts.', i: Network },
              { t: 'Predictive Modeling', d: 'Applying statistical modeling and machine learning to forecast trends and optimize resources.', i: LineChart },
              { t: 'Data Engineering', d: 'Robust ETL/ELT workflows that clean, transform, and prepare data for advanced analytics.', i: Cpu },
              { t: 'Business Intelligence', d: 'Custom dashboard development rendering complex data into clear, actionable executive insights.', i: LayoutGrid },
              { t: 'Data Governance', d: 'Strict access controls, anonymization, and compliance mapping to protect sensitive corporate assets.', i: ShieldCheck },
            ].map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_EXPO }}
                className="card-hud p-8 group border-[#10b981]/10 hover:border-[#10b981]/30"
              >
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#34d399] mb-6 group-hover:bg-[#10b981]/20 transition-all">
                  <cap.i size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-[#34d399] transition-colors">{cap.t}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{cap.d}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </>
  );
}
