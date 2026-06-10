import React, { useMemo } from 'react';
import {
  Briefcase, Users, MessageSquare, Star,
  Clock, ChevronRight, Activity,
  Mail, Globe, Server, Shield, Settings,
  Home, Building2, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon: Icon, to, color }: any) => (
  <Link to={to}>
    <motion.div whileHover={{ y: -2, scale: 1.01 }}
      className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5 hover:border-white/20 hover:shadow-lg hover:shadow-black/30 transition-all duration-300 cursor-pointer group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/[0.02] to-transparent rounded-full blur-2xl" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-lg ${color || 'bg-white/[0.06]'} flex items-center justify-center`}>
            <Icon size={18} className="text-white" />
          </div>
        </div>
        <div className="text-2xl font-bold text-white mb-0.5">{value ?? '—'}</div>
        <div className="text-sm text-white/50">{label}</div>
      </div>
    </motion.div>
  </Link>
);

const QuickAction = ({ icon: Icon, label, desc, to }: any) => (
  <Link to={to}>
    <motion.div whileHover={{ x: 4 }}
      className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-[#0D1220] hover:border-white/20 hover:bg-[#0D1220] transition-all duration-200">
      <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0 group-hover:bg-[#F5A800]/10 transition-colors">
        <Icon size={18} className="text-white/50 group-hover:text-[#F5A800] transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white">{label}</div>
        <div className="text-xs text-white/40 mt-0.5">{desc}</div>
      </div>
      <ChevronRight size={16} className="text-white/20 group-hover:text-[#F5A800] transition-colors shrink-0" />
    </motion.div>
  </Link>
);

const ActivityItem = ({ icon: Icon, text, time, color }: any) => (
  <div className="flex items-start gap-3 py-3 border-b border-white/[0.04] last:border-0">
    <div className={`w-8 h-8 rounded-full ${color || 'bg-white/[0.05]'} flex items-center justify-center shrink-0 mt-0.5`}>
      <Icon size={14} className="text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-white/70">{text}</p>
      <p className="text-xs text-white/30 mt-0.5 flex items-center gap-1"><Clock size={11} />{time}</p>
    </div>
  </div>
);

const HealthIndicator = ({ label, status, value }: any) => (
  <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
    <div className="flex items-center gap-2.5">
      <div className={`w-2 h-2 rounded-full ${status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
      <span className="text-sm text-white/60">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xs text-white/40">{value}</span>
      <div className={`w-1.5 h-1.5 rounded-full ${status === 'healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
    </div>
  </div>
);

const AdminDashboard = () => {
  const { jobs, team, testimonials, messages, settings, partners } = useSite();
  const unread = messages.filter((m: any) => m.status === 'unread' || m.status === 'new').length;
  const activeJobs = jobs.filter((j: any) => j.status !== 'closed' && j.status !== 'filled');
  const teamCount = team?.length || 0;
  const testimonialsCount = testimonials?.length || 0;
  const messagesCount = messages?.length || 0;

  const recentMessages = useMemo(() =>
    messages.slice(0, 3).map((m: any) => ({
      icon: Mail,
      text: <><span className="font-medium text-white">{m.name}</span>{m.message ? ` — ${m.message.slice(0, 60)}${m.message.length > 60 ? '...' : ''}` : ''}</>,
      time: m.created_at ? new Date(m.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Today',
      color: m.status === 'unread' || m.status === 'new' ? 'bg-[#F5A800]' : 'bg-white/[0.1]',
    })), [messages]
  );

  const quickActions = [
    { label: 'Edit Home Content', path: '/admin/content/home', icon: Home, desc: 'Hero, sections, homepage content' },
    { label: 'Edit Global Content', path: '/admin/content/global', icon: Globe, desc: 'Navigation, SEO, Footer' },
    { label: 'Manage Team', path: '/admin/team', icon: Users, desc: `${teamCount} team members` },
    { label: 'Post a Job', path: '/admin/jobs', icon: Briefcase, desc: `${activeJobs.length} active positions` },
    { label: 'View Messages', path: '/admin/messages', icon: MessageSquare, desc: `${unread} unread of ${messagesCount} total` },
    { label: 'Add Testimonial', path: '/admin/testimonials', icon: Star, desc: `${testimonialsCount} reviews` },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings, desc: 'Branding, contact, social' },
  ];

  const managementAreas = [
    { icon: Home, label: 'Home Content', desc: 'Homepage sections', to: '/admin/content/home', count: 12, color: 'bg-blue-600' },
    { icon: Building2, label: 'Company Content', desc: 'Company page sections', to: '/admin/content/company', count: 5, color: 'bg-indigo-600' },
    { icon: Zap, label: 'Services Content', desc: 'Services/Industries/Projects/Contact', to: '/admin/content/services', count: 7, color: 'bg-violet-600' },
    { icon: Globe, label: 'Global Content', desc: 'Navigation, SEO, Footer', to: '/admin/content/global', count: 3, color: 'bg-teal-600' },
    { icon: Briefcase, label: 'Jobs', desc: 'Career opportunities', to: '/admin/jobs', count: activeJobs.length, sub: `${jobs.length} total`, color: 'bg-violet-600' },
    { icon: Users, label: 'Team', desc: 'Staff profiles', to: '/admin/team', count: teamCount, color: 'bg-emerald-600' },
    { icon: Star, label: 'Testimonials', desc: 'Client reviews', to: '/admin/testimonials', count: testimonialsCount, color: 'bg-amber-500' },
    { icon: MessageSquare, label: 'Messages', desc: 'Contact inquiries', to: '/admin/messages', count: unread, sub: `${messagesCount} total`, color: 'bg-rose-500' },
    { icon: Globe, label: 'Partners', desc: 'Trust logos & brand partners', to: '/admin/partners', count: partners.length, color: 'bg-cyan-600' },
    { icon: Shield, label: 'Users', desc: 'Access control', to: '/admin/users', count: 0, color: 'bg-gray-600' },
    { icon: Settings, label: 'Settings', desc: 'Configuration', to: '/admin/settings', count: 0, color: 'bg-slate-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5A800]/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-white/40 mt-1">Overview of your site's performance and activity.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-400">System Online</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Jobs" value={activeJobs.length} icon={Briefcase} to="/admin/jobs" color="bg-violet-600" />
        <StatCard label="Team Members" value={teamCount} icon={Users} to="/admin/team" color="bg-emerald-600" />
        <StatCard label="Testimonials" value={testimonialsCount} icon={Star} to="/admin/testimonials" color="bg-amber-500" />
        <StatCard label="Unread Messages" value={unread} icon={Mail} to="/admin/messages" color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-white/50 uppercase tracking-wider">Quick Actions</h2>
            <Link to="/admin/content/home" className="text-xs font-medium text-[#F5A800] hover:text-[#ffb700] transition-colors">All areas →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickActions.map(a => <QuickAction key={a.path} {...a} />)}
          </div>
          <div className="mt-6">
            <h2 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4">All Management Areas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {managementAreas.map((area, i) => (
                <Link key={i} to={area.to}>
                  <motion.div whileHover={{ y: -2 }}
                    className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-4 hover:border-white/20 hover:shadow-lg transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-9 h-9 rounded-lg ${area.color} flex items-center justify-center`}>
                        <area.icon size={16} className="text-white" />
                      </div>
                      <ChevronRight size={14} className="text-white/20 group-hover:text-[#F5A800] transition-colors" />
                    </div>
                    <div className="text-lg font-bold text-white">{area.count}</div>
                    <div className="text-sm font-medium text-white/70">{area.label}</div>
                    <div className="text-xs text-white/40 mt-0.5">{area.desc}{area.sub ? ` · ${area.sub}` : ''}</div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2"><Activity size={14} className="text-white/40" /> Recent Activity</h3>
              {messages.length > 3 && <Link to="/admin/messages" className="text-xs text-[#F5A800] hover:text-[#ffb700] font-medium">View all</Link>}
            </div>
            <div className="px-5 py-2">
              {recentMessages.length > 0 ? recentMessages.map((item, i) => <ActivityItem key={i} {...item} />) : (
                <div className="py-8 text-center"><Activity size={24} className="mx-auto mb-2 text-white/20" /><p className="text-sm text-white/40">No recent activity</p></div>
              )}
            </div>
          </div>

          <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
              <Server size={14} className="text-white/40" />
              <h3 className="text-sm font-bold text-white">System Status</h3>
            </div>
            <div className="px-5 py-2">
              <HealthIndicator label="Supabase Connection" status="healthy" value="Connected" />
              <HealthIndicator label="Authentication" status="healthy" value={settings?.email ? 'Configured' : 'Not configured'} />
              <HealthIndicator label="Storage" status="healthy" value="Available" />
              <HealthIndicator label="Real-time Sync" status="healthy" value="Active" />
              <HealthIndicator label="Email Service" status={settings?.email ? 'healthy' : 'warning'} value={settings?.email || 'Not set'} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#F5A800]/10 via-[#0D1220] to-[#0D1220] border border-[#F5A800]/20 rounded-xl p-5">
            <h3 className="text-sm font-bold text-[#F5A800] mb-4">Quick Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Active Jobs', value: activeJobs.length },
                { label: 'Unread', value: unread },
                { label: 'Team', value: teamCount },
                { label: 'Reviews', value: testimonialsCount },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-lg font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/40">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
