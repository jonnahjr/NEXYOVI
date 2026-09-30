import { motion } from 'framer-motion';
import { EASE_EXPO } from '../lib/animations';

const paragraphs = [
  `Founded in Addis Ababa in 2024 by Yonas Bogale Sitotaw (also known as Yonas Bogale), Nexyovi was built with a simple mission: help organizations leverage technology to solve complex challenges, operate more efficiently, and grow with confidence.`,
  `What began as a focused software studio quickly evolved into a multidisciplinary engineering company specializing in custom software, artificial intelligence, cloud infrastructure, cybersecurity, and digital transformation.`,
  `Today, Nexyovi partners with startups, enterprises, government organizations, and mission-driven businesses across Africa and beyond — designing, building, and maintaining production-ready digital systems that deliver measurable outcomes.`,
  `From enterprise applications and AI-powered platforms to cloud-native infrastructure and mission-critical systems, we combine deep engineering expertise with a long-term commitment to client success.`,
];

const CompanyStory = () => {
  return (
    <section className="relative bg-[#FCFBF8] border-t border-slate-200 py-28 md:py-36 overflow-hidden">
      <div className="container max-w-4xl mx-auto px-6 relative z-10">

        {/* ── Label ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
          className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-8"
        >
          Our Story
        </motion.p>

        {/* ── Title ── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE_EXPO }}
          className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.05] mb-4 text-slate-950"
        >
          Built in{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">
            Addis Ababa.
          </span>
        </motion.h2>

        {/* ── Subtitle ── */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_EXPO }}
          className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mb-14"
        >
          From a focused software studio to a cross-continental engineering force.
        </motion.p>

        {/* ── Stats — inline, no boxes ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE_EXPO }}
          className="flex flex-wrap gap-x-10 gap-y-4 mb-16"
        >
          {[
            { value: '10+', label: 'Enterprise Platforms' },
            { value: '20+', label: 'Elite Engineers' },
            { value: '4', label: 'Countries Served' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">{stat.value}</span>
              <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Narrative paragraphs ── */}
        <div className="max-w-3xl space-y-7 mb-20">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: EASE_EXPO }}
              className="text-slate-600 text-base md:text-lg leading-[1.8] font-[425]"
            >
              {text}
            </motion.p>
          ))}
        </div>



      </div>
    </section>
  );
};

export default CompanyStory;
