import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { useToast } from '../../context/ToastContext';

export default function AdminInternshipContent() {
  const { siteContent, updateSiteContent } = useSite();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<any>({
    title: 'Kickstart your career with <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">Elite Engineers.</span>',
    description: 'Our 3-to-6 month intensive program is designed to turn promising junior talent into production-ready engineers. Join us in Addis Ababa or work remotely.',
    highlights: [
      { title: 'Real Projects', desc: 'No dummy projects. You will push code to production systems used by millions.' },
      { title: 'Direct Mentorship', desc: '1-on-1 pairing with senior engineers who have built enterprise-scale systems.' },
      { title: 'Modern Stack', desc: 'Master React, Node.js, Go, AWS, and modern AI development tools.' },
      { title: 'Job Offer', desc: 'Top performers receive full-time offers at the end of the internship program.' },
    ],
    steps: [
      { step: '1', title: 'Apply', desc: 'Submit your resume and github portfolio.' },
      { step: '2', title: 'Assessment', desc: 'Complete a take-home coding challenge.' },
      { step: '3', title: 'Interview', desc: 'Technical and cultural fit interview.' },
      { step: '4', title: 'Offer', desc: 'Receive an offer to join the next cohort.' },
    ]
  });

  useEffect(() => {
    if (siteContent?.internship) {
      setContent(siteContent.internship);
    }
  }, [siteContent]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateSiteContent('internship', content);
      showToast('Internship content updated successfully', 'success');
    } catch (err) {
      showToast('Failed to update content', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateArrayItem = (arrayName: string, index: number, key: string, value: string) => {
    const newArray = [...(content[arrayName] || [])];
    newArray[index] = { ...newArray[index], [key]: value };
    setContent({ ...content, [arrayName]: newArray });
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Internship Page Content</h1>
          <p className="text-xs text-white/40 mt-1">Edit the hero text, highlights, and steps on the Internship page.</p>
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
        <h2 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Highlights List</h2>

        <div className="space-y-4">
          {(content.highlights || []).map((b: any, i: number) => (
            <div key={i} className="flex gap-4 items-start p-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="flex-1 space-y-3">
                <input 
                  value={b.title} onChange={e => updateArrayItem('highlights', i, 'title', e.target.value)}
                  placeholder="Highlight Title"
                  className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                />
                <input 
                  value={b.desc} onChange={e => updateArrayItem('highlights', i, 'desc', e.target.value)}
                  placeholder="Highlight Description"
                  className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Application Steps</h2>

        <div className="space-y-4">
          {(content.steps || []).map((s: any, i: number) => (
            <div key={i} className="flex gap-4 items-start p-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="w-12 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-white font-bold">
                {s.step || (i+1)}
              </div>
              <div className="flex-1 space-y-3">
                <input 
                  value={s.title} onChange={e => updateArrayItem('steps', i, 'title', e.target.value)}
                  placeholder="Step Title"
                  className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                />
                <input 
                  value={s.desc} onChange={e => updateArrayItem('steps', i, 'desc', e.target.value)}
                  placeholder="Step Description"
                  className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
