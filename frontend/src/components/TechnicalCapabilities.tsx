import { motion, type Variants } from 'framer-motion';
import {
  BrainCircuit,
  Briefcase,
  ChevronRight,
  Code,
  Network,
  Settings,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
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
    color: "from-[#F5A800]/20 to-transparent",
    accent: "text-[#F5A800]"
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
    color: "from-[#F5A800]/20 to-transparent",
    accent: "text-[#F5A800]"
  },
  {
    id: "03",
    segment: "Segment 03",
    title: "Custom Software",
    icon: <Settings size={24} />,
    desc: "We build tailored software solutions aligned with your unique business processes and operational requirements.",
    benefits: ["Fully customized workflows", "Legacy system integration", "Complete ownership & flexibility"],
    color: "from-[#F5A800]/20 to-transparent",
    accent: "text-[#F5A800]"
  },
  {
    id: "04",
    segment: "Segment 04",
    title: "Web & Mobile App Development",
    icon: <Smartphone size={24} />,
    desc: "We create engaging, responsive, and user-friendly web and mobile applications that deliver exceptional experiences.",
    benefits: ["Cross-platform compatibility", "Responsive & modern UI/UX", "High performance & security"],
    color: "from-[#F5A800]/20 to-transparent",
    accent: "text-[#F5A800]"
  },
  {
    id: "05",
    segment: "Segment 05",
    title: "AI-Based Systems",
    icon: <BrainCircuit size={24} />,
    desc: "Leverage the power of AI and machine learning to automate processes, gain insights, and drive smarter decisions.",
    benefits: ["Intelligent automation", "Predictive analytics & insights", "Data-driven decisions"],
    color: "from-[#F5A800]/20 to-transparent",
    accent: "text-[#F5A800]"
  },
  {
    id: "06",
    segment: "Segment 06",
    title: "Cybersecurity Solutions",
    icon: <ShieldCheck size={24} />,
    desc: "Protect your business with our advanced security frameworks, assessments, and threat mitigation strategies.",
    benefits: ["Advanced threat detection", "Data protection & encryption", "Compliance & risk management"],
    color: "from-[#F5A800]/20 to-transparent",
    accent: "text-[#F5A800]"
  },
  {
    id: "07",
    segment: "Segment 07",
    title: "IT Consulting & Digital Transformation",
    icon: <Briefcase size={24} />,
    desc: "Strategic consulting and digital transformation services to modernize your IT ecosystem and drive growth.",
    benefits: ["Strategic IT roadmap", "Operational efficiency", "Scalable transformation"],
    color: "from-[#F5A800]/20 to-transparent",
    accent: "text-[#F5A800]"
  }
];

const TechnicalCapabilities = () => {
  return (
    <section className="bg-[#02040a] py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#F5A800]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#F5A800]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F5A800] shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
            <span className="text-xs font-black text-[#F5A800] uppercase tracking-[0.3em]">Engineering Excellence</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-[0.95]">
            Core Technical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Capabilities</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-xl font-medium leading-relaxed">
            Engineered for performance. Built for scale. Secured by design.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20 auto-rows-[240px]"
        >
          {capabilities.map((cap, i) => {
            // Bento Grid Logic (4 Column Layout)
            let spanClass = "md:col-span-1 md:row-span-1";

            if (i === 0) { spanClass = "md:col-span-2 md:row-span-1"; }
            else if (i === 1) { spanClass = "md:col-span-1 md:row-span-2"; }
            else if (i === 3) { spanClass = "md:col-span-2 md:row-span-1"; }
            else if (i === 5) { spanClass = "md:col-span-2 md:row-span-1"; }
            else if (i === 6) { spanClass = "md:col-span-2 md:row-span-1"; }

            return (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`group relative p-6 rounded-[24px] bg-[#111827] border border-white/5 hover:border-[#F5A800]/30 transition-all duration-500 overflow-hidden flex flex-col h-full ${spanClass} shadow-2xl shadow-black/40 cursor-pointer`}
              >
                {/* Full Box Link Overlay */}
                <Link to="/services" className="absolute inset-0 z-20" />

                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F5A800]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header: Icon + Title */}
                  <div className="flex items-center gap-3 mb-3 shrink-0">
                    <div className={`w-9 h-9 rounded-lg bg-white/[0.03] flex items-center justify-center ${cap.accent} border border-white/10 group-hover:border-[#F5A800]/40 group-hover:bg-[#F5A800]/10 transition-all duration-500`}>
                      {cap.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight leading-tight group-hover:text-[#F5A800] transition-colors">{cap.title}</h3>
                    </div>
                  </div>

                  {/* Scrollable Content Area */}
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 relative z-30">
                    <div className="inline-flex items-center gap-1.5 text-[#F5A800]/60 hover:text-[#F5A800] text-[8px] font-black uppercase tracking-[0.2em] transition-colors group/link mb-1">
                      Explore Protocol
                      <ChevronRight size={9} className="group-hover/link:translate-x-1 transition-transform" />
                    </div>

                    <p className="text-[#9CA3AF] text-sm leading-relaxed font-medium group-hover:text-white/60 transition-colors">
                      {cap.desc}
                    </p>

                    <div className="pt-2.5 border-t border-white/5">
                      <span className="text-[8px] font-black text-white/50 uppercase tracking-widest block mb-1.5">Strategic Benefits</span>
                      <div className="grid grid-cols-1 gap-1">
                        {cap.benefits.map((benefit, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-[#F5A800]/40 group-hover:bg-[#F5A800] transition-colors" />
                            <span className="text-[#9CA3AF] text-xs font-bold group-hover:text-white/70 transition-colors truncate">{benefit}</span>
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

export default TechnicalCapabilities;


