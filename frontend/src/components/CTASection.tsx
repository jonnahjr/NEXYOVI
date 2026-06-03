import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fadeUp, viewport } from '../lib/animations';

const CTASection = () => {
 return (
 <section className="relative bg-[#050816] py-40 overflow-hidden border-t border-white/[0.05]">

 {/* Animated gradient core */}
 <motion.div
 animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.14, 0.08] }}
 transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full blur-[180px] pointer-events-none"
 style={{ background: 'radial-gradient(ellipse, #F5A800, transparent)' }}
 />

 {/* Horizontal line accents */}
 <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5A800]/20 to-transparent" />
 <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

 {/* Grid */}
 <div
 className="absolute inset-0 opacity-[0.02] pointer-events-none"
 style={{
 backgroundImage: `linear-gradient(rgba(37,99,235,0.8) 1px, transparent 1px),
 linear-gradient(90deg, rgba(37,99,235,0.8) 1px, transparent 1px)`,
 backgroundSize: '80px 80px',
 }}
 />

 <div className="container relative z-10 text-center">
 <motion.div
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={viewport}
 className="max-w-4xl mx-auto"
 >
 <p className="section-label mb-8 block">Next Steps</p>

 <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white uppercase mb-10">
 Ready to{' '}
 <span className="text-gradient italic">Scale?</span>
 </h2>

 <p className="text-white/40 text-lg md:text-xl leading-relaxed mb-16 max-w-2xl mx-auto font-medium">
 Join the elite network of global enterprises leveraging Nexyovi's
 high-performance engineering to dominate their markets.
 </p>

 <div className="flex flex-col md:flex-row items-center justify-center gap-5">
 <Link
 to="/contact"
 id="cta-section-start"
 className="group btn-gold text-[14px] px-9 py-4 w-full md:w-auto"
 >
 <span className="relative z-10">Start a Project</span>
 <ArrowRight size={15} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
 </Link>

 <Link
 to="/services"
 id="cta-section-services"
 className="btn-ghost text-[14px] px-9 py-4 w-full md:w-auto"
 >
 Our Services
 </Link>
 </div>
 </motion.div>
 </div>
 </section>
 );
};

export default CTASection;
