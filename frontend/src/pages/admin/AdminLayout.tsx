import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Briefcase, Users, Settings, 
  LogOut, ChevronLeft, ChevronRight, Bell,
  MessageSquare, Star, ShieldAlert,
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
  const { messages, settings } = useSite();

  const unreadMessages = messages.filter(m => m.status === 'unread');

  const nav = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: LayoutTemplate, label: 'Site Content', path: '/admin/content' },
    { icon: Briefcase, label: 'Jobs', path: '/admin/jobs' },
    { icon: Users, label: 'Team', path: '/admin/team' },
    { icon: Star, label: 'Testimonials', path: '/admin/testimonials' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages', badge: unreadMessages.length > 0 ? unreadMessages.length : null },
    { icon: ShieldAlert, label: 'Users', path: '/admin/users' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
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
      <div className={`h-[72px] flex items-center border-b border-white/[0.06] shrink-0 transition-all ${collapsed ? 'px-5 justify-center' : 'px-6'}`}>
        {settings?.logo_url ? (
          <img src={settings.logo_url} alt="Logo" className="h-12 object-contain" />
        ) : (
          <div
            className={`bg-[#f3a847] transition-all ${collapsed ? 'h-8 w-8' : 'h-12 w-[160px]'}`}
            style={{
              WebkitMask: `url('${myLogo}') ${collapsed ? 'center' : 'left'} center / contain no-repeat`,
              mask: `url('${myLogo}') ${collapsed ? 'center' : 'left'} center / contain no-repeat`
            }}
          />
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-5 px-3 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
              className={`relative flex items-center gap-3 px-3 h-11 rounded-xl transition-all group ${
                active
                  ? 'bg-[#F5A800] text-white shadow-lg shadow-[#F5A800]/20'
                  : 'text-white/50 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && (
                <span className="text-sm font-semibold flex-1 truncate">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className="text-xs bg-red-500 text-white font-black px-1.5 py-0.5 rounded-md min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
              {collapsed && item.badge && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 space-y-0.5 border-t border-white/[0.06] pt-4">
        <button onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center gap-3 px-3 h-11 rounded-xl text-white/30 hover:bg-white/[0.05] hover:text-white transition-all w-full"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="text-sm font-semibold">Collapse</span>}
        </button>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 h-11 rounded-xl text-white/30 hover:bg-red-500/10 hover:text-red-400 transition-all w-full"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span className="text-sm font-semibold">Sign Out</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="h-screen w-screen bg-[#070B14] text-white flex overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* ── MOBILE OVERLAY ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full w-[260px] bg-[#0D1220] border-r border-white/[0.08] flex flex-col z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── DESKTOP SIDEBAR ── */}
      <motion.aside
        animate={{ width: collapsed ? 68 : 240 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="h-full bg-[#0D1220] border-r border-white/[0.08] flex-col shrink-0 overflow-hidden hidden lg:flex"
      >
        <SidebarContent />
      </motion.aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        
        {/* Topbar */}
        <header className="h-[72px] bg-[#0D1220] border-b border-white/[0.08] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(true)} className="lg:hidden w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all">
              <Menu size={18} />
            </button>
            <div>
              <div className="text-base font-bold text-white leading-none">{currentPage}</div>
              <div className="text-xs text-white/30 mt-0.5">Nexyovi Admin Panel</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${
                  showNotifications ? 'bg-[#F5A800] border-[#F5A800] text-white' : 'bg-white/[0.03] border-white/[0.08] text-white/40 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <Bell size={16} />
                {unreadMessages.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#0D1220] flex items-center justify-center text-[9px] font-black text-white">
                    {unreadMessages.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      className="absolute right-0 mt-2 w-80 bg-[#0D1220] border border-white/[0.1] rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white">Notifications</h3>
                        <button onClick={() => setShowNotifications(false)} className="text-white/30 hover:text-white transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                      <div className="max-h-[320px] overflow-y-auto">
                        {messages.length > 0 ? (
                          messages.slice(0, 5).map((msg, i) => (
                            <Link key={i} to="/admin/messages" onClick={() => setShowNotifications(false)}
                              className="block p-4 hover:bg-white/[0.03] border-b border-white/[0.04] transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-1.5 h-1.5 mt-1.5 rounded-full shrink-0 ${msg.status === 'unread' ? 'bg-[#F5A800]' : 'bg-white/20'}`} />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-bold text-white truncate">{msg.name}</span>
                                    <span className="text-xs text-white/30 flex items-center gap-1 shrink-0 ml-2">
                                      <Clock size={10} />{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'Today'}
                                    </span>
                                  </div>
                                  <p className="text-xs text-white/40 line-clamp-2">{msg.message}</p>
                                </div>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="p-8 text-center">
                            <MessageSquare size={28} className="mx-auto mb-2 text-white/20" />
                            <p className="text-sm text-white/30">No new messages</p>
                          </div>
                        )}
                      </div>
                      <Link to="/admin/messages" onClick={() => setShowNotifications(false)}
                        className="block py-3 text-center text-xs font-bold text-[#F5A800] hover:bg-[#F5A800]/5 transition-colors uppercase tracking-widest"
                      >
                        View all messages
                      </Link>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* User */}
            <div className="flex items-center gap-3 pl-3 border-l border-white/[0.08]">
              <div className="w-8 h-8 rounded-lg bg-[#F5A800] flex items-center justify-center text-white text-xs font-black shrink-0">
                YB
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-white leading-none">Yonas Bogale</div>
                <div className="text-xs text-white/30 mt-0.5">Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#070B14]">
          <div className="w-full max-w-7xl mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
