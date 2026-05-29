import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Edit2, Trash2, Star, 
  X, Save, Image as ImageIcon, Quote, ArrowLeft, UploadCloud
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { supabase } from '../../lib/supabase';

const AdminTestimonials = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useSite();
  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `testimonials/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('nexyovi_assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('nexyovi_assets')
        .getPublicUrl(filePath);

      setForm({ ...form, image_url: data.publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please check console for details.');
    } finally {
      setIsUploading(false);
    }
  };

  const [form, setForm] = useState({
    content: '',
    author: '',
    role: '',
    image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  });

  const open = (t: any = null) => {
    if (t) {
      setEditing(t);
      setForm({
        content: t.content,
        author: t.author,
        role: t.role,
        image_url: t.image_url || t.img || '',
      });
    } else {
      setEditing(null);
      setForm({
        content: '',
        author: '',
        role: '',
        image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      });
    }
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateTestimonial({ ...editing, ...form });
    } else {
      addTestimonial({ ...form });
    }
    setIsEditing(false);
  };

  const filtered = testimonials.filter(t => 
    t.author.toLowerCase().includes(search.toLowerCase()) ||
    t.content.toLowerCase().includes(search.toLowerCase())
  );

  if (isEditing) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6 max-w-5xl mx-auto"
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsEditing(false)}
            className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/40 hover:bg-white/[0.08] hover:text-white transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{editing ? 'Edit Testimony' : 'New Testimony'}</h1>
            <p className="text-sm text-white/40 mt-0.5">Global feedback management</p>
          </div>
        </div>

        <div className="bg-[#0D1220] border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl">
          <form onSubmit={save} className="p-6 md:p-8 space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Testimony Content</label>
              <textarea 
                required
                value={form.content}
                onChange={(e) => setForm({...form, content: e.target.value})}
                rows={6}
                className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 resize-none transition-all font-medium leading-relaxed"
                placeholder="What did the client say about Nexyovi?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Author Name</label>
                <input 
                  required
                  type="text" 
                  value={form.author}
                  onChange={(e) => setForm({...form, author: e.target.value})}
                  className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all font-semibold"
                  placeholder="e.g. Jameson Blake"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Role & Company</label>
                <input 
                  required
                  type="text" 
                  value={form.role}
                  onChange={(e) => setForm({...form, role: e.target.value})}
                  className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all font-semibold"
                  placeholder="e.g. CEO, Quantum Systems"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Avatar Image URL</label>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-20 h-20 rounded-xl bg-[#070B14] border border-white/10 overflow-hidden shrink-0 group relative">
                  <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon size={20} className="text-white/40" />
                  </div>
                </div>
                <div className="flex-1 space-y-3 w-full min-w-0">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input 
                      type="text" 
                      value={form.image_url}
                      onChange={(e) => setForm({...form, image_url: e.target.value})}
                      className="w-full sm:flex-1 h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 transition-all font-mono"
                      placeholder="https://images.unsplash.com/..."
                    />
                    <label className={`w-full sm:w-auto h-11 px-6 flex items-center justify-center gap-2 rounded-xl border border-white/10 text-sm font-bold transition-all cursor-pointer ${isUploading ? 'bg-white/10 text-white/50' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20'}`}>
                      <UploadCloud size={16} />
                      {isUploading ? 'Uploading...' : 'Upload'}
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-white/30 italic font-medium">Provide a direct image link or upload a professional headshot.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/[0.06]">
              <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                className="h-10 px-6 text-sm font-bold text-white/40 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="h-10 px-6 bg-[#F5A800] text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-blue-600 flex items-center gap-2 transition-all shadow-lg shadow-[#F5A800]/20"
              >
                <Save size={16} /> {editing ? 'Save Changes' : 'Publish Testimony'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Testimonials</h1>
          <p className="text-sm text-white/40 mt-0.5">{testimonials.length} verified reviews</p>
        </div>
        <button onClick={() => open()} className="flex items-center gap-1.5 h-10 px-4 bg-[#F5A800] text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-[#F5A800]/20">
          <Plus size={16} /> New Testimony
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Search by author or content..." 
          className="w-full h-12 pl-11 pr-4 bg-[#0D1220] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all shadow-sm" 
        />
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.length > 0 ? filtered.map((t) => (
          <motion.div 
            key={t.id}
            layout
            className="bg-[#0D1220] border border-white/[0.08] p-6 rounded-2xl hover:border-white/20 transition-all group relative overflow-hidden shadow-sm"
          >
            <Quote className="absolute top-5 right-5 text-white/[0.03] group-hover:text-[#F5A800]/5 transition-colors" size={48} />
            
            <p className="text-white/70 text-sm leading-relaxed mb-6 relative z-10 line-clamp-4">
              "{t.content}"
            </p>
            
            <div className="flex items-center justify-between mt-auto relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#070B14] border border-white/10 overflow-hidden shrink-0">
                  <img src={t.image_url || t.img} alt={t.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight">{t.author}</div>
                  <div className="text-xs text-[#F5A800] font-bold mt-0.5">{t.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => open(t)}
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-[#F5A800]/10 hover:border-[#F5A800]/20 hover:text-[#F5A800] text-white/40 flex items-center justify-center transition-all"
                >
                  <Edit2 size={14} />
                </button>
                <button 
                  onClick={() => deleteTestimonial(t.id)}
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 text-white/40 flex items-center justify-center transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="lg:col-span-2 py-16 text-center bg-[#0D1220] border border-dashed border-white/10 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3 text-white/20">
              <Quote size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">No Testimonials Found</h3>
            <p className="text-white/40 text-xs mt-1 mb-5">Add customer feedback to display it on the site.</p>
            <button onClick={() => open()} className="px-5 py-2.5 bg-[#F5A800] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-[#F5A800]/20">
              <Plus size={14} className="inline mr-1" />Add First Testimony
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonials;
