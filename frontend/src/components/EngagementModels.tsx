import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const models = [
  {
    title: 'Project-Based Delivery',
    desc: 'Fixed-scope, fixed-budget engagements for clearly defined initiatives. We handle end-to-end delivery from specification to deployment.',
    bestFor: 'MVPs, feature builds, platform migrations, and defined-scope initiatives',
    clientType: 'Startups to enterprises with well-defined requirements',
    duration: '8–24 weeks',
    pricing: 'Custom pricing based on scope',
  },
  {
    title: 'Dedicated Engineering Teams',
    desc: 'Elite engineers embedded within your organization, working as an extension of your team with full access to our technical leadership.',
    bestFor: 'Ongoing product development, platform maintenance, and long-term roadmaps',
    clientType: 'Scale-ups and enterprises needing sustained engineering capacity',
    duration: '3–24+ months',
    pricing: 'Custom pricing based on scope',
  },
  {
    title: 'Fractional CTO Services',
    desc: 'Executive technical leadership on a flexible basis — architecture oversight, team building, technology strategy, and investor-grade roadmaps.',
    bestFor: 'Organizations that need senior technical direction without a full-time executive hire',
    clientType: 'Early-stage startups, SMBs, and teams in transition',
    duration: 'Ongoing — 2–20 hrs/week',
    pricing: 'Custom pricing based on scope',
  },
  {
    title: 'Long-Term Strategic Partnerships',
    desc: 'Deep, multi-year partnerships where we operate as your core engineering organization — building platforms, running infrastructure, and driving continuous innovation.',
    bestFor: 'Organizations building complex platforms requiring sustained, deep technical investment',
    clientType: 'Enterprises, government institutions, and high-growth technology companies',
    duration: '12–48+ months',
    pricing: 'Custom pricing based on scope',
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function EngagementModels() {
  return (
    <section className="relative bg-[#FCFBF8] py-28 border-t border-slate-200 overflow-hidden">
      <div className="container max-w-[1200px] mx-auto relative z-10 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.18em]">How We Engage</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-[-0.03em] leading-[0.95] max-w-2xl">
            Flexible engagement models for every stage
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mt-8 font-medium">
            From a single project to a long-term strategic partnership — we structure each engagement around your specific needs and goals.
          </p>
        </motion.div>

        {/* Models Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-8"
        >
          {models.map((model, i) => {
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 md:p-10 transition-all duration-500 hover:border-[#F5A800]/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-950 tracking-tight">{model.title}</h3>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">{model.desc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">Best For</div>
                      <div className="text-[13px] text-slate-600 leading-relaxed">{model.bestFor}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">Client Type</div>
                      <div className="text-[13px] text-slate-600 leading-relaxed">{model.clientType}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">Duration</div>
                      <div className="text-[13px] text-[#F5A800] font-bold">{model.duration}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">Investment</div>
                      <div className="text-[13px] text-slate-600 font-medium">{model.pricing}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            to="/contact"
            className="group btn-gold text-[14px] px-9 py-4"
          >
            <span className="relative z-10">Discuss Your Engagement</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
