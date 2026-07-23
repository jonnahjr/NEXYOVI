import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, Trash2, Check, ArrowLeft, Clock, X } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { useToast } from '../../context/ToastContext';

const AdminMessages = () => {
  const { messages, updateMessage, deleteMessage } = useSite();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selected, setSelected] = useState<any>(null);

  const filtered = messages.filter((m: any) => {
    const ms = m.name?.toLowerCase().includes(search.toLowerCase()) || m.email?.toLowerCase().includes(search.toLowerCase()) || m.message?.toLowerCase().includes(search.toLowerCase());
    const mf = filter === 'all' ? true : filter === 'unread' ? (m.status === 'unread' || m.status === 'new') : m.status === 'read';
    return ms && mf;
  });

  const unreadCount = messages.filter((m: any) => m.status === 'unread' || m.status === 'new').length;

  const markAsRead = async (msg: any) => {
    if (msg.status === 'unread' || msg.status === 'new') {
      await updateMessage(msg.id, { status: 'read' });
      toast(`Marked message from ${msg.name} as read`, 'info', 'Message Read');
    }
  };
  const handleDelete = async (id: string, name?: string) => {
    if (window.confirm('Delete this message?')) {
      await deleteMessage(id);
      toast(`Deleted message${name ? ` from ${name}` : ''}`, 'info', 'Message Deleted');
      if (selected?.id === id) setSelected(null);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Unknown';
    const d = new Date(dateStr); const now = new Date(); const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return `Today at ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff}d ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (selected) {
    return (
      <div className="space-y-6 max-w-4xl">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"><ArrowLeft size={16} /> Back</button>
        <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{selected.name}</h2>
                <a href={`mailto:${selected.email}`} className="text-sm text-[#F5A800] hover:underline mt-1 inline-block">{selected.email}</a>
              </div>
              <span className="text-xs text-white/30 flex items-center gap-1"><Clock size={12} />{formatDate(selected.created_at)}</span>
            </div>
          </div>
          <div className="px-6 py-6"><p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{selected.message || selected.content || 'No content'}</p></div>
          <div className="px-6 py-4 border-t border-white/[0.06] bg-white/[0.02] flex items-center justify-between">
            <div className="text-xs text-white/30">
              {selected.phone && <span>Phone: {selected.phone}</span>}
              {selected.company && <span className="ml-4">Company: {selected.company}</span>}
            </div>
            <button onClick={() => handleDelete(selected.id, selected.name)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all"><Trash2 size={13} /> Delete</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5">
        <div>
          <h1 className="text-xl font-bold text-white">Messages</h1>
          <p className="text-xs text-white/40 mt-1">{messages.length} total · {unreadCount} unread</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..."
            className="w-full h-10 pl-10 pr-4 bg-[#0D1220] border border-white/[0.08] rounded-lg text-sm text-white/70 placeholder:text-white/25 focus:outline-none focus:border-[#F5A800]/50 transition-colors" />
        </div>
        <div className="flex gap-1 p-0.5 bg-white/[0.04] rounded-lg">
          {(['all', 'unread', 'read'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all capitalize ${filter === f ? 'bg-[#F5A800] text-black shadow-sm' : 'text-white/40 hover:text-white'}`}>
              {f}{f === 'unread' && unreadCount > 0 ? ` (${unreadCount})` : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl overflow-hidden">
        {filtered.length > 0 ? (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map((msg: any) => (
              <div key={msg.id} onClick={() => { setSelected(msg); markAsRead(msg); }}
                className={`cursor-pointer hover:bg-white/[0.02] transition-colors ${msg.status === 'unread' || msg.status === 'new' ? 'border-l-2 border-l-[#F5A800]' : ''}`}>
                <div className="px-5 py-4 flex items-start gap-4">
                  <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${msg.status === 'unread' || msg.status === 'new' ? 'bg-[#F5A800]' : 'bg-white/20'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm ${msg.status === 'unread' || msg.status === 'new' ? 'font-bold text-white' : 'font-semibold text-white/70'}`}>{msg.name}</span>
                      <span className="text-xs text-white/30 shrink-0">{formatDate(msg.created_at)}</span>
                    </div>
                    <div className="text-xs text-white/40 mt-0.5">{msg.email}</div>
                    <p className="text-sm text-white/50 mt-1.5 line-clamp-2">{msg.message || msg.content || 'No content'}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 pt-1">
                    {msg.status !== 'read' && (
                      <button onClick={e => { e.stopPropagation(); updateMessage(msg.id, { status: 'read' }); }}
                        className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-emerald-400 hover:border-emerald-400/30 transition-all"><Check size={13} /></button>
                    )}                      <button onClick={e => { e.stopPropagation(); handleDelete(msg.id, msg.name); }}
                          className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-red-400 hover:border-red-400/30 transition-all"><Trash2 size={13} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <Mail size={32} className="mx-auto mb-3 text-white/20" />
            <p className="text-sm text-white/50 font-medium">No messages found</p>
            <p className="text-xs text-white/30 mt-1">{search ? 'Try a different search' : 'No messages yet'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
