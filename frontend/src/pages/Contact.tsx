import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Briefcase, Building2, CalendarCheck, Check, Copy, Loader2, Mail, MapPin, MessageSquare, Phone, Send, User } from "lucide-react";
import React from "react";
import WorldMap from "../components/WorldMap";
import { useSite } from "../context/SiteContext";
import { EASE_EXPO, revealUp, staggerContainer } from "../lib/animations";

export default function Contact() {
  const { settings, addMessage } = useSite();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [copiedContact, setCopiedContact] = React.useState<string | null>(null);
  const formSectionRef = React.useRef<HTMLDivElement | null>(null);
  const nameInputRef = React.useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const report = {
      ...formData,
      status: 'unread'
    };

    setTimeout(() => {
      addMessage(report);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const copyContact = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedContact(value);
      setTimeout(() => setCopiedContact(null), 1600);
    } catch {
      setCopiedContact(null);
    }
  };

  // Auto-scroll to form if URL has #inquiry hash
  React.useEffect(() => {
    if (window.location.hash === '#inquiry') {
      setTimeout(() => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => nameInputRef.current?.focus(), 550);
      }, 300);
    }
  }, []);

  const openInquiry = (type: "project" | "consultation") => {
    setFormData((current) => ({
      ...current,
      service: type === "project" ? (current.service || "software") : "consulting",
      message: current.message || (
        type === "project"
          ? "I'd like to start a new project with Nexyovi. Please help me scope the technical requirements, timeline, and next steps."
          : "I'd like to book a strategy call with Nexyovi to discuss our technical goals, challenges, and recommended roadmap."
      )
    }));

    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => nameInputRef.current?.focus(), 550);
  };

  return (
    <div className="bg-[#02040a] min-h-screen overflow-hidden selection:bg-[#F5A800]/30 text-white">

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-24 border-b border-white/[0.05]">
        <div className="container max-w-5xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[0.95] tracking-[-0.03em] mb-8 text-white">
              Let's Build Something <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">Exceptional.</span>
            </motion.h1>

            <motion.p variants={revealUp} className="text-white/60 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
              Engage our elite engineering team to build, secure, or scale your mission-critical enterprise systems.
            </motion.p>

            <motion.div variants={revealUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => openInquiry("project")}
                className="group btn-gold w-full sm:w-auto text-[15px] font-bold px-10 py-5"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Submit Project Brief
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => openInquiry("consultation")}
                className="group inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border border-white/20 bg-white/5 text-white text-[15px] font-bold hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
              >
                <CalendarCheck size={16} className="text-[#F5A800]" />
                Book Strategy Call
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT INFO — Compact, no boxes */}
      <section className="relative z-10 -mt-12 container max-w-4xl mx-auto mb-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          {[
            { icon: Mail, title: "Email", text: "info@nexyovi.com", href: "mailto:info@nexyovi.com", action: "Email" },
            { icon: Phone, title: "Phone", text: settings.phone, href: `tel:${settings.phone}`, action: "Call" },
            { icon: MapPin, title: "Headquarters", text: settings.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address || "Addis Ababa, Ethiopia")}`, action: "Map" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: EASE_EXPO }}
            >
              <div className="flex items-center gap-3 mb-2">
                <item.icon size={14} className="text-[#F5A800] shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{item.title}</span>
              </div>
              <div className="text-[15px] font-bold text-white mb-3 truncate">{item.text}</div>
              <div className="flex items-center gap-5">
                <a
                  href={item.href}
                  target={item.title === "Headquarters" ? "_blank" : undefined}
                  rel={item.title === "Headquarters" ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-white/50 hover:text-[#F5A800] transition-colors"
                >
                  {item.action}
                  <ArrowUpRight size={10} />
                </a>
                <button
                  type="button"
                  onClick={() => copyContact(item.text)}
                  className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-white/50 hover:text-[#F5A800] transition-colors"
                >
                  {copiedContact === item.text ? <Check size={10} className="text-[#10b981]" /> : <Copy size={10} />}
                  {copiedContact === item.text ? "Copied" : "Copy"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FORM SECTION — Creamy White */}
      <section ref={formSectionRef} className="scroll-mt-24 pb-32 bg-[#FCFBF8]">
        <div className="container max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className="bg-white border border-slate-200 rounded-[32px] p-8 md:p-14 relative overflow-hidden"
          >
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-[-0.03em] mb-4">Project Inquiry</h2>
              <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-lg mx-auto">
                Submit your project specifications. Our engineering leadership will evaluate and respond within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">Full Name *</label>
                  <div className="relative">
                    <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      ref={nameInputRef}
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-[#F5A800] focus:bg-white transition-all font-medium placeholder:text-slate-400"
                      placeholder="Solomon Dereje"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">Work Email *</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-[#F5A800] focus:bg-white transition-all font-medium placeholder:text-slate-400"
                      placeholder="nexyovi@company.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">Organization</label>
                  <div className="relative">
                    <Building2 size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-[#F5A800] focus:bg-white transition-all font-medium placeholder:text-slate-400"
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">Service Required</label>
                  <div className="relative">
                    <Briefcase size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 pl-14 pr-10 focus:outline-none focus:border-[#F5A800] focus:bg-white transition-all font-medium appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 20px center' }}
                    >
                      <option value="" className="bg-white text-slate-400">Select capability</option>
                      <option value="software" className="bg-white text-slate-900">Enterprise Software Engineering</option>
                      <option value="ai" className="bg-white text-slate-900">AI & Predictive Analytics</option>
                      <option value="cybersecurity" className="bg-white text-slate-900">Cyber Defense Systems</option>
                      <option value="cloud" className="bg-white text-slate-900">Cloud Architecture</option>
                      <option value="networking" className="bg-white text-slate-900">Networking & Infrastructure</option>
                      <option value="app-dev" className="bg-white text-slate-900">Mobile Application Dev</option>
                      <option value="consulting" className="bg-white text-slate-900">Strategic Consulting</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">Project Details</label>
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-5 top-5 text-slate-300" />
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-5 pl-14 pr-5 focus:outline-none focus:border-[#F5A800] focus:bg-white transition-all font-medium placeholder:text-slate-400 h-40 resize-none"
                    placeholder="Describe your technical requirements, goals, and constraints."
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="group btn-gold w-full h-[60px] flex items-center justify-center rounded-2xl mt-4"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-[15px] font-bold">
                  {isSubmitting ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : isSuccess ? (
                    <Check size={20} />
                  ) : (
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  )}
                  <span>
                    {isSubmitting ? 'Submitting...' : isSuccess ? 'Inquiry Sent' : 'Submit Inquiry'}
                  </span>
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* MAP SECTION — Full-bleed map with overlaid HQ info */}
      <section className="relative min-h-[65vh] bg-[#02040a] border-t border-white/[0.05] overflow-hidden">

        {/* Full-bleed map background */}
        <div className="absolute inset-0 z-[1]">
          <WorldMap />
        </div>

        {/* Gradient vignette for readability */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#02040a]/95 via-[#02040a]/70 to-[#02040a]/30 pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#02040a]/60 via-transparent to-[#02040a]/30 pointer-events-none" />

        {/* Content overlay */}
        <div className="relative z-10 container max-w-[1000px] mx-auto px-6 min-h-[55vh] flex flex-col justify-center">

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-white leading-[1.05]">
              Global <span className="text-[#F5A800]">Operations.</span>
            </h2>
          </motion.div>

          {/* HQ info card — floating on the left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_EXPO }}
            className="max-w-sm"
          >
            <div className="bg-[#0a0a0e]/80 backdrop-blur-xl border border-white/[0.08] p-7 md:p-8 rounded-2xl shadow-2xl">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#F5A800]/10 border border-[#F5A800]/20 text-[#F5A800] text-[9px] font-black uppercase tracking-widest mb-4">
                Headquarters
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
                Addis Ababa.
              </h3>
              <p className="text-white/50 text-[13px] font-medium leading-relaxed mb-6">
                The core center of company leadership, engineering operations, and technical innovation.
              </p>
              <div className="pt-5 border-t border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  </span>
                  <span className="text-white/60 text-[10px] font-bold font-mono tracking-[0.22em]">
                    ACTIVE / GMT+3
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
