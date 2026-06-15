import { useState, useEffect } from 'react';
import { Save, X, Check, Search, UploadCloud } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import * as api from '../../lib/api';

const SECTION_DEFAULTS: Record<string, Record<string, string>> = {
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
    visionText: "To build the technology infrastructure that powers Africa's next generation of global institutions — from fintech to government, healthcare to logistics — with world-class engineering, security, and reliability.",
  },
  companyPrinciples: {
    badge: 'Core Principles',
    title: 'Built on Principles.',
    subtitle: 'Uncompromising standards that guide our engineering and define every partnership.',
    principle1Title: 'Security as Foundation',
    principle1Desc: 'Security is not a feature — it is the foundation. Every system is built with zero-trust principles, encryption by default, and compliance-ready architecture.',
    principle2Title: 'Precision Over Speed',
    principle2Desc: "We ship with precision, not speed for speed's sake. Fast delivery means nothing without reliability, security, and the right architecture underneath.",
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
    subtitle: "We don't just write code — we take full ownership of outcomes.",
    pillar1Title: 'We Own Outcomes, Not Just Tickets',
    pillar1Desc: 'We measure success by what ships, performs, and endures. Every engagement is structured around deliverables, milestones, and measurable impact — not billable hours.',
    pillar2Title: 'Deep Engineering, Not Generalists',
    pillar2Desc: 'Our team is built around specialization — security, AI, cloud infrastructure, and full-stack development. You get experts, not generalist consultants.',
    pillar3Title: 'African Roots, Global Standards',
    pillar3Desc: 'Built in Ethiopia, delivering at world-class level. We combine deep local context with international engineering practices, compliance, and security standards.',
    pillar4Title: 'Long-Term Partnership, Not Vendorship',
    pillar4Desc: 'We embed with your team, understand your mission, and stay accountable for the long haul. Our best work happens in multi-year relationships.',
  },
};

const sections = [
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
];

const uploadFile = async (file: File, folder: string): Promise<string> => {
  return await api.uploadFile(file);
};

const AdminCompanyContent = () => {
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
          <span className="text-2xl">🏢</span>
          <div>
            <h1 className="text-xl font-bold text-white">Company Page Content</h1>
            <p className="text-xs text-white/40 mt-0.5">Manage all 5 Company section groups · Pre-filled with current site values</p>
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

export default AdminCompanyContent;
