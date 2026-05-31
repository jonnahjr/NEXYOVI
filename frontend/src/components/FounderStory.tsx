import { motion } from 'framer-motion';
import { Globe, Lightbulb, Target } from 'lucide-react';
import yonasImg from '../assets/yonas.jpg';

const fadeUp = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0 }
};

const FounderStory = () => {
 return (
 <section className="bg-[#f4f4f5] py-32 border-t border-slate-200 relative overflow-hidden text-slate-950">
 <div className="container mx-auto px-6 lg:px-20 relative z-10">

 <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-center">

 {/* Left: Image */}
 <motion.div
 initial={{ opacity: 0, x: -30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="relative"
 >
 <div className="relative rounded-[32px] overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 border border-slate-200 bg-white">
 <img
 src={yonasImg}
 alt="Yonas Bogale – Founder & CEO of Nexyovi"
 className="w-full h-full object-cover object-top"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
 <div className="absolute bottom-6 left-6">
 <div className="text-[11px] font-medium text-slate-500 tracking-[0.2em] mb-1 uppercase">Founder & CEO</div>
 <div className="text-xl font-bold text-slate-950">Yonas Bogale</div>
 </div>
 </div>
 </motion.div>

 {/* Right: Shortened Story content */}
 <motion.div
 initial={{ opacity: 0, x: 30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 >
 <div className="text-slate-500 text-[11px] font-medium uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
 <div className="w-10 h-px bg-slate-300" />
 Founder Vision
 </div>

 <h2 className="text-4xl md:text-5xl font-bold text-slate-950 tracking-tighter leading-tight mb-10">
 People Buy From <span className="text-slate-600 italic">People.</span>
 </h2>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 {[
 {
 icon: <Lightbulb size={20} />,
 label: 'The Catalyst',
 text: 'Founded after 12+ years of engineering across continents to bridge the tech gap holding back ambitious African enterprises.'
 },
 {
 icon: <Globe size={20} />,
 label: "Africa's Future",
 text: "Building a continent that doesn't just consume global technology, but aggressively engineers and exports it."
 },
 {
 icon: <Target size={20} />,
 label: 'The Mission',
  text: 'To build modern software and AI that helps businesses everywhere ship better products, automate smarter, and operate faster.'
 }].map((item, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="p-6 rounded-2xl bg-white border border-slate-200  transition-all group"
 >
 <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-950 mb-4 group-hover:bg-slate-200 transition-all">
 {item.icon}
 </div>
 <div className="text-[12px] font-bold text-slate-950 mb-2">{item.label}</div>
 <p className="text-slate-600 text-[13px] leading-relaxed">{item.text}</p>
 </motion.div>
 ))}
 </div>
 </motion.div>
 </div>
 </div>
 </section>
 );
};

export default FounderStory;
