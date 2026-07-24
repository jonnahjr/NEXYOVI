import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Save, X, Quote, ArrowLeft, UploadCloud } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import * as api from '../../lib/api';

const AdminTestimonials = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useSite();
  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({ content: '', author: '', role: '', company: '', highlight: '', linkedin: '', image_url: '' });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setIsUploading(true);
    try {
      const file = e.target.files[0];
      const url = await api.uploadFile(file);
      setForm({ ...form, image_url: url });
    } catch (err) { console.error(err); alert('Upload failed'); }
    finally { setIsUploading(false); }
  };

  const open = (t: any = null) => {
    if (t) {
      setEditing(t);
      setForm({
        content: t.content || t.quote || '',
        author: t.author || '',
        role: t.role || '',
        company: t.company || '',
        highlight: t.highlight || '',
        linkedin: t.linkedin || '',
        image_url: t.image_url || t.avatar_url || t.img || t.avatar || ''
      });
    } else {
      setEditing(null);
      setForm({
        content: '',
        author: '',
        role: '',
        company: '',
        highlight: '',
        linkedin: '',
        image_url: ''
      });
    }
    setIsEditing(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      const { img, avatar_url, quote, ...cleanEditing } = editing;
      await updateTestimonial({ ...cleanEditing, ...form });
    } else {
      await addTestimonial({ ...form });
    }
    setIsEditing(false);
  };

  const importDefaults = async () => {
    if (!window.confirm('This will import the 5 default testimonials. Continue?')) return;
    const defaults = [
      { content: "They connected us with top-tier Ethiopian engineering talent and built our core platform in parallel. They brought deep technical expertise and a true partnership mindset. Gebeya's collaboration with Nexyovi has been transformative for our pan-African expansion.", role: 'CEO & Co-Founder', author: 'Amadou Daffe', image_url: '', linkedin: 'https://et.linkedin.com/in/amadoudaffe' },
      { content: "We needed a secure payment gateway that could handle Ethiopia's unique banking landscape. Nexyovi built it — integrating with four banks and processing live transactions on day one. Their focus on security and reliability has been a game-changer for our platform.", role: 'CEO', author: 'Rediet Tsigeberhan', image_url: '', linkedin: 'https://www.linkedin.com/in/rediet-tsigeberhan-97615642' },
      { content: 'They delivered our health infrastructure platform ahead of schedule, navigating complex compliance requirements seamlessly. The system now serves users across regional hospitals and clinics.', role: 'Chief Technology Officer', author: 'Dawit Mekonnen', image_url: '', linkedin: '' },
      { content: 'We needed a complete digital transformation — from legacy systems to modern cloud infrastructure. Nexyovi handled the migration with zero downtime and trained our team on the new stack. Their engineering discipline is world-class.', role: 'Head of Digital', author: 'Tigist Hailemariam', image_url: '', linkedin: '' },
      { content: "The mobile app they built for us had over 50k downloads in the first month. But what impressed me most was how they thought about scalability from day one — we haven't had a single performance issue even as traffic grew.", role: 'VP of Product', author: 'Binyam Alemu', image_url: '', linkedin: '' }
    ];
    for (const t of defaults) {
      await addTestimonial(t);
    }
    alert('Imported!');
  };

  const filtered = testimonials.filter(t => (t.author || '').toLowerCase().includes(search.toLowerCase()) || (t.content || '').toLowerCase().includes(search.toLowerCase()));

  if (isEditing) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 max-w-3xl">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsEditing(false)} className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.05] transition-all"><ArrowLeft size={18} /></button>
          <div>
            <h1 className="text-xl font-bold text-white">{editing ? 'Edit Testimony' : 'New Testimony'}</h1>
            <p className="text-xs text-white/40 mt-0.5">Manage client feedback</p>
          </div>
        </div>
        <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl">
          <form onSubmit={save} className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5">Testimony *</label>
              <textarea required value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={5}
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-colors resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5">Author *</label>
                <input required value={form.author} onChange={e => setForm({ ...form, author: e.target.value })}
                  className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5">Role *</label>
                <input required value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                  className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5">Company</label>
                <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                  className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5">Highlight Word (colors it gold)</label>
                <input value={form.highlight} onChange={e => setForm({ ...form, highlight: e.target.value })}
                  className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-white/50 mb-1.5">LinkedIn URL</label>
                <input value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })}
                  className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5">Avatar Image URL</label>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-16 h-16 rounded-xl border border-white/10 overflow-hidden shrink-0 bg-white/[0.03]">
                  {form.image_url ? (
                    <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-white/20 bg-white/[0.02]">No Image</div>
                  )}
                </div>
                <div className="flex-1 w-full space-y-2">
                  <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })}
                    className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" />
                  <div className="flex gap-2">
                    <label className={`inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-white/10 text-xs font-semibold transition-all cursor-pointer ${isUploading ? 'bg-white/5 text-white/40' : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06]'}`}>
                      <UploadCloud size={14} />{isUploading ? 'Uploading...' : 'Upload'}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                    </label>
                    {form.image_url && (
                      <button type="button" onClick={() => setForm({ ...form, image_url: '' })} className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-red-500/20 bg-red-500/5 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-all">
                        <X size={14} /> Remove Image
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.06]">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium text-white/40 hover:text-white transition-colors">Cancel</button>
              <button type="submit" className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#F5A800]/20 transition-all">
                <Save size={15} /> {editing ? 'Save Changes' : 'Publish'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Testimonials</h1>
          <p className="text-xs text-white/40 mt-1">{testimonials.length} reviews</p>
        </div>
        <div className="flex gap-2">
          {testimonials.length < 5 && (
            <button onClick={importDefaults} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white/70 text-sm font-semibold rounded-lg hover:bg-white/10 hover:text-white transition-all">
              Import Defaults
            </button>
          )}
          <button onClick={() => open()} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#F5A800]/20 transition-all">
            <Plus size={16} /> New Testimony
          </button>
        </div>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by author or content..."
          className="w-full h-10 pl-10 pr-4 bg-[#0D1220] border border-white/[0.08] rounded-lg text-sm text-white/70 placeholder:text-white/25 focus:outline-none focus:border-[#F5A800]/50 transition-colors" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.length > 0 ? filtered.map(t => (
          <motion.div key={t.id} layout className="bg-[#0D1220] border border-white/[0.08] p-5 rounded-xl hover:border-white/20 hover:shadow-lg transition-all group relative">
            <Quote className="absolute top-4 right-4 text-white/[0.03] group-hover:text-[#F5A800]/10 transition-colors" size={40} />
            <p className="text-sm text-white/60 leading-relaxed mb-4 relative z-10 line-clamp-4 italic">&ldquo;{t.content}&rdquo;</p>
            <div className="flex items-center justify-between mt-auto relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg border border-white/10 overflow-hidden shrink-0 bg-white/[0.03]">
                  {t.image_url || t.avatar_url || t.img || t.avatar ? (
                    <img src={t.image_url || t.avatar_url || t.img || t.avatar} alt={t.author} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white/50 bg-white/5">
                      {(t.author || "User").split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t.author}</div>
                  <div className="text-xs text-[#F5A800] font-semibold mt-0.5">
                    {t.role} {t.company && `at ${t.company}`}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => open(t)} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-[#F5A800] hover:border-[#F5A800]/30 transition-all"><Edit2 size={13} /></button>
                <button onClick={() => deleteTestimonial(t.id)} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-red-400 hover:border-red-400/30 transition-all"><Trash2 size={13} /></button>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="lg:col-span-2 py-16 text-center bg-[#0D1220] border border-dashed border-white/10 rounded-xl">
            <Quote size={28} className="mx-auto mb-3 text-white/20" />
            <p className="text-sm text-white/50 font-medium">No testimonials found</p>
            <button onClick={() => open()} className="mt-3 px-4 py-2 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black text-xs font-bold rounded-lg transition-all"><Plus size={14} className="inline mr-1" />Add First</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonials;
