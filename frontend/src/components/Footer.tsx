import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Linkedin, Youtube, Slack, Instagram, MessagesSquare, Send, ArrowRight, Mail, Phone, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import myLogo from '../assets/logo 1.png';


import { useSite } from '../context/SiteContext';

const Footer = () => {
 const { settings, siteContent } = useSite();
 const [activePolicy, setActivePolicy] = useState<'Terms' | 'Privacy' | 'Legal' | null>(null);
 const footerContent = siteContent?.footer || {};
 const tagline = footerContent.tagline || 'Nexyovi is a modern software and AI development company helping businesses build digital products, automate workflows, and modernize operations.';
 const copyrightExtra = footerContent.copyright_extra || 'Global. All Rights Reserved.';
 const companyName = settings.siteName || 'Nexyovi';

 const socialLinks = [
 { Icon: Linkedin, href: settings.socials?.linkedin || '#', color: 'hover:text-[#0077B5]' },
 { Icon: Twitter, href: settings.socials?.twitter || '#', color: 'hover:text-white' },
 { Icon: Github, href: settings.socials?.github || '#', color: 'hover:text-white' },
 { Icon: Youtube, href: settings.socials?.youtube || '#', color: 'hover:text-[#FF0000]' },
 { Icon: Instagram, href: settings.socials?.instagram || '#', color: 'hover:text-[#E4405F]' },
 { Icon: MessagesSquare, href: settings.socials?.discord || '#', color: 'hover:text-[#5865F2]' },
 { Icon: Slack, href: settings.socials?.slack || '#', color: 'hover:text-[#4A154B]' }];

 const policyContent = {
 Terms: {
 title: 'Terms of Service',
 intro: `These Terms of Service explain the rules for using ${companyName}'s website, digital services, software platforms, consulting engagements, and related communications.`,
 sections: [
 { heading: 'Acceptance of Terms', body: `By accessing our website, requesting a proposal, using a ${companyName} product, or engaging our team, you agree to use our services lawfully and in accordance with these terms. If a signed contract, proposal, statement of work, or service agreement applies, that document controls where it conflicts with this summary.` },
 { heading: 'Services and Deliverables', body: `${companyName} provides technology services including software engineering, cybersecurity, AI systems, cloud architecture, networking, data solutions, and technical advisory work. Project scope, timelines, pricing, acceptance criteria, support levels, and ownership terms are defined in the applicable written agreement.` },
 { heading: 'Client Responsibilities', body: 'Clients are responsible for providing accurate requirements, timely feedback, lawful data, required credentials, stakeholder approvals, and access to environments needed to complete the work. Delays in these inputs may affect delivery timelines.' },
 { heading: 'Acceptable Use', body: 'You may not use our website, systems, or deliverables to violate laws, attack third-party systems, distribute malware, infringe intellectual property, bypass security controls, or process data without proper authorization.' },
 { heading: 'Payments and Changes', body: 'Fees, payment schedules, taxes, expenses, cancellation rules, and change requests are handled under the relevant invoice, proposal, or signed agreement. Work outside the approved scope may require a separate written approval.' },
 { heading: 'Intellectual Property', body: 'Ownership of custom deliverables, pre-existing tools, reusable frameworks, documentation, open-source components, and third-party services is governed by the applicable agreement and license terms. Unless agreed otherwise, each party keeps ownership of materials it owned before the engagement.' },
 { heading: 'Disclaimers and Liability', body: 'Our website content is provided for general information. Professional services are delivered with reasonable skill and care, but outcomes may depend on client systems, third-party platforms, data quality, and operational decisions outside our control. Liability limits are defined in the applicable written agreement.' }
 ]
 },
 Privacy: {
 title: 'Privacy Policy',
 intro: `${companyName} respects privacy and handles personal and business information with care. This policy describes the information we collect, why we use it, and the choices available to you.`,
 sections: [
 { heading: 'Information We Collect', body: 'We may collect contact details, company information, project requirements, messages, billing details, support requests, technical logs, device/browser data, and information you provide through forms, email, meetings, demos, or service portals.' },
 { heading: 'How We Use Information', body: 'We use information to respond to inquiries, prepare proposals, deliver services, manage client relationships, improve products, secure our systems, process payments, provide support, comply with legal duties, and send relevant business communications.' },
 { heading: 'Project and Client Data', body: 'When we work on client systems, we access only the data reasonably needed for the approved scope. Confidential project data is handled under the applicable contract, nondisclosure terms, data processing terms, and security requirements.' },
 { heading: 'Sharing Information', body: 'We do not sell personal information. We may share information with trusted service providers, cloud platforms, payment processors, security tools, professional advisors, or authorities when required by law or necessary to provide and protect our services.' },
 { heading: 'Security', body: 'We use administrative, technical, and organizational safeguards designed to protect information against unauthorized access, loss, misuse, and alteration. No internet-based system is completely risk-free, so we also encourage secure client practices.' },
 { heading: 'Retention', body: 'We retain information only as long as needed for service delivery, business records, legal compliance, dispute resolution, security monitoring, and legitimate operational purposes.' },
 { heading: 'Your Choices', body: `You may request access, correction, deletion, or restriction of personal information where applicable. To make a privacy request, contact us at ${settings.email || 'our published contact email'}.` }
 ]
 },
 Legal: {
 title: 'Legal Notice',
 intro: `This Legal Notice provides important information about ${companyName}'s website content, brand assets, professional communications, and third-party materials.`,
 sections: [
 { heading: 'Company Information', body: `${companyName} provides technology consulting, engineering, cybersecurity, cloud, AI, networking, and related digital services. Official company details, service locations, and commercial terms may vary by engagement and are confirmed in written business documents.` },
 { heading: 'No Professional Warranty from Website Content', body: 'Website content, case studies, articles, capability statements, and marketing materials are provided for general information only. They do not create a client relationship, guarantee specific results, or replace a signed professional services agreement.' },
 { heading: 'Third-Party Services', body: 'Our services may integrate with cloud providers, software vendors, APIs, open-source packages, payment systems, analytics tools, or cybersecurity platforms. Third-party products remain subject to their own terms, availability, pricing, licenses, and policies.' },
 { heading: 'Copyright and Trademarks', body: `${companyName}'s names, logos, designs, copy, code, graphics, and original materials are protected by applicable intellectual property laws. Third-party names and logos belong to their respective owners and are used for identification or compatibility where appropriate.` },
 { heading: 'Compliance', body: 'Clients are responsible for confirming that their use of delivered systems complies with laws, industry regulations, internal policies, and data protection requirements applicable to their business and jurisdiction.' },
 { heading: 'Contact', body: `For legal, privacy, or compliance questions, contact ${settings.email || 'our published contact email'}. For urgent security matters, include enough detail for our team to evaluate and respond appropriately.` }
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
 <footer className="footer-reveal relative bg-[#000000] pt-16 pb-8 overflow-hidden border-t border-white/5">
 {/* Watermark Background Content */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
 <h2 className="text-[18vw] font-bold text-white/[0.02] tracking-tighter leading-none uppercase">
 {settings.siteName}
 </h2>
 </div>

 <div className="container-wide relative z-10">
 
 <div className="grid grid-cols-1 lg:grid-cols-[1fr_repeat(4,auto)] gap-16 lg:gap-20 mb-20 pt-10">
 
 <div className="max-w-sm">
 <Link to="/" className="inline-block mb-8 hover:opacity-90 transition-opacity">
 {settings?.logo_url ? (
 <img src={settings.logo_url} alt="Logo" className="h-[90px] w-auto object-contain" />
 ) : (
 <div className="h-[90px] w-[250px] bg-[#f3a847]" style={{ WebkitMask: `url('${myLogo}') left center / contain no-repeat`, mask: `url('${myLogo}') left center / contain no-repeat` }} title="Nexyovi" />
 )}
 </Link>
 <p className="text-[#9CA3AF] text-[15px] leading-relaxed mb-8">
 {tagline}
 </p>
 <div className="mb-8">
 <h4 className="text-white/40 font-bold text-[11px] uppercase tracking-[0.2em] mb-4">Connect</h4>
 <div className="flex flex-wrap items-center gap-3">
 {socialLinks.map((item, i) => (
 <motion.a 
 key={i} 
 href={item.href} 
 whileHover={{ scale: 1.15, y: -4 }}
 whileTap={{ scale: 0.9 }}
 transition={{ type: "spring", stiffness: 400, damping: 10 }}
 className={`relative group w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-[#9CA3AF] ${item.color} bg-white/[0.03] backdrop-blur-md overflow-hidden `}
 >
 {/* Soft fill on hover */}
 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 pointer-events-none" />
 {/* Icon bouncing */}
 <item.Icon size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
 </motion.a>
 ))}
 </div>
 </div>
 
 <div className="space-y-3 pt-6 border-t border-white/5">
 <div className="flex items-center gap-3 text-[#6B7280] text-[13px] hover:text-white transition-colors cursor-pointer">
 <Mail size={14} className="shrink-0" /> <a href={`mailto:${settings.email}`} className="truncate">{settings.email}</a>
 </div>
 <div className="flex items-center gap-3 text-[#6B7280] text-[13px] hover:text-white transition-colors cursor-pointer">
 <Phone size={14} className="shrink-0" /> <a href={`tel:${settings.phone}`}>{settings.phone}</a>
 </div>
 </div>
 </div>

 <div>
 <h4 className="text-white font-bold text-[14px] uppercase tracking-widest mb-8">Services</h4>
 <ul className="space-y-4">
 {[
 { label: 'Cyber Security', path: '/security' },
 { label: 'Software Engineering', path: '/software' },
 { label: 'Artificial Intelligence', path: '/ai' },
 { label: 'Cloud & DevOps', path: '/cloud' },
 { label: 'Web3 & Blockchain', path: '/web3' },
 { label: 'Data & Analytics', path: '/data' },
 { label: 'Mobile App Dev', path: '/apps' }
 ].map(item => (
 <li key={item.label}><Link to={item.path} className="text-[#6B7280] hover:text-white transition-colors text-[14px]">{item.label}</Link></li>
 ))}
 </ul>
 </div>

 <div>
 <h4 className="text-white font-bold text-[14px] uppercase tracking-widest mb-8">Industries</h4>
 <ul className="space-y-4">
 {[
 { label: 'Fintech', path: '/fintech' },
 { label: 'HealthTech', path: '/health' },
 { label: 'GovTech', path: '/govtech' },
 { label: 'Success Stories', path: '/portfolio' }
 ].map(item => (
 <li key={item.label}><Link to={item.path} className="text-[#6B7280] hover:text-white transition-colors text-[14px]">{item.label}</Link></li>
 ))}
 </ul>
 </div>

 <div>
 <h4 className="text-white font-bold text-[14px] uppercase tracking-widest mb-8">Company</h4>
 <ul className="space-y-6">
 <li>
 <Link to="/company/story" className="group block">
 <p className="text-white text-[14px] font-medium transition-colors group-hover:text-white/70">Our Story</p>
 <p className="text-[#6B7280] text-[12px]">Background & milestones</p>
 </Link>
 </li>
 <li>
 <Link to="/company/leadership" className="group block">
 <p className="text-white text-[14px] font-medium transition-colors group-hover:text-white/70">Leadership</p>
 <p className="text-[#6B7280] text-[12px]">Founders & engineering leaders</p>
 </Link>
 </li>
 <li>
 <Link to="/careers" className="group block">
 <p className="text-white text-[14px] font-medium transition-colors group-hover:text-white/70">Careers</p>
 <p className="text-[#6B7280] text-[12px]">We are hiring developers!</p>
 </Link>
 </li>
 <li>
 <Link to="/company/impact" className="group block">
 <p className="text-white text-[14px] font-medium transition-colors group-hover:text-white/70">Impact</p>
 <p className="text-[#6B7280] text-[12px]">Measured outcomes</p>
 </Link>
 </li>
 </ul>
 </div>

 <div>
 <h4 className="text-white font-bold text-[14px] uppercase tracking-widest mb-8">Connectivity</h4>
 <div className="space-y-6">
 <Link to="/company/culture" className="group block">
 <p className="text-white text-[14px] font-medium transition-colors group-hover:text-white/70">Culture</p>
 <p className="text-[#6B7280] text-[12px]">How we work & global offices</p>
 </Link>
 <Link to="/portfolio" className="group block">
 <p className="text-white text-[14px] font-medium transition-colors group-hover:text-white/70">Success Stories</p>
 <p className="text-[#6B7280] text-[12px]">Our portfolio of projects</p>
 </Link>
 <Link to="/legal" className="group block">
 <p className="text-white text-[14px] font-medium transition-colors group-hover:text-white/70">Trust Center</p>
 <p className="text-[#6B7280] text-[12px]">Security & compliance</p>
 </Link>
 </div>
 </div>

 </div>

 <div className="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-8">
 <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
 <p className="text-[13px] text-[#6B7280]">
 &copy; {new Date().getFullYear()} {settings.siteName} Global. All Rights Reserved.
 </p>
 <div className="flex items-center gap-6">
 {(['Terms', 'Privacy', 'Legal'] as const).map(item => (
 <button
 key={item}
 type="button"
 onClick={() => setActivePolicy(item)}
 className="text-[12px] text-[#6B7280] hover:text-white transition-colors uppercase tracking-widest font-medium"
 >
 {item}
 </button>
 ))}
 <Link to="/admin/login" className="text-[12px] text-[#F5A800]/20 hover:text-[#F5A800] transition-colors uppercase tracking-widest font-black">Admin</Link>
 </div>
 </div>
 </div>

 </div>

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
 className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm"
 onClick={() => setActivePolicy(null)}
 aria-label="Close policy modal"
 />

 <motion.div
 initial={{ opacity: 0, y: 24, scale: 0.98 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 16, scale: 0.98 }}
 transition={{ duration: 0.22, ease: 'easeOut' }}
 className="relative z-10 w-full max-w-3xl max-h-[86vh] overflow-hidden rounded-2xl border border-white/10 bg-[#111111] "
 >
 <div className="flex items-start justify-between gap-6 border-b border-white/10 px-6 py-5">
 <div>
 <p className="text-white/50 text-[11px] font-bold uppercase tracking-[0.35em] mb-2">
 {companyName}
 </p>
 <h2 id="policy-modal-title" className="text-white text-2xl md:text-3xl font-black tracking-tight">
 {policyContent[activePolicy].title}
 </h2>
 </div>
 <button
 type="button"
 onClick={() => setActivePolicy(null)}
 className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#9CA3AF] transition-colors hover:border-white/30 hover:text-white hover:bg-white/5"
 aria-label="Close"
 >
 <X size={18} />
 </button>
 </div>

 <div className="max-h-[62vh] overflow-y-auto px-6 py-6">
 <p className="text-[#D1D5DB] text-sm md:text-base leading-relaxed mb-7">
 {policyContent[activePolicy].intro}
 </p>

 <div className="space-y-6">
 {policyContent[activePolicy].sections.map((section) => (
 <section key={section.heading}>
 <h3 className="text-white text-sm font-black uppercase tracking-widest mb-2">
 {section.heading}
 </h3>
 <p className="text-[#9CA3AF] text-sm leading-relaxed">
 {section.body}
 </p>
 </section>
 ))}
 </div>

 <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
 <p className="text-white/60 text-xs leading-relaxed">
 Last updated: May 26, 2026. This information is a general website notice and may be supplemented by signed contracts, data processing agreements, or project-specific legal documents.
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

