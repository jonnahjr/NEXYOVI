import { motion } from 'framer-motion';
import {
  BarChart3,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe,
  LayoutTemplate,
  Image as ImageIcon,
  MessageSquare,
  Quote,
  ArrowUp,
  ArrowDown,
  Search,
  Save,
  Users,
  Plus,
  UploadCloud,
  X,
  Cpu,
  Shield,
  Target,
  Briefcase
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { homepageTestimonialsDefaults, trustLogosDefaults, useSite } from '../../context/SiteContext';
import { supabase } from '../../lib/supabase';

const inputClass = "w-full h-14 px-5 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white text-sm outline-none focus:border-[#F5A800]/60 focus:ring-2 focus:ring-[#F5A800]/20 transition-all placeholder:text-white/20 font-medium";
const textareaClass = "w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white text-sm outline-none focus:border-[#F5A800]/60 focus:ring-2 focus:ring-[#F5A800]/20 transition-all placeholder:text-white/20 resize-none font-medium leading-relaxed";
const labelClass = "block text-xs font-bold text-white/35 uppercase tracking-[0.2em] mb-3 ml-1";

const createTrustLogosForm = () => ({
  title: 'Experience Across Enterprise, Government & Technology Sectors',
  items: trustLogosDefaults.map(item => ({ ...item }))
});

const createTestimonialsForm = () => ({
  items: homepageTestimonialsDefaults.map(item => ({ ...item }))
});

const createNavigationForm = () => ({
  headerLinks: [
    { label: 'Services', href: '/services' },
    { label: 'Industries', href: '/industries' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/company' },
    { label: 'Contact', href: '/contact' }
  ],
  ctaLabel: 'Book Strategy Session'
});

const createSeoForm = () => ({
  metaTitle: 'Nexyovi - Enterprise Software, AI & Cloud',
  metaDescription: 'Nexyovi builds secure enterprise software, AI systems, and cloud infrastructure for organizations across Africa and beyond.',
  canonicalUrl: 'https://nexyovi.com',
  ogImage: '',
  robots: 'index, follow',
  structuredData: ''
});

const createMediaForm = () => ({
  items: [] as Array<{ id: string; name: string; url: string; type: string }>
});

const SaveButton = ({ onSave, saved }: { onSave: (e: any) => void, saved: boolean }) => (
  <button
    onClick={onSave}
    className={`flex items-center gap-2.5 h-12 px-6 text-sm font-bold uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 ${saved 
      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
      : 'bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-white hover:shadow-2xl hover:shadow-[#F5A800]/30'
    }`}
  >
    {saved ? <CheckCircle2 size={18} /> : <Save size={18} />}
    {saved ? 'Saved!' : 'Save Changes'}
  </button>
);

// ── HERO SECTION EDITOR ──
const HeroEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ title: '', subtitle: '', cta_primary: '', cta_secondary: '' });

  useEffect(() => {
    if (siteContent?.hero) setForm({ ...siteContent.hero });
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('hero', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>Main Headline</label>
        <textarea
          rows={2}
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className={textareaClass + " text-xl font-black"}
          placeholder="We build enterprise software, AI systems, and cloud infrastructure for African businesses — fast, secure, senior-led."
        />
      </div>
      <div>
        <label className={labelClass}>Subtitle / Description</label>
        <textarea
          rows={4}
          value={form.subtitle}
          onChange={e => setForm({ ...form, subtitle: e.target.value })}
          className={textareaClass}
          placeholder="We engineer enterprise-grade cloud ecosystems..."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Primary Button Text</label>
          <input type="text" value={form.cta_primary} onChange={e => setForm({ ...form, cta_primary: e.target.value })} className={inputClass} placeholder="Deploy with Nexyovi" />
        </div>
        <div>
          <label className={labelClass}>Secondary Button Text</label>
          <input type="text" value={form.cta_secondary} onChange={e => setForm({ ...form, cta_secondary: e.target.value })} className={inputClass} placeholder="View Documentation" />
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <SaveButton onSave={handleSave} saved={saved} />
      </div>
    </div>
  );
};

// ── METRICS EDITOR ──
const MetricsEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [metrics, setMetrics] = useState([
    { number: '12+', label: 'Years Experience' },
    { number: '150+', label: 'Projects Delivered' },
    { number: '99.9%', label: 'Uptime SLA' },
    { number: '24/7', label: 'Support & Monitoring' }
  ]);

  useEffect(() => {
    if (siteContent?.metrics) setMetrics(siteContent.metrics);
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('metrics', metrics);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateMetric = (index: number, field: string, value: string) => {
    const newMetrics = [...metrics];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    setMetrics(newMetrics);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-3xl space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-[#F5A800]/10 flex items-center justify-center text-[#F5A800]">
                <BarChart3 size={18} />
              </div>
              <h4 className="text-sm font-bold text-white">Metric {i + 1}</h4>
            </div>
            <div>
              <label className={labelClass}>Metric Number (e.g., 12+)</label>
              <input type="text" value={metric.number} onChange={e => updateMetric(i, 'number', e.target.value)} className={inputClass + " text-xl font-bold text-[#F5A800]"} />
            </div>
            <div>
              <label className={labelClass}>Metric Label</label>
              <input type="text" value={metric.label} onChange={e => updateMetric(i, 'label', e.target.value)} className={inputClass} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-2">
        <SaveButton onSave={handleSave} saved={saved} />
      </div>
    </div>
  );
};

// ── TRUST LOGOS EDITOR ──
const TrustLogosEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [form, setForm] = useState(createTrustLogosForm());

  useEffect(() => {
    if (siteContent?.trustLogos) {
      setForm({
        ...createTrustLogosForm(),
        ...siteContent.trustLogos,
        items: siteContent.trustLogos.items?.length
          ? siteContent.trustLogos.items.map((item: any) => ({
              name: item.name || '',
              logo_url: item.logo_url || ''
            }))
          : createTrustLogosForm().items
      });
    }
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('trustLogos', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateItem = (index: number, field: 'name' | 'logo_url', value: string) => {
    const nextItems = [...form.items];
    nextItems[index] = { ...nextItems[index], [field]: value };
    setForm({ ...form, items: nextItems });
  };

  const handleLogoUpload = async (index: number, e: any) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setUploadingIndex(index);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `trust_logo_${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `trust-logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('nexyovi_assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('nexyovi_assets')
        .getPublicUrl(filePath);

      updateItem(index, 'logo_url', data.publicUrl);
    } catch (error) {
      console.error('Error uploading trust logo:', error);
      alert('Logo upload failed. Please check console for details.');
    } finally {
      setUploadingIndex(null);
      e.target.value = '';
    }
  };

  const addItem = () => {
    setForm({ ...form, items: [...form.items, { name: '', logo_url: '' }] });
  };

  const removeItem = (index: number) => {
    setForm({ ...form, items: form.items.filter((_: any, i: number) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>Section Heading</label>
        <input
          type="text"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className={labelClass + " mb-0"}>Logo List</label>
        <button onClick={addItem} className="flex items-center gap-2 text-xs font-bold text-[#F5A800] uppercase tracking-[0.2em] hover:text-[#ffb700] transition-colors">
          <Plus size={14} /> Add Logo
        </button>
      </div>

      <div className="space-y-5">
        {form.items.map((item, i) => (
          <div key={i} className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-3xl space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#F5A800] uppercase tracking-[0.2em]">Logo {i + 1}</h4>
              <button onClick={() => removeItem(i)} className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all">
                <X size={16} />
              </button>
            </div>
            <div>
              <label className={labelClass}>Organization Name</label>
              <input type="text" value={item.name} onChange={e => updateItem(i, 'name', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Logo URL</label>
              <input type="text" value={item.logo_url} onChange={e => updateItem(i, 'logo_url', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Upload Local File</label>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden flex items-center justify-center shrink-0">
                  {item.logo_url ? (
                    <img src={item.logo_url} alt={item.name || 'Logo preview'} className="w-full h-full object-contain p-2" />
                  ) : (
                    <ImageIcon size={20} className="text-white/20" />
                  )}
                </div>
                <label className={`h-12 px-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 font-bold transition-all cursor-pointer text-sm ${uploadingIndex === i ? 'bg-white/10 text-white/50' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20'}`}>
                  <UploadCloud size={16} />
                  {uploadingIndex === i ? 'Uploading...' : 'Upload File'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleLogoUpload(i, event)}
                    disabled={uploadingIndex === i}
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <SaveButton onSave={handleSave} saved={saved} />
      </div>
    </div>
  );
};

// ── HOMEPAGE TESTIMONIALS EDITOR ──
const HomepageTestimonialsEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [form, setForm] = useState(createTestimonialsForm());

  useEffect(() => {
    if (siteContent?.testimonialsSection) {
      setForm({
        items: siteContent.testimonialsSection.items?.length
          ? siteContent.testimonialsSection.items.map((item: any) => ({
              id: item.id || '',
              quote: item.quote || '',
              role: item.role || '',
              company: item.company || '',
              author: item.author || '',
              avatar_url: item.avatar_url || item.img || '',
              linkedin: item.linkedin || '',
              highlight: item.highlight || '',
              label: item.label || 'Trusted by founders of',
              caseStudy: item.caseStudy || ''
            }))
          : createTestimonialsForm().items
      });
    }
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('testimonialsSection', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateItem = (index: number, field: string, value: string) => {
    const nextItems = [...form.items];
    nextItems[index] = { ...nextItems[index], [field]: value };
    setForm({ ...form, items: nextItems });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [
        ...form.items,
        {
          id: `${Date.now()}`,
          quote: '',
          role: '',
          company: '',
          author: '',
          avatar_url: '',
          linkedin: '',
          highlight: '',
          label: 'Trusted by founders of',
          caseStudy: ''
        }
      ]
    });
  };

  const removeItem = (index: number) => {
    setForm({ ...form, items: form.items.filter((_: any, i: number) => i !== index) });
  };

  const handleAvatarUpload = async (index: number, e: any) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setUploadingIndex(index);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `testimonial_${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `homepage-testimonials/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('nexyovi_assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('nexyovi_assets')
        .getPublicUrl(filePath);

      updateItem(index, 'avatar_url', data.publicUrl);
    } catch (error) {
      console.error('Error uploading testimonial avatar:', error);
      alert('Avatar upload failed. Please check console for details.');
    } finally {
      setUploadingIndex(null);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className={labelClass + ' mb-0'}>Testimonials List</label>
        <button onClick={addItem} className="flex items-center gap-2 text-xs font-bold text-[#F5A800] uppercase tracking-[0.2em] hover:text-[#ffb700] transition-colors">
          <Plus size={14} /> Add Testimonial
        </button>
      </div>

      <div className="space-y-6">
        {form.items.map((item, i) => (
          <div key={i} className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-3xl space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#F5A800] uppercase tracking-[0.2em]">Testimonial {i + 1}</h4>
              <button onClick={() => removeItem(i)} className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all">
                <X size={16} />
              </button>
            </div>

            <div>
              <label className={labelClass}>Quote</label>
              <textarea rows={5} value={item.quote} onChange={e => updateItem(i, 'quote', e.target.value)} className={textareaClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className={labelClass}>Author</label><input type="text" value={item.author} onChange={e => updateItem(i, 'author', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Role</label><input type="text" value={item.role} onChange={e => updateItem(i, 'role', e.target.value)} className={inputClass} /></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className={labelClass}>Company</label><input type="text" value={item.company} onChange={e => updateItem(i, 'company', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Highlight Text</label><input type="text" value={item.highlight} onChange={e => updateItem(i, 'highlight', e.target.value)} className={inputClass} /></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className={labelClass}>LinkedIn URL</label><input type="text" value={item.linkedin} onChange={e => updateItem(i, 'linkedin', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Case Study URL</label><input type="text" value={item.caseStudy || ''} onChange={e => updateItem(i, 'caseStudy', e.target.value)} className={inputClass} /></div>
            </div>

            <div>
              <label className={labelClass}>Avatar URL or Upload</label>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden flex items-center justify-center shrink-0">
                  {item.avatar_url ? (
                    <img src={item.avatar_url} alt={item.author || 'Avatar preview'} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={20} className="text-white/20" />
                  )}
                </div>
                <label className={`h-12 px-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 font-bold transition-all cursor-pointer text-sm ${uploadingIndex === i ? 'bg-white/10 text-white/50' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20'}`}>
                  <UploadCloud size={16} />
                  {uploadingIndex === i ? 'Uploading...' : 'Upload Avatar'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleAvatarUpload(i, event)}
                    disabled={uploadingIndex === i}
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <SaveButton onSave={handleSave} saved={saved} />
      </div>
    </div>
  );
};

// ── NAVIGATION EDITOR ──
const NavigationEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(createNavigationForm());

  useEffect(() => {
    if (siteContent?.navigation) {
      setForm({
        ...createNavigationForm(),
        ...siteContent.navigation,
        headerLinks: siteContent.navigation.headerLinks?.length ? siteContent.navigation.headerLinks : createNavigationForm().headerLinks
      });
    }
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('navigation', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateLink = (index: number, field: 'label' | 'href', value: string) => {
    const next = [...form.headerLinks];
    next[index] = { ...next[index], [field]: value };
    setForm({ ...form, headerLinks: next });
  };

  const addLink = () => {
    setForm({ ...form, headerLinks: [...form.headerLinks, { label: '', href: '' }] });
  };

  const removeLink = (index: number) => {
    setForm({ ...form, headerLinks: form.headerLinks.filter((_, i) => i !== index) });
  };

  const moveLink = (index: number, direction: -1 | 1) => {
    const next = [...form.headerLinks];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setForm({ ...form, headerLinks: next });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>Primary CTA Label</label>
        <input type="text" value={form.ctaLabel} onChange={e => setForm({ ...form, ctaLabel: e.target.value })} className={inputClass} />
      </div>

      <div className="flex items-center justify-between">
        <label className={labelClass + ' mb-0'}>Header Menu</label>
        <button onClick={addLink} className="flex items-center gap-2 text-xs font-bold text-[#F5A800] uppercase tracking-[0.2em] hover:text-[#ffb700] transition-colors">
          <Plus size={14} /> Add Item
        </button>
      </div>

      <div className="space-y-4">
        {form.headerLinks.map((link, i) => (
          <div key={i} className="p-5 bg-white/[0.02] border border-white/[0.05] rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#F5A800] uppercase tracking-[0.2em]">Link {i + 1}</h4>
              <div className="flex items-center gap-2">
                <button onClick={() => moveLink(i, -1)} className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all">
                  <ArrowUp size={14} />
                </button>
                <button onClick={() => moveLink(i, 1)} className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all">
                  <ArrowDown size={14} />
                </button>
                <button onClick={() => removeLink(i)} className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all">
                  <X size={14} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className={labelClass}>Label</label><input type="text" value={link.label} onChange={e => updateLink(i, 'label', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>URL</label><input type="text" value={link.href} onChange={e => updateLink(i, 'href', e.target.value)} className={inputClass} /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <SaveButton onSave={handleSave} saved={saved} />
      </div>
    </div>
  );
};

// ── SEO EDITOR ──
const SEOEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(createSeoForm());

  useEffect(() => {
    if (siteContent?.seo) {
      setForm({ ...createSeoForm(), ...siteContent.seo });
    }
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('seo', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2"><label className={labelClass}>Meta Title</label><input type="text" value={form.metaTitle} onChange={e => setForm({ ...form, metaTitle: e.target.value })} className={inputClass} /></div>
        <div className="md:col-span-2"><label className={labelClass}>Meta Description</label><textarea rows={4} value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })} className={textareaClass} /></div>
        <div><label className={labelClass}>Canonical URL</label><input type="text" value={form.canonicalUrl} onChange={e => setForm({ ...form, canonicalUrl: e.target.value })} className={inputClass} /></div>
        <div><label className={labelClass}>Robots</label><input type="text" value={form.robots} onChange={e => setForm({ ...form, robots: e.target.value })} className={inputClass} /></div>
        <div className="md:col-span-2"><label className={labelClass}>Open Graph Image URL</label><input type="text" value={form.ogImage} onChange={e => setForm({ ...form, ogImage: e.target.value })} className={inputClass} /></div>
        <div className="md:col-span-2"><label className={labelClass}>Structured Data JSON-LD</label><textarea rows={6} value={form.structuredData} onChange={e => setForm({ ...form, structuredData: e.target.value })} className={textareaClass} placeholder='{"@context":"https://schema.org", ...}' /></div>
      </div>
      <div className="flex justify-end pt-2"><SaveButton onSave={handleSave} saved={saved} /></div>
    </div>
  );
};

// ── MEDIA LIBRARY EDITOR ──
const MediaLibraryEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState('');
  const [form, setForm] = useState(createMediaForm());

  useEffect(() => {
    if (siteContent?.mediaLibrary) {
      setForm({
        items: siteContent.mediaLibrary.items || []
      });
    }
  }, [siteContent]);

  const handleUpload = async (e: any) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `media_${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `media/${fileName}`;

      const { error } = await supabase.storage.from('nexyovi_assets').upload(filePath, file);
      if (error) throw error;

      const { data } = supabase.storage.from('nexyovi_assets').getPublicUrl(filePath);
      const next = [{ id: fileName, name: file.name, url: data.publicUrl, type: file.type || 'image' }, ...form.items];
      setForm({ items: next });
    } catch (error) {
      console.error('Media upload failed:', error);
      alert('Media upload failed.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const filtered = form.items.filter(item => `${item.name} ${item.url}`.toLowerCase().includes(query.toLowerCase()));

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('mediaLibrary', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const removeItem = (index: number) => {
    setForm({ items: form.items.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative flex-1 max-w-xl">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search media" className={inputClass + ' pl-11'} />
        </div>
        <label className={`h-12 px-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 font-bold transition-all cursor-pointer text-sm ${uploading ? 'bg-white/10 text-white/50' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20'}`}>
          <UploadCloud size={16} />
          {uploading ? 'Uploading...' : 'Upload Media'}
          <input type="file" accept="image/*,video/*,.svg" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <div key={item.id} className="p-4 rounded-3xl border border-white/[0.05] bg-white/[0.02] space-y-4">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-black/30 border border-white/[0.05] flex items-center justify-center">
              {item.type?.startsWith('video') ? (
                <video src={item.url} controls className="w-full h-full object-cover" />
              ) : (
                <img src={item.url} alt={item.name} className="w-full h-full object-contain p-3" />
              )}
            </div>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                <p className="text-xs text-white/30 truncate">{item.url}</p>
              </div>
              <button onClick={() => removeItem(i)} className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all">
                <X size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <SaveButton onSave={handleSave} saved={saved} />
      </div>
    </div>
  );
};

// ── CTA GLOBALS EDITOR ──
const CTAEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    title: "Let's Build Together",
    subtitle: "Ready to scale? Let's talk.",
    description: "Book your 45-minute strategy session today. We take on a limited number of new clients each quarter to ensure maximum quality and dedicated attention.",
    buttonText: "Book a strategy session",
    benefits: [
      "AI audit + 2–3 ROI ideas in 45 min",
      "Prioritized roadmap outline, zero cost",
      "Strict NDA, fully confidential"
    ]
  });

  useEffect(() => {
    if (siteContent?.ctas) setForm({ ...form, ...siteContent.ctas });
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('ctas', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...form.benefits];
    newBenefits[index] = value;
    setForm({ ...form, benefits: newBenefits });
  };

  const addBenefit = () => {
    setForm({ ...form, benefits: [...form.benefits, ''] });
  };

  const removeBenefit = (index: number) => {
    setForm({ ...form, benefits: form.benefits.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>CTA Headline</label>
        <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass + " font-bold text-lg"} />
      </div>
      <div>
        <label className={labelClass}>CTA Subheadline</label>
        <input type="text" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>CTA Description</label>
        <textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={textareaClass} />
      </div>
      <div>
        <label className={labelClass}>Button Text</label>
        <input type="text" value={form.buttonText} onChange={e => setForm({ ...form, buttonText: e.target.value })} className={inputClass} />
      </div>
      <div className="pt-6 border-t border-white/[0.05] space-y-4">
        <div className="flex items-center justify-between">
          <label className={labelClass + " mb-0"}>CTA Benefits List</label>
          <button onClick={addBenefit} className="flex items-center gap-2 text-xs font-bold text-[#F5A800] uppercase tracking-[0.2em] hover:text-[#ffb700] transition-colors">
            <Plus size={14} /> Add Benefit
          </button>
        </div>
        <div className="space-y-3">
          {form.benefits.map((benefit, i) => (
            <div key={i} className="flex gap-3 items-start">
              <input type="text" value={benefit} onChange={e => updateBenefit(i, e.target.value)} className={inputClass} placeholder="Enter benefit" />
              <button onClick={() => removeBenefit(i)} className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all">
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <SaveButton onSave={handleSave} saved={saved} />
      </div>
    </div>
  );
};

// ── PORTFOLIO EDITOR ──
const PortfolioEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [portfolio, setPortfolio] = useState([
    { title: 'Aura Intelligence Platform', category: 'AI & Data Science', desc: 'Distributed ML pipeline for predictive maintenance in industrial manufacturing clusters.', metrics: '70% Reduced Downtime, Sub-10ms Latency' },
    { title: 'SEC-Net Global Firewall', category: 'Cybersecurity', desc: 'Advanced zero-trust network infrastructure for secure cross-continental data transmission.', metrics: 'Enterprise-grade Threat Mitigation, AI-Driven Auditing' }
  ]);

  useEffect(() => {
    if (siteContent?.portfolio) setPortfolio(siteContent.portfolio);
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('portfolio', portfolio);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...portfolio];
    newItems[index] = { ...newItems[index], [field]: value };
    setPortfolio(newItems);
  };

  const addPortfolioItem = () => {
    setPortfolio([...portfolio, { title: '', category: '', desc: '', metrics: '' }]);
  };

  const removePortfolioItem = (index: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className={labelClass + " mb-0"}>Case Studies & Projects</label>
        <button onClick={addPortfolioItem} className="flex items-center gap-2 text-xs font-bold text-[#F5A800] uppercase tracking-[0.2em] hover:text-[#ffb700] transition-colors">
          <Plus size={14} /> Add Case Study
        </button>
      </div>
      <div className="space-y-6">
        {portfolio.map((item, i) => (
          <div key={i} className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-3xl space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#F5A800] uppercase tracking-[0.2em]">Case Study {i + 1}</h4>
              <button onClick={() => removePortfolioItem(i)} className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className={labelClass}>Title</label><input type="text" value={item.title} onChange={e => updateItem(i, 'title', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Category</label><input type="text" value={item.category} onChange={e => updateItem(i, 'category', e.target.value)} className={inputClass} /></div>
            </div>
            <div><label className={labelClass}>Description</label><textarea rows={3} value={item.desc} onChange={e => updateItem(i, 'desc', e.target.value)} className={textareaClass} /></div>
            <div><label className={labelClass}>Metrics (comma separated)</label><input type="text" value={item.metrics} onChange={e => updateItem(i, 'metrics', e.target.value)} className={inputClass} /></div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-2">
        <SaveButton onSave={handleSave} saved={saved} />
      </div>
    </div>
  );
};

// ── SERVICES EDITOR ──
const ServicesEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [services, setServices] = useState([
    { id: 'software', title: 'Software Engineering', desc: 'Custom platforms, SaaS products, and enterprise applications engineered for massive concurrency and global scale.' },
    { id: 'infrastructure', title: 'Infrastructure & Networking', desc: 'Cloud architecture, zero-trust networks, server deployments, and continuous reliability engineering.' },
    { id: 'ai', title: 'Artificial Intelligence', desc: 'Predictive models, intelligent agents, and custom LLM integrations that automate complex workflows.' },
    { id: 'security', title: 'Cybersecurity', desc: 'Security audits, infrastructure hardening, compliance, penetration testing, and continuous threat monitoring.' }
  ]);

  useEffect(() => {
    if (siteContent?.services) setServices(siteContent.services);
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('services', services);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateService = (index: number, field: string, value: string) => {
    const newItems = [...services];
    newItems[index] = { ...newItems[index], [field]: value };
    setServices(newItems);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {services.map((item, i) => (
          <div key={i} className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-3xl space-y-5">
            <h4 className="text-sm font-bold text-[#F5A800] uppercase tracking-[0.2em]">{item.id.toUpperCase()}</h4>
            <div><label className={labelClass}>Title</label><input type="text" value={item.title} onChange={e => updateService(i, 'title', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Short Description</label><textarea rows={3} value={item.desc} onChange={e => updateService(i, 'desc', e.target.value)} className={textareaClass} /></div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-2">
        <SaveButton onSave={handleSave} saved={saved} />
      </div>
    </div>
  );
};

// ── FOOTER CONTENT EDITOR ──
const FooterEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    tagline: 'Nexyovi is a modern software and AI development company helping businesses build digital products, automate workflows, and modernize operations.',
    copyright: 'Global. All Rights Reserved.',
    servicesLinks: [
      { label: 'Software Engineering', path: '/services/software' },
      { label: 'AI & Automation', path: '/services/ai' },
      { label: 'Cloud & Infrastructure', path: '/services/infrastructure' },
      { label: 'Mobile Applications', path: '/services/apps' },
      { label: 'Data & Analytics', path: '/services/data' }
    ],
    companyLinks: [
      { label: 'About Us', path: '/company' },
      { label: 'Industries', path: '/industries' },
      { label: 'Projects', path: '/projects' },
      { label: 'Contact', path: '/contact' }
    ],
    cta: { label: 'Book a strategy session', path: '/contact#inquiry' }
  });

  useEffect(() => {
    if (siteContent?.footer) setForm({ ...createFooterDefaults(), ...siteContent.footer });
  }, [siteContent]);

  const createFooterDefaults = () => ({
    tagline: 'Nexyovi is a modern software and AI development company helping businesses build digital products, automate workflows, and modernize operations.',
    copyright: 'Global. All Rights Reserved.',
    servicesLinks: [
      { label: 'Software Engineering', path: '/services/software' },
      { label: 'AI & Automation', path: '/services/ai' },
      { label: 'Cloud & Infrastructure', path: '/services/infrastructure' },
      { label: 'Mobile Applications', path: '/services/apps' },
      { label: 'Data & Analytics', path: '/services/data' }
    ],
    companyLinks: [
      { label: 'About Us', path: '/company' },
      { label: 'Industries', path: '/industries' },
      { label: 'Projects', path: '/projects' },
      { label: 'Contact', path: '/contact' }
    ],
    cta: { label: 'Book a strategy session', path: '/contact#inquiry' }
  });

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('footer', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addServiceLink = () => setForm({ ...form, servicesLinks: [...form.servicesLinks, { label: '', path: '' }] });
  const removeServiceLink = (i: number) => setForm({ ...form, servicesLinks: form.servicesLinks.filter((_: any, idx: number) => idx !== i) });
  const updateServiceLink = (i: number, field: string, value: string) => {
    const links = [...form.servicesLinks];
    links[i] = { ...links[i], [field]: value };
    setForm({ ...form, servicesLinks: links });
  };

  const addCompanyLink = () => setForm({ ...form, companyLinks: [...form.companyLinks, { label: '', path: '' }] });
  const removeCompanyLink = (i: number) => setForm({ ...form, companyLinks: form.companyLinks.filter((_: any, idx: number) => idx !== i) });
  const updateCompanyLink = (i: number, field: string, value: string) => {
    const links = [...form.companyLinks];
    links[i] = { ...links[i], [field]: value };
    setForm({ ...form, companyLinks: links });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelClass}>Footer Tagline</label>
          <textarea rows={3} value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} className={textareaClass} />
        </div>
        <div>
          <label className={labelClass}>Copyright Suffix</label>
          <input type="text" value={form.copyright} onChange={e => setForm({ ...form, copyright: e.target.value })} className={inputClass} placeholder="Global. All Rights Reserved." />
        </div>
        <div>
          <label className={labelClass}>CTA Label</label>
          <input type="text" value={form.cta.label} onChange={e => setForm({ ...form, cta: { ...form.cta, label: e.target.value } })} className={inputClass} placeholder="Book a strategy session" />
        </div>
        <div>
          <label className={labelClass}>CTA Path</label>
          <input type="text" value={form.cta.path} onChange={e => setForm({ ...form, cta: { ...form.cta, path: e.target.value } })} className={inputClass} placeholder="/contact#inquiry" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={labelClass + ' !mb-0'}>Services Links</label>
          <button type="button" onClick={addServiceLink} className="text-xs font-bold text-[#F5A800] hover:text-[#ffb700] transition-colors flex items-center gap-1">
            <Plus size={14} /> Add Link
          </button>
        </div>
        <div className="space-y-2">
          {form.servicesLinks.map((link: any, i: number) => (
            <div key={i} className="flex items-center gap-3">
              <input type="text" value={link.label} onChange={e => updateServiceLink(i, 'label', e.target.value)} className={inputClass + ' flex-1'} placeholder="Label" />
              <input type="text" value={link.path} onChange={e => updateServiceLink(i, 'path', e.target.value)} className={inputClass + ' flex-1'} placeholder="/path" />
              <button onClick={() => removeServiceLink(i)} className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center shrink-0 transition-all"><X size={14} /></button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={labelClass + ' !mb-0'}>Company Links</label>
          <button type="button" onClick={addCompanyLink} className="text-xs font-bold text-[#F5A800] hover:text-[#ffb700] transition-colors flex items-center gap-1">
            <Plus size={14} /> Add Link
          </button>
        </div>
        <div className="space-y-2">
          {form.companyLinks.map((link: any, i: number) => (
            <div key={i} className="flex items-center gap-3">
              <input type="text" value={link.label} onChange={e => updateCompanyLink(i, 'label', e.target.value)} className={inputClass + ' flex-1'} placeholder="Label" />
              <input type="text" value={link.path} onChange={e => updateCompanyLink(i, 'path', e.target.value)} className={inputClass + ' flex-1'} placeholder="/path" />
              <button onClick={() => removeCompanyLink(i)} className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center shrink-0 transition-all"><X size={14} /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <SaveButton onSave={handleSave} saved={saved} />
      </div>
    </div>
  );
};

// ── ABOUT / COMPANY SECTION EDITOR ──
const AboutEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    tagline: 'Modern software. Smarter AI. Real results.',
    description: 'Nexyovi is a modern software and AI development company helping businesses build digital products, automate workflows, and modernize operations.',
    founded: '2020',
    employees: '20+',
    countries: '2'
  });

  useEffect(() => {
    if (siteContent?.about) setForm({ ...siteContent.about });
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('about', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>Company Tagline</label>
        <input type="text" value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Company Description</label>
        <textarea rows={5} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={textareaClass} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className={labelClass}>Founded</label>
          <input type="text" value={form.founded} onChange={e => setForm({ ...form, founded: e.target.value })} className={inputClass} placeholder="2020" />
        </div>
        <div>
          <label className={labelClass}>Employees</label>
          <input type="text" value={form.employees} onChange={e => setForm({ ...form, employees: e.target.value })} className={inputClass} placeholder="30+" />
        </div>
        <div>
          <label className={labelClass}>Countries</label>
          <input type="text" value={form.countries} onChange={e => setForm({ ...form, countries: e.target.value })} className={inputClass} placeholder="12+" />
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <SaveButton onSave={handleSave} saved={saved} />
      </div>
    </div>
  );
};

// ── BY THE NUMBERS EDITOR ──
const ByTheNumbersEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [metrics, setMetrics] = useState([
    { value: 24, suffix: '/7', label: 'Monitoring & Support' },
    { value: 12, suffix: '+', label: 'Core Engineering Practices' },
    { value: 6, suffix: '', label: 'Technology Domains' },
    { value: 0, suffix: '', label: 'Architect-Led Delivery Teams', hideNumber: true },
  ]);

  useEffect(() => {
    if (siteContent?.byTheNumbers) setMetrics(siteContent.byTheNumbers);
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('byTheNumbers', metrics);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateMetric = (index: number, field: string, value: any) => {
    const newMetrics = [...metrics];
    newMetrics[index] = { ...newMetrics[index], [field]: field === 'value' ? Number(value) : value };
    setMetrics(newMetrics);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-3xl space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <BarChart3 size={18} />
              </div>
              <h4 className="text-sm font-bold text-white">Stat {i + 1}</h4>
            </div>
            <div>
              <label className={labelClass}>Value</label>
              <input
                type="number"
                value={metric.value}
                onChange={e => updateMetric(i, 'value', e.target.value)}
                className={inputClass + " text-xl font-bold text-[#F5A800]"}
              />
            </div>
            <div>
              <label className={labelClass}>Suffix</label>
              <input
                type="text"
                value={metric.suffix}
                onChange={e => updateMetric(i, 'suffix', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Label</label>
              <input
                type="text"
                value={metric.label}
                onChange={e => updateMetric(i, 'label', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id={`hideNumber-${i}`}
                checked={metric.hideNumber || false}
                onChange={e => updateMetric(i, 'hideNumber', e.target.checked)}
                className="w-5 h-5"
              />
              <label htmlFor={`hideNumber-${i}`} className="text-sm text-white/60">Hide Number</label>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-2">
        <SaveButton onSave={handleSave} saved={saved} />
      </div>
    </div>
  );
};

// ── COMPANY TEAM SECTION EDITOR ──
const CompanyTeamEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    badge: 'Our Team',
    title: 'Meet the Team.',
    highlight: 'Team.',
    description: 'Leadership team overseeing software engineering, AI innovation, and cloud infrastructure delivery across global markets.',
    founder_name: 'Yonas Bogale',
    founder_role: 'Founder & CEO',
    founder_bio: "Leading Nexyovi's mission to build practical software, AI solutions, and digital infrastructure for modern businesses.",
    founder_button: 'LinkedIn Profile'
  });

  useEffect(() => {
    if (siteContent?.companyTeam) setForm({ ...form, ...siteContent.companyTeam });
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('companyTeam', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>Section Badge</label>
        <input type="text" value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} className={inputClass} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Section Title</label>
          <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Highlighted Word</label>
          <input type="text" value={form.highlight} onChange={e => setForm({ ...form, highlight: e.target.value })} className={inputClass} placeholder="Team." />
        </div>
      </div>
      <div>
        <label className={labelClass}>Section Description</label>
        <textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={textareaClass} />
      </div>
      <div className="pt-6 border-t border-white/[0.05] space-y-6">
        <div>
          <label className={labelClass}>Founder Name</label>
          <input type="text" value={form.founder_name} onChange={e => setForm({ ...form, founder_name: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Founder Role</label>
          <input type="text" value={form.founder_role} onChange={e => setForm({ ...form, founder_role: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Founder Bio</label>
          <textarea rows={5} value={form.founder_bio} onChange={e => setForm({ ...form, founder_bio: e.target.value })} className={textareaClass} />
        </div>
        <div>
          <label className={labelClass}>Founder Button Label</label>
          <input type="text" value={form.founder_button} onChange={e => setForm({ ...form, founder_button: e.target.value })} className={inputClass} />
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <SaveButton onSave={handleSave} saved={saved} />
      </div>
    </div>
  );
};

// ── HOME FOUNDER SECTION EDITOR ──
const HomeFounderEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    badge: 'Leadership',
    name: 'Yonas Bogale',
    role: 'Founder & CEO',
    bio: "Nexyovi was founded on a singular vision: to bring world-class engineering rigor to digital transformation. We believe that robust systems are built from the ground up, not patched together as an afterthought.",
    story_button: 'Read our full story ->',
    linkedin_button: 'Connect on LinkedIn'
  });

  useEffect(() => {
    if (siteContent?.homeFounder) setForm({ ...form, ...siteContent.homeFounder });
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('homeFounder', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>Section Badge</label>
        <input type="text" value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} className={inputClass} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Founder Name</label>
          <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Founder Role</label>
          <input type="text" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Founder Bio</label>
        <textarea rows={6} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className={textareaClass} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Story Button Label</label>
          <input type="text" value={form.story_button} onChange={e => setForm({ ...form, story_button: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>LinkedIn Button Label</label>
          <input type="text" value={form.linkedin_button} onChange={e => setForm({ ...form, linkedin_button: e.target.value })} className={inputClass} />
        </div>
      </div>
      <div className="rounded-3xl border border-[#F5A800]/20 bg-[#F5A800]/5 p-6">
        <p className="text-sm leading-relaxed text-white/40">
          Founder image and LinkedIn URL come from Team Management for the founder profile. This editor controls the home section text and button labels.
        </p>
      </div>
      <div className="flex justify-end pt-2">
        <SaveButton onSave={handleSave} saved={saved} />
      </div>
    </div>
  );
};

// ── TECHNOLOGIES EDITOR ──
const TechnologiesEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    badge: 'Engineering Stack',
    title: 'Technologies We Build With',
    subtitle: 'Modern, battle-tested technologies we use to architect and deliver production-grade systems for startups, enterprises, and government organizations.'
  });

  useEffect(() => {
    if (siteContent?.technologies) setForm({ ...form, ...siteContent.technologies });
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('technologies', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div><label className={labelClass}>Badge Text</label><input type="text" value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} className={inputClass} /></div>
        <div><label className={labelClass}>Section Title</label><input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} /></div>
        <div className="md:col-span-2"><label className={labelClass}>Subtitle</label><textarea rows={3} value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className={textareaClass} /></div>
      </div>
      <div className="flex justify-end pt-2"><SaveButton onSave={handleSave} saved={saved} /></div>
    </div>
  );
};

// ── DELIVERY EDITOR ──
const DeliveryEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    badge: 'Track Record',
    title: 'Proven Delivery Across Critical Industries',
    subtitle: 'Every engagement is measured by business impact, technical rigor, and long-term reliability.'
  });

  useEffect(() => {
    if (siteContent?.delivery) setForm({ ...form, ...siteContent.delivery });
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('delivery', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div><label className={labelClass}>Badge Text</label><input type="text" value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} className={inputClass} /></div>
        <div className="md:col-span-2"><label className={labelClass}>Section Title</label><input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} /></div>
        <div className="md:col-span-2"><label className={labelClass}>Subtitle</label><textarea rows={3} value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className={textareaClass} /></div>
      </div>
      <div className="flex justify-end pt-2"><SaveButton onSave={handleSave} saved={saved} /></div>
    </div>
  );
};

// ── SECURITY EDITOR ──
const SecurityEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    badge: 'Trust Architecture',
    title: 'Security Built Into Every Layer',
    subtitle: 'Enterprise-grade security is not an add-on — it is embedded in our architecture, processes, and delivery from day one.'
  });

  useEffect(() => {
    if (siteContent?.security) setForm({ ...form, ...siteContent.security });
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('security', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div><label className={labelClass}>Badge Text</label><input type="text" value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} className={inputClass} /></div>
        <div className="md:col-span-2"><label className={labelClass}>Section Title</label><input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} /></div>
        <div className="md:col-span-2"><label className={labelClass}>Subtitle</label><textarea rows={3} value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className={textareaClass} /></div>
      </div>
      <div className="flex justify-end pt-2"><SaveButton onSave={handleSave} saved={saved} /></div>
    </div>
  );
};

// ── FINAL CTA EDITOR ──
const FinalCtaEditor = () => {
  const { siteContent, updateSiteContent } = useSite();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    headline: "Let's Build What's Next.",
    description: "Whether you're launching a new platform, modernizing infrastructure, implementing AI systems, or scaling an existing product, our team helps turn complex ideas into secure, production-ready solutions.",
    primaryLabel: 'Book Strategy Session',
    primaryPath: '/contact?type=strategy-session#inquiry',
    secondaryLabel: 'Explore Our Work',
    secondaryPath: '/projects'
  });

  useEffect(() => {
    if (siteContent?.finalCta) setForm({ ...form, ...siteContent.finalCta });
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('finalCta', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2"><label className={labelClass}>Headline</label><input type="text" value={form.headline} onChange={e => setForm({ ...form, headline: e.target.value })} className={inputClass} /></div>
        <div className="md:col-span-2"><label className={labelClass}>Description</label><textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={textareaClass} /></div>
        <div><label className={labelClass}>Primary CTA Label</label><input type="text" value={form.primaryLabel} onChange={e => setForm({ ...form, primaryLabel: e.target.value })} className={inputClass} /></div>
        <div><label className={labelClass}>Primary CTA Path</label><input type="text" value={form.primaryPath} onChange={e => setForm({ ...form, primaryPath: e.target.value })} className={inputClass} /></div>
        <div><label className={labelClass}>Secondary CTA Label</label><input type="text" value={form.secondaryLabel} onChange={e => setForm({ ...form, secondaryLabel: e.target.value })} className={inputClass} /></div>
        <div><label className={labelClass}>Secondary CTA Path</label><input type="text" value={form.secondaryPath} onChange={e => setForm({ ...form, secondaryPath: e.target.value })} className={inputClass} /></div>
      </div>
      <div className="flex justify-end pt-2"><SaveButton onSave={handleSave} saved={saved} /></div>
    </div>
  );
};

const tabs = [
  { id: 'hero', label: 'Hero Section', icon: LayoutTemplate, description: 'Main headline, subtitle and CTA buttons' },
  { id: 'metrics', label: 'Trust Metrics', icon: BarChart3, description: 'Company performance stat cards' },
  { id: 'navigation', label: 'Navigation', icon: LayoutTemplate, description: 'Header menu and primary CTA' },
  { id: 'seo', label: 'SEO', icon: Search, description: 'Meta tags and structured data' },
  { id: 'mediaLibrary', label: 'Media Library', icon: ImageIcon, description: 'Central asset storage and uploads' },
  { id: 'trustLogos', label: 'Trust Logos', icon: Globe, description: 'Section heading and client logo strip' },
  { id: 'testimonialsSection', label: 'Testimonials', icon: Quote, description: 'Homepage testimonial cards and avatars' },
  { id: 'byTheNumbers', label: 'By The Numbers', icon: BarChart3, description: '24/7 support, engineering practices, etc.' },
  { id: 'homeFounder', label: 'Home Leadership', icon: Users, description: 'Home founder section text and actions' },
  { id: 'companyTeam', label: 'Company Team', icon: Users, description: 'Team section heading and founder spotlight' },
  { id: 'about', label: 'About / Company', icon: Globe, description: 'Company identity and key facts' },
  { id: 'services', label: 'Services', icon: CheckCircle2, description: 'Service listings' },
  { id: 'portfolio', label: 'Portfolio', icon: Globe, description: 'Case studies & projects' },
  { id: 'ctas', label: 'Bottom CTAs', icon: MessageSquare, description: 'Ready to scale? global texts' },
  { id: 'footer', label: 'Footer Text', icon: FileText, description: 'Footer tagline and copyright text' },
  { id: 'technologies', label: 'Technologies', icon: Cpu, description: 'Tech stack section heading and text' },
  { id: 'delivery', label: 'Proof of Delivery', icon: Briefcase, description: 'Delivery track record section' },
  { id: 'security', label: 'Security & Compliance', icon: Shield, description: 'Security trust section' },
  { id: 'finalCta', label: 'Final CTA', icon: Target, description: 'Strategic partnership CTA section' }
];

const AdminContent = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const active = tabs.find(t => t.id === activeTab)!;

  const renderEditor = () => {
    switch (activeTab) {
      case 'hero': return <HeroEditor />;
      case 'metrics': return <MetricsEditor />;
      case 'navigation': return <NavigationEditor />;
      case 'seo': return <SEOEditor />;
      case 'mediaLibrary': return <MediaLibraryEditor />;
      case 'trustLogos': return <TrustLogosEditor />;
      case 'testimonialsSection': return <HomepageTestimonialsEditor />;
      case 'byTheNumbers': return <ByTheNumbersEditor />;
      case 'homeFounder': return <HomeFounderEditor />;
      case 'companyTeam': return <CompanyTeamEditor />;
      case 'about': return <AboutEditor />;
      case 'services': return <ServicesEditor />;
      case 'portfolio': return <PortfolioEditor />;
      case 'ctas': return <CTAEditor />;
      case 'footer': return <FooterEditor />;
      case 'technologies': return <TechnologiesEditor />;
      case 'delivery': return <DeliveryEditor />;
      case 'security': return <SecurityEditor />;
      case 'finalCta': return <FinalCtaEditor />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Site Content Editor</h1>
        <p className="text-sm text-white/40 mt-2">Customize the text and content across the entire website in real-time.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="lg:w-72 shrink-0 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-5 py-4.5 rounded-2xl text-left transition-all duration-300 group ${activeTab === tab.id
                ? 'bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-white shadow-xl shadow-[#F5A800]/20'
                : 'bg-white/[0.03] border border-white/[0.06] text-white/60 hover:bg-white/[0.06] hover:text-white hover:border-white/[0.12]'
                }`}
            >
              <tab.icon size={20} className="shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{tab.label}</p>
                <p className={`text-xs truncate mt-1 ${activeTab === tab.id ? 'text-white/70' : 'text-white/35'}`}>{tab.description}</p>
              </div>
              {activeTab === tab.id && <ChevronRight size={16} className="shrink-0" />}
            </button>
          ))}

          {/* Tip box */}
          <div className="mt-6 p-6 bg-[#F5A800]/5 border border-[#F5A800]/20 rounded-3xl">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare size={18} className="text-[#F5A800]" />
              <span className="text-xs font-black text-[#F5A800] uppercase tracking-[0.25em]">Live Preview</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              Changes are applied instantly across the main website when you save. Open the site in another tab to preview.
            </p>
          </div>
        </div>

        {/* Editor Panel */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-gradient-to-br from-[#050816]/90 to-[#02040a]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Panel Header */}
            <div className="flex items-center gap-4 px-8 py-6 border-b border-white/[0.06] bg-white/[0.01]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5A800] to-[#ffb700] flex items-center justify-center text-white shadow-lg shadow-[#F5A800]/20">
                <active.icon size={22} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">{active.label}</h3>
                <p className="text-xs text-white/40 mt-1">{active.description}</p>
              </div>
            </div>

            {/* Editor Content */}
            <div className="p-8">
              {renderEditor()}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
