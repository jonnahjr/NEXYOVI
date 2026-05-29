import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Landmark, Building2, ShieldAlert, Database, CheckCircle2, ArrowRight, FileText } from 'lucide-react';

const solutions = [
  {
    id: '01', tag: 'Identity Infrastructure', title: 'Digital ID Systems',
    desc: 'Sovereign-grade biometric and cryptographic identity management for citizens at national scale. Built for offline-resilient environments with tamper-proof credential issuance and revocation.',
    specs: ['Biometric Integration', 'Offline-Resilient Architecture', 'Tamper-Proof Credentials'], icon: FileText
  },
  {
    id: '02', tag: 'Public Services', title: 'E-Government Portals',
    desc: 'Unified digital service hubs that streamline civic engagement, automated document processing, and permit management. Designed for high-concurrency environments with multilingual support.',
    specs: ['Automated Document Processing', 'Multi-language Support', 'Civic API Gateway'], icon: Building2
  },
  {
    id: '03', tag: 'National Defense', title: 'Strategic Cybersecurity',
    desc: 'Zero-trust security frameworks hardening critical national infrastructure — power grids, financial networks, and communications — against advanced persistent threats.',
    specs: ['Zero-Trust Architecture', 'APT Detection & Response', 'National SIEM Integration'], icon: ShieldAlert
  },
  {
    id: '04', tag: 'Data Sovereignty', title: 'Localized Data Hosting',
    desc: 'On-premise and sovereign cloud architectures ensuring governmental data never crosses national borders. Air-gapped environments with end-to-end encryption exceeding top-secret classification standards.',
    specs: ['Air-Gapped Networks', 'Sovereign Cloud Hosting', 'Top-Secret Grade Encryption'], icon: Database
  }
];

const compliance = ['ISO 27001', 'NIST CSF', 'FedRAMP', 'GDPR', 'DISA STIG', 'Common Criteria'];

const GovTech = () => {
  const [activeSection, setActiveSection] = useState('01');
  useEffect(() => {
    const handleScroll = () => {
      solutions.forEach(s => {
        const el = document.getElementById(`section-${s.id}`);
        if (el) { const rect = el.getBoundingClientRect(); if (rect.top <= 200 && rect.bottom >= 200) setActiveSection(s.id); }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollTo = (id: string) => document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-black">

      {/* METRICS BAR — First thing visible */}
      <div className="pt-[80px] bg-[#090A0C]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[{ value: '190+', label: 'Countries requiring e-gov platforms' }, { value: 'Zero-Trust', label: 'The only acceptable security model' }, { value: '99.9%', label: 'Platform uptime for critical services' }, { value: 'ISO 27001', label: 'Government data security standard' }].map((m, i) => (
              <div key={i} className="py-10 px-8">
                <div className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2">{m.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/50">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-0">
          <div className="hidden lg:block border-r border-black/10">
            <div className="sticky top-[100px] py-20 pr-8 flex flex-col gap-1">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-black/30 mb-6">Solutions Index</p>
              {solutions.map(s => (<button key={s.id} onClick={() => scrollTo(s.id)} className={`text-left py-3 text-xs font-black uppercase tracking-widest transition-all ${activeSection === s.id ? 'text-blue-600' : 'text-black/25 hover:text-black/60'}`}>{s.id} — {s.title}</button>))}
            </div>
          </div>
          <div className="pl-0 lg:pl-16">
            {solutions.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.id} id={`section-${s.id}`} className={`py-24 border-b ${i < solutions.length - 1 ? 'border-black/10' : 'border-transparent'}`}>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div className="flex items-start gap-6 mb-10">
                      <span className="text-[80px] font-black leading-none text-black/5 tracking-tighter select-none">{s.id}</span>
                      <div className="pt-4">
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-2">{s.tag}</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black">{s.title}</h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16">
                      <div>
                        <p className="text-lg text-black/60 leading-relaxed mb-10">{s.desc}</p>
                        <div className="space-y-4">{s.specs.map((spec, j) => (<div key={j} className="flex items-center gap-4 py-3 border-b border-black/5 last:border-0"><div className="w-1.5 h-1.5 rounded-full bg-blue-600" /><span className="text-xs font-bold uppercase tracking-widest text-black/60">{spec}</span></div>))}</div>
                      </div>
                      <div className="bg-[#090A0C] rounded-[32px] aspect-square flex items-center justify-center"><Icon size={100} className="text-white opacity-10" strokeWidth={0.5} /></div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t-2 border-black bg-[#090A0C] text-white">
        <div className="container mx-auto px-6 lg:px-16 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-center">
            <div><p className="text-xs font-black uppercase tracking-[0.5em] text-blue-500 mb-4">Security Frameworks</p><h3 className="text-4xl font-bold tracking-tighter">Government<br/>Grade</h3></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{compliance.map((c, i) => (<div key={i} className="flex items-center gap-3 p-5 border border-white/5 rounded-2xl"><CheckCircle2 size={14} className="text-blue-500 shrink-0" /><span className="text-sm font-black uppercase tracking-widest text-white/60">{c}</span></div>))}</div>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 text-white py-24 text-center">
        <p className="text-sm font-black uppercase tracking-[0.6em] text-white/50 mb-6">Strategic Partnership</p>
        <h2 className="text-[50px] md:text-[70px] font-bold tracking-tighter leading-none mb-10">Secure your<br/><span className="text-white/40 italic">digital nation.</span></h2>
        <a href="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 text-sm font-black uppercase tracking-widest rounded-full hover:bg-blue-50 transition-all">Contact the Engineering Team <ArrowRight size={16} /></a>
      </div>
    </div>
  );
};

export default GovTech;

