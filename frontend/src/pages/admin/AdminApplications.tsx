import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Inbox, Search, CheckCircle2, XCircle, Clock, ExternalLink } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const statusColors: Record<string, string> = {
  'Pending': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Reviewed': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Rejected': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Hired': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export default function AdminApplications() {
  const { applications, updateApplication, deleteApplication } = useSite();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = applications.filter((app: any) => {
    const ms = app.name?.toLowerCase().includes(search.toLowerCase()) || 
               app.role?.toLowerCase().includes(search.toLowerCase()) || 
               app.email?.toLowerCase().includes(search.toLowerCase());
    const mt = filterType === 'all' || app.type === filterType;
    const msStatus = filterStatus === 'all' || app.status === filterStatus;
    return ms && mt && msStatus;
  }).sort((a: any, b: any) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

  const updateStatus = async (id: string, newStatus: string) => {
    await updateApplication(id, { status: newStatus });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5A800]/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Applications</h1>
            <p className="text-xs text-white/40 mt-1">{applications.length} total applications</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input 
            value={search} onChange={e => setSearch(e.target.value)} 
            placeholder="Search by name, role, or email..."
            className="w-full h-10 pl-10 pr-4 bg-[#0D1220] border border-white/[0.08] rounded-lg text-sm text-white/70 placeholder:text-white/25 focus:outline-none focus:border-[#F5A800]/50 transition-colors" 
          />
        </div>
        <select 
          value={filterType} onChange={e => setFilterType(e.target.value)}
          className="h-10 px-4 bg-[#0D1220] border border-white/[0.08] rounded-lg text-sm text-white/60 focus:outline-none focus:border-[#F5A800]/50 transition-colors"
        >
          <option value="all" className="bg-[#0D1220]">All Types</option>
          <option value="job" className="bg-[#0D1220]">Jobs</option>
          <option value="internship" className="bg-[#0D1220]">Internships</option>
        </select>
        <select 
          value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="h-10 px-4 bg-[#0D1220] border border-white/[0.08] rounded-lg text-sm text-white/60 focus:outline-none focus:border-[#F5A800]/50 transition-colors"
        >
          <option value="all" className="bg-[#0D1220]">All Status</option>
          <option value="Pending" className="bg-[#0D1220]">Pending</option>
          <option value="Reviewed" className="bg-[#0D1220]">Reviewed</option>
          <option value="Hired" className="bg-[#0D1220]">Hired</option>
          <option value="Rejected" className="bg-[#0D1220]">Rejected</option>
        </select>
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? filtered.map((app: any) => (
          <div key={app.id} className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5 hover:border-white/20 transition-colors">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{app.name}</h3>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${app.type === 'job' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                    {app.type === 'job' ? 'Career' : 'Internship'}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${statusColors[app.status || 'Pending']}`}>
                    {app.status || 'Pending'}
                  </span>
                </div>
                
                <div className="text-sm font-semibold text-[#F5A800] mb-3">Role: {app.role}</div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-4 text-xs">
                  <div><span className="text-white/40">Email:</span> <a href={`mailto:${app.email}`} className="text-white hover:text-[#F5A800]">{app.email}</a></div>
                  <div><span className="text-white/40">Phone:</span> <span className="text-white">{app.phone || 'N/A'}</span></div>
                  <div>
                    <span className="text-white/40">Resume:</span> 
                    <a href={app.resume_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline ml-1 inline-flex items-center gap-1">
                      View Resume <ExternalLink size={10} />
                    </a>
                  </div>
                  <div>
                    <span className="text-white/40">Portfolio:</span> 
                    {app.portfolio_url ? (
                      <a href={app.portfolio_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline ml-1 inline-flex items-center gap-1">
                        View Portfolio <ExternalLink size={10} />
                      </a>
                    ) : <span className="text-white/30 ml-1">N/A</span>}
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-lg">
                  <p className="text-xs text-white/40 mb-1 font-semibold uppercase tracking-wider">Cover Letter</p>
                  <p className="text-sm text-white/80 whitespace-pre-wrap">{app.cover_letter}</p>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2 shrink-0">
                <select 
                  value={app.status || 'Pending'} 
                  onChange={e => updateStatus(app.id, e.target.value)}
                  className="h-9 px-3 bg-[#0D1220] border border-white/[0.08] rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button 
                  onClick={() => { if(window.confirm('Delete application?')) deleteApplication(app.id) }}
                  className="h-9 px-4 flex items-center justify-center bg-red-500/10 text-red-400 text-xs font-bold rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-16 text-center">
            <Inbox size={32} className="mx-auto mb-3 text-white/20" />
            <p className="text-sm text-white/50 font-medium">No applications found</p>
          </div>
        )}
      </div>
    </div>
  );
}
