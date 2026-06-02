import { motion } from 'framer-motion';
import { BrainCircuit, Globe, Users, Zap } from 'lucide-react';

const pillars = [
  {
  icon: Users,
  title: 'Team Collaboration',
  desc: 'Cross-functional squads across Addis Ababa work in synchronized sprints — bridging teams without missing a beat. Every engineer owns their outcome.',
  stat: '2',
  statLabel: 'Continents',
  },
 {
 icon: Zap,
 title: 'Agile Execution',
 desc: 'We run two-week agile sprints with daily async standups, CI/CD pipelines, and rigorous code review standards. Code ships fast — and it ships right.',
 stat: '2wk',
 statLabel: 'Sprint Cycle',
 },
 {
 icon: BrainCircuit,
 title: 'Innovation Mindset',
 desc: 'Every quarter, our teams run internal hackathons to prototype emerging ideas. We budget 20% of engineering time for R&D — because tomorrow\'s products start today.',
 stat: '20%',
 statLabel: 'R&D Time',
 },
  {
  icon: Globe,
  title: 'Global Operations',
  desc: 'Our bi-continental model means your project never sleeps. With teams spanning East Africa and the US East Coast, we deliver around the clock.',
  stat: '2',
  statLabel: 'Offices',
  }];

const CompanyCulture = () => {
 return (
 <section id="culture" className="bg-[#02040a] py-32 border-t border-white/[0.05] relative overflow-hidden">
 {/* Ambient glow */}
 <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F5A800]/5 blur-[150px] rounded-full pointer-events-none" />

 <div className="container mx-auto px-6 lg:px-12 relative z-10">

 {/* Header */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="mb-20 max-w-2xl"
 >
 <div className="text-[#F5A800] text-xs font-black uppercase tracking-[0.4em] mb-4">How We Work</div>
 <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-6">
 Culture is our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#FFD166]">infrastructure.</span>
 </h2>
 <p className="text-[#9CA3AF] text-lg font-medium leading-relaxed">
 Culture isn't a perk. Here's how Nexyovi operates from the inside — the practices, values, and rhythms that make us exceptional.
 </p>
 </motion.div>

 {/* Bento Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 {pillars.map((pillar, i) => {
 const Icon = pillar.icon;
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1, duration: 0.5 }}
 className="group relative p-6 bg-[#111827]/60 rounded-2xl border border-white/[0.06] hover:border-[#F5A800]/30 transition-all duration-500 overflow-hidden"
 >
 {/* Background number */}
 <div className="absolute -bottom-4 -right-4 text-[100px] font-black text-white/[0.02] leading-none select-none pointer-events-none">
 0{i + 1}
 </div>

 <div className="w-12 h-12 rounded-xl bg-[#F5A800]/10 border border-[#F5A800]/20 flex items-center justify-center text-[#F5A800] mb-5 group-hover:bg-[#F5A800] group-hover:text-white group-hover:border-[#F5A800] transition-all duration-300">
 <Icon size={22} />
 </div>

 <div className="text-2xl font-black text-white mb-0.5">{pillar.stat}</div>
 <div className="text-[#F5A800] text-[10px] font-black uppercase tracking-widest mb-4">{pillar.statLabel}</div>

 <h3 className="text-base font-black text-white mb-3 tracking-tight">{pillar.title}</h3>
 <p className="text-[#9CA3AF] text-xs leading-relaxed">{pillar.desc}</p>
 </motion.div>
 );
 })}
 </div>

 </div>
 </section>
 );
};

export default CompanyCulture;
