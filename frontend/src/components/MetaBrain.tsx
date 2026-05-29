import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Calendar, FileText, RefreshCw, MessageSquare, Layout } from 'lucide-react';

const leftItems = [
  { icon: <CheckSquare size={15} />, title: 'Predictive Security.', desc: 'AI-driven threat detection and prevention.' },
  { icon: <Calendar size={15} />, title: 'Smart Auto-scaling.', desc: 'Optimize your infrastructure automatically.' },
  { icon: <FileText size={15} />, title: 'Data Analysis.', desc: 'Turn raw data into actionable business insights' },
  { icon: <RefreshCw size={15} />, title: 'Automated Devops.', desc: 'Continuous integration with intelligent monitoring.' },
];

const rightItems = [
  { icon: <MessageSquare size={15} />, title: 'AI Consultation.', desc: 'Expert guidance on integrating AI into your workflow.' },
  { icon: <Layout size={15} />, title: 'Custom LLMs.', desc: "Private AI models trained on your specific business data." },
];

const MetaBrain = () => {
  return (
    <section id="ai" className="bg-[#060709] py-40 border-t border-white/[0.04] overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
             <div className="w-12 h-px bg-gradient-to-r from-transparent to-purple-500" />
             <span className="text-purple-500 font-bold uppercase tracking-[0.5em] text-xs">Neural Intelligence</span>
             <div className="w-12 h-px bg-gradient-to-l from-transparent to-purple-500" />
          </div>
          <h2 className="text-white font-bold text-[64px] md:text-[84px] tracking-tighter leading-[0.9] mb-8">
            Nexyovi <span className="text-white/40 italic">AI Core.</span>
          </h2>
          <p className="text-[#a1a1a6] text-2xl max-w-[700px] mx-auto leading-relaxed font-medium">
            Building the next generation of enterprise autonomy. Our LLMs and predictive engines are trained on proprietary infrastructure for maximum security.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {leftItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[40px] bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 hover:bg-white/[0.04] transition-all duration-500 group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 shrink-0 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white mb-2 tracking-tight">{item.title}</p>
                    <p className="text-sm text-[#a1a1a6] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center: Brain Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center relative py-20"
          >
            {/* Massive Outer Glow */}
            <div className="absolute inset-0 bg-purple-600/10 blur-[120px] rounded-full scale-150" />
            
            <div className="relative w-[300px] h-[300px]">
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-purple-500/20"
              />
              {/* Middle ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 rounded-full border border-dashed border-purple-500/40"
              />
              {/* Core Visual */}
              <div className="absolute inset-16 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.3)_0%,transparent_70%)] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-black border border-purple-500/50 flex items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.4)] overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent" />
                   <span className="text-white text-4xl font-black relative z-10">N</span>
                </div>
              </div>
              {/* Orbiting points */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15 + i * 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                  style={{ transformOrigin: 'center' }}
                >
                  <div
                    className="absolute w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${deg}deg) translateY(-145px) translateX(-6px)`,
                      opacity: 0.6 + (i * 0.05)
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {rightItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[40px] bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 hover:bg-white/[0.04] transition-all duration-500 group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 shrink-0 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white mb-2 tracking-tight">{item.title}</p>
                    <p className="text-sm text-[#a1a1a6] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetaBrain;

