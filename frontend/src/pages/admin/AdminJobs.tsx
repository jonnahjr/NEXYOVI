import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, MapPin, Briefcase, X, Save, ArrowLeft } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const typeColor: Record<string, string> = {
 'Full-time': 'text-emerald-400 bg-emerald-500/10',
 'Contract': 'text-[#F5A800] bg-[#F5A800]/10',
 'Part-time': 'text-cyan-400 bg-cyan-500/10',
 'Internship': 'text-violet-400 bg-violet-500/10',
};

const AdminJobs = () => {
 const { jobs, addJob, updateJob, deleteJob } = useSite();
 const [isEditing, setIsEditing] = useState(false);
 const [editing, setEditing] = useState<any>(null);
 const [search, setSearch] = useState('');
 const [form, setForm] = useState({ title: '', department: 'Engineering', location: 'Addis Ababa', type: 'Full-time', description: '', responsibilities: [''], requirements: [''] });

 const open = (job: any = null) => {
 if (job) { setEditing(job); setForm({ title: job.title, department: job.department || job.dept, location: job.location, type: job.type, description: job.description || job.desc, responsibilities: job.responsibilities || [''], requirements: job.requirements || [''] }); }
 else { setEditing(null); setForm({ title: '', department: 'Engineering', location: 'Addis Ababa', type: 'Full-time', description: '', responsibilities: [''], requirements: [''] }); }
 setIsEditing(true);
 };

 const save = (e: React.FormEvent) => {
 e.preventDefault();
 const payload = { ...form, dept: form.department, desc: form.description };
 if (editing) updateJob({ ...editing, ...payload });
 else addJob(payload);
 setIsEditing(false);
 };

 const filtered = jobs.filter(j => (j.title + (j.department || j.dept || '')).toLowerCase().includes(search.toLowerCase()));

 const editList = (field: 'responsibilities' | 'requirements', i: number, v: string) => {
 const a = [...form[field]]; a[i] = v; setForm(p => ({ ...p, [field]: a }));
 };

 if (isEditing) {
 return (
 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 max-w-5xl mx-auto">
 <div className="flex items-center gap-4">
 <button onClick={() => setIsEditing(false)} className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/40 hover:bg-white/[0.08] hover:text-white transition-all">
 <ArrowLeft size={18} />
 </button>
 <div>
 <h1 className="text-2xl font-bold text-white tracking-tight">{editing ? 'Edit Position' : 'New Position Registry'}</h1>
 <p className="text-sm text-white/40 mt-0.5">Recruitment Pipeline Management</p>
 </div>
 </div>

 <div className="bg-[#0D1220] border border-white/[0.08] rounded-2xl overflow-hidden ">
 <form onSubmit={save} className="p-6 md:p-8 space-y-8">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="space-y-2">
 <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Job Title</label>
 <input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Senior Software Architect"
 className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all font-semibold" />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Department</label>
 <select value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))}
 className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 appearance-none transition-all font-semibold">
 {['Engineering', 'Security', 'Data & AI', 'Design', 'Strategy', 'Marketing'].map(d => <option key={d} value={d} className="bg-[#0D1220]">{d}</option>)}
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Type</label>
 <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
 className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 appearance-none transition-all font-semibold">
 {['Full-time', 'Contract', 'Part-time', 'Internship'].map(t => <option key={t} value={t} className="bg-[#0D1220]">{t}</option>)}
 </select>
 </div>
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Location</label>
 <input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Addis Ababa / Remote"
 className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 transition-all font-semibold" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Role Description</label>
 <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Describe the mission and impact of this role..." rows={6}
 className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 transition-all resize-none font-medium leading-relaxed" />
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 {(['responsibilities', 'requirements'] as const).map(field => (
 <div key={field} className="space-y-4">
 <div className="flex items-center justify-between px-1">
 <label className="text-xs font-bold text-white/30 uppercase tracking-widest">{field}</label>
 <button type="button" onClick={() => setForm(p => ({ ...p, [field]: [...p[field], ''] }))} className="text-xs text-[#F5A800] hover:text-blue-400 font-bold uppercase tracking-wider">+ Add Entry</button>
 </div>
 <div className="space-y-2">
 {form[field].map((v, i) => (
 <div key={i} className="flex gap-2">
 <input value={v} onChange={e => editList(field, i, e.target.value)} className="flex-1 h-10 px-3 bg-white/[0.02] border border-white/[0.04] rounded-lg text-sm text-white outline-none focus:border-[#F5A800]/40 transition-all" />
 <button type="button" onClick={() => setForm(p => ({ ...p, [field]: p[field].filter((_, j) => j !== i) }))} className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
 <X size={16} />
 </button>
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>

 <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/[0.06]">
 <button type="button" onClick={() => setIsEditing(false)} className="h-10 px-6 text-sm font-bold text-white/40 hover:text-white transition-colors">Cancel</button>
 <button type="submit" className="h-10 px-6 bg-[#F5A800] text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-blue-600 flex items-center gap-2 transition-all /20">
 <Save size={16} /> {editing ? 'Save Changes' : 'Create Position'}
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
 <h1 className="text-2xl font-bold text-white tracking-tight">Job Listings</h1>
 <p className="text-sm text-white/40 mt-0.5">{jobs.length} open positions</p>
 </div>
 <button onClick={() => open()} className="flex items-center gap-1.5 h-10 px-4 bg-[#F5A800] text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all /20">
 <Plus size={16} /> Add Position
 </button>
 </div>

 {/* Search */}
 <div className="relative">
 <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
 <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title or department..." className="w-full h-12 pl-11 pr-4 bg-[#0D1220] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all " />
 </div>

 {/* Table */}
 <div className="bg-[#0D1220] border border-white/[0.08] rounded-2xl overflow-hidden ">
 <div className="grid grid-cols-12 px-6 py-3 border-b border-white/[0.06] text-xs font-bold text-white/30 uppercase tracking-widest">
 <div className="col-span-5">Position</div>
 <div className="col-span-2">Department</div>
 <div className="col-span-2">Location</div>
 <div className="col-span-2">Type</div>
 <div className="col-span-1 text-right">Actions</div>
 </div>
 {filtered.length > 0 ? filtered.map(job => (
 <motion.div key={job.id} layout className="grid grid-cols-12 items-center px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group last:border-0">
 <div className="col-span-5 flex items-center gap-4">
 <div className="w-10 h-10 rounded-xl bg-[#F5A800]/10 flex items-center justify-center text-[#F5A800] shrink-0">
 <Briefcase size={18} />
 </div>
 <div className="min-w-0 pr-4">
 <div className="text-sm font-bold text-white truncate">{job.title}</div>
 <div className="text-xs text-white/40 truncate mt-0.5">{(job.description || job.desc || '').substring(0, 80)}...</div>
 </div>
 </div>
 <div className="col-span-2 text-sm font-medium text-white/60">{job.department || job.dept}</div>
 <div className="col-span-2 flex items-center gap-1.5 text-sm font-medium text-white/60">
 <MapPin size={14} className="text-white/20 shrink-0" />
 <span className="truncate">{job.location}</span>
 </div>
 <div className="col-span-2">
 <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${typeColor[job.type] || 'text-white/50 bg-white/5'}`}>{job.type}</span>
 </div>
 <div className="col-span-1 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
 <button onClick={() => open(job)} className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-[#F5A800]/10 hover:border-[#F5A800]/20 hover:text-[#F5A800] text-white/40 flex items-center justify-center transition-all">
 <Edit2 size={14} />
 </button>
 <button onClick={() => deleteJob(job.id)} className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 text-white/40 flex items-center justify-center transition-all">
 <Trash2 size={14} />
 </button>
 </div>
 </motion.div>
 )) : (
 <div className="py-16 text-center">
 <Briefcase size={32} className="mx-auto mb-3 text-white/10" />
 <div className="text-sm text-white/40">{search ? 'No jobs match your search.' : 'No job listings yet.'}</div>
 </div>
 )}
 </div>
 </div>
 );
};

export default AdminJobs;
