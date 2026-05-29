import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Landmark, CreditCard, ShieldCheck, LineChart, TrendingUp, CheckCircle2, ArrowRight, Lock } from 'lucide-react';

const solutions = [
  {
    id: '01',
    tag: 'Core Infrastructure',
    title: 'Payment Engines',
    desc: 'High-throughput payment processing pipelines built for global market scale. Our architecture handles millions of concurrent transactions with surgical precision and zero tolerance for downtime.',
    specs: ['PCI-DSS Level 1 Compliant', 'Multi-currency Support', 'Real-time Settlement'],
    icon: CreditCard
  },
  {
    id: '02',
    tag: 'Intelligence Layer',
    title: 'Fraud Detection AI',
    desc: 'Real-time neural network monitoring that identifies and neutralizes fraudulent activity before it impacts your operations. Trained on billions of transaction signals for unmatched precision.',
    specs: ['< 0.001% False Positive Rate', 'Behavioral Biometrics', '24/7 Automated Alerts'],
    icon: ShieldCheck
  },
  {
    id: '03',
    tag: 'Asset Management',
    title: 'Digital Wallets',
    desc: 'Cloud-native custody and transfer infrastructure for digital and fiat assets. Built on zero-knowledge proof cryptography with multi-signature authorization.',
    specs: ['Cold/Hot Wallet Architecture', 'Multi-Sig Authorization', 'Regulatory KYC/AML'],
    icon: Lock
  },
  {
    id: '04',
    tag: 'Analytics',
    title: 'Financial Intelligence',
    desc: 'Predictive analytics and automated reporting engines that transform raw financial data into decisive business intelligence with real-time dashboards.',
    specs: ['Predictive Forecasting', 'Regulatory Reporting', 'Custom BI Dashboards'],
    icon: LineChart
  }
];

const compliance = ['PCI-DSS', 'ISO 27001', 'SOC 2 Type II', 'GDPR', 'AML/KYC', 'SWIFT'];

const Fintech = () => {
  const [activeSection, setActiveSection] = useState('01');

  useEffect(() => {
    const handleScroll = () => {
      solutions.forEach(s => {
        const el = document.getElementById(`section-${s.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) setActiveSection(s.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-black">

      {/* METRICS BAR — First thing visible */}
      <div className="pt-[80px] bg-[#090A0C]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: '$2.4T', label: 'Global fintech market by 2030' },
              { value: '99.99%', label: 'Payment gateway uptime SLA' },
              { value: '< 20ms', label: 'Transaction processing time' },
              { value: 'ISO 27001', label: 'Core security standard' }
            ].map((m, i) => (
              <div key={i} className="py-10 px-8">
                <div className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2">{m.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/50">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN BODY — STICKY SIDEBAR + CONTENT */}
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-0">

          {/* STICKY SIDE NAV */}
          <div className="hidden lg:block border-r border-black/10">
            <div className="sticky top-[100px] py-20 pr-8 flex flex-col gap-1">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-black/30 mb-6">Solutions Index</p>
              {solutions.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`text-left py-3 text-xs font-black uppercase tracking-widest transition-all ${
                    activeSection === s.id ? 'text-blue-600' : 'text-black/25 hover:text-black/60'
                  }`}
                >
                  {s.id} — {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* DOCUMENT SECTIONS */}
          <div className="pl-0 lg:pl-16">
            {solutions.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  id={`section-${s.id}`}
                  className={`py-24 border-b ${i < solutions.length - 1 ? 'border-black/10' : 'border-transparent'}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start gap-6 mb-10">
                      <span className="text-[80px] font-black leading-none text-black/5 tracking-tighter select-none">{s.id}</span>
                      <div className="pt-4">
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-2">{s.tag}</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black">{s.title}</h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 pl-0">
                      <div>
                        <p className="text-lg text-black/60 leading-relaxed mb-10">{s.desc}</p>
                        <div className="space-y-4">
                          {s.specs.map((spec, j) => (
                            <div key={j} className="flex items-center gap-4 py-3 border-b border-black/5 last:border-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                              <span className="text-xs font-bold uppercase tracking-widest text-black/60">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#090A0C] rounded-[32px] aspect-square flex items-center justify-center">
                        <Icon size={100} className="text-white opacity-10" strokeWidth={0.5} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* COMPLIANCE TABLE */}
      <div className="border-t-2 border-black bg-[#090A0C] text-white">
        <div className="container mx-auto px-6 lg:px-16 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.5em] text-blue-500 mb-4">Regulatory Coverage</p>
              <h3 className="text-4xl font-bold tracking-tighter">Compliance<br/>Standards</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {compliance.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-5 border border-white/5 rounded-2xl">
                  <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                  <span className="text-sm font-black uppercase tracking-widest text-white/60">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 text-white py-24 text-center">
        <p className="text-sm font-black uppercase tracking-[0.6em] text-white/50 mb-6">Ready to Deploy</p>
        <h2 className="text-[50px] md:text-[70px] font-bold tracking-tighter leading-none mb-10">
          Banking without<br/><span className="text-white/40 italic">Boundaries.</span>
        </h2>
        <a href="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 text-sm font-black uppercase tracking-widest rounded-full hover:bg-blue-50 transition-all">
          Contact the Engineering Team <ArrowRight size={16} />
        </a>
      </div>

    </div>
  );
};

export default Fintech;

