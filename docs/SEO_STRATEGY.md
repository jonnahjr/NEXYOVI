# Nexyovi — SEO, GEO & AI Search Strategy

*Implementation date: September 29, 2026*

> Grounded in the actual codebase. No invented business information — every claim, service, and fact referenced here exists in the site (services/industries/case studies) or verified company data (address, phone, founder).

---

## 1. Business Understanding (from source of truth)

**Nexyovi Technologies** — software development & AI company, HQ: Bole Road, near Edna Mall area, Bole Sub-city, Addis Ababa, Ethiopia. Founded 2024 (corrected from 2012 per founder confirmation; the earlier 2012 date was inaccurate). Founder & CEO: **Yonas Bogale Sitotaw**.

### 1.1 Entity graph (canonical identities)

Canonical name spellings are confirmed by the founder. Use these consistently everywhere — schema, copy, metadata, admin content:

- **Person:** `Yonas Bogale Sitotaw` — alternateName: `Yonas Bogale`, `Yons` (NOT "Yonas Bogle" or "Yonas Boglae" — unconfirmed spellings)
- **Organization:** `Nexyovi` (legalName `Nexyovi Technologies`) — NOT "Nexyove", "Nextovi"
- **Relationship:** Yonas Bogale Sitotaw → founder & CEO of → Nexyovi → founded 2024 in Addis Ababa
- **Person @id:** `https://www.nexyovi.com/#person-yonas-bogale-sitotaw`
- **Organization @id:** `https://www.nexyovi.com/#organization`
- **Person profile page (canonical URL):** `https://www.nexyovi.com/about/yonas-bogale-sitotaw` (`ProfilePage` schema, `mainEntity` → Person @id)
- **sameAs (Person):** LinkedIn `/in/yonas-bogale/`, GitHub `jonnahjr`, Instagram `@yonasb.jr`, Facebook `Yonasb.jr`
- **sameAs (Organization):** same four profiles + `https://github.com/nexyovi`
- **knowsAbout (Person):** Software development, Software engineering, Security engineering, Cybersecurity, Artificial intelligence, AI engineering, Technology entrepreneurship

### 1.2 Claims requiring verification before publication

The following claims appear on the site but were NOT confirmed during the entity implementation. Verify or soften them:

1. "12+ years in tech and business strategy across two continents" (team bio) — founder's actual years of experience unverified
2. FounderStory paragraph: "led engineering teams at global tech companies", "architected cloud infrastructure for high-growth startups", "platforms that power millions of users", "led digital transformation initiatives for government and enterprise clients" — none verified
3. ~~Personal GitHub profile URL~~ — **resolved**: `https://github.com/jonnahjr` added to Person `sameAs`
4. `backend/old_db.js` (UTF-16 legacy seed) still seeds the name as "Yonas Bogale" — update or delete the file; live DB rows must also be renamed (see §1.3)
5. LinkedIn profile `/in/yonas-bogale/` — confirm it is owned/controlled by the founder before relying on it as a sameAs anchor
6. Founding year 2024 vs 2012 discrepancy — corrected to 2024 per founder; confirm legal registration date matches

### 1.3 Post-deploy entity consistency checklist

Run after deploying:

1. **DB rename:** `UPDATE team SET name = 'Yonas Bogale Sitotaw' WHERE name IN ('Yonas Bogale', 'Yonas Boglae');` (and testimonial `author` rows) — the site renders team/testimonial names from the database, which overrides code fallbacks
2. Validate JSON-LD at [validator.schema.org](https://validator.schema.org) on `/` and `/about/yonas-bogale-sitotaw`
3. Google Rich Results test → ProfilePage / Organization
4. Submit updated sitemap in Google Search Console + Bing Webmaster; request indexing of the profile URL
5. Ensure the LinkedIn profile's own website field points back to `nexyovi.com/about/yonas-bogale-sitotaw` (reciprocal confirmation is the strongest entity signal available)
6. Re-run `npm run seo:validate`

**Verified services** (from `frontend/src/constants/services.ts` + `Services.tsx`):

| Service | Route |
|---|---|
| Software Engineering (custom platforms, SaaS, APIs, legacy modernization) | `/services/software` |
| Artificial Intelligence (ML pipelines, AI agents, LLM integrations, RAG) | `/services/ai` |
| Cloud & Infrastructure (multi-cloud, Kubernetes, DevOps) | `/services/cloud` |
| Cybersecurity (zero-trust, pentesting, SOC 2/ISO 27001 compliance) | `/services/security` |
| Data Systems (streaming, warehousing, BI) | `/services/data` |
| Managed Technology (24/7 monitoring, SLA support) | `/services/managed` |
| Infrastructure & Networking (SD-WAN, edge, core routing) | `/services/networking` |

**Verified industries** (`Industries.tsx`): FinTech, HealthTech, GovTech, Logistics, Retail, Education, Manufacturing, Energy.

**Verified case studies** (`CaseStudyDetail.tsx`): Global Bank Security Overhaul, AI Smart Logistics Engine, Tele-Psychiatry Platform → `/projects/{global-bank-security,ai-smart-logistics,tele-psychiatry}`.

**Reference products** (`Projects.tsx`): Neural Sentinel, Quantum Ledger, Apex Cloud, ION Network, CipherVault, Prism AI, PharmaFlow, StockVue, BiteOrder, TableReserve.

**Conversion actions**: Contact form (`/contact`), Request demo (`/request-demo`), phone/email/WhatsApp clicks.

**Business model**: B2B enterprise engineering services; partnerships displayed include Ethio Telecom, CBE, Zemen Bank, INSA, universities, AWS/IBM/Oracle logos, Gebeya/Arifpay testimonials.

---

## 2. Keyword Map (target page → keyword → intent → priority)

| Keyword cluster | Primary keywords | Intent | Target page | Priority |
|---|---|---|---|---|
| Software development ET | software development company Ethiopia, software company Addis Ababa, custom software development Ethiopia | Commercial / Local | `/services/software` + `/` | P0 |
| AI services ET | AI company Ethiopia, AI solutions Ethiopia, machine learning companies Ethiopia | Commercial / Local | `/services/ai` | P0 |
| Cybersecurity ET | cybersecurity company Ethiopia, cybersecurity consulting Addis Ababa | Commercial / Local | `/services/security` | P0 |
| Cloud ET | cloud computing services Ethiopia, cloud migration Ethiopia | Commercial / Local | `/services/cloud` | P1 |
| Data | data analytics companies Ethiopia, data engineering Africa | Commercial | `/services/data` | P1 |
| Managed IT | managed IT services Ethiopia, IT support Addis Ababa | Commercial / Local | `/services/managed` | P1 |
| Networking | network infrastructure Ethiopia, SD-WAN Ethiopia | Commercial / Local | `/services/networking` | P2 |
| Digital transformation | digital transformation Ethiopia, digital transformation Africa | Informational→Commercial | `/` + future article | P1 |
| IT consulting | IT consulting Ethiopia, technology consulting Addis Ababa | Commercial / Local | `/services` | P1 |
| Africa / international | software development Africa, AI solutions Africa, enterprise software Africa | Commercial | `/` + `/services` | P2 |
| Branded | nexyovi, nexyovi technologies, nexyovi ethiopia | Navigational | `/` | P0 (defend) |
| Case-study proof | (long-tail) payment infrastructure case study, telemedicine platform Ethiopia | Informational / Commercial | `/projects/*` | P2 |
| Hiring | software engineering jobs Ethiopia, tech internship Addis Ababa | Transactional (HR) | `/careers`, `/internship` | P2 |
| Industry × service | fintech software development Africa, healthtech software Ethiopia, govtech solutions Ethiopia | Commercial | `/industries` | P1 |

**Funnel mapping**:
- Awareness (informational): future blog — "What is digital transformation?", "How AI is adopted in Ethiopian enterprises", "Cybersecurity basics for Ethiopian businesses".
- Consideration (commercial investigation): service pages, industries page, projects list.
- Decision (transactional): `/contact`, `/request-demo`, case studies, testimonials.

---

## 3. Content Strategy & Topic Clusters

One authoritative pillar per cluster. No thin doorway pages.

**Cluster A — Software Development** (pillar: `/services/software`)
- Supporting: API development, legacy modernization, SaaS architecture (sections inside the pillar, split out only when they earn their own demand).
- Articles: "How much does custom software development cost in Ethiopia?", "In-house vs outsourcing software development in Ethiopia", "Legacy modernization guide".

**Cluster B — AI & Machine Learning** (pillar: `/services/ai`)
- Articles: "How enterprises can implement AI — a practical framework", "LLM integration patterns for African businesses", "AI readiness checklist".

**Cluster C — Cybersecurity** (pillar: `/services/security`)
- Articles: "Cybersecurity essentials for Ethiopian banks", "Zero-trust architecture explained", "SOC 2 / ISO 27001 readiness guide".

**Cluster D — Cloud & Infrastructure** (pillar: `/services/cloud`)
- Articles: "Cloud migration checklist", "Multi-cloud vs single cloud for African enterprises".

**Cluster E — Industries** (pillars: `/industries` anchors)
- FinTech, HealthTech, GovTech deep-dive articles as demand justifies.

### 3.1 Articles published (live 2026-09-29)

The blog system is built into the app (`/blog` index + `/blog/:slug` renderer), so each article ships with its own title, meta description, canonical, `BlogPosting` + `BreadcrumbList` + `FAQPage` structured data and a GA4 `page_view`.

| Cluster | Article | URL |
|---|---|---|
| A — Software Development | How much does custom software development cost in Ethiopia? | `/blog/how-much-does-custom-software-development-cost-in-ethiopia` |
| B — AI & Machine Learning | An AI adoption framework for enterprises | `/blog/ai-adoption-framework-for-enterprises` |
| C — Cybersecurity | Cybersecurity essentials for Ethiopian businesses | `/blog/cybersecurity-essentials-for-ethiopian-businesses` |
| D — Cloud & Infrastructure | Cloud migration checklist | `/blog/cloud-migration-checklist` |

Each article follows one template: descriptive H1, 40–160-word intro answering the query directly, H2/H3 structure with tables/callouts where they aid scanning, a 4-question FAQ matching real buyer questions, and internal links back to the relevant service pillar and case studies. No invented statistics, pricing figures, or client names — guidance is framed as method, ranges and decision criteria.

**Publishing cadence (recommended)**: 2–4 high-quality articles/month; 1 case study expansion/month; 1 major original resource/quarter (e.g., "State of Ethiopian Enterprise Technology" — only if Nexyovi has genuine data).

**Original research assets (link-magnets, only with real data)**: technology market analysis, security incident benchmarks from managed services work, salary/talent guides.

---

## 4. On-Page Changes (implemented)

| Page | Title | Notes |
|---|---|---|
| `/` | Software Development & AI Company in Ethiopia \| Nexyovi | New |
| `/services` | Enterprise Technology Services — Software, AI, Cloud & Security \| Nexyovi | New |
| `/services/software` | Software Engineering Services in Ethiopia \| Nexyovi | New (dynamic) |
| `/services/ai` | Artificial Intelligence Services in Ethiopia \| Nexyovi | New (dynamic) |
| `/services/security` | Cybersecurity Services in Ethiopia \| Nexyovi | New (dynamic) |
| `/services/{cloud,data,managed,networking}` | per-service titles | New (dynamic) |
| `/industries` | Industries We Serve — FinTech, HealthTech, GovTech & More \| Nexyovi | New |
| `/projects` | Software Projects & Case Studies \| Nexyovi | New |
| `/projects/{slug}` | per-case-study titles | New (dynamic) |
| `/company` | About Nexyovi — Software Engineering Company in Addis Ababa | New |
| `/contact` | Contact Nexyovi — Start Your Software Project in Addis Ababa | New + FAQ |
| `/careers`, `/internship`, `/request-demo`, `/legal` | unique titles | New |
| `/blog` | Engineering Insights: Software, AI & Cloud Guides \| Nexyovi | New |
| `/blog/:slug` | per-article `seoTitle` | New (dynamic, `type=article`) |

Every page: unique meta description, canonical URL, OG/Twitter tags, robots directive.

**Soft-404 handling**: the SPA catch-all route renders `<Home />` for any unknown path (HTTP 200), which would otherwise create indexable duplicate URLs. Unknown paths now resolve to `noindex, nofollow` with `canonical` pointing at `https://www.nexyovi.com/` — crawlers still get content, but only the real home URL is indexed.

**H1 hygiene**: Services.tsx and Projects.tsx previously rendered **two H1s** — second hero lines converted to styled `<p>` (identical visuals, one H1 per page).

**Indexation**: `/admin*`, `/systems*`, `/map-calibrate` → `noindex, nofollow` + robots.txt disallow + excluded from sitemap. Redirect routes (`/security`, `/software`, `/fintech`, etc.) not in sitemap; canonical targets are.

---

## 5. Technical SEO Changes (implemented)

1. **Per-route head management** (`SeoManager.tsx` + `lib/seo.ts`) — title, description, robots, canonical, OG, Twitter, dynamic JSON-LD, GA4 `page_view` on every route change.
2. **robots.txt** — blocks `/admin`, `/systems`, `/map-calibrate`, `/api/`; explicitly allows AI crawlers (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, etc.); Sitemap declared.
3. **sitemap.xml** — 25 canonical URLs (core pages, 7 services, 3 case studies, `/blog` + 4 articles); accurate lastmod; excludes private/redirect/noindex routes.
4. **Structured data (JSON-LD)**:
   - Static `@graph` in index.html: **Organization**, **WebSite**, **ProfessionalService** (with NAP, geo coordinates, founder, knowsAbout) — readable without JS execution.
   - Dynamic: **Service** + **BreadcrumbList** on service pages, **BreadcrumbList** on case studies, **FAQPage** on `/contact`.
5. **Geo meta tags** — `geo.region`, `geo.placename`, `geo.position`, ICBM.
6. **noscript SEO fallback** — services/industries/contact summary for non-JS crawlers.
7. **CSP updates** (index.html + backend) — allow Google Tag Manager / GA4 endpoints.
8. **Internal linking fixes** — Footer pointed at redirect URLs (`/services/infrastructure`, `/services/apps`) → canonical (`/services/cloud`, `/services/security`); reduces pointless redirect hops for crawlers.
9. **Hreflang**: intentionally **not** added (single-language site; only add when real `/am/` or country variants exist).
10. **Alt text** — footer logo given descriptive alt; placeholder social `href="#"` links removed from DOM.
11. **JavaScript payload / Core Web Vitals** — `vite.config.ts` splits the single 1,155.92 kB entry bundle into cached vendor chunks (`vendor-react`, `vendor-motion`, `vendor-ui`, `vendor-forms`) and lazy-loads the standalone CRM demo. The initial entry is now **530 kB (−54%, 138 kB gzipped)**, so first paint no longer waits on all application code and vendor chunks stay cached across deployments. Fonts remain preconnected; no render-blocking third-party scripts (GA4 loads only when `VITE_GA4_ID` is set).
12. **`security.txt`** — published at `/.well-known/security.txt` (the file previously lived only outside `frontend/public/`, so it was never copied into `dist/`).

---

## 6. AI Search / GEO Strategy (implemented + ongoing)

**Implemented**:
- Direct-answer content blocks: FAQ on `/contact` answers "How do I start a project with Nexyovi?", "Where is Nexyovi located?", "What services does Nexyovi provide?", "Which industries does Nexyovi serve?", "How quickly does Nexyovi respond?", "Does Nexyovi work with international clients?" — the exact questions AI engines synthesize.
- Entity clarity: consistent name/description/NAP across Organization schema, footer, contact page.
- `knowsAbout` declarations for service entities.
- Static JSON-LD readable without JS; robots.txt welcomes AI bots.
- Homepage/services descriptions written as extractable factual statements, not vague marketing.

**Ongoing GEO actions**:
1. Monitor AI answers monthly for: "best software development companies in Ethiopia", "AI companies in Ethiopia", "cybersecurity companies in Ethiopia", "custom software development Addis Ababa", "who provides digital transformation services in Ethiopia?" — check whether Nexyovi is mentioned/cited/described accurately.
2. Publish original, citable resources (frameworks, guides with real data) — AI engines favor unique sources.
3. Keep case studies with concrete metrics — high AI citation likelihood.
4. Ensure Wikipedia/Wikidata eligibility evolves naturally via real press (do not fabricate).

---

## 7. Off-Page / Digital PR / Backlink Strategy (ethical)

**Do**: Ethiopian business media (Capital Ethiopia, Addis Fortune, The Reporter), African tech publications (TechCabal, iTNews Africa, Techpoint Africa), guest technical articles, open-source contributions, university partnerships (AAU, AASTU, Bahir Dar, Hawassa — already displayed as partners), conference talks, association memberships, client case-study co-publication (Gebeya, Arifpay have real relationships).

**Do not**: paid link schemes, PBNs, mass directory submission, fabricated awards/reviews.

**Linkable assets to build**: security checklists, AI adoption framework, Ethiopian tech salary report (only with genuine data), open-source tools.

---

## 8. Analytics & Conversion Tracking (implemented)

**Activation**: set `VITE_GA4_ID=G-XXXXXXXXXX` in `frontend/.env.production`. Without it, all tracking calls are silent no-ops (no console errors, no network calls).

**Events**:
| Event | Trigger | Location |
|---|---|---|
| `page_view` | every route change | SeoManager |
| `cta_click` | primary CTA buttons | CTAButton |
| `contact_click` | email / phone / whatsapp / map clicks | Footer, Contact |
| `form_start` | first keystroke in contact/demo forms | Contact, RequestDemo |
| `generate_lead` | contact form submitted | Contact |
| `generate_lead` | demo request submitted | RequestDemo |
| `form_error` | validation/submit failure | Contact, RequestDemo |

**Recommended GA4 conversions to configure**: mark `generate_lead` as a key event; import `contact_click` (whatsapp/phone) as secondary conversions.

**Privacy**: no PII in event params (labels only, no form values); `anonymize_ip` enabled; page_view is manually fired (SPA-safe).

**Google Search Console**: verify `https://www.nexyovi.com/`, submit `sitemap.xml`, monitor Coverage/CWV/Queries monthly. The site already exposes `/.well-known/security.txt`.

---

## 9. Monitoring Framework (KPIs)

**Monthly**:
- Organic sessions/users (GA4), organic conversions (generate_lead)
- GSC: clicks, impressions, CTR, avg position by page & query
- Indexed pages vs sitemap (Coverage report)
- Core Web Vitals (field data)
- Keyword movements for P0/P1 terms
- AI-answer presence spot-check (manual prompt set, §6)

**Quarterly**:
- Referring domains / backlink quality review
- Content refresh audit: pages with declining CTR or impressions-but-no-clicks → refresh titles/descriptions/content
- Sitemap/robots validation, structured-data validation (Rich Results Test)
- Broken-link and orphan-page check

---

## 10. Files Changed

| File | Change |
|---|---|
| `frontend/src/lib/seo.ts` | **NEW** — site identity, route metadata registry, JSON-LD builders, GA4 helpers |
| `frontend/src/components/SeoManager.tsx` | **NEW** — per-route head sync + dynamic schema + page_view |
| `frontend/index.html` | SEO title/description/canonical, geo tags, full OG/Twitter, static Organization/WebSite/ProfessionalService JSON-LD, CSP +GA4, noscript fallback |
| `frontend/public/robots.txt` | **NEW** — crawler + AI-bot policy, sitemap reference |
| `frontend/public/sitemap.xml` | **NEW** — 20 canonical URLs |
| `frontend/src/App.tsx` | mount `<SeoManager />` |
| `frontend/src/pages/Services.tsx` | double-H1 fix |
| `frontend/src/pages/Projects.tsx` | double-H1 fix |
| `frontend/src/components/Footer.tsx` | canonical service links, logo alt text, placeholder-social removal, contact click tracking |
| `frontend/src/components/CTAButton.tsx` | cta_click tracking |
| `frontend/src/pages/Contact.tsx` | form_start/generate_lead/form_error tracking, contact-link tracking, FAQ section |
| `frontend/src/pages/RequestDemo.tsx` | form_start/generate_lead/form_error tracking |
| `frontend/src/content/articles.ts` | **NEW** — typed article registry (`ARTICLES`, `getArticleBySlug`) |
| `frontend/src/content/articles/*.ts` | **NEW** — the 4 published articles (cost guide, AI framework, cybersecurity, cloud migration) |
| `frontend/src/pages/Blog.tsx` | **NEW** — blog index |
| `frontend/src/pages/ArticleDetail.tsx` | **NEW** — article renderer (TOC, block renderer, FAQ, related links, CTA) |
| `frontend/src/App.tsx` | mount `<SeoManager />`; `/blog` + `/blog/:slug` routes; lazy `CRMSystem` |
| `frontend/vite.config.ts` | `manualChunks` vendor splitting + lazy CRM chunk |
| `frontend/public/.well-known/security.txt` | **NEW in `public/`** — now emitted to `dist/` |
| `frontend/seo-validate.mjs` | **NEW** — headless route/schema validation script |
| `backend/app.js` | CSP allowlist for GA4 (script + connect) |
| `docs/SEO_STRATEGY.md` | **NEW** — this document |

---

## 11. Build Status

- `npm run lint` — see below (pre-existing warnings unchanged)
- `npx tsc -b` — all SEO-touching files typecheck clean; pre-existing errors in unrelated files (Hero lucide props, Careers framer-motion easing arrays, admin `showToast`, `window.turnstile` typing) were **not introduced** by this work and are left untouched
- `npm run build` — **passes** (vite build, no type gate)
- JS payload — entry chunk **1,155.92 kB → 530.42 kB** (138.44 kB gzip); vendors split into cacheable chunks (vendor-react 175.85 kB, vendor-motion 143.70 kB, vendor-forms 197.69 kB, vendor-ui 31.82 kB); CRM demo (132.72 kB) lazy-loaded
- `npm run seo:validate` (`frontend/seo-validate.mjs`) — headless check of 32 routes: titles ≤65ch, descriptions 80–180ch, canonical correctness, index/noindex directives, JSON-LD parse + type checks (breadcrumb positions, FAQ counts, Service provider `@id`), plus spot-checks on Organization/founder/NAP/geo and BlogPosting fields — **✅ ALL CHECKS PASSED**

## 12. Anti-Spam Compliance

No keyword stuffing (titles follow `Primary Keyword | Nexyovi` naturally), no hidden text, no doorway pages, no fake locations/reviews/awards/clients, no purchased backlinks, no fabricated statistics or schema (all JSON-LD uses verified NAP, founder, and service data), FAQ content reflects genuine customer questions and existing business facts.
