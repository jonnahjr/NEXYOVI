import { motion } from 'framer-motion';
import { ArrowUpRight, Zap } from 'lucide-react';
import cyberAsset from '../assets/cybersecurity_shield.png';
import logisticsAsset from '../assets/data_flow.png';

const CompanyPortfolio = () => {
 const bankImg = cyberAsset;
 const logisticsImg = logisticsAsset;

 return (
 <section id="stories" className="bg-[#FFFBF5] py-32 border-t border-[#E5DDD0]">
 <div className="container mx-auto px-6 lg:px-12">
 <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
 <div>
 <div className="text-[#F5A800] text-xs font-black uppercase tracking-[0.4em] mb-4">Portfolio</div>
 <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-[#1F2937]">Proven Results & Case Studies.</h2>
 </div>
 <button className="inline-flex items-center gap-2 px-6 py-3 border border-[#F5A800]/20 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#F5A800] hover:text-white hover:border-[#F5A800] transition-all text-[#F5A800] w-fit">
 Full Portfolio <ArrowUpRight size={14} />
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {[
 { img: bankImg, cat: 'Cyber Security', title: 'Global Bank Security Overhaul', stat: 'Enterprise-grade Uptime' },
 { img: logisticsImg, cat: 'Intelligence', title: 'AI Smart Logistics Engine', stat: '35% Boost' }].map((p, i) => (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 key={i}
 className="group relative aspect-[16/9] bg-white overflow-hidden rounded-[24px] border border-black/5 "
 >
 <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-all duration-700" />
 <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
 <div className="absolute bottom-8 left-8 right-8">
 <div className="text-[10px] font-black uppercase tracking-widest text-[#F5A800] mb-2">{p.cat}</div>
 <h4 className="text-2xl md:text-3xl font-black text-[#1F2937] mb-3">{p.title}</h4>
 <div className="inline-flex items-center gap-2 text-sm font-bold text-[#4B5563]">
 <Zap size={14} className="text-[#F5A800]" /> {p.stat}
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 );
};

export default CompanyPortfolio;
