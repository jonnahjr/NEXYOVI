import { useState, useEffect } from 'react';
import { Save, X, Check, Search, UploadCloud } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { supabase } from '../../lib/supabase';

const SECTION_DEFAULTS: Record<string, Record<string, string>> = {
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

const sections = [
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

const uploadFile = async (file: File, folder: string): Promise<string> => {
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
  const { error } = await supabase.storage.from('nexyovi_assets').upload(`${folder}/${fileName}`, file);
  if (error) throw error;
  const { data } = supabase.storage.from('nexyovi_assets').getPublicUrl(`${folder}/${fileName}`);
  return data.publicUrl;
};

const AdminGlobalContent = () => {
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
          <span className="text-2xl">🌐</span>
          <div>
            <h1 className="text-xl font-bold text-white">Global Content</h1>
            <p className="text-xs text-white/40 mt-0.5">Navigation · SEO & Metadata · Footer · Pre-filled with current site values</p>
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

export default AdminGlobalContent;
