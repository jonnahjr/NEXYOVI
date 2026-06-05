import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Globe, Code, Shield, Heart } from 'lucide-react';
import CTASection from '../components/CTASection';

import teamPhoto from '../assets/team_collaboration.png';

const TeamPage = () => {
 return (
 <div className="bg-slate-50 text-slate-900 theme-light">
 {/* Hero */}
 <section className="relative min-h-screen flex flex-col justify-center pt-48 pb-32 overflow-hidden border-b border-slate-200 bg-[#090A0C]">
 <div className="absolute inset-0 z-0">
 <img src={teamPhoto} alt="Our Team" className="w-full h-full object-cover opacity-20" />
 <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/80 to-transparent" />
 </div>
 
 <div className="container-narrow relative z-10 text-center">
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-widest uppercase"
 >
 <Users size={16} /> Human Capital
 </motion.div>
 <motion.h1 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-[64px] md:text-[84px] font-bold leading-none tracking-tighter mb-8"
 >
 The Minds Behind <br/> <span className="text-white/40">The Tech Powerhouse.</span>
 </motion.h1>
 <p className="text-[#797d86] text-xl max-w-2xl mx-auto leading-relaxed mb-12">
 "A global powerhouse is only as strong as its engineers. We've gathered some of the finest tech minds from Addis Ababa and beyond."
 </p>
 <div className="flex justify-center gap-4">
 <a href="mailto:contact@nexyovi.com" className="px-10 py-5 bg-white text-black font-bold rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(245,168,0,0.15)]">Join the Mission</a>
 <a href="mailto:contact@nexyovi.com" className="px-10 py-5 border border-white/10 rounded-full transition-all duration-300 hover:bg-white/5 hover:shadow-[0_8px_30px_rgba(245,168,0,0.08)] hover:-translate-y-0.5">Work with Us</a>
 </div>
 </div>
 </section>

 {/* Stats */}
 <section className="py-24 border-y border-slate-200">
 <div className="container-narrow grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
 <div>
 <div className="text-5xl font-bold mb-2 text-slate-900">20+</div>
 <div className="text-slate-500 uppercase tracking-widest text-xs font-bold">Deep Tech Experts</div>
 </div>
 <div>
 <div className="text-5xl font-bold mb-2 text-slate-900">10+</div>
 <div className="text-slate-500 uppercase tracking-widest text-xs font-bold">Years Avg. Experience</div>
 </div>
 <div>
 <div className="text-5xl font-bold mb-2 text-slate-900">8+</div>
 <div className="text-slate-500 uppercase tracking-widest text-xs font-bold">Languages & Frameworks</div>
 </div>
 </div>
 </section>

 {/* Team Visual Grid */}
 <section className="py-32">
 <div className="container-narrow">
 <h2 className="text-[42px] font-bold tracking-tighter mb-16 text-slate-900">Leadership & Core Team</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
 {[
 { name: 'Yonas Bogale', role: 'Founder & CEO', tag: 'Strategic Vision' },
 { name: 'Amanuel Tesfaye', role: 'Chief Technology Officer', tag: 'AI & Cloud Infrastructure' },
 { name: 'Selamawit Hailu', role: 'Head of Engineering', tag: 'Scalable Systems' },
 { name: 'Dawit Eshetu', role: 'Senior Full-Stack Developer', tag: 'Web Architecture' },
 { name: 'Meron Tadesse', role: 'UI/UX Designer', tag: 'Design Systems' },
 { name: 'Henok Alemu', role: 'DevOps Engineer', tag: 'CI/CD & Cloud' }
 ].map((member, i) => (
 <motion.div 
 key={i}
 initial={{ opacity: 0, scale: 0.9 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="group"
 >
 <div className="aspect-[4/5] bg-white border border-slate-200 rounded-[40px] mb-6 flex items-center justify-center overflow-hidden relative">
 <Users size={60} className="text-slate-200 group-hover:scale-110 transition-transform duration-500" />
 <div className="absolute top-6 right-6">
 <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs uppercase font-bold tracking-widest text-slate-500">{member.tag}</div>
 </div>
 </div>
 <h3 className="text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">{member.name}</h3>
 <p className="text-slate-500 font-medium">{member.role}</p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 <CTASection />
 </div>
 );
};

export default TeamPage;

