import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Linkedin, User, UploadCloud } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { supabase } from '../../lib/supabase';

const AdminTeam = () => {
  const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useSite();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: '', role: '', bio: '', email: '', img: '', linkedin: '' });
  const [formImgError, setFormImgError] = useState(false);

  const openNew = () => { setEditing(null); setForm({ name: '', role: '', bio: '', email: '', img: '', linkedin: '' }); setFormImgError(false); setShowForm(true); };
  const openEdit = (m: any) => { setEditing(m); setForm({ name: m.name || '', role: m.role || '', bio: m.bio || '', email: m.email || '', img: m.img || m.image || '', linkedin: m.linkedin || '' }); setFormImgError(false); setShowForm(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role) return;
    // Strip email — it's for display only, not a DB column
    const { email, ...cleanForm } = form;
    if (editing) await updateTeamMember({ ...editing, ...cleanForm });
    else await addTeamMember({ ...cleanForm, id: Date.now().toString() });
    setShowForm(false); setEditing(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    try {
      const file = e.target.files[0];
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabase.storage.from('nexyovi_assets').upload(`team/${fileName}`, file);
      if (error) throw error;
      const { data } = supabase.storage.from('nexyovi_assets').getPublicUrl(`team/${fileName}`);
      setForm(f => ({ ...f, img: data.publicUrl }));
      setFormImgError(false);
    } catch (err: any) { alert(`Upload failed: ${err.message}`); }
  };

  const handleDelete = async (id: string) => { if (window.confirm('Delete this team member?')) await deleteTeamMember(id); };
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="space-y-6">
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Team Members</h1>
            <p className="text-xs text-white/40 mt-1">{team?.length || 0} members</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#F5A800]/20 transition-all">
            <Plus size={16} /> Add Member
          </button>
        </div>
      </div>

      {showForm && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={() => setShowForm(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0D1220] border border-white/[0.08] rounded-2xl shadow-2xl w-full max-w-lg">
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div>
                    <h2 className="text-lg font-bold text-white">{editing ? 'Edit Member' : 'Add Team Member'}</h2>
                    <p className="text-xs text-white/40 mt-0.5">Fill in the details below</p>
                  </div>
                  <button type="button" onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"><X size={16} /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Name *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-colors" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Role *</label>
                    <input required value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                      className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" placeholder="e.g. CTO" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">LinkedIn URL</label>
                    <input value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })}
                      className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" placeholder="https://linkedin.com/in/..." />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Bio</label>
                  <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={2}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Image</label>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      {(form.img && !formImgError) ? (
                        <>
                          <img src={form.img} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-white/10"
                            onError={() => setFormImgError(true)} />
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-[7px] font-bold">✓</span>
                          </span>
                        </>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/30 text-xs font-bold">{getInitials(form.name || '?')}</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input value={form.img} onChange={e => setForm({ ...form, img: e.target.value })}
                        className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" placeholder="https://..." />
                    </div>
                  </div>
                  <label className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-dashed border-white/10 text-xs font-semibold cursor-pointer bg-white/[0.03] text-white/60 hover:bg-white/[0.06] w-fit transition-all hover:border-white/20">
                    <UploadCloud size={14} /> {form.img ? 'Replace Photo' : 'Upload from Computer'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.06]">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-white/40 hover:text-white transition-colors">Cancel</button>
                  <button type="submit" className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#F5A800]/20 transition-all">
                    <Save size={15} /> {editing ? 'Save Changes' : 'Add Member'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {team?.map(member => (
          <div key={member.id} className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5 hover:border-white/20 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-start gap-4 mb-4">
              <div className="relative shrink-0">
                {(member.img || member.image) ? (
                  <>
                    <img src={member.img || member.image} alt={member.name} className="w-14 h-14 rounded-xl object-cover border border-white/10" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-[8px] font-bold">✓</span>
                    </span>
                  </>
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 text-base font-bold">{getInitials(member.name)}</div>
                )}
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <h3 className="text-sm font-bold text-white truncate">{member.name}</h3>
                <p className="text-xs text-[#F5A800] font-semibold mt-0.5">{member.role}</p>
                {member.email && <p className="text-xs text-white/30 mt-0.5 truncate">{member.email}</p>}
                {(member.img || member.image) ? (
                  <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Photo uploaded
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-semibold text-white/30 bg-white/[0.04] px-1.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    No photo
                  </span>
                )}
              </div>
            </div>
            {member.bio && <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">{member.bio}</p>}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-1">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                    className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all">
                    <Linkedin size={13} />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(member)} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-[#F5A800] hover:border-[#F5A800]/30 transition-all"><Edit2 size={13} /></button>
                <button onClick={() => handleDelete(member.id)} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-red-400 hover:border-red-400/30 transition-all"><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
        {(!team || team.length === 0) && (
          <div className="md:col-span-2 xl:col-span-3 py-16 text-center bg-[#0D1220] border border-dashed border-white/10 rounded-xl">
            <User size={32} className="mx-auto mb-3 text-white/20" />
            <p className="text-sm text-white/50 font-medium">No team members yet</p>
            <button onClick={openNew} className="mt-3 px-4 py-2 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black text-xs font-bold rounded-lg transition-all"><Plus size={14} className="inline mr-1" />Add First Member</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTeam;
