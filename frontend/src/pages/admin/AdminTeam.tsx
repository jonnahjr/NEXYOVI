import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
 Plus, Search, Edit2, Trash2, Users, 
 Save, Image as ImageIcon, ArrowLeft, UploadCloud
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { supabase } from '../../lib/supabase';

const getInitials = (name: string, fallback?: string): string => {
 if (fallback) return fallback;
 return name
  .split(' ')
  .map(w => w[0])
  .join('')
  .toUpperCase()
  .slice(0, 2);
};

const fallbackColors = [
 '#8b5cf6', '#10b981', '#3b82f6', '#ec4899',
 '#06b6d4', '#f59e0b', '#F5A800', '#ef4444',
];

const getColor = (name: string, fallback?: string): string => {
 if (fallback) return fallback;
 let hash = 0;
 for (let i = 0; i < name.length; i++) {
  hash = name.charCodeAt(i) + ((hash << 5) - hash);
 }
 return fallbackColors[Math.abs(hash) % fallbackColors.length];
};

const MemberAvatar = ({ member, size = 40 }: { member: any; size?: number }) => {
 if (member.img) {
  return (
   <img
    src={member.img}
    alt={member.name}
    className="w-full h-full object-cover"
   />
  );
 }
 const initials = getInitials(member.name, member.initials);
 const color = getColor(member.name, member.color);
 return (
  <div
   className="w-full h-full flex items-center justify-center text-white font-bold"
   style={{ backgroundColor: color }}
  >
   {initials}
  </div>
 );
};

const AdminTeam = () => {
 const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useSite();
 const [isEditing, setIsEditing] = useState(false);
 const [editing, setEditing] = useState<any>(null);
 const [search, setSearch] = useState('');
 const [isUploading, setIsUploading] = useState(false);

 const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || e.target.files.length === 0) return;
  const file = e.target.files[0];
  setIsUploading(true);
  try {
   const fileExt = file.name.split('.').pop();
   const fileName = `team_${Date.now()}.${fileExt}`;
   const { error: uploadError } = await supabase.storage.from('nexyovi_assets').upload(`team/${fileName}`, file);
   if (uploadError) throw uploadError;
   const { data } = supabase.storage.from('nexyovi_assets').getPublicUrl(`team/${fileName}`);
   setForm(prev => ({ ...prev, img: data.publicUrl }));
  } catch (err) {
   console.error('Upload error:', err);
   alert('Photo upload failed. Check console for details.');
  } finally {
   setIsUploading(false);
  }
 };

 const [form, setForm] = useState({
  name: '',
  role: '',
  bio: '',
  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  initials: '',
  color: '',
 });

 const open = (member: any = null) => {
  if (member) {
   setEditing(member);
   setForm({
    name: member.name,
    role: member.role,
    bio: member.bio,
    img: member.img || '',
    initials: member.initials || '',
    color: member.color || '',
   });
  } else {
   setEditing(null);
   setForm({
    name: '',
    role: '',
    bio: '',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    initials: '',
    color: '',
   });
  }
  setIsEditing(true);
 };

 const save = (e: React.FormEvent) => {
  e.preventDefault();
  const payload = { ...form };
  if (!payload.img) delete payload.img;
  if (!payload.initials) delete payload.initials;
  if (!payload.color) delete payload.color;
  if (editing) {
   updateTeamMember({ ...editing, ...payload });
  } else {
   addTeamMember({ ...payload });
  }
  setIsEditing(false);
 };

 const filtered = team.filter(m => 
  m.name.toLowerCase().includes(search.toLowerCase()) ||
  m.role.toLowerCase().includes(search.toLowerCase())
 );

 if (isEditing) {
  return (
   <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 max-w-5xl mx-auto">
    <div className="flex items-center gap-4">
     <button onClick={() => setIsEditing(false)} className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/40 hover:bg-white/[0.08] hover:text-white transition-all">
      <ArrowLeft size={18} />
     </button>
     <div>
      <h1 className="text-2xl font-bold text-white tracking-tight">{editing ? 'Edit Member' : 'Recruit New Specialist'}</h1>
      <p className="text-sm text-white/40 mt-0.5">Personnel Identity Management</p>
     </div>
    </div>

    <div className="bg-[#0D1220] border border-white/[0.08] rounded-2xl overflow-hidden ">
     <form onSubmit={save} className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-10">
       <div className="w-full md:w-48 space-y-3 shrink-0">
        <label className="text-xs font-bold text-white/30 uppercase tracking-widest block md:text-center">Identity Avatar</label>
        <div className="aspect-[4/5] bg-[#070B14] rounded-2xl border border-white/10 overflow-hidden relative group flex items-center justify-center">
         {form.img ? (
          <img src={form.img} alt="Preview" className="w-full h-full object-cover" />
         ) : (
          <div
           className="w-full h-full flex items-center justify-center text-white font-bold text-2xl"
           style={{ backgroundColor: form.color || getColor(form.name) }}
          >
           {getInitials(form.name, form.initials)}
          </div>
         )}
         <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ImageIcon size={24} className="text-white/40" />
         </div>
        </div>
        <label className={`w-full h-10 flex items-center justify-center gap-2 rounded-xl border border-white/10 text-xs font-bold cursor-pointer transition-all ${isUploading ? 'bg-white/10 text-white/40' : 'bg-white/5 text-white hover:bg-white/10'}`}>
         <UploadCloud size={14} />{isUploading ? 'Uploading...' : 'Upload Photo'}
         <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={isUploading} />
        </label>
        <input 
         value={form.img} 
         onChange={e => setForm({...form, img: e.target.value})} 
         placeholder="Or paste image URL"
         className="w-full h-9 px-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-xs text-white outline-none focus:border-[#F5A800]/50 transition-all font-mono" 
        />
       </div>

       <div className="flex-1 space-y-6 min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="space-y-2">
          <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Full Legal Name</label>
          <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Alan Turing"
          className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all font-semibold" />
         </div>
         <div className="space-y-2">
          <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Professional Role</label>
          <input required value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="e.g. Lead Cryptographer"
          className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all font-semibold" />
         </div>
         <div className="space-y-2">
          <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Initials (overrides auto)</label>
          <input value={form.initials} onChange={e => setForm({...form, initials: e.target.value})} placeholder="e.g. AT"
          className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all font-semibold" />
         </div>
         <div className="space-y-2">
          <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Color (overrides auto)</label>
          <div className="flex gap-2">
           <input value={form.color} onChange={e => setForm({...form, color: e.target.value})} placeholder="e.g. #8b5cf6"
           className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all font-semibold" />
           {form.color && (
            <div className="w-11 h-11 rounded-xl shrink-0 border border-white/[0.06]" style={{ backgroundColor: form.color }} />
           )}
          </div>
         </div>
        </div>

        <div className="space-y-2">
         <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Personnel Biography</label>
         <textarea required value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} placeholder="Technical background and mission statement..." rows={8}
         className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 resize-none transition-all font-medium leading-relaxed" />
        </div>
       </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/[0.06]">
       <button type="button" onClick={() => setIsEditing(false)} className="h-10 px-6 text-sm font-bold text-white/40 hover:text-white transition-colors">Cancel</button>
       <button type="submit" className="h-10 px-6 bg-[#F5A800] text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-blue-600 flex items-center gap-2 transition-all /20">
        <Save size={16} /> {editing ? 'Update Profile' : 'Recruit Member'}
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
     <h1 className="text-2xl font-bold text-white tracking-tight">Team Management</h1>
     <p className="text-sm text-white/40 mt-0.5">{team.length} specialists active</p>
    </div>
    <button onClick={() => open()} className="flex items-center gap-1.5 h-10 px-4 bg-[#F5A800] text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all /20">
     <Plus size={16} /> Add Member
    </button>
   </div>

   {/* Search */}
   <div className="relative">
    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or role..." className="w-full h-12 pl-11 pr-4 bg-[#0D1220] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all " />
   </div>

   {/* Team Grid/Table */}
   <div className="bg-[#0D1220] border border-white/[0.08] rounded-2xl overflow-hidden ">
    <div className="grid grid-cols-12 px-6 py-3 border-b border-white/[0.06] text-xs font-bold text-white/30 uppercase tracking-widest">
     <div className="col-span-5">Member</div>
     <div className="col-span-4">Role</div>
     <div className="col-span-2">Status</div>
     <div className="col-span-1 text-right">Actions</div>
    </div>
    {filtered.length > 0 ? filtered.map(member => (
     <motion.div key={member.id} layout className="grid grid-cols-12 items-center px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group last:border-0">
      <div className="col-span-5 flex items-center gap-4">
       <div className="w-10 h-10 rounded-xl bg-[#070B14] border border-white/10 overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
        <MemberAvatar member={member} />
       </div>
       <div className="min-w-0 pr-4">
        <div className="text-sm font-bold text-white truncate">{member.name}</div>
        <div className="text-xs text-white/40 truncate mt-0.5">{member.bio?.substring(0, 60)}...</div>
       </div>
      </div>
      <div className="col-span-4 text-sm font-medium text-white/60 truncate pr-4">{member.role}</div>
      <div className="col-span-2 flex items-center gap-2">
       <span className="w-2 h-2 rounded-full bg-emerald-500 " />
       <span className="text-xs font-bold text-white/40 uppercase tracking-wider">Active</span>
      </div>
      <div className="col-span-1 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
       <button onClick={() => open(member)} className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-[#F5A800]/10 hover:border-[#F5A800]/20 hover:text-[#F5A800] text-white/40 flex items-center justify-center transition-all">
        <Edit2 size={14} />
       </button>
       <button onClick={() => deleteTeamMember(member.id)} className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 text-white/40 flex items-center justify-center transition-all">
        <Trash2 size={14} />
       </button>
      </div>
     </motion.div>
    )) : (
     <div className="py-16 text-center">
      <Users size={32} className="mx-auto mb-3 text-white/10" />
      <div className="text-sm text-white/40">{search ? 'No members match your search.' : 'No team members yet.'}</div>
     </div>
    )}
   </div>
  </div>
 );
};

export default AdminTeam;
