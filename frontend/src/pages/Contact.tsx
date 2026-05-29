import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Briefcase, Building2, CalendarCheck, Check, Copy, Loader2, Mail, MapPin, MessageSquare, Phone, Send, User, Crosshair } from "lucide-react";
import React from "react";
import WorldMap from "../components/WorldMap";
import { useSite } from "../context/SiteContext";
import { staggerContainer, EASE_EXPO, revealUp } from "../lib/animations";

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

    // Create intelligence report
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
    <div className="bg-[#02040a] text-white min-h-screen overflow-hidden selection:bg-[#F5A800]/30">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04]">
        {/* Background elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#F5A800]/10 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 opacity-[0.03] animate-grid-drift"
            style={{
              backgroundImage: `linear-gradient(rgba(37,99,235,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.6) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }} />
        </div>

        <div className="container relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <motion.div variants={revealUp} className="mb-8">
              <div className="badge">
                <Crosshair size={12} />
                Secure Communications Channel
              </div>
            </motion.div>

            <motion.h1 variants={revealUp} className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[0.95] tracking-tight mb-8">
              Initiate <span className="text-gradient-aurora">Protocol.</span>
            </motion.h1>

            <motion.p variants={revealUp} className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
              Engage our elite engineering team to build, secure, or scale your mission-critical enterprise systems. 
            </motion.p>

            <motion.div variants={revealUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => openInquiry("project")}
                className="btn-primary w-full sm:w-auto group"
              >
                Submit Project Brief
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => openInquiry("consultation")}
                className="btn-ghost w-full sm:w-auto group"
              >
                Book Strategy Call
                <CalendarCheck size={15} className="text-[#FFD166] transition-transform group-hover:scale-110" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="relative z-10 -mt-12 container max-w-5xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Mail, title: "Secure comms", text: "info@nexyovi.com", href: "mailto:info@nexyovi.com", action: "Email" },
            { icon: Phone, title: "Global Command", text: settings.phone, href: `tel:${settings.phone}`, action: "Call" },
            { icon: MapPin, title: "HQ Coordinates", text: settings.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address || "Addis Ababa, Ethiopia")}`, action: "Map" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: EASE_EXPO }}
              className="card-hud p-6 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center text-[#FFD166] mb-4 group-hover:bg-[#F5A800]/20 transition-colors">
                <item.icon size={18} />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F5A800] mb-1">{item.title}</div>
              <div className="text-[15px] font-bold text-white mb-4 truncate">{item.text}</div>
              <div className="flex items-center gap-4">
                <a
                  href={item.href}
                  target={item.title === "HQ Coordinates" ? "_blank" : undefined}
                  rel={item.title === "HQ Coordinates" ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                >
                  {item.action}
                  <ArrowUpRight size={12} />
                </a>
                <button
                  type="button"
                  onClick={() => copyContact(item.text)}
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                >
                  {copiedContact === item.text ? <Check size={12} className="text-[#10b981]" /> : <Copy size={12} />}
                  {copiedContact === item.text ? "Copied" : "Copy"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FORM SECTION */}
      <section ref={formSectionRef} className="section-cinematic scroll-mt-20">
        <div className="container max-w-3xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className="card-hud p-8 md:p-12"
          >
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Transmission Interface</h2>
              <p className="text-[#9CA3AF] text-sm font-medium leading-relaxed">
                Submit your project specifications. Our engineering leadership will evaluate and respond within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/70">Operative Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      ref={nameInputRef}
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input pl-11"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/70">Secure Comms (Email)</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input pl-11"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/70">Organization</label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="input pl-11"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/70">Mission Type</label>
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="input pl-11 appearance-none cursor-pointer text-white/80"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                    >
                      <option value="" className="bg-[#0b1020] text-[#6B7280]">Select capability required</option>
                      <option value="cybersecurity" className="bg-[#0b1020] text-white">Cyber Defense Systems</option>
                      <option value="software" className="bg-[#0b1020] text-white">Enterprise Software Engineering</option>
                      <option value="ai" className="bg-[#0b1020] text-white">AI & Predictive Analytics</option>
                      <option value="networking" className="bg-[#0b1020] text-white">Networking & Infrastructure</option>
                      <option value="app-dev" className="bg-[#0b1020] text-white">Mobile Application Dev</option>
                      <option value="consulting" className="bg-[#0b1020] text-white">Strategic Consulting</option>
                      <option value="cloud" className="bg-[#0b1020] text-white">Cloud Architecture</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/70">Mission Details</label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-4 top-4 text-white/30" />
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input pl-11 h-40 resize-none"
                    placeholder="Describe your technical requirements, goals, and constraints."
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full btn-primary h-14"
              >
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : isSuccess ? (
                  <Check size={18} />
                ) : (
                  <Send size={18} />
                )}
                <span>
                  {isSubmitting ? 'Encrypting & Transmitting...' : isSuccess ? 'Transmission Confirmed' : 'Transmit Brief'}
                </span>
              </motion.button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* MAP SECTION */}
      <section className="section-cinematic border-t border-white/[0.04] bg-[#02040a]">
        <div className="container max-w-[1400px]">
          <div className="mb-16 text-center">
             <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Global <span className="text-gradient">Operations.</span></h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 card-hud p-8"
            >
              <div className="badge mb-6">HQ</div>
              <h3 className="text-2xl font-black text-white mb-4">Addis Ababa.</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed mb-8">
                The core center of company leadership, mission-critical operations, and technical innovation.
              </p>
              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-white/60 text-xs font-bold font-mono">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_10px_#10b981]" />
                  ACTIVE / GMT+3
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-6 filter sepia-[0.3] hue-rotate-[190deg] saturate-[1.5] contrast-[1.2] opacity-80">
              <WorldMap />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 card-hud p-8"
            >
              <div className="badge-cyan mb-6">HUB</div>
              <h3 className="text-2xl font-black text-white mb-4">Miami.</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed mb-8">
                Representing our international developers, remote technical teams, and global support network.
              </p>
              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-white/60 text-xs font-bold font-mono">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_10px_#10b981]" />
                  ACTIVE / EST
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
