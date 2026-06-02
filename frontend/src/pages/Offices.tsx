import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Clock, Phone, Mail } from 'lucide-react';
import CTASection from '../components/CTASection';

import officeHero from '../assets/hero_office.png';

const OfficesPage = () => {
 const hubs = [
 {
 city: 'Addis Ababa, Ethiopia',
 role: 'Main Headquarters & Operational Core',
 address: 'Bole District, Addis Ababa, Ethiopia',
 phone: '+251 911 000 000',
 email: 'hq@nexyovi.com',
 time: 'GMT+3 (East Africa Time)',
 description: 'The core center of company leadership, mission-critical operations, and technical innovation.'
 },
 ];

 return (
 <div className="bg-slate-50 text-slate-900 theme-light">
 {/* Hero */}
 <section className="relative min-h-screen flex flex-col justify-center pt-48 pb-32 overflow-hidden border-b border-slate-200 bg-[#090A0C]">
 <div className="absolute inset-0 z-0">
 <img src={officeHero} alt="Nexyovi Global HQ" className="w-full h-full object-cover opacity-30" />
 <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/50 to-transparent" />
 </div>

 <div className="container-narrow relative z-10 text-center">
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-bold tracking-widest uppercase"
 >
 <Globe size={16} /> Global Presence
 </motion.div>
 <motion.h1 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-[64px] md:text-[84px] font-bold leading-none tracking-tighter mb-8"
 >
 Operating Across <br/> <span className="text-white/40">Continents.</span>
 </motion.h1>
 <p className="text-[#797d86] text-xl max-w-2xl mx-auto leading-relaxed mb-12">
 Nexyovi is a truly global organization. Our decentralized structure allows us to provide round-the-clock service to our international clients.
 </p>
 </div>
 </section>

 {/* Hubs Grid */}
 <section className="py-32">
 <div className="container-narrow">
 <div className="grid grid-cols-1 gap-12 max-w-xl mx-auto">
 {hubs.map((hub, i) => (
 <motion.div 
 key={i}
 initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 className="p-12 rounded-[48px] bg-white border border-slate-200 hover:bg-slate-50 transition-all"
 >
 <div className="flex justify-between items-start mb-10">
 <div>
 <h2 className="text-4xl font-bold mb-4 text-slate-900">{hub.city}</h2>
 <p className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-6">{hub.role}</p>
 <p className="text-slate-600 text-lg leading-relaxed mb-8">{hub.description}</p>
 </div>
 <MapPin size={32} className="text-slate-300" />
 </div>

 <div className="space-y-8">
 <div className="flex gap-6 items-start">
 <div className="shrink-0 w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
 <MapPin size={16} className="text-slate-500" />
 </div>
 <p className="text-lg text-slate-600">{hub.address}</p>
 </div>
 <div className="flex gap-6 items-start">
 <div className="shrink-0 w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
 <Phone size={16} className="text-slate-500" />
 </div>
 <p className="text-lg text-slate-600">{hub.phone}</p>
 </div>
 <div className="flex gap-6 items-start">
 <div className="shrink-0 w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
 <Mail size={16} className="text-slate-500" />
 </div>
 <p className="text-lg text-slate-600">{hub.email}</p>
 </div>
 <div className="flex gap-6 items-start">
 <div className="shrink-0 w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
 <Clock size={16} className="text-slate-500" />
 </div>
 <p className="text-lg text-slate-600">Current Time: {hub.time}</p>
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 <CTASection />
 </div>
 );
};

export default OfficesPage;

