import { motion } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  Briefcase,
  Code,
  Network,
  Settings,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const capabilities = [
  {
    id: "01",
    segment: "Segment 01",
    title: "Networking Solutions",
    icon: <Network size={24} />,
    desc: "Design, implement, and manage secure and scalable network infrastructures that ensure seamless connectivity and performance.",
    benefits: ["Reliable & secure connectivity", "Optimized network performance", "Scalable for future growth"],
    color: "from-blue-500/20 to-cyan-500/5",
    accent: "text-blue-400"
  },
  {
    id: "02",
    segment: "Segment 02",
    title: "Software Development",
    icon: <Code size={24} />,
    desc: "End-to-end custom software development engineered for extreme reliability and high-performance throughput. We specialize in building complex distributed systems.",
    benefits: [
      "Clean, maintainable architecture",
      "Agile/Scrum delivery model",
      "Scalable & future-ready systems",
      "Automated CI/CD pipelines",
      "Zero-downtime deployment",
      "High-throughput optimization"
    ],
    color: "from-violet-500/20 to-purple-500/5",
    accent: "text-violet-400"
  },
  {
    id: "03",
    segment: "Segment 03",
    title: "Custom Software",
    icon: <Settings size={24} />,
    desc: "We build tailored software solutions aligned with your unique business processes and operational requirements.",
    benefits: ["Fully customized workflows", "Legacy system integration", "Complete ownership & flexibility"],
    color: "from-emerald-500/20 to-teal-500/5",
    accent: "text-emerald-400"
  },
  {
    id: "04",
    segment: "Segment 04",
    title: "Web & Mobile App Development",
    icon: <Smartphone size={24} />,
    desc: "We create engaging, responsive, and user-friendly web and mobile applications that deliver exceptional experiences.",
    benefits: ["Cross-platform compatibility", "Responsive & modern UI/UX", "High performance & security"],
    color: "from-rose-500/20 to-orange-500/5",
    accent: "text-rose-400"
  },
  {
    id: "05",
    segment: "Segment 05",
    title: "AI-Based Systems",
    icon: <BrainCircuit size={24} />,
    desc: "Leverage the power of AI and machine learning to automate processes, gain insights, and drive smarter decisions.",
    benefits: ["Intelligent automation", "Predictive analytics & insights", "Data-driven decisions"],
    color: "from-amber-500/20 to-yellow-500/5",
    accent: "text-amber-400"
  },
  {
    id: "06",
    segment: "Segment 06",
    title: "Cybersecurity Solutions",
    icon: <ShieldCheck size={24} />,
    desc: "Protect your business with our advanced security frameworks, assessments, and threat mitigation strategies.",
    benefits: ["Advanced threat detection", "Data protection & encryption", "Compliance & risk management"],
    color: "from-red-500/20 to-rose-500/5",
    accent: "text-red-400"
  },
  {
    id: "07",
    segment: "Segment 07",
    title: "IT Consulting & Digital Transformation",
    icon: <Briefcase size={24} />,
    desc: "Strategic consulting and digital transformation services to modernize your IT ecosystem and drive growth.",
    benefits: ["Strategic IT roadmap", "Operational efficiency", "Scalable transformation"],
    color: "from-indigo-500/20 to-blue-500/5",
    accent: "text-indigo-400"
  }
];

const ServicesOverview = () => {
  return (
    <section id="services" className="bg-[#02040a] py-32 relative overflow-hidden border-b border-white/5">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mb-24"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span className="text-sm font-black text-blue-400 uppercase tracking-[0.3em]">Full-Spectrum Dominance</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
            Core Technical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Capabilities</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl font-medium leading-relaxed">
            Engineered for performance. Built for scale. Secured by design.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-24 auto-rows-[240px]"
        >
          {capabilities.map((cap, i) => {
            let spanClass = "md:col-span-1 md:row-span-1";
            let isVertical = false;

            if (i === 0) { spanClass = "md:col-span-2 md:row-span-1"; }
            else if (i === 1) { spanClass = "md:col-span-1 md:row-span-2"; isVertical = true; }
            else if (i === 3) { spanClass = "md:col-span-2 md:row-span-1"; }
            else if (i === 5) { spanClass = "md:col-span-2 md:row-span-1"; }
            else if (i === 6) { spanClass = "md:col-span-2 md:row-span-1"; }

            return (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`group relative p-6 rounded-[24px] bg-[#12151E] border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden flex flex-col h-full ${spanClass} shadow-2xl shadow-black/40 cursor-pointer`}
              >
                {/* Full Box Link Overlay */}
                <Link to="/services" className="absolute inset-0 z-20" />

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Number Overlay */}
                <span className="absolute top-4 right-5 text-white/[0.03] font-mono text-4xl font-black italic select-none group-hover:text-blue-500/5 transition-colors">
                  {cap.id}
                </span>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header: Icon + Title */}
                  <div className="flex items-center gap-3 mb-3 shrink-0">
                    <div className={`w-9 h-9 rounded-lg bg-white/[0.03] flex items-center justify-center ${cap.accent} border border-white/10 group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-all duration-500`}>
                      {cap.icon}
                    </div>
                    <div>
                      <span className="text-xs font-black text-white/40 uppercase tracking-[0.2em] block mb-1">{cap.segment}</span>
                      <h3 className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors">{cap.title}</h3>
                    </div>
                  </div>

                  {/* Scrollable Content Area */}
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 relative z-30">
                    <div className="inline-flex items-center gap-1.5 text-blue-400/60 hover:text-blue-400 text-xs font-black uppercase tracking-[0.2em] transition-colors group/link mb-1">
                      Explore Protocol
                      <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                    </div>

                    <p className="text-white/60 text-sm leading-relaxed font-medium group-hover:text-white/80 transition-colors">
                      {cap.desc}
                    </p>

                    <div className="pt-3 border-t border-white/10">
                      <span className="text-xs font-black text-white/40 uppercase tracking-widest block mb-2">Strategic Benefits</span>
                      <div className="grid grid-cols-1 gap-2">
                        {cap.benefits.map((benefit, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${cap.accent.replace('text-', 'bg-').replace('400', '500/60')} group-hover:bg-blue-400 transition-colors`} />
                            <span className="text-white/60 text-xs font-bold group-hover:text-white/90 transition-colors">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <style>{`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 2px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                  }
                  .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                  }
                `}</style>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesOverview;

