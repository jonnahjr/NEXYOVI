import { motion } from 'framer-motion';
import { Activity, Bot, BrainCircuit, ChevronRight, LineChart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE_EXPO, revealUp, staggerContainer } from '../lib/animations';

const aiCapabilities = [
  { title: 'Predictive Analytics', desc: 'Forecasting models utilizing massive datasets for strategic foresight.', icon: LineChart },
  { title: 'Intelligent Automation', desc: 'Replacing manual bottlenecks with autonomous workflow agents.', icon: Bot },
  { title: 'Custom LLM Integration', desc: 'Enterprise-grade language models trained on proprietary corporate data.', icon: BrainCircuit },
];

export default function AIIntelligenceSection() {
  return (
    <section className="section-cinematic bg-[#F8F5EB] border-t border-slate-200 relative overflow-hidden">

      {/* Background aurora */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-100 blur-[120px] rounded-full mix-blend-screen" />
      </div>

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
                <Zap size={14} />
                Artificial Intelligence Systems
              </div>
            </motion.div>

            <motion.h2 variants={revealUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1] mb-6">
              Neural <span className="text-slate-600">Intelligence.</span><br />
              Enterprise Scale.
            </motion.h2>

            <motion.p variants={revealUp} className="text-slate-700 text-[15px] font-medium leading-relaxed mb-10 max-w-lg">
              We deploy advanced machine learning pipelines and custom LLM architectures to transform raw enterprise data into predictive operational intelligence.
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-6 mb-12">
              {aiCapabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <motion.div key={i} variants={revealUp} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors card-hud">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-slate-700" />
                    </div>
                    <div>
                      <h4 className="text-slate-950 font-bold text-[14px] mb-1">{cap.title}</h4>
                      <p className="text-slate-600 text-[13px] leading-relaxed">{cap.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={revealUp}>
              <Link to="/services/ai" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-950 text-white font-medium text-[14px] transition-all hover:bg-slate-800">
                Explore AI Solutions
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: EASE_EXPO }}
            className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square"
          >
            <div className="absolute inset-0 rounded-[2rem] border border-slate-200 bg-white overflow-hidden flex items-center justify-center card-hud shadow-2xl">

              {/* Brain / Network abstract */}
              <div className="relative w-full h-full flex items-center justify-center">

                {/* Central Core */}
                <div className="absolute w-32 h-32 rounded-full bg-slate-100 blur-xl" />
                <div className="relative z-10 w-24 h-24 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-[0_0_50px_rgba(148,163,184,0.25)]">
                  <BrainCircuit size={40} className="text-slate-800" />
                </div>

                {/* Orbiting Elements */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-full animate-[spin_10s_linear_infinite]"
                    style={{ animationDelay: `-${i * 1.5}s`, animationDuration: `${10 + i * 2}s` }}
                  >
                    <div
                      className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-500 shadow-[0_0_10px_rgba(71,85,105,0.4)]"
                      style={{
                        transform: `rotate(${i * 60}deg) translateY(-${100 + i * 15}px)`
                      }}
                    />
                  </div>
                ))}

                {/* UI Elements */}
                <div className="absolute top-8 left-8 bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-2 shadow-sm">
                  <div className="text-[10px] font-medium text-slate-600">Processing Model</div>
                  <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-slate-400 rounded-full" />
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-4 shadow-sm">
                  <div>
                    <div className="text-[10px] font-medium text-slate-600">Confidence</div>
                    <div className="text-slate-950 font-mono font-bold">99.8%</div>
                  </div>
                  <Activity size={20} className="text-slate-500" />
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
