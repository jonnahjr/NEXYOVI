import { useState, useEffect } from 'react';
import { Save, X, Check, Search, UploadCloud } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import * as api from '../../lib/api';

// ── Defaults mirror the verified copy currently live on
//    /about/yonas-bogale-sitotaw. Keep the canonical name spelling
//    (see docs/SEO_STRATEGY.md §1.1) — search engines resolve the
//    entity by it, and schema.org structured data uses the same value.
const SECTION_DEFAULTS: Record<string, Record<string, string>> = {
  founderProfile: {
    name: 'Yonas Bogale Sitotaw',
    badge: 'Founder & CEO of Nexyovi',
    image: 'https://api.nexyovi.com/uploads/1781431549912-777697695.jpg',
    intro1:
      'Yonas Bogale Sitotaw — also known as Yonas Bogale or Yons — is the founder and chief executive officer of Nexyovi, a software development and AI company based in Addis Ababa, Ethiopia. His work spans software engineering, security engineering, cybersecurity, and artificial intelligence.',
    intro2:
      "Yonas Bogale Sitotaw is an Ethiopian technology entrepreneur and engineer. He founded Nexyovi in 2024 and leads the company as its chief executive officer. Nexyovi is a software development and AI company headquartered on Bole Road in Addis Ababa, Ethiopia, delivering enterprise software, artificial intelligence systems, cloud infrastructure, cybersecurity, and data platforms for organizations across Africa and beyond.\n\nAs founder and CEO, Yonas sets Nexyovi's technology strategy and engineering direction. His professional work centers on software development, software engineering, security engineering, cybersecurity, and AI engineering — the same practice areas that define Nexyovi's services.",
    intro3:
      'He is known professionally by the full name Yonas Bogale Sitotaw and is also referred to as Yonas Bogale and Yons. These names refer to the same person.',
  },
  founderExpertise: {
    heading: 'What does Yonas Bogale Sitotaw do?',
    subtitle: "His professional areas mirror Nexyovi's engineering practice.",
    e1Title: 'Software Development & Engineering',
    e1Body:
      "Nexyovi's engineering practice covers custom platforms, SaaS products, APIs, and legacy modernization. Yonas leads the company's engineering direction across these areas.",
    e2Title: 'Security Engineering & Cybersecurity',
    e2Body:
      "Security-first design defines Nexyovi's delivery approach — zero-trust architecture, secure platforms, and protections for the systems the company builds and operates.",
    e3Title: 'Artificial Intelligence & AI Engineering',
    e3Body:
      "Nexyovi builds production AI systems — machine learning pipelines, AI agents, and LLM integrations — under Yonas's leadership as founder and CEO.",
    e4Title: 'Technology Entrepreneurship',
    e4Body:
      'Yonas founded Nexyovi in 2024 in Addis Ababa and leads the company as CEO, setting technology strategy and company direction.',
  },
  founderCompany: {
    heading: 'What is Nexyovi?',
    para1:
      'Nexyovi (legally Nexyovi Technologies) is a software development and AI company founded in 2024 and headquartered in Addis Ababa, Ethiopia. The company designs, builds, and operates enterprise software, artificial intelligence systems, cloud infrastructure, cybersecurity, and data platforms.',
    para2:
      "Yonas Bogale Sitotaw is the company's founder and chief executive officer. Explore the company's projects and case studies, the company story and leadership, or start a conversation with the team.",
  },
  founderLinks: {
    linkedin: 'https://www.linkedin.com/in/yonas-bogale/',
    github: 'https://github.com/jonnahjr',
    instagram: 'https://www.instagram.com/yonasb.jr',
    facebook: 'https://web.facebook.com/Yonasb.jr/',
    linksNote:
      'These profiles belong to Yonas Bogale Sitotaw. Nexyovi does not publish or endorse any other accounts claiming to represent him.',
  },
  founderCta: {
    heading: 'Work with Nexyovi',
    desc: 'Looking for the team behind Yonas? Nexyovi builds enterprise software, AI systems, and secure infrastructure for organizations across Africa and beyond.',
  },
};

const sections = [
  { id: 'founderProfile', name: 'Identity & Photo', icon: '👤', fields: [
    { key: 'name', label: 'Display Name (keep canonical spelling — must match schema)', type: 'text' },
    { key: 'badge', label: 'Role Badge', type: 'text' },
    { key: 'image', label: 'CEO Photo URL', type: 'text', upload: true },
    { key: 'intro1', label: 'Hero Intro Paragraph', type: 'textarea' },
    { key: 'intro2', label: 'Who He Is (paragraphs, blank line separates)', type: 'textarea', rows: 6 },
    { key: 'intro3', label: 'Name Variants Note', type: 'textarea' },
  ]},
  { id: 'founderExpertise', name: 'Professional Areas', icon: '🧠', fields: [
    { key: 'heading', label: 'Section Heading', type: 'text' },
    { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
    { key: 'e1Title', label: 'Card 1 Title', type: 'text' },
    { key: 'e1Body', label: 'Card 1 Description', type: 'textarea' },
    { key: 'e2Title', label: 'Card 2 Title', type: 'text' },
    { key: 'e2Body', label: 'Card 2 Description', type: 'textarea' },
    { key: 'e3Title', label: 'Card 3 Title', type: 'text' },
    { key: 'e3Body', label: 'Card 3 Description', type: 'textarea' },
    { key: 'e4Title', label: 'Card 4 Title', type: 'text' },
    { key: 'e4Body', label: 'Card 4 Description', type: 'textarea' },
  ]},
  { id: 'founderCompany', name: 'About Nexyovi', icon: '🏢', fields: [
    { key: 'heading', label: 'Section Heading', type: 'text' },
    { key: 'para1', label: 'Paragraph 1', type: 'textarea' },
    { key: 'para2', label: 'Paragraph 2', type: 'textarea' },
  ]},
  { id: 'founderLinks', name: 'Official Profiles', icon: '🔗', fields: [
    { key: 'linkedin', label: 'LinkedIn URL (matches schema sameAs)', type: 'text' },
    { key: 'github', label: 'GitHub URL (matches schema sameAs)', type: 'text' },
    { key: 'instagram', label: 'Instagram URL (matches schema sameAs)', type: 'text' },
    { key: 'facebook', label: 'Facebook URL (matches schema sameAs)', type: 'text' },
    { key: 'linksNote', label: 'Note Under Links', type: 'textarea' },
  ]},
  { id: 'founderCta', name: 'Bottom CTA', icon: '📢', fields: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'desc', label: 'Description', type: 'textarea' },
  ]},
];

const uploadFile = async (file: File): Promise<string> => {
  return await api.uploadFile(file);
};

const AdminCeoProfile = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const url = await uploadFile(e.target.files[0]);
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

  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👤</span>
          <div>
            <h1 className="text-xl font-bold text-white">CEO Profile</h1>
            <p className="text-xs text-white/40 mt-0.5">
              Manage /about/yonas-bogale-sitotaw · Photo, copy, expertise &amp; official links
            </p>
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
                  <p className="text-xs text-white/40 mt-1">{section.fields.length} fields · Pre-filled with current site values</p>
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
                      {field.upload && (
                        <label className="flex items-center gap-1 px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] font-medium text-white/40 hover:text-white/70 cursor-pointer transition-all hover:bg-white/[0.06]">
                          <UploadCloud size={11} />
                          {uploadingField === field.key ? 'Uploading...' : 'Upload Photo'}
                          <input type="file" accept="image/*" className="hidden"
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
                        {sectionData[field.key] && field.upload && (
                          <div className="mt-1.5 flex gap-2 items-center">
                            <img src={sectionData[field.key]} alt=""
                              className="h-10 w-10 rounded border border-white/10 object-cover bg-white/5"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            <a href={sectionData[field.key]} target="_blank" rel="noreferrer"
                              className="text-[10px] text-[#F5A800] hover:underline">Open</a>
                          </div>
                        )}
                      </>
                    )}
                    {field.type === 'textarea' && (
                      <textarea value={sectionData[field.key] || ''}
                        onChange={e => handleFieldChange(field.key, e.target.value)} rows={field.rows || 3}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-colors resize-none"
                        placeholder={`Enter ${field.label.toLowerCase()}`} />
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

export default AdminCeoProfile;
