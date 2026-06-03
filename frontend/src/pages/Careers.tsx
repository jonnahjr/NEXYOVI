import { AnimatePresence, motion } from 'framer-motion';
import {
 ArrowRight,
 Briefcase,
 ChevronDown,
 Mail,
 MapPin,
 Play,
 Search,
 X
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import careersVideo from '../assets/video_2026-05-30_13-08-00.mp4';


const Careers = () => {
 const { jobs } = useSite();
 const [activeDept, setActiveDept] = useState('All Departments');
 const [activeLocation, setActiveLocation] = useState('All Locations');
 const [searchQuery, setSearchQuery] = useState('');
 const [isLifeModalOpen, setIsLifeModalOpen] = useState(false);

 // Context-aware counts for departments
 const departments = [
 {
 name: 'All Departments', count: jobs.filter(j =>
 (activeLocation === 'All Locations' || j.location === activeLocation) &&
 (j.title.toLowerCase().includes(searchQuery.toLowerCase()))
 ).length
 },
 ...Array.from(new Set(jobs.map(j => j.dept))).map(dept => {
 const count = jobs.filter(j =>
 j.dept === dept &&
 (activeLocation === 'All Locations' || j.location === activeLocation) &&
 (j.title.toLowerCase().includes(searchQuery.toLowerCase()))
 ).length;
 return { name: dept, count };
 }).filter(d => d.count > 0)
 ];

 // Context-aware locations
 const locationsList = [
 'All Locations',
 ...Array.from(new Set(jobs.map(j => j.location)))
 ].map(loc => {
 const count = jobs.filter(j =>
 (loc === 'All Locations' || j.location === loc) &&
 (activeDept === 'All Departments' || j.dept === activeDept) &&
 (j.title.toLowerCase().includes(searchQuery.toLowerCase()))
 ).length;
 return { name: loc, count };
 }).filter(l => l.count > 0);

 const filteredJobs = jobs.filter(job =>
 (activeDept === 'All Departments' || job.dept === activeDept) &&
 (activeLocation === 'All Locations' || job.location === activeLocation) &&
 (job.title.toLowerCase().includes(searchQuery.toLowerCase()))
 );

 const handleApply = () => { };

 return (
 <div className="bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-[#F5A800]/30">

 {/* ── 1. HERO SECTION ── */}
 <section className="relative min-h-screen flex flex-col justify-center pt-24 overflow-hidden bg-[#02040a]">
 {/* Video Background with Overlay */}
 <div className="absolute inset-0 z-0">   <video
     autoPlay
     muted
     loop
     playsInline
     className="w-full h-full object-cover"
     style={{ filter: 'contrast(1.1) brightness(1.04) saturate(1.08)', transform: 'translate3d(0,0,0) scale(0.85)', willChange: 'transform', backfaceVisibility: 'hidden' }}
    >
     <source src={careersVideo} type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1C]/70 via-[#0A0F1C]/50 to-[#0A0F1C]/30" />
 </div>

 <div className="container mx-auto px-6 lg:px-24 relative z-10">
 <div className="max-w-3xl">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-[#F5A800] text-sm font-black uppercase tracking-[0.5em] mb-8"
 >
 Careers at Nexyovi
 </motion.div>
 <motion.h1
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-slate-900 mb-8 uppercase"
 >
 Build Your Career. <br />
 <span className="text-[#F5A800] italic">Shape the Future.</span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-500 text-lg md:text-xl leading-relaxed mb-12 max-w-xl"
 >
 Join a team of innovators, thinkers, and dreamers building technology that makes a real impact on the global digital landscape.
 </motion.p>
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 }}
 className="flex flex-wrap gap-6"
 >
 <button
 onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
 className="px-10 py-5 bg-[#F5A800] text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-[0_4px_14px_rgba(245,168,0,0.25)] transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_8px_30px_rgba(245,168,0,0.35)] hover:-translate-y-0.5 "
 >
 View Open Positions
 </button>
 <button
 onClick={() => setIsLifeModalOpen(true)}
 className="px-10 py-5 bg-transparent border border-slate-300 text-slate-700 text-xs font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(245,168,0,0.08)] hover:-translate-y-0.5 flex items-center gap-3 group"
 >
 <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-[#F5A800] group-hover:text-white transition-all">
 <Play size={12} fill="currentColor" />
 </div>
 Life at Nexyovi
 </button>
 </motion.div>
 </div>
 </div>
 </section>



 {/* ── 3. OPEN POSITIONS ── */}
 <section id="positions" className="py-32 bg-white relative overflow-hidden">
 <div className="absolute inset-0 opacity-10 pointer-events-none">
 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
 </div>

 <div className="container mx-auto px-6 lg:px-24 relative z-10">
 <div className="text-center mb-16">
 <div className="text-[#F5A800] text-xs font-black uppercase tracking-[0.4em] mb-4">Open Positions</div>
 <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-slate-900">
 Find Your Next <span className="text-[#F5A800] italic">Opportunity.</span>
 </h2>
 <p className="text-slate-500 text-sm mt-6 max-w-2xl mx-auto uppercase tracking-widest font-bold">
 Explore exciting career opportunities and become a part of our journey to build innovative solutions for a digital world.
 </p>
 </div>

 {/* Search Bar */}
 <div className="max-w-5xl mx-auto bg-white shadow-sm border border-slate-200 rounded-2xl p-4 flex flex-col lg:flex-row gap-4 mb-16">
 <div className="flex-1 relative">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
 <input
 type="text"
 placeholder="Search by job title, keyword or location..."
 value={searchQuery}
 className="w-full h-14 pl-12 pr-4 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#F5A800]/20"
 onChange={(e) => setSearchQuery(e.target.value)}
 />
 </div>
 <div className="lg:w-48 relative">
 <select
 value={activeDept}
 onChange={(e) => setActiveDept(e.target.value)}
 className="w-full h-14 px-4 bg-white/5 border-none rounded-xl text-sm font-bold uppercase tracking-widest text-[#6B7280] appearance-none cursor-pointer"
 >
 {departments.map(d => <option key={d.name} value={d.name} className="bg-[#111827]">{d.name}</option>)}
 </select>
 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={16} />
 </div>
 <div className="lg:w-48 relative">
 <select
 value={activeLocation}
 onChange={(e) => setActiveLocation(e.target.value)}
 className="w-full h-14 px-4 bg-white/5 border-none rounded-xl text-sm font-bold uppercase tracking-widest text-[#6B7280] appearance-none cursor-pointer"
 >
 {locationsList.map(l => <option key={l.name} value={l.name} className="bg-[#111827]">{l.name} ({l.count})</option>)}
 </select>
 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={16} />
 </div>
 <button className="h-14 px-10 bg-[#F5A800] text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-black transition-all active:scale-95">
 Search Jobs
 </button>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
 {/* Sidebar Filters */}
 <div className="lg:col-span-1">
 <div className="bg-[#111827] rounded-3xl p-8 border border-[#1F2937]">
 <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#6B7280] mb-8">Departments</h4>
 <div className="space-y-1">
 {departments.map((dept) => (
 <button
 key={dept.name}
 onClick={() => setActiveDept(dept.name)}
 className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${activeDept === dept.name ? 'bg-[#F5A800] text-white /20' : 'hover:bg-white/5 text-[#6B7280]'
 }`}
 >
 <span className="text-sm font-black uppercase tracking-wider">{dept.name}</span>
 <span className={`text-xs font-bold ${activeDept === dept.name ? 'text-white/40' : 'text-[#6B7280]/30'}`}>({dept.count})</span>
 </button>
 ))}
 </div>
 </div>
 </div>

 {/* Jobs List */}
 <div className="lg:col-span-3">
 <div className="space-y-4 min-h-[400px]">
 <AnimatePresence mode="popLayout">
 {filteredJobs.length > 0 ? (
 filteredJobs.map((job, i) => (
 <div key={job.title} className="group bg-[#111827] border border-[#1F2937] p-8 rounded-3xl hover:border-[#F5A800]/50 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8">
 <div className="flex-1">
 <div className="flex items-center gap-4 mb-2">
 <h3 className="text-xl font-black text-white tracking-tighter uppercase group-hover:text-[#F5A800] transition-colors">
 {job.title}
 </h3>
 <span className="px-3 py-1 bg-[#F5A800]/10 text-[#F5A800] text-[8px] font-black uppercase tracking-widest rounded-full">
 {job.dept}
 </span>
 </div>
 <div className="flex items-center gap-6 text-[#6B7280] text-xs font-bold uppercase tracking-widest">
 <div className="flex items-center gap-2">
 <MapPin size={14} className="text-[#F5A800]/40" />
 {job.location}
 </div>
 <div className="flex items-center gap-2">
 <Briefcase size={14} className="text-[#F5A800]/40" />
 {job.type}
 </div>
 </div>
 </div>
 <Link
 to={`/careers/${job.id}`}
 className="px-8 py-4 border border-[#1F2937] text-[#6B7280] text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#F5A800] hover:text-white hover:border-[#F5A800] transition-all group/btn"
 >
 View Details
 </Link>
 </div>
 ))
 ) : (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 className="flex flex-col items-center justify-center py-20 text-center"
 >
 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#6B7280]/20 mb-6">
 <Search size={32} />
 </div>
 <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">No roles found</h3>
 <p className="text-[#6B7280] text-xs font-bold uppercase tracking-widest">Try adjusting your filters or search query.</p>
 </motion.div>
 )}
 </AnimatePresence>
 </div>

 <div className="mt-12 text-center">
 <button
 onClick={() => {
 setActiveDept('All Departments');
 setActiveLocation('All Locations');
 setSearchQuery('');
 window.scrollTo({ top: document.getElementById('positions')?.offsetTop ? document.getElementById('positions')!.offsetTop - 100 : 0, behavior: 'smooth' });
 }}
 className="text-[#F5A800] text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 mx-auto hover:gap-5 transition-all"
 >
 View All Openings <ArrowRight size={16} />
 </button>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* ── PERKS & BENEFITS ── */}
 <section className="py-24 bg-slate-50 border-y border-slate-200">
 <div className="container mx-auto px-6 lg:px-24">
 <div className="text-center mb-16">
 <div className="text-[#F5A800] text-xs font-black uppercase tracking-[0.4em] mb-4">Why Nexyovi</div>
 <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
 Built for <span className="text-[#F5A800] italic">the best.</span>
 </h2>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {[
 { icon: '🌍', title: 'Remote-First', desc: 'Work from anywhere. We trust our team to deliver excellence from any timezone.' },
 { icon: '🚀', title: 'Rapid Growth', desc: 'Clear leveling systems, quarterly reviews, and meaningful promotions.' },
 { icon: '🧠', title: 'Learning Budget', desc: 'Annual L&D budget for courses, conferences, and certifications.' },
 { icon: '⚡', title: 'Latest Stack', desc: 'We only use cutting-edge tools. No legacy cruft — pure modern engineering.' },
 { icon: '🏥', title: 'Health Coverage', desc: 'Comprehensive medical, dental, and wellness benefits for you and your family.' },
 { icon: '🤝', title: 'Equity Options', desc: 'Senior contributors participate in our equity program — build something you own.' }].map((perk, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.07 }}
 className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#F5A800]/30 transition-all group shadow-sm"
 >
 <span className="text-3xl block mb-4">{perk.icon}</span>
 <h4 className="text-slate-900 font-black text-lg mb-2 group-hover:text-[#F5A800] transition-colors">{perk.title}</h4>
 <p className="text-slate-500 text-sm leading-relaxed">{perk.desc}</p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* ── 4. WHERE YOU BELONG ── */}
 <section className="py-32 bg-white border-y border-slate-200">
 <div className="container mx-auto px-6 lg:px-24">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
 <div className="order-2 lg:order-1">
 <div className="grid grid-cols-2 gap-4">
 <motion.div
 whileHover={{ scale: 1.02 }}
 className="rounded-3xl overflow-hidden aspect-[4/3] "
 >
 <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
 </motion.div>
 <motion.div
 whileHover={{ scale: 1.02 }}
 className="rounded-3xl overflow-hidden aspect-[4/3] translate-y-12 "
 >
 <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
 </motion.div>
 <motion.div
 whileHover={{ scale: 1.02 }}
 className="col-span-2 rounded-3xl overflow-hidden aspect-[16/7] mt-4 "
 >
 <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
 </motion.div>
 </div>
 </div>

 <div className="order-1 lg:order-2">
 <div className="text-[#F5A800] text-xs font-black uppercase tracking-[0.5em] mb-6">Our Culture</div>
 <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-900 uppercase mb-8">
 Where You <br />
 <span className="text-[#F5A800] italic">Belong.</span>
 </h2>
 <p className="text-slate-500 text-lg leading-relaxed mb-12 max-w-xl font-medium">
 At Nexyovi, we believe in a culture of trust, respect, collaboration and continuous improvement. We celebrate wins, learn from challenges and support each other every step of the way.
 </p>
 <button className="px-10 py-5 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-[#F5A800] hover:shadow-[0_8px_30px_rgba(245,168,0,0.25)] hover:-translate-y-0.5 flex items-center gap-4 group">
 Life at Nexyovi <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
 </button>
 </div>
 </div>
 </div>
 </section>

 {/* ── 5. FOOTER CTA ── */}
 <section className="bg-slate-50 py-24 relative overflow-hidden border-t border-slate-200">
 <div className="container mx-auto px-6 lg:px-24 relative z-10">
 <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
 <div className="flex items-center gap-6">
 <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#F5A800]">
 <Mail size={32} />
 </div>
 <div>
 <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Don't see the right role?</h3>
 <p className="text-[#6B7280] text-sm font-bold uppercase tracking-widest mt-1">
 We're always looking for great talent. Send us your resume and we'll keep you in mind for future opportunities.
 </p>
 </div>
 </div>
 <button className="px-10 py-5 bg-[#F5A800] text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-[0_4px_14px_rgba(245,168,0,0.25)] transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_8px_30px_rgba(245,168,0,0.35)] hover:-translate-y-0.5 whitespace-nowrap">
 Send Your Resume
 </button>
 </div>
 </div>
 </section>

 {/* ── LIFE AT NEXYOVI MODAL ── */}
 <AnimatePresence>
 {isLifeModalOpen && (
 <>
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={() => setIsLifeModalOpen(false)}
 className="fixed inset-0 bg-[#02040a]/95 backdrop-blur-2xl z-[80]"
 />
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.9 }}
 className="fixed inset-4 md:inset-32 z-[90] overflow-hidden rounded-[40px] border border-[#1F2937] flex flex-col items-center justify-center bg-[#02040a]"
 >
 <button
 onClick={() => setIsLifeModalOpen(false)}
 className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 border border-[#1F2937] flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-10"
 >
 <X size={24} />
 </button>

 <div className="relative w-full h-full flex flex-col items-center justify-center p-12 text-center">
 <div className="absolute inset-0 z-0">
 <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-20" alt="Culture" />
 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/40 to-transparent" />
 </div>

 <div className="relative z-10 max-w-2xl">
 <div className="text-[#F5A800] text-xs font-black uppercase tracking-[0.5em] mb-6">Streaming from Nexus Hub</div>
 <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
 Our Culture in <span className="text-[#F5A800] italic">Motion.</span>
 </h2>
 <p className="text-[#9CA3AF] text-lg leading-relaxed mb-12">
 Experience the high-performance engineering environment at Nexyovi. From our weekly research sprints to our global team summits.
 </p>
 <div className="justify-center flex">
 <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-black cursor-pointer hover:scale-110 transition-transform active:scale-95 ">
 <Play size={32} fill="currentColor" />
 </div>
 </div>
 </div>
 </div>
 </motion.div>
 </>
 )}
 </AnimatePresence>


 </div>
 );
};

export default Careers;

