// ════════════════════════════════════════════════════════════
// SEO CORE — single source of truth for metadata, structured
// data and analytics. Used by <SeoManager /> on every route.
// ════════════════════════════════════════════════════════════

// ── Site identity (verified company information only) ────────
export const SITE = {
  name: 'Nexyovi',
  legalName: 'Nexyovi Technologies',
  url: 'https://www.nexyovi.com',
  tagline: "The engineering partner Africa's fastest companies trust to build — and ship.",
  description:
    'Nexyovi is a software development and AI company based in Addis Ababa, Ethiopia, delivering enterprise software, artificial intelligence, cloud & infrastructure, cybersecurity, and data platforms for organizations across Africa and beyond.',
  founded: '2024',
  email: 'info@nexyovi.com',
  phone: '+251938617252',
  whatsapp: '+251945628075',
  address: {
    street: 'Bole Road, near Edna Mall area, Bole Sub-city',
    locality: 'Addis Ababa',
    country: 'Ethiopia',
    countryCode: 'ET',
  },
  geo: { lat: 9.005401, lng: 38.763611 },
  founder: {
    // Canonical entity name — used consistently everywhere (schema, copy,
    // metadata). Verified spelling confirmed by the founder.
    name: 'Yonas Bogale Sitotaw',
    jobTitle: 'Founder & CEO',
    // Profile page on this site — stable entity @id anchor for the Person node.
    url: `${'https://www.nexyovi.com'}/about/yonas-bogale-sitotaw`,
    // alternativeName values: variants that genuinely refer to the same
    // person (confirmed by the founder). Never add a variant without evidence.
    alternateNames: ['Yonas Bogale', 'Yons'],
    // Official external profiles owned by the founder — used for sameAs.
    sameAs: [
      'https://www.linkedin.com/in/yonas-bogale/',
      'https://github.com/jonnahjr',
      'https://www.instagram.com/yonasb.jr',
      'https://web.facebook.com/Yonasb.jr/',
    ],
  },
} as const;

// Stable entity @id anchors — referenced across every schema node so
// search engines can join Person ↔ Organization ↔ WebSite unambiguously.
export const ENTITY_IDS = {
  person: `${SITE.url}/#person-yonas-bogale-sitotaw`,
  organization: `${SITE.url}/#organization`,
  website: `${SITE.url}/#website`,
} as const;

export const OG_IMAGE = `${SITE.url}/og-image.jpg`;

const ROBOTS_INDEX =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const ROBOTS_NOINDEX = 'noindex, nofollow';

// ── Static route metadata ─────────────────────────────────────
interface RouteMeta {
  title: string;
  description: string;
  type?: 'website' | 'article';
}

const STATIC_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Software Development & AI Company in Ethiopia | Nexyovi',
    description:
      'Nexyovi builds enterprise software, AI systems, cloud infrastructure, cybersecurity, and data platforms in Addis Ababa, Ethiopia — for organizations across Africa.',
  },
  '/services': {
    title: 'Technology Services: Software, AI, Cloud, Security | Nexyovi',
    description:
      'Custom software engineering, artificial intelligence, cloud infrastructure, cybersecurity — delivered by senior engineering teams in Addis Ababa, Ethiopia.',
  },
  '/industries': {
    title: 'Industries: FinTech, HealthTech, GovTech & More | Nexyovi',
    description:
      'Mission-critical technology for FinTech, HealthTech, GovTech, logistics, retail, education, manufacturing, and energy — built in Addis Ababa.',
  },
  '/company': {
    title: 'About Nexyovi — Software Engineering Company in Addis Ababa',
    description:
      'Nexyovi Technologies is an elite software engineering firm in Addis Ababa, Ethiopia, with a global delivery footprint.',
  },
  '/about/yonas-bogale-sitotaw': {
    title: 'Yonas Bogale Sitotaw — Founder & CEO of Nexyovi',
    description:
      'Yonas Bogale Sitotaw (also known as Yonas Bogale or Yons) is the founder and CEO of Nexyovi — a software development and AI company in Addis Ababa, Ethiopia.',
  },
  '/contact': {
    title: 'Contact Nexyovi — Start Your Software Project in Addis Ababa',
    description:
      'Start a software, AI, cloud, or cybersecurity project with Nexyovi. Book a free strategy session — we respond within 24 hours. HQ in Bole, Addis Ababa.',
  },
  '/projects': {
    title: 'Software Projects & Case Studies | Nexyovi',
    description:
      'Reference architectures and production systems from Nexyovi — AI threat defense, payment infrastructure, and enterprise cloud, built in Ethiopia.',
  },
  '/careers': {
    title: 'Careers at Nexyovi — Engineering Jobs in Ethiopia | Nexyovi',
    description:
      'Build mission-critical systems used across Africa. Explore engineering, design, and technology careers at Nexyovi in Addis Ababa, Ethiopia.',
  },
  '/internship': {
    title: 'Internship Program — Software Engineering Training | Nexyovi',
    description:
      'Hands-on software engineering training in Addis Ababa: mentorship from senior architects and a pathway into full-time engineering roles.',
  },
  '/request-demo': {
    title: 'Request a Demo | Nexyovi',
    description:
      'Request a personalized demo of Nexyovi platforms and solutions. Tell us about your organization and our team will schedule a walkthrough within 24 hours.',
  },
  '/legal': {
    title: 'Nexyovi Trust Center — Security, Privacy & Compliance',
    description:
      'Nexyovi security practices: AES-256 encryption, zero-trust architecture, GDPR and HIPAA-aligned compliance, and enterprise-grade infrastructure protections.',
  },
  '/blog': {
    title: 'Engineering Insights: Software, AI & Cloud Guides | Nexyovi',
    description:
      'Practical guides from Nexyovi engineers: software costs, AI adoption, cybersecurity essentials, and cloud migration — grounded in real enterprise delivery.',
  },
};

// ── Service detail pages (driven by constants/services.ts) ────
const SERVICE_KEYWORD_CONTEXT: Record<string, string> = {
  software: 'Custom software development company in Ethiopia. Enterprise platforms, SaaS products, API development, and legacy modernization delivered by Nexyovi.',
  ai: 'AI development company in Ethiopia. Nexyovi builds production-grade machine learning pipelines, AI agents, LLM integrations, and RAG systems for enterprises.',
  cloud: 'Cloud computing and DevOps services from Nexyovi: multi-cloud architecture on AWS and Azure, Kubernetes orchestration, CI/CD pipelines, and observability.',
  security: 'Cybersecurity consulting from Nexyovi: zero-trust architecture, penetration testing, SOC 2 and ISO 27001 compliance automation, and 24/7 threat monitoring.',
  data: 'Data engineering and analytics from Nexyovi: real-time streaming pipelines, data warehousing on Snowflake and BigQuery, BI dashboards, and data governance.',
  managed: 'Managed IT services from Nexyovi: 24/7 monitoring, incident response, preventive maintenance, and technical advisory under SLA-backed support.',
  networking: 'Enterprise networking and IT infrastructure services from Nexyovi: SD-WAN deployments, edge computing, core routing, and network security.',
};

// ── Case study pages (slug → metadata) ────────────────────────
const CASE_STUDY_META: Record<string, RouteMeta> = {
  'global-bank-security': {
    title: 'Global Bank Security Overhaul — Case Study | Nexyovi',
    description:
      'Zero-trust architecture and AI threat detection for a pan-African bank across 14 countries — zero breaches in 18 months post-deployment.',
    type: 'article',
  },
  'ai-smart-logistics': {
    title: 'AI Smart Logistics Engine — Case Study | Nexyovi',
    description:
      'Predictive AI routing for a global logistics provider: 35% efficiency boost, 22% lower fuel use, and 98.5% on-time delivery.',
    type: 'article',
  },
  'tele-psychiatry': {
    title: 'Tele-Psychiatry Platform — Case Study | Nexyovi',
    description:
      'A HIPAA-compliant telehealth platform for a national health ministry — 50,000+ secure consultations and specialist access in 12 rural regions.',
    type: 'article',
  },
};

// ── FAQ (genuine questions, used on /contact) ─────────────────
export const CONTACT_FAQS = [
  {
    question: 'How do I start a project with Nexyovi?',
    answer:
      'Submit a project brief through our contact form or book a free strategy session. We begin with a discovery and audit phase to understand your infrastructure, workflows, and goals, then move to architecture design, build and deployment, and post-launch support.',
  },
  {
    question: 'Where is Nexyovi located?',
    answer:
      'Our headquarters is on Bole Road, near Edna Mall area, Bole Sub-city, Addis Ababa, Ethiopia. We serve clients across Africa and internationally through a global delivery footprint.',
  },
  {
    question: 'What services does Nexyovi provide?',
    answer:
      'Nexyovi provides software engineering (custom platforms, SaaS, APIs, legacy modernization), artificial intelligence (ML pipelines, AI agents, LLM integrations), cloud & infrastructure, cybersecurity, data systems, enterprise networking, and managed technology services.',
  },
  {
    question: 'Which industries does Nexyovi serve?',
    answer:
      'We serve FinTech, HealthTech, GovTech, logistics, retail, education, manufacturing, and energy — including payment infrastructure, telemedicine platforms, digital identity systems, and supply chain visibility platforms.',
  },
  {
    question: 'How quickly does Nexyovi respond to inquiries?',
    answer:
      'Our team responds to project inquiries within 24 hours. For urgent matters you can reach us by phone at +251 93 861 7252 or WhatsApp.',
  },
  {
    question: 'Does Nexyovi work with international clients?',
    answer:
      'Yes. While headquartered in Addis Ababa, Nexyovi delivers systems for organizations across Africa and beyond, including pan-African financial institutions and international logistics providers.',
  },
];

// ── Resolved metadata for a pathname ──────────────────────────
export interface ResolvedMeta extends RouteMeta {
  canonical: string;
  robots: string;
  noindex: boolean;
  type?: 'website' | 'article' | 'profile';
  jsonLd: { id: string; data: object }[];
}

const NOINDEX_PREFIXES = ['/admin', '/systems', '/map-calibrate', '/careers/apply', '/internship/apply'];

function isNoindex(pathname: string): boolean {
  return NOINDEX_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function getRouteMeta(pathname: string): ResolvedMeta {
  const path = normalizePath(pathname);

  if (isNoindex(path)) {
    return {
      title: 'Nexyovi',
      description: SITE.description,
      canonical: `${SITE.url}${path}`,
      robots: ROBOTS_NOINDEX,
      noindex: true,
      jsonLd: [],
    };
  }

  // /services/:serviceId
  if (path.startsWith('/services/')) {
    const slug = path.split('/')[2];
    const service = SERVICES[slug];
    if (service) {
      return {
        title: `${service.title} Services in Ethiopia | Nexyovi`,
        description: SERVICE_KEYWORD_CONTEXT[slug] || service.description,
        canonical: `${SITE.url}/services/${slug}`,
        robots: ROBOTS_INDEX,
        noindex: false,
        jsonLd: [
          { id: 'service', data: serviceSchema(service.title, service.description) },
          {
            id: 'breadcrumb',
            data: breadcrumbSchema([
              { name: 'Home', url: `${SITE.url}/` },
              { name: 'Services', url: `${SITE.url}/services` },
              { name: service.title, url: `${SITE.url}/services/${slug}` },
            ]),
          },
        ],
      };
    }
  }

  // /blog/:slug
  if (path.startsWith('/blog/')) {
    const slug = path.split('/')[2];
    const article = getArticleBySlug(slug);
    if (article) {
      return {
        title: article.seoTitle,
        description: article.metaDescription,
        type: 'article',
        canonical: `${SITE.url}/blog/${slug}`,
        robots: ROBOTS_INDEX,
        noindex: false,
        jsonLd: [
          { id: 'article', data: blogPostingSchema(article) },
          {
            id: 'breadcrumb',
            data: breadcrumbSchema([
              { name: 'Home', url: `${SITE.url}/` },
              { name: 'Blog', url: `${SITE.url}/blog` },
              { name: article.title, url: `${SITE.url}/blog/${slug}` },
            ]),
          },
          { id: 'faq', data: faqSchema(article.faq) },
        ],
      };
    }
  }

  // /projects/:id
  if (path.startsWith('/projects/')) {
    const slug = path.split('/')[2];
    const study = CASE_STUDY_META[slug];
    if (study) {
      return {
        ...study,
        canonical: `${SITE.url}/projects/${slug}`,
        robots: ROBOTS_INDEX,
        noindex: false,
        jsonLd: [
          {
            id: 'breadcrumb',
            data: breadcrumbSchema([
              { name: 'Home', url: `${SITE.url}/` },
              { name: 'Projects', url: `${SITE.url}/projects` },
              { name: study.title.replace(' — Case Study | Nexyovi', ''), url: `${SITE.url}/projects/${slug}` },
            ]),
          },
        ],
      };
    }
  }

  // Founder profile page
  if (path === '/about/yonas-bogale-sitotaw') {
    return {
      ...STATIC_META[path],
      canonical: `${SITE.url}${path}`,
      robots: ROBOTS_INDEX,
      noindex: false,
      type: 'profile',
      jsonLd: [
        { id: 'profilepage', data: profilePageSchema() },
        { id: 'person', data: personSchema() },
        { id: 'breadcrumb', data: breadcrumbSchema([
          { name: 'Home', url: `${SITE.url}/` },
          { name: 'Company', url: `${SITE.url}/company` },
          { name: 'Yonas Bogale Sitotaw', url: SITE.founder.url },
        ]) },
      ],
    };
  }

  const base = STATIC_META[path];

  // Unknown path — the SPA catch-all route renders <Home />. That is a soft 404
  // (HTTP 200 with home content), so keep an indexable home title but de-index
  // the URL and point its canonical at the real home page. This stops bogus or
  // duplicated URLs from being indexed while JS-less crawlers still get content.
  if (!base) {
    return {
      ...STATIC_META['/'],
      canonical: `${SITE.url}/`,
      robots: ROBOTS_NOINDEX,
      noindex: true,
      jsonLd: [],
    };
  }

  return {
    ...base,
    canonical: `${SITE.url}${path === '/' ? '/' : path}`,
    robots: ROBOTS_INDEX,
    noindex: false,
    jsonLd: path === '/contact' ? [{ id: 'faq', data: faqSchema(CONTACT_FAQS) }] : [],
  };
}

function normalizePath(pathname: string): string {
  // strip trailing slash (except root) so /services/ and /services match
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

// ════════════════════════════════════════════════════════════
// JSON-LD schema builders
// ════════════════════════════════════════════════════════════

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ENTITY_IDS.organization,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/og-image.jpg`,
    description: SITE.description,
    foundingDate: SITE.founded,
    founder: { '@id': ENTITY_IDS.person },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressCountry: SITE.address.countryCode,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      email: SITE.email,
      contactType: 'sales',
      availableLanguage: ['English', 'Amharic'],
    },
  };
}

// Canonical Person node for the founder. All other references (Organization
// founder, article authors, profile page) link to this node by stable @id so
// search engines and AI systems resolve one single person entity.
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': ENTITY_IDS.person,
    name: SITE.founder.name,
    alternateName: [...SITE.founder.alternateNames],
    jobTitle: SITE.founder.jobTitle,
    description:
      'Yonas Bogale Sitotaw is the founder and CEO of Nexyovi, a software development and AI company in Addis Ababa, Ethiopia. He works across software development, software engineering, security engineering, cybersecurity, and artificial intelligence.',
    url: SITE.founder.url,
    image: 'https://api.nexyovi.com/uploads/1781431549912-777697695.jpg',
    worksFor: { '@id': ENTITY_IDS.organization },
    knowsAbout: [
      'Software development',
      'Software engineering',
      'Security engineering',
      'Cybersecurity',
      'Artificial intelligence',
      'AI engineering',
      'Technology entrepreneurship',
    ],
    sameAs: [...SITE.founder.sameAs],
    nationality: { '@type': 'Country', name: 'Ethiopia' },
  };
}

// ProfilePage wrapper for /about/yonas-bogale-sitotaw — declares the page's
// main entity is the founder Person node.
export function profilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE.founder.url}#profilepage`,
    url: SITE.founder.url,
    name: 'Yonas Bogale Sitotaw — Founder & CEO of Nexyovi',
    description:
      'Official profile of Yonas Bogale Sitotaw (Yonas Bogale, Yons), founder and CEO of Nexyovi — software development, security engineering, cybersecurity, and AI engineering in Addis Ababa, Ethiopia.',
    mainEntity: { '@id': ENTITY_IDS.person },
    publisher: { '@id': ENTITY_IDS.organization },
    inLanguage: 'en',
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'en',
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#localbusiness`,
    name: SITE.name,
    url: SITE.url,
    image: OG_IMAGE,
    description: SITE.description,
    foundingDate: SITE.founded,
    founder: { '@id': ENTITY_IDS.person },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressCountry: SITE.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    telephone: SITE.phone,
    email: SITE.email,
    areaServed: [
      { '@type': 'Country', name: 'Ethiopia' },
      { '@type': 'Place', name: 'Africa' },
    ],
    knowsAbout: [
      'Software development',
      'Artificial intelligence',
      'Machine learning',
      'Cybersecurity',
      'Cloud computing',
      'Data engineering',
      'Digital transformation',
      'Enterprise networking',
    ],
  };
}

export function serviceSchema(title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${title} — Nexyovi`,
    description,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Ethiopia' },
      { '@type': 'Place', name: 'Africa' },
    ],
    url: `${SITE.url}/services`,
  };
}

export function blogPostingSchema(article: {
  slug: string;
  h1: string;
  title: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt: string;
  author: { name: string; role: string; url?: string };
  category: string;
  keywords: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.h1,
    description: article.metaDescription,
    url: `${SITE.url}/blog/${article.slug}`,
    image: OG_IMAGE,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      // Author byline maps to the canonical founder Person @id when the
      // article is authored by the founder; fallback anchors the Company page.
      ...(article.author.name === SITE.founder.name || article.author.name === 'Yonas Bogale'
        ? { '@id': ENTITY_IDS.person }
        : {}),
      url: article.author.url || SITE.founder.url,
    },
    publisher: { '@id': `${SITE.url}/#organization` },
    articleSection: article.category,
    keywords: article.keywords.join(', '),
    inLanguage: 'en',
    mainEntityOfPage: `${SITE.url}/blog/${article.slug}`,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

// ════════════════════════════════════════════════════════════
// DOM helpers — metadata + JSON-LD management
// ════════════════════════════════════════════════════════════

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

// The backend injects the CSP nonce into <meta name="csp-nonce"> when serving
// the SPA. On static hosting the placeholder is absent → nonce is not needed.
function getCspNonce(): string | undefined {
  const raw = document.head
    .querySelector<HTMLMetaElement>('meta[name="csp-nonce"]')
    ?.getAttribute('content');
  return raw && !raw.includes('__CSP_NONCE__') ? raw : undefined;
}

const JSONLD_ATTR = 'data-seo-jsonld';

function applyJsonLd(nodes: { id: string; data: object }[]) {
  // Remove previous dynamic nodes
  document.head
    .querySelectorAll(`script[${JSONLD_ATTR}]`)
    .forEach((el) => el.remove());

  const nonce = getCspNonce();
  nodes.forEach(({ id, data }) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(JSONLD_ATTR, id);
    if (nonce) script.setAttribute('nonce', nonce);
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  });
}

// ════════════════════════════════════════════════════════════
// Google Analytics 4 — activates only when VITE_GA4_ID is set
// ════════════════════════════════════════════════════════════

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let gaReady = false;

export function initAnalytics(): void {
  const gaId = import.meta.env.VITE_GA4_ID;
  if (!gaId || gaReady) return;
  gaReady = true;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', gaId, {
    anonymize_ip: true,
    // SPA: page_view events are sent manually by SeoManager
    send_page_view: false,
  });
}

export function trackPageView(path: string, title: string): void {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path, page_title: title });
}

export function trackEvent(action: string, params: Record<string, unknown> = {}): void {
  if (!window.gtag) return;
  window.gtag('event', action, params);
}

// ── Shared conversion events ──────────────────────────────────
export const trackCtaClick = (label: string, location: string) =>
  trackEvent('cta_click', { cta_label: label, page_location: location });

export const trackContactClick = (
  method: 'email' | 'phone' | 'whatsapp' | 'map',
  location: string,
) => trackEvent('contact_click', { method, page_location: location });

export const trackFormStart = (form: string) => trackEvent('form_start', { form });

export const trackFormSubmit = (form: string) =>
  trackEvent('generate_lead', { form, engagement_type: 'form submit' });

export const trackFormError = (form: string) => trackEvent('form_error', { form });

// ── Lazy import of SERVICES to keep this module tree-shakeable ─
import { SERVICES } from '../constants/services';
import { getArticleBySlug } from '../content/articles';
