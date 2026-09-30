import type { Article } from '../articles';

export const cybersecurityEssentials: Article = {
  slug: 'cybersecurity-essentials-for-ethiopian-businesses',
  title: 'Cybersecurity Essentials for Ethiopian Businesses',
  seoTitle: 'Cybersecurity Essentials for Ethiopian Businesses | Nexyovi',
  metaDescription:
    'A prioritized cybersecurity baseline for Ethiopian organizations: the highest-impact controls first, a 12-month roadmap, compliance orientation, and low-budget starting points.',
  h1: 'Cybersecurity Essentials for Ethiopian Businesses',
  excerpt:
    'The highest-impact security controls for organizations starting their program — prioritized, practical, and mapped to recognized frameworks like CIS Controls v8 and ISO 27001.',
  category: 'Cybersecurity',
  readingTime: '9 min read',
  publishedAt: '2026-09-29',
  updatedAt: '2026-09-29',
  author: {
    name: 'Nexyovi Engineering Team',
    role: 'Cybersecurity, Nexyovi Technologies',
    url: 'https://www.nexyovi.com/company',
  },
  keywords: [
    'cybersecurity Ethiopia',
    'cybersecurity for business',
    'information security basics',
    'security controls for SMB',
  ],
  accent: '#10b981',
  intro: [
    'Cybersecurity advice often arrives as a 200-control checklist that no mid-sized organization can execute. The result is paralysis — or spending on the wrong things. In practice, a small set of foundational controls prevents the large majority of common attacks, because most intrusions still exploit basic gaps: unpatched systems, weak identity, and unmanaged devices.',
    'This guide presents a prioritized baseline for organizations building their first serious security program, oriented to internationally recognized frameworks (CIS Critical Security Controls, ISO 27001, NIST Cybersecurity Framework) rather than proprietary products. It is written for CTOs, IT managers, and founders — not security specialists.',
  ],
  body: [
    {
      type: 'h2',
      id: 'threats',
      text: 'What you are actually defending against',
    },
    {
      type: 'p',
      text: 'For most organizations — banks and telecoms aside — the realistic threat picture is narrow: financially motivated intrusion (ransomware, business email compromise), data theft, and insider mistakes. Nation-state attacks and zero-day exploits dominate headlines but are rare against typical targets. Your baseline should be sized to the common cases.',
    },
    {
      type: 'list',
      items: [
        'Phishing and business email compromise — the most common entry point, usually via email and identity attacks.',
        'Ransomware — encrypts business systems; usually arrives through stolen credentials or unpatched internet-facing services.',
        'Credential stuffing — reused passwords from other breaches replayed against your systems.',
        'Third-party compromise — vendors and partners with more access than they need.',
        'Human error — misconfigured cloud storage, sent files, deleted data.',
      ],
    },
    {
      type: 'h2',
      id: 'baseline',
      text: 'The essential baseline, in priority order',
    },
    {
      type: 'p',
      text: 'The controls below map to the CIS Critical Security Controls v8 (an internationally recognized prioritized framework). Implement them roughly in this order; each builds on the previous.',
    },
    {
      type: 'h3',
      id: 'b1',
      text: '1. Inventory and asset management',
    },
    {
      type: 'p',
      text: 'You cannot protect what you do not know exists. Maintain a live inventory of devices, servers, cloud accounts, and software. Unmanaged assets — the forgotten laptop, the old test server with a public IP — are where incidents start.',
    },
    {
      type: 'h3',
      id: 'b2',
      text: '2. Identity as the perimeter',
    },
    {
      type: 'p',
      text: 'Modern attacks target accounts, not firewalls. Enforce multi-factor authentication on email, VPN, cloud consoles, and admin accounts first. Remove standing admin rights from daily-use accounts. Centralize identity in one directory rather than per-system passwords.',
    },
    {
      type: 'callout',
      title: 'Highest ROI control',
      text: 'If you can only do one thing this quarter: enforce MFA everywhere, starting with email and administrative access. It defeats the credential attacks that power most ransomware and email compromise.',
    },
    {
      type: 'h3',
      id: 'b3',
      text: '3. Patch and vulnerability management',
    },
    {
      type: 'p',
      text: 'Define a cadence: critical security patches within days, regular patches within weeks, internet-facing systems prioritized. Automate where possible and track exceptions — an "accepted risk" list that nobody reviews is a hidden attack surface.',
    },
    {
      type: 'h3',
      id: 'b4',
      text: '4. Email and web protection',
    },
    {
      type: 'p',
      text: 'Deploy email filtering with attachment sandboxing, DMARC/DKIM/SPF for your domains (it prevents your brand being used in phishing), and web filtering that blocks known-malicious destinations. Train staff with realistic simulations — annually at minimum — focused on reporting, not blame.',
    },
    {
      type: 'h3',
      id: 'b5',
      text: '5. Backup and recovery',
    },
    {
      type: 'p',
      text: 'Backups are the ransomware insurance policy. Follow the 3-2-1 rule: at least three copies, two media, one offsite/offline and immutable if possible. Critically: test restoration. An untested backup is a hope, not a control.',
    },
    {
      type: 'h3',
      id: 'b6',
      text: '6. Network hygiene',
    },
    {
      type: 'p',
      text: 'Segment networks (office, guest, servers, IoT), close management interfaces from the public internet, use a firewall with default-deny inbound rules, and encrypt traffic (VPN for remote access, TLS for services).',
    },
    {
      type: 'h3',
      id: 'b7',
      text: '7. Logging and monitoring',
    },
    {
      type: 'p',
      text: 'Centralize logs from identity systems, endpoints, and key services with retention long enough to investigate an incident (weeks to months, not days). Monitoring turns a breach discovered in months into one contained in hours — the difference between an event and a catastrophe.',
    },
    {
      type: 'h3',
      id: 'b8',
      text: '8. Access reviews and least privilege',
    },
    {
      type: 'p',
      text: 'Quarterly, review who has access to what — especially departures, vendors, and admin rights. Least privilege is unglamorous and consistently effective.',
    },
    {
      type: 'h2',
      id: 'roadmap',
      text: 'A realistic 12-month security roadmap',
    },
    {
      type: 'table',
      headers: ['Quarter', 'Focus', 'Outcome'],
      rows: [
        ['Q1', 'Inventory + MFA everywhere + backup design', 'Identity hardened; recoverability established'],
        ['Q2', 'Patch cadence + email/DMARC + web filtering', 'Most common intrusion paths closed'],
        ['Q3', 'Network segmentation + logging/monitoring', 'Detection capability in place'],
        ['Q4', 'Policy suite + access reviews + incident response plan', 'Program institutionalized, audit-ready'],
      ],
    },
    {
      type: 'h2',
      id: 'compliance',
      text: 'Compliance orientation: ISO 27001, SOC 2, and sector rules',
    },
    {
      type: 'p',
      text: 'Frameworks matter when customers or regulators require them — the discipline they impose is the real value, not the certificate. Practical orientation for Ethiopian organizations:',
    },
    {
      type: 'list',
      items: [
        'ISO 27001 — the international information-security management standard; commonly requested by enterprise and international clients. The baseline above covers a large share of its operational controls.',
        'SOC 2 — relevant when serving North American customers; built on similar control themes with third-party attestation.',
        'Sector requirements — payment platforms align to PCI-DSS; government systems follow data-sovereignty and national security requirements. Health data carries additional obligations (HIPAA-aligned practice for international work).',
        'Ethiopian context — data protection and cybercrime legislation is evolving; treat central-bank directives (for fintech) and national data-residency expectations as design constraints, not afterthoughts.',
      ],
    },
    {
      type: 'h2',
      id: 'incident',
      text: 'Prepare an incident response plan (one page is enough to start)',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Who declares an incident, and who leads response (name people, not roles).',
        'How to isolate affected systems quickly, without waiting for approvals.',
        'Communication tree: leadership, staff, customers, regulator — with draft templates.',
        'Recovery order: which systems come back first, verified from tested backups.',
        'Post-incident review: what failed, what changes, who verifies.',
      ],
    },
    {
      type: 'callout',
      title: 'Security is a program, not a product',
      text: 'Tools alone do not create security. The combination of prioritized controls, trained people, tested recovery, and management attention does. Budget for the program, not just the licenses.',
    },
  ],
  faq: [
    {
      question: 'Where should a small security team start?',
      answer:
        'With identity and recovery: enforce multi-factor authentication everywhere, build and test offline backups, and take a full asset inventory. These three controls address the majority of common attack outcomes at modest cost, and everything else builds on them.',
    },
    {
      question: 'How much should an organization spend on cybersecurity?',
      answer:
        'There is no universal percentage; spend is sized by what you protect. A practical approach: baseline controls first (most are configuration and process, not purchases), then let compliance requirements and risk assessments drive further investment. Spending should always be traceable to a named risk or requirement.',
    },
    {
      question: 'What is a penetration test and do we need one?',
      answer:
        'A penetration test is an authorized, controlled attempt to breach your systems, producing a report of exploitable weaknesses. It is most valuable after the baseline is in place — testing an unhardened environment mostly rediscovers the basics. Organizations handling payments, health data, or serving international clients should test at least annually and after major changes.',
    },
    {
      question: 'How can we improve security without a big budget?',
      answer:
        'Most of the baseline is free or low-cost: MFA is included in mainstream email platforms, patching is process, DMARC is DNS configuration, backups are design discipline. Spend first on monitoring and expertise (internal or a managed security partner), not on tools you cannot operate.',
    },
  ],
  relatedServices: [
    { label: 'Cybersecurity Services', to: '/services/security' },
    { label: 'Managed Technology', to: '/services/managed' },
    { label: 'Infrastructure & Networking', to: '/services/networking' },
  ],
  relatedArticles: ['ai-adoption-framework', 'cloud-migration-checklist'],
};
