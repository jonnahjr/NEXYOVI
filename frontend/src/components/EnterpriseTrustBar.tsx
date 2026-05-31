import { motion } from 'framer-motion';
import { Activity, Globe, Server } from 'lucide-react';
import { staggerContainer } from '../lib/animations';

const logos = [
 { name: 'Palantir', url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Palantir_Technologies_logo.svg' },
 { name: 'Anduril', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Anduril_Industries_Logo.svg' },
 { name: 'OpenAI', url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
 { name: 'Cloudflare', url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.svg' },
 { name: 'Stripe', url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
 { name: 'Cisco', url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg' }];

export default function EnterpriseTrustBar() {
 return (
 <section className="relative py-12 border-b border-white/[0.04] bg-[#02040a] overflow-hidden">
 {/* Background elements */}
 <div className="absolute inset-0 z-0 pointer-events-none">
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
 </div>

 <div className="container relative z-10">
 <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

 {/* Left: Metrics */}
 <motion.div
 variants={staggerContainer}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: '-40px' }}
 className="flex items-center gap-8 md:gap-12 shrink-0"
 >
 <div className="flex items-center gap-3">
 <Activity size={16} className="text-[#10b981]" />
 <div>
 <div className="text-white font-black font-mono text-lg leading-none">24/7</div>
 <div className="text-[#6B7280] text-[10px] font-bold uppercase tracking-widest mt-1">Monitoring</div>
 </div>
 </div>
 <div className="hidden sm:block w-px h-8 bg-white/10" />
 <div className="flex items-center gap-3">
 <Server size={16} className="text-[#F5A800]" />
 <div>
 <div className="text-white font-black font-mono text-lg leading-none">Zero</div>
 <div className="text-[#6B7280] text-[10px] font-bold uppercase tracking-widest mt-1">Breaches</div>
 </div>
 </div>
 <div className="hidden sm:block w-px h-8 bg-white/10" />
 <div className="flex items-center gap-3">
 <Globe size={16} className="text-[#8b5cf6]" />
 <div>
 <div className="text-white font-black font-mono text-lg leading-none">Global</div>
 <div className="text-[#6B7280] text-[10px] font-bold uppercase tracking-widest mt-1">Operations</div>
 </div>
 </div>
 </motion.div>

 {/* Right: Logos sliding slowly */}
 <div className="w-full lg:w-auto flex-1 overflow-hidden relative">
 {/* Fade edges */}
 <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#02040a] to-transparent z-10" />
 <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#02040a] to-transparent z-10" />

 <motion.div
 animate={{ x: ['0%', '-50%'] }}
 transition={{ ease: 'linear', duration: 36, repeat: Infinity }}
 className="flex items-center gap-10 md:gap-16 min-w-max px-8 opacity-40 hover:opacity-70 transition-opacity duration-500"
 >
 {[...logos, ...logos].map((logo, i) => (
 <img
 key={i}
 src={logo.url}
 alt={logo.name}
 className="h-6 md:h-7 object-contain filter grayscale invert opacity-70"
 />
 ))}
 </motion.div>
 </div>

 </div>
 </div>
 </section>
 );
}
