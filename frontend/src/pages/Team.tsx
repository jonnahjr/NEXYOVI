import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Globe, Code, Shield, Heart } from 'lucide-react';
import CTASection from '../components/CTASection';

import teamPhoto from '../assets/team_collaboration.png';

const TeamPage = () => {
  return (
    <div className="bg-[#090A0C] text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center pt-48 pb-32 overflow-hidden border-b border-white/5">
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
            "A global powerhouse is only as strong as its engineers. We've gathered 30+ of the finest tech minds from Addis Ababa to Miami."
          </p>
          <div className="flex justify-center gap-4">
             <Link to="/careers" className="px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-all">Join the Mission</Link>
             <Link to="/contact" className="px-10 py-5 border border-white/10 rounded-full hover:bg-white/5 transition-all">Work with Us</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 border-y border-white/5">
         <div className="container-narrow grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
            <div>
               <div className="text-5xl font-bold mb-2">30+</div>
               <div className="text-white/50 uppercase tracking-widest text-xs font-bold">Deep Tech Experts</div>
            </div>
            <div>
               <div className="text-5xl font-bold mb-2">12+</div>
               <div className="text-white/50 uppercase tracking-widest text-xs font-bold">Years Avg. Experience</div>
            </div>
            <div>
               <div className="text-5xl font-bold mb-2">15</div>
               <div className="text-white/50 uppercase tracking-widest text-xs font-bold">Coding Languages Dominated</div>
            </div>
         </div>
      </section>

      {/* Team Visual Grid */}
      <section className="py-32">
         <div className="container-narrow">
            <h2 className="text-[42px] font-bold tracking-tighter mb-16">Leadership & Core Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {[
                  { name: 'Yonas Bogale', role: 'Founder & CEO', tag: 'Strategic Vision' },
                  { name: 'Senior Architect', role: 'Head of AI', tag: 'Machine Learning' },
                  { name: 'Platform Lead', role: 'Software Engineering', tag: 'Full Stack' },
                  { name: 'Security Director', role: 'Cyber Security', tag: 'White Hat' },
                  { name: 'Ops Manager', role: 'Infrastructure', tag: 'Networking' },
                  { name: 'Design Head', role: 'UX/UI Strategy', tag: 'Aesthetics' }
               ].map((member, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                     <div className="aspect-[4/5] bg-white/[0.02] border border-white/5 rounded-[40px] mb-6 flex items-center justify-center overflow-hidden relative">
                        <Users size={60} className="text-white/[0.05] group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-6 right-6">
                           <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase font-bold tracking-widest">{member.tag}</div>
                        </div>
                     </div>
                     <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-blue-400">{member.name}</h3>
                     <p className="text-white/40 font-medium">{member.role}</p>
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

