import type { Article } from '../articles';

export const cloudMigrationChecklist: Article = {
  slug: 'cloud-migration-checklist',
  title: 'Cloud Migration Checklist: A Practical Guide for Enterprises',
  seoTitle: 'Enterprise Cloud Migration Checklist (2026 Guide) | Nexyovi',
  metaDescription:
    'A step-by-step enterprise cloud migration checklist: assess workloads with the 6 Rs, plan the landing zone, cut over with minimal downtime, and optimize cost.',
  h1: 'Cloud Migration Checklist: A Practical Guide for Enterprises',
  excerpt:
    'From workload assessment to cost optimization — a phased checklist for moving enterprise systems to the cloud without downtime, budget surprises, or security gaps.',
  category: 'Cloud',
  readingTime: '8 min read',
  publishedAt: '2026-09-29',
  updatedAt: '2026-09-29',
  author: {
    name: 'Nexyovi Engineering Team',
    role: 'Cloud & Infrastructure, Nexyovi Technologies',
    url: 'https://www.nexyovi.com/company',
  },
  keywords: [
    'cloud migration checklist',
    'cloud migration strategy',
    'enterprise cloud adoption',
    'cloud computing Ethiopia',
  ],
  accent: '#0ea5e9',
  intro: [
    'Cloud migrations succeed or fail long before the first workload moves. The organizations that struggle treat migration as a lift-and-shift IT exercise; the ones that succeed treat it as an architecture program with a business case, a workload-by-workload plan, and a cost model that survives contact with reality.',
    'This checklist condenses the process into phases you can run in order: assess, plan, prepare, migrate, optimize. It is platform-neutral — the same structure applies to AWS, Azure, GCP, or a hybrid arrangement, which matters in markets where connectivity, data-residency rules, and existing datacenter investments shape the decision.',
  ],
  body: [
    {
      type: 'h2',
      id: 'phase-1',
      text: 'Phase 1 — Assess: inventory workloads and assign a disposition',
    },
    {
      type: 'p',
      text: 'Every workload gets an explicit disposition. The industry-standard "6 Rs" framework keeps this honest — forcing a decision instead of defaulting everything to "migrate".',
    },
    {
      type: 'table',
      headers: ['Disposition', 'Meaning', 'Typical when…'],
      rows: [
        ['Rehost (lift-and-shift)', 'Move as-is', 'Speed matters; app is stable; rework is not justified yet'],
        ['Replatform', 'Minor optimizations during move (managed DB, containers)', 'Small changes remove operational burden cheaply'],
        ['Refactor', 'Re-architect for cloud', 'Scale, resilience, or release velocity demands it'],
        ['Repurchase', 'Move to SaaS', 'Commodity capability (email, CRM) exists off-the-shelf'],
        ['Retire', 'Decommission', 'Nobody can justify keeping it — a common 10–20% of portfolios'],
        ['Retain', 'Keep on-prem (for now)', 'Latency, regulation, or cost says no'],
      ],
    },
    {
      type: 'callout',
      title: 'Migration reality check',
      text: 'Not everything belongs in the cloud. Latency-sensitive industrial systems, strict data-sovereignty workloads, and applications scheduled for replacement are legitimate "retain" decisions. A hybrid result is a success, not a failure.',
    },
    {
      type: 'h2',
      id: 'phase-2',
      text: 'Phase 2 — Plan: business case, landing zone, and network',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Build the business case from totals, not rates: infrastructure + licenses + migration effort + training + dual-running costs, against expected savings and capability gains.',
        'Design the landing zone first — account/subscription structure, identity federation, network topology, guardrails as code. Retro-fitting governance after workloads land is painful and expensive.',
        'Plan connectivity: dedicated links or VPN for hybrid operation, bandwidth for the migration itself, DNS strategy for cutover.',
        'Define security baselines: encryption at rest/in transit, key management, logging from day one. Cloud security is configuration, and misconfiguration — not the cloud provider — causes incidents.',
        'Sequence workloads: start with a low-risk, visible system to build team experience; save the crown jewels until the pattern is proven.',
      ],
    },
    {
      type: 'h2',
      id: 'phase-3',
      text: 'Phase 3 — Prepare: prove it with a pilot',
    },
    {
      type: 'p',
      text: 'Run a pilot migration of the first-sequence workload end to end, including cutover, rollback rehearsal, and post-move validation. The pilot\'s real output is organizational: runbooks, cost data, and a team that has done it once. Update your estimate and timeline with this evidence before committing to the full program.',
    },
    {
      type: 'h2',
      id: 'phase-4',
      text: 'Phase 4 — Migrate: execute with minimal downtime',
    },
    {
      type: 'list',
      items: [
        'Choose the cutover pattern per workload: staged data replication with a short switchover window for databases; blue/green or canary for stateless services; big-bang only for systems that cannot straddle two environments.',
        'Rehearse the rollback before you need it — every cutover plan needs a tested way back.',
        'Freeze risky changes on the source system during the migration window.',
        'Validate in production: smoke tests, data reconciliation (counts, totals, checksums), performance baselines vs. the old environment.',
        'Keep dual-running costs in the plan for a defined period — running both environments briefly is cheaper than one rushed mistake.',
      ],
    },
    {
      type: 'h2',
      id: 'phase-5',
      text: 'Phase 5 — Optimize: where the business case is won or lost',
    },
    {
      type: 'p',
      text: 'Migration is not the finish line. The first 90 days after each wave determine whether the cloud is an upgrade or a budget leak.',
    },
    {
      type: 'list',
      items: [
        'Right-size from actual telemetry — the utilization data after migration almost always differs from pre-move estimates.',
        'Buy commitments (reserved instances / savings plans) for steady-state workloads once usage patterns stabilize.',
        'Turn off, then delete: decommission source systems on schedule; unused environments are silent spend.',
        'Automate governance: tagging policies, budget alerts, and shutdown of idle resources. Cost management is an ongoing practice, not a one-time review.',
        'Modernize incrementally — containers, managed databases, and infrastructure-as-code deliver the operational gains that justify the program.',
      ],
    },
    {
      type: 'h2',
      id: 'pitfalls',
      text: 'Common migration pitfalls',
    },
    {
      type: 'list',
      items: [
        'Lifting on-prem habits into the cloud — servers sized for peak 24/7, manual patching, per-server thinking.',
        'No cost ownership — someone must be accountable for the monthly bill, with visibility per team.',
        'Security as a post-migration task — cloud misconfiguration is the top cloud incident cause; guardrails belong in the landing zone.',
        'Skipping data migration design — schema conversion, bandwidth, and consistency validation are the slow, risky parts.',
        'Forgetting the people — training and a cloud-operations runbook are part of the migration, not an afterthought.',
      ],
    },
    {
      type: 'h2',
      id: 'checklist',
      text: 'The condensed checklist',
    },
    {
      type: 'list',
      items: [
        'Every workload has a 6-R disposition with a named owner',
        'Business case includes dual-running and training costs',
        'Landing zone with identity, network, and guardrails as code',
        'Security baseline: encryption, key management, centralized logging',
        'Pilot workload migrated, including tested rollback',
        'Cutover runbooks with downtime windows communicated to the business',
        'Data reconciliation plan (counts, totals, checksums) per database',
        'Cost telemetry: tagging, budgets, alerts, commitment plan after 90 days',
        'Source systems decommissioned on a dated schedule',
        'Team trained; runbooks and architecture docs handed over',
      ],
    },
  ],
  faq: [
    {
      question: 'How long does an enterprise cloud migration take?',
      answer:
        'A single well-scoped workload migrates in weeks; a full enterprise portfolio is typically a 6–18 month program run in waves. The assessment and landing-zone phases are front-loaded, and each wave should end with production validation and cost review before the next begins.',
    },
    {
      question: 'Will cloud migration really save money?',
      answer:
        'It can, but not automatically. Savings come from right-sizing, commitments on steady-state workloads, and decommissioning legacy systems — not from moving servers as they are. Lift-and-shift without optimization often costs more initially; the business case should account for a 6–12 month optimization window.',
    },
    {
      question: 'How do we keep systems online during migration?',
      answer:
        'By choosing the right cutover pattern per workload: replicate data ahead of time and switch over in a short window, use blue/green deployments for stateless services, and rehearse rollback before every cutover. Zero-downtime is achievable for most systems with proper planning; it is architecture work, not luck.',
    },
    {
      question: 'Should we choose AWS, Azure, or a hybrid approach?',
      answer:
        'The platform matters less than the workload fit and your team\'s operability. Consider existing licensing investments, data-residency requirements, connectivity options in your region, and where your engineering skills are. Many Ethiopian enterprises land on hybrid or multi-cloud arrangements for regulatory and resilience reasons — design the landing zone to accommodate that from the start.',
    },
  ],
  relatedServices: [
    { label: 'Cloud & Infrastructure Services', to: '/services/cloud' },
    { label: 'Data Systems', to: '/services/data' },
    { label: 'Managed Technology', to: '/services/managed' },
  ],
  relatedArticles: ['software-cost-guide', 'ai-adoption-framework'],
};
