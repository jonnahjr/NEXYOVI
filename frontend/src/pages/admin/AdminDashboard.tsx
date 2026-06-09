import React from 'react';
import { 
  Users, Briefcase, MessageSquare, 
  Star, ArrowUpRight, ShieldCheck,
  BrainCircuit, Network, Zap,
  LayoutTemplate, Settings,
  ChevronRight, Rocket,
  ArrowRight, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';

const StatCard = ({ label, value, icon: Icon, color, to, trend }: any) => (
  <Link to={to}>
    <div className="relative bg-gradient-to-br from-[#050816]/90 to-[#02040a]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-7 hover:border-[#F5A800]/40 transition-all duration-300 group cursor-pointer shadow-2xl overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent via-transparent to-[#F5A800]/5 pointer-events-none" />
      
      <div className="relative flex items-start justify-between mb-5">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-lg shadow-current/20`}>
          <Icon size={24} />
        </div>
        <ArrowUpRight size={20} className="text-white/15 group-hover:text-[#F5A800] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
      </div>
      
      <div className="text-4xl font-black text-white mb-2 tracking-tight relative">
        {value}
      </div>
      <div className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
        {label}
      </div>
      
      {trend && (
        <div className="flex items-center gap-2 mt-4 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-xl w-fit border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {trend}
        </div>
      )}
    </div>
  </Link>
);

const QuickAction = ({ icon: Icon, label, desc, to, color }: any) => (
  <Link to={to}>
    <div className="group flex items-center gap-5 p-6 rounded-3xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200">
      <div className={`w-13 h-13 rounded-2xl flex items-center justify-center ${color} shrink-0 shadow-lg shadow-current/10`}>
        <Icon size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-white">{label}</div>
        <div className="text-xs text-white/40 mt-1">{desc}</div>
      </div>
      <ChevronRight size={18} className="text-white/15 group-hover:text-[#F5A800] group-hover:translate-x-1 transition-all duration-200" />
    </div>
  </Link>
);

const SystemStatus = ({ name, load, icon: Icon, color, status }: any) => (
  <div className="flex items-center gap-5 p-5 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} shrink-0`}>
      <Icon size={20} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-white">{name}</span>
        <span className={`text-[11px] font-black ${load > 80 ? 'text-amber-400' : 'text-emerald-400'}`}>{load}% Load</span>
      </div>
      <div className="w-full h-2 bg-white/[0.08] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${load > 80 ? 'bg-amber-400' : load > 60 ? 'bg-cyan-400' : 'bg-emerald-400'}`}
          style={{ width: `${load}%` }}
        />
      </div>
    </div>
    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl ${load > 80 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
      {status}
    </span>
  </div>
);

const AdminDashboard = () => {
  const { jobs, team, testimonials, messages } = useSite();
  const unread = messages.filter((m: any) => m.status === 'unread').length;

  const systems = [
    { name: 'AI Engine', load: 24, icon: BrainCircuit, color: 'text-cyan-400 bg-cyan-500/10', status: 'Healthy' },
    { name: 'Global Network', load: 41, icon: Network, color: 'text-violet-400 bg-violet-500/10', status: 'Optimal' },
    { name: 'Security Shield', load: 12, icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-500/10', status: 'Shielded' },
    { name: 'Cloud Registry', load: 72, icon: Zap, color: 'text-[#F5A800] bg-[#F5A800]/10', status: 'Active' }
  ];

  const quickActions = [
    { label: 'Edit Site Content', path: '/admin/content', icon: LayoutTemplate, desc: 'Hero, stats, footer, portfolio', color: 'text-[#F5A800] bg-[#F5A800]/10' },
    { label: 'Post New Job', path: '/admin/jobs', icon: Briefcase, desc: 'Open a new position', color: 'text-cyan-400 bg-cyan-500/10' },
    { label: 'Manage Team', path: '/admin/team', icon: Users, desc: 'Add or edit team members', color: 'text-emerald-400 bg-emerald-500/10' },
    { label: 'Add Testimonial', path: '/admin/testimonials', icon: Star, desc: 'Client reviews', color: 'text-violet-400 bg-violet-500/10' },
    { label: 'View Messages', path: '/admin/messages', icon: MessageSquare, desc: `${unread || 0} unread inquiries`, color: 'text-pink-400 bg-pink-500/10' },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings, desc: 'Logo, links, company info', color: 'text-slate-300 bg-slate-500/10' }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F5A800]/15 via-[#050816]/95 to-[#02040a] border border-[#F5A800]/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-br from-transparent via-[#F5A800]/5 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#F5A800]/20 blur-[100px] pointer-events-none" />
        
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/30" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/60">System Online</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
              Welcome back, Admin
            </h1>
            <p className="text-white/50 text-sm md:text-base max-w-2xl leading-relaxed">
              Manage your Nexyovi site with complete control — edit content, manage team, and respond to inquiries.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-2">Today</div>
              <div className="text-xl font-black text-white">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </div>
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#F5A800] to-[#ffb700] flex items-center justify-center shadow-2xl shadow-[#F5A800]/30">
              <Rocket size={36} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Open Positions" 
          value={jobs.length} 
          trend="Live on site" 
          icon={Briefcase} 
          color="text-[#F5A800] bg-[#F5A800]/10" 
          to="/admin/jobs" 
        />
        <StatCard 
          label="Team Members" 
          value={team.length} 
          trend="All Active" 
          icon={Users} 
          color="text-cyan-400 bg-cyan-500/10" 
          to="/admin/team" 
        />
        <StatCard 
          label="Testimonials" 
          value={testimonials.length} 
          trend="Verified" 
          icon={Star} 
          color="text-emerald-400 bg-emerald-500/10" 
          to="/admin/testimonials" 
        />
        <StatCard 
          label="Messages" 
          value={messages.length} 
          trend={`${unread} unread`} 
          icon={MessageSquare} 
          color="text-violet-400 bg-violet-500/10" 
          to="/admin/messages" 
        />

        <div className="lg:col-span-4 -mt-2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Quick Actions */}
        <div className="xl:col-span-3 bg-gradient-to-br from-[#050816]/90 to-[#02040a]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl">
          <div className="px-8 py-6 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] text-white/70">Quick Actions</h3>
              <p className="text-xs text-white/40 mt-1.5">Navigate to key areas instantly</p>
            </div>
            <LayoutTemplate size={22} className="text-[#F5A800]" />
          </div>
          <div className="p-6 space-y-3">
            {quickActions.map((action, i) => (
              <QuickAction key={i} {...action} />
            ))}
          </div>
        </div>

        {/* System Status & Recent Messages */}
        <div className="xl:col-span-2 space-y-8">
          {/* System Health */}
          <div className="bg-gradient-to-br from-[#050816]/90 to-[#02040a]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl">
            <div className="px-8 py-6 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/70">System Health</h3>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 uppercase tracking-[0.15em]">All Systems Go</span>
            </div>
            <div className="p-6 space-y-4">
              {systems.map((s, i) => (
                <SystemStatus key={i} {...s} />
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-gradient-to-br from-[#050816]/90 to-[#02040a]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl">
            <div className="px-8 py-6 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/70">Recent Inquiries</h3>
                <p className="text-xs text-white/40 mt-1.5">{messages.length} total</p>
              </div>
              <Link to="/admin/messages" className="text-[11px] font-bold text-[#F5A800] hover:text-[#ffb700] transition-colors uppercase tracking-[0.2em] flex items-center gap-1">
                View All <ArrowRight size={12} />
              </Link>
            </div>
            {messages.length > 0 ? (
              <div className="divide-y divide-white/[0.04]">
                {messages.slice(0, 4).map((m: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 px-8 py-5 hover:bg-white/[0.03] transition-colors cursor-pointer"
                  >
                    <div className={`w-2.5 h-11 rounded-full shrink-0 ${m.status === 'unread' ? 'bg-[#F5A800]' : 'bg-white/15'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white truncate">{m.name}</div>
                      <div className="text-xs text-white/40 truncate mt-1">{m.message}</div>
                    </div>
                    <div className="text-xs text-white/35 shrink-0 flex items-center gap-1.5">
                      <Clock size={13} />
                      {m.created_at ? new Date(m.created_at).toLocaleDateString() : 'Now'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-8 py-14 text-center">
                <MessageSquare size={36} className="mx-auto mb-4 text-white/15" />
                <p className="text-sm text-white/40">No messages yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
