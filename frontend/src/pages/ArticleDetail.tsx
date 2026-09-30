import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  Info,
} from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import TextReveal from '../components/TextReveal';
import { trackCtaClick } from '../lib/seo';
import { ARTICLES, ARTICLE_CATEGORY_ICONS, getArticleBySlug } from '../content/articles';
import type { Article, Block } from '../content/articles';
import { EASE_EXPO } from '../lib/animations';

// ── TOC extraction (H2s only, from body blocks) ──────────────
function getToc(article: Article): { id: string; text: string }[] {
  return article.body
    .filter((b): b is Extract<Block, { type: 'h2' }> => b.type === 'h2')
    .map((b) => ({ id: b.id, text: b.text }));
}

// ── Block renderer ────────────────────────────────────────────
function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          id={block.id}
          className="scroll-mt-28 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-14 mb-5"
        >
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3
          id={block.id}
          className="scroll-mt-28 text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-10 mb-4"
        >
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p className="text-slate-600 text-[15px] sm:text-[16px] leading-[1.8] mb-5">
          {block.text}
        </p>
      );
    case 'list':
      return block.ordered ? (
        <ol className="space-y-3 mb-6 list-decimal pl-6 marker:text-[#F5A800] marker:font-black">
          {block.items.map((item, i) => (
            <li key={i} className="text-slate-600 text-[15px] leading-[1.75] pl-1">
              {item}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-3 mb-6">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-slate-600 text-[15px] leading-[1.75]">
              <CheckCircle2 size={16} className="text-[#F5A800] shrink-0 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <aside className="my-8 p-6 rounded-2xl bg-[#F5A800]/[0.06] border border-[#F5A800]/20">
          <div className="flex items-center gap-2 mb-2">
            <Info size={15} className="text-[#F5A800]" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#B87A00]">
              {block.title}
            </span>
          </div>
          <p className="text-slate-700 text-[14px] leading-relaxed font-medium">{block.text}</p>
        </aside>
      );
    case 'table':
      return (
        <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 sm:px-5 py-3.5 text-[11px] font-black uppercase tracking-wider text-slate-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-4 sm:px-5 py-3.5 text-[13px] sm:text-[14px] text-slate-600 leading-relaxed align-top"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'quote':
      return (
        <blockquote className="my-8 pl-5 border-l-4 border-[#F5A800]">
          <p className="text-slate-700 text-[16px] sm:text-[18px] leading-relaxed font-medium italic">
            {block.text}
          </p>
          {block.attribution && (
            <cite className="block mt-2 text-[12px] font-bold uppercase tracking-widest text-slate-400 not-italic">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );
    default:
      return null;
  }
}

// ── Main page ─────────────────────────────────────────────────
export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) return <Navigate to="/blog" replace />;

  const toc = getToc(article);
  const related = article.relatedArticles
    .map((s) => ARTICLES.find((a) => a.slug === s))
    .filter((a): a is Article => Boolean(a));
  const CategoryIcon = ARTICLE_CATEGORY_ICONS[article.category];

  return (
    <div className="bg-[#FCFBF8] min-h-screen">
      {/* HERO */}
      <section className="relative bg-[#02040a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5A800]/8 via-transparent to-[#02040a] pointer-events-none" />
        <div className="relative z-10 container max-w-3xl mx-auto px-6 pt-32 pb-16">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors mb-8 text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft size={14} /> All Insights
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center border"
              style={{
                backgroundColor: `${article.accent}14`,
                borderColor: `${article.accent}33`,
              }}
            >
              <CategoryIcon size={16} style={{ color: article.accent }} />
            </div>
            <span
              className="text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: article.accent }}
            >
              {article.category}
            </span>
          </div>

          <TextReveal>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[-0.03em] leading-[1.05] mb-6">
              {article.h1}
            </h1>
          </TextReveal>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-medium text-white/40">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} />
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} />
              {article.readingTime}
            </span>
            <span>
              By {article.author.name} · {article.author.role}
            </span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <article className="py-14 sm:py-20">
        <div className="container max-w-3xl mx-auto px-6 lg:px-8">
          {/* TOC */}
          {toc.length > 0 && (
            <nav
              aria-label="Table of contents"
              className="mb-12 p-6 rounded-2xl bg-white border border-slate-200"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                In this guide
              </p>
              <ol className="space-y-2">
                {toc.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group flex items-baseline gap-2.5 text-[14px] font-medium text-slate-500 hover:text-[#B87A00] transition-colors"
                    >
                      <span className="text-[11px] font-black text-[#F5A800]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Intro */}
          {article.intro.map((p, i) => (
            <p
              key={i}
              className="text-slate-700 text-[16px] sm:text-[18px] leading-[1.8] font-medium mb-6"
            >
              {p}
            </p>
          ))}

          {/* Body blocks */}
          {article.body.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}

          {/* FAQ */}
          {article.faq.length > 0 && (
            <section className="mt-16 pt-10 border-t border-slate-200">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-7">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {article.faq.map((faq, i) => (
                  <details
                    key={i}
                    className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#F5A800]/40 transition-colors"
                  >
                    <summary className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 cursor-pointer list-none">
                      <h3 className="text-slate-900 text-[14px] sm:text-[15px] font-bold leading-snug">
                        {faq.question}
                      </h3>
                      <span
                        className="shrink-0 w-7 h-7 rounded-full bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center text-[#F5A800] text-lg leading-none group-open:rotate-45 transition-transform duration-300"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <div className="px-5 sm:px-6 pb-5">
                      <p className="text-slate-500 text-[13px] sm:text-[14px] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related services */}
          {article.relatedServices.length > 0 && (
            <section className="mt-14 pt-10 border-t border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-5">
                Related Nexyovi Services
              </h2>
              <div className="flex flex-wrap gap-3">
                {article.relatedServices.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-slate-200 hover:border-[#F5A800]/50 text-[13px] font-bold text-slate-700 transition-colors"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={14}
                      className="text-slate-300 group-hover:text-[#F5A800] transition-colors"
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related articles */}
          {related.length > 0 && (
            <section className="mt-14 pt-10 border-t border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-5">
                Keep Reading
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => {
                  const Icon = ARTICLE_CATEGORY_ICONS[r.category];
                  return (
                    <Link
                      key={r.slug}
                      to={`/blog/${r.slug}`}
                      className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#F5A800]/50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <Icon size={14} style={{ color: r.accent }} />
                        <span
                          className="text-[9px] font-black uppercase tracking-[0.18em]"
                          style={{ color: r.accent }}
                        >
                          {r.category}
                        </span>
                      </div>
                      <h3 className="text-[15px] font-black text-slate-900 leading-snug group-hover:text-[#B87A00] transition-colors">
                        {r.title}
                      </h3>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="mt-16 p-8 sm:p-10 rounded-[24px] bg-[#02040a] text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
              Applying this to your organization?
            </h2>
            <p className="text-white/50 text-[14px] font-medium leading-relaxed max-w-md mx-auto mb-7">
              Nexyovi helps enterprises across Africa design, build, and operate these systems.
              Book a free strategy session to discuss your context.
            </p>
            <Link
              to="/contact"
              onClick={() =>
                trackCtaClick('blog-article-cta', `/blog/${article.slug}`)
              }
              className="group inline-flex items-center justify-center gap-2 btn-gold text-[13px] sm:text-[15px] font-bold px-8 py-4"
            >
              <span className="relative z-10">Book a Free Strategy Session</span>
              <ArrowRight
                size={16}
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </section>
        </div>
      </article>
    </div>
  );
}
