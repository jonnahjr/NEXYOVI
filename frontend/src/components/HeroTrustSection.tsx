import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { slideLeft, slideRight, viewport } from '../lib/animations';

const checklist = [
  "Systems aligned to business KPIs",
  "Built for scale, not demos",
  "Measurable and defensible ROI",
  "Production-ready from day one",
  "Senior-driven team execution",
  "Built-in live system monitor",
];

const HeroTrustSection = () => {
  return (
    <section className="relative bg-[#02040a] py-32 border-t border-white/5 overflow-hidden">
      <div className="container relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left — CTA */}
          <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={viewport}>

            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">
                Available for New Projects
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.0] mb-6">
              Ready to build<br />
              the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/80">future</span>?
            </h2>

            <p className="text-white/50 text-[16px] leading-relaxed mb-12 max-w-md font-medium">
              Let's engineer the next breakthrough for your enterprise — from
              initial scoping to global deployment. We move fast and build to last.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                id="cta-start-project"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-[14px] transition-all hover:scale-105"
              >
                <span className="relative z-10">Start a Project</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="mailto:info@nexyovi.com"
                id="cta-book-call"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-[14px] transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105"
              >
                <Calendar size={16} className="text-white/60 group-hover:text-white transition-colors" />
                Book a Call
              </a>
            </div>
          </motion.div>

          {/* Right — Checklist */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col gap-3"
          >
            {checklist.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, type: "spring", bounce: 0.3 }}
                className="group flex items-center gap-4 py-3.5 px-5 rounded-full bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05]"
              >
                <div className="w-8 h-8 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#F5A800]">
                  <CheckCircle2 size={16} strokeWidth={2.5} />
                </div>
                <div className="text-[16px] font-medium text-white/80 group-hover:text-white transition-colors tracking-tight">
                  {item}
                </div>
              </motion.div>
            ))}

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 p-6 rounded-3xl bg-white/[0.01] border border-dashed border-white/10 flex items-start gap-4"
            >
              <ShieldCheck size={20} className="text-white/40 shrink-0 mt-0.5" />
              <p className="text-white/50 text-[14px] leading-relaxed font-medium">
                <span className="text-white/80 font-bold">Enterprise-grade guarantee.</span>{' '}
                Our systems are delivered with full documentation, architectural blueprints, and SOC-2 compliance readiness.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroTrustSection;
