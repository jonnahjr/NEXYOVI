import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Briefcase, MessageSquare,
  Star, ArrowUpRight, ShieldCheck,
  BrainCircuit, Network, Zap, Clock,
  LayoutTemplate, Settings, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';

const StatCard = ({ label, value, icon: Icon, color, to, trend }: any) => (
  <Link to={to}>
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-[#0D1220] border border-white/[0.08] rounded-2xl p-5 hover:border-white/20 transition-all group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
        <ArrowUpRight size={16} className="text-white/20 group-hover:text-[#F5A800] transition-colors" />
      </div>
      <div className="text-3xl font-black text-white mb-1">{value}</div>
      <div className="text-xs font-bold text-white/40 uppercase tracking-widest">{label}</div>
      {trend && (
        <div className="flex items-center gap-1 mt-2 text-xs font-bold text-emerald-400">
          <TrendingUp size={12} />{trend}
        </div>
      )}
    </motion.div>
  </Link>
);

const AdminDashboard = () => {
  const { jobs, team, testimonials, messages } = useSite();
  const unread = messages.filter((m: any) => m.status === 'unread').length;

  const systems = [
    { name: 'AI Engine', load: 24, icon: BrainCircuit, color: 'text-cyan-400 bg-cyan-500/10', status: 'Healthy' },
    { name: 'Global Network', load: 41, icon: Network, color: 'text-violet-400 bg-violet-500/10', status: 'Optimal' },
    { name: 'Cyber Shield', load: 12, icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-500/10', status: 'Shielded' },
    { name: 'Cloud Registry', load: 89, icon: Zap, color: 'text-amber-400 bg-amber-500/10', status: 'High Load' },
  ];

  const quickLinks = [
    { label: 'Edit Site Content', path: '/admin/content', icon: LayoutTemplate, desc: 'Hero, stats, footer' },
    { label: 'Post New Job', path: '/admin/jobs', icon: Briefcase, desc: 'Open a new position' },
    { label: 'Add Team Member', path: '/admin/team', icon: Users, desc: 'Manage your team' },
    { label: 'Add Testimonial', path: '/admin/testimonials', icon: Star, desc: 'Client reviews' },
    { label: 'View Messages', path: '/admin/messages', icon: MessageSquare, desc: `${unread || 0} unread` },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings, desc: 'Logo, links, info' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative bg-[#0D1220] border border-white/[0.08] rounded-2xl p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5A800]/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[300px] h-full bg-[#F5A800]/5 blur-[80px] pointer-events-none" />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-[#F5A800] uppercase tracking-widest mb-2">Welcome back</p>
            <h1 className="text-2xl font-black text-white tracking-tight">Yonas Bogale</h1>
            <p className="text-sm text-white/40 mt-1">Nexyovi Admin Control Panel</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">All Systems Online</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Positions" value={jobs.length} trend="Live on site" icon={Briefcase} color="text-[#F5A800] bg-[#F5A800]/10" to="/admin/jobs" />
        <StatCard label="Team Members" value={team.length} trend="Active staff" icon={Users} color="text-cyan-400 bg-cyan-500/10" to="/admin/team" />
        <StatCard label="Testimonials" value={testimonials.length} trend="Client reviews" icon={Star} color="text-emerald-400 bg-emerald-500/10" to="/admin/testimonials" />
        <StatCard label="Messages" value={messages.length} trend={`${unread} unread`} icon={MessageSquare} color="text-violet-400 bg-violet-500/10" to="/admin/messages" />
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        
        {/* Quick Actions */}
        <div className="xl:col-span-3 bg-[#0D1220] border border-white/[0.08] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06]">
            <h2 className="text-sm font-bold text-white">Quick Actions</h2>
            <p className="text-xs text-white/30 mt-0.5">Manage all areas of the website</p>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {quickLinks.map((q, i) => (
              <Link key={i} to={q.path}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#F5A800]/40 hover:bg-[#F5A800]/5 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#F5A800]/10 flex items-center justify-center text-[#F5A800] mb-3 group-hover:bg-[#F5A800]/20 transition-colors">
                    <q.icon size={16} />
                  </div>
                  <div className="text-sm font-bold text-white leading-tight">{q.label}</div>
                  <div className="text-xs text-white/30 mt-1">{q.desc}</div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="xl:col-span-2 bg-[#0D1220] border border-white/[0.08] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">System Health</h2>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 uppercase tracking-widest">Live</span>
          </div>
          <div className="p-4 space-y-3">
            {systems.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.color}`}>
                  <s.icon size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{s.name}</span>
                    <span className={`text-xs font-black ${s.load > 80 ? 'text-amber-400' : 'text-emerald-400'}`}>{s.load}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.load}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`h-full rounded-full ${s.load > 80 ? 'bg-amber-400' : s.load > 60 ? 'bg-cyan-400' : 'bg-emerald-400'}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Recent Messages</h2>
            <p className="text-xs text-white/30 mt-0.5">Inquiries from your website</p>
          </div>
          <Link to="/admin/messages" className="text-xs font-bold text-[#F5A800] hover:text-blue-400 transition-colors uppercase tracking-widest">
            View All →
          </Link>
        </div>
        {messages.length > 0 ? (
          <div className="divide-y divide-white/[0.04]">
            {messages.slice(0, 5).map((m: any, i: number) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                <div className={`w-2 h-2 rounded-full shrink-0 ${m.status === 'unread' ? 'bg-[#F5A800]' : 'bg-white/20'}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white">{m.name}</div>
                  <div className="text-xs text-white/40 truncate mt-0.5">{m.message}</div>
                </div>
                <div className="text-xs text-white/30 shrink-0 flex items-center gap-1">
                  <Clock size={11} />
                  {m.created_at ? new Date(m.created_at).toLocaleDateString() : 'Today'}
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md shrink-0 ${
                  m.status === 'unread' ? 'bg-[#F5A800]/10 text-[#F5A800]' : 'bg-white/5 text-white/30'
                }`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-12 text-center">
            <ShieldCheck size={36} className="mx-auto mb-3 text-white/10" />
            <p className="text-sm text-white/30">No messages yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
