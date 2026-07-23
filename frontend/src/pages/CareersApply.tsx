import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Loader2, CheckCircle2, Briefcase, User, Mail, Phone, Link, FileText, CheckCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { useToast } from '../context/ToastContext';

const EASE_EXPO = [0.16, 1, 0.3, 1];

const processSteps = [
  { step: '01', title: 'Apply Online', desc: 'Submit your details and resume through this form.' },
  { step: '02', title: 'Initial Screen', desc: 'A 30-min culture & technical screen with a senior engineer.' },
  { step: '03', title: 'Technical Round', desc: 'Take-home project or live pairing session.' },
  { step: '04', title: 'Offer & Onboarding', desc: 'Equipment, onboarding plan, and first day briefing.' },
];

export default function CareersApply() {
  const { addApplication } = useSite();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'Open Application';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio_url: '',
    resume_url: '',
    cover_letter: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addApplication({
        ...form,
        type: 'job',
        role,
        status: 'Pending',
      });
      setSuccess(true);
      toast(`Your application for ${role} has been received. We'll get back to you within 3–5 business days.`, 'success', 'Application Sent');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (name: string) =>
    `w-full h-14 px-5 bg-white/[0.03] border rounded-2xl text-base text-white placeholder:text-white/20 focus:outline-none transition-all duration-200 ${
      focused === name
        ? 'border-[#F5A800]/70 ring-2 ring-[#F5A800]/10 bg-white/[0.05]'
        : 'border-white/10 hover:border-white/20'
    }`;

  return (
    <div className="min-h-screen bg-[#02040a] text-white selection:bg-[#F5A800]/30">
      {/* Full-bleed background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#F5A800]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F5A800]/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* ─── LEFT PANEL ─────────────────────────────────── */}
        <div className="lg:w-[45%] xl:w-[42%] flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-white/[0.01] border-b lg:border-b-0 lg:border-r border-white/5 lg:min-h-screen">
          {/* Back button */}
          <div>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE_EXPO }}
              onClick={() => navigate('/careers')}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors mb-14 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Careers
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_EXPO }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F5A800]/20 bg-[#F5A800]/10 text-[#F5A800] mb-8">
                <Briefcase size={14} />
                <span className="text-xs font-bold uppercase tracking-[0.12em]">Job Application</span>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-[-0.04em] leading-[1.05] mb-4">
                Apply for
              </h1>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-[-0.04em] leading-[1.05] mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">
                {role}
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed font-medium max-w-md">
                Join Nexyovi's elite team and help us deliver world-class engineering solutions from Africa to the world.
              </p>
            </motion.div>
          </div>

          {/* Hiring Process */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE_EXPO }}
            className="mt-16 lg:mt-0"
          >
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/30 mb-8">Hiring Process</p>
            <div className="space-y-6">
              {processSteps.map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center">
                    <span className="text-[10px] font-black text-[#F5A800]">{s.step}</span>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm mb-0.5">{s.title}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust note */}
            <div className="mt-10 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                <span className="text-sm font-bold text-white">We respond to every application</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                We take every application seriously and aim to respond within 3–5 business days, regardless of the outcome.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ─── RIGHT PANEL (FORM) ──────────────────────────── */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16 py-16">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE_EXPO }}
                className="text-center max-w-md mx-auto"
              >
                <div className="w-24 h-24 mx-auto rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-8">
                  <CheckCircle2 size={48} className="text-emerald-400" />
                </div>
                <h2 className="text-4xl font-black tracking-[-0.04em] mb-4">Application Received!</h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-4">
                  Thank you for applying for <span className="text-white font-bold">{role}</span>. Our team will review your application and get back to you shortly.
                </p>
                <p className="text-slate-600 text-sm mb-10">We typically respond within 3–5 business days.</p>
                <button
                  onClick={() => navigate('/careers')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Careers
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE_EXPO }}
                className="w-full max-w-xl"
              >
                <div className="mb-10">
                  <h2 className="text-2xl font-black tracking-[-0.03em] mb-1">Your Details</h2>
                  <p className="text-slate-500 text-sm">Fields marked with <span className="text-[#F5A800]">*</span> are required</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-white/60 uppercase tracking-wider mb-2.5">
                      <User size={12} /> Full Name <span className="text-[#F5A800]">*</span>
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      className={inputClass('name')}
                      placeholder="e.g. Abebe Kebede"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-white/60 uppercase tracking-wider mb-2.5">
                        <Mail size={12} /> Email Address <span className="text-[#F5A800]">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        className={inputClass('email')}
                        placeholder="abebe@example.com"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-white/60 uppercase tracking-wider mb-2.5">
                        <Phone size={12} /> Phone Number
                      </label>
                      <input
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused(null)}
                        className={inputClass('phone')}
                        placeholder="+251 911 234 567"
                      />
                    </div>
                  </div>

                  {/* Resume + Portfolio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-white/60 uppercase tracking-wider mb-2.5">
                        <FileText size={12} /> Resume / CV Link <span className="text-[#F5A800]">*</span>
                      </label>
                      <input
                        required
                        type="url"
                        value={form.resume_url}
                        onChange={e => setForm({ ...form, resume_url: e.target.value })}
                        onFocus={() => setFocused('resume')}
                        onBlur={() => setFocused(null)}
                        className={inputClass('resume')}
                        placeholder="Drive / Dropbox link"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-white/60 uppercase tracking-wider mb-2.5">
                        <Link size={12} /> Portfolio / LinkedIn
                      </label>
                      <input
                        type="url"
                        value={form.portfolio_url}
                        onChange={e => setForm({ ...form, portfolio_url: e.target.value })}
                        onFocus={() => setFocused('portfolio')}
                        onBlur={() => setFocused(null)}
                        className={inputClass('portfolio')}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-white/60 uppercase tracking-wider mb-2.5">
                      <FileText size={12} /> Cover Letter / Why Nexyovi? <span className="text-[#F5A800]">*</span>
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.cover_letter}
                      onChange={e => setForm({ ...form, cover_letter: e.target.value })}
                      onFocus={() => setFocused('cover')}
                      onBlur={() => setFocused(null)}
                      className={`w-full p-5 bg-white/[0.03] border rounded-2xl text-base text-white placeholder:text-white/20 focus:outline-none transition-all duration-200 resize-y min-h-[160px] ${
                        focused === 'cover'
                          ? 'border-[#F5A800]/70 ring-2 ring-[#F5A800]/10 bg-white/[0.05]'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                      placeholder="Tell us about your background, most impactful projects, and why this role excites you..."
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 h-16 bg-[#F5A800] text-slate-950 font-black text-lg rounded-2xl hover:bg-[#FFD166] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={22} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Submit Application
                        </>
                      )}
                    </button>
                    <p className="text-center text-slate-600 text-xs mt-4">
                      We respond to every application within 3–5 business days.
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
