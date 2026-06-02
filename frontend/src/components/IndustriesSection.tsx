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
    desc: 'Ultra-low latency trading systems, secure payment gateways, and core banking modernization built to PCI-DSS standards.',
    accent: '#10b981',
    metrics: [
      { value: '<1ms', label: 'Latency' },
      { value: 'PCI-DSS', label: 'Compliance' },
      { value: '99.99%', label: 'Uptime' },
    ],
    tags: ['Smart Contracts', 'Payment APIs', 'Risk Analytics'],
  },
  {
    id: 'healthtech',
    icon: HeartPulse,
    title: 'HealthTech',
    subtitle: 'Healthcare Technology',
    desc: 'HIPAA-compliant data pipelines, secure telemedicine platforms, and predictive patient analytics systems.',
    accent: '#ef4444',
    metrics: [
      { value: 'HIPAA', label: 'Compliant' },
      { value: 'EHR', label: 'Integration' },
      { value: 'Real-Time', label: 'Analytics' },
    ],
    tags: ['Telemedicine', 'Patient AI', 'EHR Systems'],
  },
  {
    id: 'logistics',
    icon: Truck,
    title: 'Logistics',
    subtitle: 'Supply Chain & Logistics',
    desc: 'Real-time supply chain visibility, predictive routing algorithms, and IoT fleet tracking at enterprise scale.',
    accent: '#f59e0b',
    metrics: [
      { value: '50K/s', label: 'Events' },
      { value: '35%', label: 'Efficiency ↑' },
      { value: 'IoT', label: 'Fleet Tracking' },
    ],
    tags: ['Route AI', 'IoT Tracking', 'Warehouse Systems'],
  },
  {
    id: 'government',
    icon: Building2,
    title: 'Government',
    subtitle: 'Public Sector',
    desc: 'Secure, sovereign digital infrastructure for public institutions with highest-grade compliance and auditability.',
    accent: '#F5A800',
    metrics: [
      { value: 'Air-Gap', label: 'Capable' },
      { value: 'SOC-2', label: 'Ready' },
      { value: 'On-Prem', label: 'Deployments' },
    ],
    tags: ['Sovereign Cloud', 'Identity & Access', 'Audit Trails'],
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education',
    subtitle: 'EdTech Platforms',
    desc: 'Intelligent learning management systems, AI tutoring engines, and scalable campus digital infrastructure.',
    accent: '#8b5cf6',
    metrics: [
      { value: '100K+', label: 'Users Served' },
      { value: 'LMS', label: 'Platforms' },
      { value: 'AI', label: 'Tutoring' },
    ],
    tags: ['LMS', 'AI Tutoring', 'Campus Systems'],
  },
  {
    id: 'manufacturing',
    icon: Factory,
    title: 'Manufacturing',
    subtitle: 'Industrial Automation',
    desc: 'Smart factory automation, predictive maintenance, and IIoT data platforms for modern industrial operations.',
    accent: '#06b6d4',
    metrics: [
      { value: 'IIoT', label: 'Integration' },
      { value: '40%', label: 'Downtime ↓' },
      { value: 'Edge', label: 'Computing' },
    ],
    tags: ['Smart Factory', 'Predictive Maint.', 'IIoT'],
  },
  {
    id: 'retail',
    icon: ShoppingCart,
    title: 'Retail',
    subtitle: 'Commerce Technology',
    desc: 'Omnichannel commerce platforms, AI-driven personalization, and real-time inventory intelligence systems.',
    accent: '#ec4899',
    metrics: [
      { value: 'Omni', label: 'Channel' },
      { value: 'AI', label: 'Personalization' },
      { value: 'Real-Time', label: 'Inventory' },
    ],
    tags: ['eCommerce', 'Personalization', 'Inventory AI'],
  },
  {
    id: 'energy',
    icon: Zap,
    title: 'Energy',
    subtitle: 'Energy & Utilities',
    desc: 'Smart grid management, renewable energy optimization, and critical infrastructure monitoring platforms.',
    accent: '#F5A800',
    metrics: [
      { value: 'Smart', label: 'Grid' },
      { value: 'SCADA', label: 'Integration' },
      { value: '24/7', label: 'Monitoring' },
    ],
    tags: ['Smart Grid', 'SCADA', 'Renewables'],
  },
];

const IndustriesSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-[#f4f4f5] py-32 border-t border-slate-200 overflow-hidden">
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse" />
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                  Solutions That Transform
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-950 tracking-[-0.04em] leading-[0.9] mb-8">
                Industries <br />
                We <br />
                <span className="text-[#F5A800]">Empower</span>
              </h2>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-md mb-12 font-medium">
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
                          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-44 shrink-0">
                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 w-full">
                              {ind.metrics.map(m => (
                                <div key={m.label} className="bg-[#F8F5EB] border border-slate-200/60 rounded-xl p-2.5 flex flex-col justify-center">
                                  <div className="text-base font-bold text-slate-900 tracking-tight">{m.value}</div>
                                  <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-500 mt-0.5">{m.label}</div>
                                </div>
                              ))}
                            </div>
                            
                            <Link 
                              to="/industries" 
                              className="mt-1 w-full lg:w-auto px-5 py-3 rounded-xl bg-[#F5A800] text-black font-bold text-xs flex items-center justify-between hover:scale-105 transition-all group/btn shadow-md shadow-[#F5A800]/20"
                            >
                              Explore
                              <ArrowRight size={14} className="text-black/60 group-hover/btn:text-black group-hover/btn:translate-x-1 transition-all" />
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
