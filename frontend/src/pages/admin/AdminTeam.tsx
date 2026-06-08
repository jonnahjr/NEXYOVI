import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Briefcase,
  Edit2,
  Eye,
  Image as ImageIcon,
  Linkedin,
  Plus,
  Search,
  Save,
  Trash2,
  UploadCloud,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { supabase } from '../../lib/supabase';

const fallbackColors = [
  '#8b5cf6',
  '#10b981',
  '#3b82f6',
  '#ec4899',
  '#06b6d4',
  '#f59e0b',
  '#F5A800',
  '#ef4444',
];

const getInitials = (name: string, fallback?: string): string => {
  if (fallback) return fallback.toUpperCase();

  return name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getColor = (name: string, fallback?: string): string => {
  if (fallback) return fallback;

  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return fallbackColors[Math.abs(hash) % fallbackColors.length];
};

const isLeadershipRole = (role: string) =>
  /founder|chief|cto|ceo|vp|head/i.test(role);

const buildDefaultForm = () => ({
  name: '',
  role: '',
  bio: '',
  img: '',
  initials: '',
  color: '',
  linkedin: '',
});

const MemberAvatar = ({ member }: { member: any }) => {
  if (member.img) {
    return <img src={member.img} alt={member.name} className="h-full w-full object-cover" />;
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center text-white font-bold"
      style={{ backgroundColor: getColor(member.name || '', member.color) }}
    >
      {getInitials(member.name || '', member.initials)}
    </div>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  accent: string;
}) => (
  <div className="rounded-2xl border border-white/[0.06] bg-[#0D1220] p-5">
    <div className="mb-4 flex items-center justify-between">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl border"
        style={{ backgroundColor: `${accent}12`, borderColor: `${accent}25`, color: accent }}
      >
        <Icon size={18} />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">Live</span>
    </div>
    <div className="text-3xl font-black text-white">{value}</div>
    <div className="mt-1 text-xs font-bold uppercase tracking-widest text-white/35">{label}</div>
  </div>
);

const AdminTeam = () => {
  const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useSite();
  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(buildDefaultForm());

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return team;

    return team.filter((member) => {
      const haystack = [member.name, member.role, member.bio, member.linkedin]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [search, team]);

  const leadershipCount = useMemo(
    () => team.filter((member) => isLeadershipRole(member.role || '')).length,
    [team],
  );
  const withPhotoCount = useMemo(
    () => team.filter((member) => Boolean(member.img)).length,
    [team],
  );
  const linkedProfilesCount = useMemo(
    () => team.filter((member) => member.linkedin && member.linkedin !== '#').length,
    [team],
  );

  const open = (member: any = null) => {
    if (member) {
      setEditing(member);
      setForm({
        name: member.name || '',
        role: member.role || '',
        bio: member.bio || '',
        img: member.img || '',
        initials: member.initials || '',
        color: member.color || '',
        linkedin: member.linkedin || '',
      });
    } else {
      setEditing(null);
      setForm(buildDefaultForm());
    }

    setIsEditing(true);
  };

  const closeEditor = () => {
    setIsEditing(false);
    setEditing(null);
    setForm(buildDefaultForm());
    setIsUploading(false);
    setIsSaving(false);
  };

  const handleDelete = async (member: any) => {
    const confirmed = window.confirm(`Delete ${member.name} from the team?`);
    if (!confirmed) return;

    await deleteTeamMember(member.id);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `team_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('nexyovi_assets')
        .upload(`team/${fileName}`, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('nexyovi_assets').getPublicUrl(`team/${fileName}`);
      setForm((prev) => ({ ...prev, img: data.publicUrl }));
    } catch (err) {
      console.error('Upload error:', err);
      alert('Photo upload failed. Check console for details.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload: Record<string, any> = {
      name: form.name.trim(),
      role: form.role.trim(),
      bio: form.bio.trim(),
      img: form.img.trim(),
      initials: form.initials.trim().toUpperCase(),
      color: form.color.trim(),
      linkedin: form.linkedin.trim(),
    };

    if (!payload.img) delete payload.img;
    if (!payload.initials) delete payload.initials;
    if (!payload.color) delete payload.color;
    if (!payload.linkedin) delete payload.linkedin;

    try {
      if (editing) {
        await updateTeamMember({ ...editing, ...payload });
      } else {
        await addTeamMember(payload);
      }

      closeEditor();
    } finally {
      setIsSaving(false);
    }
  };

  const previewMember = {
    name: form.name || 'Team Member',
    role: form.role || 'Role title',
    bio: form.bio || 'This preview updates live so the admin can review the profile before saving.',
    img: form.img,
    initials: form.initials || getInitials(form.name || 'Team Member'),
    color: form.color || getColor(form.name || 'Team Member'),
    linkedin: form.linkedin,
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mx-auto max-w-6xl"
      >
        {/* ── Header ── */}
        <div className="mb-8 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={closeEditor}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40 transition-all hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft size={18} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {editing ? 'Edit Team Member' : 'Add Team Member'}
            </h1>
            <p className="mt-0.5 text-sm text-white/40">
              Full profile control for photos, names, roles, bios, and social links
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          {/* ══ FORM ══ */}
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0D1220] to-[#0a0f1a] p-0 md:p-0">
            <form onSubmit={save}>
              {/* Section 1 — Basic Info */}
              <div className="border-b border-white/[0.06] px-6 py-6 md:px-8 md:py-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5A800]/10">
                    <span className="text-[13px] font-black text-[#F5A800]">1</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Basic Info</h3>
                    <p className="text-xs text-white/30">Name, role, and social link</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Full Name — full width */}
                  <div className="space-y-1.5">
                    <label className="ml-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/30">
                      Full Name <span className="text-[#F5A800]">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Yonas Bogale"
                        className="h-12 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 pl-11 text-sm font-semibold text-white outline-none transition-all placeholder:text-white/15 focus:border-[#F5A800]/50 focus:bg-[#0D1220] focus:ring-2 focus:ring-[#F5A800]/15"
                      />
                      <Users size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-[#F5A800]/60" />
                    </div>
                  </div>

                  {/* Role + LinkedIn */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="ml-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/30">
                        Role <span className="text-[#F5A800]">*</span>
                      </label>
                      <input
                        required
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        placeholder="e.g. Chief Technology Officer"
                        className="h-12 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 text-sm font-semibold text-white outline-none transition-all placeholder:text-white/15 focus:border-[#F5A800]/50 focus:bg-[#0D1220] focus:ring-2 focus:ring-[#F5A800]/15"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="ml-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/30">
                        LinkedIn URL
                      </label>
                      <div className="relative">
                        <Linkedin size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0a66c2]/60" />
                        <input
                          value={form.linkedin}
                          onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                          placeholder="https://linkedin.com/in/..."
                          className="h-12 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] pl-11 pr-4 text-sm font-semibold text-white outline-none transition-all placeholder:text-white/15 focus:border-[#F5A800]/50 focus:bg-[#0D1220] focus:ring-2 focus:ring-[#F5A800]/15"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 — Profile Display */}
              <div className="border-b border-white/[0.06] px-6 py-6 md:px-8 md:py-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5A800]/10">
                    <span className="text-[13px] font-black text-[#F5A800]">2</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Profile Display</h3>
                    <p className="text-xs text-white/30">Initials, accent color, and biography</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Initials + Color */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="ml-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/30">
                        Initials
                      </label>
                      <input
                        value={form.initials}
                        onChange={(e) => setForm({ ...form, initials: e.target.value })}
                        placeholder="e.g. YB"
                        maxLength={3}
                        className="h-12 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 text-sm font-bold uppercase tracking-[0.15em] text-white outline-none transition-all placeholder:text-white/15 focus:border-[#F5A800]/50 focus:bg-[#0D1220] focus:ring-2 focus:ring-[#F5A800]/15"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="ml-0.5 mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/30">
                        Accent Color
                      </label>
                      <div className="flex gap-2.5">
                        <div className="relative flex-1">
                          <input
                            value={form.color}
                            onChange={(e) => setForm({ ...form, color: e.target.value })}
                            placeholder="e.g. #8b5cf6"
                            className="h-12 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 pl-10 text-sm font-mono font-semibold text-white outline-none transition-all placeholder:text-white/15 focus:border-[#F5A800]/50 focus:bg-[#0D1220] focus:ring-2 focus:ring-[#F5A800]/15"
                          />
                          <div
                            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 rounded-md border border-white/20"
                            style={{ backgroundColor: form.color || getColor(form.name || 'Team Member') }}
                          />
                        </div>
                      </div>
                      {/* Color swatches */}
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {fallbackColors.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setForm({ ...form, color: c })}
                            className={`h-7 w-7 rounded-lg border-2 transition-all ${
                              form.color.toLowerCase() === c.toLowerCase()
                                ? 'scale-110 border-white ring-2 ring-white/30'
                                : 'border-transparent hover:scale-110'
                            }`}
                            style={{ backgroundColor: c }}
                            title={c}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-1.5">
                    <label className="ml-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/30">
                      Biography <span className="text-[#F5A800]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.bio}
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                      placeholder="Describe the specialist, their background, and what they lead."
                      className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm font-medium leading-relaxed text-white outline-none transition-all placeholder:text-white/15 focus:border-[#F5A800]/50 focus:bg-[#0D1220]"
                    />
                    <div className="flex justify-end">
                      <span className="text-[10px] font-medium text-white/20">{form.bio.length} / 500</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 — Photo */}
              <div className="px-6 py-6 md:px-8 md:py-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10">
                    <ImageIcon size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Photo</h3>
                    <p className="text-xs text-white/30">Upload an image or paste a direct image URL</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-[160px_1fr]">
                  {/* Photo preview */}
                  <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#070B14]">
                    <div className="aspect-[4/5]">
                      {previewMember.img ? (
                        <img src={previewMember.img} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center text-3xl font-black text-white"
                          style={{ backgroundColor: previewMember.color }}
                        >
                          {previewMember.initials}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Upload button */}
                    <label
                      className={`flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border text-sm font-bold uppercase tracking-[0.15em] transition-all ${
                        isUploading
                          ? 'border-white/10 bg-white/5 text-white/30'
                          : 'border-white/[0.08] bg-white/[0.03] text-white/70 hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      {isUploading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <UploadCloud size={16} />
                          Upload Photo
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                        disabled={isUploading}
                      />
                    </label>

                    {/* URL input */}
                    <div className="relative">
                      <input
                        value={form.img}
                        onChange={(e) => setForm({ ...form, img: e.target.value })}
                        placeholder="https://example.com/team-photo.jpg"
                        className="h-12 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 font-mono text-sm text-white outline-none transition-all placeholder:text-white/15 focus:border-[#F5A800]/50 focus:bg-[#0D1220] focus:ring-2 focus:ring-[#F5A800]/15"
                      />
                      {form.img && (
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, img: '' })}
                          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/5 hover:text-red-400"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    {form.img && (
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, img: '' })}
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white/30 transition-colors hover:text-red-400"
                      >
                        <Trash2 size={12} />
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Footer actions ── */}
              <div className="flex items-center justify-between border-t border-white/[0.06] bg-white/[0.01] px-6 py-5 md:px-8">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 text-sm font-bold text-white/40 transition-all hover:border-white/20 hover:text-white"
                >
                  <ArrowLeft size={14} />
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  disabled={isSaving || isUploading}
                  whileHover={{ scale: isSaving || isUploading ? 1 : 1.02 }}
                  whileTap={{ scale: isSaving || isUploading ? 1 : 0.98 }}
                  className="flex h-10 items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#F5A800] to-[#e69900] px-6 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-[#F5A800]/20 transition-all hover:shadow-xl hover:shadow-[#F5A800]/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                >
                  {isSaving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={15} />
                      {editing ? 'Update Member' : 'Create Member'}
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          {/* ══ SIDEBAR — Preview + Notes ══ */}
          <div className="space-y-6">
            {/* Live Card Preview */}
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0D1220] to-[#0a0f1a]">
              {/* Preview header */}
              <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Eye size={16} />
                  </div>
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Live Preview</h3>
                  <p className="text-xs text-white/35">Updates in real-time as you type</p>
                </div>
              </div>

              {/* Preview card — styled like the CompanyLeadership card */}
              <div className="p-5">
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 text-center transition-all">
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full transition-all duration-500"
                    style={{
                      width: previewMember.img ? '40%' : '30%',
                      background: `linear-gradient(to right, transparent, ${previewMember.color || '#F5A800'}, transparent)`,
                    }}
                  />

                  {/* Avatar */}
                  <div className="relative mx-auto mb-4 h-20 w-20">
                    <div
                      className="absolute inset-0 rounded-full opacity-50 blur-xl"
                      style={{ backgroundColor: previewMember.color || '#F5A800' }}
                    />
                    <div
                      className="relative h-full w-full overflow-hidden rounded-full border-2 transition-all duration-300 group-hover:border-opacity-80"
                      style={{ borderColor: `${previewMember.color}40` || '#F5A80040' }}
                    >
                      {previewMember.img ? (
                        <img src={previewMember.img} alt={previewMember.name} className="h-full w-full object-cover" />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center text-xl font-black text-white"
                          style={{ backgroundColor: previewMember.color }}
                        >
                          {previewMember.initials}
                        </div>
                      )}
                    </div>
                  </div>

                  <h4 className="mb-1 text-lg font-black text-white">{previewMember.name}</h4>
                  <p
                    className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
                    style={{ color: previewMember.color }}
                  >
                    {previewMember.role}
                  </p>
                  <p className="mx-auto max-w-[220px] text-xs font-medium leading-relaxed text-white/40">
                    {previewMember.bio}
                  </p>

                  <div className="mt-5 flex items-center justify-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Active
                    </span>
                    {previewMember.linkedin && previewMember.linkedin !== '#' && (
                      <a
                        href={previewMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/40 transition-all hover:border-[#0a66c2]/30 hover:bg-[#0a66c2]/10 hover:text-[#0a66c2]"
                      >
                        <Linkedin size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Publishing Notes */}
            <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0D1220] to-[#0a0f1a] p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5A800]/10">
                  <span className="text-[10px] font-black text-[#F5A800]">i</span>
                </div>
                <h3 className="text-sm font-bold text-white">Publishing Notes</h3>
              </div>
              <div className="space-y-2 text-sm leading-relaxed text-white/35">
                <p>Team updates sync through the shared site context, so changes here propagate anywhere the team data is used.</p>
                <div className="flex items-center gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-xs">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[9px] font-bold text-emerald-400">✓</span>
                  Biographies and photos update live on the Company &rarr; Leadership page.
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Team Management</h1>
          <p className="mt-0.5 text-sm text-white/40">{team.length} specialists active</p>
        </div>
        <button
          onClick={() => open()}
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#F5A800] px-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#d69200]"
        >
          <Plus size={16} />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Total Specialists" value={team.length} accent="#F5A800" />
        <StatCard icon={UserCheck} label="Leadership Roles" value={leadershipCount} accent="#10b981" />
        <StatCard icon={Eye} label="Profiles With Photos" value={withPhotoCount} accent="#3b82f6" />
        <StatCard icon={Linkedin} label="LinkedIn Profiles" value={linkedProfilesCount} accent="#8b5cf6" />
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-[#0D1220] p-4 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role, bio, or LinkedIn..."
              className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#070B14] pl-11 pr-12 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/30 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/35">
            <Briefcase size={14} />
            {filtered.length} shown
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1220]">
        <div className="hidden grid-cols-12 gap-4 border-b border-white/[0.06] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/30 lg:grid">
          <div className="col-span-5">Member</div>
          <div className="col-span-3">Role</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {filtered.length > 0 ? (
          filtered.map((member) => (
            <motion.div
              key={member.id}
              layout
              className="border-b border-white/[0.04] px-5 py-5 transition-colors hover:bg-white/[0.02] last:border-0 lg:px-6"
            >
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-5">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#070B14]">
                      <MemberAvatar member={member} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-base font-bold text-white">{member.name}</div>
                      <div className="mt-1 line-clamp-2 text-sm leading-relaxed text-white/40">
                        {member.bio || 'No biography added yet.'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="text-xs font-bold uppercase tracking-widest text-white/25 lg:hidden">Role</div>
                  <div className="mt-1 text-sm font-semibold text-white/65 lg:mt-0">{member.role}</div>
                </div>

                <div className="lg:col-span-2">
                  <div className="text-xs font-bold uppercase tracking-widest text-white/25 lg:hidden">Status</div>
                  <div className="mt-1 flex items-center gap-2 lg:mt-0">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Active</span>
                  </div>
                </div>

                <div className="flex items-center justify-start gap-2 lg:col-span-2 lg:justify-end">
                  {/* LinkedIn — always visible; click opens link if exists, or opens editor to add one */}
                  {member.linkedin && member.linkedin !== '#' ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-500/10 text-cyan-400 transition-all hover:bg-cyan-500/20"
                      title="Open LinkedIn profile"
                    >
                      <Linkedin size={14} />
                    </a>
                  ) : (
                    <button
                      onClick={() => open(member)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.03] text-white/20 transition-all hover:border-[#0a66c2]/30 hover:bg-[#0a66c2]/10 hover:text-[#0a66c2]"
                      title="Add LinkedIn profile"
                    >
                      <Linkedin size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => open(member)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.03] text-white/40 transition-all hover:border-[#F5A800]/20 hover:bg-[#F5A800]/10 hover:text-[#F5A800]"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(member)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.03] text-white/40 transition-all hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-16 text-center">
            <Users size={32} className="mx-auto mb-3 text-white/10" />
            <div className="text-sm text-white/40">
              {search ? 'No members match your search.' : 'No team members yet.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTeam;
