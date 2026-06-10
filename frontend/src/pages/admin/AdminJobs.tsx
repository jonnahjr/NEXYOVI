import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Search, Edit2, Trash2, Save, X,
  MapPin, Building2, Briefcase, Eye, EyeOff
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  closed: 'bg-white/5 text-white/30 border-white/10',
  filled: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  draft: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const AdminJobs = () => {
  const { jobs, addJob, updateJob, deleteJob } = useSite();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', department: '', location: '', type: 'Full-time', status: 'active', description: '', requirements: '', salary_range: '', application_url: '' });

  const openNew = () => { setEditing(null); setForm({ title: '', department: '', location: '', type: 'Full-time', status: 'active', description: '', requirements: '', salary_range: '', application_url: '' }); setShowForm(true); };
  const openEdit = (job: any) => { setEditing(job); setForm({ title: job.title || '', department: job.department || '', location: job.location || '', type: job.type || 'Full-time', status: job.status || 'active', description: job.description || '', requirements: job.requirements || '', salary_range: job.salary_range || '', application_url: job.application_url || '' }); setShowForm(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.department) return;
    if (editing) await updateJob({ ...editing, ...form });
    else await addJob({ ...form, created_at: new Date().toISOString() });
    setShowForm(false); setEditing(null);
  };

  const handleDelete = async (id: string) => { if (window.confirm('Delete this job posting?')) await deleteJob(id); };
  const toggleStatus = async (job: any) => await updateJob({ ...job, status: job.status === 'active' ? 'closed' : 'active' });

  const filtered = jobs.filter((j: any) => {
    const ms = j.title?.toLowerCase().includes(search.toLowerCase()) || j.department?.toLowerCase().includes(search.toLowerCase());
    return ms && (statusFilter === 'all' || j.status === statusFilter);
  });

  const activeCount = jobs.filter((j: any) => j.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5A800]/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Jobs</h1>
            <p className="text-xs text-white/40 mt-1">{jobs.length} total · {activeCount} active</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#F5A800]/20 transition-all">
            <Plus size={16} /> New Job
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs..."
            className="w-full h-10 pl-10 pr-4 bg-[#0D1220] border border-white/[0.08] rounded-lg text-sm text-white/70 placeholder:text-white/25 focus:outline-none focus:border-[#F5A800]/50 transition-colors" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="h-10 px-4 bg-[#0D1220] border border-white/[0.08] rounded-lg text-sm text-white/60 focus:outline-none focus:border-[#F5A800]/50 transition-colors">
          <option value="all" className="bg-[#0D1220]">All Status</option>
          <option value="active" className="bg-[#0D1220]">Active</option>
          <option value="closed" className="bg-[#0D1220]">Closed</option>
          <option value="draft" className="bg-[#0D1220]">Draft</option>
        </select>
      </div>

      {showForm && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={() => setShowForm(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0D1220] border border-white/[0.08] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
              <form onSubmit={handleSave} className="p-6 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div>
                    <h2 className="text-lg font-bold text-white">{editing ? 'Edit Job' : 'New Job Posting'}</h2>
                    <p className="text-xs text-white/40 mt-0.5">Fill in the details below</p>
                  </div>
                  <button type="button" onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"><X size={16} /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Job Title *</label>
                    <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                      className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-colors"
                      placeholder="e.g. Senior Software Engineer" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Department</label>
                    <input required value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}
                      className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                      placeholder="Engineering" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Location</label>
                    <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                      className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                      placeholder="Addis Ababa" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Type</label>
                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                      className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors">
                      <option className="bg-[#0D1220]">Full-time</option>
                      <option className="bg-[#0D1220]">Part-time</option>
                      <option className="bg-[#0D1220]">Contract</option>
                      <option className="bg-[#0D1220]">Remote</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Status</label>
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                      className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors">
                      <option value="active" className="bg-[#0D1220]">Active</option>
                      <option value="draft" className="bg-[#0D1220]">Draft</option>
                      <option value="closed" className="bg-[#0D1220]">Closed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Salary Range</label>
                    <input value={form.salary_range} onChange={e => setForm({ ...form, salary_range: e.target.value })}
                      className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                      placeholder="$60k - $90k" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5">Requirements</label>
                  <textarea value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} rows={3}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors resize-none" />
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.06]">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-white/40 hover:text-white transition-colors">Cancel</button>
                  <button type="submit" className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#F5A800]/20 transition-all">
                    <Save size={15} /> {editing ? 'Save Changes' : 'Publish Job'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}

      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-5 py-3.5 text-xs font-bold text-white/30 uppercase tracking-wider">Job Title</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-white/30 uppercase tracking-wider">Department</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-white/30 uppercase tracking-wider">Location</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-white/30 uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-white/30 uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3.5 text-xs font-bold text-white/30 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.length > 0 ? filtered.map((job: any) => (
                <tr key={job.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4"><div className="text-sm font-semibold text-white">{job.title}</div>{job.salary_range && <div className="text-xs text-white/30 mt-0.5">{job.salary_range}</div>}</td>
                  <td className="px-5 py-4"><div className="flex items-center gap-1.5 text-sm text-white/60"><Building2 size={13} className="text-white/30" />{job.department}</div></td>
                  <td className="px-5 py-4"><div className="flex items-center gap-1.5 text-sm text-white/60"><MapPin size={13} className="text-white/30" />{job.location || '—'}</div></td>
                  <td className="px-5 py-4"><span className="text-sm text-white/60">{job.type || 'Full-time'}</span></td>
                  <td className="px-5 py-4"><span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-full border ${statusStyles[job.status] || 'bg-white/5 text-white/30 border-white/10'}`}>{job.status}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={() => toggleStatus(job)} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all">
                        {job.status === 'active' ? <EyeOff size={13} /> : <Eye size={13} />}
                      </button>
                      <button onClick={() => openEdit(job)} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-[#F5A800] hover:border-[#F5A800]/30 transition-all">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => handleDelete(job.id)} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-red-400 hover:border-red-400/30 transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="px-5 py-16 text-center">
                  <Briefcase size={32} className="mx-auto mb-3 text-white/20" />
                  <p className="text-sm text-white/50 font-medium">No jobs found</p>
                  <p className="text-xs text-white/30 mt-1">{search ? 'Try a different search' : 'Create your first job posting'}</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
