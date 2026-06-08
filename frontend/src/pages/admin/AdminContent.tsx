import { motion } from 'framer-motion';
import {
  BarChart3,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe,
  LayoutTemplate,
  MessageSquare,
  Save,
  Users,
  Plus,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSite } from '../../context/SiteContext';

const inputClass = "w-full h-14 px-5 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white text-sm outline-none focus:border-[#F5A800]/60 focus:ring-2 focus:ring-[#F5A800]/20 transition-all placeholder:text-white/20 font-medium";
const textareaClass = "w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white text-sm outline-none focus:border-[#F5A800]/60 focus:ring-2 focus:ring-[#F5A800]/20 transition-all placeholder:text-white/20 resize-none font-medium leading-relaxed";
const labelClass = "block text-xs font-bold text-white/35 uppercase tracking-[0.2em] mb-3 ml-1";

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
          placeholder="Where Intelligence Meets Infrastructure."
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
    copyright_extra: 'Global. All Rights Reserved.'
  });

  useEffect(() => {
    if (siteContent?.footer) setForm({ ...siteContent.footer });
  }, [siteContent]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    await updateSiteContent('footer', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>Footer Company Tagline</label>
        <textarea
          rows={4}
          value={form.tagline}
          onChange={e => setForm({ ...form, tagline: e.target.value })}
          className={textareaClass}
          placeholder="The world's most advanced..."
        />
      </div>
      <div>
        <label className={labelClass}>Copyright Suffix</label>
        <input
          type="text"
          value={form.copyright_extra}
          onChange={e => setForm({ ...form, copyright_extra: e.target.value })}
          className={inputClass}
          placeholder="Global. All Rights Reserved."
        />
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
    { value: 0, suffix: '', label: 'Engineering-Led Delivery Teams', hideNumber: true },
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

const tabs = [
  { id: 'hero', label: 'Hero Section', icon: LayoutTemplate, description: 'Main headline, subtitle and CTA buttons' },
  { id: 'metrics', label: 'Trust Metrics', icon: BarChart3, description: 'Company performance stat cards' },
  { id: 'byTheNumbers', label: 'By The Numbers', icon: BarChart3, description: '24/7 support, engineering practices, etc.' },
  { id: 'homeFounder', label: 'Home Leadership', icon: Users, description: 'Home founder section text and actions' },
  { id: 'companyTeam', label: 'Company Team', icon: Users, description: 'Team section heading and founder spotlight' },
  { id: 'about', label: 'About / Company', icon: Globe, description: 'Company identity and key facts' },
  { id: 'services', label: 'Services', icon: CheckCircle2, description: 'Service listings' },
  { id: 'portfolio', label: 'Portfolio', icon: Globe, description: 'Case studies & projects' },
  { id: 'ctas', label: 'Bottom CTAs', icon: MessageSquare, description: 'Ready to scale? global texts' },
  { id: 'footer', label: 'Footer Text', icon: FileText, description: 'Footer tagline and copyright text' }
];

const AdminContent = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const active = tabs.find(t => t.id === activeTab)!;

  const renderEditor = () => {
    switch (activeTab) {
      case 'hero': return <HeroEditor />;
      case 'metrics': return <MetricsEditor />;
      case 'byTheNumbers': return <ByTheNumbersEditor />;
      case 'homeFounder': return <HomeFounderEditor />;
      case 'companyTeam': return <CompanyTeamEditor />;
      case 'about': return <AboutEditor />;
      case 'services': return <ServicesEditor />;
      case 'portfolio': return <PortfolioEditor />;
      case 'ctas': return <CTAEditor />;
      case 'footer': return <FooterEditor />;
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
