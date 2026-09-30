import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SITE,
  OG_IMAGE,
  getRouteMeta,
  initAnalytics,
  trackPageView,
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from '../lib/seo';

/**
 * SeoManager
 * ─────────────────────────────────────────────────────────────
 * Keeps <head> in sync with the active route for a client-side
 * rendered SPA: title, description, robots, canonical, Open
 * Graph, Twitter cards and dynamic JSON-LD (Service,
 * BreadcrumbList, FAQPage). Also fires GA4 page_view events.
 *
 * Site-wide entity schemas (Organization, WebSite,
 * ProfessionalService) are static in index.html so crawlers see
 * them without JavaScript execution.
 * ─────────────────────────────────────────────────────────────
 */
const SeoManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    initAnalytics();

    const meta = getRouteMeta(pathname);

    document.title = meta.title;
    document.documentElement.lang = 'en';

    // Core meta
    const upsert = (selector: string, create: () => HTMLMetaElement, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    upsert('meta[name="description"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'description');
      return m;
    }, meta.description);

    upsert('meta[name="robots"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'robots');
      return m;
    }, meta.robots);

    // Canonical
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', meta.canonical);

    // Open Graph
    upsert('meta[property="og:title"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:title');
      return m;
    }, meta.title);
    upsert('meta[property="og:description"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:description');
      return m;
    }, meta.description);
    upsert('meta[property="og:url"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:url');
      return m;
    }, meta.canonical);
    upsert('meta[property="og:type"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:type');
      return m;
    }, meta.type === 'article' ? 'article' : meta.type === 'profile' ? 'profile' : 'website');
    upsert('meta[property="og:image"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:image');
      return m;
    }, OG_IMAGE);
    upsert('meta[property="og:site_name"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:site_name');
      return m;
    }, SITE.name);

    // Twitter card
    upsert('meta[name="twitter:title"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'twitter:title');
      return m;
    }, meta.title);
    upsert('meta[name="twitter:description"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'twitter:description');
      return m;
    }, meta.description);
    upsert('meta[name="twitter:image"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'twitter:image');
      return m;
    }, OG_IMAGE);

    // Dynamic JSON-LD (breadcrumb/service/faq)
    applyJsonLd(meta.jsonLd);

    // GA4 SPA page view
    trackPageView(pathname, meta.title);
  }, [pathname]);

  return null;
};

// Re-exported here so the app only needs one SEO import
import type { ResolvedMeta } from '../lib/seo';
type _KeepImport = ResolvedMeta;

function applyJsonLd(nodes: ResolvedMeta['jsonLd']) {
  document.head
    .querySelectorAll('script[data-seo-jsonld]')
    .forEach((el) => el.remove());

  const nonceMeta = document.head.querySelector<HTMLMetaElement>('meta[name="csp-nonce"]');
  const nonce =
    nonceMeta && !nonceMeta.getAttribute('content')?.includes('__CSP_NONCE__')
      ? nonceMeta.getAttribute('content')!
      : undefined;

  nodes.forEach(({ id, data }) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-jsonld', id);
    if (nonce) script.setAttribute('nonce', nonce);
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  });
}

export default SeoManager;
