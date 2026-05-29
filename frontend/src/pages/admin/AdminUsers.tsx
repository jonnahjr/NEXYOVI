import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, Search, Edit2, Trash2, ShieldCheck, 
  X, Save, Lock, Shield, User, ArrowLeft
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const AdminUsers = () => {
  const { admins, addAdmin, updateAdmin, deleteAdmin } = useSite();
  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    username: '',
    role: 'Content Manager',
    status: 'Active',
    password: '',
  });

  const open = (admin: any = null) => {
    if (admin) {
      setEditing(admin);
      setForm({
        username: admin.username,
        role: admin.role,
        status: admin.status,
        password: '',
      });
    } else {
      setEditing(null);
      setForm({
        username: '',
        role: 'Content Manager',
        status: 'Active',
        password: '',
      });
    }
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateAdmin({ ...editing, ...form });
    } else {
      addAdmin({
        ...form,
        id: `admin-${Date.now()}`,
        lastLogin: 'Never',
      });
    }
    setIsEditing(false);
  };

  const filtered = admins.filter(a => 
    a.username.toLowerCase().includes(search.toLowerCase())
  );

  if (isEditing) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsEditing(false)} className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/40 hover:bg-white/[0.08] hover:text-white transition-all">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{editing ? 'Modify Access Control' : 'Provision Administrative Node'}</h1>
            <p className="text-sm text-white/40 mt-0.5">Permissions & Security Protocol Management</p>
          </div>
        </div>

        <div className="bg-[#0D1220] border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl">
          <form onSubmit={save} className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Identity (Username / Email)</label>
                <input required value={form.username} onChange={e => setForm({...form, username: e.target.value})} placeholder="e.g. admin@nexyovi.com"
                  className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all font-semibold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Access Level</label>
                  <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}
                    className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 appearance-none transition-all font-semibold">
                    <option value="Super Admin" className="bg-[#0D1220]">Super Admin</option>
                    <option value="Content Manager" className="bg-[#0D1220]">Content Manager</option>
                    <option value="Security Auditor" className="bg-[#0D1220]">Security Auditor</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                    className="w-full h-11 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 appearance-none transition-all font-semibold">
                    <option value="Active" className="bg-[#0D1220]">Active</option>
                    <option value="Suspended" className="bg-[#0D1220]">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Security Key (Password)</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10" size={16} />
                <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••"
                  className="w-full h-11 pl-11 pr-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all font-semibold" />
              </div>
            </div>

            <div className="bg-[#F5A800]/5 border border-[#F5A800]/10 p-5 rounded-xl flex items-start gap-4">
              <Shield size={20} className="text-[#F5A800] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#F5A800] uppercase tracking-widest mb-1">Administrative Protocol</h4>
                <p className="text-xs text-white/50 leading-relaxed font-medium">
                  Provisioning a new administrative node grants access to critical platform infrastructure. Ensure identity verification is complete before deploying access credentials.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/[0.06]">
              <button type="button" onClick={() => setIsEditing(false)} className="h-10 px-6 text-sm font-bold text-white/40 hover:text-white transition-colors">Cancel</button>
              <button type="submit" className="h-10 px-6 bg-[#F5A800] text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-blue-600 flex items-center gap-2 transition-all shadow-lg shadow-[#F5A800]/20">
                <Save size={16} /> {editing ? 'Save Changes' : 'Deploy Identity'}
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Access Control</h1>
          <p className="text-sm text-white/40 mt-0.5">{admins.length} administrator nodes</p>
        </div>
        <button onClick={() => open()} className="flex items-center gap-1.5 h-10 px-4 bg-[#F5A800] text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-[#F5A800]/20">
          <UserPlus size={16} /> Provision Admin
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by identity..." className="w-full h-12 pl-11 pr-4 bg-[#0D1220] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-all shadow-sm" />
      </div>

      {/* Admin Table */}
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-12 px-6 py-3 border-b border-white/[0.06] text-xs font-bold text-white/30 uppercase tracking-widest">
          <div className="col-span-4">Identity</div>
          <div className="col-span-3">Access Level</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {filtered.length > 0 ? filtered.map((admin) => (
          <motion.div key={admin.id} layout className="grid grid-cols-12 items-center px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group last:border-0">
            <div className="col-span-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${admin.role === 'Super Admin' ? 'bg-[#F5A800]/10 text-[#F5A800]' : 'bg-white/5 text-white/20'} border border-white/[0.05] flex items-center justify-center shrink-0`}>
                <ShieldCheck size={16} />
              </div>
              <div className="min-w-0 pr-4">
                <div className="text-sm font-bold text-white truncate">{admin.username}</div>
                <div className="text-xs text-white/40 font-mono mt-0.5">ID: {admin.id?.substring(0, 8)}</div>
              </div>
            </div>
            <div className="col-span-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${admin.role === 'Super Admin' ? 'text-[#F5A800] bg-[#F5A800]/10 border border-[#F5A800]/20' : 'text-white/50 bg-white/5'}`}>
                {admin.role}
              </span>
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${admin.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`} />
              <span className="text-sm font-medium text-white/60">{admin.status}</span>
            </div>
            <div className="col-span-2 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => open(admin)} className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-[#F5A800]/10 hover:border-[#F5A800]/20 hover:text-[#F5A800] text-white/40 flex items-center justify-center transition-all">
                <Edit2 size={14} />
              </button>
              <button onClick={() => deleteAdmin(admin.id)} className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 text-white/40 flex items-center justify-center transition-all disabled:opacity-30" disabled={admin.username === 'yonasbogale@nexyovi.com'}>
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        )) : (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
              <Lock size={20} className="text-white/20" />
            </div>
            <div className="text-sm text-white/40">No identities found.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
