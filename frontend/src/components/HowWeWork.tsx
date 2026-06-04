import { motion } from 'framer-motion';
import { BookOpen, Layers, Code2, Rocket, ShieldCheck } from 'lucide-react';
import { fadeUp, viewport } from '../lib/animations';

const steps = [
  {
    id: '01',
    title: 'Discovery',
    desc: 'We analyze your business needs, technical constraints, and project objectives.',
    icon: BookOpen,
  },
  {
    id: '02',
    title: 'Architecture',
    desc: 'System design, database modeling, and technical infrastructure planning.',
    icon: Layers,
  },
  {
    id: '03',
    title: 'Development',
    desc: 'Agile sprints with regular reviews, focusing on clean code and performance.',
    icon: Code2,
  },
  {
    id: '04',
    title: 'Deployment',
    desc: 'Automated CI/CD pipelines, security audits, and seamless production launch.',
    icon: Rocket,
  },
  {
    id: '05',
    title: 'Support',
    desc: 'Ongoing maintenance, proactive monitoring, and feature iteration.',
    icon: ShieldCheck,
  },
];

export default function HowWeWork() {
  return (
    <section className="relative bg-[#FCFBF8] py-32 border-t border-slate-200">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-[-0.03em] mb-6">
            How We Work
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            Our engineering process is designed for transparency, security, and long-term success. From the first whiteboard session to post-launch support.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Connector Line */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[1px] bg-slate-200 -z-10" />
                )}

                {/* Number & Icon */}
                <div className="relative w-14 h-14 md:w-16 md:h-16 bg-[#030303] rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-[#F5A800]/40 transition-all duration-300 mb-6 shadow-lg overflow-hidden">
                  {/* Subtle glassmorphism top glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                  <Icon size={24} className="text-zinc-400 group-hover:text-white transition-colors relative z-10" />
                </div>


                <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-tight">
                  {step.title}
                </h3>
                
                <p className="text-sm text-slate-600 font-medium leading-relaxed px-2">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
