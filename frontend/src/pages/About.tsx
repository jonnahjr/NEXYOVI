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
        <div className="bg-[#02040a] text-white min-h-screen overflow-hidden selection:bg-[#F5A800]/30">
            <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden border-b border-white/[0.04]">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[680px] bg-[#F5A800]/10 blur-[140px] rounded-full mix-blend-screen" />
                    <div className="absolute inset-0 opacity-[0.03] animate-grid-drift"
                        style={{
                            backgroundImage: `linear-gradient(rgba(37,99,235,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.6) 1px, transparent 1px)`,
                            backgroundSize: '90px 90px',
                        }}
                    />
                </div>

                <div className="container relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
                        <motion.div variants={revealUp} className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.10] text-[11px] uppercase tracking-[0.2em] text-[#FFD166]">
                            About us
                        </motion.div>

                        <motion.h1 variants={revealUp} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95]">
                            We build the AI your team <span className="text-gradient-aurora">actually trusts.</span>
                        </motion.h1>

                        <motion.p variants={revealUp} className="text-[#9CA3AF] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                            No black boxes. No hallucinated answers. Just verified intelligence pulled from the tools you already use.
                        </motion.p>

                        <motion.div variants={revealUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-left">
                            {[
                                { label: 'Daily points processed', value: '100M+' },
                                { label: 'Founded', value: '2024' },
                                { label: 'Team members', value: `${team.length}+` },
                            ].map((stat) => (
                                <div key={stat.label} className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6">
                                    <div className="text-4xl font-black tracking-tight text-white mb-2">{stat.value}</div>
                                    <div className="text-sm uppercase tracking-[0.22em] text-white/50">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="container max-w-6xl mx-auto py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
                        <div className="badge mb-4">Hello</div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                            A team of engineers, designers, and operators obsessed with AI adoption.
                        </h2>
                        <p className="text-[#9CA3AF] text-lg leading-relaxed">
                            Most AI tools ask you to trust them blindly. Nexyovi was built on the opposite principle: every answer traces back to a source, every action requires context, and nothing fires without your team in the loop.
                        </p>
                        <p className="text-[#9CA3AF] text-lg leading-relaxed">
                            We started after watching enterprise teams drown in tools that created more noise than clarity. The pattern was always the same: scattered knowledge, disconnected systems, and people spending half their day just finding information instead of acting.
                        </p>
                        <div className="rounded-3xl border border-white/[0.10] bg-[#0A101E]/80 p-8 shadow-[0_20px_80px_rgba(37,99,235,0.08)]">
                            <div className="text-sm uppercase tracking-[0.22em] text-[#FFD166] font-black mb-3">Founder</div>
                            <div className="text-2xl font-black text-white">Marcus Chen</div>
                            <div className="text-sm uppercase tracking-[0.2em] text-white/50 mt-2">CEO and co-founder</div>
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
                            },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 hover:border-white/20 transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-[#F5A800]/10 text-[#FFD166] flex items-center justify-center mb-5">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-3">{item.title}</h3>
                                    <p className="text-white/50 leading-relaxed">{item.description}</p>
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
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F5A800] text-white font-black uppercase tracking-[0.18em] text-sm hover:bg-[#1d4ed8] transition-all"
                        >
                            Explore All Roles
                            <ArrowRight size={18} />
                        </Link>
                        <a
                            href={`mailto:${settings.email}`}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/[0.08] text-white font-bold uppercase tracking-[0.18em] text-sm hover:bg-white/[0.05] transition-all"
                        >
                            Contact Recruiting
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
