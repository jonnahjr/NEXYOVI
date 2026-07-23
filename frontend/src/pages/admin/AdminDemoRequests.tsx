import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Search, Check, Trash2, Clock, ArrowLeft, X, ExternalLink } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const statusColors: Record<string, string> = {
  'unread': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'new': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'read': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const AdminDemoRequests = () => {
  const { messages, updateMessage, deleteMessage } = useSite();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selected, setSelected] = useState<any>(null);

  // Filter only demo requests (type === 'demo' or message starts with [Demo Request)
  const demoRequests = messages.filter((m: any) => 
    m.type === 'demo' || (typeof m.message === 'string' && m.message.startsWith('[Demo Request for:'))
  );

  const filtered = demoRequests.filter((m: any) => {
    const ms = m.name?.toLowerCase().includes(search.toLowerCase()) || 
               m.email?.toLowerCase().includes(search.toLowerCase()) || 
               m.service?.toLowerCase().includes(search.toLowerCase()) ||
               m.message?.toLowerCase().includes(search.toLowerCase());
    const mf = filter === 'all' ? true : filter === 'unread' ? (m.status === 'unread' || m.status === 'new') : m.status === 'read';
    return ms && mf;
  });

  const unreadCount = demoRequests.filter((m: any) => m.status === 'unread' || m.status === 'new').length;

  const markAsRead = async (msg: any) => { 
    if (msg.status === 'unread' || msg.status === 'new') await updateMessage(msg.id, { status: 'read' }); 
  };
  
  const handleDelete = async (id: string) => { 
    if (window.confirm('Delete this demo request?')) { 
      await deleteMessage(id); 
      if (selected?.id === id) setSelected(null); 
    } 
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Unknown';
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return `Today at ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff}d ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const extractProduct = (msg: any): string => {
    if (msg.service) return msg.service;
    if (typeof msg.message === 'string') {
      const match = msg.message.match(/\[Demo Request for: (.*?)\]/);
      if (match) return match[1];
    }
    return 'Unknown Product';
  };

  const extractUseCase = (msg: any): string => {
    if (typeof msg.message === 'string') {
      // Remove the [Demo Request for: ...] header
      return msg.message.replace(/\[Demo Request for:.*?\]\n\n/, '').replace(/^Company:.*$/m, '').replace(/^Phone:.*$/m, '').trim();
    }
    return msg.content || 'No details provided';
  };

  if (selected) {
    const product = extractProduct(selected);
    return (
      <div className="space-y-6 max-w-4xl">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to Demo Requests
        </button>
        <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-md bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center">
                    <Monitor size={13} className="text-[#F5A800]" />
                  </div>
                  <span className="text-xs font-bold text-[#F5A800] uppercase tracking-wider">Demo Request</span>
                </div>
                <h2 className="text-xl font-bold text-white">{selected.name}</h2>
                <a href={`mailto:${selected.email}`} className="text-sm text-[#F5A800] hover:underline mt-1 inline-block">{selected.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${statusColors[selected.status || 'unread']}`}>
                  {(selected.status || 'unread').charAt(0).toUpperCase() + (selected.status || 'unread').slice(1)}
                </span>
                <span className="text-xs text-white/30 flex items-center gap-1"><Clock size={12} />{formatDate(selected.created_at)}</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-5 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5A800]/10 border border-[#F5A800]/20 text-[#F5A800] text-xs font-bold">
              <Monitor size={13} />
              {product}
            </div>
          </div>

          <div className="px-6 py-6">
            <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{extractUseCase(selected)}</p>
          </div>

          <div className="px-6 py-4 border-t border-white/[0.06] bg-white/[0.02] flex items-center justify-between">
            <div className="text-xs text-white/40 space-x-4">
              {selected.phone && <span>📞 {selected.phone}</span>}
              {selected.company && <span>🏢 {selected.company}</span>}
            </div>
            <div className="flex items-center gap-2">
              {selected.status !== 'read' && (
                <button onClick={() => markAsRead(selected)} 
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-all">
                  <Check size={13} /> Mark Read
                </button>
              )}
              <button onClick={() => handleDelete(selected.id)} 
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5A800]/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center">
              <Monitor size={20} className="text-[#F5A800]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Demo Requests</h1>
              <p className="text-xs text-white/40 mt-0.5">{demoRequests.length} total · {unreadCount} unread</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input 
            value={search} onChange={e => setSearch(e.target.value)} 
            placeholder="Search by name, email, or product..." 
            className="w-full h-10 pl-10 pr-4 bg-[#0D1220] border border-white/[0.08] rounded-lg text-sm text-white/70 placeholder:text-white/25 focus:outline-none focus:border-[#F5A800]/50 transition-colors" 
          />
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
            {filtered.map((msg: any) => {
              const product = extractProduct(msg);
              return (
                <div key={msg.id} 
                  onClick={() => { setSelected(msg); markAsRead(msg); }}
                  className={`cursor-pointer hover:bg-white/[0.02] transition-colors ${msg.status === 'unread' || msg.status === 'new' ? 'border-l-2 border-l-[#F5A800]' : ''}`}>
                  <div className="px-5 py-4 flex items-start gap-4">
                    <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${msg.status === 'unread' || msg.status === 'new' ? 'bg-[#F5A800]' : 'bg-white/20'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${msg.status === 'unread' || msg.status === 'new' ? 'font-bold text-white' : 'font-semibold text-white/70'}`}>{msg.name}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#F5A800]/10 text-[#F5A800] border border-[#F5A800]/20">
                            {product}
                          </span>
                        </div>
                        <span className="text-xs text-white/30 shrink-0">{formatDate(msg.created_at)}</span>
                      </div>
                      <div className="text-xs text-white/40 mt-0.5">{msg.email}</div>
                      <p className="text-sm text-white/50 mt-1.5 line-clamp-2">{extractUseCase(msg)}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 pt-1">
                      {msg.status !== 'read' && (
                        <button onClick={e => { e.stopPropagation(); updateMessage(msg.id, { status: 'read' }); }}
                          className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-emerald-400 hover:border-emerald-400/30 transition-all">
                          <Check size={13} />
                        </button>
                      )}
                      <button onClick={e => { e.stopPropagation(); handleDelete(msg.id); }}
                        className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-red-400 hover:border-red-400/30 transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center">
            <Monitor size={32} className="mx-auto mb-3 text-white/20" />
            <p className="text-sm text-white/50 font-medium">No demo requests found</p>
            <p className="text-xs text-white/30 mt-1">{search ? 'Try a different search' : 'Demo requests will appear here when submitted'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDemoRequests;
