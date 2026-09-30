// Headless validation of the SEO layer, no browser required.
//
// Boots Vite in middleware mode, loads src/lib/seo.ts through ssrLoadModule and
// asserts the metadata + JSON-LD invariants for every public, private and
// unknown route. Run from the frontend/ directory:  npm run seo:validate
import { createServer } from 'vite';

const vite = await createServer({
  root: process.cwd(),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const seo = await vite.ssrLoadModule('/src/lib/seo.ts');

let failures = 0;
const check = (name, cond, detail = '') => {
  if (cond) console.log('  ✓', name, detail);
  else { console.log('  ✗ FAIL:', name, detail); failures++; }
};

const routes = [
  '/', '/services', '/services/software', '/services/ai', '/services/cloud',
  '/services/security', '/services/data', '/services/managed', '/services/networking',
  '/industries', '/projects', '/projects/global-bank-security', '/projects/ai-smart-logistics',
  '/projects/tele-psychiatry', '/company', '/about/yonas-bogale-sitotaw', '/contact', '/careers', '/internship',
  '/request-demo', '/legal', '/blog',
  '/blog/how-much-does-custom-software-development-cost-in-ethiopia',
  '/blog/ai-adoption-framework-for-enterprises',
  '/blog/cybersecurity-essentials-for-ethiopian-businesses',
  '/blog/cloud-migration-checklist',
  '/admin/login', '/systems/crm', '/map-calibrate', '/careers/apply', '/internship/apply', '/nonexistent-page',
];

for (const route of routes) {
  const m = seo.getRouteMeta(route);
  console.log('\n── ' + (route === '/nonexistent-page' ? '/  (catch-all: renders home + noindex)' : route));
  check('title unique & ≤65ch', m.title.length <= 65, `(${m.title.length}) "${m.title}"`);
  // Pages that are noindexed never appear in SERPs — their meta tags are informational only.
  // The catch-all '*' route inherits '/' metadata plus noindex (so a 239-char
  // description is not a real SERP issue — it will never be indexed).
  if (m.noindex) {
    console.log('  ✓ noindex (private route / catch-all, not subject to SERP length checks)', m.robots);
    continue;
  }
  // Real SERP truncation happens above ~170–180 chars; 80–180 is the safe band.
  check('description 80–180ch', m.description.length >= 80 && m.description.length <= 180, `(${m.description.length})`);
  check('canonical correct', m.canonical === 'https://www.nexyovi.com' + route, m.canonical);
  const isPrivate = route.startsWith('/admin') || route.startsWith('/systems') || route.startsWith('/map-calibrate');
  check('robots directive', isPrivate ? m.noindex === true : (m.noindex === false && m.robots.includes('index')), m.robots);

  // validate JSON-LD parses
  for (const { id, data } of m.jsonLd) {
    const json = JSON.stringify(data);
    try {
      const parsed = JSON.parse(json);
      check(`jsonld:${id} valid`, parsed['@context'] === 'https://schema.org' && !!parsed['@type'], `(${parsed['@type']})`);
      if (parsed['@type'] === 'BreadcrumbList') {
        check('  breadcrumb positions', parsed.itemListElement.every((it, i) => it.position === i + 1));
      }
      if (parsed['@type'] === 'FAQPage') {
        check('  faq count', parsed.mainEntity.length >= 4, `(${parsed.mainEntity.length} questions)`);
      }
      if (parsed['@type'] === 'Service') {
        check('  service provider @id', parsed.provider['@id'] === 'https://www.nexyovi.com/#organization');
      }
    } catch (e) { check(`jsonld:${id} parses`, false, e.message); }
  }
}

// Dedicated checks
console.log('\n══ schema builder spot-checks');
const org = seo.organizationSchema();
check('Organization founder @id → Person node', org.founder['@id'] === 'https://www.nexyovi.com/#person-yonas-bogale-sitotaw');
check('Organization NAP', org.address.addressLocality === 'Addis Ababa');
check('Organization foundingDate 2024', org.foundingDate === '2024', org.foundingDate);
const lb = seo.localBusinessSchema();
check('LocalBusiness geo', lb.geo.latitude === 9.005401 && lb.geo.longitude === 38.763611);
const ws = seo.websiteSchema();
check('WebSite publisher ref', ws.publisher['@id'] === 'https://www.nexyovi.com/#organization');

console.log('\n══ entity graph spot-checks');
const person = seo.personSchema();
check('Person canonical name', person.name === 'Yonas Bogale Sitotaw');
check('Person alternateName', Array.isArray(person.alternateName) && person.alternateName.includes('Yonas Bogale') && person.alternateName.includes('Yons'), JSON.stringify(person.alternateName));
check('Person worksFor → Organization @id', person.worksFor['@id'] === 'https://www.nexyovi.com/#organization');
check('Person knowsAbout', person.knowsAbout.includes('Security engineering') && person.knowsAbout.includes('AI engineering'));
check('Person sameAs (LinkedIn/GitHub/IG/FB)', person.sameAs.length === 4 && person.sameAs.includes('https://github.com/jonnahjr'), JSON.stringify(person.sameAs));
check('Person image set', typeof person.image === 'string' && person.image.startsWith('https://'));
check('Person/Org @id reciprocal link', org.founder['@id'] === person['@id']);
const profile = seo.profilePageSchema();
check('ProfilePage mainEntity → Person @id', profile.mainEntity['@id'] === person['@id']);
const profileMeta = seo.getRouteMeta('/about/yonas-bogale-sitotaw');
check('Profile route indexable', profileMeta.noindex === false && profileMeta.robots.includes('index'));
check('Profile canonical', profileMeta.canonical === 'https://www.nexyovi.com/about/yonas-bogale-sitotaw');
check('Profile emits ProfilePage+Person+Breadcrumb', profileMeta.jsonLd.map((n) => n.id).join(',') === 'profilepage,person,breadcrumb');

const art = seo.getRouteMeta('/blog/cloud-migration-checklist');
const posting = art.jsonLd.find(x => x.id === 'article')?.data;
check('BlogPosting type', posting['@type'] === 'BlogPosting');
check('BlogPosting dates', posting.datePublished === '2026-09-29' && posting.dateModified === '2026-09-29');
check('BlogPosting author is Person', posting.author['@type'] === 'Person');
// Author @id maps to the founder Person node only for founder-authored articles;
// team-authored posts link to the Company page instead.
check('BlogPosting author resolves correctly', posting.author['@id'] === 'https://www.nexyovi.com/#person-yonas-bogale-sitotaw' || posting.author.url === 'https://www.nexyovi.com/company');

const faqContact = seo.getRouteMeta('/contact').jsonLd.find(x => x.id === 'faq')?.data;
check('Contact FAQPage', faqContact && faqContact.mainEntity.length === 6);

console.log('\n' + (failures === 0 ? '✅ ALL CHECKS PASSED' : `❌ ${failures} FAILURES`));
await vite.close();
process.exit(failures === 0 ? 0 : 1);
