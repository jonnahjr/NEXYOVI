import { AnimatePresence, motion } from 'framer-motion';
import { Facebook, Github, Instagram, Linkedin, MessageCircle, Send, Slack, X, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import myLogo from '../assets/logo_1.webp';
import { useSite } from '../context/SiteContext';

const Footer = () => {
  const { settings, siteContent } = useSite();
  const [activePolicy, setActivePolicy] = useState<'Terms' | 'Privacy' | 'Legal' | null>(null);
  const companyName = settings.siteName || 'Nexyovi';
  const footerTagline = 'Nexyovi — Senior engineering, rooted in Addis Ababa, deployed globally.';
  const footerCopyright = '© 2025 Nexyovi Technologies. All rights reserved.';
  const socialIcons: Record<string, React.ElementType> = {
    twitter: X,
    linkedin: Linkedin,
    github: Github,
    youtube: Youtube,
    instagram: Instagram,
    facebook: Facebook,
    telegram: Send,
    whatsapp: MessageCircle,
    discord: MessageCircle,
    slack: Slack,
  };

  const policyContent = {
    Terms: {
      title: 'Terms of Service',
      intro: `These Terms of Service explain the rules for using ${companyName}'s website, digital services, software platforms, consulting engagements, and related communications.`,
      sections: [
        { heading: 'Acceptance of Terms', body: `By accessing our website, requesting a proposal, using a ${companyName} product, or engaging our team, you agree to use our services lawfully and in accordance with these terms. If a signed contract, proposal, statement of work, or service agreement applies, that document controls where it conflicts with this summary.` },
        { heading: 'Services and Deliverables', body: `${companyName} provides technology services including software engineering, cybersecurity, AI systems, cloud architecture, networking, data solutions, and technical advisory work. Project scope, timelines, pricing, acceptance criteria, support levels, and ownership terms are defined in the applicable written agreement.` },
        { heading: 'Client Responsibilities', body: 'Clients are responsible for providing accurate requirements, timely feedback, lawful data, required credentials, stakeholder approvals, and access to environments needed to complete the work.' },
        { heading: 'Intellectual Property', body: 'Ownership of custom deliverables, pre-existing tools, reusable frameworks, documentation, open-source components, and third-party services is governed by the applicable agreement and license terms.' },
        { heading: 'Disclaimers and Liability', body: 'Our website content is provided for general information. Professional services are delivered with reasonable skill and care. Liability limits are defined in the applicable written agreement.' }
      ]
    },
    Privacy: {
      title: 'Privacy Policy',
      intro: `${companyName} respects privacy and handles personal and business information with care. This policy describes the information we collect, why we use it, and the choices available to you.`,
      sections: [
        { heading: 'Information We Collect', body: 'We may collect contact details, company information, project requirements, messages, billing details, support requests, and technical logs.' },
        { heading: 'How We Use Information', body: 'We use information to respond to inquiries, prepare proposals, deliver services, manage client relationships, improve products, secure our systems, and comply with legal duties.' },
        { heading: 'Sharing Information', body: 'We do not sell personal information. We may share information with trusted service providers, cloud platforms, payment processors, or authorities when required by law.' },
        { heading: 'Security', body: 'We use administrative, technical, and organizational safeguards designed to protect information against unauthorized access, loss, misuse, and alteration.' },
        { heading: 'Your Choices', body: `You may request access, correction, deletion, or restriction of personal information. Contact us at ${settings.email || 'contact@nexyovi.com'}.` }
      ]
    },
    Legal: {
      title: 'Legal Notice',
      intro: `This Legal Notice provides important information about ${companyName}'s website content, brand assets, and professional communications.`,
      sections: [
        { heading: 'Company Information', body: `${companyName} provides technology consulting, engineering, cybersecurity, cloud, AI, and related digital services.` },
        { heading: 'Copyright and Trademarks', body: `${companyName}'s names, logos, designs, and original materials are protected by applicable intellectual property laws.` },
        { heading: 'Contact', body: `For legal, privacy, or compliance questions, contact ${settings.email || 'contact@nexyovi.com'}.` }
      ]
    }
  };

  useEffect(() => {
    if (!activePolicy) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePolicy(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activePolicy]);

  return (
    <footer className="relative bg-[#000000] pt-8 sm:pt-12 md:pt-16 pb-4 sm:pb-5 md:pb-6 overflow-hidden border-t border-white/[0.06]">
      {/* Watermark Background Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
        <h2 className="text-[12vw] sm:text-[15vw] md:text-[18vw] font-bold text-white/[0.02] tracking-tighter leading-none uppercase">
          {companyName}
        </h2>
      </div>


      <div className="container max-w-6xl mx-auto px-4 sm:px-5 md:px-6 relative z-10">

        {/* Top Section: Logo + Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr] gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-6 sm:mb-8 md:mb-10">

          {/* Brand Block */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4 sm:mb-5 md:mb-6 group">
              {settings?.logo_url ? (
                <img 
                  src={settings.logo_url} 
                  alt="Logo" 
                  className="h-24 sm:h-28 md:h-32 lg:h-[130px] w-auto object-contain" 
                />
              ) : (
                <div
                  className="h-24 sm:h-28 md:h-32 lg:h-[130px] w-32 sm:w-40 md:w-48 lg:w-[390px]"
                  style={{
                    WebkitMask: `url('${myLogo}') left center / contain no-repeat`,
                    mask: `url('${myLogo}') left center / contain no-repeat`,
                    maskSize: 'contain',
                    maskPosition: 'left center',
                    WebkitMaskSize: 'contain',
                    WebkitMaskPosition: 'left center',
                    background: 'linear-gradient(to right, #F5A800, #FFD166)',
                  }}
                />
              )}
            </Link>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold leading-tight mb-3 sm:mb-4 max-w-lg">
              <span className="text-white">Nexyovi — Senior engineering, </span>
              <span className="bg-gradient-to-r from-[#F5A800] to-[#FFD166] bg-clip-text text-transparent">rooted in Addis Ababa, deployed globally.</span>
            </h2>
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
              {settings?.socials && Object.entries(settings.socials).map(([key, url]: any) => {
                const Icon = socialIcons[key];
                if (!Icon || !url) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-[#F5A800] transition-colors"
                    aria-label={key}
                  >
                    <Icon size={18} className="sm:size-[20px]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.2em] mb-4 sm:mb-6">Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {(siteContent?.footer?.servicesLinks || [
                { label: 'Software Engineering', path: '/services/software' },
                { label: 'AI & Automation', path: '/services/ai' },
                { label: 'Cloud & Infrastructure', path: '/services/infrastructure' },
                { label: 'Mobile Applications', path: '/services/apps' },
                { label: 'Data & Analytics', path: '/services/data' },
              ]).map((item: any) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-white/40 hover:text-white text-[12px] sm:text-[13px] transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.2em] mb-4 sm:mb-6">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {(siteContent?.footer?.companyLinks || [
                { label: 'Company', path: '/company' },
                { label: 'Industries', path: '/industries' },
                { label: 'Projects', path: '/projects' },
                { label: 'Careers', path: '/careers' },
                { label: 'Internship', path: '/internship' },
                { label: 'Contact', path: '/contact' },
              ]).map((item: any) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-white/40 hover:text-white text-[12px] sm:text-[13px] transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.2em] mb-4 sm:mb-6">Contact</h4>
            <div className="space-y-3 sm:space-y-4">
              <a href={`mailto:${settings.email || 'contact@nexyovi.com'}`} className="block text-white hover:text-[#F5A800] transition-colors text-[13px] sm:text-[14px] font-medium break-all">
                contact@nexyovi.com
              </a>
              <a href={`tel:${settings.phone || '+251938617252'}`} className="block text-white/70 hover:text-white transition-colors text-[13px] sm:text-[14px] font-medium">
                {settings.phone ? settings.phone.replace(/(\+\d{3})(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4') : '+251 93 861 7252'}
              </a>
              <a
                href="https://wa.me/251945628075"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 transition-colors hover:bg-[#1eb85b]"
              >
                <MessageCircle size={16} className="mr-1.5 sm:mr-2" />
                Chat on WhatsApp
              </a>
              <div className="text-white/70 text-[12px] sm:text-[14px] font-medium">
                {settings.address || 'Addis Ababa, Ethiopia'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[11px] sm:text-[12px] text-white/30 text-center sm:text-left">
            {footerCopyright}
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            {(['Terms', 'Privacy', 'Legal'] as const).map(item => (
              <button
                key={item}
                type="button"
                onClick={() => setActivePolicy(item)}
                className="text-[11px] text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      <AnimatePresence>
        {activePolicy && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-modal-title"
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setActivePolicy(null)}
              aria-label="Close policy modal"
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-3xl max-h-[86vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0e]"
            >
              <div className="flex items-start justify-between gap-6 border-b border-white/10 px-6 py-5">
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{companyName}</p>
                  <h2 id="policy-modal-title" className="text-white text-2xl md:text-3xl font-black tracking-tight">
                    {policyContent[activePolicy].title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePolicy(null)}
                  className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-[62vh] overflow-y-auto px-6 py-6">
                <p className="text-white/60 text-sm leading-relaxed mb-7">{policyContent[activePolicy].intro}</p>
                <div className="space-y-6">
                  {policyContent[activePolicy].sections.map((section) => (
                    <section key={section.heading}>
                      <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">{section.heading}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{section.body}</p>
                    </section>
                  ))}
                </div>
                <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-white/30 text-xs leading-relaxed">
                    Last updated: May 2026. This notice may be supplemented by signed contracts or project-specific legal documents.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
