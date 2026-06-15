import { useState, useEffect } from 'react';
import { Save, X, Check, Search, UploadCloud } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import * as api from '../../lib/api';

const SECTION_DEFAULTS: Record<string, Record<string, string>> = {
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
};

const sections = [
  { id: 'hero', name: 'Hero Section', icon: '🎯', fields: [
    { key: 'mainHeadline', label: 'Main Headline', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    { key: 'statLine', label: 'Stat Line (badge text)', type: 'text' },
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
  { id: 'whyNexyovi', name: 'Why Nexyovi', icon: '💡', fields: [
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
];

const uploadFile = async (file: File, folder: string): Promise<string> => {
  return await api.uploadFile(file);
};

const AdminHomeContent = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [formData, setFormData] = useState<any>({});
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const section = sections.find(s => s.id === activeSection);
  const defaults = SECTION_DEFAULTS[activeSection] || {};
  const sectionData = { ...defaults, ...(formData[activeSection] || {}) };

  useEffect(() => {
    const merged = { ...defaults, ...(siteContent[activeSection] || {}) };
    setFormData(prev => ({ ...prev, [activeSection]: merged }));
  }, [activeSection]);

  const handleSave = async () => {
    try {
      await updateSiteContent(activeSection, formData[activeSection] || {});
      setSaveStatus({ type: 'success', message: `${section?.name} saved!` });
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus({ type: 'error', message: 'Error saving changes' });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [activeSection]: { ...(prev[activeSection] || {}), [key]: value } }));
  };

  const handleImageUpload = async (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
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

  const filteredSections = sections.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const savedData = siteContent[activeSection] || {};
  const hasChanges = JSON.stringify(formData[activeSection] || {}) !== JSON.stringify({ ...defaults, ...savedData });

  const isFileField = (key: string) =>
    key.toLowerCase().includes('url') || key.toLowerCase().includes('image') ||
    key.toLowerCase().includes('logo') || key.toLowerCase().includes('video');

  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏠</span>
          <div>
            <h1 className="text-xl font-bold text-white">Homepage Content</h1>
            <p className="text-xs text-white/40 mt-0.5">Manage all 12 homepage sections · Pre-filled with current site values</p>
          </div>
          {saveStatus && (
            <div className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border ${
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
                  <button onClick={() => setFormData(prev => ({ ...prev, [activeSection]: { ...defaults } }))}
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
                      {isFileField(field.key) && (
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
                        {sectionData[field.key] && isFileField(field.key) && !field.key.toLowerCase().includes('video') && (
                          <div className="mt-1.5 flex gap-2 items-center">
                            <img src={sectionData[field.key]} alt=""
                              className="h-10 w-auto rounded border border-white/10 object-contain bg-white/5"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
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
                  <Save size={14} /> Save {section.name}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHomeContent;
