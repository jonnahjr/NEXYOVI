import React, { useState, useEffect } from 'react';
import { Save, X, Check, LayoutTemplate, Search, UploadCloud } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { supabase } from '../../lib/supabase';

// ════════════════════════════════════════════════════════════════
// ── DEFAULT VALUES — one-to-one with hardcoded site content
//    so admin forms are NEVER empty when first opened
// ════════════════════════════════════════════════════════════════
const SECTION_DEFAULTS: Record<string, Record<string, string>> = {
  // ═══ HOME PAGE ═══════════════════════════════════════
  hero: {
    mainHeadline: "The engineering partner Africa's fastest companies trust to build — and ship.",
    subtitle: 'We help startups, enterprises, and public institutions design, build, and scale mission-critical digital products.',
    statLine: 'Custom software deployed across multiple industries.',
    primaryCTA: 'Book a free strategy session',
    primaryLink: '/contact#inquiry',
    secondaryCTA: 'See our services',
    secondaryLink: '/services',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4',
  },
  trustLogos: {
    heading: 'Experience Across Enterprise, Government & Technology Sectors',
    subtitle: 'Trusted by leading organizations',
  },
  whyNexyovi: {
    badge: 'Why Nexyovi?',
    title: 'Real differentiation.',
    subtitle: 'This is what buyers compare. We deliver on every point.',
    card1Title: 'Senior Engineers Only',
    card1Desc: 'No junior staffing. Every project is led by experienced senior engineers who architect, build, and ship production-grade systems.',
    card1Link: '/services/software',
    card2Title: 'Security by Design',
    card2Desc: 'Security integrated from day one — not bolted on after. Every layer of every system is built with zero-trust principles and compliance in mind.',
    card2Link: '/services/security',
    card3Title: 'AI-Native Development',
    card3Desc: 'Modern AI tooling accelerates delivery across the entire development lifecycle — from code generation to testing, deployment, and monitoring.',
    card3Link: '/services/ai',
    card4Title: 'Long-Term Partnership',
    card4Desc: 'Support beyond launch. We stay engaged with proactive maintenance, continuous improvements, and strategic guidance as your business evolves.',
    card4Link: '/company',
  },
  servicesHome: {
    heading: 'Full-Stack Digital Services',
    description: 'From software and AI to infrastructure and strategy — we deliver end-to-end digital solutions for modern businesses.',
    ctaText: 'Explore All Capabilities',
    ctaLink: '/services',
  },
  technologies: {
    badge: 'Engineering Stack',
    title: 'Technologies We Build With',
    subtitle: 'Modern, battle-tested technologies we use to architect and deliver production-grade systems for startups, enterprises, and government organizations.',
  },
  industriesHome: {
    heading: 'Industries We Empower',
    description: 'Deep domain expertise across our core verticals — building solutions that understand your industry.',
    ctaText: 'Explore All Verticals',
    ctaLink: '/industries',
  },
  howWeWork: {
    heading: 'How We Work',
    description: 'Our engineering process is designed for transparency, security, and long-term success. From the first whiteboard session to post-launch support.',
    step1Title: 'Discovery',
    step1Desc: 'We analyze your business needs, technical constraints, and project objectives.',
    step2Title: 'Architecture',
    step2Desc: 'System design, database modeling, and technical infrastructure planning.',
    step3Title: 'Development',
    step3Desc: 'Agile sprints with regular reviews, focusing on clean code and performance.',
    step4Title: 'Deployment',
    step4Desc: 'Automated CI/CD pipelines, security audits, and seamless production launch.',
    step5Title: 'Support',
    step5Desc: 'Ongoing maintenance, proactive monitoring, and feature iteration.',
  },
  featuredProjects: {
    badge: 'Featured Projects',
    heading: "Products we've shipped.",
    description: 'Reference architectures and client solutions we have delivered.',
    ctaText: 'View All',
    ctaLink: '/projects',
  },
  delivery: {
    badge: 'Track Record',
    title: 'Proven Delivery Across Critical Industries',
    subtitle: 'Every engagement is measured by business impact, technical rigor, and long-term reliability. Here is how we deliver.',
  },
  engagementModels: {
    badge: 'How We Engage',
    heading: 'Flexible engagement models for every stage',
    description: 'Project-based, dedicated teams, fractional CTO, or long-term partnerships.',
  },
  security: {
    badge: 'Trust Architecture',
    title: 'Security Built Into Every Layer',
    subtitle: 'Enterprise-grade security is not an add-on — it is embedded in our architecture, processes, and delivery from day one.',
  },
  finalCta: {
    headline: "Let's Build What's Next.",
    description: "Whether you're launching a new platform, modernizing infrastructure, implementing AI systems, or scaling an existing product, our team helps turn complex ideas into secure, production-ready solutions.",
    primaryLabel: 'Book Strategy Session',
    primaryPath: '/contact?type=strategy-session#inquiry',
    secondaryLabel: 'Explore Our Work',
    secondaryPath: '/projects',
    trustIndicator1: 'Response within 24 hours',
    trustIndicator2: 'NDA available upon request',
    trustIndicator3: 'Senior engineers only',
    trustIndicator4: 'Long-term support available',
  },

  // ═══ COMPANY PAGE ═══════════════════════════════════
  companyHero: {
    headline: "Africa's engineering partner for mission-critical software systems.",
    subtitle: 'We design and build secure, scalable platforms for organizations that cannot afford to fail.',
    primaryCTA: 'Book a strategy session',
    primaryLink: '/contact#inquiry',
    secondaryCTA: 'Explore Services',
    secondaryLink: '/services',
    stat1Label: 'Enterprise Platforms',
    stat1Value: '10+',
    stat2Label: 'Elite Engineers',
    stat2Value: '20+',
    stat3Label: 'Countries',
    stat3Value: '4',
    stat4Label: 'Sectors',
    stat4Value: 'Banking · Gov · Telecom · Health',
  },
  companyMission: {
    badge: 'Why We Exist',
    heading: 'Mission & Vision.',
    missionText: 'To deliver enterprise software engineering, AI, and cloud infrastructure that helps organizations build and scale with confidence.',
    visionText: 'To build the technology infrastructure that powers Africa\'s next generation of global institutions — from fintech to government, healthcare to logistics — with world-class engineering, security, and reliability.',
  },
  companyPrinciples: {
    badge: 'Core Principles',
    title: 'Built on Principles.',
    subtitle: 'Uncompromising standards that guide our engineering and define every partnership.',
    principle1Title: 'Security as Foundation',
    principle1Desc: 'Security is not a feature — it is the foundation. Every system is built with zero-trust principles, encryption by default, and compliance-ready architecture.',
    principle2Title: 'Precision Over Speed',
    principle2Desc: 'We ship with precision, not speed for speed\'s sake. Fast delivery means nothing without reliability, security, and the right architecture underneath.',
    principle3Title: 'Global Ambition',
    principle3Desc: 'African innovation engineered to compete on the world stage. Great technology knows no borders.',
    principle4Title: 'Deep Partnership',
    principle4Desc: 'Not vendors, but technical co-founders committed to your mission and outcomes.',
    principle5Title: 'Technical Excellence',
    principle5Desc: 'Mastery is non-negotiable. We focus deeply on architecture, performance, and maintainability in everything we ship.',
    principle6Title: 'Client Success',
    principle6Desc: 'Your success is our success. We measure our performance by the quantifiable improvements we deliver.',
  },
  companyCapabilities: {
    badge: 'Our Capabilities',
    title: 'Full-Spectrum Capabilities.',
    subtitle: 'End-to-end capabilities across the full technology stack — from code to infrastructure.',
    cap1Title: 'Full-Stack Engineering',
    cap1Desc: 'Web, mobile, and backend systems engineered for scale, performance, and maintainability.',
    cap2Title: 'AI & Automation Expertise',
    cap2Desc: 'Custom LLM integrations, intelligent agents, and workflow automation for real business problems.',
    cap3Title: 'Cloud-Native Delivery',
    cap3Desc: 'Multi-cloud architecture, Kubernetes orchestration, and serverless deployments at global scale.',
    cap4Title: 'Enterprise Security Practices',
    cap4Desc: 'Zero-trust principles, automated security scanning, and compliance-aware engineering built into every delivery.',
  },
  companyWhyNexyovi: {
    badge: 'Why Nexyovi',
    title: 'Different by Design.',
    subtitle: 'We don\'t just write code — we take full ownership of outcomes.',
    pillar1Title: 'We Own Outcomes, Not Just Tickets',
    pillar1Desc: 'We measure success by what ships, performs, and endures. Every engagement is structured around deliverables, milestones, and measurable impact — not billable hours.',
    pillar2Title: 'Deep Engineering, Not Generalists',
    pillar2Desc: 'Our team is built around specialization — security, AI, cloud infrastructure, and full-stack development. You get experts, not generalist consultants.',
    pillar3Title: 'African Roots, Global Standards',
    pillar3Desc: 'Built in Ethiopia, delivering at world-class level. We combine deep local context with international engineering practices, compliance, and security standards.',
    pillar4Title: 'Long-Term Partnership, Not Vendorship',
    pillar4Desc: 'We embed with your team, understand your mission, and stay accountable for the long haul. Our best work happens in multi-year relationships.',
  },

  // ═══ SERVICES PAGE ══════════════════════════════════
  servicesHero: {
    headline1: 'Enterprise Technology.',
    headline2: 'Production-ready systems. Built for scale.',
    description: 'We design, build, and operate enterprise software, AI systems, and cloud infrastructure for organizations that need secure, scalable technology. Engineering-led delivery teams — no outsourcing layers.',
    primaryCTA: 'View All Services',
    primaryLink: '#services-grid',
    secondaryCTA: 'Book a strategy session',
    secondaryLink: '/contact#inquiry',
  },
  byTheNumbers: {
    badge: 'By the Numbers',
    title: 'Engineered for Impact.',
    description: 'Measurable results across every engagement.',
    metric1Label: 'Monitoring & Support',
    metric1Value: '24',
    metric1Suffix: '/7',
    metric2Label: 'Core Engineering Practices',
    metric2Value: '12',
    metric2Suffix: '+',
    metric3Label: 'Technology Domains',
    metric3Value: '6',
    metric3Suffix: '',
    metric4Label: 'Architect-Led Delivery',
    metric4Value: '100',
    metric4Suffix: '%',
  },
  servicesDifferentiators: {
    badge: 'Why Choose Us',
    title: 'Built Different.',
    subtitle: 'Not a consultancy. Not an agency. An engineering partner that ships.',
    diff1Title: 'Senior Engineering Teams',
    diff1Desc: 'Every engagement is led by experienced architects with a track record of shipping enterprise-scale systems. No junior allocation.',
    diff2Title: 'True Partnership Model',
    diff2Desc: 'We embed with your team, transfer knowledge continuously, and ensure you own the system — not us.',
    diff3Title: 'Outcome-Based Delivery',
    diff3Desc: 'We optimize for business KPIs, not technical vanity metrics. Measurable ROI before we scale engagement.',
  },

  // ═══ INDUSTRIES PAGE ════════════════════════════════
  industriesHero: {
    headline: 'Engineering for Regulated Industries.',
    description: 'Custom software, AI systems, and cloud infrastructure built for the compliance, security, and operational requirements of fintech, healthcare, government, and enterprise markets.',
    primaryCTA: 'Explore Industries',
    primaryLink: '#industries-overview',
  },

  // ═══ PROJECTS PAGE ═════════════════════════════════
  projectsHero: {
    headline: 'Engineering the Future, One Reference at a Time.',
    description: 'From AI-powered defense platforms to post-quantum settlement networks — explore our reference architectures and production applications.',
    primaryCTA: 'Book a strategy session',
    primaryLink: '/contact#inquiry',
  },
  projectsStats: {
    stat1Label: 'Projects Delivered',
    stat1Value: '50',
    stat1Suffix: '+',
    stat2Label: 'Organizations Served',
    stat2Value: '20',
    stat2Suffix: '+',
    stat3Label: 'Industries',
    stat3Value: '8',
    stat3Suffix: '',
    stat4Label: 'Service Verticals',
    stat4Value: '6',
    stat4Suffix: '+',
  },

  // ═══ CONTACT PAGE ══════════════════════════════════
  contactHero: {
    headline: "Let's Build Something Exceptional.",
    description: 'Engage our elite engineering team to build, secure, or scale your mission-critical enterprise systems.',
    primaryCTA: 'Submit Project Brief',
  },

  // ═══ GLOBAL ════════════════════════════════════════
  navigation: {
    linkLabels: 'Services, Industries, Portfolio, Company, Contact',
    linkPaths: '/services, /industries, /projects, /company, /contact',
    ctaText: 'Get Started',
    ctaLink: '/contact#inquiry',
  },
  seo: {
    metaTitle: 'Nexyovi | Multi-Disciplinary Tech Powerhouse',
    metaDescription: 'Nexyovi is a global tech leader specializing in Cyber Security, AI Solutions, Software Engineering, and Enterprise Networking.',
    ogImage: '',
    keywords: 'software engineering, AI, cybersecurity, cloud infrastructure, Ethiopia',
    faviconUrl: '/favicon.ico',
  },
  footer: {
    tagline: 'Nexyovi — Senior engineering, rooted in Addis Ababa, deployed globally.',
    copyright: '© 2025 Nexyovi Technologies. All rights reserved.',
    description: 'Enterprise software, AI systems, and cloud infrastructure for organizations that need secure, scalable technology.',
    serviceLink1Label: 'Software Engineering',
    serviceLink1Path: '/services/software',
    serviceLink2Label: 'AI & Automation',
    serviceLink2Path: '/services/ai',
    serviceLink3Label: 'Cloud & Infrastructure',
    serviceLink3Path: '/services/infrastructure',
    serviceLink4Label: 'Mobile Applications',
    serviceLink4Path: '/services/apps',
    serviceLink5Label: 'Data & Analytics',
    serviceLink5Path: '/services/data',
    companyLink1Label: 'Company',
    companyLink1Path: '/company',
    companyLink2Label: 'Industries',
    companyLink2Path: '/industries',
    companyLink3Label: 'Projects',
    companyLink3Path: '/projects',
    companyLink4Label: 'Contact',
    companyLink4Path: '/contact',
  },
};

// ── All content sections with comprehensive fields ───────────
const contentSections = [
  { id: 'hero', name: 'Hero Section', icon: '🎯', fields: [
    { key: 'mainHeadline', label: 'Main Headline', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    { key: 'statLine', label: 'Stat Line (small badge text)', type: 'text' },
    { key: 'primaryCTA', label: 'Primary CTA Text', type: 'text' },
    { key: 'primaryLink', label: 'Primary CTA Link', type: 'text' },
    { key: 'secondaryCTA', label: 'Secondary CTA Text', type: 'text' },
    { key: 'secondaryLink', label: 'Secondary CTA Link', type: 'text' },
    { key: 'videoUrl', label: 'Background Video URL', type: 'text' },
  ]},
  { id: 'trustLogos', name: 'Trust Logos Bar', icon: '🤝', fields: [
    { key: 'heading', label: 'Section Heading', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
  ]},
  { id: 'whyNexyovi', name: 'Why Nexyovi (Home)', icon: '💡', fields: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    { key: 'card1Title', label: 'Card 1 Title', type: 'text' },
    { key: 'card1Desc', label: 'Card 1 Description', type: 'textarea' },
    { key: 'card1Link', label: 'Card 1 Link', type: 'text' },
    { key: 'card2Title', label: 'Card 2 Title', type: 'text' },
    { key: 'card2Desc', label: 'Card 2 Description', type: 'textarea' },
    { key: 'card2Link', label: 'Card 2 Link', type: 'text' },
    { key: 'card3Title', label: 'Card 3 Title', type: 'text' },
    { key: 'card3Desc', label: 'Card 3 Description', type: 'textarea' },
    { key: 'card3Link', label: 'Card 3 Link', type: 'text' },
    { key: 'card4Title', label: 'Card 4 Title', type: 'text' },
    { key: 'card4Desc', label: 'Card 4 Description', type: 'textarea' },
    { key: 'card4Link', label: 'Card 4 Link', type: 'text' },
  ]},
  { id: 'servicesHome', name: 'Services (Home)', icon: '⚡', fields: [
    { key: 'heading', label: 'Section Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'ctaText', label: 'CTA Button Text', type: 'text' },
    { key: 'ctaLink', label: 'CTA Button Link', type: 'text' },
  ]},
  { id: 'technologies', name: 'Technologies', icon: '🛠️', fields: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'subtitle', label: 'Description', type: 'textarea' },
  ]},
  { id: 'industriesHome', name: 'Industries (Home)', icon: '🏭', fields: [
    { key: 'heading', label: 'Section Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'ctaText', label: 'CTA Button Text', type: 'text' },
    { key: 'ctaLink', label: 'CTA Button Link', type: 'text' },
  ]},
  { id: 'howWeWork', name: 'How We Work', icon: '📋', fields: [
    { key: 'heading', label: 'Section Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'step1Title', label: 'Step 1 Title', type: 'text' },
    { key: 'step1Desc', label: 'Step 1 Description', type: 'textarea' },
    { key: 'step2Title', label: 'Step 2 Title', type: 'text' },
    { key: 'step2Desc', label: 'Step 2 Description', type: 'textarea' },
    { key: 'step3Title', label: 'Step 3 Title', type: 'text' },
    { key: 'step3Desc', label: 'Step 3 Description', type: 'textarea' },
    { key: 'step4Title', label: 'Step 4 Title', type: 'text' },
    { key: 'step4Desc', label: 'Step 4 Description', type: 'textarea' },
    { key: 'step5Title', label: 'Step 5 Title', type: 'text' },
    { key: 'step5Desc', label: 'Step 5 Description', type: 'textarea' },
  ]},
  { id: 'featuredProjects', name: 'Featured Projects', icon: '📁', fields: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'heading', label: 'Section Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'ctaText', label: 'CTA Text', type: 'text' },
    { key: 'ctaLink', label: 'CTA Link', type: 'text' },
  ]},
  { id: 'delivery', name: 'Delivery Section', icon: '🚚', fields: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'subtitle', label: 'Description', type: 'textarea' },
  ]},
  { id: 'engagementModels', name: 'Engagement Models', icon: '🤝', fields: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'heading', label: 'Section Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
  ]},
  { id: 'security', name: 'Security Section', icon: '🔒', fields: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'subtitle', label: 'Description', type: 'textarea' },
  ]},
  { id: 'finalCta', name: 'Bottom CTA', icon: '📢', fields: [
    { key: 'headline', label: 'Headline', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'primaryLabel', label: 'Primary Button Text', type: 'text' },
    { key: 'primaryPath', label: 'Primary Button Link', type: 'text' },
    { key: 'secondaryLabel', label: 'Secondary Button Text', type: 'text' },
    { key: 'secondaryPath', label: 'Secondary Button Link', type: 'text' },
    { key: 'trustIndicator1', label: 'Trust Indicator 1', type: 'text' },
    { key: 'trustIndicator2', label: 'Trust Indicator 2', type: 'text' },
    { key: 'trustIndicator3', label: 'Trust Indicator 3', type: 'text' },
    { key: 'trustIndicator4', label: 'Trust Indicator 4', type: 'text' },
  ]},
  { id: 'companyHero', name: 'Company Hero', icon: '🏢', fields: [
    { key: 'headline', label: 'Main Headline', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    { key: 'primaryCTA', label: 'Primary CTA Text', type: 'text' },
    { key: 'primaryLink', label: 'Primary CTA Link', type: 'text' },
    { key: 'secondaryCTA', label: 'Secondary CTA Text', type: 'text' },
    { key: 'secondaryLink', label: 'Secondary CTA Link', type: 'text' },
    { key: 'stat1Label', label: 'Stat 1 Label', type: 'text' },
    { key: 'stat1Value', label: 'Stat 1 Value', type: 'text' },
    { key: 'stat2Label', label: 'Stat 2 Label', type: 'text' },
    { key: 'stat2Value', label: 'Stat 2 Value', type: 'text' },
    { key: 'stat3Label', label: 'Stat 3 Label', type: 'text' },
    { key: 'stat3Value', label: 'Stat 3 Value', type: 'text' },
    { key: 'stat4Label', label: 'Stat 4 Label', type: 'text' },
    { key: 'stat4Value', label: 'Stat 4 Value', type: 'text' },
  ]},
  { id: 'companyMission', name: 'Mission & Vision', icon: '🎯', fields: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'heading', label: 'Section Heading', type: 'text' },
    { key: 'missionText', label: 'Mission Text', type: 'textarea' },
    { key: 'visionText', label: 'Vision Text', type: 'textarea' },
  ]},
  { id: 'companyPrinciples', name: 'Core Principles', icon: '⭐', fields: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'subtitle', label: 'Description', type: 'textarea' },
    { key: 'principle1Title', label: 'Principle 1 Title', type: 'text' },
    { key: 'principle1Desc', label: 'Principle 1 Description', type: 'textarea' },
    { key: 'principle2Title', label: 'Principle 2 Title', type: 'text' },
    { key: 'principle2Desc', label: 'Principle 2 Description', type: 'textarea' },
    { key: 'principle3Title', label: 'Principle 3 Title', type: 'text' },
    { key: 'principle3Desc', label: 'Principle 3 Description', type: 'textarea' },
    { key: 'principle4Title', label: 'Principle 4 Title', type: 'text' },
    { key: 'principle4Desc', label: 'Principle 4 Description', type: 'textarea' },
    { key: 'principle5Title', label: 'Principle 5 Title', type: 'text' },
    { key: 'principle5Desc', label: 'Principle 5 Description', type: 'textarea' },
    { key: 'principle6Title', label: 'Principle 6 Title', type: 'text' },
    { key: 'principle6Desc', label: 'Principle 6 Description', type: 'textarea' },
  ]},
  { id: 'companyCapabilities', name: 'Company Capabilities', icon: '🔧', fields: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'subtitle', label: 'Description', type: 'textarea' },
    { key: 'cap1Title', label: 'Capability 1 Title', type: 'text' },
    { key: 'cap1Desc', label: 'Capability 1 Desc', type: 'textarea' },
    { key: 'cap2Title', label: 'Capability 2 Title', type: 'text' },
    { key: 'cap2Desc', label: 'Capability 2 Desc', type: 'textarea' },
    { key: 'cap3Title', label: 'Capability 3 Title', type: 'text' },
    { key: 'cap3Desc', label: 'Capability 3 Desc', type: 'textarea' },
    { key: 'cap4Title', label: 'Capability 4 Title', type: 'text' },
    { key: 'cap4Desc', label: 'Capability 4 Desc', type: 'textarea' },
  ]},
  { id: 'companyWhyNexyovi', name: 'Why Nexyovi (Company)', icon: '💪', fields: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'subtitle', label: 'Description', type: 'textarea' },
    { key: 'pillar1Title', label: 'Pillar 1 Title', type: 'text' },
    { key: 'pillar1Desc', label: 'Pillar 1 Description', type: 'textarea' },
    { key: 'pillar2Title', label: 'Pillar 2 Title', type: 'text' },
    { key: 'pillar2Desc', label: 'Pillar 2 Description', type: 'textarea' },
    { key: 'pillar3Title', label: 'Pillar 3 Title', type: 'text' },
    { key: 'pillar3Desc', label: 'Pillar 3 Description', type: 'textarea' },
    { key: 'pillar4Title', label: 'Pillar 4 Title', type: 'text' },
    { key: 'pillar4Desc', label: 'Pillar 4 Description', type: 'textarea' },
  ]},
  { id: 'servicesHero', name: 'Services Hero', icon: '🚀', fields: [
    { key: 'headline1', label: 'Headline Line 1', type: 'text' },
    { key: 'headline2', label: 'Headline Line 2 (gold)', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'primaryCTA', label: 'Primary CTA Text', type: 'text' },
    { key: 'primaryLink', label: 'Primary CTA Link', type: 'text' },
    { key: 'secondaryCTA', label: 'Secondary CTA Text', type: 'text' },
    { key: 'secondaryLink', label: 'Secondary CTA Link', type: 'text' },
  ]},
  { id: 'byTheNumbers', name: 'By the Numbers', icon: '📊', fields: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'metric1Label', label: 'Metric 1 Label', type: 'text' },
    { key: 'metric1Value', label: 'Metric 1 Value', type: 'number' },
    { key: 'metric1Suffix', label: 'Metric 1 Suffix', type: 'text' },
    { key: 'metric2Label', label: 'Metric 2 Label', type: 'text' },
    { key: 'metric2Value', label: 'Metric 2 Value', type: 'number' },
    { key: 'metric2Suffix', label: 'Metric 2 Suffix', type: 'text' },
    { key: 'metric3Label', label: 'Metric 3 Label', type: 'text' },
    { key: 'metric3Value', label: 'Metric 3 Value', type: 'number' },
    { key: 'metric3Suffix', label: 'Metric 3 Suffix', type: 'text' },
    { key: 'metric4Label', label: 'Metric 4 Label', type: 'text' },
    { key: 'metric4Value', label: 'Metric 4 Value', type: 'number' },
    { key: 'metric4Suffix', label: 'Metric 4 Suffix', type: 'text' },
  ]},
  { id: 'servicesDifferentiators', name: 'Service Diff\'s', icon: '🏆', fields: [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'subtitle', label: 'Description', type: 'textarea' },
    { key: 'diff1Title', label: 'Differentiator 1 Title', type: 'text' },
    { key: 'diff1Desc', label: 'Differentiator 1 Desc', type: 'textarea' },
    { key: 'diff2Title', label: 'Differentiator 2 Title', type: 'text' },
    { key: 'diff2Desc', label: 'Differentiator 2 Desc', type: 'textarea' },
    { key: 'diff3Title', label: 'Differentiator 3 Title', type: 'text' },
    { key: 'diff3Desc', label: 'Differentiator 3 Desc', type: 'textarea' },
  ]},
  { id: 'industriesHero', name: 'Industries Hero', icon: '🏗️', fields: [
    { key: 'headline', label: 'Main Headline', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'primaryCTA', label: 'Primary CTA Text', type: 'text' },
    { key: 'primaryLink', label: 'Primary CTA Link', type: 'text' },
  ]},
  { id: 'projectsHero', name: 'Projects Hero', icon: '📂', fields: [
    { key: 'headline', label: 'Main Headline', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'primaryCTA', label: 'Primary CTA Text', type: 'text' },
    { key: 'primaryLink', label: 'Primary CTA Link', type: 'text' },
  ]},
  { id: 'projectsStats', name: 'Projects Stats', icon: '📈', fields: [
    { key: 'stat1Label', label: 'Stat 1 Label', type: 'text' },
    { key: 'stat1Value', label: 'Stat 1 Value', type: 'number' },
    { key: 'stat1Suffix', label: 'Stat 1 Suffix', type: 'text' },
    { key: 'stat2Label', label: 'Stat 2 Label', type: 'text' },
    { key: 'stat2Value', label: 'Stat 2 Value', type: 'number' },
    { key: 'stat2Suffix', label: 'Stat 2 Suffix', type: 'text' },
    { key: 'stat3Label', label: 'Stat 3 Label', type: 'text' },
    { key: 'stat3Value', label: 'Stat 3 Value', type: 'number' },
    { key: 'stat3Suffix', label: 'Stat 3 Suffix', type: 'text' },
    { key: 'stat4Label', label: 'Stat 4 Label', type: 'text' },
    { key: 'stat4Value', label: 'Stat 4 Value', type: 'number' },
    { key: 'stat4Suffix', label: 'Stat 4 Suffix', type: 'text' },
  ]},
  { id: 'contactHero', name: 'Contact Hero', icon: '✉️', fields: [
    { key: 'headline', label: 'Main Headline', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'primaryCTA', label: 'Primary CTA Text', type: 'text' },
  ]},
  { id: 'navigation', name: 'Navigation', icon: '🧭', fields: [
    { key: 'linkLabels', label: 'Nav Link Labels (comma separated)', type: 'textarea' },
    { key: 'linkPaths', label: 'Nav Link Paths (comma separated)', type: 'textarea' },
    { key: 'ctaText', label: 'Primary Nav CTA Text', type: 'text' },
    { key: 'ctaLink', label: 'Primary Nav CTA Link', type: 'text' },
  ]},
  { id: 'seo', name: 'SEO & Metadata', icon: '🔍', fields: [
    { key: 'metaTitle', label: 'Default Meta Title', type: 'text' },
    { key: 'metaDescription', label: 'Default Meta Description', type: 'textarea' },
    { key: 'ogImage', label: 'OG Image URL', type: 'text' },
    { key: 'keywords', label: 'Keywords (comma separated)', type: 'textarea' },
    { key: 'faviconUrl', label: 'Favicon URL', type: 'text' },
  ]},
  { id: 'footer', name: 'Footer', icon: '📌', fields: [
    { key: 'tagline', label: 'Tagline', type: 'text' },
    { key: 'copyright', label: 'Copyright Text', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'serviceLink1Label', label: 'Service Link 1 Label', type: 'text' },
    { key: 'serviceLink1Path', label: 'Service Link 1 Path', type: 'text' },
    { key: 'serviceLink2Label', label: 'Service Link 2 Label', type: 'text' },
    { key: 'serviceLink2Path', label: 'Service Link 2 Path', type: 'text' },
    { key: 'serviceLink3Label', label: 'Service Link 3 Label', type: 'text' },
    { key: 'serviceLink3Path', label: 'Service Link 3 Path', type: 'text' },
    { key: 'serviceLink4Label', label: 'Service Link 4 Label', type: 'text' },
    { key: 'serviceLink4Path', label: 'Service Link 4 Path', type: 'text' },
    { key: 'serviceLink5Label', label: 'Service Link 5 Label', type: 'text' },
    { key: 'serviceLink5Path', label: 'Service Link 5 Path', type: 'text' },
    { key: 'companyLink1Label', label: 'Company Link 1 Label', type: 'text' },
    { key: 'companyLink1Path', label: 'Company Link 1 Path', type: 'text' },
    { key: 'companyLink2Label', label: 'Company Link 2 Label', type: 'text' },
    { key: 'companyLink2Path', label: 'Company Link 2 Path', type: 'text' },
    { key: 'companyLink3Label', label: 'Company Link 3 Label', type: 'text' },
    { key: 'companyLink3Path', label: 'Company Link 3 Path', type: 'text' },
    { key: 'companyLink4Label', label: 'Company Link 4 Label', type: 'text' },
    { key: 'companyLink4Path', label: 'Company Link 4 Path', type: 'text' },
  ]},
];

// ── File upload helper ───────────────────────────────────────
const uploadFile = async (file: File, folder: string): Promise<string> => {
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
  const { error } = await supabase.storage.from('nexyovi_assets').upload(`${folder}/${fileName}`, file);
  if (error) throw error;
  const { data } = supabase.storage.from('nexyovi_assets').getPublicUrl(`${folder}/${fileName}`);
  return data.publicUrl;
};

const AdminContent = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [activeSection, setActiveSection] = useState('hero');
  const [formData, setFormData] = useState<any>({});
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const section = contentSections.find(s => s.id === activeSection);
  const defaults = SECTION_DEFAULTS[activeSection] || {};
  // Merge saved data with defaults — saved overrides, defaults fill the rest
  const sectionData = { ...defaults, ...(formData[activeSection] || {}) };

  // Load from siteContent when switching sections
  useEffect(() => {
    const merged = { ...defaults, ...(siteContent[activeSection] || {}) };
    setFormData(prev => ({
      ...prev,
      [activeSection]: merged
    }));
  }, [activeSection]);

  const handleSave = async () => {
    try {
      const dataToSave = formData[activeSection] || {};
      await updateSiteContent(activeSection, dataToSave);
      setSaveStatus({ type: 'success', message: `${section?.name} saved!` });
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus({ type: 'error', message: 'Error saving changes' });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [activeSection]: { ...(prev[activeSection] || {}), [key]: value }
    }));
  };

  const handleImageUpload = async (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setUploadingField(fieldName);
    try {
      const url = await uploadFile(e.target.files[0], `content/${activeSection}`);
      handleFieldChange(fieldName, url);
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploadingField(null);
    }
  };

  const filteredSections = contentSections.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const savedData = siteContent[activeSection] || {};
  const hasChanges = JSON.stringify(formData[activeSection] || {}) !== JSON.stringify({ ...defaults, ...savedData });

  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutTemplate size={20} className="text-[#F5A800]" />
            <div>
              <h1 className="text-xl font-bold text-white">Site Content</h1>
              <p className="text-xs text-white/40 mt-0.5">Manage every section across all pages · Pre-filled with current site values</p>
            </div>
          </div>
          {saveStatus && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border ${
              saveStatus.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              <Check size={14} /> {saveStatus.message}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <div className="w-[220px] shrink-0 flex flex-col gap-3">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter sections..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-white/[0.04] border border-white/[0.08] rounded-lg text-white/60 placeholder:text-white/25 focus:outline-none focus:border-[#F5A800]/50 transition-colors" />
          </div>
          <nav className="flex-1 overflow-y-auto space-y-0.5 bg-[#0D1220] border border-white/[0.08] rounded-xl p-1.5">
            {filteredSections.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all duration-150 ${
                  activeSection === s.id
                    ? 'bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black shadow-sm'
                    : 'text-white/50 hover:bg-white/[0.05] hover:text-white'
                }`}>
                <span className="text-sm">{s.icon}</span>
                <span className="text-xs font-semibold truncate">{s.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 min-w-0 overflow-y-auto">
          {section && (
            <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-6">
              <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{section.icon}</span>
                    <h2 className="text-lg font-bold text-white">{section.name}</h2>
                  </div>
                  <p className="text-xs text-white/40 mt-1">{section.fields.length} fields · Pre-filled with current site defaults</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleSave} disabled={!hasChanges}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      hasChanges
                        ? 'bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black hover:shadow-lg hover:shadow-[#F5A800]/20'
                        : 'bg-white/[0.05] text-white/30 cursor-not-allowed'
                    }`}>
                    <Save size={14} /> Save Changes
                  </button>
                  <button onClick={() => {
                    setFormData(prev => ({ ...prev, [activeSection]: { ...defaults } }));
                  }}
                    className="flex items-center gap-2 px-3 py-2 border border-white/[0.1] text-white/40 text-xs font-medium rounded-lg hover:bg-white/[0.05] hover:text-white transition-all">
                    <X size={13} /> Reset to Defaults
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                {section.fields.map(field => (
                  <div key={field.key}>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-white/50 ml-0.5">{field.label}</label>
                      {(field.key.toLowerCase().includes('url') || field.key.toLowerCase().includes('image') || field.key.toLowerCase().includes('logo') || field.key.toLowerCase().includes('video')) && (
                        <label className="flex items-center gap-1 px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] font-medium text-white/40 hover:text-white/70 cursor-pointer transition-all hover:bg-white/[0.06]">
                          <UploadCloud size={11} />
                          {uploadingField === field.key ? 'Uploading...' : 'Upload File'}
                          <input type="file" accept="image/*,video/mp4" className="hidden"
                            onChange={e => handleImageUpload(field.key, e)} disabled={uploadingField === field.key} />
                        </label>
                      )}
                    </div>

                    {field.type === 'text' && (
                      <>
                        <input type="text" value={sectionData[field.key] || ''}
                          onChange={e => handleFieldChange(field.key, e.target.value)}
                          className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-colors"
                          placeholder={`Enter ${field.label.toLowerCase()}`} />
                        {sectionData[field.key] && (field.key.toLowerCase().includes('url') || field.key.toLowerCase().includes('image') || field.key.toLowerCase().includes('logo') || field.key.toLowerCase().includes('video')) && (
                          <div className="mt-1.5 flex gap-2 items-center">
                            {field.key.toLowerCase().includes('video') ? (
                              <span className="text-xs text-white/30 truncate max-w-[300px]">{sectionData[field.key]}</span>
                            ) : (
                              <img src={sectionData[field.key]} alt=""
                                className="h-10 w-auto rounded border border-white/10 object-contain bg-white/5"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            )}
                            <a href={sectionData[field.key]} target="_blank" rel="noreferrer"
                              className="text-[10px] text-[#F5A800] hover:underline">Open</a>
                          </div>
                        )}
                      </>
                    )}
                    {field.type === 'textarea' && (
                      <textarea value={sectionData[field.key] || ''}
                        onChange={e => handleFieldChange(field.key, e.target.value)} rows={3}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-colors resize-none"
                        placeholder={`Enter ${field.label.toLowerCase()}`} />
                    )}
                    {field.type === 'number' && (
                      <input type="number" value={sectionData[field.key] || ''}
                        onChange={e => handleFieldChange(field.key, e.target.value)}
                        className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-colors" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-white/[0.06]">
                <span className="text-xs text-white/30">{hasChanges ? '⚠️ Unsaved changes' : '✓ Up to date with site'}</span>
                <button onClick={handleSave} disabled={!hasChanges}
                  className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg transition-all ${
                    hasChanges
                      ? 'bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black hover:shadow-lg hover:shadow-[#F5A800]/20'
                      : 'bg-white/[0.05] text-white/30 cursor-not-allowed'
                  }`}>
                  <Save size={14} />
                  Save {section.name}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
