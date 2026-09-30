// ════════════════════════════════════════════════════════════
// BLOG CONTENT MODEL — typed, code-based article registry.
// Content lives in version control (no CMS dependency). Each
// article follows the SEO content template: structured body
// blocks, FAQ, internal links, author, dates, related links.
// Rules: original content only, no fabricated statistics, cite
// external frameworks instead of inventing numbers.
// ════════════════════════════════════════════════════════════

import { BrainCircuit, Cloud, Code2, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { softwareCostGuide } from './articles/software-cost-guide';
import { aiAdoptionFramework } from './articles/ai-adoption-framework';
import { cybersecurityEssentials } from './articles/cybersecurity-essentials';
import { cloudMigrationChecklist } from './articles/cloud-migration-checklist';

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'callout'; title: string; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'quote'; text: string; attribution?: string };

export interface ArticleFaq {
  question: string;
  answer: string;
}

export type ArticleCategory =
  | 'Software Development'
  | 'Artificial Intelligence'
  | 'Cybersecurity'
  | 'Cloud';

export interface Article {
  slug: string;
  title: string; // SEO title (shown on /blog cards + used for BlogPosting name)
  seoTitle: string; // <title> tag
  metaDescription: string;
  h1: string;
  excerpt: string; // card description on /blog
  category: ArticleCategory;
  readingTime: string;
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
  author: {
    name: string;
    role: string;
    url?: string;
  };
  keywords: string[]; // informational intent targets
  accent: string;
  intro: string[]; // paragraphs before first H2
  body: Block[];
  faq: ArticleFaq[];
  relatedServices: { label: string; to: string }[];
  relatedArticles: string[]; // slugs
}

export const ARTICLES: Article[] = [
  softwareCostGuide,
  aiAdoptionFramework,
  cybersecurityEssentials,
  cloudMigrationChecklist,
].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export const getArticleBySlug = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug);

export const ARTICLE_CATEGORY_ICONS: Record<ArticleCategory, LucideIcon> = {
  'Software Development': Code2,
  'Artificial Intelligence': BrainCircuit,
  Cybersecurity: ShieldCheck,
  Cloud: Cloud,
};
