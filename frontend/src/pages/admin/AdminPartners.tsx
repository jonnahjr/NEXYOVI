import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Save, X, Globe, Check, UploadCloud } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import * as api from '../../lib/api';
import { motion } from 'framer-motion';

const AdminPartners = () => {
  const { partners, addPartner, updatePartner, deletePartner } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState<any>(null);
  const [form, setForm] = useState({ name: '', logo_url: '' });
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const filtered = partners.filter((p: any) =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setIsUploading(true);
    try {
      const file = e.target.files[0];
      const url = await api.uploadFile(file);
      setForm(p => ({ ...p, logo_url: url }));
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally { setIsUploading(false); }
  };

  const openNew = () => {
    setEditingPartner(null);
    setForm({ name: '', logo_url: '' });
    setShowForm(true);
  };

  const openEdit = (partner: any) => {
    setEditingPartner(partner);
    setForm({ name: partner.name || '', logo_url: partner.logo_url || '' });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    if (editingPartner) {
      await updatePartner({ ...editingPartner, ...form });
      setSaveStatus('Partner updated!');
    } else {
      await addPartner({ ...form, id: crypto.randomUUID() });
      setSaveStatus('Partner added!');
    }
    setTimeout(() => setSaveStatus(null), 2000);
    setShowForm(false);
    setEditingPartner(null);
    setForm({ name: '', logo_url: '' });
  };

  const handleDelete = async (p: any) => {
    if (!window.confirm(`Delete "${p.name}"?`)) return;
    await deletePartner(p.id);
    setSaveStatus('Partner deleted');
    setTimeout(() => setSaveStatus(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe size={20} className="text-[#F5A800]" />
            <div>
              <h1 className="text-xl font-bold text-white">Partners & Trust Logos</h1>
              <p className="text-xs text-white/40 mt-0.5">{partners.length} partners · Add, edit, delete — syncs to site in real-time</p>
            </div>
          </div>
          {saveStatus && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Check size={14} /> {saveStatus}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search partners..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-white/[0.04] border border-white/[0.08] rounded-lg text-white/60 placeholder:text-white/25 focus:outline-none focus:border-[#F5A800]/50 transition-colors" />
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black text-xs font-bold rounded-lg hover:shadow-lg hover:shadow-[#F5A800]/20 transition-all">
          <Plus size={14} /> Add Partner
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-sm">{editingPartner ? 'Edit Partner' : 'Add Partner'}</h3>
              <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white"><X size={16} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5">Partner Name</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                  placeholder="e.g. Ethio Telecom" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5">Logo</label>
                <div className="flex flex-col gap-2">
                  <input value={form.logo_url} onChange={e => setForm(p => ({ ...p, logo_url: e.target.value }))}
                    className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                    placeholder="https://example.com/logo.svg" />
                  <label className={`inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-white/10 text-xs font-semibold transition-all cursor-pointer w-fit ${isUploading ? 'bg-white/5 text-white/40' : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06]'}`}>
                    <UploadCloud size={14} />{isUploading ? 'Uploading...' : 'Upload from computer'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                  </label>
                </div>
              </div>
              {form.logo_url && (
                <div className="bg-white/[0.03] rounded-lg p-3 flex items-center gap-3 border border-white/[0.06]">
                  <img src={form.logo_url} alt="" className="h-10 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <span className="text-xs text-white/40">Preview</span>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-white/[0.06]">
              <button onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-white/[0.1] text-white/40 text-xs font-medium rounded-lg hover:bg-white/[0.05] transition-all">Cancel</button>
              <button onClick={handleSave} disabled={!form.name.trim()}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black text-xs font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-40">
                <Save size={14} /> {editingPartner ? 'Update' : 'Add'} Partner
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((partner: any) => (
          <motion.div key={partner.id} layout
            className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-4 hover:border-white/20 transition-all duration-200 group relative">
            <div className="h-16 flex items-center justify-center mb-3">
              <img src={partner.logo_url} alt={partner.name}
                className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <p className="text-xs font-medium text-white/60 text-center truncate">{partner.name}</p>
            {partner.id && (
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(partner)}
                  className="w-7 h-7 rounded-lg bg-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.15] transition-all">
                  <Edit2 size={11} />
                </button>
                <button onClick={() => handleDelete(partner)}
                  className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all">
                  <Trash2 size={11} />
                </button>
              </div>
            )}
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <Globe size={32} className="mx-auto mb-3 text-white/20" />
            <p className="text-sm text-white/40">No partners yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPartners;
