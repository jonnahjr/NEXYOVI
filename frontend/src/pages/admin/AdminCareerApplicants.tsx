import React, { useState } from 'react';
import { Briefcase, Search, ExternalLink, Trash2, CheckCircle2, XCircle, Clock, Eye, Mail, Phone, FileText, Inbox } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const statusColors: Record<string, string> = {
  'Pending':  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Reviewed': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Rejected': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Hired':    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const statusIcons: Record<string, any> = {
  'Pending': Clock,
  'Reviewed': Eye,
  'Hired': CheckCircle2,
  'Rejected': XCircle,
};

export default function AdminCareerApplicants() {
  const { applications, updateApplication, deleteApplication } = useSite();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const jobApps = applications.filter((app: any) => app.type === 'job');
  const uniqueRoles = Array.from(new Set(jobApps.map((a: any) => a.role).filter(Boolean)));

  const filtered = jobApps
    .filter((app: any) => {
      const ms = app.name?.toLowerCase().includes(search.toLowerCase()) ||
                 app.email?.toLowerCase().includes(search.toLowerCase()) ||
                 app.role?.toLowerCase().includes(search.toLowerCase());
      const matchRole = filterRole === 'all' || app.role === filterRole;
      return ms && matchRole && (filterStatus === 'all' || app.status === filterStatus);
    })
    .sort((a: any, b: any) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

  const counts = {
    total: jobApps.length,
    pending: jobApps.filter((a: any) => a.status === 'Pending').length,
    reviewed: jobApps.filter((a: any) => a.status === 'Reviewed').length,
    hired: jobApps.filter((a: any) => a.status === 'Hired').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#F5A800]/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-lg bg-[#F5A800]/10 flex items-center justify-center text-[#F5A800]">
                  <Briefcase size={16} />
                </div>
                <h1 className="text-xl font-bold text-white">Career Applicants</h1>
              </div>
              <p className="text-xs text-white/40 ml-11">All job applications submitted through the Careers page</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total', value: counts.total, color: 'text-white' },
              { label: 'Pending', value: counts.pending, color: 'text-amber-400' },
              { label: 'Reviewed', value: counts.reviewed, color: 'text-blue-400' },
              { label: 'Hired', value: counts.hired, color: 'text-emerald-400' },
            ].map(s => (
              <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 text-center">
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, or role..."
            className="w-full h-10 pl-10 pr-4 bg-[#0D1220] border border-white/[0.08] rounded-lg text-sm text-white/70 placeholder:text-white/25 focus:outline-none focus:border-[#F5A800]/50 transition-colors"
          />
        </div>
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)}
          className="h-10 px-4 bg-[#0D1220] border border-white/[0.08] rounded-lg text-sm text-white/60 focus:outline-none focus:border-[#F5A800]/50 transition-colors"
        >
          <option value="all" className="bg-[#0D1220]">All Roles</option>
          {uniqueRoles.map((r: any) => <option key={r} value={r} className="bg-[#0D1220]">{r}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="h-10 px-4 bg-[#0D1220] border border-white/[0.08] rounded-lg text-sm text-white/60 focus:outline-none focus:border-[#F5A800]/50 transition-colors"
        >
          <option value="all" className="bg-[#0D1220]">All Status</option>
          <option value="Pending" className="bg-[#0D1220]">Pending</option>
          <option value="Reviewed" className="bg-[#0D1220]">Reviewed</option>
          <option value="Hired" className="bg-[#0D1220]">Hired</option>
          <option value="Rejected" className="bg-[#0D1220]">Rejected</option>
        </select>
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-16 text-center">
            <Inbox size={32} className="mx-auto mb-3 text-white/20" />
            <p className="text-sm text-white/50 font-medium">No career applications found</p>
          </div>
        ) : filtered.map((app: any) => {
          const StatusIcon = statusIcons[app.status || 'Pending'] || Clock;
          const isExpanded = expanded === app.id;
          return (
            <div key={app.id} className="bg-[#0D1220] border border-white/[0.08] rounded-xl overflow-hidden hover:border-white/20 transition-colors">
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F5A800]/10 flex items-center justify-center text-[#F5A800] shrink-0 font-black text-lg">
                    {app.name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <h3 className="text-base font-bold text-white">{app.name}</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full border bg-[#F5A800]/10 text-[#F5A800] border-[#F5A800]/20">
                        {app.role}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border flex items-center gap-1 ${statusColors[app.status || 'Pending']}`}>
                        <StatusIcon size={9} /> {app.status || 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1"><Mail size={10} /> {app.email}</span>
                      {app.phone && <span className="flex items-center gap-1"><Phone size={10} /> {app.phone}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setExpanded(isExpanded ? null : app.id)}
                    className="h-9 px-4 bg-white/[0.04] border border-white/[0.08] text-white/60 text-xs font-bold rounded-lg hover:bg-white/[0.08] transition-colors"
                  >
                    {isExpanded ? 'Hide' : 'View Details'}
                  </button>
                  <select
                    value={app.status || 'Pending'}
                    onChange={e => updateApplication(app.id, { status: e.target.value })}
                    className="h-9 px-3 bg-[#0D1220] border border-white/[0.08] rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => { if (window.confirm('Delete application?')) deleteApplication(app.id); }}
                    className="h-9 w-9 flex items-center justify-center bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-white/[0.06] p-5 space-y-4 bg-white/[0.01]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {app.resume_url && (
                      <a href={app.resume_url} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-blue-400 hover:bg-white/[0.06] transition-colors font-medium"
                      >
                        <FileText size={14} /> View Resume / CV <ExternalLink size={12} className="ml-auto" />
                      </a>
                    )}
                    {app.portfolio_url && (
                      <a href={app.portfolio_url} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-blue-400 hover:bg-white/[0.06] transition-colors font-medium"
                      >
                        <ExternalLink size={14} /> View Portfolio / LinkedIn <ExternalLink size={12} className="ml-auto" />
                      </a>
                    )}
                  </div>
                  {app.cover_letter && (
                    <div className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-lg">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Cover Letter</p>
                      <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">{app.cover_letter}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
