import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus, Edit2, Trash2, Search, Save, X, Clock } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const roles = [
  { id: 'super-admin', name: 'Super Admin', desc: 'Full access to all features', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  { id: 'admin', name: 'Admin', desc: 'Content, team, jobs, messages', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { id: 'editor', name: 'Editor', desc: 'Edit content only', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  { id: 'viewer', name: 'Viewer', desc: 'Read-only access', color: 'bg-white/5 text-white/40 border-white/10' },
];

const AdminUsers = () => {
  const { admins, addAdmin, updateAdmin, deleteAdmin } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'admin', password: '' });

  const filteredUsers = admins.filter((u: any) => u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || u.email?.toLowerCase().includes(searchQuery.toLowerCase()));

  const openNew = () => { setEditing(null); setForm({ name: '', email: '', role: 'admin', password: '' }); setShowForm(true); };
  const openEdit = (u: any) => { setEditing(u); setForm({ name: u.name || '', email: u.email || '', role: u.role || 'admin', password: '' }); setShowForm(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    if (editing) { updateAdmin({ ...editing, name: form.name, email: form.email, role: form.role }); }
    else { addAdmin({ id: Date.now().toString(), name: form.name, email: form.email, role: form.role, createdAt: new Date().toISOString(), lastLogin: null, twoFactorEnabled: false }); }
    setShowForm(false); setEditing(null);
  };

  const handleDelete = (id: string) => { if (window.confirm('Delete this user?')) deleteAdmin(id); };
  const getRole = (roleId: string) => roles.find(r => r.id === roleId) || roles[1];

  return (
    <div className="space-y-6">
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">User Access Control</h1>
            <p className="text-xs text-white/40 mt-1">{admins.length} users · {roles.length} roles</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#F5A800]/20 transition-all">
            <Plus size={16} /> Add User
          </button>
        </div>
      </div>

      {showForm && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={() => setShowForm(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0D1220] border border-white/[0.08] rounded-2xl shadow-2xl w-full max-w-lg">
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div>
                    <h2 className="text-lg font-bold text-white">{editing ? 'Edit User' : 'Create User'}</h2>
                    <p className="text-xs text-white/40 mt-0.5">Set permissions and access level</p>
                  </div>
                  <button type="button" onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"><X size={16} /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Name *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Password {editing && '(optional)'}</label>
                    <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                      className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                      placeholder={editing ? 'Leave blank' : 'Secure password'} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Role</label>
                    <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                      className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 transition-colors">
                      {roles.map(r => <option key={r.id} value={r.id} className="bg-[#0D1220]">{r.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.06]">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-white/40 hover:text-white transition-colors">Cancel</button>
                  <button type="submit" className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#F5A800]/20 transition-all">
                    <Save size={15} /> {editing ? 'Save Changes' : 'Create User'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search users..."
          className="w-full h-10 pl-10 pr-4 bg-[#0D1220] border border-white/[0.08] rounded-lg text-sm text-white/70 placeholder:text-white/25 focus:outline-none focus:border-[#F5A800]/50 transition-colors" />
      </div>

      <div className="space-y-3">
        {filteredUsers.length > 0 ? filteredUsers.map((user: any) => {
          const roleInfo = getRole(user.role);
          return (
            <div key={user.id} className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5 hover:border-white/20 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F5A800] to-[#ffb700] flex items-center justify-center shrink-0 text-black text-sm font-bold shadow-sm">
                    {user.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'A'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{user.name}</h3>
                    <p className="text-sm text-white/50 mt-0.5">{user.email}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${roleInfo.color}`}>{roleInfo.name}</span>
                      <span className="text-xs text-white/30 flex items-center gap-1"><Clock size={11} />{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never logged in'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(user)} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-[#F5A800] hover:border-[#F5A800]/30 transition-all"><Edit2 size={14} /></button>
                  <button onClick={() => handleDelete(user.id)} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-red-400 hover:border-red-400/30 transition-all"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="bg-[#0D1220] border border-dashed border-white/10 rounded-xl py-16 text-center">
            <Shield size={32} className="mx-auto mb-3 text-white/20" />
            <p className="text-sm text-white/50 font-medium">No users found</p>
          </div>
        )}
      </div>

      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-4">Role Permissions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {roles.map(r => (
            <div key={r.id} className="px-4 py-3 bg-white/[0.03] rounded-lg border border-white/[0.06]">
              <h4 className="text-sm font-bold text-white">{r.name}</h4>
              <p className="text-xs text-white/40 mt-0.5">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
