import { motion } from 'framer-motion';
import { ArrowRight, Check, Globe, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import CompanyLeadership from '../components/CompanyLeadership';
import CompanyValues from '../components/CompanyValues';
import { useSite } from '../context/SiteContext';
import { fadeUp, revealUp, staggerContainer } from '../lib/animations';

export default function About() {
 const { team, settings, jobs } = useSite();

 return (
 <div className="bg-slate-50 min-h-screen overflow-hidden selection:bg-[#F5A800]/30"><section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[680px] bg-[#F5A800]/5 blur-[140px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.015]"
               style={{
                 backgroundImage: `linear-gradient(rgba(245,168,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,168,0,0.3) 1px, transparent 1px)`,
                 backgroundSize: '90px 90px',
               }}
          />
        </div>

        <div className="container relative z-10 max-w-4xl mx-auto text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
            <motion.div variants={revealUp} className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-slate-100 border border-slate-200 text-[11px] uppercase tracking-[0.2em] text-slate-600">
              About us
            </motion.div>

            <motion.h1 variants={revealUp} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95] text-slate-950">
              Modern software. Smarter AI. <span className="text-gradient-aurora">Real results.</span>
            </motion.h1>

            <motion.p variants={revealUp} className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              We help businesses build digital products, automate workflows, and modernize operations.
            </motion.p>

            <motion.div variants={revealUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-left">
              {[
                { label: 'Founded', value: '2024' },
                { label: 'Team members', value: `${team.length}` },
                { label: 'Delivery Locations', value: '2' }].map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-6">
                  <div className="text-4xl font-black tracking-tight text-slate-950 mb-2">{stat.value}</div>
                  <div className="text-sm uppercase tracking-[0.22em] text-slate-400">{stat.label}</div>
                </div>
               ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="container max-w-6xl mx-auto py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6 text-[11px] uppercase tracking-[0.2em] text-slate-600">Hello</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-950">
              We build digital products that move your business forward.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Nexyovi is a modern software and AI development company. We partner with businesses to build digital products, automate complex workflows, and modernize operations — without the overhead or the hype.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              We started after watching teams drown in tools that created more noise than clarity. Our approach is straightforward: understand the problem, design a practical solution, and ship working software — fast.
            </p>
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <div className="text-sm uppercase tracking-[0.22em] text-[#F5A800] font-black mb-3">Founder</div>
              <div className="text-2xl font-black text-slate-950">Marcus Chen</div>
              <div className="text-sm uppercase tracking-[0.2em] text-slate-500 mt-2">CEO and co-founder</div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4">
            {[
              {
                title: 'Ship with Proof',
                description: 'We don\'t launch features that sound good in a pitch but crumble in production. If we can\'t demonstrate it works, it doesn\'t ship.',
                icon: Check,
              },
              {
                title: 'Earn the Context',
                description: 'We dig into how teams actually work before building anything for how we think they should.',
                icon: Globe,
              },
              {
                title: 'Default to Transparent',
                description: 'Source attribution isn\'t a feature, it\'s a philosophy. Decisions come with reasoning, not just conclusions.',
                icon: Home,
              }].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-8 hover:border-[#F5A800]/30 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5A800]/10 text-[#F5A800] flex items-center justify-center mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-950 mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

 <CompanyValues />

 <section className="container max-w-6xl mx-auto py-24">
 <div className="grid gap-12">
 <div className="text-center">
 <p className="text-sm uppercase tracking-[0.22em] text-[#FFD166] font-black mb-3">Team</p>
 <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">People who make Nexyovi live and help.</h2>
 <p className="text-[#9CA3AF] text-lg leading-relaxed max-w-3xl mx-auto">
 Engineers, designers, and operators building AI that earns trust instead of demanding it.
 </p>
 </div>

 <CompanyLeadership />
 </div>
 </section>

 <section className="container max-w-6xl mx-auto py-24">
 <div className="text-center mb-12">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6 text-[11px] uppercase tracking-[0.2em] text-white/60">
 Careers
 </div>
 <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Open positions at Nexyovi.</h2>
 <p className="text-[#9CA3AF] text-lg leading-relaxed max-w-2xl mx-auto">
 Explore the roles that keep our teams moving fast, secure, and world-class.
 </p>
 </div>

 <div className="grid gap-4 lg:grid-cols-2">
 {jobs.slice(0, 5).map((job) => (
 <Link
 key={job.id}
 to="/careers"
 className="block rounded-[28px] border border-white/[0.08] bg-[#0b1020] p-8 transition-all hover:border-white/20 hover:bg-[#101823]"
 >
 <div className="flex flex-wrap items-start justify-between gap-4">
 <div>
 <h3 className="text-2xl font-black text-white tracking-tight mb-2">{job.title}</h3>
 <div className="text-sm uppercase tracking-[0.18em] text-[#FFD166] font-black mb-3">{job.dept}</div>
 </div>
 <div className="text-right text-xs uppercase tracking-[0.18em] text-white/50 font-bold">
 <div>{job.location}</div>
 <div>{job.type}</div>
 </div>
 </div>
 <p className="text-white/60 mt-5 text-sm leading-relaxed">{job.desc}</p>
 <div className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[#FFD166]">
 View role
 <ArrowRight size={16} />
 </div>
 </Link>
 ))}
 </div>

 <div className="text-center mt-12">
 <p className="text-[#9CA3AF] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
 Didn\'t find your role? We\'re always hungry for great talent. Drop us a line at <span className="text-white font-bold">{settings.email}</span>.
 </p>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
 <Link
 to="/careers"
 className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F5A800] text-white font-black uppercase tracking-[0.18em] text-sm shadow-[0_4px_14px_rgba(245,168,0,0.25)] transition-all duration-300 hover:bg-[#1d4ed8] hover:shadow-[0_8px_30px_rgba(245,168,0,0.35)] hover:-translate-y-0.5"
 >
 Explore All Roles
 <ArrowRight size={18} />
 </Link>
 <a
 href={`mailto:${settings.email}`}
 className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/[0.08] text-white font-bold uppercase tracking-[0.18em] text-sm transition-all duration-300 hover:bg-white/[0.05] hover:shadow-[0_8px_30px_rgba(245,168,0,0.08)] hover:-translate-y-0.5"
 >
 Contact Recruiting
 </a>
 </div>
 </div>
 </section>
 </div>
 );
}
