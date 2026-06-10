import { useState, useEffect } from 'react';
import { Save, X, Check, Search, UploadCloud } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { supabase } from '../../lib/supabase';

const SECTION_DEFAULTS: Record<string, Record<string, string>> = {
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
  industriesHero: {
    headline: 'Engineering for Regulated Industries.',
    description: 'Custom software, AI systems, and cloud infrastructure built for the compliance, security, and operational requirements of fintech, healthcare, government, and enterprise markets.',
    primaryCTA: 'Explore Industries',
    primaryLink: '#industries-overview',
  },
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
  contactHero: {
    headline: "Let's Build Something Exceptional.",
    description: 'Engage our elite engineering team to build, secure, or scale your mission-critical enterprise systems.',
    primaryCTA: 'Submit Project Brief',
  },
};

const sections = [
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
    { key: 'metric1Value', label: 'Metric 1 Value', type: 'text' },
    { key: 'metric1Suffix', label: 'Metric 1 Suffix', type: 'text' },
    { key: 'metric2Label', label: 'Metric 2 Label', type: 'text' },
    { key: 'metric2Value', label: 'Metric 2 Value', type: 'text' },
    { key: 'metric2Suffix', label: 'Metric 2 Suffix', type: 'text' },
    { key: 'metric3Label', label: 'Metric 3 Label', type: 'text' },
    { key: 'metric3Value', label: 'Metric 3 Value', type: 'text' },
    { key: 'metric3Suffix', label: 'Metric 3 Suffix', type: 'text' },
    { key: 'metric4Label', label: 'Metric 4 Label', type: 'text' },
    { key: 'metric4Value', label: 'Metric 4 Value', type: 'text' },
    { key: 'metric4Suffix', label: 'Metric 4 Suffix', type: 'text' },
  ]},
  { id: 'servicesDifferentiators', name: "Service Diff's", icon: '🏆', fields: [
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
    { key: 'stat1Value', label: 'Stat 1 Value', type: 'text' },
    { key: 'stat1Suffix', label: 'Stat 1 Suffix', type: 'text' },
    { key: 'stat2Label', label: 'Stat 2 Label', type: 'text' },
    { key: 'stat2Value', label: 'Stat 2 Value', type: 'text' },
    { key: 'stat2Suffix', label: 'Stat 2 Suffix', type: 'text' },
    { key: 'stat3Label', label: 'Stat 3 Label', type: 'text' },
    { key: 'stat3Value', label: 'Stat 3 Value', type: 'text' },
    { key: 'stat3Suffix', label: 'Stat 3 Suffix', type: 'text' },
    { key: 'stat4Label', label: 'Stat 4 Label', type: 'text' },
    { key: 'stat4Value', label: 'Stat 4 Value', type: 'text' },
    { key: 'stat4Suffix', label: 'Stat 4 Suffix', type: 'text' },
  ]},
  { id: 'contactHero', name: 'Contact Hero', icon: '✉️', fields: [
    { key: 'headline', label: 'Main Headline', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'primaryCTA', label: 'Primary CTA Text', type: 'text' },
  ]},
];

const uploadFile = async (file: File, folder: string): Promise<string> => {
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
  const { error } = await supabase.storage.from('nexyovi_assets').upload(`${folder}/${fileName}`, file);
  if (error) throw error;
  const { data } = supabase.storage.from('nexyovi_assets').getPublicUrl(`${folder}/${fileName}`);
  return data.publicUrl;
};

const AdminServicesContent = () => {
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
          <span className="text-2xl">⚡</span>
          <div>
            <h1 className="text-xl font-bold text-white">Services & Pages Content</h1>
            <p className="text-xs text-white/40 mt-0.5">Services · Industries · Projects · Contact page sections · Pre-filled with current site values</p>
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

export default AdminServicesContent;
