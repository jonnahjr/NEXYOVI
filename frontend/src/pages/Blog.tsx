import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import TextReveal from '../components/TextReveal';
import { ARTICLES, ARTICLE_CATEGORY_ICONS } from '../content/articles';
import type { Article } from '../content/articles';
import { EASE_EXPO, staggerContainer } from '../lib/animations';

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const Icon = ARTICLE_CATEGORY_ICONS[article.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: EASE_EXPO }}
      className="group relative"
    >
      <Link
        to={`/blog/${article.slug}`}
        className="block h-full p-6 sm:p-8 rounded-[20px] bg-white border border-slate-200 hover:border-[#F5A800]/50 transition-all duration-300 hover:shadow-lg"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-[12px] flex items-center justify-center border"
              style={{
                backgroundColor: `${article.accent}14`,
                borderColor: `${article.accent}33`,
              }}
            >
              <Icon size={18} style={{ color: article.accent }} />
            </div>
            <span
              className="text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: article.accent }}
            >
              {article.category}
            </span>
          </div>
          <ArrowUpRight
            size={18}
            className="text-slate-300 group-hover:text-[#F5A800] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          />
        </div>

        <h2 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-snug mb-3 group-hover:text-[#B87A00] transition-colors">
          {article.title}
        </h2>
        <p className="text-slate-500 text-[13px] sm:text-[14px] leading-relaxed mb-5">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={12} />
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={12} />
            {article.readingTime}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Blog() {
  return (
    <div className="bg-[#FCFBF8] min-h-screen">
      {/* HERO */}
      <section className="relative bg-[#02040a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5A800]/8 via-transparent to-[#02040a] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.3) 0.5px, transparent 0.5px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10 container max-w-5xl mx-auto px-6 pt-32 pb-20">
          <TextReveal>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.04em] leading-[0.92] mb-5">
              Engineering Insights.
            </h1>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
              Practical guides on software development, AI adoption, cybersecurity, and cloud
              infrastructure — written by engineers who deliver enterprise systems for
              organizations across Africa and beyond.
            </p>
          </TextReveal>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="py-16 sm:py-24">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-5"
          >
            {ARTICLES.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* BOTTOM CTA STRIP */}
      <section className="pb-20 sm:pb-28">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="p-8 sm:p-10 rounded-[24px] bg-[#02040a] text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
              Have a project in mind?
            </h2>
            <p className="text-white/50 text-[14px] sm:text-[15px] font-medium leading-relaxed max-w-lg mx-auto mb-7">
              These guides come from real delivery work. If you're evaluating a software, AI,
              cloud, or security initiative, our team can help you scope it.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 btn-gold text-[13px] sm:text-[15px] font-bold px-8 py-4"
            >
              <span className="relative z-10">Start a Conversation</span>
              <ArrowRight
                size={16}
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
