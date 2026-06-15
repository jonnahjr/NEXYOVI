import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Briefcase, Building2, CalendarCheck, Check, Copy, Loader2, Mail, MapPin, MessageSquare, Phone, Send, User } from "lucide-react";
import React from "react";
import WorldMap from "../components/WorldMap";
import { useSite } from "../context/SiteContext";
import { EASE_EXPO, revealUp, staggerContainer } from "../lib/animations";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { sanitizeText, sanitizeEmail, sanitizeFormData, validateFormData, containsXssPattern } from "../lib/sanitize";

export default function Contact() {
  const { settings, siteContent, addMessage } = useSite();

  // ── Hero content from admin siteContent with fallback defaults ───
  const contactHero = siteContent?.contactHero || {};
  const heroHeadline = contactHero.headline || "Let's Build Something Exceptional.";
  const heroDescription = contactHero.description || 'Engage our elite engineering team to build, secure, or scale your mission-critical enterprise systems.';
  const heroPrimaryCTA = contactHero.primaryCTA || 'Submit Project Brief';

  // Split headline into first part + last word for gold gradient accent
  const headlineParts = heroHeadline.trim().split(/\s+/);
  const lastWord = headlineParts.pop() || '';
  const headlineStart = headlineParts.join(' ');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [copiedContact, setCopiedContact] = React.useState<string | null>(null);
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
  const formSectionRef = React.useRef<HTMLDivElement | null>(null);
  const nameInputRef = React.useRef<HTMLInputElement | null>(null);
  const honeypotRef = React.useRef<HTMLInputElement | null>(null);
  const [submissionCount, setSubmissionCount] = React.useState(0);
  const [isSpam, setIsSpam] = React.useState(false);
  const turnstileRef = React.useRef<HTMLDivElement | null>(null);
  const turnstileWidgetId = React.useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = React.useState<string>('');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    honeypot: '' // Hidden field for bot detection
  });

  // 🔒 Input sanitization handlers
  const handleInputChange = (field: string, value: string) => {
    // Sanitize in real-time as user types
    let sanitized: string;
    switch (field) {
      case 'email':
        sanitized = sanitizeEmail(value);
        break;
      case 'name':
      case 'company':
        sanitized = sanitizeText(value, 100);
        break;
      case 'phone':
        sanitized = sanitizeText(value, 30);
        break;
      case 'message':
        sanitized = sanitizeText(value, 5000);
        break;
      default:
        sanitized = sanitizeText(value, 200);
    }
    setFormData(prev => ({ ...prev, [field]: sanitized }));
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  // 🔒 Spam detection: honeypot + submission rate + XSS patterns
  const detectSpam = (data: Record<string, any>): boolean => {
    // Honeypot: if the hidden field is filled, it's a bot
    if (data.honeypot) return true;

    // Rate limiting: max 3 submissions per session
    if (submissionCount >= 3) return true;

    // Check for XSS patterns in ALL text fields
    for (const value of Object.values(data)) {
      if (typeof value === 'string' && containsXssPattern(value)) {
        return true;
      }
    }

    // Check for common spam patterns
    const message = data.message || '';
    const spamPatterns = [
      /\b(viagra|cialis|casino|cryptocurrency|free money|work from home|earn \$|click here|act now|limited time)\b/i,
      /\b(https?:\/\/[^\s]+){3,}/i, // More than 3 URLs
      /[A-Z]{10,}/, // All caps words (10+ chars)
      /(.)\1{20,}/, // Repeated characters (20+)
    ];

    return spamPatterns.some(pattern => pattern.test(message));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🔒 Validate and sanitize all form data before submission
    const sanitized = sanitizeFormData(formData);

    // 🔒 Spam detection
    if (detectSpam(sanitized)) {
      console.warn('[SPAM_DETECTED] Form submission blocked');
      setIsSpam(true);
      setIsSubmitting(false);
      setTimeout(() => setIsSpam(false), 5000);
      return;
    }

    // 🔒 Validate form fields with server-side rules
    const errors = validateFormData(sanitized, {
      name: { required: true, maxLength: 100 },
      email: { required: true, email: true, maxLength: 320 },
      company: { maxLength: 200 },
      message: { required: true, maxLength: 5000 },
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    // Remove honeypot field before submission
    const { honeypot, ...cleanData } = sanitized;

    // Validate Turnstile token if Turnstile is active
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if (siteKey && !turnstileToken) {
      setFormErrors({ ...errors, turnstile: 'Please complete the security check' });
      setIsSubmitting(false);
      return;
    }

    const report = {
      ...cleanData,
      status: 'unread',
      cf_turnstile_token: turnstileToken || undefined,
      turnstile_passed: !!turnstileToken
    };

    // Submit to dedicated /api/contact endpoint (saves message + sends email)
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    })
      .then(r => r.json())
      .then(data => {
        if (data.emailError) {
          console.warn('[CONTACT] Message saved but email failed:', data.emailError);
        } else if (data.emailSent) {
          console.log('[CONTACT] Message saved and email sent successfully');
        }
        setSubmissionCount(prev => prev + 1);
        setTurnstileToken('');
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '', honeypot: '' });
        setFormErrors({});
        setTimeout(() => setIsSuccess(false), 5000);
      })
      .catch(err => {
        console.error('[CONTACT] Submission error:', err);
        setIsSubmitting(false);
        setFormErrors({ submit: 'Failed to send message. Please try again.' });
      });
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

  // 🔒 Load Turnstile widget dynamically
  React.useEffect(() => {
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if (!siteKey || !turnstileRef.current) return;

    // Load Turnstile script if not already loaded
    if (!document.querySelector('script[src*="turnstile/v0/api.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        renderTurnstile(siteKey);
      };
      document.head.appendChild(script);
    } else if (typeof window.turnstile !== 'undefined') {
      renderTurnstile(siteKey);
    }

    function renderTurnstile(key: string) {
      if (turnstileWidgetId.current) {
        window.turnstile.remove(turnstileWidgetId.current);
      }
      if (turnstileRef.current) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: key,
          theme: 'light',
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          'expired-callback': () => {
            setTurnstileToken('');
          },
        });
      }
    }

    return () => {
      if (turnstileWidgetId.current && typeof window.turnstile !== 'undefined') {
        window.turnstile.remove(turnstileWidgetId.current);
      }
    };
  }, []);

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
      <section className="relative min-h-[65vh] sm:min-h-[75vh] md:min-h-[90vh] flex flex-col justify-center pt-24 sm:pt-32 pb-16 sm:pb-24 border-b border-white/[0.05]">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            <motion.h1 variants={revealUp} className="text-[clamp(32px,10vw,80px)] font-black leading-[0.95] tracking-[-0.03em] mb-4 sm:mb-8 text-white">
              {headlineStart && <>{headlineStart} <br /></>}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A800] via-[#FFD166] to-[#F5A800]">{lastWord}</span>
            </motion.h1>

            <motion.p variants={revealUp} className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-8 sm:mb-12 px-2">
              {heroDescription}
            </motion.p>

            <motion.div variants={revealUp} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => openInquiry("project")}
                className="group btn-gold text-[13px] sm:text-[15px] font-bold px-6 sm:px-10 py-3 sm:py-5"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {heroPrimaryCTA}
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => openInquiry("consultation")}
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-3 sm:py-5 rounded-full border border-white/20 bg-white/5 text-white text-[13px] sm:text-[15px] font-bold hover:bg-white/10 transition-all duration-300"
              >
                <CalendarCheck size={16} className="text-[#F5A800]" />
                Book Call
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT INFO — Compact, no boxes */}
      <section className="relative z-10 -mt-8 sm:-mt-12 container max-w-4xl mx-auto mb-16 sm:mb-24 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-x-8 md:gap-y-6">
          {[
            { icon: Mail, title: "Email", text: settings.email || 'info@nexyovi.com', href: `mailto:${settings.email || 'info@nexyovi.com'}`, action: "Email" },
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
      <section ref={formSectionRef} className="scroll-mt-24 pb-16 sm:pb-24 md:pb-32 bg-[#FCFBF8]">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className="bg-white border border-slate-200 rounded-[20px] sm:rounded-[28px] md:rounded-[32px] p-6 sm:p-8 md:p-14 relative overflow-hidden"
          >
            <div className="mb-8 sm:mb-10 md:mb-12 text-center">
              <h2 className="text-[clamp(24px,6vw,40px)] font-black text-slate-950 tracking-[-0.03em] mb-2 sm:mb-4">Project Inquiry</h2>
              <p className="text-slate-500 text-[13px] sm:text-[15px] font-medium leading-relaxed max-w-lg mx-auto">
                Submit your project specifications. Our engineering leadership will evaluate and respond within 24 hours.
              </p>
            </div>

            {/* Spam alert */}
            {isSpam && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium text-center">
                Your submission was flagged as spam. If you believe this is an error, please email us directly at{' '}
                <a href="mailto:info@nexyovi.com" className="underline font-bold">info@nexyovi.com</a>.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
              {/* 🔒 Honeypot field - hidden from users, visible to bots */}
              <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
                <label htmlFor="honeypot">Leave this empty</label>
                <input
                  ref={honeypotRef}
                  id="honeypot"
                  name="honeypot"
                  type="text"
                  value={formData.honeypot}
                  onChange={(e) => handleInputChange('honeypot', e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">Full Name *</label>
                  <div className="relative">
                    <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      ref={nameInputRef}
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full bg-slate-50 border text-slate-900 rounded-2xl py-3 sm:py-4 pl-12 sm:pl-14 pr-4 sm:pr-5 focus:outline-none focus:border-[#F5A800] focus:bg-white transition-all font-medium placeholder:text-slate-400 text-sm sm:text-base ${
                        formErrors.name ? 'border-red-400 bg-red-50' : 'border-slate-200'
                      }`}
                      placeholder="Solomon Dereje"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{formErrors.name}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">Work Email *</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      required
                      type="email"
                      maxLength={320}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full bg-slate-50 border text-slate-900 rounded-2xl py-3 sm:py-4 pl-12 sm:pl-14 pr-4 sm:pr-5 focus:outline-none focus:border-[#F5A800] focus:bg-white transition-all font-medium placeholder:text-slate-400 text-sm sm:text-base ${
                        formErrors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'
                      }`}
                      placeholder="nexyovi@company.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">Phone Number</label>
                  <div className={`relative w-full bg-slate-50 border rounded-2xl py-3 sm:py-4 pl-4 sm:pl-5 pr-4 sm:pr-5 transition-all focus-within:bg-white focus-within:border-[#F5A800] ${
                    formErrors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200'
                  }`}>
                    <PhoneInput
                      international
                      defaultCountry="ET"
                      value={formData.phone}
                      onChange={(value) => handleInputChange('phone', value || '')}
                      className="phone-input-custom text-slate-900 font-medium text-sm sm:text-base placeholder:text-slate-400"
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">Organization</label>
                  <div className="relative">
                    <Building2 size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      maxLength={200}
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className={`w-full bg-slate-50 border text-slate-900 rounded-2xl py-3 sm:py-4 pl-12 sm:pl-14 pr-4 sm:pr-5 focus:outline-none focus:border-[#F5A800] focus:bg-white transition-all font-medium placeholder:text-slate-400 text-sm sm:text-base ${
                        formErrors.company ? 'border-red-400 bg-red-50' : 'border-slate-200'
                      }`}
                      placeholder="Company Name"
                    />
                    {formErrors.company && (
                      <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{formErrors.company}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">Service Required</label>
                  <div className="relative">
                    <Briefcase size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                    <select
                      value={formData.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-3 sm:py-4 pl-12 sm:pl-14 pr-8 sm:pr-10 focus:outline-none focus:border-[#F5A800] focus:bg-white transition-all font-medium appearance-none cursor-pointer text-sm sm:text-base"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
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
              </div>              {/* 🔒 Cloudflare Turnstile (CAPTCHA alternative) - only rendered when API key is set */}
              {import.meta.env.VITE_TURNSTILE_SITE_KEY && (
                <div
                  ref={turnstileRef}
                  className="cf-turnstile flex justify-center my-3 sm:my-4"
                />
              )}
              {import.meta.env.VITE_TURNSTILE_SITE_KEY && !turnstileToken && isSubmitting && (
                <p className="text-red-500 text-xs text-center font-medium">Please complete the security check</p>
              )}

              <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">Project Details</label>
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-5 top-5 text-slate-300" />
                  <textarea
                    required
                    maxLength={5000}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full bg-slate-50 border text-slate-900 rounded-2xl py-4 pl-12 sm:pl-14 pr-4 sm:pr-5 focus:outline-none focus:border-[#F5A800] focus:bg-white transition-all font-medium placeholder:text-slate-400 h-32 sm:h-40 resize-none text-sm sm:text-base ${
                      formErrors.message ? 'border-red-400 bg-red-50' : 'border-slate-200'
                    }`}
                    placeholder="Describe your technical requirements, goals, and constraints."
                  />
                  {formErrors.message && (
                    <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{formErrors.message}</p>
                  )}
                  {/* Character count for transparency */}
                  <p className="text-slate-400 text-xs mt-1 ml-2 text-right">
                    {formData.message.length}/5000
                  </p>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="group btn-gold w-full h-12 sm:h-[60px] flex items-center justify-center rounded-2xl mt-3 sm:mt-4"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-[13px] sm:text-[15px] font-bold">
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
      <section className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[65vh] bg-[#02040a] border-t border-white/[0.05] overflow-hidden">

        {/* Full-bleed map background */}
        <div className="absolute inset-0 z-[1]">
          <WorldMap />
        </div>

        {/* Gradient vignette for readability */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#02040a]/95 via-[#02040a]/70 to-[#02040a]/30 pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#02040a]/60 via-transparent to-[#02040a]/30 pointer-events-none" />

        {/* Content overlay */}
        <div className="relative z-10 container max-w-[1000px] mx-auto px-4 sm:px-6 min-h-[40vh] sm:min-h-[50vh] md:min-h-[55vh] flex flex-col justify-center">

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="mb-6 sm:mb-8"
          >
            <h2 className="text-[clamp(24px,7vw,56px)] font-black tracking-[-0.03em] text-white leading-[1.05]">
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
            <div className="bg-[#0a0a0e]/80 backdrop-blur-xl border border-white/[0.08] p-5 sm:p-7 md:p-8 rounded-2xl shadow-2xl">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#F5A800]/10 border border-[#F5A800]/20 text-[#F5A800] text-[9px] font-black uppercase tracking-widest mb-4">
                Headquarters
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
                Addis Ababa.
              </h3>
              <p className="text-white/50 text-[13px] font-medium leading-relaxed mb-6">
                {settings.address || 'Bole Road, near Edna Mall area, Bole Sub-city, Addis Ababa, Ethiopia'}
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
