import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  DollarSign,
  Factory,
  GraduationCap,
  HeartPulse,
  ShoppingCart,
  Truck,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fadeUp, viewport } from '../lib/animations';

const industries = [
  {
    id: 'fintech',
    icon: DollarSign,
    title: 'FinTech',
    subtitle: 'Financial Technology',
    desc: 'High-throughput payment processing, core banking modernization, and real-time fraud detection systems engineered for regulatory compliance and transaction reliability at scale. We build PCI-DSS Level 1 compliant infrastructure that processes millions of transactions with sub-200ms latency.',
    accent: '#10b981',
    metrics: [
      { value: 'PCI-DSS', label: 'Level 1 Compliant' },
      { value: '<200ms', label: 'Transaction Latency' },
      { value: '99.99%', label: 'Payment Uptime' },
    ],
    tags: ['Payment Processing', 'Core Banking Modernization', 'Fraud Detection AI', 'KYC/AML Systems', 'Digital Wallets', 'Financial Analytics'],
    cta: 'View Industry',
  },
  {
    id: 'healthtech',
    icon: HeartPulse,
    title: 'HealthTech',
    subtitle: 'Healthcare Technology',
    desc: 'HIPAA-compliant telemedicine platforms, interoperable EHR systems, and AI-powered clinical decision support tools. We engineer secure data infrastructure that connects hospitals, clinics, and patients across distributed healthcare networks with real-time analytics and end-to-end encryption.',
    accent: '#ef4444',
    metrics: [
      { value: 'HIPAA', label: 'Compliant Architecture' },
      { value: 'HL7 FHIR', label: 'EHR Integration' },
      { value: '256-Bit', label: 'Encryption Standard' },
    ],
    tags: ['Telemedicine', 'EHR Integration', 'Clinical AI', 'Patient Data Lakes', 'Remote Monitoring', 'HIPAA Compliance'],
    cta: 'View Industry',
  },
  {
    id: 'logistics',
    icon: Truck,
    title: 'Logistics',
    subtitle: 'Supply Chain & Logistics',
    desc: 'Real-time supply chain control towers, IoT fleet tracking platforms, and predictive route optimization engines that reduce delivery times and operational costs. Our systems ingest telemetry from thousands of assets simultaneously, providing live visibility from warehouse to last-mile delivery.',
    accent: '#f59e0b',
    metrics: [
      { value: '50K/s', label: 'Telemetry Events' },
      { value: '35%', label: 'Route Efficiency ↑' },
      { value: '<45m', label: 'Delivery Windows' },
    ],
    tags: ['Supply Chain Visibility', 'IoT Fleet Tracking', 'Route Optimization', 'Warehouse Management', 'Predictive Analytics', 'Last-Mile Delivery'],
    cta: 'Explore Sector',
  },
  {
    id: 'government',
    icon: Building2,
    title: 'Government',
    subtitle: 'Public Sector & Defense',
    desc: 'Sovereign digital identity platforms, e-government service portals, and secure national infrastructure built for air-gapped deployment and zero-trust security postures. We deliver systems that serve millions of citizens while meeting the strictest data sovereignty and national security requirements.',
    accent: '#F5A800',
    metrics: [
      { value: 'Air-Gap', label: 'Deployment Ready' },
      { value: '500K+', label: 'Citizen Onboarding' },
      { value: 'SOC-2', label: 'Security Certified' },
    ],
    tags: ['Digital Identity', 'E-Government Portals', 'Sovereign Cloud', 'Biometric Systems', 'National Security', 'Citizen Services'],
    cta: 'Explore Sector',
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education',
    subtitle: 'EdTech Platforms',
    desc: 'Scalable learning management platforms, AI-powered adaptive tutoring engines, and virtual classroom infrastructure serving thousands of concurrent learners. We build digital campus ecosystems that unify curriculum management, student analytics, credentialing, and remote instruction on a single secure platform.',
    accent: '#8b5cf6',
    metrics: [
      { value: '100K+', label: 'Concurrent Learners' },
      { value: 'LMS + AI', label: 'Adaptive Platform' },
      { value: 'FERPA', label: 'Student Data Compliant' },
    ],
    tags: ['Learning Management', 'AI Tutoring Systems', 'Virtual Classrooms', 'Digital Credentialing', 'Student Analytics', 'Campus Infrastructure'],
    cta: 'Learn More',
  },
  {
    id: 'manufacturing',
    icon: Factory,
    title: 'Manufacturing',
    subtitle: 'Industrial Automation',
    desc: 'Smart factory systems with computer vision quality control, IIoT sensor platforms, and predictive maintenance engines that reduce unplanned downtime. We connect legacy industrial control systems with modern edge computing architectures to deliver real-time production line visibility and AI-driven defect detection.',
    accent: '#06b6d4',
    metrics: [
      { value: '40%', label: 'Downtime Reduction' },
      { value: 'IIoT + Edge', label: 'Real-Time Processing' },
      { value: 'IEC 62443', label: 'Security Standard' },
    ],
    tags: ['Smart Factory', 'Predictive Maintenance', 'Computer Vision QC', 'IIoT Platforms', 'Edge Computing', 'MES Integration'],
    cta: 'View Solutions',
  },
  {
    id: 'retail',
    icon: ShoppingCart,
    title: 'Retail',
    subtitle: 'Commerce Technology',
    desc: 'Unified omnichannel commerce platforms connecting online, in-store, and mobile experiences with real-time inventory intelligence and AI-driven personalization engines. We help retailers eliminate stockouts, optimize merchandising, and deliver consistent cross-channel customer experiences at peak traffic.',
    accent: '#ec4899',
    metrics: [
      { value: '35%', label: 'Stockout Reduction' },
      { value: 'AI', label: 'Personalization Engine' },
      { value: '22%', label: 'Checkout Abandonment ↓' },
    ],
    tags: ['Omnichannel Commerce', 'AI Personalization', 'Inventory Intelligence', 'CDP Integration', 'Payment Orchestration', 'Peak Traffic Scaling'],
    cta: 'View Industry',
  },
  {
    id: 'energy',
    icon: Zap,
    title: 'Energy',
    subtitle: 'Energy & Utilities',
    desc: 'Smart grid management platforms, SCADA security monitoring, and renewable energy optimization systems for critical infrastructure operators. We engineer secure, resilient control systems that monitor distributed energy assets, detect anomalies in real time, and ensure compliance with IEC 62443 and NIST cybersecurity frameworks.',
    accent: '#F5A800',
    metrics: [
      { value: 'IEC 62443', label: 'Security Compliance' },
      { value: '24/7', label: 'Infrastructure Monitoring' },
      { value: 'SCADA', label: 'Secure Remote Access' },
    ],
    tags: ['Smart Grid', 'SCADA Security', 'Renewable Energy', 'Grid Monitoring', 'Anomaly Detection', 'Critical Infrastructure'],
    cta: 'Explore Sector',
  },
];

const IndustriesSection = () => {
  const [active, setActive] = useState(1);

  return (
    <section className="relative bg-[#FCFBF8] py-32 section-divider-light overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundSize: '150px 150px',
        }}
      />

      <div className="container relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:w-[34%]"
          >
            <div className="lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-[-0.04em] leading-[0.92] mb-6">
                Industries <br />
                <span className="block text-center -translate-x-4">We</span>
                <span className="text-[#F5A800]">Empower</span>
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-md mb-10 font-medium">
                Deep domain expertise across eight core industries — from fintech and healthcare to government and energy. We build solutions that understand your industry.
              </p>

              <Link
                to="/industries"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-slate-950 text-white font-bold text-[15px] transition-all hover:scale-105 hover:bg-[#F5A800]"
              >
                View All Industries
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <div className="lg:w-[66%] flex flex-col gap-3">
            {industries.map((ind, i) => {
              const isActive = i === active;
              const Icon = ind.icon;

              return (
                <div
                  key={ind.id}
                  onMouseEnter={() => setActive(i)}
                  className={`group cursor-pointer relative overflow-hidden transition-all duration-700 border rounded-[26px] ${isActive ? 'bg-white border-slate-200 shadow-[0_16px_30px_-18px_rgba(0,0,0,0.05)]' : 'bg-white/40 border-slate-200/50 hover:bg-white/80 hover:border-slate-200 shadow-sm'}`}
                >
                  {/* Active Glow Gradient */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${ind.accent}0A 0%, transparent 50%)`, opacity: isActive ? 1 : 0 }}
                  />

                  <div className="py-3.5 lg:py-4 px-4 lg:px-6 relative z-10 flex flex-col">

                    {/* Row Header (Always visible) */}
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-4 lg:gap-6">
                        <div className="text-lg font-bold font-mono text-slate-400 w-6">
                          0{i + 1}
                        </div>
                        <h3 className={`text-lg md:text-xl lg:text-[28px] font-black tracking-[-0.02em] transition-all duration-500 ${isActive ? 'text-slate-900 translate-x-1.5' : 'text-slate-500 group-hover:text-slate-800'}`}>
                          {ind.title}
                        </h3>
                      </div>

                      {!isActive && (
                        <ArrowRight size={20} className="text-slate-400 group-hover:text-[#F5A800] transition-colors hidden md:block" />
                      )}
                    </div>

                    {/* Expandable Content Area */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 pb-0 flex flex-col lg:flex-row gap-6 lg:items-start pl-10 lg:pl-12">

                            {/* Left: Description & Tags */}
                            <div className="flex-1 border-l-2 border-slate-100 pl-4 lg:pl-5">
                              <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-[#F8F5EB] border border-slate-200 flex items-center justify-center">
                                  <Icon size={14} style={{ color: ind.accent }} />
                                </div>
                                <div className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: ind.accent }}>
                                  {ind.subtitle}
                                </div>
                              </div>

                              <p className="text-slate-600 text-[13px] leading-relaxed mb-5 max-w-md font-medium">
                                {ind.desc}
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {ind.tags.map((tag) => (
                                  <span key={tag} className="px-2.5 py-1 rounded-full bg-[#F8F5EB] border border-slate-200 text-slate-600 text-[9px] font-bold uppercase tracking-wider">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Right: Metrics & CTA */}
                            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-40 shrink-0">
                              <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 w-full">
                                {ind.metrics.map(m => (
                                  <div key={m.label} className="bg-[#F8F5EB] border border-slate-200/60 rounded-lg p-1.5 md:p-2 flex flex-col justify-center">
                                    <div className="text-sm font-bold text-slate-900 tracking-tight">{m.value}</div>
                                    <div className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-500 mt-0.5">{m.label}</div>
                                  </div>
                                ))}
                              </div>

                              <Link
                                to="/industries"
                                className="mt-1 w-full lg:w-auto px-3 py-2 rounded-lg bg-[#F5A800] text-black font-bold text-[10px] flex items-center justify-between hover:scale-105 transition-all group/btn shadow-md shadow-[#F5A800]/20"
                              >
                                {ind.cta}
                                <ArrowRight size={12} className="text-black/60 group-hover/btn:text-black group-hover/btn:translate-x-1 transition-all" />
                              </Link>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
