import React, { useState } from 'react';
import { Save, Globe, Mail, Phone, MapPin, Image, Settings, UploadCloud } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { supabase } from '../../lib/supabase';

const AdminSettings = () => {
  const { settings, updateSettings } = useSite();
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ siteName: settings?.siteName || 'Nexyovi', email: settings?.email || '', phone: settings?.phone || '', address: settings?.address || '', logo_url: settings?.logo_url || '' });
  const [socials, setSocials] = useState<Record<string, string>>(settings?.socials || { twitter: '', linkedin: '', github: '', youtube: '', instagram: '', facebook: '', telegram: '', whatsapp: '' });

  const handleSave = async () => {
    setSaving(true); setSaveStatus(null);
    try { await updateSettings({ ...form, socials }); setSaveStatus({ type: 'success', message: 'Settings saved!' }); }
    catch { setSaveStatus({ type: 'error', message: 'Error saving' }); }
    finally { setSaving(false); setTimeout(() => setSaveStatus(null), 3000); }
  };

  const socialList = [
    { key: 'twitter', label: 'Twitter / X', ph: 'https://twitter.com/nexyovi' },
    { key: 'linkedin', label: 'LinkedIn', ph: 'https://linkedin.com/company/nexyovi' },
    { key: 'github', label: 'GitHub', ph: 'https://github.com/nexyovi' },
    { key: 'youtube', label: 'YouTube', ph: 'https://youtube.com/@nexyovi' },
    { key: 'instagram', label: 'Instagram', ph: 'https://instagram.com/nexyovi' },
    { key: 'facebook', label: 'Facebook', ph: 'https://facebook.com/nexyovi' },
    { key: 'telegram', label: 'Telegram', ph: 'https://t.me/nexyovi' },
    { key: 'whatsapp', label: 'WhatsApp', ph: '+251900000000' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F5A800] to-[#ffb700] flex items-center justify-center"><Settings size={18} className="text-black" /></div>
          <div>
            <h1 className="text-xl font-bold text-white">Settings</h1>
            <p className="text-xs text-white/40 mt-0.5">Manage site branding, contact, and social links</p>
          </div>
        </div>
      </div>

      {saveStatus && (
        <div className={`px-5 py-3 rounded-xl border text-sm font-semibold ${saveStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {saveStatus.message}
        </div>
      )}

      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] bg-white/[0.02] flex items-center gap-2">
          <Image size={15} className="text-white/40" />
          <h2 className="text-sm font-bold text-white">Branding</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white/50 mb-1.5">Site Name</label>
            <input value={form.siteName} onChange={e => setForm({ ...form, siteName: e.target.value })}
              className="w-full max-w-md h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/50 mb-1.5">Logo</label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <input value={form.logo_url} onChange={e => setForm({ ...form, logo_url: e.target.value })}
                  className="flex-1 h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" placeholder="https://..." />
                {form.logo_url && (
                  <div className="w-10 h-10 rounded-lg border border-white/10 overflow-hidden shrink-0 bg-white/[0.03] flex items-center justify-center">
                    <img src={form.logo_url} alt="" className="w-8 h-8 object-contain" />
                  </div>
                )}
              </div>
              <label className={`inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-white/10 text-xs font-semibold transition-all cursor-pointer w-fit ${uploading ? 'bg-white/5 text-white/40' : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06]'}`}>
                <UploadCloud size={14} />{uploading ? 'Uploading...' : 'Upload from computer'}
                <input type="file" accept="image/*" className="hidden" disabled={uploading}
                  onChange={async (e) => {
                    if (!e.target.files?.[0]) return;
                    setUploading(true);
                    try {
                      const file = e.target.files[0];
                      const fn = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
                      const { error } = await supabase.storage.from('nexyovi_assets').upload(`logos/${fn}`, file);
                      if (error) throw error;
                      const { data } = supabase.storage.from('nexyovi_assets').getPublicUrl(`logos/${fn}`);
                      setForm(f => ({ ...f, logo_url: data.publicUrl }));
                    } catch (err: any) { alert(`Upload failed: ${err.message}`); }
                    finally { setUploading(false); }
                  }} />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] bg-white/[0.02] flex items-center gap-2">
          <Mail size={15} className="text-white/40" />
          <h2 className="text-sm font-bold text-white">Contact Information</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5 flex items-center gap-1.5"><Mail size={13} className="text-white/30" /> Email</label>
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" placeholder="info@nexyovi.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5 flex items-center gap-1.5"><Phone size={13} className="text-white/30" /> Phone</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" placeholder="+251..." />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/50 mb-1.5 flex items-center gap-1.5"><MapPin size={13} className="text-white/30" /> Address</label>
            <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
              className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" placeholder="Bole District, Addis Ababa" />
          </div>
        </div>
      </div>

      <div className="bg-[#0D1220] border border-white/[0.08] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] bg-white/[0.02] flex items-center gap-2">
          <Globe size={15} className="text-white/40" />
          <h2 className="text-sm font-bold text-white">Social Links</h2>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialList.map(s => (
              <div key={s.key}>
                <label className="block text-xs font-semibold text-white/50 mb-1.5 capitalize">{s.label}</label>
                <input value={socials[s.key] || ''} onChange={e => setSocials({ ...socials, [s.key]: e.target.value })}
                  className="w-full h-10 px-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors" placeholder={s.ph} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#F5A800] to-[#ffb700] text-black text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#F5A800]/20 transition-all disabled:opacity-50">
          <Save size={16} /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
