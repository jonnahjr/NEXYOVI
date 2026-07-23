import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { useToast } from '../../context/ToastContext';

export default function AdminCareersContent() {
  const { siteContent, updateSiteContent } = useSite();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<any>({
    title: 'Build the future of <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">African Engineering.</span>',
    description: 'We are looking for top-tier talent to join our mission of delivering world-class software, security, and AI solutions from our roots in Ethiopia to the world.',
    benefits: [
      { title: 'Remote Flexibility', desc: 'Work from anywhere or from our Addis Ababa hub.' },
      { title: 'Top-Tier Equipment', desc: 'Latest MacBooks and high-end monitors provided.' },
      { title: 'Continuous Learning', desc: 'Budgets for courses, books, and certifications.' },
      { title: 'Global Standards', desc: 'Work on cutting-edge projects with international clients.' },
    ]
  });

  useEffect(() => {
    if (siteContent?.careers) {
      setContent(siteContent.careers);
    }
  }, [siteContent]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateSiteContent('careers', content);
      showToast('Careers content updated successfully', 'success');
    } catch (err) {
      showToast('Failed to update content', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addBenefit = () => {
    setContent({
      ...content,
      benefits: [...(content.benefits || []), { title: '', desc: '' }]
    });
  };

  const updateBenefit = (index: number, key: string, value: string) => {
    const newBenefits = [...content.benefits];
    newBenefits[index] = { ...newBenefits[index], [key]: value };
    setContent({ ...content, benefits: newBenefits });
  };

  const removeBenefit = (index: number) => {
    const newBenefits = [...content.benefits];
    newBenefits.splice(index, 1);
    setContent({ ...content, benefits: newBenefits });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Careers Page Content</h1>
          <p className="text-xs text-white/40 mt-1">Edit the hero text and benefits on the Careers page.</p>
        </div>
        <button 
          onClick={handleSave} disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#F5A800]/20 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Changes
        </button>
      </div>

      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Hero Section</h2>
        
        <div>
          <label className="block text-xs font-semibold text-white/50 mb-1.5">Hero Title (HTML supported)</label>
          <input 
            value={content.title || ''} onChange={e => setContent({ ...content, title: e.target.value })}
            className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-white/50 mb-1.5">Hero Description</label>
          <textarea 
            value={content.description || ''} onChange={e => setContent({ ...content, description: e.target.value })}
            rows={3}
            className="w-full p-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors"
          />
        </div>
      </div>

      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
          <h2 className="text-lg font-bold text-white">Benefits List</h2>
          <button onClick={addBenefit} className="text-[#F5A800] text-xs font-bold flex items-center gap-1 hover:underline">
            <Plus size={14} /> Add Benefit
          </button>
        </div>

        <div className="space-y-4">
          {(content.benefits || []).map((b: any, i: number) => (
            <div key={i} className="flex gap-4 items-start p-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="flex-1 space-y-3">
                <input 
                  value={b.title} onChange={e => updateBenefit(i, 'title', e.target.value)}
                  placeholder="Benefit Title"
                  className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                />
                <input 
                  value={b.desc} onChange={e => updateBenefit(i, 'desc', e.target.value)}
                  placeholder="Benefit Description"
                  className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                />
              </div>
              <button onClick={() => removeBenefit(i)} className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-1">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
