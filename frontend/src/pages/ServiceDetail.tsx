import { useParams, Navigate, Link } from 'react-router-dom';
import { SERVICES } from '../constants/services';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { EASE_EXPO, viewport } from '../lib/animations';
import TextReveal from '../components/TextReveal';
import { CTAButton } from '../components/CTAButton';
import { ArrowRight, CheckCircle, ArrowLeft, BarChart3, Target, Zap, Layers } from 'lucide-react';

const processSteps = [
  { step: '01', title: 'Discovery', desc: 'Deep-dive audit of your current infrastructure, workflows, and goals.', icon: Target },
  { step: '02', title: 'Architecture', desc: 'Tailored solution design with the right stack and deployment strategy.', icon: Layers },
  { step: '03', title: 'Build & Deploy', desc: 'Agile development with continuous delivery and zero-downtime cutover.', icon: Zap },
  { step: '04', title: 'Scale', desc: 'Post-launch observability, performance tuning, and iterative improvements.', icon: BarChart3 },
];

function ProcessStepCard({ step, title, desc, icon: Icon, index }: { step: string; title: string; desc: string; icon: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ delay: index * 0.12, duration: 0.6, ease: EASE_EXPO }}
      className="relative flex gap-4"
    >
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-[#F5A800]" />
        </div>
        {index < 3 && <div className="w-px h-full min-h-[3rem] bg-gradient-to-b from-[#F5A800]/30 to-transparent" />}
      </div>
      <div className="pb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5A800]">{step}</span>
        <h4 className="text-base font-bold text-slate-900 mt-0.5 mb-1">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  if (!serviceId || !SERVICES[serviceId]) {
    return <Navigate to="/services" replace />;
  }

  const service = SERVICES[serviceId];

  const allServices = Object.values(SERVICES);
  const currentIdx = allServices.findIndex(s => s.id === serviceId);
  const prevService = currentIdx > 0 ? allServices[currentIdx - 1] : null;
  const nextService = currentIdx < allServices.length - 1 ? allServices[currentIdx + 1] : null;

  return (
    <div className="bg-[#FCFBF8] min-h-screen">
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center bg-[#02040a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5A800]/8 via-transparent to-[#02040a] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 container max-w-5xl mx-auto px-6 pt-32 pb-20">
          <Link to="/services" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors mb-8 text-xs font-bold uppercase tracking-wider">
            <ArrowLeft size={14} /> Back to Services
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-[14px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center">
              <service.icon size={22} className="text-[#F5A800]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Service</span>
              </div>
            </div>
          </div>
          <TextReveal>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.04em] leading-[0.92] mb-5">{service.title}</h1>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">{service.description}</p>
          </TextReveal>
        </motion.div>
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      <section className="relative py-24 bg-[#FCFBF8] border-t border-slate-200">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Capabilities</span>
            </div>
            <TextReveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95]">
                What We <span className="text-[#F5A800]">Deliver.</span>
              </h2>
            </TextReveal>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {service.capabilities.map((cap, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE_EXPO }}
                className="p-6 rounded-[20px] bg-white border border-slate-200 hover:border-[#F5A800]/40 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-[10px] bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-[#F5A800]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{cap.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="relative py-24 bg-white border-t border-slate-200">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Technology</span>
            </div>
            <TextReveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95]">
                Tools & <span className="text-[#F5A800]">Stack.</span>
              </h2>
            </TextReveal>
          </motion.div>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{ delay: idx * 0.05 }}
                className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-sm font-semibold text-slate-700"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="relative py-24 bg-[#FCFBF8] border-t border-slate-200">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Process</span>
            </div>
            <TextReveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95]">
                How We <span className="text-[#F5A800]">Execute.</span>
              </h2>
            </TextReveal>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <ProcessStepCard key={step.step} {...step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CASE STUDIES ═══ */}
      <section className="relative py-24 bg-white border-t border-slate-200">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Results</span>
            </div>
            <TextReveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.04em] leading-[0.95]">
                Proven <span className="text-[#F5A800]">Outcomes.</span>
              </h2>
            </TextReveal>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5">
            {service.caseStudies.map((study, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: EASE_EXPO }}
                className="p-6 rounded-[20px] bg-[#FCFBF8] border border-slate-200"
              >
                <h3 className="text-base font-bold text-slate-900 mb-3">{study.title}</h3>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-600">{study.outcome}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NAVIGATION ═══ */}
      <section className="border-t border-slate-200 bg-[#FCFBF8]">
        <div className="container max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-8">
            <div>
              {prevService ? (
                <Link to={`/services/${prevService.id}`} className="group flex items-center gap-2 text-sm text-slate-500 hover:text-[#F5A800] transition-colors">
                  <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Previous</div>
                    <div className="font-semibold text-slate-700 group-hover:text-[#F5A800] transition-colors">{prevService.title}</div>
                  </div>
                </Link>
              ) : <div />}
            </div>
            <div>
              {nextService ? (
                <Link to={`/services/${nextService.id}`} className="group flex items-center gap-2 text-sm text-slate-500 hover:text-[#F5A800] transition-colors text-right">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Next</div>
                    <div className="font-semibold text-slate-700 group-hover:text-[#F5A800] transition-colors">{nextService.title}</div>
                  </div>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              ) : <div />}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-24 bg-[#02040a] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#F5A800]/8 rounded-full blur-[140px]" />
        </div>
        <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.7, ease: EASE_EXPO }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-[#F5A800]/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A800] animate-pulse shadow-[0_0_8px_rgba(245,168,0,0.6)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A800]">Ready for Real Results</span>
            </div>
            <TextReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-6">
                Let's Build{' '}<span className="text-[#F5A800]">Your {service.title}</span>
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-8 font-medium">
                Tell us about your project. We'll put together a free strategy session with a senior architect.
              </p>
            </TextReveal>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ delay: 0.25, duration: 0.6, ease: EASE_EXPO }} className="flex flex-wrap justify-center gap-4">
              <CTAButton className="group btn-gold text-[15px] px-10 py-4">
                <span className="relative z-10">Book a strategy session</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              </CTAButton>
              <Link to="/contact" className="group btn-ghost text-[15px] px-10 py-4 inline-flex items-center gap-2">
                <span className="relative z-10">Contact Us</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
