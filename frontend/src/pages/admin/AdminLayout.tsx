import React, { useState } from 'react';
import {
  LayoutDashboard, Briefcase, Users, Settings,
  LogOut, ChevronLeft, ChevronRight, Bell,
  MessageSquare, Shield, Menu, X, Clock,
  Star, Globe, ExternalLink,
  ChevronDown, Search, Home, Building2, Zap,
  FileText, Inbox, Monitor
} from 'lucide-react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin', exact: true },
  { icon: Home, label: 'Home Content', path: '/admin/content/home' },
  { icon: Building2, label: 'Company Content', path: '/admin/content/company' },
  { icon: Zap, label: 'Services Content', path: '/admin/content/services' },
  { icon: Globe, label: 'Global Content', path: '/admin/content/global' },
  { icon: Briefcase, label: 'Job Posts', path: '/admin/jobs' },
  { icon: Monitor, label: 'Demo Requests', path: '/admin/demo-requests' },
  { icon: Inbox, label: 'All Applications', path: '/admin/applications' },
  { icon: Briefcase, label: 'Career Applicants', path: '/admin/career-applicants' },
  { icon: Users, label: 'Internship Applicants', path: '/admin/internship-applicants' },
  { icon: Users, label: 'Team', path: '/admin/team' },
  { icon: Star, label: 'Testimonials', path: '/admin/testimonials' },
  { icon: MessageSquare, label: 'Messages', path: '/admin/messages', badgeKey: 'unread' as const },
  { icon: Globe, label: 'Partners & Logos', path: '/admin/partners' },
  { icon: FileText, label: 'Careers Page', path: '/admin/careers' },
  { icon: FileText, label: 'Internship Page', path: '/admin/internship' },
  { icon: Shield, label: 'User Access', path: '/admin/users' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { messages, settings, session, jobs, logout } = useSite();

  const unreadCount = messages.filter((m: any) => m.status === 'unread' || m.status === 'new').length;
  const activeJobs = jobs.filter((j: any) => j.status !== 'closed' && j.status !== 'filled').length;

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  const pageTitle = navItems.find(n => isActive(n))?.label || 'Dashboard';

  const userName = session?.user?.user_metadata?.full_name
    || session?.user?.email?.split('@')[0]
    || 'Administrator';
  const userEmail = session?.user?.email || 'admin@nexyovi.com';
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'A';

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const Sidebar = ({ mobile }: { mobile?: boolean }) => (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className={`h-16 flex items-center border-b border-white/[0.06] shrink-0 ${collapsed && !mobile ? 'justify-center px-4' : 'px-5'}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F5A800] to-[#ffb700] flex items-center justify-center shrink-0 shadow-lg shadow-[#F5A800]/20">
            <span className="text-white text-xs font-black">N</span>
          </div>
          {(!collapsed || mobile) && (
            <div>
              <div className="text-sm font-bold text-white leading-tight">Nexyovi</div>
              <div className="text-[10px] font-medium text-white/30 uppercase tracking-wider">Admin Panel</div>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      {(!collapsed || mobile) && (
        <div className="px-3 pt-4 pb-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Quick search..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-white/[0.04] border border-white/[0.08] rounded-lg text-white/70 placeholder:text-white/25 focus:outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => mobile && setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                active
                  ? 'bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black shadow-md shadow-[#F5A800]/20'
                  : 'text-white/50 hover:bg-white/[0.06] hover:text-white'
              } ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
              title={collapsed && !mobile ? item.label : undefined}
            >
              <item.icon size={18} className="shrink-0" />
              {(!collapsed || mobile) && (
                <span className="text-sm font-semibold flex-1 truncate">{item.label}</span>
              )}
              {(!collapsed || mobile) && item.badgeKey === 'unread' && unreadCount > 0 && (
                <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
              {collapsed && !mobile && item.badgeKey === 'unread' && unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 border-t border-white/[0.06] pt-3 space-y-0.5">
        <button onClick={() => setCollapsed(!collapsed)}
          className={`hidden lg:flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/30 hover:bg-white/[0.06] hover:text-white transition-all w-full text-sm ${collapsed ? 'justify-center' : ''}`}>
          <ChevronLeft size={16} className={`shrink-0 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          {!collapsed && <span className="font-medium">Collapse</span>}
        </button>
        <button onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/30 hover:bg-red-500/10 hover:text-red-400 transition-all w-full text-sm ${collapsed ? 'justify-center' : ''}`}>
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#02040a] via-[#050816] to-[#02040a] flex overflow-hidden">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-[280px] bg-[#050816] border-r border-white/[0.08] flex flex-col z-50 lg:hidden shadow-2xl">
            <Sidebar mobile />
          </aside>
        </>
      )}

      {/* Desktop Sidebar */}
      <aside className={`h-full bg-[#050816]/95 backdrop-blur-xl border-r border-white/[0.08] flex-col shrink-0 overflow-hidden hidden lg:flex shadow-2xl transition-all duration-300 ${collapsed ? 'w-[64px]' : 'w-[260px]'}`}>
        <Sidebar />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-[#050816]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 lg:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)}
              className="lg:hidden w-9 h-9 rounded-lg border border-white/[0.1] flex items-center justify-center text-white/50 hover:bg-white/[0.08] transition-all">
              <Menu size={18} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">{pageTitle}</h1>
              <p className="text-xs text-white/35">
                {activeJobs > 0 && `${activeJobs} active job${activeJobs > 1 ? 's' : ''}`}
                {activeJobs > 0 && unreadCount > 0 && ' · '}
                {unreadCount > 0 && `${unreadCount} unread`}
                {activeJobs === 0 && unreadCount === 0 && 'All systems operational'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 rounded-lg border border-white/[0.1] flex items-center justify-center text-white/40 hover:bg-white/[0.08] hover:text-white transition-all">
                <Bell size={17} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-red-500 border-2 border-[#050816] flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-[#0D1220] border border-white/[0.08] rounded-xl z-50 shadow-2xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Notifications</h3>
                      <button onClick={() => setNotifOpen(false)} className="text-white/30 hover:text-white"><X size={14} /></button>
                    </div>
                    <div className="max-h-[360px] overflow-y-auto">
                      {messages.length > 0 ? messages.slice(0, 5).map((msg: any, i: number) => (
                        <Link key={i} to="/admin/messages" onClick={() => setNotifOpen(false)}
                          className="block px-5 py-3.5 hover:bg-white/[0.03] border-b border-white/[0.04] transition-colors">
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${msg.status === 'unread' || msg.status === 'new' ? 'bg-[#F5A800]' : 'bg-white/20'}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-semibold text-white truncate">{msg.name}</span>
                                <span className="text-[10px] text-white/30 shrink-0 flex items-center gap-1">
                                  <Clock size={10} />
                                  {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'Today'}
                                </span>
                              </div>
                              <p className="text-xs text-white/40 line-clamp-2 mt-0.5">{msg.message || msg.content}</p>
                            </div>
                          </div>
                        </Link>
                      )) : (
                        <div className="px-5 py-12 text-center">
                          <Bell size={24} className="mx-auto mb-2 text-white/20" />
                          <p className="text-sm text-white/40">No new notifications</p>
                        </div>
                      )}
                    </div>
                    <Link to="/admin/messages" onClick={() => setNotifOpen(false)}
                      className="block px-5 py-3 text-center text-xs font-bold text-[#F5A800] hover:bg-white/[0.03] transition-colors border-t border-white/[0.06]">
                      View All Messages
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 pl-3 ml-1 border-l border-white/[0.1] py-1 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F5A800] to-[#ffb700] flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
                  {userInitials}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-semibold text-white leading-tight">{userName}</div>
                  <div className="text-[10px] text-white/35">Administrator</div>
                </div>
                <ChevronDown size={14} className="hidden sm:block text-white/30" />
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-[#0D1220] border border-white/[0.08] rounded-xl z-50 shadow-2xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/[0.06]">
                      <div className="text-sm font-bold text-white">{userName}</div>
                      <div className="text-xs text-white/40 mt-0.5">{userEmail}</div>
                    </div>
                    <div className="py-1">
                      <Link to="/" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:bg-white/[0.05] transition-colors">
                        <ExternalLink size={15} /> View Site
                      </Link>
                    </div>
                    <div className="border-t border-white/[0.06] py-1">
                      <button onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full">
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
