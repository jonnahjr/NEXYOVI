import React, { useState } from 'react';
import { 
  LayoutDashboard, Briefcase, Users, Settings, 
  LogOut, ChevronLeft, ChevronRight, Bell,
  MessageSquare, ShieldAlert,
  X, Clock, LayoutTemplate, Menu
} from 'lucide-react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import { supabase } from '../../lib/supabase';
import myLogo from '../../assets/logo 1.png';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { messages, settings, session } = useSite();

  const unreadMessages = messages.filter(m => m.status === 'unread');

  const userName = session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0] || 'Admin';
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'A';

  const nav = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: LayoutTemplate, label: 'Site Content', path: '/admin/content' },
    { icon: Briefcase, label: 'Jobs', path: '/admin/jobs' },
    { icon: Users, label: 'Team', path: '/admin/team' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages', badge: unreadMessages.length > 0 ? unreadMessages.length : null },
    { icon: ShieldAlert, label: 'Users', path: '/admin/users' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' }
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const currentPage = nav.find(n => location.pathname === n.path)?.label 
    || nav.find(n => location.pathname.startsWith(n.path) && n.path !== '/admin')?.label 
    || 'Dashboard';

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className={`h-20 flex items-center border-b border-white/[0.08] shrink-0 transition-all duration-300 ${collapsed ? 'px-5 justify-center' : 'px-6'}`}>
        {settings?.logo_url ? (
          <img src={settings.logo_url} alt="Logo" className="h-10 object-contain" />
        ) : (
          <div
            className={`bg-gradient-to-r from-[#F5A800] to-[#ffb700] transition-all duration-300 ${collapsed ? 'h-9 w-9 rounded-lg' : 'h-10 w-[150px] rounded-lg'}`}
            style={{
              WebkitMask: `url('${myLogo}') ${collapsed ? 'center' : 'left'} center / contain no-repeat`,
              mask: `url('${myLogo}') ${collapsed ? 'center' : 'left'} center / contain no-repeat`
            }}
          />
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {nav.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link 
              key={item.path}
              to={item.path} 
              onClick={() => setMobileOpen(false)}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                active
                  ? 'bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-white shadow-lg shadow-[#F5A800]/20'
                  : 'text-white/50 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              <item.icon size={19} className="shrink-0" />
              {!collapsed && (
                <span className="text-sm font-semibold flex-1 truncate">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className="text-[11px] bg-red-500 text-white font-black px-2 py-0.5 rounded-full min-w-[22px] text-center shadow-sm">
                  {item.badge}
                </span>
              )}
              {collapsed && item.badge && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-6 space-y-2 border-t border-white/[0.08] pt-4">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center gap-3 px-4 py-3 rounded-2xl text-white/40 hover:bg-white/[0.08] hover:text-white transition-all w-full"
        >
          {collapsed ? <ChevronRight size={19} /> : <ChevronLeft size={19} />}
          {!collapsed && <span className="text-sm font-semibold">Collapse</span>}
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all w-full"
        >
          <LogOut size={19} className="shrink-0" />
          {!collapsed && <span className="text-sm font-semibold">Sign Out</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#02040a] via-[#050816] to-[#02040a] text-white flex overflow-hidden">
      {/* ── MOBILE OVERLAY ── */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-[260px] bg-gradient-to-b from-[#050816] to-[#02040a] border-r border-white/[0.08] flex flex-col z-50 lg:hidden shadow-2xl transition-transform duration-300">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className={`h-full bg-gradient-to-b from-[#050816]/95 via-[#070B18]/95 to-[#02040a]/95 backdrop-blur-xl border-r border-white/[0.08] flex-col shrink-0 overflow-hidden hidden lg:flex shadow-2xl transition-all duration-300 ease-out ${
          collapsed ? 'w-[76px]' : 'w-[260px]'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="h-20 bg-gradient-to-r from-[#050816]/95 via-[#02040a]/90 to-[#050816]/95 backdrop-blur-xl border-b border-white/[0.08] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileOpen(true)} 
              className="lg:hidden w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] transition-all"
            >
              <Menu size={20} />
            </button>
            <div>
              <div className="text-xl font-black text-white leading-none">
                {currentPage}
              </div>
              <div className="text-xs text-white/35 mt-1">Nexyovi Admin Panel</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                  showNotifications 
                    ? 'bg-gradient-to-r from-[#F5A800] to-[#ffb700] border-transparent text-white shadow-lg shadow-[#F5A800]/20' 
                    : 'bg-white/[0.05] border-white/10 text-white/50 hover:bg-white/[0.1] hover:text-white'
                }`}
              >
                <Bell size={19} />
                {unreadMessages.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-[#050816] flex items-center justify-center text-[10px] font-black text-white shadow-sm">
                    {unreadMessages.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-3 w-88 bg-gradient-to-br from-[#050816] to-[#02040a] border border-white/[0.08] rounded-2xl z-50 overflow-hidden shadow-2xl">
                    <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02]">
                      <h3 className="text-sm font-bold text-white">Notifications</h3>
                      <button onClick={() => setShowNotifications(false)} className="text-white/35 hover:text-white transition-colors">
                        <X size={17} />
                      </button>
                    </div>
                    <div className="max-h-[320px] overflow-y-auto">
                      {messages.length > 0 ? (
                        messages.slice(0, 5).map((msg, i) => (
                          <Link key={i} to="/admin/messages" onClick={() => setShowNotifications(false)}
                            className="block px-5 py-4 hover:bg-white/[0.05] border-b border-white/[0.04] transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${msg.status === 'unread' ? 'bg-[#F5A800]' : 'bg-white/25'}`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-bold text-white truncate">{msg.name}</span>
                                  <span className="text-xs text-white/35 flex items-center gap-1 shrink-0 ml-2">
                                    <Clock size={11} />{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'Today'}
                                  </span>
                                </div>
                                <p className="text-xs text-white/40 line-clamp-2">{msg.message}</p>
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="px-5 py-12 text-center">
                          <MessageSquare size={30} className="mx-auto mb-3 text-white/20" />
                          <p className="text-sm text-white/40">No new messages</p>
                        </div>
                      )}
                    </div>
                    <Link to="/admin/messages" onClick={() => setShowNotifications(false)}
                      className="block px-5 py-4 text-center text-xs font-black text-[#F5A800] hover:bg-[#F5A800]/10 transition-colors uppercase tracking-[0.2em]"
                    >
                      View all messages
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* User */}
            <div className="flex items-center gap-3 pl-3 border-l border-white/[0.1]">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5A800] to-[#ffb700] flex items-center justify-center text-white text-xs font-black shrink-0 shadow-lg shadow-[#F5A800]/20">
                {userInitials}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-white leading-none">{userName}</div>
                <div className="text-xs text-white/35 mt-0.5">Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
