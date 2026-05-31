import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
 Type, LayoutTemplate, Save, CheckCircle2, 
 Globe, BarChart3, FileText, MessageSquare, ChevronRight
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const inputClass = "w-full h-11 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-sm outline-none focus:border-[#F5A800]/60 focus:ring-1 focus:ring-[#F5A800]/30 transition-all placeholder:text-white/20";
const textareaClass = "w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-sm outline-none focus:border-[#F5A800]/60 focus:ring-1 focus:ring-[#F5A800]/30 transition-all placeholder:text-white/20 resize-none leading-relaxed";
const labelClass = "block text-xs font-bold text-white/30 uppercase tracking-widest mb-2 ml-1";

const SaveButton = ({ onSave, saved }: { onSave: (e: any) => void, saved: boolean }) => (
 <button
 onClick={onSave}
 className={`flex items-center gap-2 h-9 px-5 text-sm font-bold uppercase tracking-widest rounded-lg transition-all ${saved ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-[#F5A800] text-white hover:bg-blue-500 /20'}`}
 >
 {saved ? <CheckCircle2 size={15} /> : <Save size={15} />}
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
 <div className="space-y-5">
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
 placeholder="We engineer military-grade cloud ecosystems..."
 />
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className={labelClass}>Primary Button Text</label>
 <input type="text" value={form.cta_primary} onChange={e => setForm({ ...form, cta_primary: e.target.value })} className={inputClass} placeholder="Deploy with Nexyovi" />
 </div>
 <div>
 <label className={labelClass}>Secondary Button Text</label>
 <input type="text" value={form.cta_secondary} onChange={e => setForm({ ...form, cta_secondary: e.target.value })} className={inputClass} placeholder="View Documentation" />
 </div>
 </div>
 <div className="flex justify-end">
 <SaveButton onSave={handleSave} saved={saved} />
 </div>
 </div>
 );
};

// ── STATS SECTION EDITOR ──
const StatsEditor = () => {
 const { siteContent, updateSiteContent } = useSite();
 const [saved, setSaved] = useState(false);
 const defaultStats = [
 { value: '150+', label: 'Enterprise Deployments' },
 { value: '99.99%', label: 'SLA Guaranteed Uptime' },
 { value: 'AI Native', label: 'Intelligence' },
 { value: '#1', label: 'Tech Agency in East Africa' }
 ];
 const [stats, setStats] = useState<any[]>(defaultStats);

 useEffect(() => {
 if (siteContent?.stats) setStats(siteContent.stats);
 }, [siteContent]);

 const handleSave = async (e: any) => {
 e.preventDefault();
 await updateSiteContent('stats', stats);
 setSaved(true);
 setTimeout(() => setSaved(false), 3000);
 };

 return (
 <div className="space-y-5">
 <p className="text-sm text-white/40">Edit the four key metrics displayed in the Trust Bar below the hero section.</p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {stats.map((stat, i) => (
 <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 space-y-3">
 <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Stat #{i + 1}</p>
 <div>
 <label className={labelClass}>Value / Number</label>
 <input
 type="text"
 value={stat.value}
 onChange={e => { const n = [...stats]; n[i] = { ...n[i], value: e.target.value }; setStats(n); }}
 className={inputClass + " text-xl font-black text-[#F5A800]"}
 placeholder="150+"
 />
 </div>
 <div>
 <label className={labelClass}>Label</label>
 <input
 type="text"
 value={stat.label}
 onChange={e => { const n = [...stats]; n[i] = { ...n[i], label: e.target.value }; setStats(n); }}
 className={inputClass}
 placeholder="Enterprise Deployments"
 />
 </div>
 </div>
 ))}
 </div>
 <div className="flex justify-end">
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
 tagline: 'The world\'s most advanced multi-disciplinary tech powerhouse. Dominating Cyber Security, AI, and Software Engineering from Addis Ababa to Miami.',
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
 <div className="space-y-5">
 <div>
 <label className={labelClass}>Footer Company Tagline</label>
 <textarea
 rows={3}
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
 <div className="flex justify-end">
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
 tagline: 'Where Intelligence Meets Infrastructure',
 description: 'Nexyovi is a full-spectrum technology powerhouse headquartered in Addis Ababa with offices in Miami. We engineer elite digital solutions across Cybersecurity, AI, Cloud, and Software Development.',
 founded: '2020',
 employees: '30+',
 countries: '12+'
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
 <div className="space-y-5">
 <div>
 <label className={labelClass}>Company Tagline</label>
 <input type="text" value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} className={inputClass} />
 </div>
 <div>
 <label className={labelClass}>Company Description</label>
 <textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={textareaClass} />
 </div>
 <div className="grid grid-cols-3 gap-4">
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
 <div className="flex justify-end">
 <SaveButton onSave={handleSave} saved={saved} />
 </div>
 </div>
 );
};

// ── MAIN CONTENT PAGE ──
const tabs = [
 { id: 'hero', label: 'Hero Section', icon: LayoutTemplate, description: 'Main headline, subtitle and CTA buttons' },
 { id: 'stats', label: 'Stats / Trust Bar', icon: BarChart3, description: 'Key metrics below the hero' },
 { id: 'about', label: 'About / Company', icon: Globe, description: 'Company identity and key facts' },
 { id: 'footer', label: 'Footer Text', icon: FileText, description: 'Footer tagline and copyright text' }];

const AdminContent = () => {
 const [activeTab, setActiveTab] = useState('hero');
 const active = tabs.find(t => t.id === activeTab)!;

 const renderEditor = () => {
 switch (activeTab) {
 case 'hero': return <HeroEditor />;
 case 'stats': return <StatsEditor />;
 case 'about': return <AboutEditor />;
 case 'footer': return <FooterEditor />;
 default: return null;
 }
 };

 return (
 <div className="space-y-6">
 {/* Header */}
 <div>
 <h1 className="text-3xl font-bold text-white">Site Content Editor</h1>
 <p className="text-white/30 text-sm mt-1">Customize the text and content across the entire website in real-time.</p>
 </div>

 <div className="flex flex-col lg:flex-row gap-6">
 {/* Sidebar Nav */}
 <div className="lg:w-64 shrink-0 space-y-1">
 {tabs.map(tab => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all group ${
 activeTab === tab.id
 ? 'bg-[#F5A800] text-white /20'
 : 'bg-white/[0.03] border border-white/[0.06] text-white/60 hover:bg-white/[0.06] hover:text-white'
 }`}
 >
 <tab.icon size={18} className="shrink-0" />
 <div className="flex-1 min-w-0">
 <p className="text-sm font-bold truncate">{tab.label}</p>
 <p className={`text-xs truncate mt-0.5 ${activeTab === tab.id ? 'text-white/70' : 'text-white/30'}`}>{tab.description}</p>
 </div>
 {activeTab === tab.id && <ChevronRight size={14} className="shrink-0" />}
 </button>
 ))}

 {/* Tip box */}
 <div className="mt-4 p-4 bg-[#F5A800]/5 border border-[#F5A800]/20 rounded-xl">
 <div className="flex items-center gap-2 mb-2">
 <MessageSquare size={14} className="text-[#F5A800]" />
 <span className="text-xs font-bold text-[#F5A800] uppercase tracking-widest">Live Preview</span>
 </div>
 <p className="text-xs text-white/30 leading-relaxed">
 Changes are applied instantly across the main website when you save. Open the site in another tab to preview.
 </p>
 </div>
 </div>

 {/* Editor Panel */}
 <div className="flex-1">
 <motion.div
 key={activeTab}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.2 }}
 className="bg-[#0D0D14] border border-white/[0.06] rounded-2xl overflow-hidden"
 >
 {/* Panel Header */}
 <div className="flex items-center gap-3 px-6 py-5 border-b border-white/[0.06] bg-white/[0.01]">
 <div className="w-10 h-10 rounded-xl bg-[#F5A800]/10 flex items-center justify-center text-[#F5A800]">
 <active.icon size={20} />
 </div>
 <div>
 <h3 className="text-base font-bold text-white">{active.label}</h3>
 <p className="text-xs text-white/40">{active.description}</p>
 </div>
 </div>

 {/* Editor Content */}
 <div className="p-6">
 {renderEditor()}
 </div>
 </motion.div>
 </div>
 </div>
 </div>
 );
};

export default AdminContent;
