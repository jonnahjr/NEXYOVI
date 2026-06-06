import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Briefcase,
  Edit2,
  ExternalLink,
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
        className="mx-auto max-w-6xl space-y-6"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={closeEditor}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40 transition-all hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {editing ? 'Edit Team Member' : 'Add Team Member'}
            </h1>
            <p className="mt-0.5 text-sm text-white/40">
              Full profile control for photos, names, roles, bios, and social links
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1220]">
            <form onSubmit={save} className="space-y-8 p-6 md:p-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-widest text-white/30">
                    Full Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Yonas Bogale"
                    className="h-11 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 text-sm font-semibold text-white outline-none transition-all focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-widest text-white/30">
                    Role
                  </label>
                  <input
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Chief Technology Officer"
                    className="h-11 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 text-sm font-semibold text-white outline-none transition-all focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-widest text-white/30">
                    LinkedIn URL
                  </label>
                  <input
                    value={form.linkedin}
                    onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="h-11 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 text-sm font-semibold text-white outline-none transition-all focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-widest text-white/30">
                    Initials
                  </label>
                  <input
                    value={form.initials}
                    onChange={(e) => setForm({ ...form, initials: e.target.value })}
                    placeholder="e.g. YB"
                    className="h-11 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 text-sm font-semibold uppercase text-white outline-none transition-all focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-widest text-white/30">
                    Accent Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                      placeholder="e.g. #8b5cf6"
                      className="h-11 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 text-sm font-semibold text-white outline-none transition-all focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20"
                    />
                    <div
                      className="h-11 w-11 shrink-0 rounded-xl border border-white/[0.08]"
                      style={{ backgroundColor: form.color || getColor(form.name || 'Team Member') }}
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-widest text-white/30">
                    Bio
                  </label>
                  <textarea
                    required
                    rows={7}
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    placeholder="Describe the specialist, background, and what they lead."
                    className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm font-medium leading-relaxed text-white outline-none transition-all focus:border-[#F5A800]/50"
                  />
                </div>
              </div>

              <div className="space-y-4 border-t border-white/[0.06] pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5A800]/10 text-[#F5A800]">
                    <ImageIcon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Photo Control</h3>
                    <p className="text-xs text-white/35">Upload an image or paste a direct image URL</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr]">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#070B14]">
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
                    <label
                      className={`flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border text-sm font-bold uppercase tracking-widest transition-all ${
                        isUploading
                          ? 'border-white/10 bg-white/10 text-white/40'
                          : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      <UploadCloud size={16} />
                      {isUploading ? 'Uploading...' : 'Upload Photo'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                        disabled={isUploading}
                      />
                    </label>
                    <input
                      value={form.img}
                      onChange={(e) => setForm({ ...form, img: e.target.value })}
                      placeholder="https://example.com/team-photo.jpg"
                      className="h-11 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 font-mono text-sm text-white outline-none transition-all focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, img: '' })}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/35 transition-colors hover:text-white/70"
                    >
                      <X size={14} />
                      Remove Photo
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/[0.06] pt-6">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="h-10 px-6 text-sm font-bold text-white/40 transition-colors hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="flex h-10 items-center gap-2 rounded-xl bg-[#F5A800] px-6 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#d69200] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={16} />
                  {isSaving ? 'Saving...' : editing ? 'Update Member' : 'Create Member'}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1220] p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Eye size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Live Preview</h3>
                  <p className="text-xs text-white/35">Review the card before publishing it to the site</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#070B14]">
                  <div className="aspect-[4/3]">
                    {previewMember.img ? (
                      <img src={previewMember.img} alt={previewMember.name} className="h-full w-full object-cover object-top" />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center text-5xl font-black text-white"
                        style={{ backgroundColor: previewMember.color }}
                      >
                        {previewMember.initials}
                      </div>
                    )}
                  </div>
                </div>
                <div className="pt-4">
                  <div className="mb-1 text-lg font-black text-white">{previewMember.name}</div>
                  <div className="mb-3 text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: previewMember.color }}>
                    {previewMember.role}
                  </div>
                  <p className="text-sm leading-relaxed text-white/45">{previewMember.bio}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Active
                    </span>
                    {previewMember.linkedin && (
                      <a
                        href={previewMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-all hover:border-[#F5A800]/30 hover:text-[#F5A800]"
                      >
                        <Linkedin size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0D1220] p-6">
              <h3 className="mb-2 text-sm font-bold text-white">Publishing Notes</h3>
              <p className="text-sm leading-relaxed text-white/40">
                Team updates sync through the shared site context, so changes here propagate anywhere the team data is used.
              </p>
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
                  {member.linkedin && member.linkedin !== '#' && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.03] text-white/40 transition-all hover:border-cyan-400/20 hover:bg-cyan-500/10 hover:text-cyan-400"
                    >
                      <ExternalLink size={14} />
                    </a>
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
