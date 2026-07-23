import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface ApplicationModalProps {
  type: 'job' | 'internship';
  jobTitle?: string;
  onClose: () => void;
}

export default function ApplicationModal({ type, jobTitle, onClose }: ApplicationModalProps) {
  const { addApplication } = useSite();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addApplication({
        ...form,
        type,
        role: jobTitle || 'Internship Program',
        status: 'Pending',
      });
      setSuccess(true);
      setTimeout(() => onClose(), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#02040a]/80 backdrop-blur-md"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0A0D18] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          {success ? (
            <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <CheckCircle2 size={64} className="text-emerald-500 mb-6" />
              <h2 className="text-2xl font-black text-white mb-2">Application Received!</h2>
              <p className="text-slate-400">Thank you for applying. Our team will review your submission and get back to you shortly.</p>
            </div>
          ) : (
            <>
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0D18]/90 backdrop-blur-sm">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Apply for {jobTitle || 'Internship Program'}
                  </h2>
                  <p className="text-xs text-white/50 mt-0.5">Please fill out all required fields.</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full h-12 px-4 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 focus:ring-1 focus:ring-[#F5A800]/20 transition-colors"
                      placeholder="e.g. Abebe Kebede"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full h-12 px-4 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                      placeholder="abebe@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Phone Number</label>
                    <input
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full h-12 px-4 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                      placeholder="+251 911 234 567"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Resume / CV Link *</label>
                    <input
                      required
                      type="url"
                      value={form.resume_url}
                      onChange={e => setForm({ ...form, resume_url: e.target.value })}
                      className="w-full h-12 px-4 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                      placeholder="Link to Google Drive, Dropbox, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Portfolio / LinkedIn URL</label>
                    <input
                      type="url"
                      value={form.portfolio_url}
                      onChange={e => setForm({ ...form, portfolio_url: e.target.value })}
                      className="w-full h-12 px-4 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Cover Letter / Why Nexyovi? *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.cover_letter}
                      onChange={e => setForm({ ...form, cover_letter: e.target.value })}
                      className="w-full p-4 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A800]/50 transition-colors resize-y min-h-[120px]"
                      placeholder="Tell us briefly about your background and why you're a great fit..."
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#F5A800] text-black font-bold rounded-xl hover:bg-[#FFD166] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
